'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TinyFishEvent } from '@/lib/types';
import { Terminal, CheckCircle2, PlayCircle, Eye, Clock, Cpu, Sparkles, Shield, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-850 border-b border-dark-800 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-mono font-medium">
          <Cpu className="w-4 h-4 text-tinyfish-400" />
          <span>Agent Neural Reasoning & Chain of Action</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          {isRunning && (
            <div className="flex items-center gap-1.5 text-tinyfish-400">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{elapsedSeconds}s</span>
            </div>
          )}
          {runId && (
            <span className="text-slate-500 truncate max-w-[120px]">
              {runId.slice(0, 8)}...
            </span>
          )}
        </div>
      </div>

      {/* 4-Stage Action Pipeline Stepper */}
      <div className="px-4 py-3 bg-dark-950/90 border-b border-dark-800/80">
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
          <div className={`p-1.5 rounded-lg border transition-all ${
            phase >= 1
              ? 'bg-tinyfish-600/10 border-tinyfish-500/50 text-tinyfish-300'
              : 'bg-dark-900 border-dark-800 text-slate-600'
          }`}>
            <div className="font-semibold">01. INITIATE</div>
            <div className="text-[9px] opacity-75">Stealth Session</div>
          </div>

          <div className={`p-1.5 rounded-lg border transition-all ${
            phase >= 2
              ? 'bg-tinyfish-600/10 border-tinyfish-500/50 text-tinyfish-300'
              : 'bg-dark-900 border-dark-800 text-slate-600'
          }`}>
            <div className="font-semibold">02. ATTACH</div>
            <div className="text-[9px] opacity-75">Live Stream Feed</div>
          </div>

          <div className={`p-1.5 rounded-lg border transition-all ${
            phase >= 3
              ? 'bg-tinyfish-600/10 border-tinyfish-500/50 text-tinyfish-300'
              : 'bg-dark-900 border-dark-800 text-slate-600'
          }`}>
            <div className="font-semibold">03. PERCEIVE</div>
            <div className="text-[9px] opacity-75">DOM Navigation</div>
          </div>

          <div className={`p-1.5 rounded-lg border transition-all ${
            phase === 4
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-bold'
              : 'bg-dark-900 border-dark-800 text-slate-600'
          }`}>
            <div className="font-semibold">04. SYNTHESIZE</div>
            <div className="text-[9px] opacity-75">Schema Contract</div>
          </div>
        </div>
      </div>

      {/* Live Neural Thought Card when Running */}
      {isRunning && latestPurpose && (
        <div className="p-3 mx-4 my-2.5 rounded-xl bg-gradient-to-r from-tinyfish-950/60 to-dark-900 border border-tinyfish-500/30 flex items-start gap-2.5 shadow-inner">
          <Sparkles className="w-4 h-4 text-tinyfish-400 mt-0.5 shrink-0 animate-pulse" />
          <div className="text-xs">
            <span className="font-mono text-tinyfish-400 font-semibold uppercase text-[10px] block">
              Active Neural Decision
            </span>
            <span className="text-slate-200 font-medium">
              {latestPurpose.purpose}
            </span>
          </div>
        </div>
      )}

      {/* Scrolling Stream Trace */}
      <div
        ref={scrollRef}
        className="p-4 h-52 overflow-y-auto space-y-2 font-mono text-xs scrollbar-thin scrollbar-thumb-dark-700 bg-dark-950"
      >
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs text-center">
            <Cpu className="w-6 h-6 mb-2 opacity-30 text-tinyfish-400" />
            <span>Agent stream idle. Launch a mission to inspect live chain-of-action trace.</span>
          </div>
        ) : (
          events.map((evt, idx) => {
            const time = new Date(evt.timestamp || Date.now()).toLocaleTimeString();

            if (evt.type === 'STARTED') {
              return (
                <div key={idx} className="flex items-start gap-2 text-emerald-400 bg-dark-900/60 p-2 rounded-lg border border-emerald-500/20">
                  <PlayCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-500 text-[10px] mr-2">[{time}]</span>
                    <span className="font-semibold">Handshake confirmed:</span> Cloud browser container provisioned.
                  </div>
                </div>
              );
            }

            if (evt.type === 'STREAMING_URL') {
              return (
                <div key={idx} className="flex items-start gap-2 text-tinyfish-400 bg-dark-900/60 p-2 rounded-lg border border-tinyfish-500/20">
                  <Eye className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-500 text-[10px] mr-2">[{time}]</span>
                    <span className="font-semibold">Stream Link Attached:</span> Real-time viewport broadcasting on secure websocket channel.
                  </div>
                </div>
              );
            }

            if (evt.type === 'PROGRESS') {
              return (
                <div key={idx} className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors pl-2 border-l-2 border-tinyfish-500/40">
                  <ArrowRight className="w-3 h-3 text-tinyfish-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-slate-500 text-[10px] mr-2">[{time}]</span>
                    <span>{evt.purpose}</span>
                  </div>
                </div>
              );
            }

            if (evt.type === 'COMPLETE') {
              return (
                <div key={idx} className="flex items-start gap-2 text-emerald-300 font-semibold bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/40">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <span className="text-emerald-500 text-[10px] mr-2">[{time}]</span>
                    <span>Goal accomplished: Structured output synthesized and validated against schema.</span>
                  </div>
                </div>
              );
            }

            return null;
          })
        )}

        {isRunning && (
          <div className="flex items-center gap-2 text-tinyfish-400 animate-pulse pt-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tinyfish-400 animate-ping" />
            <span>Agent navigating DOM & evaluating elements...</span>
          </div>
        )}
      </div>
    </div>
  );
}
