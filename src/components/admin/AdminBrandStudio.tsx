import React from 'react';
import {
  Palette,
  Sparkles,
  RotateCcw,
  Download,
  CheckCircle2,
  Sun,
  Moon,
  Sliders,
  Type,
  Square,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { THEME_PRESETS } from '../../theme/defaultTheme';
import { ColorTokens, PresetId } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';

export const AdminBrandStudio: React.FC = () => {
  const {
    theme,
    brand,
    setBrand,
    updateColors,
    updateGlass,
    updateLayout,
    updateTypography,
    applyPreset,
    resetTheme,
    toggleDarkMode,
  } = useTheme();

  const { showToast } = usePortfolio();

  const presetLabels: Record<string, { name: string; description: string; badge: string }> = {
    'electric-lime': {
      name: 'Electric Lime',
      description: 'High-energy cyberpunk neo-brutalism with intense acid lime (#A3E635) accents.',
      badge: 'Brutalist Hero',
    },
    'electric-violet': {
      name: 'Electric Violet',
      description: 'Vivid neon purple & magenta on deep cinema black canvas.',
      badge: 'VFX / Sci-Fi',
    },
    'cyber-blue': {
      name: 'Cyber Cyan',
      description: 'Hyper-saturated cyan highlights with crisp brutalist borders.',
      badge: 'Tech / Motion',
    },
    'hot-magenta': {
      name: 'Hot Magenta',
      description: 'Bold fluorescent pink & crimson accents for fashion & music videos.',
      badge: 'Music / Fashion',
    },
    'solar-orange': {
      name: 'Solar Orange',
      description: 'Warm high-impact ember orange for action trailers and sports films.',
      badge: 'Action / Film',
    },
    'cinematic-gold': {
      name: 'Cinematic Amber',
      description: 'Golden hour luxury palette crafted for narrative cinema & commercials.',
      badge: 'Commercial',
    },
    monochrome: {
      name: 'Pure Monochrome',
      description: 'Stark white-on-black brutalist grid with hard offset shadows.',
      badge: 'Editorial',
    },
    cinematic: {
      name: 'Cinematic Classic',
      description: 'Warm amber glow on deep charcoal canvas.',
      badge: 'Classic',
    },
    minimal: {
      name: 'Minimal Nordic',
      description: 'Ultra-refined cool gray tones with airy negative space.',
      badge: 'Minimal',
    },
    luxury: {
      name: 'Editorial Luxury',
      description: 'Champagne gold with high-contrast editorial typography.',
      badge: 'Luxury',
    },
    'modern-creative': {
      name: 'Modern Creative',
      description: 'Vibrant neon emerald punch on midnight graphite canvas.',
      badge: 'Agency',
    },
    'tech-creative': {
      name: 'Tech Monospace',
      description: 'Cyber cyan and electric violet for modern VFX & tech storytellers.',
      badge: 'Tech',
    },
  };

  const colorFields: Array<{
    key: keyof ColorTokens;
    label: string;
    description: string;
  }> = [
    {
      key: 'primary',
      label: 'Primary Accent Color',
      description: 'Used for play buttons, glowing highlights, and active elements',
    },
    {
      key: 'secondary',
      label: 'Secondary Accent',
      description: 'Used for subtitles, borders, and badges',
    },
    {
      key: 'background',
      label: 'Canvas Background',
      description: 'Deep cinema canvas backdrop',
    },
    {
      key: 'surface',
      label: 'Card / Glass Surface',
      description: 'Background for frosted containers and project cards',
    },
    {
      key: 'surfaceElevated',
      label: 'Elevated Surface',
      description: 'Inputs, dropdowns, and pill tags',
    },
    {
      key: 'border',
      label: 'Border Color',
      description: 'Subtle frame lines between sections',
    },
    {
      key: 'textPrimary',
      label: 'Primary Text',
      description: 'Headlines, project titles, and high-contrast labels',
    },
    {
      key: 'button',
      label: 'Button Color',
      description: 'Action CTA buttons and focus pills',
    },
  ];

  const handleExportTokens = () => {
    const exportData = {
      theme,
      brand,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinefolio_${brand.brandName.toLowerCase().replace(/\s+/g, '_')}_theme.json`;
    a.click();
    showToast('Theme design tokens exported.');
  };

  return (
    <section className="space-y-8" id="admin-brand-studio">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
            Brand Studio & Visual Tokens
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Switch cinema presets or tune every color token, border, shadow, and glass layer in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <GlassButton
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportTokens}
          >
            Export JSON
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={resetTheme}
          >
            Reset
          </GlassButton>
        </div>
      </header>

      {/* Preset Archetypes Selector */}
      <section aria-labelledby="presets-heading" className="space-y-3">
        <h3 id="presets-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-primary)]" />
          Dark Neo-Brutalist & Cinematic Archetypes
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 list-none p-0 m-0">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => {
            const isCurrent = theme.presetId === key;
            const meta = presetLabels[key] || { name: key, description: '', badge: 'Preset' };
            return (
              <li key={key}>
                <article
                  onClick={() => applyPreset(key as PresetId)}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex flex-col justify-between gap-3 h-full ${
                    isCurrent
                      ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30 shadow-[4px_4px_0px_var(--brand-primary)] -translate-y-1'
                      : 'glass-card border-[var(--brand-border)] hover:border-white/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/50 text-[var(--brand-primary)] border border-white/10">
                        {meta.badge}
                      </span>
                      {isCurrent && (
                        <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-[var(--brand-text)] font-heading block mt-2">
                      {meta.name}
                    </span>
                    <p className="text-[11px] text-[var(--brand-text-secondary)] mt-1 line-clamp-2">
                      {meta.description}
                    </p>
                  </div>

                  {/* Color swatch circles */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--brand-border)]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shadow"
                        style={{ backgroundColor: preset.colors.primary }}
                        title="Primary"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: preset.colors.background }}
                        title="Background"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: preset.colors.surface }}
                        title="Surface"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: preset.colors.button }}
                        title="Button"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[var(--brand-text-muted)] uppercase">
                      {preset.colors.primary}
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Neo-Brutalist Layout & Structure Controls */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--brand-border)] pb-4">
          <Square className="w-5 h-5 text-[var(--brand-primary)]" />
          <h3 className="text-base font-bold font-heading text-[var(--brand-text)]">
            Neo-Brutalist Structure & Tactile Shadow Controls
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Border Thickness */}
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-3">
            <label className="block text-xs font-bold text-[var(--brand-text)] uppercase tracking-wider">
              Border Thickness: {theme.layout.borderThickness || 2}px
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map(thick => (
                <button
                  key={thick}
                  type="button"
                  onClick={() => updateLayout({ borderThickness: thick })}
                  className={`py-1.5 text-xs font-bold rounded border transition-all ${
                    (theme.layout.borderThickness || 2) === thick
                      ? 'bg-[var(--brand-primary)] text-black border-[var(--brand-primary)] shadow-[2px_2px_0px_black]'
                      : 'bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] border-[var(--brand-border)] hover:border-white/30'
                  }`}
                >
                  {thick}px
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[var(--brand-text-muted)]">
              Structural border weight across all cards, inputs, and player shells.
            </p>
          </div>

          {/* Shadow Intensity */}
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-3">
            <label className="block text-xs font-bold text-[var(--brand-text)] uppercase tracking-wider">
              Shadow Style: {theme.layout.shadowIntensity || 'brutalist'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['brutalist', 'hard', 'subtle', 'none'] as const).map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => updateLayout({ shadowIntensity: style })}
                  className={`py-1.5 text-xs font-bold rounded border capitalize transition-all ${
                    (theme.layout.shadowIntensity || 'brutalist') === style
                      ? 'bg-[var(--brand-primary)] text-black border-[var(--brand-primary)] shadow-[2px_2px_0px_black]'
                      : 'bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] border-[var(--brand-border)] hover:border-white/30'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[var(--brand-text-muted)]">
              Hard tactile offset dropshadow vs soft diffuse glow.
            </p>
          </div>

          {/* Card Corner Radius */}
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-3">
            <label className="block text-xs font-bold text-[var(--brand-text)] uppercase tracking-wider">
              Card Radius: {theme.layout.cardRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              step="2"
              value={theme.layout.cardRadius}
              onChange={e => updateLayout({ cardRadius: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/20 rounded accent-[var(--brand-primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--brand-text-muted)] font-mono">
              <span>0px (Sharp)</span>
              <span>12px</span>
              <span>24px (Pill)</span>
            </div>
          </div>

          {/* Button Corner Radius */}
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-3">
            <label className="block text-xs font-bold text-[var(--brand-text)] uppercase tracking-wider">
              Button Radius: {theme.layout.buttonRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="9999"
              step="4"
              value={theme.layout.buttonRadius > 24 ? 24 : theme.layout.buttonRadius}
              onChange={e => updateLayout({ buttonRadius: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/20 rounded accent-[var(--brand-primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--brand-text-muted)] font-mono">
              <span>0px (Box)</span>
              <span>8px (Tactile)</span>
              <span>Pill</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Glassmorphism Tuning */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--brand-border)] pb-4">
          <Layers className="w-5 h-5 text-[var(--brand-primary)]" />
          <h3 className="text-base font-bold font-heading text-[var(--brand-text)]">
            Glassmorphism Translucency & Backdrop Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[var(--brand-text)]">
              <span>Glass Blur</span>
              <span>{theme.glass.blur}px</span>
            </div>
            <input
              type="range"
              min="4"
              max="32"
              step="2"
              value={theme.glass.blur}
              onChange={e => updateGlass({ blur: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/20 rounded accent-[var(--brand-primary)]"
            />
          </div>

          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[var(--brand-text)]">
              <span>Glass Opacity</span>
              <span>{Math.round(theme.glass.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="0.95"
              step="0.05"
              value={theme.glass.opacity}
              onChange={e => updateGlass({ opacity: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-white/20 rounded accent-[var(--brand-primary)]"
            />
          </div>

          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[var(--brand-text)]">
              <span>Border Opacity</span>
              <span>{Math.round(theme.glass.borderOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.5"
              step="0.05"
              value={theme.glass.borderOpacity}
              onChange={e => updateGlass({ borderOpacity: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-white/20 rounded accent-[var(--brand-primary)]"
            />
          </div>
        </div>
      </GlassCard>

      {/* Real-time Color Palette Matrix */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--brand-border)] pb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--brand-primary)]" />
            <h3 className="text-base font-bold font-heading text-[var(--brand-text)]">
              Fine-Tune Custom Color Palette Tokens
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--brand-text-secondary)]">Mode:</span>
            <button
              onClick={() => toggleDarkMode()}
              className="px-3 py-1 rounded-lg glass-surface border border-[var(--brand-border)] text-xs text-[var(--brand-text)] flex items-center gap-1.5"
            >
              {theme.mode === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dark Canvas</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Canvas</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorFields.map(field => {
            const currentColor = theme.colors[field.key] as string;
            return (
              <div
                key={field.key}
                className="p-3.5 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[var(--brand-text)]">
                    {field.label}
                  </label>
                  <div
                    className="w-5 h-5 rounded-md border border-white/30 shadow-inner"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={e => updateColors({ [field.key]: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={currentColor}
                    onChange={e => updateColors({ [field.key]: e.target.value })}
                    className="flex-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)]"
                  />
                </div>

                <p className="text-[10px] text-[var(--brand-text-muted)] line-clamp-1">
                  {field.description}
                </p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Editor Identity Settings */}
      <form onSubmit={e => e.preventDefault()} className="space-y-6">
        <GlassCard className="p-6">
          <fieldset className="space-y-6 border-0 p-0 m-0">
            <legend className="text-base font-bold font-heading text-[var(--brand-text)] flex items-center gap-2 mb-4 p-0">
              <Sparkles className="w-5 h-5 text-[var(--brand-primary)]" />
              Editor Identity & Contact Configuration
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="brand-name-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Brand / Editor Name
                </label>
                <input
                  id="brand-name-input"
                  type="text"
                  value={brand.brandName}
                  onChange={e => setBrand({ ...brand, brandName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label htmlFor="brand-title-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Professional Title
                </label>
                <input
                  id="brand-title-input"
                  type="text"
                  value={brand.professionalTitle}
                  onChange={e => setBrand({ ...brand, professionalTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brand-tagline-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                Tagline
              </label>
              <input
                id="brand-tagline-input"
                type="text"
                value={brand.tagline}
                onChange={e => setBrand({ ...brand, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
              />
            </div>

            <div>
              <label htmlFor="brand-bio-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                Bio Narrative
              </label>
              <textarea
                id="brand-bio-input"
                rows={3}
                value={brand.bio}
                onChange={e => setBrand({ ...brand, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="brand-location-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Location
                </label>
                <input
                  id="brand-location-input"
                  type="text"
                  value={brand.location}
                  onChange={e => setBrand({ ...brand, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label htmlFor="brand-email-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Contact Email
                </label>
                <input
                  id="brand-email-input"
                  type="email"
                  value={brand.email}
                  onChange={e => setBrand({ ...brand, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label htmlFor="brand-status-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Availability Status Pill
                </label>
                <input
                  id="brand-status-input"
                  type="text"
                  value={brand.availabilityStatus}
                  onChange={e => setBrand({ ...brand, availabilityStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>
            </div>
          </fieldset>
        </GlassCard>
      </form>
    </section>
  );
};
