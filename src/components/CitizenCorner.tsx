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
  Search,
  Check,
  FileCheck,
  Building2,
  AlertCircle
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleQuickIntent = (serviceId: string) => {
    onLaunchLiveAgent(serviceId);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Hero Banner */}
      <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.025)] relative overflow-hidden">
        {/* Soft background radial wash */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E8590C]/5 via-[#F76707]/3 to-transparent rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8590C]/10 border border-[#E8590C]/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8590C]" />
            <span className="text-xs font-semibold text-[#C2410C] tracking-wide uppercase">
              Sovereign Citizen Services Platform
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191817] leading-tight">
            Government Errands, Resolved Autonomously.
          </h2>

          <p className="text-sm sm:text-base text-[#57544E] mt-2.5 leading-relaxed">
            Welcome, {profile.fullName.split(' ')[0]}. Discover official state service requirements, audit attachments for strict 100KB portal limits, draft legal self-declarations, and supervise cloud browser submissions.
          </p>

          {/* Quick Natural Language Service Search */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A867E] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need? (e.g. Income Certificate, Passport, Driving Licence)"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FBFBFA] border border-[#ECEAE5] text-xs text-[#191817] placeholder-[#8A867E] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              onClick={() => handleQuickIntent('edistrict-income')}
              className="px-6 py-3 rounded-2xl bg-[#191817] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Inspect Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs">
            <span className="text-[#8A867E] text-[11px] font-medium mr-1">Popular:</span>
            {[
              { id: 'edistrict-income', label: 'Delhi Income Certificate' },
              { id: 'passport-seva', label: 'Passport Seva Adult' },
              { id: 'scholarship-nsp', label: 'NSP 2.0 Scholarship' },
              { id: 'parivahan-dl', label: 'Parivahan DL Renewal' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleQuickIntent(chip.id)}
                className="px-3 py-1 rounded-full bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#383633] text-[11px] font-medium transition-colors border border-[#ECEAE5]"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#F0EEEA] p-1 rounded-full border border-[#ECEAE5] mt-8 max-w-fit">
          <button
            onClick={() => setActiveSubTab('workspace')}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              activeSubTab === 'workspace'
                ? 'bg-white text-[#191817] shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#57544E] hover:text-[#191817] font-medium'
            }`}
          >
            Application Workspace
          </button>
          <button
            onClick={() => setActiveSubTab('vault')}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              activeSubTab === 'vault'
                ? 'bg-white text-[#191817] shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#57544E] hover:text-[#191817] font-medium'
            }`}
          >
            Citizen Vault
          </button>
          <button
            onClick={() => setActiveSubTab('drafts')}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              activeSubTab === 'drafts'
                ? 'bg-white text-[#191817] shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#57544E] hover:text-[#191817] font-medium'
            }`}
          >
            Slips & Receipts
          </button>
          <button
            onClick={() => setActiveSubTab('voice')}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              activeSubTab === 'voice'
                ? 'bg-white text-[#191817] shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#57544E] hover:text-[#191817] font-medium'
            }`}
          >
            Voice Copilot
          </button>
        </div>
      </div>

      {/* 4 Crisp Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#ECEAE5] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-[#8A867E] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Service</span>
            <Building2 className="w-4 h-4 text-[#E8590C]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#191817] truncate">
            Delhi Income Cert
          </div>
          <p className="text-xs text-[#059669] font-medium mt-1">
            Official Delivery SLA: 14 Days
          </p>
        </div>

        <div className="bg-white border border-[#ECEAE5] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-[#8A867E] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Upload Compliance</span>
            <FileCheck className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#059669]">
            4 / 4 Verified
          </div>
          <p className="text-xs text-[#57544E] mt-1">
            Max 100KB ceiling verified
          </p>
        </div>

        <div className="bg-white border border-[#ECEAE5] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-[#8A867E] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Legal Affidavit</span>
            <FileText className="w-4 h-4 text-[#3B5BDB]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#191817]">
            Annexure-I
          </div>
          <p className="text-xs text-[#059669] font-medium mt-1">
            Formally Drafted & Ready
          </p>
        </div>

        <div className="bg-white border border-[#ECEAE5] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-[#8A867E] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Safety Boundary</span>
            <Shield className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#191817]">
            {isAuthorized ? 'Authorized' : 'Awaiting Citizen'}
          </div>
          <p className="text-xs text-[#D97706] font-medium mt-1">
            Stage 5 Checkpoint Active
          </p>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'workspace' && (
        <div className="space-y-6">
          {/* Active Application Journey Card */}
          <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.025)] space-y-6">
            
            {/* Header with Launch Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECEAE5]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F0EEEA] text-[#191817] border border-[#ECEAE5]">
                    Ref: {acknowledgement.refNumber}
                  </span>
                  <span className="text-xs text-[#059669] font-semibold bg-[#059669]/10 px-2.5 py-0.5 rounded-full border border-[#059669]/20">
                    Revenue Dept Approved Pipeline
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#191817]">
                  Delhi e-District: Issuance of Income Certificate
                </h3>
                <p className="text-xs text-[#73726E] mt-0.5">
                  Sub-Divisional Magistrate (SDM) Office, Rohini • Official Citizen Charter SLA: 14 Working Days
                </p>
              </div>

              <button
                onClick={() => onLaunchLiveAgent('edistrict-income')}
                className="px-5 py-2.5 rounded-2xl bg-[#191817] hover:bg-black text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#FFA94D]" />
                <span>Launch TinyFish Live Agent</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="bg-[#FBFBFA] border border-[#ECEAE5] rounded-2xl p-5">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-[#191817]">Application Lifecycle</span>
                <span className="font-mono text-[#E8590C] font-semibold">Step 4 of 6: Supervised Portal Navigation</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="h-2 rounded-full bg-[#059669]" title="1. Requirements Discovered" />
                <div className="h-2 rounded-full bg-[#059669]" title="2. Pre-Flight Docs Audited" />
                <div className="h-2 rounded-full bg-[#059669]" title="3. Declaration Drafted" />
                <div className="h-2 rounded-full bg-[#E8590C] animate-pulse" title="4. Portal Navigating" />
                <div className={`h-2 rounded-full ${isAuthorized ? 'bg-[#059669]' : 'bg-[#E8E5DF]'}`} title="5. Human Approval" />
                <div className="h-2 rounded-full bg-[#E8E5DF]" title="6. Acknowledgement" />
              </div>
              <div className="flex justify-between text-[11px] text-[#73726E] mt-2.5 font-medium">
                <span className="text-[#059669] flex items-center gap-0.5"><Check className="w-3 h-3" /> Requirements</span>
                <span className="text-[#059669] flex items-center gap-0.5"><Check className="w-3 h-3" /> Doc Audit</span>
                <span className="text-[#059669] flex items-center gap-0.5"><Check className="w-3 h-3" /> Affidavit</span>
                <span className="text-[#E8590C] font-bold">Portal Nav</span>
                <span className={isAuthorized ? 'text-[#059669]' : ''}>Citizen Sign-off</span>
                <span>Slip Receipt</span>
              </div>
            </div>

            {/* Stage 5 Human Checkpoint Banner */}
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
            <div className="bg-[#FBFBFA] border border-[#ECEAE5] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-white border border-[#ECEAE5] text-[#191817] shadow-sm">
                  <FileText className="w-5 h-5 text-[#E8590C]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191817]">
                    Prescribed Self-Declaration (Annexure-I) Prepared
                  </h4>
                  <p className="text-xs text-[#57544E] mt-0.5">
                    Pre-filled under Section 4 of Delhi Revenue Department Guidelines with family income and continuous residence duration.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAffidavitModal}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F0EEEA] text-[#191817] text-xs font-semibold border border-[#ECEAE5] shadow-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-[#E8590C]" />
                <span>Preview & Sign Affidavit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Vault Tab */}
      {activeSubTab === 'vault' && (
        <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.025)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE5]">
            <div>
              <h3 className="text-base font-bold text-[#191817] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#059669]" />
                Citizen Personal Details Vault
              </h3>
              <p className="text-xs text-[#73726E] mt-0.5">
                Saved profile used by the personal agent to complete government portal forms accurately without repetitive typing.
              </p>
            </div>
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
              AES-256 Local Encrypted Cache
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Full Legal Name (as per Aadhaar)</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Father's / Husband's Name</label>
              <input
                type="text"
                value={profile.fatherName}
                onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                className="w-full bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Total Annual Family Income</label>
              <input
                type="text"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                className="w-full bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Years of Continuous Delhi Residence</label>
              <input
                type="number"
                value={profile.delhiResidentYears}
                onChange={(e) => setProfile({ ...profile, delhiResidentYears: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#383633] mb-1.5">Registered NCT Residence Address</label>
              <textarea
                rows={2}
                value={profile.residence}
                onChange={(e) => setProfile({ ...profile, residence: e.target.value })}
                className="w-full bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FBFBFA] rounded-2xl border border-[#ECEAE5] flex items-center justify-between text-xs">
            <span className="text-[#57544E]">Identity Record: Aadhaar Linked (ending in •••• {profile.aadhaarLast4})</span>
            <span className="text-[#059669] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              UIDAI E-KYC Verified
            </span>
          </div>
        </div>
      )}

      {/* Drafts & Receipts Tab */}
      {activeSubTab === 'drafts' && (
        <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.025)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE5]">
            <div>
              <h3 className="text-base font-bold text-[#191817] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E8590C]" />
                Official Application Acknowledgements & Slips
              </h3>
              <p className="text-xs text-[#73726E] mt-0.5">
                Verifiable reference tokens, submission receipts, and tracking hashes captured from portal DOM.
              </p>
            </div>
          </div>

          {/* Acknowledgement Card */}
          <div className="bg-[#FBFBFA] border border-[#ECEAE5] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#ECEAE5] text-[#059669] shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191817]">Delhi e-District Application Submission Slip</h4>
                  <p className="text-xs font-mono text-[#73726E]">Ref: {acknowledgement.refNumber}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-semibold border border-[#059669]/20">
                Under Revenue Verification
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-white p-4 rounded-xl border border-[#ECEAE5]">
              <div>
                <span className="text-[#8A867E] block text-[10px] uppercase font-bold">Submission Date</span>
                <span className="text-[#191817] font-semibold">{acknowledgement.submissionDate}</span>
              </div>
              <div>
                <span className="text-[#8A867E] block text-[10px] uppercase font-bold">SLA Target</span>
                <span className="text-[#191817] font-semibold">{acknowledgement.estimatedCompletion}</span>
              </div>
              <div>
                <span className="text-[#8A867E] block text-[10px] uppercase font-bold">SDM Office</span>
                <span className="text-[#191817] font-semibold">{acknowledgement.nodalOffice}</span>
              </div>
              <div>
                <span className="text-[#8A867E] block text-[10px] uppercase font-bold">Jurisdiction</span>
                <span className="text-[#191817] font-semibold">{acknowledgement.tehsildarJurisdiction}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => alert(`Downloaded Official Receipt PDF for Reference ${acknowledgement.refNumber}`)}
                className="px-4 py-2 rounded-xl bg-[#191817] hover:bg-black text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
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
          <div className="bg-white border border-[#ECEAE5] p-5 rounded-2xl text-xs text-[#57544E] shadow-sm">
            <span className="font-bold text-[#191817]">Multilingual Indic Voice Copilot:</span> Ask questions naturally in Hindi, English, or Hinglish regarding government portal rules, 100KB document ceilings, or legal affidavit drafting.
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
