import React from 'react';
import { ArrowRight, Compass, Shield, Users, HeartHandshake } from 'lucide-react';
import { JetourLogo } from '../data/icons';
import type { PageRoute } from '../types';

interface BrandPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onNavigate }) => {
  return (
    <div id="brand-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Brand Hero */}
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/explore/history/p1.png"
            alt="JETOUR Brand Philosophy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Brand Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            TRAVEL<span className="text-[#39AEB2] font-sans">+</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Action is far better than hesitation. We see through the eyes of travelers, engineering vehicles that turn dreams into frontiers.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/ourjourney')}
              className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <span>Explore Our Journey</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Pillars of Travel+ */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
            Core Strategy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            The Dimensions of Travel+
          </h2>
          <p className="text-sm text-gray-400">
            A comprehensive philosophy integrating travel vehicles, ecological equipment, user co-creation, and responsible stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#39AEB2]/10 text-[#39AEB2] flex items-center justify-center mb-4">
                <Compass size={24} />
              </div>
              <h3 className="text-lg font-bold font-goldman text-white mb-2">Travel Vehicles</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rugged square-box SUVs with super-hybrid powertrains, electronic 4WD, and expansive adaptable cargo configurations.
              </p>
            </div>
            <span className="text-[11px] text-[#39AEB2] font-bold mt-4 block">G & T Series Lineup</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#39AEB2]/10 text-[#39AEB2] flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold font-goldman text-white mb-2">Travel Ecology</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Co-branded camping gear, roof tents, mobile power banks, and partnerships with national parks and scenic travel routes.
              </p>
            </div>
            <span className="text-[11px] text-[#39AEB2] font-bold mt-4 block">JETOUR Life Alliance</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#39AEB2]/10 text-[#39AEB2] flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold font-goldman text-white mb-2">Travel Culture</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Global fan festivals, expedition clubs, and user co-creation summits celebrating the unstoppable passion for exploration.
              </p>
            </div>
            <span className="text-[11px] text-[#39AEB2] font-bold mt-4 block">Global Fan Community</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#39AEB2]/10 text-[#39AEB2] flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-bold font-goldman text-white mb-2">Travel Responsibility</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Commitment to nature conservation, partnering with Cheetah Conservation Fund (CCF) to protect biodiversity worldwide.
              </p>
            </div>
            <span className="text-[11px] text-[#39AEB2] font-bold mt-4 block">Conservation & Green Eco</span>
          </div>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="py-20 px-6 md:px-16 bg-[#0a0b0c] border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
              The Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-goldman text-white">
              Born from the Spirit of Travel
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Founded in 2018, JETOUR has swiftly risen as one of the fastest-growing SUV brands in the world. By staying laser-focused on the &quot;Travel+&quot; segment, JETOUR engineers vehicles around genuine traveler needs: superior wading depth, cavernous luggage storage, high-strength safety cage construction, and smart off-road creeping modes.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Today, JETOUR vehicles traverse dunes in the Middle East, high mountain passes in the Andes, open savannahs in Africa, and bustling city streets across Asia and Latin America.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('/globalnetwork')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider backdrop-blur-md transition-all active:scale-95"
              >
                Discover Global Network
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://www.jetourglobal.com/new-static/images/explore/owners/p1.jpg"
              alt="JETOUR Community"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
