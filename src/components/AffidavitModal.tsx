'use client';

import React, { useState } from 'react';
import { generateDelhiIncomeAffidavit, AffidavitDetails } from '@/lib/affidavitGenerator';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';

interface AffidavitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AffidavitModal({ isOpen, onClose }: AffidavitModalProps) {
  const [details, setDetails] = useState<AffidavitDetails>({
    applicantName: 'Rahul Sharma',
    fatherOrHusbandName: 'Late Shri Ramesh Sharma',
    residenceAddress: 'Flat 402, Pocket B, Rohini Sector 14',
    yearsInDelhi: 8,
    annualFamilyIncome: '1,80,000',
    incomeSources: 'Private sector employment & retail shop assistance',
    purpose: 'College Merit-cum-Means Scholarship & Fee Concession',
  });

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedText = generateDelhiIncomeAffidavit(details);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Delhi_eDistrict_Income_Affidavit_${details.applicantName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dark-900 border border-dark-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-dark-850 border-b border-dark-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Official Self-Declaration Affidavit Drafter
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tinyfish-600/20 text-tinyfish-400">
                  ANNEXURE - I
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pre-formatted for Delhi e-District Revenue Department submission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs & Preview */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Applicant Name</label>
              <input
                type="text"
                value={details.applicantName}
                onChange={(e) => setDetails({ ...details, applicantName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-tinyfish-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Father / Husband Name</label>
              <input
                type="text"
                value={details.fatherOrHusbandName}
                onChange={(e) => setDetails({ ...details, fatherOrHusbandName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-tinyfish-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Annual Family Income (₹)</label>
              <input
                type="text"
                value={details.annualFamilyIncome}
                onChange={(e) => setDetails({ ...details, annualFamilyIncome: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-tinyfish-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Years Living in Delhi</label>
              <input
                type="number"
                value={details.yearsInDelhi}
                onChange={(e) => setDetails({ ...details, yearsInDelhi: Number(e.target.value) })}
                className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-tinyfish-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Delhi Residence Address</label>
            <input
              type="text"
              value={details.residenceAddress}
              onChange={(e) => setDetails({ ...details, residenceAddress: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-tinyfish-500"
            />
          </div>

          {/* Generated Text View */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Legal Format Preview</span>
              <span className="text-emerald-400">Strictly IPC 177/182 Compliant</span>
            </div>
            <pre className="p-4 bg-dark-950 rounded-xl border border-dark-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
              {generatedText}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-dark-850 border-t border-dark-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Print on plain paper or ₹10 stamp paper as required by district.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Text</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg bg-tinyfish-600 hover:bg-tinyfish-500 text-white text-xs font-mono flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Draft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
