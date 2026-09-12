import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, HelpCircle } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { FAQS_DATA } from '../data/content';
import type { PageRoute } from '../types';

interface ContactUsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    vehicle: 't2',
    message: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) return;
    setSubmitted(true);
  };

  return (
    <div id="contact-us-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1d2225] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-goldman tracking-tight text-white">
            CONTACT US
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Have questions about vehicle specifications, international distribution, media inquiries, or partnerships? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-16 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#39AEB2]/20 text-[#39AEB2] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold font-goldman text-white">Message Received</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.firstName}. An official JETOUR representative from your regional team will contact you within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-[#39AEB2] text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Country / Region *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Arab Emirates"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Vehicle of Interest
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id} className="bg-[#141618] text-white">
                      {v.name} ({v.subtitle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-check"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 accent-[#39AEB2] cursor-pointer"
                  required
                />
                <label htmlFor="privacy-check" className="text-xs text-gray-400 cursor-pointer">
                  I agree that JETOUR Auto may process my personal information in accordance with the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacypolicy')}
                    className="text-[#39AEB2] hover:underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <span>Submit Inquiry</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Global HQ Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold font-goldman text-white">
              Global Headquarters
            </h3>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#39AEB2] flex-shrink-0 mt-1" size={18} />
                <div>
                  <strong className="text-white block text-sm mb-0.5">JETOUR Auto Global</strong>
                  <p className="text-gray-400 leading-relaxed">
                    Chery Automobile Co., Ltd., No. 8 Changchun Road, Economy & Technology Development Zone, Wuhu, Anhui, China
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#39AEB2] flex-shrink-0" size={18} />
                <div>
                  <span className="text-gray-400 block text-[11px]">International Inquiries</span>
                  <a href="tel:+865535848888" className="text-white hover:text-[#39AEB2] font-semibold text-sm">
                    +86 553 584 8888
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#39AEB2] flex-shrink-0" size={18} />
                <div>
                  <span className="text-gray-400 block text-[11px]">Customer & Media Contact</span>
                  <a href="mailto:service@jetourglobal.com" className="text-white hover:text-[#39AEB2] font-semibold text-sm">
                    service@jetourglobal.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#39AEB2]">
              <HelpCircle size={18} />
              <span className="text-xs font-bold uppercase tracking-wider font-goldman">Quick Answers</span>
            </div>
            <h4 className="text-lg font-bold text-white">Looking for Instant Answers?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Explore our frequently asked questions regarding vehicle specifications, warranty, and international sales.
            </p>
            <button
              onClick={() => onNavigate('/faqs')}
              className="text-xs text-[#39AEB2] hover:underline font-bold tracking-wider uppercase block pt-2"
            >
              Browse All FAQs →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
