'use client';

import React from 'react';
import { Compass, Globe, Radio, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research';
  setActiveTab: (tab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research') => void;
  status: 'ready' | 'running' | 'idle';
}

export function Header({ activeTab, setActiveTab, status }: HeaderProps) {
  return (
    <header className="border-b border-stone-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Edition */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-sm">
            <span>CP</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-stone-900">
                CivicPilot
              </h1>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">
                Indic Agent
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Sovereign Citizen Services & Portal Copilot
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Sarvam Clean Segmented Pill */}
        <nav className="flex items-center bg-stone-100 p-1 rounded-full border border-stone-200/80 shadow-inner">
          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'citizen'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Citizen Corner
          </button>

          <button
            onClick={() => setActiveTab('cockpit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'cockpit'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Live Cockpit
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Search Radar
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'research'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Deep Research
          </button>

          <button
            onClick={() => setActiveTab('monitors')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'monitors'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Sentinels
          </button>
        </nav>

        {/* Live Engine Status & GitHub */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs shadow-sm">
            <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-stone-700 font-medium text-[11px]">
              {status === 'running' ? 'Agent Active' : 'TinyFish Connected'}
            </span>
          </div>

          <a
            href="https://github.com/ShubhiDixit09/aims.tinyfish"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 hover:text-stone-900 transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
