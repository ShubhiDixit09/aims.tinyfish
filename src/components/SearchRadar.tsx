'use client';

import React, { useState } from 'react';
import { SearchResultItem } from '@/lib/types';
import { Search, Globe, ExternalLink, ArrowRight } from 'lucide-react';

interface SearchRadarProps {
  onSelectUrlForMission: (url: string) => void;
}

export function SearchRadar({ onSelectUrlForMission }: SearchRadarProps) {
  const [query, setQuery] = useState('delhi edistrict revenue income certificate guidelines 2026');
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
      <div className="bg-white border border-stone-200/90 p-6 sm:p-8 rounded-2xl shadow-card">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 shadow-sm">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">Live Search Radar</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Query official `.gov.in` portals via TinyFish Search API and instantly dispatch autonomous agents to any result
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2.5 mt-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search government portals, gazette notifications, or scheme circulars..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-medium text-xs shadow-sm transition-all flex items-center gap-2"
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
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs shadow-sm">
          {error}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {results.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200/90 p-5 rounded-2xl flex flex-col justify-between hover:shadow-card transition-all shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="truncate max-w-[200px] font-semibold text-stone-800">{item.site_name || 'Government Portal'}</span>
                <span className="font-mono text-[11px]">#{item.position}</span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 hover:text-black transition-colors mb-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                  <span className="line-clamp-1">{item.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                </a>
              </h3>
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                {item.snippet}
              </p>
            </div>

            <button
              onClick={() => onSelectUrlForMission(item.url)}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Dispatch Personal Agent to this URL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
