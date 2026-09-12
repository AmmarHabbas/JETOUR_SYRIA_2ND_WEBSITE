import React from 'react';
import { Cpu, Zap, Shield, Compass, Layers, Globe } from 'lucide-react';
import type { PageRoute } from '../types';

interface TechnologyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  return (
    <div id="technology-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://www.jetourglobal.com/new-static/images/technology/technology_bg.jpg"
            alt="JETOUR Technology"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-black/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Pioneering Engineering
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white">
            TRAVEL<span className="text-[#39AEB2] font-sans">+</span> TECH
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Smart Architecture, Super-Hybrid Efficiency, and Intelligent All-Terrain Conquest.
          </p>
        </div>
      </section>

      {/* 4+6 Global R&D Centers */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
            Global Innovation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            4+6 Global R&D Institutes
          </h2>
          <p className="text-sm text-gray-400">
            Harnessing global talent across Europe, North America, Middle East, and Asia to develop next-generation intelligent platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all">
            <Globe className="text-[#39AEB2] mb-4" size={32} />
            <h3 className="text-lg font-bold font-goldman text-white mb-2">Global Styling Centers</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Design studios in Turin and Shanghai combining rugged square-box aesthetics with contemporary aerodynamic precision.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all">
            <Cpu className="text-[#39AEB2] mb-4" size={32} />
            <h3 className="text-lg font-bold font-goldman text-white mb-2">Smart Cockpit & AI Labs</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Powered by Qualcomm Snapdragon 8155/8255 computing chips, delivering 4-zone voice control and high-performance intelligent driving.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#39AEB2]/60 transition-all">
            <Zap className="text-[#39AEB2] mb-4" size={32} />
            <h3 className="text-lg font-bold font-goldman text-white mb-2">New Energy & Hybrid Labs</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pioneering Kunpeng Super Hybrid C-DM with dedicated hybrid engines achieving industry-record 44.5% thermal efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-20 px-6 md:px-16 bg-[#0a0b0c] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Pillar 1: Kunpeng C-DM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                Hybrid Powertrain
              </span>
              <h3 className="text-2xl md:text-4xl font-bold font-goldman text-white">
                Kunpeng Super Hybrid C-DM
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Featuring a dedicated hybrid engine with an industry-leading thermal efficiency of 44.5%, 3-speed dedicated hybrid transmission (3DHT), and dual-motor electric all-wheel-drive architecture.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>Comprehensive range exceeding 1,400 km</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>0-100 km/h acceleration in 4.6s (G700)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>6.6kW V2L external power station for outdoor camping and rescue gear</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://www.jetourglobal.com/new-static/images/home/home_3_5.jpg"
                alt="Kunpeng C-DM"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pillar 2: BorgWarner XWD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://www.jetourglobal.com/new-static/images/home/home_3_6.jpg"
                alt="BorgWarner XWD"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                All-Terrain Conquest
              </span>
              <h3 className="text-2xl md:text-4xl font-bold font-goldman text-white">
                BorgWarner 6th Gen X-WD System
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Smart automated four-wheel-drive that continuously analyzes wheel slip, steering angle, and surface traction in milliseconds.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>Intelligent 6+X Driving Modes (Sport, Normal, Eco, Snow, Mud, Sand, X-Smart)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>Rear axle electro-hydraulic limited-slip differential lock (eLSD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39AEB2]" />
                  <span>Intelligent crawling assist mode for ultra-slow obstacle climbing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
