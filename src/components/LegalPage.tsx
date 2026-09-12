import React from 'react';
import type { PageRoute } from '../types';

interface LegalPageProps {
  type: 'privacy' | 'cookie';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div id="legal-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      <section className="py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1e2327] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Legal & Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-goldman tracking-tight text-white">
            {isPrivacy ? 'PRIVACY POLICY' : 'COOKIE POLICY'}
          </h1>
          <p className="text-xs text-gray-400">
            Last Updated: January 2025 • JETOUR Auto Global
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 max-w-4xl mx-auto space-y-8 text-sm text-gray-300 leading-relaxed">
        {isPrivacy ? (
          <>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">1. Information We Collect</h3>
              <p>
                JETOUR Auto (&quot;JETOUR&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. When you use our website, book a test drive, or contact our authorized distributors, we may collect contact details such as your name, email address, telephone number, and country of residence.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">2. Purpose of Data Processing</h3>
              <p>
                We use collected information solely to provide vehicle information, schedule authorized dealer consultations, arrange test drive appointments, and respond to your customer service inquiries.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">3. Data Sharing with Official Distributors</h3>
              <p>
                In order to fulfill your test drive requests or sales inquiries, your information may be shared securely with the authorized official JETOUR distributor in your respective territory. We do not sell personal data to third parties.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">4. Your Rights</h3>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data at any time by contacting our global data protection officer at{' '}
                <a href="mailto:service@jetourglobal.com" className="text-[#39AEB2] underline">
                  service@jetourglobal.com
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">1. What Are Cookies</h3>
              <p>
                Cookies are small text files placed on your device to enhance site navigation, remember your language preferences, and analyze site performance to deliver a smoother vehicle configurator experience.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">2. Types of Cookies We Use</h3>
              <p>
                We use strictly necessary cookies for website navigation, functional cookies to remember your selected region and language, and analytical cookies to measure site traffic.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">3. Managing Cookie Preferences</h3>
              <p>
                You can configure your browser to block or delete cookies at any time. However, disabling certain cookies may affect interactive features such as the 360° vehicle configurator.
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
