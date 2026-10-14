'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, Layers, Code, Sparkles, FileText } from 'lucide-react';

interface DossierViewProps {
  result: any;
  status: string | null;
  runId: string | null;
}

export function DossierView({ result, status, runId }: DossierViewProps) {
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
    a.download = `tinyfish-intelligence-${runId || Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-xl mt-6">
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-dark-850 border-b border-dark-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Synthesized Intelligence Dossier
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                {status || 'VERIFIED'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Clean, structured data extracted and validated via TinyFish output schema
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
              Visual Matrix
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
              Raw JSON
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

      {/* Dossier Body */}
      <div className="p-6">
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
                        <h4 className="text-xs font-mono font-bold text-tinyfish-400 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-tinyfish-400" />
                          {label} ({val.length} entries)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {val.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="bg-dark-900 border border-dark-800 p-4 rounded-lg hover:border-tinyfish-500/30 transition-colors"
                            >
                              {typeof item === 'object' ? (
                                Object.entries(item).map(([k, v]) => (
                                  <div key={k} className="mb-2 last:mb-0">
                                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                                      {k.replace(/_/g, ' ')}
                                    </div>
                                    <div className="text-xs text-slate-200 font-medium break-words">
                                      {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <span className="text-xs text-slate-300">{String(item)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={key}
                      className="bg-dark-950/80 border border-dark-800 p-4 rounded-xl flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-mono font-semibold text-slate-400 mb-1">
                        {label}
                      </span>
                      <span className="text-sm text-slate-100 font-medium break-words">
                        {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                      </span>
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
