import React from 'react';
import { MILESTONES } from '../data/content';
import { Calendar, Award, ChevronRight } from 'lucide-react';
import type { PageRoute } from '../types';

interface OurJourneyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const OurJourneyPage: React.FC<OurJourneyPageProps> = ({ onNavigate }) => {
  return (
    <div id="our-journey-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/explore/history/p1.png"
            alt="JETOUR Journey"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Milestones & Evolution
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            OUR JOURNEY
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            From an Audacious Vision in 2018 to Delivering Adventure Vehicles to Over 60 Nations.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="relative border-l-2 border-[#39AEB2]/30 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
          {MILESTONES.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-[#101112] border-2 border-[#39AEB2] flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#39AEB2]" />
              </div>

              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-goldman bg-[#39AEB2]/20 text-[#39AEB2] border border-[#39AEB2]/40">
                  {item.year}
                </span>
                <h3 className="text-2xl font-bold font-goldman text-white group-hover:text-[#39AEB2] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {item.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 max-w-xl h-52">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
