'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TinyFishEvent } from '@/lib/types';
import { CheckCircle2, PlayCircle, Eye, Clock, Cpu, Sparkles, ArrowRight } from 'lucide-react';

interface TimelineLogProps {
  events: TinyFishEvent[];
  isRunning: boolean;
  runId: string | null;
}

export function TimelineLog({ events, isRunning, runId }: TimelineLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      setElapsedSeconds(0);
      timer = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  // Compute Active Phase
  let phase = 0;
  if (isRunning) {
    phase = 1;
    if (events.some(e => e.type === 'STREAMING_URL')) phase = 2;
    if (events.filter(e => e.type === 'PROGRESS').length >= 1) phase = 3;
  } else if (events.some(e => e.type === 'COMPLETE')) {
    phase = 4;
  }

  const latestPurpose = events
    .slice()
    .reverse()
    .find((e) => e.type === 'PROGRESS') as any;

  return (
    <div className="flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-card">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-200 text-xs">
        <div className="flex items-center gap-2 text-stone-900 font-semibold">
          <Cpu className="w-4 h-4 text-stone-600" />
          <span>Agent Chain of Action & Activity Log</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          {isRunning && (
            <div className="flex items-center gap-1.5 text-amber-700 font-medium">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{elapsedSeconds}s</span>
            </div>
          )}
          {runId && (
            <span className="text-stone-400 font-mono">
              #{runId.slice(0, 8)}
            </span>
          )}
        </div>
      </div>

      {/* 4-Stage Action Pipeline Stepper */}
      <div className="px-5 py-3 bg-stone-50/50 border-b border-stone-200/70">
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <div className={`p-2 rounded-xl border transition-all ${
            phase >= 1
              ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-semibold'
              : 'bg-white border-stone-200 text-stone-400'
          }`}>
            <div>01. INITIATE</div>
            <div className="text-[9px] opacity-80">Browser Session</div>
          </div>

          <div className={`p-2 rounded-xl border transition-all ${
            phase >= 2
              ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-semibold'
              : 'bg-white border-stone-200 text-stone-400'
          }`}>
            <div>02. ATTACH</div>
            <div className="text-[9px] opacity-80">Live Viewport</div>
          </div>

          <div className={`p-2 rounded-xl border transition-all ${
            phase >= 3
              ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-semibold'
              : 'bg-white border-stone-200 text-stone-400'
          }`}>
            <div>03. PERCEIVE</div>
            <div className="text-[9px] opacity-80">DOM Navigation</div>
          </div>

          <div className={`p-2 rounded-xl border transition-all ${
            phase === 4
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm font-semibold'
              : 'bg-white border-stone-200 text-stone-400'
          }`}>
            <div>04. SYNTHESIZE</div>
            <div className="text-[9px] opacity-80">Schema Verified</div>
          </div>
        </div>
      </div>

      {/* Live Neural Thought Card when Running */}
      {isRunning && latestPurpose && (
        <div className="p-3.5 mx-5 my-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0 animate-pulse" />
          <div className="text-xs">
            <span className="font-semibold text-amber-900 uppercase text-[10px] block">
              Current Reasoning Step
            </span>
            <span className="text-stone-800 font-medium">
              {latestPurpose.purpose}
            </span>
          </div>
        </div>
      )}

      {/* Scrolling Stream Trace */}
      <div
        ref={scrollRef}
        className="p-4 h-52 overflow-y-auto space-y-2 text-xs bg-white"
      >
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 text-xs text-center">
            <Cpu className="w-6 h-6 mb-2 opacity-30 text-stone-400" />
            <span>Agent activity idle. Launch a mission to inspect live stream logs.</span>
          </div>
        ) : (
          events.map((evt, idx) => {
            const time = new Date(evt.timestamp || Date.now()).toLocaleTimeString();

            if (evt.type === 'STARTED') {
              return (
                <div key={idx} className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <PlayCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600" />
                  <div>
                    <span className="text-stone-400 font-mono text-[10px] mr-2">[{time}]</span>
                    <span className="font-semibold">Handshake confirmed:</span> Cloud browser container provisioned.
                  </div>
                </div>
              );
            }

            if (evt.type === 'STREAMING_URL') {
              return (
                <div key={idx} className="flex items-start gap-2 text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <Eye className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <span className="text-stone-400 font-mono text-[10px] mr-2">[{time}]</span>
                    <span className="font-semibold">Stream Link Attached:</span> Real-time viewport broadcasting on secure channel.
                  </div>
                </div>
              );
            }

            if (evt.type === 'PROGRESS') {
              return (
                <div key={idx} className="flex items-start gap-2 text-stone-700 hover:text-stone-900 transition-colors pl-2.5 border-l-2 border-stone-300">
                  <ArrowRight className="w-3 h-3 text-stone-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-stone-400 font-mono text-[10px] mr-2">[{time}]</span>
                    <span>{evt.purpose}</span>
                  </div>
                </div>
              );
            }

            if (evt.type === 'COMPLETE') {
              return (
                <div key={idx} className="flex items-start gap-2 text-emerald-900 font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                  <div>
                    <span className="text-emerald-700 text-[10px] mr-2">[{time}]</span>
                    <span>Goal accomplished: Structured output synthesized and validated against schema.</span>
                  </div>
                </div>
              );
            }

            return null;
          })
        )}

        {isRunning && (
          <div className="flex items-center gap-2 text-amber-700 animate-pulse pt-2 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Agent navigating DOM & evaluating elements...</span>
          </div>
        )}
      </div>
    </div>
  );
}
