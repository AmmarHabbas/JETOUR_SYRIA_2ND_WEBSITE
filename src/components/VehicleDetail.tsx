import React, { useState } from 'react';
import { Play, ArrowRight, CheckCircle2, ChevronRight, ZoomIn, X, Shield, Cpu, Zap, Volume2, Sparkles, Sliders } from 'lucide-react';
import { UiVehicles3dHall } from './UiVehicles3dHall';
import type { VehicleData, VehicleId, PageRoute } from '../types';

interface VehicleDetailProps {
  vehicle: VehicleData;
  onNavigate: (route: PageRoute) => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle,
  onNavigate,
  onOpenTestDrive,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeSpecCategory, setActiveSpecCategory] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; desc?: string } | null>(null);

  const scrollToSection = (sectionId: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 130;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
    }
  };

  const hasExperience = vehicle.experienceSlides && vehicle.experienceSlides.length > 0;
  const hasTech = vehicle.techSlides && vehicle.techSlides.length > 0;
  const hasVideos = vehicle.videos && vehicle.videos.length > 0;

  return (
    <div id="vehicle-detail-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Sub-navigation bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#141618]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-16 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <span className="text-base md:text-lg font-black font-goldman text-white whitespace-nowrap">
            {vehicle.name}
          </span>
          <span className="hidden md:inline text-xs text-gray-500">|</span>
          <span className="hidden lg:inline text-xs text-gray-400 truncate max-w-[280px]">
            {vehicle.subtitle}
          </span>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto text-xs font-medium no-scrollbar">
          <button
            onClick={() => scrollToSection('section-overview', 'overview')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('section-360', '360')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeTab === '360'
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            360° View
          </button>
          <button
            onClick={() => scrollToSection('section-design', 'design')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'design'
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => scrollToSection('section-performance', 'performance')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'performance'
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Performance
          </button>
          {hasExperience && (
            <button
              onClick={() => scrollToSection('section-experience', 'experience')}
              className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'bg-[#39AEB2] text-black font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Interior
            </button>
          )}
          {hasTech && (
            <button
              onClick={() => scrollToSection('section-tech', 'tech')}
              className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'tech'
                  ? 'bg-[#39AEB2] text-black font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Technology
            </button>
          )}
          {hasVideos && (
            <button
              onClick={() => scrollToSection('section-videos', 'videos')}
              className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'bg-[#39AEB2] text-black font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Videos
            </button>
          )}
          <button
            onClick={() => scrollToSection('section-specs', 'specs')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Specs
          </button>
          <button
            onClick={() => onOpenTestDrive(vehicle.id)}
            className="ml-2 bg-[#39AEB2] text-black px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[11px] hover:bg-[#2e9498] transition-colors whitespace-nowrap shadow-sm"
          >
            Book Drive
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <section id="section-overview" className="relative w-full min-h-[80vh] flex items-center justify-start px-6 md:px-20 overflow-hidden">
        {/* Background media */}
        <div className="absolute inset-0 pointer-events-none">
          {vehicle.heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={vehicle.heroVideo}
            />
          ) : (
            <img
              src={vehicle.heroImage}
              alt={vehicle.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-[#101112]/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101112]/95 via-[#101112]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl space-y-6 pt-16 pb-12">
          <div className="inline-block bg-[#39AEB2]/20 border border-[#39AEB2]/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#39AEB2] font-goldman">
            {vehicle.badge}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-goldman tracking-tight text-white drop-shadow-md">
            {vehicle.name}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            {vehicle.subtitle}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {vehicle.overviewSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-sm"
              >
                <span className="text-[11px] text-gray-400 block uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="text-sm md:text-base font-bold text-white mt-1 block">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('section-360', '360')}
              className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <span>Explore 360° View</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onOpenTestDrive(vehicle.id)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider backdrop-blur-md transition-all active:scale-95"
            >
              <span>Schedule Test Drive</span>
            </button>
            {hasVideos && (
              <button
                onClick={() => scrollToSection('section-videos', 'videos')}
                className="flex items-center gap-2 text-xs text-gray-300 hover:text-white px-4 py-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#39AEB2]">
                  <Play size={12} className="ml-0.5" />
                </div>
                <span>Watch Videos</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 360° Interactive Configurator Section */}
      <section id="section-360" className="py-20 px-4 sm:px-6 md:px-12 border-t border-white/10 bg-[#0c0d0e]">
        <div className="max-w-6xl mx-auto">
          <UiVehicles3dHall
            vehicleId={vehicle.id}
            folder={vehicle.exterior3d?.folder || vehicle.id}
            colors={vehicle.exteriorColors}
            defaultColor={vehicle.exterior3d?.defaultColor}
            totalFrames={vehicle.exterior3d?.num || 36}
            vehicleName={vehicle.name}
          />
        </div>
      </section>

      {/* Exterior & Design Highlights */}
      <section id="section-design" className="py-20 px-6 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                Aesthetics & Design
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                {vehicle.designTitle}
              </h2>
            </div>
            <p className="text-xs text-gray-400 max-w-md">
              High-resolution vehicle photography from official Jetour Global design studios. Click any photo to enlarge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicle.designSlides.map((slide, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewImage({ url: slide.image, title: slide.title, desc: slide.description })}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col hover:shadow-xl hover:shadow-[#39AEB2]/5"
              >
                <div className="h-64 overflow-hidden relative bg-[#151719]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-[#39AEB2] uppercase tracking-wider font-goldman">
                    Design 0{idx + 1}
                  </span>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <ZoomIn size={14} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors leading-snug">
                    {slide.title}
                  </h3>
                  {slide.description && (
                    <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance & Off-Road Engineering */}
      <section id="section-performance" className="py-20 px-6 md:px-16 bg-[#0d0e0f] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                Off-Road Engineering & Powertrain
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                {vehicle.performanceTitle}
              </h2>
            </div>
            <p className="text-xs text-gray-400 max-w-md">
              Rigorous testing across 100+ countries, high altitude deserts, extreme cold, and flooded riverbeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicle.performanceSlides.map((slide, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewImage({ url: slide.image, title: slide.title, desc: slide.description })}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 flex flex-col sm:flex-row gap-6 items-center hover:border-[#39AEB2]/60 transition-all hover:shadow-xl hover:shadow-[#39AEB2]/5"
              >
                <div className="w-full sm:w-1/2 h-48 rounded-xl overflow-hidden flex-shrink-0 relative bg-[#151719]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <ZoomIn size={12} />
                  </div>
                </div>
                <div className="w-full sm:w-1/2 space-y-2.5">
                  <span className="text-[10px] text-[#39AEB2] uppercase font-bold font-goldman tracking-wider">
                    Capability 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {slide.description || 'Engineered for exceptional stability, torque delivery, and control.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior & Cabin Comfort (Experience) */}
      {hasExperience && (
        <section id="section-experience" className="py-20 px-6 md:px-16 border-t border-white/10 bg-[#101112]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                  Luxury Cabin & Comfort
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                  {vehicle.experienceTitle || 'First-Class Interior Experience'}
                </h2>
              </div>
              <p className="text-xs text-gray-400 max-w-md">
                Ergonomic luxury seating, multi-zone climate control, and acoustic silence engineered for long adventures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vehicle.experienceSlides!.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => setPreviewImage({ url: slide.image, title: slide.title, desc: slide.description })}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col hover:shadow-xl hover:shadow-[#39AEB2]/5"
                >
                  <div className="h-64 overflow-hidden relative bg-[#151719]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <span className="absolute bottom-4 left-4 text-xs font-bold text-[#39AEB2] uppercase tracking-wider font-goldman">
                      Interior 0{idx + 1}
                    </span>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <ZoomIn size={14} />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors leading-snug">
                      {slide.title}
                    </h3>
                    {slide.description && (
                      <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intelligent Technology & Connectivity */}
      {hasTech && (
        <section id="section-tech" className="py-20 px-6 md:px-16 bg-[#0b0c0d] border-t border-white/10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                  Intelligent Cockpit & Safety
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                  {vehicle.techTitle || 'Smart Connected Technology'}
                </h2>
              </div>
              <p className="text-xs text-gray-400 max-w-md">
                Equipped with cutting-edge automotive computing chipsets, transparent underbody camera systems, and smart V2L energy export.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vehicle.techSlides!.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => setPreviewImage({ url: slide.image, title: slide.title, desc: slide.description })}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 flex flex-col sm:flex-row gap-6 items-center hover:border-[#39AEB2]/60 transition-all hover:shadow-xl hover:shadow-[#39AEB2]/5"
                >
                  <div className="w-full sm:w-1/2 h-48 rounded-xl overflow-hidden flex-shrink-0 relative bg-[#151719]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <ZoomIn size={12} />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 space-y-2.5">
                    <span className="text-[10px] text-[#39AEB2] uppercase font-bold font-goldman tracking-wider">
                      Tech 0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {slide.description || 'Intelligent computing and autonomous assistance engineered for seamless journeys.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authentic Video Showcase */}
      {hasVideos && (
        <section id="section-videos" className="py-20 px-6 md:px-16 border-t border-white/10 bg-[#0d0e10]">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                  Media & Action
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                  Official Video Showcase
                </h2>
              </div>
              <p className="text-xs text-gray-400 max-w-md">
                High-definition video documentation of {vehicle.name} conquering challenging terrains and demonstrating key capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicle.videos!.map((vid, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo({ title: vid.title, url: vid.video })}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2] transition-all hover:shadow-xl hover:shadow-[#39AEB2]/10"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={vid.image}
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#39AEB2] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={18} className="ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#39AEB2] transition-colors line-clamp-1">
                      {vid.title}
                    </h4>
                    <span className="text-[10px] text-[#39AEB2] font-bold uppercase tracking-wider font-goldman flex-shrink-0 ml-2">
                      Play
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full Technical Specifications Table */}
      <section id="section-specs" className="py-20 px-6 md:px-16 bg-[#0a0b0c] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#39AEB2] font-goldman">
                Technical Data
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white mt-1">
                Full Specifications
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {vehicle.fullSpecs.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpecCategory(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeSpecCategory === idx
                      ? 'bg-[#39AEB2] text-black font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Specs Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#39AEB2] font-goldman">
                {vehicle.fullSpecs[activeSpecCategory]?.category}
              </h3>
              <span className="text-xs text-gray-500">Official Factory Specifications</span>
            </div>

            <div className="divide-y divide-white/10">
              {vehicle.fullSpecs[activeSpecCategory]?.items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                  <span className="text-sm text-white font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="py-20 px-6 md:px-16 border-t border-white/10 bg-radial from-[#1e2327] to-[#101112] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-block bg-[#39AEB2]/20 border border-[#39AEB2]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#39AEB2] font-goldman">
            {vehicle.badge} Test Drive
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-goldman text-white">
            Ready to Experience the {vehicle.name}?
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Contact your nearest official JETOUR distributor or arrange a personalized test drive with one of our certified product specialists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenTestDrive(vehicle.id)}
              className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              Book a Test Drive
            </button>
            <button
              onClick={() => onNavigate('/globalnetwork')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider backdrop-blur-md transition-all active:scale-95"
            >
              Find Nearest Dealer
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-4 bg-[#141618] border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white font-goldman line-clamp-1">
                {selectedVideo.title}
              </span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
            <video
              autoPlay
              controls
              playsInline
              className="w-full aspect-video object-contain bg-black"
              src={selectedVideo.url}
            />
          </div>
        </div>
      )}

      {/* Full-Screen Photo Lightbox Modal */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#141618] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
          >
            <div className="p-4 bg-[#181a1c] border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white font-goldman">
                {previewImage.title}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative max-h-[75vh] flex items-center justify-center bg-black p-2">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
            {previewImage.desc && (
              <div className="p-4 bg-[#141618] border-t border-white/10 text-xs text-gray-300">
                {previewImage.desc}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
