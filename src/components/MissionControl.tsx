'use client';

import React, { useState } from 'react';
import { MISSION_PRESETS } from '@/lib/presets';
import { MissionPreset } from '@/lib/types';
import { Play, Sparkles, Shield, ChevronDown, ChevronUp, Layers, AlertTriangle, FastForward } from 'lucide-react';

interface MissionControlProps {
  url: string;
  setUrl: (url: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  schema: string;
  setSchema: (schema: string) => void;
  isStealth: boolean;
  setIsStealth: (stealth: boolean) => void;
  isRunning: boolean;
  onLaunch: () => void;
  onLoadDemoRecovery: () => void;
  error: string | null;
}

export function MissionControl({
  url,
  setUrl,
  goal,
  setGoal,
  schema,
  setSchema,
  isStealth,
  setIsStealth,
  isRunning,
  onLaunch,
  onLoadDemoRecovery,
  error,
}: MissionControlProps) {
  const [showSchema, setShowSchema] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('edistrict-income');

  const handleSelectPreset = (preset: MissionPreset) => {
    setSelectedPresetId(preset.id);
    setUrl(preset.url);
    setGoal(preset.goal);
    setSchema(JSON.stringify(preset.schema, null, 2));
  };

  return (
    <div className="flex flex-col bg-white border border-stone-200/90 rounded-2xl p-6 shadow-card space-y-5">
      {/* Top Bar with Demo Recovery Option */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <span className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <Sparkles className="w-3.5 h-3.5 text-stone-700" />
          Autonomous Mission Control
        </span>

        {/* 90-Second Demo Recovery Trigger */}
        <button
          type="button"
          onClick={onLoadDemoRecovery}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-medium transition-all shadow-sm"
          title="Instant verified demo for fast 90-second judge presentations"
        >
          <FastForward className="w-3 h-3 text-stone-600" />
          <span>90s Pitch Recovery</span>
        </button>
      </div>

      {/* Preset Selector Bar */}
      <div>
        <label className="text-xs font-medium text-stone-700 mb-2 block">
          Preset Service Blueprints
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {MISSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isRunning}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'bg-stone-50 border-stone-900 text-stone-900 shadow-sm'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <div className="font-bold text-stone-900 truncate mb-1">{preset.title}</div>
              <div className="text-[11px] text-stone-500 line-clamp-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Target URL */}
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1.5">
          Target Portal Address (URL)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isRunning}
          placeholder="https://edistrict.delhigovt.nic.in"
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
        />
      </div>

      {/* Natural Language Goal */}
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center justify-between">
          <span>Personal Agent Goal & Instructions</span>
          <span className="text-[11px] text-stone-500">Autonomous stopping condition</span>
        </label>
        <textarea
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          disabled={isRunning}
          placeholder="Specify exact objective, required fields, null handling, and stopping condition."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs leading-relaxed focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
        />
      </div>

      {/* Structured Output Schema Accordion */}
      <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
        <button
          type="button"
          onClick={() => setShowSchema(!showSchema)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-stone-800 hover:bg-stone-100 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-stone-600" />
            Strict Output Schema (JSON Contract)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
            {showSchema ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showSchema && (
          <div className="p-3.5 border-t border-stone-200 bg-white">
            <p className="text-[11px] text-stone-500 mb-2">
              Enforced on TinyFish cloud: guarantees strictly typed fields & evidence quotes.
            </p>
            <textarea
              rows={6}
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 font-mono text-[11px] focus:outline-none focus:border-stone-900"
            />
          </div>
        )}
      </div>

      {/* Advanced Switches: Stealth Mode */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border border-stone-200/80 rounded-xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isStealth ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500'}`}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-stone-900">Stealth Residential Mode</div>
            <div className="text-[11px] text-stone-500">Routes browser through clean residential proxies</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsStealth(!isStealth)}
          disabled={isRunning}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isStealth ? 'bg-stone-900' : 'bg-stone-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isStealth ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-900 text-xs">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-rose-600" />
          <div>
            <div className="font-semibold text-rose-950">Mission Error</div>
            <div className="text-[11px] text-rose-800 mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Launch CTA */}
      <button
        onClick={onLaunch}
        disabled={isRunning || !url || !goal}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all ${
          isRunning || !url || !goal
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
            : 'bg-stone-900 hover:bg-black text-white active:scale-[0.99]'
        }`}
      >
        {isRunning ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Agent Navigating & Extracting...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Live Autonomous Mission</span>
          </>
        )}
      </button>
    </div>
  );
}
