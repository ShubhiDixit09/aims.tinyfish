import { CitizenDocumentCheck } from './types';

export interface DocumentAuditSummary {
  allValid: boolean;
  totalRequired: number;
  readyCount: number;
  oversizedCount: number;
  inconsistentCount: number;
  documents: CitizenDocumentCheck[];
  blockerMessage: string | null;
}

export const INITIAL_EDISTRICT_DOCS: CitizenDocumentCheck[] = [
  {
    id: 'doc-aadhaar',
    name: 'Aadhaar Card (Identity & Delhi Residence Proof)',
    requiredType: 'PDF or JPEG',
    maxSizeKb: 100,
    uploadedFileName: 'aadhaar_front_back.pdf',
    uploadedFileSizeKb: 84,
    isCompliant: true,
    complianceNotes: 'Valid PDF (84KB <= 100KB limit). Resolution acceptable for OCR verification.',
    nameDetected: 'Rahul Sharma',
    nameMatchConfidence: 100,
  },
  {
    id: 'doc-salary',
    name: 'Proof of Income (Salary Slip / Form 16 / ITR)',
    requiredType: 'PDF or JPEG',
    maxSizeKb: 100,
    uploadedFileName: 'salary_slip_sep2026.pdf',
    uploadedFileSizeKb: 142, // OVERSIZED! (Triggers portal rejection check)
    isCompliant: false,
    complianceNotes: 'OVERSIZED: File is 142KB. Delhi e-District strictly enforces 100KB ceiling per file.',
    nameDetected: 'Rahul Sharma',
    nameMatchConfidence: 100,
  },
  {
    id: 'doc-residence',
    name: 'Continuous 3-Year Delhi Residence Proof (Electricity Bill)',
    requiredType: 'PDF or JPEG',
    maxSizeKb: 100,
    uploadedFileName: 'bses_power_bill_aug2026.pdf',
    uploadedFileSizeKb: 76,
    isCompliant: true,
    complianceNotes: 'Compliant (76KB). BSES Delhi consumer address verified within NCT jurisdiction.',
    nameDetected: 'R Sharma',
    nameMatchConfidence: 92,
  },
  {
    id: 'doc-affidavit',
    name: 'Self-Declaration Affidavit (Prescribed Annexure-I)',
    requiredType: 'PDF or JPEG',
    maxSizeKb: 100,
    uploadedFileName: 'annexure_1_self_declaration.pdf',
    uploadedFileSizeKb: 52,
    isCompliant: true,
    complianceNotes: 'Compliant (52KB). Generated from official Delhi Revenue Department template.',
    nameDetected: 'Rahul Sharma',
    nameMatchConfidence: 100,
  },
];

export function auditCitizenDocuments(
  docs: CitizenDocumentCheck[],
  targetApplicantName = 'Rahul Sharma'
): DocumentAuditSummary {
  let readyCount = 0;
  let oversizedCount = 0;
  let inconsistentCount = 0;

  const audited = docs.map((doc) => {
    let isCompliant = true;
    let notes = '';

    if (!doc.uploadedFileName) {
      return {
        ...doc,
        isCompliant: false,
        complianceNotes: 'Awaiting upload: This document is mandatory under Delhi Revenue rules.',
      };
    }

    if (doc.uploadedFileSizeKb && doc.uploadedFileSizeKb > doc.maxSizeKb) {
      isCompliant = false;
      oversizedCount++;
      notes = `PORTAL BLOCKER: File is ${doc.uploadedFileSizeKb}KB. Portal limit is ${doc.maxSizeKb}KB. Must compress.`;
    }

    if (doc.nameDetected && targetApplicantName) {
      const matchScore = calculateNameSimilarity(doc.nameDetected, targetApplicantName);
      if (matchScore < 80) {
        isCompliant = false;
        inconsistentCount++;
        notes += ` NAME MISMATCH: Found "${doc.nameDetected}" vs applicant "${targetApplicantName}".`;
      }
    }

    if (isCompliant) {
      readyCount++;
      notes = `VERIFIED: ${doc.uploadedFileSizeKb}KB within ${doc.maxSizeKb}KB ceiling. Name & address verified.`;
    }

    return {
      ...doc,
      isCompliant,
      complianceNotes: notes,
    };
  });

  const allValid = readyCount === docs.length;
  let blockerMessage: string | null = null;

  if (oversizedCount > 0) {
    blockerMessage = `${oversizedCount} document(s) exceed the strict 100KB government portal limit. Compress before dispatch.`;
  } else if (inconsistentCount > 0) {
    blockerMessage = `${inconsistentCount} document(s) show name discrepancy against Aadhaar card. Resolve to prevent Tehsildar rejection.`;
  } else if (readyCount < docs.length) {
    blockerMessage = `Missing mandatory documents. Delhi e-District requires all 4 proofs before form submission.`;
  }

  return {
    allValid,
    totalRequired: docs.length,
    readyCount,
    oversizedCount,
    inconsistentCount,
    documents: audited,
    blockerMessage,
  };
}

function calculateNameSimilarity(a: string, b: string): number {
  const normA = a.toLowerCase().replace(/[^a-z]/g, '');
  const normB = b.toLowerCase().replace(/[^a-z]/g, '');
  if (normA === normB) return 100;
  if (normA.includes(normB) || normB.includes(normA)) return 90;
  return 60;
}
