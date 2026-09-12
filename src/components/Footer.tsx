import React from 'react';
import { JetourLogo } from '../data/icons';
import { useI18n } from '../data/i18nContext';
import type { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <footer id="main-footer" className="bg-[#0a0b0c] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Jetour Home"
            >
              <JetourLogo className="h-6 w-auto" />
            </button>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Define the Journey. JETOUR embodies the Travel+ strategy, delivering rugged off-road
              capability, intelligent super-hybrid technology, and an expansive lifestyle ecosystem
              for travelers across more than 60 countries.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-[#39AEB2] tracking-widest block mb-2">
                Travel+ Ecosystem
              </span>
              <p className="text-xs text-gray-500">
                Action is far better than hesitation. Explore untamed horizons with intelligence,
                safety, and uncompromised style.
              </p>
            </div>
          </div>

          {/* Col 2: Models */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-goldman">
              {t('menu.models', 'Models')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('/g700')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR G700
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/t2')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR T2
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/t1')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR T1
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/t1idm')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR T1 i-DM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/t2idm')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR T2 i-DM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dashing')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR DASHING
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/x70Plus')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR X70 PLUS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/x90Plus')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  JETOUR X90 PLUS
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: JETOUR World */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-goldman">
              {t('menu.JETOURWorld', 'JETOUR World')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('/brand')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.travelPlus', 'Travel+ Philosophy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/technology')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.technology', 'Technology')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/jetourlife')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.jietourLife', 'JETOUR Life')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/jetourfamily')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.jetourFamily', 'JETOUR Family')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ourjourney')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.ourJourney', 'Our Journey')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/gSeries')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  G Series Lineup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tSeries')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  T Series Lineup
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Media & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white font-goldman">
              Service & Network
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('/globalnetwork')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('common.globalNetwork', 'Global Network')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contactus')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('common.contact', 'Contact Us')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/news')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.news', 'News')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/moments')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.moments', 'Moments')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/jma')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  {t('menu.jma', 'JMA')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faqs')}
                  className="hover:text-[#39AEB2] transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Socials and Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-6">
            <p>© 2026 JETOUR AUTO. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('/privacypolicy')}
                className="hover:text-gray-200 transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('/cookie')}
                className="hover:text-gray-200 transition-colors"
              >
                Cookie Policy
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('/contactus')}
                className="hover:text-gray-200 transition-colors"
              >
                Legal Notice
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://www.facebook.com/jetourglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39AEB2] transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/jetour_global"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39AEB2] transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@JETOURGlobal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39AEB2] transition-colors"
              aria-label="YouTube"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@jetour_global"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39AEB2] transition-colors"
              aria-label="TikTok"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com/company/jetour-international"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39AEB2] transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
