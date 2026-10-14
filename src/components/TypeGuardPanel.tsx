'use client';

import React, { useState, useEffect } from 'react';
import { auditTypes, TypeCheckReport } from '@/lib/typeguard';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Code, Copy, Check, FileCode2 } from 'lucide-react';

interface TypeGuardPanelProps {
  data: any;
  currentSchema: any;
  onUpdateSchema: (newSchemaString: string) => void;
}

export function TypeGuardPanel({ data, currentSchema, onUpdateSchema }: TypeGuardPanelProps) {
  const [report, setReport] = useState<TypeCheckReport | null>(null);
  const [copiedTs, setCopiedTs] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = () => {
    if (!data) return;
    setIsAuditing(true);
    setTimeout(() => {
      const rep = auditTypes(data, currentSchema);
      setReport(rep);
      setIsAuditing(false);
    }, 300);
  };

  useEffect(() => {
    if (data) {
      runAudit();
    } else {
      setReport(null);
    }
  }, [data]);

  const handleCopyTs = () => {
    if (!report?.generatedTypeScript) return;
    navigator.clipboard.writeText(report.generatedTypeScript);
    setCopiedTs(true);
    setTimeout(() => setCopiedTs(false), 2000);
  };

  if (!data) {
    return (
      <div className="bg-dark-900 border border-dark-800 rounded-2xl p-5 shadow-lg flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <span>TypeGuard Engine on standby. Awaiting live web extraction stream.</span>
        </div>
        <span className="font-mono text-[10px] bg-dark-950 px-2.5 py-1 rounded border border-dark-800 text-slate-500">
          STRICT MODE ENABLED
        </span>
      </div>
    );
  }

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              TypeGuard: Real-Time Contract & Schema Verification
              {report && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  report.isValid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {report.confidenceScore}% INTEGRITY
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              Validates real-time live data against JSON Schema contracts & generates typed interfaces
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700/80 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>Check Types</span>
          </button>

          <button
            onClick={handleCopyTs}
            className="px-3 py-1.5 rounded-lg bg-tinyfish-600/20 hover:bg-tinyfish-600/30 text-tinyfish-300 border border-tinyfish-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {copiedTs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode2 className="w-3.5 h-3.5" />}
            <span>Export TypeScript</span>
          </button>
        </div>
      </div>

      {/* Verification Scorecard */}
      {report && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-dark-950 rounded-xl border border-dark-800 text-center">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Status</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {report.isValid ? 'CONTRACT VERIFIED' : 'PARTIAL MATCH'}
            </div>
          </div>

          <div className="p-3 bg-dark-950 rounded-xl border border-dark-800 text-center">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Fields Audited</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {report.fieldsChecked}
            </div>
          </div>

          <div className="p-3 bg-dark-950 rounded-xl border border-dark-800 text-center">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Type Accuracy</div>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
              {report.passedCount} / {report.fieldsChecked} Passed
            </div>
          </div>

          <div className="p-3 bg-dark-950 rounded-xl border border-dark-800 text-center">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Live Freshness</div>
            <div className="text-xs font-bold text-tinyfish-400 font-mono mt-1">
              REAL-TIME LIVE
            </div>
          </div>
        </div>
      )}

      {/* Violations / Discrepancies if any */}
      {report && report.violations.length > 0 && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
          <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Type Anomalies Detected:</span>
          </div>
          <div className="space-y-1">
            {report.violations.map((v, i) => (
              <div key={i} className="text-[11px] font-mono text-amber-200/90 pl-5">
                • {v.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated TypeScript Preview */}
      {report && (
        <div className="p-3.5 bg-dark-950 rounded-xl border border-dark-800">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-tinyfish-400" />
              Live Generated TypeScript Interface
            </span>
            <span className="text-[10px] text-slate-500">Auto-inferred from live extraction</span>
          </div>
          <pre className="p-3 bg-dark-900 rounded-lg border border-dark-850 font-mono text-xs text-emerald-300/90 overflow-x-auto">
            {report.generatedTypeScript}
          </pre>
        </div>
      )}
    </div>
  );
}
