import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/content';
import { Calendar, ArrowRight, X } from 'lucide-react';
import type { NewsArticle, PageRoute } from '../types';

interface NewsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Global Launch', 'Press Release', 'Event', 'Brand Story'];

  const filteredNews = NEWS_ARTICLES.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  return (
    <div id="news-page" className="min-h-screen bg-[#101112] text-white pt-16 md:pt-20">
      {/* Banner */}
      <section className="py-16 md:py-24 px-6 md:px-20 bg-radial from-[#1e2327] to-[#101112] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#39AEB2] font-goldman">
            Media Center
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-goldman tracking-tight text-white">
            NEWS & RELEASES
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Official announcements, motor show appearances, global launch events, and strategic updates from JETOUR.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-6 md:px-16 max-w-6xl mx-auto space-y-8">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#39AEB2] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#39AEB2]/60 transition-all flex flex-col"
            >
              <div className="h-52 overflow-hidden relative">
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

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <Calendar size={13} />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#39AEB2] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white">
                  <span className="font-semibold">Read Full Release</span>
                  <ArrowRight size={14} className="text-[#39AEB2]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-3xl bg-[#141618] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-64 w-full flex-shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-black/40" />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 p-2 rounded-full text-white"
                aria-label="Close article"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="bg-[#39AEB2] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-gray-300 ml-3">{activeArticle.date}</span>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold font-goldman text-white">
                {activeArticle.title}
              </h2>

              <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Official JETOUR Global Media Release</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
