import { TinyFishEvent } from './types';

export interface SavedDemoRecord {
  id: string;
  title: string;
  url: string;
  goal: string;
  events: TinyFishEvent[];
  result: any;
  decisionVerdict: {
    recommendation: string;
    fitScore: number;
    decisionExplanation: string;
    evidencePassages: string[];
    riskWarnings: string[];
  };
}

export const SAVED_DEMO_RECOVERY: SavedDemoRecord = {
  id: 'saved-edistrict-workflow',
  title: 'Delhi e-District: Income Certificate Workflow',
  url: 'https://edistrict.delhigovt.nic.in',
  goal: 'Navigate to citizen services for Income Certificate. Extract the mandatory document checklist (ID proof, salary slip/ITR, residence proof), processing timeline, fee amount, and step-by-step application procedure. Return structured JSON with verbatim evidence.',
  events: [
    {
      type: 'STARTED',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      type: 'STREAMING_URL',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      streaming_url: 'https://edistrict.delhigovt.nic.in',
      timestamp: new Date(Date.now() - 55000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      purpose: 'Navigating to Revenue Department services on Delhi e-District portal.',
      timestamp: new Date(Date.now() - 40000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      purpose: 'Inspecting Revenue Guidelines: Extracting mandatory document checklist and photo specifications.',
      timestamp: new Date(Date.now() - 25000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      purpose: 'Parsing SLA timeline (14 days), statutory fee (Nil / Free), and pre-submission human approval rules.',
      timestamp: new Date(Date.now() - 10000).toISOString(),
    },
    {
      type: 'COMPLETE',
      run_id: 'edistrict-9812-42bf-be44-89712aeb7821',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      result: {
        portal_name: 'Delhi e-District (Revenue Department, Govt. of NCT of Delhi)',
        service_name: 'Issuance of Income Certificate for Citizens',
        processing_timeline_days: '14 Working Days (Guaranteed under Citizen Service Guarantee Act)',
        official_fee: '₹0 (Free / No official government fee)',
        mandatory_documents: [
          {
            document_name: 'Proof of Identity',
            accepted_types: 'Aadhaar Card, Voter ID, Passport, PAN Card',
            is_mandatory: true,
            verbatim_rule: 'Any one of the government-issued photo identity cards must be uploaded.',
          },
          {
            document_name: 'Proof of Current Residence',
            accepted_types: 'Aadhaar Card, Electricity Bill, Water Bill, Rent Agreement',
            is_mandatory: true,
            verbatim_rule: 'Applicant must be a continuous resident of Delhi for at least 3 years.',
          },
          {
            document_name: 'Proof of Income / Salary Certificate',
            accepted_types: 'Form 16, Salary Slip, ITR Acknowledgement, or BPL Ration Card',
            is_mandatory: true,
            verbatim_rule: 'Salary slip of last 3 months or copy of latest Income Tax Return.',
          },
          {
            document_name: 'Self-Declaration Affidavit',
            accepted_types: 'Prescribed Form Annexure-I signed by applicant',
            is_mandatory: true,
            verbatim_rule: 'Self-declaration in prescribed format declaring annual family income from all sources.',
          },
        ],
        procedure_steps: [
          'Step 1: Citizen Registration with Aadhaar verification on e-District portal.',
          'Step 2: Selection of Issuance of Income Certificate under Revenue Department.',
          'Step 3: Autofill of applicant profile and family income details.',
          'Step 4: Uploading scanned documents (PDF/JPEG max 100KB each).',
          'Step 5: Pre-Submission Review (Citizen OTP confirmation required before final dispatch).',
          'Step 6: Field verification by Area Tehsildar within 7 days.',
          'Step 7: Digitally signed certificate download via acknowledgment number.',
        ],
        safety_notice: 'HUMAN CHECKPOINT: Agent pauses form submission at Step 5. No application is dispatched without explicit user review and mobile OTP entry.',
      },
    },
  ],
  result: {
    portal_name: 'Delhi e-District (Revenue Department, Govt. of NCT of Delhi)',
    service_name: 'Issuance of Income Certificate for Citizens',
    processing_timeline_days: '14 Working Days (Guaranteed under Citizen Service Guarantee Act)',
    official_fee: '₹0 (Free / No official government fee)',
    mandatory_documents: [
      {
        document_name: 'Proof of Identity',
        accepted_types: 'Aadhaar Card, Voter ID, Passport, PAN Card',
        is_mandatory: true,
        verbatim_rule: 'Any one of the government-issued photo identity cards must be uploaded.',
      },
      {
        document_name: 'Proof of Current Residence',
        accepted_types: 'Aadhaar Card, Electricity Bill, Water Bill, Rent Agreement',
        is_mandatory: true,
        verbatim_rule: 'Applicant must be a continuous resident of Delhi for at least 3 years.',
      },
      {
        document_name: 'Proof of Income / Salary Certificate',
        accepted_types: 'Form 16, Salary Slip, ITR Acknowledgement, or BPL Ration Card',
        is_mandatory: true,
        verbatim_rule: 'Salary slip of last 3 months or copy of latest Income Tax Return.',
      },
      {
        document_name: 'Self-Declaration Affidavit',
        accepted_types: 'Prescribed Form Annexure-I signed by applicant',
        is_mandatory: true,
        verbatim_rule: 'Self-declaration in prescribed format declaring annual family income from all sources.',
      },
    ],
    procedure_steps: [
      'Step 1: Citizen Registration with Aadhaar verification on e-District portal.',
      'Step 2: Selection of Issuance of Income Certificate under Revenue Department.',
      'Step 3: Autofill of applicant profile and family income details.',
      'Step 4: Uploading scanned documents (PDF/JPEG max 100KB each).',
      'Step 5: Pre-Submission Review (Citizen OTP confirmation required before final dispatch).',
      'Step 6: Field verification by Area Tehsildar within 7 days.',
      'Step 7: Digitally signed certificate download via acknowledgment number.',
    ],
    safety_notice: 'HUMAN CHECKPOINT: Agent pauses form submission at Step 5. No application is dispatched without explicit user review and mobile OTP entry.',
  },
  decisionVerdict: {
    recommendation: 'VERDICT: Ready for Pre-Submission & Document Upload',
    fitScore: 100,
    decisionExplanation: 'All 4 statutory document requirements identified from live portal. Zero official government fee. Application timeline: 14 business days.',
    evidencePassages: [
      'Verified: 14 Working Days statutory timeline under Delhi Right to Public Services Act.',
      'Verified: ₹0 Official government application fee.',
      'Verified: All 4 accepted document classes mapped with exact file size limits (100KB).',
    ],
    riskWarnings: [
      'Delhi 3-year minimum residency proof required; non-Delhi residents will be rejected by Tehsildar.',
      'Affidavit must be in prescribed Annexure-I format (Self-declaration generator available).',
    ],
  },
};
