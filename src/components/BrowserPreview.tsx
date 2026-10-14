'use client';

import React, { useState } from 'react';
import { ExternalLink, RefreshCw, Maximize2, Minimize2, Radio, Globe, ShieldCheck } from 'lucide-react';

interface BrowserPreviewProps {
  streamingUrl: string | null;
  targetUrl: string;
  isRunning: boolean;
  stepCount: number;
  currentPurpose?: string;
}

export function BrowserPreview({
  streamingUrl,
  targetUrl,
  isRunning,
  stepCount,
  currentPurpose
}: BrowserPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className={`flex flex-col bg-white border border-[#ECEAE5] rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.025)] transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50 bg-white/95 backdrop-blur-xl' : 'h-[620px]'
    }`}>
      {/* Clean Browser Chrome Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#FBFBFA] border-b border-[#ECEAE5]">
        
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FCC419]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#51CF66]" />
          <span className="ml-2 text-xs font-bold text-[#191817] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#E8590C]" />
            Cloud Browser Viewport
          </span>
        </div>

        {/* URL Capsule */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#ECEAE5] rounded-full text-xs text-[#191817] shadow-sm truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span className="text-[#8A867E] text-[11px] font-mono">https://</span>
            <span className="truncate font-mono font-medium text-[#191817]">
              {targetUrl ? targetUrl.replace(/^https?:\/\//, '') : 'awaiting-portal-command...'}
            </span>
          </div>
        </div>

        {/* Live Indicator & Controls */}
        <div className="flex items-center gap-2">
          {isRunning && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8590C]/10 border border-[#E8590C]/20 text-[#C2410C] text-xs font-bold">
              <Radio className="w-3 h-3 text-[#E8590C] animate-spin" />
              <span>LIVE</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#191817] text-white rounded text-[10px] font-mono">
                Step {stepCount}
              </span>
            </div>
          )}

          {streamingUrl && (
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-xl text-[#73726E] hover:text-[#191817] hover:bg-[#F0EEEA] transition-colors"
              title="Refresh Stream"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-[#73726E] hover:text-[#191817] hover:bg-[#F0EEEA] transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative flex-1 bg-[#F5F5F0]/60 flex items-center justify-center overflow-hidden">
        {streamingUrl ? (
          <iframe
            key={iframeKey}
            id="tinyfish-live-preview"
            src={streamingUrl}
            title="TinyFish Live Browser Preview"
            className="w-full h-full border-none bg-white"
            allow="fullscreen"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
            <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-2xl bg-white border border-[#ECEAE5] shadow-sm text-[#191817]">
              <Globe className="w-8 h-8 text-[#E8590C]" />
            </div>

            <h3 className="text-base font-bold text-[#191817] mb-1.5">
              {isRunning ? 'Initializing Cloud Browser...' : 'Remote Viewport Standby'}
            </h3>
            
            <p className="text-xs text-[#73726E] leading-relaxed mb-4">
              {isRunning
                ? 'TinyFish agent is initializing the cloud browser session. The 60fps live stream feed will appear here in ~5 seconds.'
                : 'Select a government service on the left and click "Launch Live Autonomous Mission" to watch the agent navigate in real time.'}
            </p>

            {currentPurpose && isRunning && (
              <div className="w-full p-3.5 rounded-2xl bg-white border border-[#ECEAE5] text-xs text-[#191817] shadow-sm text-left">
                <span className="font-bold text-[#E8590C]">Current Action:</span> {currentPurpose}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Ticker */}
      <div className="px-5 py-3 bg-[#FBFBFA] border-t border-[#ECEAE5] flex items-center justify-between text-xs text-[#57544E]">
        <div className="flex items-center gap-2 truncate">
          <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#E8590C] animate-pulse' : 'bg-[#059669]'}`} />
          <span className="truncate font-medium">
            {currentPurpose ? currentPurpose : 'Personal agent ready for navigation command'}
          </span>
        </div>
        {streamingUrl && (
          <a
            href={streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#191817] hover:text-black font-semibold transition-colors ml-2 shrink-0"
          >
            <span>Direct Viewport</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
