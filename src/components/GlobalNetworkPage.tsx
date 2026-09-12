import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { GLOBAL_DEALERS } from '../data/dealers';
import type { PageRoute, VehicleId } from '../types';

interface GlobalNetworkPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
}

const REGIONS = ['All', 'Middle East', 'South America', 'Africa', 'Asia', 'Europe', 'North America'] as const;

export const GlobalNetworkPage: React.FC<GlobalNetworkPageProps> = ({
  onNavigate,
  onOpenTestDrive,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDealers = useMemo(() => {
    return GLOBAL_DEALERS.filter((dealer) => {
      const matchesRegion = selectedRegion === 'All' || dealer.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dealer.country.toLowerCase().includes(q) ||
        dealer.city.toLowerCase().includes(q) ||
        dealer.company.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div id="global-network-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Header Banner */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1e2327] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Global Presence
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-goldman tracking-tight text-white">
            GLOBAL NETWORK
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Locate authorized JETOUR distributors, showrooms, and certified service centers across more than 60 countries worldwide.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, city, or distributor name..."
              className="w-full bg-white/10 border border-white/20 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#39AEB2] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto space-y-8">
        {/* Region Filter Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedRegion === r
                  ? 'bg-[#39AEB2] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#39AEB2] font-goldman tracking-wider block">
                      {dealer.region}
                    </span>
                    <h3 className="text-xl font-bold font-goldman text-white mt-0.5">
                      {dealer.country}
                    </h3>
                  </div>
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded text-gray-300 font-mono">
                    {dealer.countryCode}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                  <div className="font-semibold text-white text-sm">{dealer.company}</div>

                  <div className="flex items-start gap-2 text-gray-400">
                    <MapPin size={15} className="text-[#39AEB2] flex-shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-[#39AEB2] flex-shrink-0" />
                    <a href={`tel:${dealer.phone}`} className="hover:underline">
                      {dealer.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} className="text-[#39AEB2] flex-shrink-0" />
                    <a href={`mailto:${dealer.email}`} className="hover:underline">
                      {dealer.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                {dealer.website ? (
                  <a
                    href={dealer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#39AEB2] hover:underline flex items-center gap-1"
                  >
                    <span>Visit Distributor Site</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-500">Official Distributor</span>
                )}

                <button
                  onClick={() => onOpenTestDrive()}
                  className="bg-white/10 hover:bg-[#39AEB2] hover:text-black text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                >
                  Contact Dealer
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-base">No distributors found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="mt-4 text-[#39AEB2] text-xs underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
