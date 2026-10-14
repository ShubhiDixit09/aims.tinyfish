'use client';

import React, { useState } from 'react';
import { generateDelhiIncomeAffidavit, AffidavitDetails } from '@/lib/affidavitGenerator';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border border-stone-200 text-stone-800 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                Official Self-Declaration Affidavit Drafter
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  ANNEXURE - I
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Government of NCT of Delhi • Revenue Department prescribed format
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Editable Parameters & Live Document Preview */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Applicant Name</label>
              <input
                type="text"
                value={details.applicantName}
                onChange={(e) => setDetails({ ...details, applicantName: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Father's / Husband's Name</label>
              <input
                type="text"
                value={details.fatherOrHusbandName}
                onChange={(e) => setDetails({ ...details, fatherOrHusbandName: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Annual Family Income (₹)</label>
              <input
                type="text"
                value={details.annualFamilyIncome}
                onChange={(e) => setDetails({ ...details, annualFamilyIncome: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Years Living in Delhi</label>
              <input
                type="number"
                value={details.yearsInDelhi}
                onChange={(e) => setDetails({ ...details, yearsInDelhi: parseInt(e.target.value) || 0 })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">Permanent Residence Address</label>
              <input
                type="text"
                value={details.residenceAddress}
                onChange={(e) => setDetails({ ...details, residenceAddress: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Legal Document Parchment Style Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800">
                Generated Legal Document Preview (Annexure-I)
              </span>
              <span className="text-[11px] text-stone-500">
                Ready for digital or physical signature
              </span>
            </div>

            <pre className="p-5 rounded-xl bg-[#FDFCF8] border border-stone-300 font-mono text-[11px] text-stone-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-72 overflow-y-auto">
              {generatedText}
            </pre>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-t border-stone-200">
          <div className="text-xs text-stone-500">
            Compliant with Delhi Right to Public Services Act, 2011
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 shadow-sm transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Affidavit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
