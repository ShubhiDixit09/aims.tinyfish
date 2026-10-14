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
    <div className="flex flex-col bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
      {/* Top Bar with Demo Recovery Option */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE5]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E8590C]" />
          <span className="text-xs font-bold text-[#191817]">
            Autonomous Mission Control
          </span>
        </div>

        {/* 90-Second Demo Recovery Trigger */}
        <button
          type="button"
          onClick={onLoadDemoRecovery}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/10 hover:bg-[#059669]/20 text-[#059669] border border-[#059669]/20 text-xs font-semibold transition-all shadow-sm"
          title="Instant verified demo for fast 90-second judge presentations"
        >
          <FastForward className="w-3 h-3 text-[#059669]" />
          <span>90s Pitch Recovery</span>
        </button>
      </div>

      {/* Preset Selector Bar */}
      <div>
        <label className="text-xs font-bold text-[#383633] mb-2 block">
          Preset Service Blueprints
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {MISSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isRunning}
              className={`p-3.5 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'bg-[#FBFBFA] border-[#191817] text-[#191817] shadow-sm font-semibold'
                  : 'bg-white border-[#ECEAE5] text-[#57544E] hover:text-[#191817] hover:border-[#DDD9D2]'
              }`}
            >
              <div className="font-bold text-[#191817] truncate mb-1">{preset.title}</div>
              <div className="text-[11px] text-[#73726E] line-clamp-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Target URL */}
      <div>
        <label className="block text-xs font-bold text-[#383633] mb-1.5">
          Target Portal Address (URL)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isRunning}
          placeholder="https://edistrict.delhigovt.nic.in"
          className="w-full px-4 py-2.5 rounded-2xl bg-[#FBFBFA] border border-[#ECEAE5] text-[#191817] text-xs font-mono focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
        />
      </div>

      {/* Natural Language Goal */}
      <div>
        <label className="block text-xs font-bold text-[#383633] mb-1.5 flex items-center justify-between">
          <span>Personal Agent Goal & Strategy</span>
          <span className="text-[11px] text-[#8A867E] font-normal">Autonomous stopping condition</span>
        </label>
        <textarea
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          disabled={isRunning}
          placeholder="Specify exact objective, required fields, null handling, and stopping condition."
          className="w-full px-4 py-2.5 rounded-2xl bg-[#FBFBFA] border border-[#ECEAE5] text-[#191817] text-xs leading-relaxed focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
        />
      </div>

      {/* Structured Output Schema Accordion */}
      <div className="border border-[#ECEAE5] rounded-2xl overflow-hidden bg-[#FBFBFA]">
        <button
          type="button"
          onClick={() => setShowSchema(!showSchema)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-[#191817] hover:bg-[#F0EEEA] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#E8590C]" />
            Strict Output Schema (JSON Contract)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#059669] bg-[#059669]/10 px-2.5 py-0.5 rounded-full border border-[#059669]/20">
              Active
            </span>
            {showSchema ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showSchema && (
          <div className="p-4 border-t border-[#ECEAE5] bg-white">
            <p className="text-[11px] text-[#73726E] mb-2">
              Enforced on TinyFish cloud: guarantees strictly typed fields & evidence quotes.
            </p>
            <textarea
              rows={6}
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              disabled={isRunning}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFBFA] border border-[#ECEAE5] text-[#191817] font-mono text-[11px] focus:outline-none focus:border-[#191817]"
            />
          </div>
        )}
      </div>

      {/* Advanced Switches: Stealth Mode */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FBFBFA] border border-[#ECEAE5] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isStealth ? 'bg-[#191817] text-white' : 'bg-white border border-[#ECEAE5] text-[#73726E]'}`}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#191817]">Stealth Residential Mode</div>
            <div className="text-[11px] text-[#73726E]">Routes browser through clean residential proxies</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsStealth(!isStealth)}
          disabled={isRunning}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isStealth ? 'bg-[#191817]' : 'bg-[#DDD9D2]'
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
        <div className="p-4 rounded-2xl bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-start gap-2.5 text-[#B91C1C] text-xs">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#DC2626]" />
          <div>
            <div className="font-bold text-[#7F1D1D]">Mission Error</div>
            <div className="text-[11px] text-[#991B1B] mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Launch CTA */}
      <button
        onClick={onLaunch}
        disabled={isRunning || !url || !goal}
        className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all ${
          isRunning || !url || !goal
            ? 'bg-[#F0EEEA] text-[#8A867E] cursor-not-allowed border border-[#ECEAE5]'
            : 'bg-[#191817] hover:bg-black text-white active:scale-[0.99]'
        }`}
      >
        {isRunning ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Agent Navigating & Extracting...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current text-[#FFA94D]" />
            <span>Launch Live Autonomous Mission</span>
          </>
        )}
      </button>
    </div>
  );
}
