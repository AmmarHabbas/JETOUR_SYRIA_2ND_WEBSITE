import React from 'react';
import { Award, Compass, Users, Star, ArrowRight } from 'lucide-react';
import type { PageRoute } from '../types';

interface JmaPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const JmaPage: React.FC<JmaPageProps> = ({ onNavigate }) => {
  return (
    <div id="jma-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/explore/owners/p1.jpg"
            alt="JETOUR Masters & Ambassadors"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Global Community
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            JMA PROGRAM
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            JETOUR Masters & Ambassadors. An Exclusive Global Network of Explorers, Off-Road Racers, and Travel Creators.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
            Co-Creation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            Driven by Passionate Explorers
          </h2>
          <p className="text-sm text-gray-400">
            JMA members co-design custom off-road equipment, test prototype vehicles in extreme arctic and desert trials, and lead international travel convoys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3">
            <Award className="mx-auto text-[#39AEB2]" size={36} />
            <h3 className="text-lg font-bold font-goldman text-white">Honorary Privileges</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Priority access to international motor shows, Dakar Rally VIP pits, and global launch galas.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3">
            <Compass className="mx-auto text-[#39AEB2]" size={36} />
            <h3 className="text-lg font-bold font-goldman text-white">Extreme Field Trials</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Direct vehicle telemetry input to JETOUR R&D engineering teams during desert and plateau testing.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3">
            <Users className="mx-auto text-[#39AEB2]" size={36} />
            <h3 className="text-lg font-bold font-goldman text-white">Global Fellowship</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Connect with fellow ambassadors across 60+ countries for intercontinental overland expeditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
