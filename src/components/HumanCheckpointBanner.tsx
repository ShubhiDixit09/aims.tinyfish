'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, XCircle, AlertCircle, Eye } from 'lucide-react';

interface HumanCheckpointBannerProps {
  applicantName?: string;
  portalName?: string;
  serviceName?: string;
  annualIncome?: string;
  onApprove: () => void;
  onModify: () => void;
  isAuthorized: boolean;
}

export function HumanCheckpointBanner({
  applicantName = 'Rahul Sharma',
  portalName = 'Delhi e-District Portal',
  serviceName = 'Issuance of Income Certificate',
  annualIncome = '₹1,80,000 / year',
  onApprove,
  onModify,
  isAuthorized,
}: HumanCheckpointBannerProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (isAuthorized) {
    return (
      <div className="bg-[#059669]/5 border border-[#059669]/20 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white border border-[#059669]/20 text-[#059669] shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#191817] flex items-center gap-2">
              Citizen Authorization Granted
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
                AUDIT HASH: #CP-AUTH-7892
              </span>
            </h4>
            <p className="text-xs text-[#57544E] mt-0.5">
              Personal Agent authorized to execute portal form commit and capture acknowledgement receipt.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#059669] bg-white px-4 py-1.5 rounded-full border border-[#059669]/20 shadow-sm">
          Verified by Citizen
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-3xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-white border border-[#FDE68A] text-[#D97706] shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/20">
                Stage 5 Safety Boundary
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#191817] tracking-tight">
                Citizen Authorization Required Before Portal Submission
              </h3>
            </div>
            <p className="text-xs text-[#78350F] mt-0.5">
              Personal Agent Safety Standard: Government portal submissions and OTP dispatch require explicit human confirmation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-[#92400E] hover:text-[#78350F] font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Hide Verification Dossier' : 'Inspect Audit Dossier'}</span>
        </button>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white border border-[#FDE68A] rounded-2xl p-4 text-xs shadow-sm">
        <div>
          <span className="text-[10px] text-[#8A867E] block uppercase font-bold">Applicant</span>
          <span className="font-bold text-[#191817]">{applicantName}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8A867E] block uppercase font-bold">Target Service</span>
          <span className="font-bold text-[#191817]">{serviceName}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8A867E] block uppercase font-bold">Declared Income</span>
          <span className="font-bold text-[#191817]">{annualIncome}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8A867E] block uppercase font-bold">Self-Declaration</span>
          <span className="font-bold text-[#059669]">Annexure-I Attached</span>
        </div>
      </div>

      {/* Detailed Inspection Drawer */}
      {showDetails && (
        <div className="bg-white border border-[#ECEAE5] rounded-2xl p-4 text-xs space-y-2 text-[#57544E] shadow-sm">
          <div className="font-bold text-[#191817] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#E8590C]" />
            <span>Pre-Flight Integrity Sign-Off:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#57544E] text-[11px]">
            <li>All attached files strictly conform to the 100KB portal limit.</li>
            <li>Applicant name matches Aadhaar card identity records without discrepancies.</li>
            <li>Annexure-I legal affidavit drafted conforming to Delhi Revenue Department guidelines.</li>
            <li>This action will execute submission on <span className="font-mono text-[#191817] font-semibold">https://edistrict.delhigovt.nic.in</span>.</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#FDE68A]">
        <div className="flex items-center gap-2 text-[11px] text-[#92400E]">
          <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>Biometric physical office appointments cannot be bypassed by automation.</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onModify}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-[#F0EEEA] text-[#57544E] text-xs font-semibold border border-[#ECEAE5] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={onApprove}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#191817] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Authorize & Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
