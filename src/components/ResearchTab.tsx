'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export function ResearchTab() {
  const [query, setQuery] = useState('Compare modern headless browser agents vs TinyFish autonomous cloud agents architecture');
  const [isResearching, setIsResearching] = useState(false);
  const [planSteps, setPlanSteps] = useState<string[]>([]);
  const [citations, setCitations] = useState<any[]>([]);
  const [finalReport, setFinalReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsResearching(true);
    setError(null);
    setPlanSteps(['Initializing Research agent...', 'Formulating multi-query search plan...']);
    setCitations([]);
    setFinalReport(null);

    try {
      const res = await fetch('/api/tinyfish/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode: 'standard' }),
      });

      if (!res.ok) {
        throw new Error(`Research failed: ${res.statusText}`);
      }

      if (!res.body) {
        throw new Error('No stream body returned');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.slice(5).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.event === 'plan_updated') {
                setPlanSteps(prev => [...prev, `Iteration ${data.iteration || 1}: Processing evidence from web sources`]);
              } else if (data.event === 'final_result') {
                setFinalReport(data.result);
                if (data.citations) {
                  setCitations(data.citations);
                }
              }
            } catch (err) {
              console.warn('Could not parse SSE JSON:', dataStr);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Research failed');
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-900 border border-dark-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Deep Multi-Source Research Engine</h2>
            <p className="text-xs text-slate-400">
              TinyFish searches, evaluates evidence across multiple sites, and synthesizes cited reports
            </p>
          </div>
        </div>

        <form onSubmit={handleRunResearch} className="flex gap-2 mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isResearching}
            placeholder="What deep topic requires multi-source investigation?"
            className="flex-1 px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
          />
          <button
            type="submit"
            disabled={isResearching}
            className="px-5 py-2.5 rounded-xl bg-tinyfish-600 hover:bg-tinyfish-500 text-white font-medium text-xs shadow-md shadow-tinyfish-600/20 flex items-center gap-2"
          >
            {isResearching ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Synthesize Report</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Progress Plan */}
      {planSteps.length > 0 && (
        <div className="bg-dark-900 border border-dark-800 p-5 rounded-2xl">
          <h3 className="text-xs font-mono font-bold text-tinyfish-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Agent Investigation Log
          </h3>
          <div className="space-y-1.5 font-mono text-xs text-slate-300">
            {planSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
            {isResearching && (
              <div className="flex items-center gap-2 text-tinyfish-400 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-tinyfish-400" />
                <span>Evaluating citations across the web...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final Synthesized Report */}
      {finalReport && (
        <div className="bg-dark-900 border border-dark-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Synthesized Evidence Report
          </h3>
          <div className="p-4 bg-dark-950 rounded-xl border border-dark-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {finalReport}
          </div>

          {citations.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-slate-400 mb-2">Verified Citations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-dark-950 border border-dark-800 hover:border-tinyfish-500/40 text-xs text-slate-300 truncate flex items-center gap-2"
                  >
                    <span className="text-tinyfish-400 font-mono">[{i + 1}]</span>
                    <span className="truncate">{c.title || c.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
