'use client';

import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Download,
  Upload,
  ArrowRight,
  Shield,
  Layers,
  Send,
  User,
  ExternalLink,
  ChevronRight,
  Trash2,
  Copy,
  RefreshCw,
  Info,
} from 'lucide-react';
import { DocumentCheckerPanel } from './DocumentCheckerPanel';
import { CitizenVoiceAssistant } from './CitizenVoiceAssistant';
import { HumanCheckpointBanner } from './HumanCheckpointBanner';
import { INITIAL_EDISTRICT_DOCS } from '@/lib/documentChecker';
import { CitizenDocumentCheck } from '@/lib/types';

interface CitizenCornerProps {
  onOpenAffidavitModal: () => void;
  onLaunchLiveAgent: (presetId: string) => void;
}

export function CitizenCorner({
  onOpenAffidavitModal,
  onLaunchLiveAgent,
}: CitizenCornerProps) {
  const [selectedService, setSelectedService] = useState<'edistrict-income' | 'passport-seva' | 'scholarship-nsp' | 'parivahan-dl'>('edistrict-income');
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

  const handleServiceSelectFromVoice = (serviceId: string) => {
    if (serviceId.includes('passport')) {
      setSelectedService('passport-seva');
    } else if (serviceId.includes('scholarship')) {
      setSelectedService('scholarship-nsp');
    } else if (serviceId.includes('parivahan')) {
      setSelectedService('parivahan-dl');
    } else {
      setSelectedService('edistrict-income');
    }
    setActiveSubTab('workspace');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-800 p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30 font-medium">
              CITIZEN CORNER WORKSPACE
            </span>
            <span className="text-xs font-mono text-slate-400">
              SDM Sub-Division: <span className="text-slate-200">Rohini NCT</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Namaste, {profile.fullName.split(' ')[0]} 👋
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Your single pane of glass for government service discovery, pre-flight document auditing, self-declaration generation, and supervised portal automation.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1.5 bg-dark-950/80 p-1 rounded-xl border border-dark-800 self-stretch lg:self-auto justify-between lg:justify-start">
          <button
            onClick={() => setActiveSubTab('workspace')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'workspace'
                ? 'bg-tinyfish-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Application Workspace
          </button>
          <button
            onClick={() => setActiveSubTab('vault')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'vault'
                ? 'bg-tinyfish-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Citizen Vault
          </button>
          <button
            onClick={() => setActiveSubTab('drafts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'drafts'
                ? 'bg-tinyfish-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Drafts & Receipts
          </button>
          <button
            onClick={() => setActiveSubTab('voice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'voice'
                ? 'bg-tinyfish-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Voice & Chat Copilot
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-900 border border-dark-800 p-4 rounded-xl">
          <span className="text-[10px] font-mono uppercase text-slate-500">Active Applications</span>
          <div className="text-xl font-bold text-white mt-1">1 In-Progress</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">Delhi Income Cert (SDM)</span>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-4 rounded-xl">
          <span className="text-[10px] font-mono uppercase text-slate-500">Document Readiness</span>
          <div className="text-xl font-bold text-white mt-1">4 / 4 Compliant</div>
          <span className="text-[11px] text-tinyfish-400 font-mono mt-0.5 block">100KB ceiling passed</span>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-4 rounded-xl">
          <span className="text-[10px] font-mono uppercase text-slate-500">Self-Declarations</span>
          <div className="text-xl font-bold text-white mt-1">Annexure-I</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">Legally formatted</span>
        </div>
        <div className="bg-dark-900 border border-dark-800 p-4 rounded-xl">
          <span className="text-[10px] font-mono uppercase text-slate-500">Safety Checkpoint</span>
          <div className="text-xl font-bold text-white mt-1">
            {isAuthorized ? 'Authorized' : 'Awaiting Citizen'}
          </div>
          <span className="text-[11px] text-amber-400 font-mono mt-0.5 block">Human-in-the-loop active</span>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'workspace' && (
        <div className="space-y-6">
          {/* Active Application Journey Card */}
          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                    ED/2026/891240
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Delhi e-District: Issuance of Income Certificate
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Department of Revenue, Govt. of NCT of Delhi • Service Delivery SLA: 14 Days
                </p>
              </div>

              {/* Direct Jump to Live TinyFish Agent */}
              <button
                onClick={() => onLaunchLiveAgent('edistrict-income')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-tinyfish-600 to-tinyfish-500 hover:from-tinyfish-500 hover:to-tinyfish-400 text-white font-semibold text-xs shadow-lg shadow-tinyfish-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch TinyFish Live Cockpit</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-mono">Workflow Pipeline:</span>
                <span className="font-semibold text-tinyfish-400 font-mono">Step 4 of 6: Portal Automation</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                <div className="h-2 rounded-full bg-emerald-500" title="1. Requirements Discovered" />
                <div className="h-2 rounded-full bg-emerald-500" title="2. Pre-Flight Docs Audited" />
                <div className="h-2 rounded-full bg-emerald-500" title="3. Declaration Drafted" />
                <div className="h-2 rounded-full bg-tinyfish-500 animate-pulse" title="4. Portal Navigating" />
                <div className={`h-2 rounded-full ${isAuthorized ? 'bg-emerald-500' : 'bg-dark-800'}`} title="5. Human Approval" />
                <div className="h-2 rounded-full bg-dark-800" title="6. Acknowledgement" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                <span>Requirements</span>
                <span>Audit</span>
                <span>Affidavit</span>
                <span className="text-tinyfish-400 font-bold">Portal Nav</span>
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
            <div className="bg-dark-950 border border-dark-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-tinyfish-600/20 text-tinyfish-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Prescribed Self-Declaration (Annexure-I) Ready
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Drafted under Section 4 of Delhi Revenue Department Guidelines with family income & residence verification.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAffidavitModal}
                className="px-3.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-200 text-xs font-medium border border-dark-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-tinyfish-400" />
                <span>Preview & Sign Affidavit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Vault Tab */}
      {activeSubTab === 'vault' && (
        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-dark-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Citizen Personal Details Vault
              </h3>
              <p className="text-xs text-slate-400">
                Securely cached citizen profile used by TinyFish to auto-fill government portal forms without repetitive re-typing.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              AES-256 LOCAL CACHE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Full Legal Name (as per Aadhaar)</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-tinyfish-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Father's / Husband's Name</label>
              <input
                type="text"
                value={profile.fatherName}
                onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-tinyfish-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Total Annual Family Income</label>
              <input
                type="text"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-tinyfish-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Years of Continuous Delhi Residence</label>
              <input
                type="number"
                value={profile.delhiResidentYears}
                onChange={(e) => setProfile({ ...profile, delhiResidentYears: parseInt(e.target.value) || 0 })}
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-tinyfish-500 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Registered NCT Residence Address</label>
              <textarea
                rows={2}
                value={profile.residence}
                onChange={(e) => setProfile({ ...profile, residence: e.target.value })}
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-tinyfish-500 font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-dark-950 rounded-xl border border-dark-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Identity Record: Aadhaar Linked Ending in •••• {profile.aadhaarLast4}</span>
            <span className="text-emerald-400 font-mono">UIDAI E-KYC VERIFIED</span>
          </div>
        </div>
      )}

      {/* Drafts & Receipts Tab */}
      {activeSubTab === 'drafts' && (
        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-dark-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-tinyfish-400" />
                Official Application Acknowledgements & Slips
              </h3>
              <p className="text-xs text-slate-400">
                Verifiable reference tokens, submission receipts, and tracking hashes captured from portal DOM.
              </p>
            </div>
          </div>

          {/* Acknowledgement Card */}
          <div className="bg-dark-950 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">e-District Application Submission Slip</h4>
                  <p className="text-[11px] font-mono text-slate-400">Ref No: {acknowledgement.refNumber}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold">
                STAGE: UNDER REVENUE VERIFICATION
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-dark-900 p-3 rounded-xl border border-dark-800 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">SUBMISSION DATE</span>
                <span className="text-slate-200">{acknowledgement.submissionDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SLA TARGET</span>
                <span className="text-slate-200">{acknowledgement.estimatedCompletion}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SDM OFFICE</span>
                <span className="text-slate-200">{acknowledgement.nodalOffice}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">JURISDICTION</span>
                <span className="text-slate-200">{acknowledgement.tehsildarJurisdiction}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => alert(`Downloaded Official Receipt PDF for Reference ${acknowledgement.refNumber}`)}
                className="px-3 py-1.5 rounded-lg bg-tinyfish-600 hover:bg-tinyfish-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
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
          <div className="bg-dark-900 border border-dark-800 p-4 rounded-xl text-xs text-slate-400">
            <span className="font-semibold text-white">Voice & Hinglish Copilot:</span> Ask questions in Hindi, English, or Hinglish regarding government portal rules, documents, or affidavit requirements.
          </div>
          <CitizenVoiceAssistant
            onSelectServiceIntent={handleServiceSelectFromVoice}
            onTriggerDocumentCheck={() => setActiveSubTab('workspace')}
            onGenerateAffidavit={onOpenAffidavitModal}
          />
        </div>
      )}
    </div>
  );
}
