import React from 'react';
import { VEHICLES } from '../data/vehicles';
import { ArrowRight, Check } from 'lucide-react';
import type { SeriesId, PageRoute, VehicleId } from '../types';

interface SeriesOverviewProps {
  series: SeriesId;
  onNavigate: (route: PageRoute) => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
}

export const SeriesOverview: React.FC<SeriesOverviewProps> = ({
  series,
  onNavigate,
  onOpenTestDrive,
}) => {
  const seriesVehicles = VEHICLES.filter((v) => v.series === series);

  const meta = {
    gSeries: {
      title: 'JETOUR G SERIES',
      subtitle: 'Luxury Off-Road, Redefined',
      tagline: 'Flagship all-terrain luxury SUVs combining devastating hybrid power, air suspension, and executive comfort.',
      banner: 'https://www.jetourglobal.com/new-static/images/home/home_3_4.jpg',
    },
    tSeries: {
      title: 'JETOUR T SERIES',
      subtitle: 'Born for Adventure & Wilderness',
      tagline: 'Rugged square-box SUVs with BorgWarner 6th Gen XWD, extreme water wading, and high-stiffness steel cage bodies.',
      banner: 'https://www.jetourglobal.com/new-static/images/explore/history/p1.png',
    },
    jmkSeries: {
      title: 'JETOUR JMK CO-BRAND',
      subtitle: 'Customized Off-Road Modification',
      tagline: 'Official factory bespoke modifications co-created with top global off-road custom houses.',
      banner: 'https://www.jetourglobal.com/new-static/images/home/home_3_5.jpg',
    },
    familySeries: {
      title: 'JETOUR FAMILY SUVS',
      subtitle: 'Comfort, Space & Cutting-Edge Tech',
      tagline: 'Versatile 5 and 7-seat SUVs engineered for first-class family road trips.',
      banner: 'https://www.jetourglobal.com/new-static/images/explore/life/bg_1.png',
    },
  }[series] || {
    title: 'JETOUR VEHICLE LINEUP',
    subtitle: 'Travel+ SUV Portfolio',
    tagline: 'Engineered for adventurers worldwide.',
    banner: 'https://www.jetourglobal.com/new-static/images/home/home_3_4.jpg',
  };

  return (
    <div id="series-overview-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={meta.banner}
            alt={meta.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Official Lineup
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            {meta.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            {meta.subtitle}
          </p>
          <p className="text-sm text-gray-400 max-w-xl">
            {meta.tagline}
          </p>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seriesVehicles.map((v) => (
            <div
              key={v.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between"
            >
              <div className="p-8 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#39AEB2] font-goldman uppercase tracking-wider">
                    {v.badge}
                  </span>
                  <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full font-mono">
                    {v.overviewSpecs[0]?.value}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-goldman text-white group-hover:text-[#39AEB2] transition-colors">
                  {v.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{v.subtitle}</p>

                <div className="my-6 relative h-48 flex items-center justify-center">
                  <img
                    src={v.heroImage}
                    alt={v.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                  {v.overviewSpecs.slice(0, 4).map((spec, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-gray-400 uppercase block">{spec.label}</span>
                      <strong className="text-white block mt-0.5">{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate(`/${v.id}` as PageRoute)}
                  className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore 360° & Specs</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => onOpenTestDrive(v.id)}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors"
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
