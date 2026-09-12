import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ArrowRight, ChevronDown, Sparkles, Shield, Cpu, Compass } from 'lucide-react';
import { JetourGIcon, JetourTIcon } from '../data/icons';
import { NEWS_ARTICLES } from '../data/content';
import { useI18n } from '../data/i18nContext';
import type { PageRoute, VehicleId } from '../types';

interface HomeSwiperProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
}

export const HomeSwiper: React.FC<HomeSwiperProps> = ({ onNavigate, onOpenTestDrive }) => {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const totalSlides = 7;
  const isScrollingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Video progress tracker
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentSlide]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Wheel listener for smooth slide snapping with debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        isScrollingRef.current = true;
        setCurrentSlide((prev) => prev + 1);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 750);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        isScrollingRef.current = true;
        setCurrentSlide((prev) => prev - 1);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 750);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentSlide < totalSlides - 1) setCurrentSlide((prev) => prev + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 45) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }
    touchStartY.current = null;
  };

  return (
    <div
      id="home-swiper-container"
      className="relative w-full h-screen overflow-hidden bg-[#101112] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Container with translateY */}
      <div
        className="w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {/* SLIDE 0: G700 Flagship Hero */}
        <section className="relative w-full h-screen flex items-end pb-16 sm:pb-20 md:pb-24 pt-20 px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://www.jetourglobal.com/new-static/images/home/home_2.mp4"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <JetourGIcon className="h-4 w-auto text-[#39AEB2]" />
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Flagship Luxury Off-Road
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-goldman text-white drop-shadow-lg leading-none">
              G700
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light tracking-wide max-w-xl leading-relaxed">
              Luxury Off-road, Redefined. GAIA Aesthetics & Kunpeng Super Hybrid C-DM.
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Engine</span>
                <span className="font-bold text-white">2.0T Plug-in Hybrid</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Acceleration</span>
                <span className="font-bold text-white">0-100 in 4.6s</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Wheelbase</span>
                <span className="font-bold text-white">2,870 mm</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Power Export</span>
                <span className="font-bold text-white">6.6 kW V2L</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <button
                id="hero-explore-g700-btn"
                onClick={() => onNavigate('/g700')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
              >
                <span>Explore G700</span>
                <ArrowRight size={15} />
              </button>

              <button
                id="hero-book-g700-btn"
                onClick={() => onOpenTestDrive('g700')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Book Test Drive</span>
              </button>
            </div>
          </div>

          {/* Video Play/Pause Circular Progress Widget */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-3">
            <button
              onClick={toggleVideoPlayback}
              className="relative w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#39AEB2"
                  strokeWidth="2"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 - (125.6 * videoProgress) / 100}
                  className="transition-all duration-100"
                />
              </svg>
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>
          </div>
        </section>

        {/* SLIDE 1: JETOUR T2 Rugged Adventure SUV */}
        <section className="relative w-full h-screen flex items-end pb-16 sm:pb-20 md:pb-24 pt-20 px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://www.jetourglobal.com/new-static/images/vehicles/cars/T2/video/v000.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <JetourTIcon className="h-4 w-auto text-[#39AEB2]" />
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Rugged Adventure SUV
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-goldman text-white leading-none">
              JETOUR T2
            </h2>

            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light tracking-wide max-w-xl leading-relaxed">
              TRAVEL+ FOR TRAVELERS. Hardcore matrix design, BorgWarner XWD, and Snapdragon 8155 smart cabin.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Power</span>
                <span className="font-bold text-white">2.0TGDI 254 HP</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Drive</span>
                <span className="font-bold text-white">BorgWarner 6th Gen XWD</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Wading Depth</span>
                <span className="font-bold text-white">700 mm</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Torsional Stiffness</span>
                <span className="font-bold text-white">31,000 N·m/deg</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <button
                id="hero-explore-t2-btn"
                onClick={() => onNavigate('/t2')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
              >
                <span>Explore T2</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onOpenTestDrive('t2')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Book Test Drive</span>
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 2: JETOUR T1 Rugged & Agile SUV */}
        <section className="relative w-full h-screen flex items-end pb-16 sm:pb-20 md:pb-24 pt-20 px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://www.jetourglobal.com/new-static/images/explore/history/p1.png"
              alt="JETOUR T1"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <JetourTIcon className="h-4 w-auto text-[#39AEB2]" />
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Rugged & Agile SUV
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-goldman text-white leading-none">
              JETOUR T1
            </h2>

            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light tracking-wide max-w-xl leading-relaxed">
              Time to Awaken. Modern geometric styling tailored for young urban adventurers and weekend escapes.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Engine</span>
                <span className="font-bold text-white">1.5TD / 2.0TD Kunpeng</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Wheelbase</span>
                <span className="font-bold text-white">2,810 mm</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">PHEV Option</span>
                <span className="font-bold text-white">Available (T1 i-DM)</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <button
                id="hero-explore-t1-btn"
                onClick={() => onNavigate('/t1')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
              >
                <span>Explore T1</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate('/t1-i-dm')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore T1 i-DM</span>
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 3: JETOUR DASHING Vanguard SUV */}
        <section className="relative w-full h-screen flex items-end pb-16 sm:pb-20 md:pb-24 pt-20 px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://www.jetourglobal.com/new-static/images/explore/life/bg_1.png"
              alt="JETOUR DASHING"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Vanguard Technology SUV
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-goldman text-white leading-none">
              DASHING
            </h2>

            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light tracking-wide max-w-xl leading-relaxed">
              Future on Demand. Frameless coupe styling, 1.6TGDI Kunpeng Power, and smart minimalist cockpit.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Power</span>
                <span className="font-bold text-white">197 HP / 290 N·m</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Transmission</span>
                <span className="font-bold text-white">7-Speed Wet DCT</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-gray-400 block text-[10px] uppercase">Screen</span>
                <span className="font-bold text-white">15.6-inch Center Display</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <button
                id="hero-explore-dashing-btn"
                onClick={() => onNavigate('/dashing')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
              >
                <span>Explore DASHING</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 4: TRAVEL+ TECHNOLOGY */}
        <section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://www.jetourglobal.com/new-static/images/technology/technology_bg.jpg"
              alt="JETOUR Technology"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <div className="relative z-10 max-w-5xl w-full my-auto py-16 sm:py-20 space-y-6 sm:space-y-8 max-h-[92vh] overflow-y-auto">
            <div>
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Travel+ Strategy Core
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-goldman tracking-tight text-white mt-2">
                TRAVEL+ TECHNOLOGY
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mt-2 font-light">
                Engineering intelligent, reliable, and electrifying adventures backed by 4+6 Global R&D Institutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md hover:border-[#39AEB2]/60 transition-colors">
                <Cpu className="text-[#39AEB2] mb-3" size={28} />
                <h3 className="text-base sm:text-lg font-bold font-goldman text-white mb-2">
                  Kunpeng Super Hybrid C-DM
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  World-leading 44.5% engine thermal efficiency, 3-speed dedicated hybrid transmission (3DHT), and 1,400+ km endurance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md hover:border-[#39AEB2]/60 transition-colors">
                <Compass className="text-[#39AEB2] mb-3" size={28} />
                <h3 className="text-base sm:text-lg font-bold font-goldman text-white mb-2">
                  BorgWarner X-WD System
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Millisecond automatic 2WD to 4WD switching, electronic limited-slip differential, and intelligent crawl assist mode.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md hover:border-[#39AEB2]/60 transition-colors">
                <Shield className="text-[#39AEB2] mb-3" size={28} />
                <h3 className="text-base sm:text-lg font-bold font-goldman text-white mb-2">
                  Kunlun Architecture
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Modular multi-energy platform with ultra-high torsional stiffness steel cage body, tested in over 100 countries.
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('/technology')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-7 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Explore Full Technology Suite</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 5: JETOUR LIFE & ECOSYSTEM */}
        <section className="relative w-full h-screen flex items-end pb-16 sm:pb-20 md:pb-24 pt-20 px-6 sm:px-12 md:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://www.jetourglobal.com/new-static/images/brandHistory/third_bg.jpg"
              alt="JETOUR Life"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="text-[#39AEB2]" size={16} />
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                Travel Ecosystem
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-goldman text-white leading-none">
              JETOUR LIFE
            </h2>

            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light tracking-wide max-w-xl leading-relaxed">
              More than vehicles. Customized outdoor gear, rooftop tents, camping kitchens, and a global community celebrating the spirit of adventure.
            </p>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
              <button
                onClick={() => onNavigate('/jetourlife')}
                className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Discover JETOUR Life</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate('/jetourfamily')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Global Owners Club</span>
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 6: MOMENTS & NEWS GRID */}
        <section className="relative w-full h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 text-white overflow-hidden bg-[#0e1011]">
          <div className="max-w-6xl mx-auto w-full my-auto py-14 sm:py-16 space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
                  Media & Global Stories
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-goldman text-white mt-1">
                  MOMENTS & NEWS
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('/news')}
                  className="text-xs text-[#39AEB2] hover:underline flex items-center gap-1 font-bold tracking-wider uppercase cursor-pointer"
                >
                  <span>All News</span>
                  <ArrowRight size={13} />
                </button>
                <span className="text-gray-600">|</span>
                <button
                  onClick={() => onNavigate('/moments')}
                  className="text-xs text-[#39AEB2] hover:underline flex items-center gap-1 font-bold tracking-wider uppercase cursor-pointer"
                >
                  <span>All Moments</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {NEWS_ARTICLES.slice(0, 3).map((article) => (
                <div
                  key={article.id}
                  onClick={() => onNavigate('/news')}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col"
                >
                  <div className="h-36 sm:h-40 md:h-44 w-full overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-[#39AEB2] uppercase">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1.5">{article.date}</span>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white">
                      <span>Read Story</span>
                      <ArrowRight size={13} className="text-[#39AEB2]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 text-xs text-gray-400">
              <p>JETOUR Global — Defined by Adventure, Guided by Travelers.</p>
              <button
                onClick={() => onNavigate('/globalnetwork')}
                className="text-[#39AEB2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Find Dealer Network Worldwide</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Right-Side Slide Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3 bg-black/30 backdrop-blur-md py-3 px-2 rounded-full border border-white/10">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group flex items-center gap-2 cursor-pointer p-1"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-2 h-5 bg-[#39AEB2]'
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Down Chevron Indicator */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={() => setCurrentSlide((prev) => prev + 1)}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/50 hover:text-white animate-bounce transition-colors cursor-pointer p-2"
          aria-label="Scroll to next slide"
        >
          <ChevronDown size={24} />
        </button>
      )}
    </div>
  );
};
