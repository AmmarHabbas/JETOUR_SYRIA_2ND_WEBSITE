import React from 'react';
import { Tent, Coffee, Compass, Sparkles, ArrowRight } from 'lucide-react';
import type { PageRoute } from '../types';

interface JetourLifePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const JetourLifePage: React.FC<JetourLifePageProps> = ({ onNavigate }) => {
  return (
    <div id="jetour-life-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/explore/life/bg_1.png"
            alt="JETOUR Life"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Travel+ Ecosystem
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            JETOUR LIFE
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Expand the Horizons of Adventure. Curated Camping Gear, Travel Partnerships, and Lifestyle Accessories.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
            Outdoor Gear
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            Gear Built for the Wild
          </h2>
          <p className="text-sm text-gray-400">
            Tailor-engineered for seamless integration with JETOUR roof racks, trunk anchor points, and 6.6kW V2L external power export.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col">
            <div className="h-56 overflow-hidden">
              <img
                src="https://www.jetourglobal.com/new-static/images/home/home_3_1.jpg"
                alt="Rooftop Tent & Annex"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#39AEB2] text-xs font-bold uppercase mb-2">
                  <Tent size={16} />
                  <span>Rooftop Tents</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hard-Shell Automated Roof Tent</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Hydraulic rapid setup in 30 seconds. Heavy-duty waterproof canvas with built-in high-density memory foam mattress.
                </p>
              </div>
              <span className="text-[11px] text-[#39AEB2] font-bold mt-4">Fits JETOUR T2 & G700</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col">
            <div className="h-56 overflow-hidden">
              <img
                src="https://www.jetourglobal.com/new-static/images/home/home_3_2.jpg"
                alt="Mobile Kitchen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#39AEB2] text-xs font-bold uppercase mb-2">
                  <Coffee size={16} />
                  <span>Modular Kitchen</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Slide-Out Camping Kitchen Box</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Includes induction cooker powered directly by vehicle V2L, titanium cookware set, and integrated LED task lighting.
                </p>
              </div>
              <span className="text-[11px] text-[#39AEB2] font-bold mt-4">Trunk Modular System</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col">
            <div className="h-56 overflow-hidden">
              <img
                src="https://www.jetourglobal.com/new-static/images/home/home_3_3.jpg"
                alt="Outdoor Expedition Pack"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#39AEB2] text-xs font-bold uppercase mb-2">
                  <Compass size={16} />
                  <span>Expedition Accessories</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Heavy-Duty Recovery & Storage Kit</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Traction boards, kinetic recovery straps, water storage tanks, and aluminum lockable side gear boxes.
                </p>
              </div>
              <span className="text-[11px] text-[#39AEB2] font-bold mt-4">Authentic Co-Creation Gear</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
