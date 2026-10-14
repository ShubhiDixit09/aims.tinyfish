'use client';

import React, { useState } from 'react';
import { CitizenDocumentCheck } from '@/lib/types';
import { auditCitizenDocuments, DocumentAuditSummary } from '@/lib/documentChecker';
import { FileCheck, AlertTriangle, FileText, Minimize2, Sparkles } from 'lucide-react';

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
            complianceNotes: 'Compressed: 82 KB (now compliant with Delhi 100KB portal limit). Resolution verified.',
          };
        }
        return d;
      })
    );
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-card space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 shadow-sm">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              Pre-Flight Document & PDF Auditor
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                audit.allValid
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {audit.readyCount} / {audit.totalRequired} Ready
              </span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Validates strict government portal upload constraints: Max 100KB ceiling and Aadhaar name consistency
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAffidavitModal}
          className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-600" />
          <span>Draft Annexure-I Affidavit</span>
        </button>
      </div>

      {/* Blocker Alert Banner if any */}
      {audit.blockerMessage && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-amber-950">Portal Submission Blocker Identified:</div>
            <div className="text-[11px] text-amber-800 mt-0.5">{audit.blockerMessage}</div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audit.documents.map((doc) => {
          const isOversized = doc.uploadedFileSizeKb && doc.uploadedFileSizeKb > doc.maxSizeKb;

          return (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                doc.isCompliant
                  ? 'bg-stone-50/60 border-stone-200 hover:border-stone-300'
                  : 'bg-amber-50/40 border-amber-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-stone-900 leading-tight">
                    {doc.name}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      doc.isCompliant
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {doc.isCompliant ? 'Valid' : 'Blocked (>100KB)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                  <span className="flex items-center gap-1 font-mono">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    {doc.uploadedFileName || 'No file selected'}
                  </span>
                  {doc.uploadedFileSizeKb && (
                    <span
                      className={`font-semibold font-mono ${isOversized ? 'text-amber-800 font-bold' : 'text-stone-700'}`}
                    >
                      {doc.uploadedFileSizeKb} KB (Max {doc.maxSizeKb} KB)
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {doc.complianceNotes}
                </p>
              </div>

              {/* Action trigger: Compress if oversized */}
              {isOversized && (
                <button
                  type="button"
                  onClick={() => handleCompressFile(doc.id)}
                  className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Compress File to 82 KB (Compliant)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
