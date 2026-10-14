'use client';

import React, { useState } from 'react';
import { Eye, ExternalLink, RefreshCw, Maximize2, Minimize2, Radio, Sparkles, Monitor } from 'lucide-react';

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
    <div className={`flex flex-col bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50 bg-dark-950/95 backdrop-blur-xl' : 'h-[620px]'
    }`}>
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-850 border-b border-dark-800">
        
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-tinyfish-400" />
            TinyFish Cloud Browser
          </span>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-dark-950/80 border border-dark-700/60 rounded-lg text-xs font-mono text-slate-300 truncate">
            <span className="text-emerald-400 text-[10px]">https://</span>
            <span className="truncate">{targetUrl ? targetUrl.replace(/^https?:\/\//, '') : 'awaiting-target...'}</span>
          </div>
        </div>

        {/* Live Indicator & Controls */}
        <div className="flex items-center gap-2">
          {isRunning && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tinyfish-600/20 border border-tinyfish-500/40 text-tinyfish-400 text-xs font-medium animate-pulse">
              <Radio className="w-3 h-3 animate-spin" />
              <span>LIVE</span>
              <span className="ml-1 px-1.5 py-0.2 bg-tinyfish-600 text-white rounded text-[10px] font-mono">
                Step {stepCount}
              </span>
            </div>
          )}

          {streamingUrl && (
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
              title="Refresh Stream"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative flex-1 bg-dark-950 flex items-center justify-center overflow-hidden">
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
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-tinyfish-600/20 to-tinyfish-400/10 border border-tinyfish-500/30">
              <span className="text-4xl filter drop-shadow">🐟</span>
              {isRunning && (
                <div className="absolute inset-0 rounded-2xl border-2 border-tinyfish-500 animate-ping opacity-30" />
              )}
            </div>

            <h3 className="text-base font-semibold text-white mb-2">
              {isRunning ? 'Launching Remote Browser...' : 'Remote Viewport Standby'}
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isRunning
                ? 'TinyFish agent is initializing the cloud browser session. The live stream feed will appear here in ~5 seconds.'
                : 'Select a preset or enter a target URL on the left, then click "Launch Autonomous Mission" to watch TinyFish browse in real time.'}
            </p>

            {currentPurpose && isRunning && (
              <div className="w-full p-2.5 rounded-lg bg-dark-900 border border-tinyfish-500/30 text-xs font-mono text-tinyfish-300 text-left">
                <span className="text-slate-400">Action:</span> {currentPurpose}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Ticker */}
      <div className="px-4 py-2 bg-dark-850 border-t border-dark-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="truncate">
            {currentPurpose ? currentPurpose : 'Agent ready for navigation command'}
          </span>
        </div>
        {streamingUrl && (
          <a
            href={streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-tinyfish-400 hover:text-tinyfish-300 transition-colors ml-2 shrink-0"
          >
            <span>Direct Stream</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
