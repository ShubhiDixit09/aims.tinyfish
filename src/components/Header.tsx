'use client';

import React from 'react';
import { Compass, Globe, Radio, Sparkles, ShieldCheck, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research';
  setActiveTab: (tab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research') => void;
  status: 'ready' | 'running' | 'idle';
}

export function Header({ activeTab, setActiveTab, status }: HeaderProps) {
  return (
    <header className="border-b border-dark-800 bg-dark-950/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Edition */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-tinyfish-600 to-tinyfish-400 shadow-lg shadow-tinyfish-600/30">
            <span className="text-xl select-none">🐟</span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-dark-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                CivicPilot <span className="text-xs px-2 py-0.5 rounded-full bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30 font-medium">CIVIC AGENT</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Citizen Portal & Errand Copilot • <span className="text-tinyfish-400 font-semibold">DTU Track 1: Personal Agents</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-dark-900/90 border border-dark-800 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'citizen'
                ? 'bg-tinyfish-600 text-white shadow-md shadow-tinyfish-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Citizen Corner
          </button>

          <button
            onClick={() => setActiveTab('cockpit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'cockpit'
                ? 'bg-tinyfish-600 text-white shadow-md shadow-tinyfish-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Live Cockpit
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-tinyfish-600 text-white shadow-md shadow-tinyfish-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Live Search Radar
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'research'
                ? 'bg-tinyfish-600 text-white shadow-md shadow-tinyfish-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Deep Research
          </button>

          <button
            onClick={() => setActiveTab('monitors')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'monitors'
                ? 'bg-tinyfish-600 text-white shadow-md shadow-tinyfish-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Sentinels & Monitors
          </button>
        </nav>

        {/* Live Engine Status & GitHub */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-dark-900 border border-dark-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="text-slate-300 font-mono text-[11px]">
              {status === 'running' ? 'AGENT ACTIVE' : 'TINYFISH CONNECTED'}
            </span>
          </div>

          <a
            href="https://github.com/ShubhiDixit09/aims.tinyfish"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-dark-900 hover:bg-dark-800 border border-dark-800 text-slate-300 hover:text-white transition-colors"
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
