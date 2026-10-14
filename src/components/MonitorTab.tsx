'use client';

import React, { useState } from 'react';
import { MonitorItem } from '@/lib/types';
import { Compass, Clock, Plus, CheckCircle2, AlertCircle, RefreshCw, Bell, Globe } from 'lucide-react';

const INITIAL_MONITORS: MonitorItem[] = [
  {
    id: 'mon-edistrict',
    name: 'Delhi e-District: Income Cert Tracker (ED/2026/891240)',
    type: 'page',
    target: 'https://edistrict.delhigovt.nic.in/inquire/app-status',
    schedule: 'Every 6 Hours',
    lastChecked: '4 mins ago',
    status: 'active',
    purpose: 'Monitor Tehsildar revenue verification and report certificate generation or clarification requests.'
  },
  {
    id: 'mon-passport',
    name: 'Passport Seva: Delhi RPO Appointment Slot Radar',
    type: 'page',
    target: 'https://www.passportindia.gov.in/AppOnlineProject/online/appointmentAvailability',
    schedule: 'Every 15 Minutes',
    lastChecked: '2 mins ago',
    status: 'changed',
    purpose: 'Detect new Tatkaal & Normal appointment release dates for ITO and Shalimar Place PSKs.'
  },
  {
    id: 'mon-nsp',
    name: 'National Scholarship Portal (NSP 2.0) Verification Sentinel',
    type: 'topic',
    target: 'NSP Merit-cum-Means verification cutoff dates Delhi colleges 2026',
    schedule: 'Every 12 Hours',
    lastChecked: 'Just now',
    status: 'baseline',
    purpose: 'Track institute-level verification deadlines and nodal officer approval milestones.'
  }
];

export function MonitorTab() {
  const [monitors, setMonitors] = useState<MonitorItem[]>(INITIAL_MONITORS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState<'page' | 'topic'>('page');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !target) return;

    const newMon: MonitorItem = {
      id: `mon-${Date.now()}`,
      name,
      target,
      type,
      schedule: 'Every 24 Hours',
      lastChecked: 'Just now',
      status: 'baseline',
      purpose: purpose || 'Detect changes and stream diff summary.'
    };

    setMonitors([newMon, ...monitors]);
    setName('');
    setTarget('');
    setPurpose('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-900 border border-dark-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">CivicPilot 24/7 Sentinels & Application Trackers</h2>
            <p className="text-xs text-slate-400">
              Scheduled web diff detection and government portal tracking powered by TinyFish Monitor infrastructure
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-tinyfish-600 hover:bg-tinyfish-500 text-white font-medium text-xs shadow-md shadow-tinyfish-600/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Sentinel</span>
        </button>
      </div>

      {/* Creation Modal / Inline Form */}
      {showAddModal && (
        <form onSubmit={handleCreate} className="bg-dark-900 border border-tinyfish-500/40 p-6 rounded-2xl shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-tinyfish-400" />
            Configure Autonomous Web Monitor
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Monitor Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Supabase Storage Pricing"
                className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Monitor Type</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
              >
                <option value="page">Page Monitor (URL Diff Tracking)</option>
                <option value="topic">Topic Monitor (Search Radar for New URLs)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              {type === 'page' ? 'Target Page URL' : 'Search Topic Query'}
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={type === 'page' ? 'https://example.com/pricing' : 'e.g. LLM agent frameworks releases'}
              className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Condition That Matters</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. The price decreases or new enterprise tier is published"
              className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-tinyfish-600 hover:bg-tinyfish-500 text-white text-xs font-medium shadow-md"
            >
              Confirm Sentinel
            </button>
          </div>
        </form>
      )}

      {/* Monitors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monitors.map((mon) => (
          <div
            key={mon.id}
            className="bg-dark-900 border border-dark-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg hover:border-dark-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-800 text-slate-300 uppercase">
                  {mon.type}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  mon.status === 'changed'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${mon.status === 'changed' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  {mon.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white mb-1.5">{mon.name}</h3>
              <p className="text-xs font-mono text-slate-400 truncate mb-3" title={mon.target}>
                {mon.target}
              </p>

              {mon.purpose && (
                <div className="p-2.5 rounded-lg bg-dark-950/70 border border-dark-800 text-[11px] text-slate-400 mb-3">
                  <span className="text-tinyfish-400 font-mono">Condition:</span> {mon.purpose}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-dark-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {mon.schedule}
              </span>
              <span>{mon.lastChecked}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
