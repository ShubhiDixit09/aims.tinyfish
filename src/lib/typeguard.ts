/**
 * TypeGuard: Real-Time Schema & Type Verification Engine for TinyFish Output
 */

export interface TypeCheckReport {
  isValid: boolean;
  fieldsChecked: number;
  passedCount: number;
  violations: Array<{
    field: string;
    expected: string;
    actual: string;
    message: string;
  }>;
  generatedTypeScript: string;
  confidenceScore: number;
}

export function auditTypes(data: any, schema: any): TypeCheckReport {
  const violations: Array<{ field: string; expected: string; actual: string; message: string }> = [];
  let fieldsChecked = 0;
  let passedCount = 0;

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      fieldsChecked: 0,
      passedCount: 0,
      violations: [{ field: 'root', expected: 'object', actual: typeof data, message: 'Root result must be an object' }],
      generatedTypeScript: generateTypeScriptDefinition(data),
      confidenceScore: 0,
    };
  }

  const properties = schema?.properties || {};
  const required = schema?.required || [];

  for (const [key, propDef] of Object.entries<any>(properties)) {
    fieldsChecked++;
    const val = data[key];

    if (val === undefined || val === null) {
      if (required.includes(key)) {
        violations.push({
          field: key,
          expected: propDef.type || 'defined',
          actual: 'missing',
          message: `Required field "${key}" is missing from live web extraction.`,
        });
      } else {
        passedCount++;
      }
      continue;
    }

    const expectedType = propDef.type;
    const actualType = Array.isArray(val) ? 'array' : typeof val;

    if (expectedType && expectedType !== actualType) {
      violations.push({
        field: key,
        expected: expectedType,
        actual: actualType,
        message: `Field "${key}" expected type "${expectedType}" but got "${actualType}".`,
      });
    } else {
      passedCount++;
    }
  }

  const confidenceScore = fieldsChecked > 0 ? Math.round((passedCount / fieldsChecked) * 100) : 100;

  return {
    isValid: violations.length === 0,
    fieldsChecked,
    passedCount,
    violations,
    generatedTypeScript: generateTypeScriptDefinition(data),
    confidenceScore,
  };
}

export function generateTypeScriptDefinition(data: any, rootName = 'TinyFishWebIntelligence'): string {
  if (!data || typeof data !== 'object') {
    return `export type ${rootName} = any;`;
  }

  function inferType(val: any, indent = '  '): string {
    if (val === null || val === undefined) return 'string | null';
    if (typeof val === 'string') return 'string';
    if (typeof val === 'number') return 'number';
    if (typeof val === 'boolean') return 'boolean';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'string[]';
      const itemType = inferType(val[0], indent);
      return `${itemType}[]`;
    }

    if (typeof val === 'object') {
      const lines = Object.entries(val).map(([k, v]) => {
        const optional = v === null || v === undefined ? '?' : '';
        return `${indent}  ${k}${optional}: ${inferType(v, indent + '  ')};`;
      });
      return `{\n${lines.join('\n')}\n${indent}}`;
    }

    return 'any';
  }

  const lines = Object.entries(data).map(([k, v]) => {
    return `  ${k}: ${inferType(v, '  ')};`;
  });

  return `export interface ${rootName} {\n${lines.join('\n')}\n}`;
}

export function inferSchemaFromData(data: any): Record<string, any> {
  if (!data || typeof data !== 'object') {
    return { type: 'object', properties: {} };
  }

  function getPropertySchema(val: any): any {
    if (typeof val === 'string') return { type: 'string' };
    if (typeof val === 'number') return { type: 'number' };
    if (typeof val === 'boolean') return { type: 'boolean' };
    if (Array.isArray(val)) {
      const itemSchema = val.length > 0 ? getPropertySchema(val[0]) : { type: 'string' };
      return { type: 'array', items: itemSchema };
    }
    if (typeof val === 'object' && val !== null) {
      const props: Record<string, any> = {};
      for (const [k, v] of Object.entries(val)) {
        props[k] = getPropertySchema(v);
      }
      return { type: 'object', properties: props };
    }
    return { type: 'string' };
  }

  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const [k, v] of Object.entries(data)) {
    properties[k] = getPropertySchema(v);
    if (v !== null && v !== undefined) {
      required.push(k);
    }
  }

  return {
    type: 'object',
    properties,
    required: required.slice(0, 5),
  };
}
