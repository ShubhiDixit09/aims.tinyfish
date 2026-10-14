'use client';

import React, { useState } from 'react';
import { SearchResultItem } from '@/lib/types';
import { Search, Globe, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface SearchRadarProps {
  onSelectUrlForMission: (url: string) => void;
}

export function SearchRadar({ onSelectUrlForMission }: SearchRadarProps) {
  const [query, setQuery] = useState('best vector database pricing 2026');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setError(null);
    try {
      const res = await fetch(`/api/tinyfish/search?query=${encodeURIComponent(query)}&limit=6`);
      if (!res.ok) {
        throw new Error(`Search failed: ${res.statusText}`);
      }
      const data = await res.json();
      setResults(data.results || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete search');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-dark-900 border border-dark-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-tinyfish-600/20 text-tinyfish-400 border border-tinyfish-500/30">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Live Search Radar</h2>
            <p className="text-xs text-slate-400">
              Query the web via TinyFish Search API and instantly dispatch autonomous agents to any result
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, documentation, pricing pages, or tech announcements..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl bg-tinyfish-600 hover:bg-tinyfish-500 text-white font-medium text-xs shadow-md shadow-tinyfish-600/20 transition-all flex items-center gap-2"
          >
            {isSearching ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span>Scan Radar</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((item, idx) => (
          <div
            key={idx}
            className="bg-dark-900 border border-dark-800 p-5 rounded-2xl flex flex-col justify-between hover:border-dark-700 transition-all shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5">
                <span className="truncate max-w-[200px] text-tinyfish-400">{item.site_name || 'Web'}</span>
                <span>#{item.position}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-tinyfish-400 transition-colors mb-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                  <span className="line-clamp-1">{item.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                </a>
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {item.snippet}
              </p>
            </div>

            <button
              onClick={() => onSelectUrlForMission(item.url)}
              className="w-full py-2 px-3 rounded-lg bg-dark-800 hover:bg-tinyfish-600/20 hover:border-tinyfish-500/40 text-slate-300 hover:text-tinyfish-300 border border-dark-700/60 text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              <span>Dispatch TinyFish Agent to this URL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
