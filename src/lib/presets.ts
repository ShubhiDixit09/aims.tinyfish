import { MissionPreset } from './types';

export const MISSION_PRESETS: MissionPreset[] = [
  {
    id: 'edistrict-income',
    title: 'Delhi e-District: Income Certificate Workflow',
    category: 'opportunity',
    url: 'https://edistrict.delhigovt.nic.in',
    goal: 'Navigate to citizen services for Income Certificate. Extract the mandatory document checklist (ID proof, salary slip/ITR, residence proof), processing timeline, fee amount, and step-by-step application procedure. Return structured JSON with verbatim evidence.',
    description: 'Autonomous pre-flight document checklist & multi-step application workflow for state revenue certificates.',
    sampleDecisionCriteria: 'Eligibility & Document Readiness: Verify all 4 mandatory identity and income proofs are present before submission.',
    schema: {
      type: 'object',
      properties: {
        portal_name: { type: 'string' },
        service_name: { type: 'string' },
        processing_timeline_days: { type: 'string' },
        official_fee: { type: 'string' },
        mandatory_documents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              document_name: { type: 'string' },
              accepted_types: { type: 'string' },
              is_mandatory: { type: 'boolean' },
              verbatim_rule: { type: 'string' }
            },
            required: ['document_name', 'is_mandatory']
          }
        },
        procedure_steps: {
          type: 'array',
          items: { type: 'string' }
        },
        safety_notice: { type: 'string' }
      },
      required: ['portal_name', 'service_name', 'mandatory_documents']
    }
  },
  {
    id: 'passport-seva',
    title: 'Passport Seva: Fresh / Re-issue Requirements',
    category: 'opportunity',
    url: 'https://www.passportindia.gov.in',
    goal: 'Navigate to document advisor for Normal Fresh Passport for Adult. Extract required proof of date of birth, proof of address, non-ECR proof, fees, and appointment booking procedure. Use null if not disclosed. Return structured JSON.',
    description: 'Autonomous document checklist & appointment advisor for Ministry of External Affairs portal.',
    sampleDecisionCriteria: 'Passport Readiness: Verifies non-ECR eligibility and residential address proof validity.',
    schema: {
      type: 'object',
      properties: {
        portal_name: { type: 'string' },
        service_name: { type: 'string' },
        tatkaal_available: { type: 'boolean' },
        standard_fee: { type: 'string' },
        mandatory_documents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              document_name: { type: 'string' },
              accepted_types: { type: 'string' },
              is_mandatory: { type: 'boolean' },
              verbatim_rule: { type: 'string' }
            },
            required: ['document_name', 'is_mandatory']
          }
        },
        procedure_steps: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['portal_name', 'service_name', 'mandatory_documents']
    }
  },
  {
    id: 'scholarship-nsp',
    title: 'National Scholarship Portal (NSP): Merit Scheme',
    category: 'opportunity',
    url: 'https://scholarships.gov.in',
    goal: 'Inspect the National Scholarship Portal guidelines. Extract student eligibility criteria, family income ceiling, required documents (bonafide, marksheet, income cert, bank passbook), and application closing deadline. Return structured JSON with verbatim quotes.',
    description: 'Autonomous student grant & central scholarship eligibility auditor and form workflow.',
    sampleDecisionCriteria: 'Scholarship Eligibility Verdict: Income ceiling <= Rs 2.5 LPA and minimum 60% aggregate verified.',
    schema: {
      type: 'object',
      properties: {
        portal_name: { type: 'string' },
        scheme_name: { type: 'string' },
        application_deadline: { type: 'string' },
        income_ceiling: { type: 'string' },
        mandatory_documents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              document_name: { type: 'string' },
              accepted_types: { type: 'string' },
              is_mandatory: { type: 'boolean' },
              verbatim_rule: { type: 'string' }
            },
            required: ['document_name', 'is_mandatory']
          }
        },
        procedure_steps: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['portal_name', 'scheme_name', 'mandatory_documents']
    }
  },
  {
    id: 'parivahan-license',
    title: 'Sarathi Parivahan: Driving License Renewal',
    category: 'opportunity',
    url: 'https://parivahan.gov.in',
    goal: 'Navigate to driving license services. Extract necessary forms (Form 1, Form 1A medical if applicable), fee breakdown, slot booking steps, and mandatory document proofs. Stop after checking application steps. Return structured JSON.',
    description: 'Autonomous transport department workflow for Learner & Permanent License services.',
    sampleDecisionCriteria: 'License Renewal Audit: Form 1 self-declaration and valid eye test requirement check.',
    schema: {
      type: 'object',
      properties: {
        portal_name: { type: 'string' },
        service_name: { type: 'string' },
        official_fee: { type: 'string' },
        mandatory_documents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              document_name: { type: 'string' },
              accepted_types: { type: 'string' },
              is_mandatory: { type: 'boolean' },
              verbatim_rule: { type: 'string' }
            },
            required: ['document_name', 'is_mandatory']
          }
        },
        procedure_steps: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['portal_name', 'service_name', 'mandatory_documents']
    }
  }
];
