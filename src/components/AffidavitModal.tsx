'use client';

import React, { useState } from 'react';
import { generateDelhiIncomeAffidavit, AffidavitDetails } from '@/lib/affidavitGenerator';
import { X, Copy, Check, Download, FileText, CheckCircle2 } from 'lucide-react';

interface AffidavitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AffidavitModal({ isOpen, onClose }: AffidavitModalProps) {
  const [details, setDetails] = useState<AffidavitDetails>({
    applicantName: 'Rahul Sharma',
    fatherOrHusbandName: 'Late Shri Ramesh Sharma',
    residenceAddress: 'Flat 402, Pocket B, Rohini Sector 14, Delhi',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#191817]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-[#ECEAE5] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#FBFBFA] border-b border-[#ECEAE5]">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#E8590C]/10 border border-[#E8590C]/20 text-[#E8590C] shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#191817]">
                  Official Self-Declaration Affidavit Drafter
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8590C]/10 text-[#C2410C] border border-[#E8590C]/20 uppercase">
                  Annexure - I
                </span>
              </div>
              <p className="text-xs text-[#73726E] mt-0.5">
                Revenue Department, Govt. of NCT of Delhi • Prescribed Self-Attested Template
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A867E] hover:text-[#191817] hover:bg-[#F0EEEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Editable Parameters & Live Document Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FBFBFA] p-5 rounded-2xl border border-[#ECEAE5]">
            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Applicant Name</label>
              <input
                type="text"
                value={details.applicantName}
                onChange={(e) => setDetails({ ...details, applicantName: e.target.value })}
                className="w-full bg-white border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#191817] focus:outline-none focus:border-[#191817] shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Father's / Husband's Name</label>
              <input
                type="text"
                value={details.fatherOrHusbandName}
                onChange={(e) => setDetails({ ...details, fatherOrHusbandName: e.target.value })}
                className="w-full bg-white border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#191817] focus:outline-none focus:border-[#191817] shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Annual Family Income (₹)</label>
              <input
                type="text"
                value={details.annualFamilyIncome}
                onChange={(e) => setDetails({ ...details, annualFamilyIncome: e.target.value })}
                className="w-full bg-white border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#191817] focus:outline-none focus:border-[#191817] shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Years Living in Delhi</label>
              <input
                type="number"
                value={details.yearsInDelhi}
                onChange={(e) => setDetails({ ...details, yearsInDelhi: parseInt(e.target.value) || 0 })}
                className="w-full bg-white border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#191817] focus:outline-none focus:border-[#191817] shadow-inner"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Permanent Residence Address</label>
              <input
                type="text"
                value={details.residenceAddress}
                onChange={(e) => setDetails({ ...details, residenceAddress: e.target.value })}
                className="w-full bg-white border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#191817] focus:outline-none focus:border-[#191817] shadow-inner"
              />
            </div>
          </div>

          {/* Legal Document Parchment Style Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#191817]">
                Generated Legal Document Preview (Annexure-I)
              </span>
              <span className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid under Section 4 Delhi Revenue Code
              </span>
            </div>

            <pre className="p-6 rounded-2xl bg-[#FDFCF8] border border-[#ECEAE5] font-mono text-[11px] text-[#191817] whitespace-pre-wrap leading-relaxed shadow-inner max-h-72 overflow-y-auto">
              {generatedText}
            </pre>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#FBFBFA] border-t border-[#ECEAE5]">
          <div className="text-xs text-[#73726E]">
            Compliant with Delhi Right to Public Services Act, 2011
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F0EEEA] text-[#191817] text-xs font-semibold border border-[#ECEAE5] shadow-sm transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl bg-[#191817] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Affidavit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
