'use client';

import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Shield,
  ChevronRight,
  ArrowRight,
  User,
  ExternalLink,
} from 'lucide-react';
import { DocumentCheckerPanel } from './DocumentCheckerPanel';
import { CitizenVoiceAssistant } from './CitizenVoiceAssistant';
import { HumanCheckpointBanner } from './HumanCheckpointBanner';
import { INITIAL_EDISTRICT_DOCS } from '@/lib/documentChecker';

interface CitizenCornerProps {
  onOpenAffidavitModal: () => void;
  onLaunchLiveAgent: (presetId: string) => void;
}

export function CitizenCorner({
  onOpenAffidavitModal,
  onLaunchLiveAgent,
}: CitizenCornerProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'workspace' | 'vault' | 'drafts' | 'voice'>('workspace');

  // Personal Vault Data
  const [profile, setProfile] = useState({
    fullName: 'Rahul Sharma',
    fatherName: 'Late Shri Ramesh Sharma',
    residence: 'Flat 402, Pocket B, Rohini Sector 14, Delhi - 110085',
    aadhaarLast4: '4912',
    annualIncome: '₹1,80,000',
    mobile: '+91 98712 34567',
    delhiResidentYears: 8,
  });

  const [acknowledgement] = useState({
    refNumber: 'ED/2026/891240',
    submissionDate: '14 Oct 2026',
    estimatedCompletion: '28 Oct 2026 (14 working days)',
    nodalOffice: 'Sub-Divisional Magistrate (SDM) Office, Rohini Sector 10',
    tehsildarJurisdiction: 'Alipur / Rohini Sub-Division',
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
              CITIZEN WORKSPACE
            </span>
            <span className="text-xs text-stone-500">
              Jurisdiction: <span className="font-medium text-stone-800">Govt. of NCT of Delhi</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Namaste, {profile.fullName.split(' ')[0]} 👋
          </h2>
          <p className="text-sm text-stone-600 max-w-2xl mt-1.5 leading-relaxed">
            Discover service requirements, check documents for 100KB portal constraints, generate legal self-declarations, and track automated applications with human approval.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200/80 self-stretch lg:self-auto justify-between lg:justify-start">
          <button
            onClick={() => setActiveSubTab('workspace')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeSubTab === 'workspace'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveSubTab('vault')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeSubTab === 'vault'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Citizen Vault
          </button>
          <button
            onClick={() => setActiveSubTab('drafts')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeSubTab === 'drafts'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Receipts
          </button>
          <button
            onClick={() => setActiveSubTab('voice')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeSubTab === 'voice'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Voice Copilot
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-card">
          <span className="text-[11px] font-medium tracking-wide uppercase text-stone-500">Active Service</span>
          <div className="text-xl font-bold text-stone-900 mt-1">Delhi Income Cert</div>
          <span className="text-xs text-stone-500 mt-1 block">SDM Rohini Sub-Division</span>
        </div>
        <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-card">
          <span className="text-[11px] font-medium tracking-wide uppercase text-stone-500">Document Readiness</span>
          <div className="text-xl font-bold text-emerald-700 mt-1">4 / 4 Compliant</div>
          <span className="text-xs text-stone-500 mt-1 block">100KB ceiling verified</span>
        </div>
        <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-card">
          <span className="text-[11px] font-medium tracking-wide uppercase text-stone-500">Legal Declaration</span>
          <div className="text-xl font-bold text-stone-900 mt-1">Annexure-I</div>
          <span className="text-xs text-emerald-700 mt-1 block">Prepared & Signed</span>
        </div>
        <div className="bg-white border border-stone-200/90 p-5 rounded-2xl shadow-card">
          <span className="text-[11px] font-medium tracking-wide uppercase text-stone-500">Safety Checkpoint</span>
          <div className="text-xl font-bold text-stone-900 mt-1">
            {isAuthorized ? 'Authorized' : 'Awaiting Citizen'}
          </div>
          <span className="text-xs text-amber-700 mt-1 block">Human sign-off required</span>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'workspace' && (
        <div className="space-y-6">
          {/* Active Application Journey Card */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono font-medium border border-stone-200">
                    ED/2026/891240
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">
                    Delhi e-District: Issuance of Income Certificate
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Revenue Department, Govt. of NCT of Delhi • Official Delivery SLA: 14 Working Days
                </p>
              </div>

              {/* Direct Jump to Live TinyFish Agent */}
              <button
                onClick={() => onLaunchLiveAgent('edistrict-income')}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Open Live Cockpit Stream</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-stone-600 font-medium">Application Lifecycle</span>
                <span className="font-semibold text-stone-900">Step 4 of 6: Portal Automation</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="h-2 rounded-full bg-emerald-600" title="1. Requirements Discovered" />
                <div className="h-2 rounded-full bg-emerald-600" title="2. Pre-Flight Docs Audited" />
                <div className="h-2 rounded-full bg-emerald-600" title="3. Declaration Drafted" />
                <div className="h-2 rounded-full bg-amber-500 animate-pulse" title="4. Portal Navigating" />
                <div className={`h-2 rounded-full ${isAuthorized ? 'bg-emerald-600' : 'bg-stone-200'}`} title="5. Human Approval" />
                <div className="h-2 rounded-full bg-stone-200" title="6. Acknowledgement" />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 mt-2">
                <span className="font-medium text-stone-700">Requirements</span>
                <span className="font-medium text-stone-700">Doc Audit</span>
                <span className="font-medium text-stone-700">Affidavit</span>
                <span className="font-semibold text-amber-800">Portal Nav</span>
                <span>Sign-off</span>
                <span>Receipt</span>
              </div>
            </div>

            {/* Human Checkpoint Banner */}
            <HumanCheckpointBanner
              applicantName={profile.fullName}
              portalName="Delhi e-District (edistrict.delhigovt.nic.in)"
              serviceName="Income Certificate Issuance"
              annualIncome={profile.annualIncome}
              onApprove={() => setIsAuthorized(true)}
              onModify={() => setActiveSubTab('vault')}
              isAuthorized={isAuthorized}
            />

            {/* Pre-Flight Document Checker Embed */}
            <DocumentCheckerPanel
              initialDocs={INITIAL_EDISTRICT_DOCS}
              applicantName={profile.fullName}
              onOpenAffidavitModal={onOpenAffidavitModal}
            />

            {/* Self-Declaration Action Bar */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Prescribed Self-Declaration (Annexure-I) Prepared
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Pre-filled under Section 4 of Delhi Revenue Department Guidelines with family income and residence duration.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAffidavitModal}
                className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-stone-600" />
                <span>Preview & Sign Affidavit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Vault Tab */}
      {activeSubTab === 'vault' && (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Citizen Personal Details Vault
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Saved profile used by the personal agent to complete government portal forms accurately without repetitive typing.
              </p>
            </div>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Encrypted Local Cache
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Full Legal Name (as per Aadhaar)</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Father's / Husband's Name</label>
              <input
                type="text"
                value={profile.fatherName}
                onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Total Annual Family Income</label>
              <input
                type="text"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Years of Continuous Delhi Residence</label>
              <input
                type="number"
                value={profile.delhiResidentYears}
                onChange={(e) => setProfile({ ...profile, delhiResidentYears: parseInt(e.target.value) || 0 })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Registered NCT Residence Address</label>
              <textarea
                rows={2}
                value={profile.residence}
                onChange={(e) => setProfile({ ...profile, residence: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
            <span className="text-stone-600">Identity Record: Aadhaar Linked (ending in •••• {profile.aadhaarLast4})</span>
            <span className="text-emerald-700 font-medium">UIDAI E-KYC Verified</span>
          </div>
        </div>
      )}

      {/* Drafts & Receipts Tab */}
      {activeSubTab === 'drafts' && (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-700" />
                Official Application Acknowledgements & Slips
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Verifiable reference tokens, submission receipts, and tracking hashes captured from portal DOM.
              </p>
            </div>
          </div>

          {/* Acknowledgement Card */}
          <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Delhi e-District Application Submission Slip</h4>
                  <p className="text-xs font-mono text-stone-500">Ref: {acknowledgement.refNumber}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                Under Revenue Verification
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-white p-4 rounded-xl border border-stone-200/80">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-medium">Submission Date</span>
                <span className="text-stone-800 font-semibold">{acknowledgement.submissionDate}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-medium">SLA Target</span>
                <span className="text-stone-800 font-semibold">{acknowledgement.estimatedCompletion}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-medium">SDM Office</span>
                <span className="text-stone-800 font-semibold">{acknowledgement.nodalOffice}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-medium">Jurisdiction</span>
                <span className="text-stone-800 font-semibold">{acknowledgement.tehsildarJurisdiction}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => alert(`Downloaded Official Receipt PDF for Reference ${acknowledgement.refNumber}`)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Receipt PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Tab */}
      {activeSubTab === 'voice' && (
        <div className="space-y-4">
          <div className="bg-white border border-stone-200/90 p-4 rounded-xl text-xs text-stone-600 shadow-sm">
            <span className="font-semibold text-stone-900">Multilingual Copilot:</span> Ask questions in Hindi, English, or Hinglish regarding Delhi e-District rules, documents, or affidavit procedures.
          </div>
          <CitizenVoiceAssistant
            onSelectServiceIntent={() => setActiveSubTab('workspace')}
            onTriggerDocumentCheck={() => setActiveSubTab('workspace')}
            onGenerateAffidavit={onOpenAffidavitModal}
          />
        </div>
      )}
    </div>
  );
}
