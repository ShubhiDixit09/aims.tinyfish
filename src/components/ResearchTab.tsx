'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export function ResearchTab() {
  const [query, setQuery] = useState('Compare Delhi e-District vs UP e-Sathi revenue certificate issuance verification procedures');
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
    setPlanSteps(['Initializing Research agent...', 'Formulating multi-query search plan across official circulars...']);
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
      <div className="bg-white border border-stone-200/90 p-6 sm:p-8 rounded-2xl shadow-card">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">Deep Multi-Source Policy Research Engine</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              TinyFish searches, compares circulars across states, and synthesizes evidence-backed reports
            </p>
          </div>
        </div>

        <form onSubmit={handleRunResearch} className="flex gap-2.5 mt-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isResearching}
            placeholder="What government policy or scheme requires multi-source investigation?"
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-sm"
          />
          <button
            type="submit"
            disabled={isResearching}
            className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-medium text-xs shadow-sm flex items-center gap-2"
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
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs shadow-sm">
          {error}
        </div>
      )}

      {/* Progress Plan */}
      {planSteps.length > 0 && (
        <div className="bg-white border border-stone-200/90 p-6 rounded-2xl shadow-card">
          <h3 className="text-xs font-bold text-stone-900 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-stone-600" />
            Agent Investigation Log
          </h3>
          <div className="space-y-2 text-xs text-stone-700">
            {planSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
            {isResearching && (
              <div className="flex items-center gap-2 text-amber-700 animate-pulse font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>Evaluating citations across state government portals...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final Synthesized Report */}
      {finalReport && (
        <div className="bg-white border border-stone-200/90 p-6 sm:p-8 rounded-2xl shadow-card space-y-5">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Synthesized Evidence Report
          </h3>
          <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 leading-relaxed whitespace-pre-line">
            {finalReport}
          </div>

          {citations.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-700 mb-2">Verified Citations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-400 text-xs text-stone-800 truncate flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <span className="text-stone-500 font-mono font-bold">[{i + 1}]</span>
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
