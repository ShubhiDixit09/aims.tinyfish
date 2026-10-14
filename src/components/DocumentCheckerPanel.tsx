'use client';

import React, { useState } from 'react';
import { CitizenDocumentCheck } from '@/lib/types';
import { auditCitizenDocuments, DocumentAuditSummary } from '@/lib/documentChecker';
import { FileCheck, AlertTriangle, FileText, Minimize2, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DocumentCheckerPanelProps {
  initialDocs: CitizenDocumentCheck[];
  applicantName: string;
  onOpenAffidavitModal: () => void;
}

export function DocumentCheckerPanel({
  initialDocs,
  applicantName,
  onOpenAffidavitModal,
}: DocumentCheckerPanelProps) {
  const [docs, setDocs] = useState<CitizenDocumentCheck[]>(initialDocs);
  const audit: DocumentAuditSummary = auditCitizenDocuments(docs, applicantName);

  const handleCompressFile = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id === docId && d.uploadedFileSizeKb) {
          // Simulate compression to 82KB (under the 100KB threshold)
          return {
            ...d,
            uploadedFileSizeKb: 82,
            isCompliant: true,
            complianceNotes: 'Compressed: 82 KB (now compliant with Delhi 100KB portal limit). Quality intact for OCR.',
          };
        }
        return d;
      })
    );
  };

  return (
    <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECEAE5]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#059669]/10 border border-[#059669]/20 text-[#059669]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#191817]">
                Pre-Flight Document & Upload Constraint Auditor
              </h3>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                audit.allValid
                  ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20'
                  : 'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20'
              }`}>
                {audit.readyCount} / {audit.totalRequired} Ready
              </span>
            </div>
            <p className="text-xs text-[#73726E] mt-0.5">
              Enforces state portal hard ceilings: <span className="font-semibold text-[#191817]">Max 100KB file size</span> and Aadhaar name consistency.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAffidavitModal}
          className="px-4 py-2 rounded-xl bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#191817] text-xs font-semibold border border-[#ECEAE5] transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8590C]" />
          <span>Draft Legal Affidavit</span>
        </button>
      </div>

      {/* Blocker Alert Banner if any */}
      {audit.blockerMessage && (
        <div className="p-4 rounded-2xl bg-[#D97706]/10 border border-[#D97706]/20 flex items-start gap-3 text-xs text-[#92400E]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
          <div>
            <div className="font-bold text-[#78350F]">Portal Submission Blocker Identified:</div>
            <div className="text-[11px] text-[#92400E] mt-0.5">{audit.blockerMessage}</div>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audit.documents.map((doc) => {
          const isOversized = doc.uploadedFileSizeKb && doc.uploadedFileSizeKb > doc.maxSizeKb;

          return (
            <div
              key={doc.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                doc.isCompliant
                  ? 'bg-[#FBFBFA] border-[#ECEAE5] hover:border-[#DDD9D2]'
                  : 'bg-[#FEF3C7]/30 border-[#F59E0B]/40 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold text-[#191817] leading-snug">
                    {doc.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      doc.isCompliant
                        ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20'
                        : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
                    }`}
                  >
                    {doc.isCompliant ? 'Verified' : 'Blocked (>100KB)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#73726E] mb-2.5">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#8A867E]" />
                    {doc.uploadedFileName || 'No file selected'}
                  </span>
                  {doc.uploadedFileSizeKb && (
                    <span
                      className={`font-semibold font-mono text-[11px] ${
                        isOversized ? 'text-[#DC2626] font-bold' : 'text-[#059669]'
                      }`}
                    >
                      {doc.uploadedFileSizeKb} KB (Max {doc.maxSizeKb} KB)
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#57544E] leading-relaxed mb-4">
                  {doc.complianceNotes}
                </p>
              </div>

              {/* Action trigger: Compress if oversized */}
              {isOversized && (
                <button
                  type="button"
                  onClick={() => handleCompressFile(doc.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#191817] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-[#FFA94D]" />
                  <span>Compress File to 82 KB (Pass 100KB Ceiling)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
