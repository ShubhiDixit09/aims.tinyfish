'use client';

import React, { useState, useEffect } from 'react';
import { auditTypes, TypeCheckReport } from '@/lib/typeguard';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check, FileCode2 } from 'lucide-react';

interface TypeGuardPanelProps {
  data: any;
  currentSchema: any;
  onUpdateSchema: (newSchemaString: string) => void;
}

export function TypeGuardPanel({ data, currentSchema, onUpdateSchema }: TypeGuardPanelProps) {
  const [report, setReport] = useState<TypeCheckReport | null>(null);
  const [copiedTs, setCopiedTs] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = () => {
    if (!data) return;
    setIsAuditing(true);
    setTimeout(() => {
      const rep = auditTypes(data, currentSchema);
      setReport(rep);
      setIsAuditing(false);
    }, 300);
  };

  useEffect(() => {
    if (data) {
      runAudit();
    } else {
      setReport(null);
    }
  }, [data]);

  const handleCopyTs = () => {
    if (!report?.generatedTypeScript) return;
    navigator.clipboard.writeText(report.generatedTypeScript);
    setCopiedTs(true);
    setTimeout(() => setCopiedTs(false), 2000);
  };

  if (!data) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-stone-400" />
          <span>TypeGuard Engine on standby. Awaiting live web extraction stream.</span>
        </div>
        <span className="font-mono text-[10px] bg-stone-100 px-2.5 py-1 rounded border border-stone-200 text-stone-600 font-semibold">
          STRICT MODE ENABLED
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-card space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              TypeGuard: Contract & Schema Auditor
              {report && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                  report.isValid
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {report.confidenceScore}% INTEGRITY
                </span>
              )}
            </h3>
            <p className="text-xs text-stone-500">
              Validates real-time live data against JSON Schema contracts and exports strict TypeScript interfaces
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>Re-Verify</span>
          </button>

          <button
            onClick={handleCopyTs}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copiedTs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode2 className="w-3.5 h-3.5" />}
            <span>Export TypeScript</span>
          </button>
        </div>
      </div>

      {/* Audit Results Bar */}
      {report && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
          <div>
            <span className="text-stone-500 text-[10px] uppercase font-medium">Valid Contract</span>
            <div className="font-bold text-stone-900 mt-0.5">
              {report.isValid ? 'Conforming (PASS)' : 'Schema Warnings'}
            </div>
          </div>
          <div>
            <span className="text-stone-500 text-[10px] uppercase font-medium">Fields Checked</span>
            <div className="font-bold text-stone-900 mt-0.5">{report.fieldCount} properties</div>
          </div>
          <div>
            <span className="text-stone-500 text-[10px] uppercase font-medium">Missing / Null</span>
            <div className="font-bold text-stone-900 mt-0.5">{report.missingFields.length} fields</div>
          </div>
          <div>
            <span className="text-stone-500 text-[10px] uppercase font-medium">Type Violations</span>
            <div className="font-bold text-stone-900 mt-0.5">{report.typeErrors.length} detected</div>
          </div>
        </div>
      )}

      {/* Generated TypeScript Definitions Accordion / Preview */}
      {report?.generatedTypeScript && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-medium">Synthesized TypeScript Contract (`.d.ts`):</span>
            <span className="text-[11px] text-stone-400 font-mono">auto-derived from live DOM response</span>
          </div>
          <pre className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-800 overflow-x-auto leading-relaxed max-h-48">
            {report.generatedTypeScript}
          </pre>
        </div>
      )}
    </div>
  );
}
