'use client';

import React, { useState } from 'react';
import { MISSION_PRESETS } from '@/lib/presets';
import { MissionPreset } from '@/lib/types';
import { Play, Sparkles, Shield, ChevronDown, ChevronUp, Layers, AlertTriangle } from 'lucide-react';

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
  onCancel?: () => void;
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
  error,
}: MissionControlProps) {
  const [showSchema, setShowSchema] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('db-pricing');

  const handleSelectPreset = (preset: MissionPreset) => {
    setSelectedPresetId(preset.id);
    setUrl(preset.url);
    setGoal(preset.goal);
    setSchema(JSON.stringify(preset.schema, null, 2));
  };

  return (
    <div className="flex flex-col bg-dark-900 border border-dark-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Preset Selector Bar */}
      <div>
        <label className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-tinyfish-400" />
            Quick Autonomous Presets
          </span>
          <span className="text-[11px] text-slate-500">Click to autofill goal & schema</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {MISSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isRunning}
              className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'bg-tinyfish-600/10 border-tinyfish-500/60 text-white shadow-sm'
                  : 'bg-dark-950/70 border-dark-800 text-slate-400 hover:text-slate-200 hover:border-dark-700'
              }`}
            >
              <div className="font-semibold text-slate-200 truncate mb-1">{preset.title}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Target URL */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1.5">
          Target Web Address (URL)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isRunning}
          placeholder="https://example.com/target-page"
          className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-tinyfish-500 transition-colors"
        />
      </div>

      {/* Natural Language Goal */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Autonomous Agent Goal & Strategy</span>
          <span className="text-[10px] text-slate-500 font-sans">Natural language prompt</span>
        </label>
        <textarea
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          disabled={isRunning}
          placeholder="What should TinyFish accomplish on this page? (e.g. Compare pricing tiers, test form inputs, extract tables)"
          className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 text-xs leading-relaxed focus:outline-none focus:border-tinyfish-500 transition-colors"
        />
      </div>

      {/* Structured Output Schema Accordion */}
      <div className="border border-dark-800 rounded-xl overflow-hidden bg-dark-950/60">
        <button
          type="button"
          onClick={() => setShowSchema(!showSchema)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono text-slate-300 hover:bg-dark-850 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-tinyfish-400" />
            Strict Output Schema (JSON Contract)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Active
            </span>
            {showSchema ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showSchema && (
          <div className="p-3 border-t border-dark-800">
            <p className="text-[11px] text-slate-400 mb-2">
              TinyFish validates its extracted output against this schema before returning results.
            </p>
            <textarea
              rows={6}
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-dark-800 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-tinyfish-500"
            />
          </div>
        )}
      </div>

      {/* Advanced Switches: Stealth Mode */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-dark-950/70 border border-dark-800 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${isStealth ? 'bg-tinyfish-600/20 text-tinyfish-400' : 'bg-dark-800 text-slate-500'}`}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-200">Stealth Anti-Bot Engine</div>
            <div className="text-[10px] text-slate-400">Routes browser through residential proxies & stealth profiles</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsStealth(!isStealth)}
          disabled={isRunning}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isStealth ? 'bg-tinyfish-600' : 'bg-dark-700'
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
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
          <div>
            <div className="font-semibold">Mission Failed</div>
            <div className="text-[11px] opacity-90">{error}</div>
          </div>
        </div>
      )}

      {/* Launch CTA */}
      <button
        onClick={onLaunch}
        disabled={isRunning || !url || !goal}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all ${
          isRunning || !url || !goal
            ? 'bg-dark-800 text-slate-500 cursor-not-allowed border border-dark-700'
            : 'bg-gradient-to-r from-tinyfish-600 to-tinyfish-500 hover:from-tinyfish-500 hover:to-tinyfish-400 text-white shadow-tinyfish-600/25 active:scale-[0.99]'
        }`}
      >
        {isRunning ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Agent Navigating & Synthesizing...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Autonomous Mission</span>
          </>
        )}
      </button>
    </div>
  );
}
