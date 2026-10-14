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
      <div className="bg-white border border-stone-200/90 p-6 sm:p-8 rounded-2xl shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">CivicPilot 24/7 Sentinels & Application Trackers</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Scheduled web diff detection and government portal tracking powered by TinyFish Monitor infrastructure
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-medium text-xs shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Sentinel</span>
        </button>
      </div>

      {/* Creation Modal / Inline Form */}
      {showAddModal && (
        <form onSubmit={handleCreate} className="bg-white border border-stone-300 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-stone-700" />
            Configure Autonomous Government Sentinel
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Sentinel Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Income Tax Refund Tracker"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Target Portal URL or Topic</label>
              <input
                type="text"
                required
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="https://eportal.incometax.gov.in"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">Monitoring Objective & Alert Conditions</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Notify when assessment order is approved or status advances."
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm"
            >
              Activate Sentinel
            </button>
          </div>
        </form>
      )}

      {/* Monitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {monitors.map((mon) => {
          let badgeColor = 'bg-stone-100 text-stone-700 border-stone-200';
          let statusLabel = 'ACTIVE BASELINE';

          if (mon.status === 'changed') {
            badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
            statusLabel = 'DIFF DETECTED';
          } else if (mon.status === 'active') {
            badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            statusLabel = 'MONITORING';
          }

          return (
            <div
              key={mon.id}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-card hover:shadow-lifted transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
                      <Globe className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-mono uppercase text-stone-500 font-semibold">
                      {mon.type}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {statusLabel}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 mb-1 leading-snug">
                  {mon.name}
                </h3>

                <p className="text-xs font-mono text-stone-500 truncate mb-3">
                  {mon.target}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                  {mon.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{mon.schedule}</span>
                </div>
                <span>Checked {mon.lastChecked}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
