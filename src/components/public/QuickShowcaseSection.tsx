import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { Play, Sparkles, Film, Smartphone, Sliders, ExternalLink } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';

export const QuickShowcaseSection: React.FC = () => {
  const { projects, setSelectedProjectSlug } = usePortfolio();
  const { theme } = useTheme();
  const [filter, setFilter] = useState<'all' | 'vertical' | 'cinematic' | 'color'>('all');

  const isVisible = theme?.layout?.visibleSections?.showcase !== false;
  if (!isVisible) return null;

  // Filter projects by category/format
  const showcaseItems = projects.filter((p) => {
    if (filter === 'vertical') return p.category.toLowerCase().includes('social') || p.category.toLowerCase().includes('youtube');
    if (filter === 'cinematic') return p.category.toLowerCase().includes('commercial') || p.category.toLowerCase().includes('documentary');
    if (filter === 'color') return p.category.toLowerCase().includes('color');
    return true;
  }).slice(0, 6);

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-text)]">
            QUICK REEL & MEDIA VAULT
          </h2>
          <p className="text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mt-2">
            Instant preview of high-retention social cuts, 4K broadcast commercials, and DaVinci Resolve color passes.
          </p>
        </div>

        {/* Filter Pills */}
        <nav aria-label="Format Filters" className="flex flex-wrap items-center gap-2">
          <ul className="flex flex-wrap items-center gap-2 list-none p-0 m-0">
            <li>
              <button
                id="showcase-all"
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[var(--brand-primary)] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Formats
              </button>
            </li>
            <li>
              <button
                id="showcase-cinematic"
                type="button"
                onClick={() => setFilter('cinematic')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'cinematic'
                    ? 'bg-[var(--brand-primary)] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" />
                Cinematic & 16:9
              </button>
            </li>
            <li>
              <button
                id="showcase-vertical"
                type="button"
                onClick={() => setFilter('vertical')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'vertical'
                    ? 'bg-[var(--brand-primary)] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                Vertical & Shorts
              </button>
            </li>
            <li>
              <button
                id="showcase-color"
                type="button"
                onClick={() => setFilter('color')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'color'
                    ? 'bg-[var(--brand-primary)] text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                Color Grading
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcaseItems.map((item) => {
          return (
            <article
              key={item.id}
              id={`showcase-item-${item.id}`}
              className="glass-card group overflow-hidden rounded-2xl border border-white/10 hover:border-[var(--brand-primary)]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <figure className="relative aspect-video overflow-hidden bg-black/40 m-0">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Play Button Overlay */}
                <button
                  id={`play-showcase-${item.id}`}
                  type="button"
                  onClick={() => setSelectedProjectSlug(item.slug)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 duration-200 cursor-pointer"
                  aria-label={`Play ${item.title}`}
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-black/70 text-white/80 backdrop-blur-md">
                    <time dateTime={String(item.year)}>{item.year}</time>
                  </span>
                </div>
              </figure>

              {/* Card Meta */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    Client: <span className="text-white/80">{item.client}</span>
                  </p>
                </div>
                <button
                  id={`view-showcase-btn-${item.id}`}
                  type="button"
                  onClick={() => setSelectedProjectSlug(item.slug)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="View Case Study"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
