'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, Layers, Code, Sparkles, ShieldCheck, AlertTriangle, Quote, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-card mt-6">
      {/* Dossier Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-200 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              Autonomous Intelligence & Evidence Dossier
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                {status === 'IN_PROGRESS' ? 'EXTRACTING...' : 'VERIFIED EVIDENCE'}
              </span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Live web extraction verified with verbatim proof citations and strict contract validation
            </p>
          </div>
        </div>

        {/* View Toggle & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-100 border border-stone-200 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'visual'
                  ? 'bg-white text-stone-900 font-semibold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Evidence Matrix
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'json'
                  ? 'bg-white text-stone-900 font-semibold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              JSON Contract
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors shadow-sm"
            title="Copy JSON"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors shadow-sm"
            title="Download JSON"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Value-Add: Autonomous Decision & Verdict Card */}
        {decisionVerdict && (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h4 className="text-sm font-bold text-emerald-950">
                  {decisionVerdict.recommendation}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-800">Decision Confidence:</span>
                <span className="text-xs font-bold text-emerald-900 px-2 py-0.5 rounded bg-white border border-emerald-200 shadow-sm font-mono">
                  {decisionVerdict.fitScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed mb-4">
              {decisionVerdict.decisionExplanation}
            </p>

            {/* Evidence Anchors vs Risk Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-emerald-200/60">
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  Ground-Truth Evidence Anchors
                </span>
                {decisionVerdict.evidencePassages.map((ev, i) => (
                  <div key={i} className="text-xs text-stone-800 flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>

              {decisionVerdict.riskWarnings.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider block">
                    Observed Caveats & Missing Factors
                  </span>
                  {decisionVerdict.riskWarnings.map((risk, i) => (
                    <div key={i} className="text-xs text-amber-900 flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
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
          <pre className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-800 overflow-x-auto leading-relaxed max-h-[500px]">
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
                      <div key={key} className="col-span-full bg-stone-50/70 border border-stone-200 p-5 rounded-xl">
                        <h4 className="text-xs font-bold text-stone-900 mb-3 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-stone-900" />
                            {label} ({val.length} entries)
                          </span>
                          <span className="text-[11px] font-normal text-stone-500">
                            Verified DOM Records
                          </span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {val.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm flex flex-col justify-between"
                            >
                              <div>
                                {typeof item === 'object' ? (
                                  Object.entries(item).map(([k, v]) => {
                                    if (k === 'evidence') return null; // rendered separately as quote below

                                    const isMissing = v === null || v === undefined;
                                    return (
                                      <div key={k} className="mb-2 last:mb-0">
                                        <div className="text-[10px] text-stone-500 uppercase font-medium">
                                          {k.replace(/_/g, ' ')}
                                        </div>
                                        <div className="text-xs font-medium break-words mt-0.5">
                                          {isMissing ? (
                                            <span className="text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                              [NOT DISCLOSED]
                                            </span>
                                          ) : (
                                            <span className="text-stone-900">
                                              {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span className="text-xs text-stone-800">{String(item)}</span>
                                )}
                              </div>

                              {/* Verbatim Source Evidence Anchor */}
                              {(item as any)?.evidence && (
                                <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600 flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                                  <Quote className="w-3.5 h-3.5 text-stone-500 mt-0.5 shrink-0" />
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
                      className="bg-stone-50/70 border border-stone-200 p-4 rounded-xl flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-stone-600 mb-1">
                        {label}
                      </span>
                      <div className="text-sm font-semibold break-words mt-1">
                        {isMissing ? (
                          <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs font-mono">
                            [NOT DISCLOSED ON PAGE / NULL]
                          </span>
                        ) : (
                          <span className="text-stone-900">
                            {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-800 font-mono border border-stone-200">
                {String(result)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
