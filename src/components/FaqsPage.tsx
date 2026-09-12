import React, { useState } from 'react';
import { FAQS_DATA } from '../data/content';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import type { PageRoute } from '../types';

interface FaqsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faqs-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1e2327] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Customer Support
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-goldman tracking-tight text-white">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Find immediate answers regarding JETOUR vehicles, hybrid technologies, global warranty, and authorized dealerships.
          </p>
        </div>
      </section>

      {/* Accordion FAQ list */}
      <section className="py-16 px-6 md:px-16 max-w-4xl mx-auto space-y-4">
        {FAQS_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-[#39AEB2] flex-shrink-0" />
                  <span className="text-base font-bold text-white">{item.q}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#39AEB2]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm text-gray-300 leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8 text-center space-y-3">
          <p className="text-sm text-gray-400">Still have questions?</p>
          <button
            onClick={() => onNavigate('/contactus')}
            className="bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <span>Contact Our Team</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
