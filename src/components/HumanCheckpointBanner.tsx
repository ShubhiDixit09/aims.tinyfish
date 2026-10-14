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
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-700 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              Citizen Authorization Granted
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                AUDIT TOKEN: #CP-AUTH-7892
              </span>
            </h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              Personal Agent authorized to execute portal form commit and capture acknowledgement receipt.
            </p>
          </div>
        </div>

        <span className="text-xs font-medium text-emerald-800 bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
          Verified by Citizen
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-amber-700 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Stage 5 Checkpoint
              </span>
              <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                Citizen Authorization Required Before Portal Submission
              </h3>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Personal Agent Safety Standard: Final government portal submission and OTP dispatch require explicit human consent.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Hide Verification Dossier' : 'Inspect Dossier'}</span>
        </button>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white border border-amber-200/70 rounded-xl p-3.5 text-xs shadow-sm">
        <div>
          <span className="text-[10px] text-stone-500 block uppercase font-medium">Applicant</span>
          <span className="font-semibold text-stone-900">{applicantName}</span>
        </div>
        <div>
          <span className="text-[10px] text-stone-500 block uppercase font-medium">Target Service</span>
          <span className="font-semibold text-stone-900">{serviceName}</span>
        </div>
        <div>
          <span className="text-[10px] text-stone-500 block uppercase font-medium">Declared Income</span>
          <span className="font-semibold text-stone-900">{annualIncome}</span>
        </div>
        <div>
          <span className="text-[10px] text-stone-500 block uppercase font-medium">Self-Declaration</span>
          <span className="font-semibold text-emerald-700">Annexure-I Attached</span>
        </div>
      </div>

      {/* Detailed Inspection Drawer */}
      {showDetails && (
        <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs space-y-2 text-stone-700 shadow-sm">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-600" />
            <span>Pre-Flight Integrity Sign-Off:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
            <li>All attached files are under the strict 100KB portal limit.</li>
            <li>Applicant name matches Aadhaar card identity records without discrepancies.</li>
            <li>Annexure-I legal affidavit generated conforming to Delhi Revenue Department guidelines.</li>
            <li>This action will execute final submission on <span className="font-mono text-stone-800">https://edistrict.delhigovt.nic.in</span>.</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-amber-200/60">
        <div className="flex items-center gap-2 text-[11px] text-stone-600">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>Biometric and physical office appointments cannot be bypassed by automation.</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onModify}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium border border-stone-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={onApprove}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Authorize & Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
