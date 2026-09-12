import React from 'react';
import { MOMENTS_ITEMS } from '../data/content';
import { MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';
import type { PageRoute } from '../types';

interface MomentsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const MomentsPage: React.FC<MomentsPageProps> = ({ onNavigate }) => {
  return (
    <div id="moments-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1e2327] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Adventure Chronicles
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-goldman tracking-tight text-white">
            MOMENTS
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Witness our journey across untamed landscapes, global owner festivals, and extraordinary collaborations around the world.
          </p>
        </div>
      </section>

      {/* Grid of Moments */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOMENTS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#39AEB2] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono">
                    {item.year}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <MapPin size={14} className="text-[#39AEB2]" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-bold font-goldman text-white group-hover:text-[#39AEB2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>JETOUR Travel+ Expedition</span>
                  <span className="text-[#39AEB2] font-semibold">Official Record</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
