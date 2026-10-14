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
    <div className={`flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-card transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50 bg-white/95 backdrop-blur-xl' : 'h-[620px]'
    }`}>
      {/* Clean Browser Chrome Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-200">
        
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            Cloud Browser Viewport
          </span>
        </div>

        {/* URL Capsule */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 px-3.5 py-1 bg-white border border-stone-200 rounded-full text-xs text-stone-700 shadow-sm truncate">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="text-stone-400 text-[11px] font-mono">https://</span>
            <span className="truncate font-mono font-medium text-stone-800">
              {targetUrl ? targetUrl.replace(/^https?:\/\//, '') : 'awaiting-portal-url...'}
            </span>
          </div>
        </div>

        {/* Live Indicator & Controls */}
        <div className="flex items-center gap-2">
          {isRunning && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Radio className="w-3 h-3 text-amber-600 animate-spin" />
              <span>NAVIGATING</span>
              <span className="ml-1 px-1.5 py-0.2 bg-stone-900 text-white rounded text-[10px] font-mono">
                Step {stepCount}
              </span>
            </div>
          )}

          {streamingUrl && (
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Refresh Stream"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative flex-1 bg-stone-100/50 flex items-center justify-center overflow-hidden">
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
            <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm text-stone-700">
              <Globe className="w-8 h-8 text-stone-500" />
            </div>

            <h3 className="text-base font-bold text-stone-900 mb-1.5">
              {isRunning ? 'Initializing Cloud Browser...' : 'Remote Viewport Standby'}
            </h3>
            
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              {isRunning
                ? 'TinyFish agent is initializing the remote browser session. The 60fps live stream feed will appear here in ~5 seconds.'
                : 'Select a government service preset on the left and click "Launch Live Autonomous Mission" to watch the agent navigate in real time.'}
            </p>

            {currentPurpose && isRunning && (
              <div className="w-full p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 shadow-sm text-left">
                <span className="font-semibold text-stone-900">Current Action:</span> {currentPurpose}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Ticker */}
      <div className="px-5 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2 truncate">
          <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="truncate font-medium">
            {currentPurpose ? currentPurpose : 'Agent ready for navigation command'}
          </span>
        </div>
        {streamingUrl && (
          <a
            href={streamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-stone-800 hover:text-black font-medium transition-colors ml-2 shrink-0"
          >
            <span>Direct Viewport</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
