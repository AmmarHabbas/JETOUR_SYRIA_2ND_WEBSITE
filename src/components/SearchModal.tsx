import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Car, FileText, Globe, Cpu } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { NEWS_ARTICLES } from '../data/content';
import { GLOBAL_DEALERS } from '../data/dealers';
import type { PageRoute } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter Vehicles
  const matchedVehicles = q
    ? VEHICLES.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.subtitle.toLowerCase().includes(q) ||
          v.badge.toLowerCase().includes(q)
      )
    : [];

  // Filter News
  const matchedNews = q
    ? NEWS_ARTICLES.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    : [];

  // Filter Dealers
  const matchedDealers = q
    ? GLOBAL_DEALERS.filter(
        (d) =>
          d.country.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.company.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const handleSelect = (route: PageRoute) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 md:px-8"
      onClick={onClose}
    >
      <div
        id="search-modal-card"
        className="w-full max-w-2xl bg-[#141618] border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative p-6 border-b border-white/10 flex items-center gap-4">
          <Search className="text-[#39AEB2] flex-shrink-0" size={22} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles, technology, news, distributors..."
            className="w-full bg-transparent text-lg text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {!q && (
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['JETOUR T2', 'G700 Luxury Off-Road', 'Kunpeng C-DM', 'JETOUR T1', 'Global Network', 'Travel+'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="bg-white/5 hover:bg-white/10 text-xs px-3.5 py-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {q && matchedVehicles.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider flex items-center gap-1.5">
                <Car size={14} />
                <span>Vehicle Models</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedVehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelect(`/${v.id}` as PageRoute)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#39AEB2]/50 text-left transition-all group"
                  >
                    <img
                      src={v.heroImage}
                      alt={v.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-10 object-contain"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#39AEB2]">
                        {v.name}
                      </h4>
                      <p className="text-xs text-gray-400">{v.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedNews.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider flex items-center gap-1.5">
                <FileText size={14} />
                <span>News & Media</span>
              </span>
              <div className="space-y-2">
                {matchedNews.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleSelect('/news')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                        {n.title}
                      </h4>
                      <span className="text-xs text-gray-400">{n.date} • {n.category}</span>
                    </div>
                    <ArrowRight size={14} className="text-[#39AEB2] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedDealers.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider flex items-center gap-1.5">
                <Globe size={14} />
                <span>Distributors & Network</span>
              </span>
              <div className="space-y-2">
                {matchedDealers.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect('/globalnetwork')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                        {d.country} — {d.company}
                      </h4>
                      <span className="text-xs text-gray-400">{d.city} ({d.region})</span>
                    </div>
                    <ArrowRight size={14} className="text-[#39AEB2] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedVehicles.length === 0 && matchedNews.length === 0 && matchedDealers.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm">No exact matches found for &quot;{query}&quot;.</p>
              <div className="mt-4 flex justify-center gap-4 text-xs text-[#39AEB2]">
                <button onClick={() => handleSelect('/t2')}>View JETOUR T2</button>
                <span>•</span>
                <button onClick={() => handleSelect('/technology')}>View Technology</button>
                <span>•</span>
                <button onClick={() => handleSelect('/globalnetwork')}>Global Network</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
