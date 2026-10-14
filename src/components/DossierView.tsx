'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, Layers, Code, Sparkles, ShieldCheck, AlertTriangle, ExternalLink, Quote, CheckCircle2 } from 'lucide-react';

interface DossierViewProps {
  result: any;
  status: string | null;
  runId: string | null;
  decisionVerdict?: {
    recommendation: string;
    fitScore: number;
    decisionExplanation: string;
    evidencePassages: string[];
    riskWarnings: string[];
  } | null;
}

export function DossierView({ result, status, runId, decisionVerdict }: DossierViewProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');

  if (!result) return null;

  const jsonString = JSON.stringify(result, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tinyfish-evidence-${runId || Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-2xl mt-6">
      {/* Dossier Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-dark-850 border-b border-dark-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Intelligence & Evidence Dossier
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                {status === 'IN_PROGRESS' ? 'EXTRACTING...' : 'VERIFIED EVIDENCE'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live web extraction verified with verbatim proof citations and strict contract validation
            </p>
          </div>
        </div>

        {/* View Toggle & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex bg-dark-900 border border-dark-700/80 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'visual'
                  ? 'bg-tinyfish-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Evidence Matrix
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'json'
                  ? 'bg-tinyfish-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Structured JSON
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white border border-dark-700/60 transition-colors"
            title="Copy JSON"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white border border-dark-700/60 transition-colors"
            title="Download JSON"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Value-Add: Autonomous Decision & Verdict Card */}
        {decisionVerdict && (
          <div className="bg-gradient-to-r from-emerald-950/40 via-dark-900 to-dark-900 border border-emerald-500/30 rounded-xl p-5 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {decisionVerdict.recommendation}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Decision Confidence:</span>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {decisionVerdict.fitScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {decisionVerdict.decisionExplanation}
            </p>

            {/* Evidence Anchors vs Risk Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-dark-800">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider block">
                  Ground-Truth Evidence Anchors
                </span>
                {decisionVerdict.evidencePassages.map((ev, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-dark-950/60 p-2 rounded-lg border border-dark-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>

              {decisionVerdict.riskWarnings.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider block">
                    Observed Caveats & Missing Factors
                  </span>
                  {decisionVerdict.riskWarnings.map((risk, i) => (
                    <div key={i} className="text-xs text-amber-200/90 flex items-start gap-2 bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dossier Body */}
        {viewMode === 'json' ? (
          <pre className="p-4 bg-dark-950 rounded-xl border border-dark-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-[500px]">
            {jsonString}
          </pre>
        ) : (
          <div className="space-y-6">
            {typeof result === 'object' && !Array.isArray(result) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result).map(([key, val]) => {
                  const label = key.replace(/_/g, ' ').toUpperCase();

                  if (Array.isArray(val)) {
                    return (
                      <div key={key} className="col-span-full bg-dark-950/80 border border-dark-800 p-5 rounded-xl">
                        <h4 className="text-xs font-mono font-bold text-tinyfish-400 mb-3 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-tinyfish-400" />
                            {label} ({val.length} entries)
                          </span>
                          <span className="text-[10px] font-normal text-slate-500">
                            Verified DOM Records
                          </span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {val.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="bg-dark-900 border border-dark-800 p-4 rounded-lg hover:border-tinyfish-500/30 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                {typeof item === 'object' ? (
                                  Object.entries(item).map(([k, v]) => {
                                    if (k === 'evidence') return null; // rendered separately as quote below

                                    const isMissing = v === null || v === undefined;
                                    return (
                                      <div key={k} className="mb-2 last:mb-0">
                                        <div className="text-[10px] font-mono text-slate-500 uppercase">
                                          {k.replace(/_/g, ' ')}
                                        </div>
                                        <div className="text-xs font-medium break-words">
                                          {isMissing ? (
                                            <span className="text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                              [NOT DISCLOSED]
                                            </span>
                                          ) : (
                                            <span className="text-slate-100">
                                              {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span className="text-xs text-slate-300">{String(item)}</span>
                                )}
                              </div>

                              {/* Verbatim Source Evidence Anchor */}
                              {(item as any)?.evidence && (
                                <div className="mt-3 pt-2.5 border-t border-dark-800/80 text-[11px] text-slate-400 font-mono flex items-start gap-1.5 bg-dark-950/60 p-2 rounded">
                                  <Quote className="w-3.5 h-3.5 text-tinyfish-400 mt-0.5 shrink-0" />
                                  <span className="italic line-clamp-3">{(item as any).evidence}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Null / missing value handling
                  const isMissing = val === null || val === undefined;

                  return (
                    <div
                      key={key}
                      className="bg-dark-950/80 border border-dark-800 p-4 rounded-xl flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-mono font-semibold text-slate-400 mb-1">
                        {label}
                      </span>
                      <div className="text-sm font-medium break-words">
                        {isMissing ? (
                          <span className="text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-mono">
                            [NOT DISCLOSED ON PAGE / NULL]
                          </span>
                        ) : (
                          <span className="text-slate-100">
                            {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 bg-dark-950 rounded-xl text-xs text-slate-300 font-mono">
                {String(result)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
