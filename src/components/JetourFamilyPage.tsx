import React from 'react';
import { VEHICLES } from '../data/vehicles';
import { Users, Heart, Sparkles, ArrowRight } from 'lucide-react';
import type { PageRoute, VehicleId } from '../types';

interface JetourFamilyPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
}

export const JetourFamilyPage: React.FC<JetourFamilyPageProps> = ({
  onNavigate,
  onOpenTestDrive,
}) => {
  const familyModels = VEHICLES.filter((v) =>
    ['dashing', 'x70plus', 'x90plus'].includes(v.id)
  );

  return (
    <div id="jetour-family-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/explore/life/bg_1.png"
            alt="JETOUR Family"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Comfort & Togetherness
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            JETOUR FAMILY
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Spacious 5 and 7-Seat SUVs Built for Unforgettable Family Adventures and Daily Urban Elegance.
          </p>
        </div>
      </section>

      {/* Grid of Family Models */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
            First-Class Travel
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            The Family SUV Collection
          </h2>
          <p className="text-sm text-gray-400">
            Engineered with maternal-and-infant grade healthy cabins, ultra-quiet NVH acoustic glass, and versatile theater seating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {familyModels.map((v) => (
            <div
              key={v.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#39AEB2] font-goldman uppercase tracking-wider">
                    {v.badge}
                  </span>
                  <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded font-mono">
                    {v.overviewSpecs[0]?.value}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-goldman text-white group-hover:text-[#39AEB2] transition-colors">
                  {v.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{v.subtitle}</p>

                <div className="my-6 relative h-40 flex items-center justify-center">
                  <img
                    src={v.heroImage}
                    alt={v.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {v.designTitle}
                </p>
              </div>

              <div className="p-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/${v.id}` as PageRoute)}
                  className="text-xs text-[#39AEB2] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Model</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={() => onOpenTestDrive(v.id)}
                  className="bg-white/10 hover:bg-[#39AEB2] hover:text-black text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                >
                  Test Drive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
