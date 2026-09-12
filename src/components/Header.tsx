import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { JetourLogo, JetourGIcon, JetourTIcon, JetourJmkIcon } from '../data/icons';
import { VEHICLES } from '../data/vehicles';
import { useI18n } from '../data/i18nContext';
import type { PageRoute, VehicleId, Locale } from '../types';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
  onOpenTestDrive: (vehicleId?: VehicleId) => void;
  isLightPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenTestDrive,
  isLightPage = false,
}) => {
  const { locale, setLocale, t, isRTL } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'models' | 'world' | 'media' | 'lang' | null>(null);
  const [modelsActiveTab, setModelsActiveTab] = useState<'g' | 't' | 'family' | 'jmk'>('t');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDarkNav = !isScrolled && !isLightPage && !activeDropdown;

  const headerBgClass = isDarkNav
    ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white'
    : 'bg-[#101112]/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg';

  const gModels = VEHICLES.filter((v) => v.series === 'gSeries');
  const tModels = VEHICLES.filter((v) => v.series === 'tSeries');
  const familyModels = VEHICLES.filter((v) => v.series === 'familySeries');

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <button
            id="nav-logo-btn"
            onClick={() => {
              onNavigate('/');
              setActiveDropdown(null);
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer text-white hover:opacity-80 transition-opacity flex items-center py-2"
            aria-label="JETOUR Global Home"
          >
            <JetourLogo className="h-4 md:h-5 w-auto" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full" ref={dropdownRef}>
          {/* Models Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('models')}
          >
            <button
              id="nav-models-btn"
              onClick={() => setActiveDropdown(activeDropdown === 'models' ? null : 'models')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                currentRoute === '/t2' || currentRoute === '/g700' || currentRoute === '/t1'
                  ? 'text-[#39AEB2]'
                  : 'hover:text-[#39AEB2]'
              }`}
            >
              <span>{t('menu.models', 'Models')}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  activeDropdown === 'models' ? 'rotate-180 text-[#39AEB2]' : 'text-gray-400'
                }`}
              />
            </button>

            {/* Mega Dropdown for Models */}
            {activeDropdown === 'models' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[92vw] max-w-6xl bg-[#141618] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Series Tabs */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                  <button
                    id="models-tab-t"
                    onClick={() => setModelsActiveTab('t')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      modelsActiveTab === 't'
                        ? 'bg-[#39AEB2] text-black shadow-md'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <JetourTIcon className="h-3.5 w-auto" />
                    <span>T Series</span>
                  </button>

                  <button
                    id="models-tab-g"
                    onClick={() => setModelsActiveTab('g')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      modelsActiveTab === 'g'
                        ? 'bg-[#39AEB2] text-black shadow-md'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <JetourGIcon className="h-3.5 w-auto" />
                    <span>G Series</span>
                  </button>

                  <button
                    id="models-tab-family"
                    onClick={() => setModelsActiveTab('family')}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      modelsActiveTab === 'family'
                        ? 'bg-[#39AEB2] text-black shadow-md'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Family SUVs
                  </button>

                  <button
                    id="models-tab-jmk"
                    onClick={() => setModelsActiveTab('jmk')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      modelsActiveTab === 'jmk'
                        ? 'bg-[#39AEB2] text-black shadow-md'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <JetourJmkIcon className="h-3 w-auto" />
                    <span>JMK Co-brand</span>
                  </button>

                  <div className="ml-auto flex items-center gap-3">
                    <button
                      id="view-all-t-series"
                      onClick={() => {
                        onNavigate(modelsActiveTab === 'g' ? '/gSeries' : '/tSeries');
                        setActiveDropdown(null);
                      }}
                      className="text-xs text-[#39AEB2] hover:underline flex items-center gap-1"
                    >
                      <span>View Series Overview</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Vehicles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {(modelsActiveTab === 't'
                    ? tModels
                    : modelsActiveTab === 'g'
                    ? gModels
                    : modelsActiveTab === 'family'
                    ? familyModels
                    : [
                        {
                          id: 'g700' as VehicleId,
                          name: 'G700 Whisling Arrow',
                          subtitle: 'Custom Rugged Luxury',
                          badge: 'JMK',
                          heroImage:
                            'https://www.jetourglobal.com/new-static/images/header/vehicles/g700.png',
                          overviewSpecs: [{ label: 'Engine', value: '2.0TD C-DM' }],
                        },
                        {
                          id: 't2' as VehicleId,
                          name: 'T2 TOPFIRE Co-Creation',
                          subtitle: 'Off-Road Special Edition',
                          badge: 'JMK',
                          heroImage:
                            'https://www.jetourglobal.com/new-static/images/header/vehicles/t2.png',
                          overviewSpecs: [{ label: 'Drive', value: 'BorgWarner XWD' }],
                        },
                      ]
                  ).map((v) => (
                    <div
                      key={v.id}
                      onClick={() => {
                        onNavigate(`/${v.id}` as PageRoute);
                        setActiveDropdown(null);
                      }}
                      className="group cursor-pointer bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#39AEB2]/50 rounded-xl p-4 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#39AEB2] font-goldman">
                            {v.badge}
                          </span>
                          <span className="text-[10px] text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                            {v.overviewSpecs[0]?.value}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors">
                          {v.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{v.subtitle}</p>
                      </div>

                      <div className="my-4 py-2 relative flex items-center justify-center overflow-hidden h-28">
                        <img
                          src={v.heroImage}
                          alt={v.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300 group-hover:text-white">
                        <span className="font-medium">Explore Vehicle</span>
                        <ArrowRight
                          size={14}
                          className="text-[#39AEB2] transform group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* JETOUR World Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('world')}
          >
            <button
              id="nav-world-btn"
              onClick={() => setActiveDropdown(activeDropdown === 'world' ? null : 'world')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                currentRoute === '/brand' ||
                currentRoute === '/technology' ||
                currentRoute === '/jetourlife' ||
                currentRoute === '/jetourfamily' ||
                currentRoute === '/ourjourney'
                  ? 'text-[#39AEB2]'
                  : 'hover:text-[#39AEB2]'
              }`}
            >
              <span>{t('menu.JETOURWorld', 'JETOUR World')}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  activeDropdown === 'world' ? 'rotate-180 text-[#39AEB2]' : 'text-gray-400'
                }`}
              />
            </button>

            {activeDropdown === 'world' && (
              <div
                className="absolute top-full left-0 w-72 bg-[#141618] border border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onNavigate('/brand');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.travelPlus', 'Travel+ Philosophy')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Brand story, mission & cultural spirit</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/technology');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.technology', 'Technology')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">
                      Kunlun architecture, Kunpeng C-DM & XWD
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/jetourlife');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.jietourLife', 'JETOUR Life')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">
                      Outdoor lifestyle, camping & travel eco
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/jetourfamily');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.jetourFamily', 'JETOUR Family')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Global owners club & fan festivals</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/ourjourney');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.ourJourney', 'Our Journey')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Milestones from 2018 to global presence</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Media Center Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('media')}
          >
            <button
              id="nav-media-btn"
              onClick={() => setActiveDropdown(activeDropdown === 'media' ? null : 'media')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                currentRoute === '/news' || currentRoute === '/moments' || currentRoute === '/jma'
                  ? 'text-[#39AEB2]'
                  : 'hover:text-[#39AEB2]'
              }`}
            >
              <span>{t('menu.mediaCenter', 'Media Center')}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  activeDropdown === 'media' ? 'rotate-180 text-[#39AEB2]' : 'text-gray-400'
                }`}
              />
            </button>

            {activeDropdown === 'media' && (
              <div
                className="absolute top-full left-0 w-64 bg-[#141618] border border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onNavigate('/news');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.news', 'News')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Global press releases & launches</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/moments');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.moments', 'Moments')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Expeditions, events & awards</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/jma');
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col text-left px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#39AEB2]">
                      {t('menu.jma', 'JMA')}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">JETOUR Masters & Ambassadors</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us */}
          <button
            id="nav-contact-btn"
            onClick={() => {
              onNavigate('/contactus');
              setActiveDropdown(null);
            }}
            className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
              currentRoute === '/contactus' ? 'text-[#39AEB2]' : 'hover:text-[#39AEB2]'
            }`}
          >
            {t('common.contact', 'Contact Us')}
          </button>

          {/* Global Network */}
          <button
            id="nav-network-btn"
            onClick={() => {
              onNavigate('/globalnetwork');
              setActiveDropdown(null);
            }}
            className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
              currentRoute === '/globalnetwork' ? 'text-[#39AEB2]' : 'hover:text-[#39AEB2]'
            }`}
          >
            {t('common.globalNetwork', 'Global Network')}
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Trigger */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Search models, news and technology"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="header-lang-btn"
              onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-white/10 text-xs font-medium tracking-wider text-gray-300 hover:text-white transition-colors uppercase"
              aria-label="Language"
            >
              <Globe size={15} />
              <span>{locale}</span>
            </button>

            {activeDropdown === 'lang' && (
              <div
                className="absolute right-0 top-full mt-2 w-36 bg-[#181a1c] border border-white/10 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl animate-in fade-in duration-150 z-50"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {[
                  { code: 'en' as Locale, label: 'English' },
                  { code: 'es' as Locale, label: 'Español' },
                  { code: 'ar' as Locale, label: 'العربية' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLocale(item.code);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      locale === item.code
                        ? 'bg-[#39AEB2] text-black font-bold'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Test Drive CTA */}
          <button
            id="header-test-drive-btn"
            onClick={() => onOpenTestDrive()}
            className="hidden sm:inline-flex items-center gap-2 bg-[#39AEB2] hover:bg-[#2e9498] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          >
            <span>Test Drive</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-[#101112] text-white p-6 overflow-y-auto border-t border-white/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider mb-3">
                Vehicle Models
              </p>
              <div className="grid grid-cols-2 gap-3">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onNavigate(`/${v.id}` as PageRoute);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left"
                  >
                    <img
                      src={v.heroImage}
                      alt={v.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-8 object-contain"
                    />
                    <div>
                      <span className="text-xs font-bold block">{v.name}</span>
                      <span className="text-[10px] text-gray-400 block">{v.badge}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <p className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider mb-2">Explore</p>
              <button
                onClick={() => {
                  onNavigate('/brand');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Travel+ Philosophy & Brand
              </button>
              <button
                onClick={() => {
                  onNavigate('/technology');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Technology (Kunpeng C-DM & XWD)
              </button>
              <button
                onClick={() => {
                  onNavigate('/jetourlife');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                JETOUR Life
              </button>
              <button
                onClick={() => {
                  onNavigate('/ourjourney');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Our Journey & Milestones
              </button>
              <button
                onClick={() => {
                  onNavigate('/news');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                News & Press
              </button>
              <button
                onClick={() => {
                  onNavigate('/moments');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Moments & Expeditions
              </button>
              <button
                onClick={() => {
                  onNavigate('/globalnetwork');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Global Dealer Network
              </button>
              <button
                onClick={() => {
                  onNavigate('/contactus');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-gray-200 hover:text-[#39AEB2]"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full bg-[#39AEB2] text-black font-bold py-3 rounded-xl text-center"
            >
              Book a Test Drive
            </button>
            <div className="flex justify-center gap-4 text-xs text-gray-400">
              <button onClick={() => setLocale('en')} className={locale === 'en' ? 'text-[#39AEB2]' : ''}>English</button>
              <span>•</span>
              <button onClick={() => setLocale('es')} className={locale === 'es' ? 'text-[#39AEB2]' : ''}>Español</button>
              <span>•</span>
              <button onClick={() => setLocale('ar')} className={locale === 'ar' ? 'text-[#39AEB2]' : ''}>العربية</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
