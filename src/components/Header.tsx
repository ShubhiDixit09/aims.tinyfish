'use client';

import React from 'react';
import { Compass, Globe, Radio, Sparkles, FileText, Search, BookOpen, Clock, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research';
  setActiveTab: (tab: 'citizen' | 'cockpit' | 'search' | 'monitors' | 'research') => void;
  status: 'ready' | 'running' | 'idle';
}

export function Header({ activeTab, setActiveTab, status }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#ECEAE5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand & Identity (Clean, human, no hackathon metadata) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#191817] text-white font-bold text-xs tracking-wider shadow-sm">
              <span>CP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-[#191817]">
                  CivicPilot
                </h1>
              </div>
              <p className="text-[11px] text-[#73726E]">
                Official Government Services & Application Assistant
              </p>
            </div>
          </div>

          {/* Clean Human Navigation (No sci-fi / AI buzzwords) */}
          <nav className="flex items-center gap-1 bg-[#F0EEEA]/80 p-1 rounded-full border border-[#ECEAE5]">
            <button
              onClick={() => setActiveTab('citizen')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                activeTab === 'citizen'
                  ? 'bg-[#191817] text-white font-semibold shadow-sm'
                  : 'text-[#57544E] hover:text-[#191817] hover:bg-white/60 font-medium'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Services & Apply</span>
            </button>

            <button
              onClick={() => setActiveTab('cockpit')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                activeTab === 'cockpit'
                  ? 'bg-[#191817] text-white font-semibold shadow-sm'
                  : 'text-[#57544E] hover:text-[#191817] hover:bg-white/60 font-medium'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Live Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                activeTab === 'search'
                  ? 'bg-[#191817] text-white font-semibold shadow-sm'
                  : 'text-[#57544E] hover:text-[#191817] hover:bg-white/60 font-medium'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Portals</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                activeTab === 'research'
                  ? 'bg-[#191817] text-white font-semibold shadow-sm'
                  : 'text-[#57544E] hover:text-[#191817] hover:bg-white/60 font-medium'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('monitors')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                activeTab === 'monitors'
                  ? 'bg-[#191817] text-white font-semibold shadow-sm'
                  : 'text-[#57544E] hover:text-[#191817] hover:bg-white/60 font-medium'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Track Status</span>
            </button>
          </nav>

          {/* System Status & GitHub Link */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#ECEAE5] shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-xs">
              <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-[#E8590C] animate-ping' : 'bg-[#059669]'}`} />
              <span className="text-[#383633] font-medium text-[11px]">
                {status === 'running' ? 'Assistant Working' : 'System Ready'}
              </span>
            </div>

            <a
              href="https://github.com/ShubhiDixit09/aims.tinyfish"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white hover:bg-[#F0EEEA] border border-[#ECEAE5] text-[#383633] hover:text-[#191817] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
