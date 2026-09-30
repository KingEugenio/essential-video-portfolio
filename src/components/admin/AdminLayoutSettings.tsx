import React from 'react';
import { Layout, Sliders, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';

export const AdminLayoutSettings: React.FC = () => {
  const { theme, updateLayout, updateGlass } = useTheme();

  const heroLayouts = [
    {
      id: 'type-video',
      title: 'Typography & Video Stage',
      desc: 'Bold display typography header with large cinematic video player stage below.',
    },
    {
      id: 'fullscreen-showreel',
      title: 'Fullscreen Showreel',
      desc: 'Full-bleed immersive background video with frosted glass hero overlay.',
    },
    {
      id: 'split-profile',
      title: 'Split Profile & Showreel',
      desc: 'Side-by-side layout pairing editor portrait with video player and stats.',
    },
    {
      id: 'minimal-editorial',
      title: 'Minimal Editorial',
      desc: 'Ultra-clean typography list, refined spacing, and subtle film markers.',
    },
  ];

  const cardStyles = [
    {
      id: 'large-feature',
      title: 'Large Feature Cards',
      desc: 'Big cinematic cards with duration badge, client tag, and play button overlay.',
    },
    {
      id: 'grid',
      title: '3-Column Responsive Grid',
      desc: 'Classic responsive gallery grid with crisp metadata.',
    },
    {
      id: 'editorial',
      title: 'Editorial Wide List',
      desc: 'Widescreen thumbnail paired side-by-side with story brief and software stack.',
    },
    {
      id: 'masonry',
      title: 'Dynamic Masonry',
      desc: 'Staggered card layout accommodating mixed aspect ratios.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
          Layout & Glassmorphic Surface Engine
        </h2>
        <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
          Configure website layout structure, hero header variants, card architectures, and frosted glass intensity.
        </p>
      </div>

      {/* Hero Layout Selector */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-2">
          <Layout className="w-4 h-4 text-[var(--brand-primary)]" />
          Hero Presentation Style
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {heroLayouts.map(layout => {
            const isSelected = theme.layout.heroLayout === layout.id;
            return (
              <div
                key={layout.id}
                onClick={() => updateLayout({ heroLayout: layout.id as any })}
                className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20 shadow-xl'
                    : 'glass-card border-[var(--brand-border)] hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold font-heading text-[var(--brand-text)]">
                    {layout.title}
                  </h4>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                  {layout.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Card Architecture */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--brand-primary)]" />
          Portfolio Project Card Architecture
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardStyles.map(card => {
            const isSelected = theme.layout.portfolioCardStyle === card.id;
            return (
              <div
                key={card.id}
                onClick={() => updateLayout({ portfolioCardStyle: card.id as any })}
                className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20 shadow-xl'
                    : 'glass-card border-[var(--brand-border)] hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold font-heading text-[var(--brand-text)]">
                    {card.title}
                  </h4>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphism Tuning */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--brand-border)] pb-4">
          <Sliders className="w-5 h-5 text-[var(--brand-primary)]" />
          <h3 className="text-base font-bold font-heading text-[var(--brand-text)]">
            Glassmorphic Optical Parameters
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-[var(--brand-text)] mb-2">
              Backdrop Blur Intensity: {theme.glass.blur}px
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[8, 16, 24].map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateGlass({ blur: b })}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                    theme.glass.blur === b
                      ? 'bg-[var(--brand-primary)] text-black font-bold border-transparent'
                      : 'glass-surface text-[var(--brand-text)] border-[var(--brand-border)]'
                  }`}
                >
                  {b}px
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--brand-text)] mb-2">
              Card Corner Radius: {theme.layout.cardRadius}px
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[8, 16, 24].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateLayout({ cardRadius: r })}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                    theme.layout.cardRadius === r
                      ? 'bg-[var(--brand-primary)] text-black font-bold border-transparent'
                      : 'glass-surface text-[var(--brand-text)] border-[var(--brand-border)]'
                  }`}
                >
                  {r}px
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--brand-text)] mb-2">
              Button Corner Radius: {theme.layout.buttonRadius === 9999 ? 'Pill' : `${theme.layout.buttonRadius}px`}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[6, 12, 9999].map(br => (
                <button
                  key={br}
                  type="button"
                  onClick={() => updateLayout({ buttonRadius: br })}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                    theme.layout.buttonRadius === br
                      ? 'bg-[var(--brand-primary)] text-black font-bold border-transparent'
                      : 'glass-surface text-[var(--brand-text)] border-[var(--brand-border)]'
                  }`}
                >
                  {br === 9999 ? 'Pill' : `${br}px`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
