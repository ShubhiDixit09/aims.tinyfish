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
      <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              Citizen Authorization Granted
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                AUDIT HASH: #CP-AUTH-7892
              </span>
            </h4>
            <p className="text-[11px] text-emerald-400/80">
              Agent authorized to proceed with portal form commit and acknowledgment receipt capture.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-lg border border-emerald-700/50">
          AUTHORIZED BY CITIZEN
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-950/60 via-dark-900 to-amber-950/40 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                STAGE 5 CHECKPOINT
              </span>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Citizen Authorization Required Before Portal Submission
              </h3>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              Personal Agent Safety Standard: Final government portal submission and OTP dispatch require explicit human consent.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Hide Verification Dossier' : 'Inspect Dossier'}</span>
        </button>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-dark-950/80 border border-amber-500/20 rounded-xl p-3 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Applicant</span>
          <span className="font-semibold text-slate-200">{applicantName}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Target Service</span>
          <span className="font-semibold text-slate-200">{serviceName}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Declared Income</span>
          <span className="font-semibold text-amber-300">{annualIncome}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Self-Declaration</span>
          <span className="font-semibold text-emerald-400">Annexure-I Attached</span>
        </div>
      </div>

      {/* Detailed Inspection Drawer */}
      {showDetails && (
        <div className="bg-dark-950 border border-dark-800 rounded-xl p-3 text-xs space-y-2 text-slate-300">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-tinyfish-400" />
            <span>Pre-Flight Integrity Sign-Off:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
            <li>All attached files are under the strict 100KB portal limit.</li>
            <li>Applicant name matches Aadhaar card identity records without discrepancies.</li>
            <li>Annexure-I legal affidavit generated conforming to Delhi Revenue Department guidelines.</li>
            <li>This action will execute final submission on <span className="font-mono text-tinyfish-300">https://edistrict.delhigovt.nic.in</span>.</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-500/20">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Biometric and physical office appointments cannot be bypassed by automation.</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onModify}
            className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 text-xs font-medium border border-dark-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={onApprove}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Authorize & Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
