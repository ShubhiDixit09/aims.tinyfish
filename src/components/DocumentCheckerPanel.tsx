'use client';

import React, { useState } from 'react';
import { CitizenDocumentCheck } from '@/lib/types';
import { auditCitizenDocuments, DocumentAuditSummary } from '@/lib/documentChecker';
import { FileCheck, AlertTriangle, CheckCircle2, FileText, Minimize2, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';

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
            complianceNotes: 'COMPRESSED: 82KB (now compliant with Delhi 100KB portal limit). Quality intact.',
          };
        }
        return d;
      })
    );
  };

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Pre-Flight Document & PDF Quality Checker
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                audit.allValid
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {audit.readyCount} / {audit.totalRequired} READY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Validates strict government portal upload constraints: Max 100KB file ceiling & name consistency
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAffidavitModal}
          className="px-3 py-1.5 rounded-lg bg-tinyfish-600/20 hover:bg-tinyfish-600/30 text-tinyfish-300 border border-tinyfish-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Annexure-I Affidavit</span>
        </button>
      </div>

      {/* Blocker Alert Banner if any */}
      {audit.blockerMessage && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold">Portal Submission Blocker Identified:</div>
            <div className="text-[11px] opacity-90">{audit.blockerMessage}</div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {audit.documents.map((doc) => {
          const isOversized = doc.uploadedFileSizeKb && doc.uploadedFileSizeKb > doc.maxSizeKb;

          return (
            <div
              key={doc.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                doc.isCompliant
                  ? 'bg-dark-950/80 border-emerald-500/30'
                  : 'bg-dark-950 border-amber-500/40 shadow-sm shadow-amber-500/5'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-white leading-tight">
                    {doc.name}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                      doc.isCompliant
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {doc.isCompliant ? 'PASS' : 'PORTAL BLOCK'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-500" />
                    {doc.uploadedFileName || 'No file selected'}
                  </span>
                  {doc.uploadedFileSizeKb && (
                    <span
                      className={`font-bold ${isOversized ? 'text-rose-400 underline' : 'text-emerald-400'}`}
                    >
                      {doc.uploadedFileSizeKb} KB (Limit: {doc.maxSizeKb} KB)
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {doc.complianceNotes}
                </p>
              </div>

              {/* Action trigger: Compress if oversized */}
              {isOversized && (
                <button
                  type="button"
                  onClick={() => handleCompressFile(doc.id)}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Minimize2 className="w-3 h-3" />
                  <span>Compress PDF to &lt;100KB</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
