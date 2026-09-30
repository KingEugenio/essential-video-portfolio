import React from 'react';
import { Type, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';

export const AdminTypography: React.FC = () => {
  const { theme, updateTypography } = useTheme();

  const headingFonts = [
    { name: 'Bebas Neue', sample: 'CINEMATIC & BOLD', category: 'Display Sans' },
    { name: 'Cormorant Garamond', sample: 'Luxury & Narrative', category: 'Editorial Serif' },
    { name: 'Syne', sample: 'MODERN CREATIVE', category: 'Geometric Sans' },
    { name: 'Clash Display', sample: 'HIGH IMPACT', category: 'Neo Grotesk' },
    { name: 'Space Grotesk', sample: 'TECH & FUTURE', category: 'Monospace Vibe' },
    { name: 'Montserrat', sample: 'COMMERCIAL CLEAN', category: 'Clean Sans' },
    { name: 'Inter', sample: 'Minimal Product', category: 'Workhorse' },
  ];

  const bodyFonts = [
    { name: 'Inter', sample: 'Clean, neutral readability optimized for UI.' },
    { name: 'Plus Jakarta Sans', sample: 'Refined modern geometric typography.' },
    { name: 'Outfit', sample: 'Warm, humanistic curves and approachable clarity.' },
    { name: 'DM Sans', sample: 'Geometric precision for contemporary studios.' },
  ];

  return (
    <section className="space-y-8" id="admin-typography">
      <header>
        <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
          Typography Studio & Font Pairings
        </h2>
        <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
          Select heading and body typefaces to shift your portfolio from Hollywood blockbuster to high-fashion luxury.
        </p>
      </header>

      {/* Heading Fonts Grid */}
      <section aria-labelledby="heading-fonts-heading" className="space-y-3">
        <h3 id="heading-fonts-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-2">
          <Type className="w-4 h-4 text-[var(--brand-primary)]" />
          Primary Heading Display Font
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {headingFonts.map(f => {
            const isSelected = theme.typography.headingFont === f.name;
            return (
              <li key={f.name}>
                <article
                  onClick={() => updateTypography({ headingFont: f.name })}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between gap-4 h-full ${
                    isSelected
                      ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20 shadow-xl'
                      : 'glass-card border-[var(--brand-border)] hover:border-white/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--brand-text-muted)] mb-1">
                      <span>{f.category}</span>
                      {isSelected && (
                        <span className="font-bold text-[var(--brand-primary)]">Active</span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[var(--brand-text)]">
                      {f.name}
                    </h4>
                  </div>

                  <div
                    className="text-2xl text-[var(--brand-primary)] font-bold truncate"
                    style={{ fontFamily: f.name }}
                  >
                    {f.sample}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Body Fonts Grid */}
      <section aria-labelledby="body-fonts-heading" className="space-y-3">
        <h3 id="body-fonts-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-2">
          <Type className="w-4 h-4 text-[var(--brand-primary)]" />
          Body & UI Font
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {bodyFonts.map(bf => {
            const isSelected = theme.typography.bodyFont === bf.name;
            return (
              <li key={bf.name}>
                <article
                  onClick={() => updateTypography({ bodyFont: bf.name })}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between gap-3 h-full ${
                    isSelected
                      ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20 shadow-xl'
                      : 'glass-card border-[var(--brand-border)] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-[var(--brand-text)]">
                      {bf.name}
                    </h4>
                    {isSelected && (
                      <span className="text-xs font-bold text-[var(--brand-primary)]">Selected</span>
                    )}
                  </div>

                  <p
                    className="text-sm text-[var(--brand-text-secondary)] leading-relaxed"
                    style={{ fontFamily: bf.name }}
                  >
                    {bf.sample}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Live Typography Preview Card */}
      <aside aria-label="Live Typography Preview">
        <GlassCard className="p-6 sm:p-8 space-y-4">
          <header className="flex items-center justify-between border-b border-[var(--brand-border)] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)]">
              Live Rendering Hierarchy Preview
            </span>
            <span className="text-xs text-[var(--brand-primary)] font-mono">
              {theme.typography.headingFont} + {theme.typography.bodyFont}
            </span>
          </header>

          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)] block">
              FEATURE FILM & COMMERCIAL POST-PRODUCTION
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
              PRECISION PACING. EMOTIONAL IMPACT.
            </h3>
            <p className="text-base text-[var(--brand-text-secondary)] max-w-2xl leading-relaxed">
              Every cut is a decision about rhythm, perspective, and subtext. Seamlessly guiding viewers through narrative tension and brand storytelling.
            </p>
          </div>
        </GlassCard>
      </aside>
    </section>
  );
};
