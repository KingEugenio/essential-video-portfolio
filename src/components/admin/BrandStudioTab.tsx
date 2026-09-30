import React, { useState, useRef } from 'react';
import { 
  Palette, Type, Sliders, Eye, Save, 
  RotateCcw, HardDrive, Film, Check, Radio, Monitor,
  Image, Lock, Upload, Trash2, ShieldCheck, FileText
} from 'lucide-react';
import { BrandSettings, WindowStyle, PortfolioLayout, VideoItem } from '../../types';
import { THEME_PRESETS, ThemePresetDefinition } from '../../themes/themeEngine';
import { RetroWindow } from '../effects/RetroWindow';

interface BrandStudioTabProps {
  brand: BrandSettings;
  onSaveBrand: (brand: BrandSettings) => void;
  onOpenDriveForShowreel: (callback: (video: VideoItem) => void) => void;
}

export const BrandStudioTab: React.FC<BrandStudioTabProps> = ({
  brand,
  onSaveBrand,
  onOpenDriveForShowreel,
}) => {
  const [form, setForm] = useState<BrandSettings>({ ...brand });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, SVG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((prev) => ({ ...prev, logoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const fontOptions = [
    { label: 'BD Gravel (Kinetic Brutalist / High-Impact Video Display)', value: "'BD Gravel', 'Unbounded', 'Syne', sans-serif" },
    { label: 'Unbounded (Ultra-Heavy Wide Display)', value: "'Unbounded', 'Syne', sans-serif" },
    { label: 'Syne (Modern Kinetic / Hyper-Creative)', value: "'Syne', sans-serif" },
    { label: 'Chakra Petch (Cyber Editorial / Sci-Fi Studio)', value: "'Chakra Petch', sans-serif" },
    { label: 'Space Grotesk (Tech / Retro Digital)', value: "'Space Grotesk', monospace" },
    { label: 'Plus Jakarta Sans (Ultra Clean Precision)', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Cinzel Decorative (Cinematic Film / Editorial)', value: "'Cinzel Decorative', 'Cinzel', serif" },
    { label: 'Playfair Display (Luxury / Film Heritage)', value: "'Playfair Display', serif" },
  ];

  const bodyFontOptions = [
    { label: 'Plus Jakarta Sans (Clean Modern Editorial)', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Inter (Technical High-Legibility)', value: "'Inter', sans-serif" },
    { label: 'Space Grotesk (Neo-Grotesque UI)', value: "'Space Grotesk', monospace" },
  ];

  const colorPresets = [
    { name: 'Cyber Film (Default)', primary: '#ff3b00', secondary: '#00e5ff', bg: '#080808' },
    { name: 'Neon Acid Matrix', primary: '#22c55e', secondary: '#06b6d4', bg: '#050a05' },
    { name: 'VHS Ultraviolet', primary: '#a855f7', secondary: '#ec4899', bg: '#0b0813' },
    { name: 'Golden 35mm Amber', primary: '#f59e0b', secondary: '#38bdf8', bg: '#0c0a07' },
    { name: 'Monochrome Cinema', primary: '#ffffff', secondary: '#a1a1aa', bg: '#000000' },
  ];

  const handleApplyColors = (primary: string, secondary: string, bg: string) => {
    setForm((prev) => ({
      ...prev,
      primaryColor: primary,
      secondaryColor: secondary,
      backgroundColor: bg,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBrand(form);

    // Apply CSS variables dynamically to the document root immediately
    document.documentElement.style.setProperty('--brand-primary', form.primaryColor);
    document.documentElement.style.setProperty('--brand-secondary', form.secondaryColor);
    document.documentElement.style.setProperty('--bg-base', form.backgroundColor);
    document.documentElement.style.setProperty('--surface-base', form.surfaceColor);
    document.documentElement.style.setProperty('--font-heading', form.fontHeading);
    document.documentElement.style.setProperty('--font-body', form.fontBody);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            BRAND STUDIO &amp; DESIGN SYSTEM
          </h2>
          <p className="font-mono text-xs text-white/50">
            Customize typography, color tokens, retro textures, and window aesthetics with live CSS injection.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-[#ff3b00] hover:bg-[#ff5500] text-white rounded font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'BRAND STYLES DEPLOYED!' : 'SAVE & APPLY CHANGES'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Left Column: Brand Identity & Colors */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* 1. Logo & Visual Identity Studio */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold text-white uppercase text-sm">
                <Image className="w-4 h-4 text-[#ff3b00]" />
                <span>LOGO &amp; BRAND EMBLEM</span>
              </div>
              <span className="font-mono text-[10px] text-white/40 uppercase">SVG / PNG / MONOGRAM</span>
            </div>

            {/* Logo Image URL & Upload */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="logo-url-input" className="text-white/70 uppercase">LOGO IMAGE (URL OR UPLOAD)</label>
                {form.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, logoUrl: '' })}
                    className="text-red-400 hover:text-red-300 text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Logo</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="logo-url-input"
                  type="text"
                  placeholder="https://example.com/logo.png or upload below"
                  value={form.logoUrl || ''}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  className="flex-1 bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
                <input
                  type="file"
                  ref={logoFileInputRef}
                  onChange={handleLogoFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoFileInputRef.current?.click()}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-white/10"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>
              <p className="text-[10px] text-white/40 mt-1">
                Upload a transparent PNG, SVG, or paste an external image URL. Renders in the navbar and footer.
              </p>
            </div>

            {/* Fallback Monogram */}
            <div>
              <label htmlFor="logo-monogram-input" className="block text-white/70 uppercase mb-1">
                FALLBACK MONOGRAM INITIALS (2-3 LETTERS)
              </label>
              <input
                id="logo-monogram-input"
                type="text"
                maxLength={4}
                placeholder="EP"
                value={form.logoMonogram || ''}
                onChange={(e) => setForm({ ...form, logoMonogram: e.target.value.toUpperCase() })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white font-mono uppercase focus:border-[#ff3b00]"
              />
              <p className="text-[10px] text-white/40 mt-1">
                Used if no logo image is set or if image fails to load.
              </p>
            </div>

            {/* Logo Preview Box */}
            <div className="p-3 bg-black/80 rounded border border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-white/50 block font-mono">LOGO PREVIEW:</span>
                <span className="text-xs text-white/80">Shown across Navbar &amp; Public Footer</span>
              </div>
              <div className="flex items-center gap-3 bg-[#121216] px-4 py-2 rounded border border-white/10">
                {form.logoUrl ? (
                  <img
                    src={form.logoUrl}
                    alt="Brand Logo Preview"
                    className="h-8 max-w-[130px] object-contain rounded"
                    onError={() => {}}
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-[#ff3b00] flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_12px_rgba(255,59,0,0.5)]">
                    {form.logoMonogram || form.brandName?.slice(0, 2).toUpperCase() || 'EP'}
                  </div>
                )}
                <span className="font-heading font-bold text-white text-sm">
                  {form.brandName || 'BRAND'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Identity & Comprehensive Copywriting Section */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-white uppercase pb-2 border-b border-white/10 text-sm">
              <FileText className="w-4 h-4 text-[#ff3b00]" />
              <span>COPYWRITING &amp; SECTION HEADLINES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">BRAND / CREATOR NAME</label>
                <input
                  type="text"
                  value={form.brandName}
                  onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">PROFESSIONAL TITLE / ROLE</label>
                <input
                  type="text"
                  value={form.professionalTitle}
                  onChange={(e) => setForm({ ...form, professionalTitle: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">HERO MAIN HEADLINE</label>
              <input
                type="text"
                value={form.heroHeadline}
                onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
              />
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">HERO SUBHEADLINE</label>
              <textarea
                rows={2}
                value={form.heroSubheadline}
                onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">HERO PRIMARY CTA</label>
                <input
                  type="text"
                  placeholder="EXPLORE ARCHIVE"
                  value={form.heroCtaPrimary || ''}
                  onChange={(e) => setForm({ ...form, heroCtaPrimary: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">HERO SECONDARY CTA</label>
                <input
                  type="text"
                  placeholder="DIRECT DISPATCH"
                  value={form.heroCtaSecondary || ''}
                  onChange={(e) => setForm({ ...form, heroCtaSecondary: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-col gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">ARCHIVE SECTION HEADING</label>
                <input
                  type="text"
                  placeholder="SELECTED ARCHIVE"
                  value={form.archiveHeading || ''}
                  onChange={(e) => setForm({ ...form, archiveHeading: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">ARCHIVE SECTION SUBHEADING</label>
                <input
                  type="text"
                  placeholder="COMMERCIALS, MUSIC VIDEOS & CINEMATIC NARRATIVES"
                  value={form.archiveSubheading || ''}
                  onChange={(e) => setForm({ ...form, archiveSubheading: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-col gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">ABOUT SECTION MANIFESTO HEADLINE</label>
                <input
                  type="text"
                  placeholder="CINEMATIC CRAFT & TEMPORAL ARCHITECTURE"
                  value={form.aboutManifestoHeadline || ''}
                  onChange={(e) => setForm({ ...form, aboutManifestoHeadline: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">OPERATOR BIO &amp; MANIFESTO</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white focus:border-[#ff3b00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">LOCATION / BASE</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white/70 uppercase mb-1">YEARS EXPERIENCE</label>
                <input
                  type="text"
                  value={form.yearsExperience}
                  onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Hardcoded System Attribution (Locked & Protected) */}
          <div className="bg-[#101014] border border-emerald-500/20 rounded-lg p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold text-white uppercase text-sm">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>SYSTEM ATTRIBUTION</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                HARDCODED / IMMUTABLE
              </span>
            </div>

            <div className="bg-[#0b0b0e] p-3.5 rounded border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-white text-sm tracking-wider">
                    BUILT BY EKO PIXELS
                  </div>
                  <div className="text-[10px] text-white/50 font-mono">
                    Protected Attribution • https://ekopixels.com
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30">
                PROTECTED
              </span>
            </div>

            <p className="text-[10px] text-white/50 leading-relaxed font-mono">
              The &ldquo;BUILT BY EKO PIXELS&rdquo; attribution is hardcoded into the backend schema and public footer architecture. It cannot be altered, bypassed, or removed by any admin command or API payload.
            </p>
          </div>

          {/* Master Theme Presets */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>COMPLETE THEME ARCHETYPES</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {THEME_PRESETS.map((pDef) => {
                const isSelected = form.templatePreset === pDef.id ||
                  (form.primaryColor === pDef.brandDefaults.primaryColor &&
                   form.backgroundColor === pDef.brandDefaults.backgroundColor);

                return (
                  <button
                    key={pDef.id}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        ...pDef.brandDefaults,
                      }));
                    }}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#1e1e28] border-[#ff3b00] shadow-[0_0_15px_rgba(255,59,0,0.2)]'
                        : 'bg-[#181820] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{pDef.name}</div>
                      <div className="text-[10px] text-white/50 leading-tight mt-0.5 line-clamp-2">
                        {pDef.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pDef.previewColor }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pDef.secondaryPreviewColor }} />
                      <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: pDef.brandDefaults.backgroundColor || '#000' }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Tokens Studio */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-[#00e5ff]" />
                <span>COLOR TOKENS &amp; PALETTES</span>
              </span>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-white/60 mb-1.5 uppercase text-[10px]">1-CLICK PALETTE PRESETS:</label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleApplyColors(preset.primary, preset.secondary, preset.bg)}
                    className="px-2.5 py-1 rounded bg-[#1c1c22] hover:bg-[#282832] border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <span className="text-[10px] text-white/80">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">PRIMARY ACCENT</label>
                <div className="flex items-center gap-2 bg-[#1c1c22] border border-white/15 rounded p-1.5">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="bg-transparent text-white w-20 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">SECONDARY ACCENT</label>
                <div className="flex items-center gap-2 bg-[#1c1c22] border border-white/15 rounded p-1.5">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="bg-transparent text-white w-20 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">BACKGROUND COLOR</label>
                <div className="flex items-center gap-2 bg-[#1c1c22] border border-white/15 rounded p-1.5">
                  <input
                    type="color"
                    value={form.backgroundColor}
                    onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={form.backgroundColor}
                    onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })}
                    className="bg-transparent text-white w-20 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">SURFACE / CARD COLOR</label>
                <div className="flex items-center gap-2 bg-[#1c1c22] border border-white/15 rounded p-1.5">
                  <input
                    type="color"
                    value={form.surfaceColor}
                    onChange={(e) => setForm({ ...form, surfaceColor: e.target.value })}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={form.surfaceColor}
                    onChange={(e) => setForm({ ...form, surfaceColor: e.target.value })}
                    className="bg-transparent text-white w-20 focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Typography, Retro Effects & Window Styles */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Typography Studio */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-white uppercase pb-2 border-b border-white/10 text-sm">
              <Type className="w-4 h-4 text-purple-400" />
              <span>TYPOGRAPHY STUDIO</span>
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">PRIMARY HEADING FONT</label>
              <select
                value={form.fontHeading}
                onChange={(e) => setForm({ ...form, fontHeading: e.target.value })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
              >
                {fontOptions.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 uppercase mb-1">BODY &amp; UI FONT</label>
              <select
                value={form.fontBody}
                onChange={(e) => setForm({ ...form, fontBody: e.target.value })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
              >
                {bodyFontOptions.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Typography Live Preview */}
            <div className="p-3 bg-black rounded border border-white/10 mt-1">
              <div
                className="text-lg font-bold text-white"
                style={{ fontFamily: form.fontHeading }}
              >
                {form.brandName} // SAMPLE HEADLINE
              </div>
              <p
                className="text-xs text-white/60 mt-1"
                style={{ fontFamily: form.fontBody }}
              >
                Precision editing, color science, and rhythm engineered for cinematic screens.
              </p>
            </div>
          </div>

          {/* Retro Effects & Textures Studio */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-white uppercase pb-2 border-b border-white/10 text-sm">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>RETRO DIGITAL SURREALISM TEXTURE ENGINE</span>
            </div>

            <div className="space-y-3">
              {/* Film Grain */}
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1c22] border border-white/5">
                <div>
                  <div className="text-white font-semibold">Canvas 35mm Film Grain</div>
                  <div className="text-[10px] text-white/40">Dynamic procedural cinematic grain texture</div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={form.grainIntensity}
                    onChange={(e) => setForm({ ...form, grainIntensity: e.target.value as any })}
                    disabled={!form.grainEnabled}
                    className="bg-[#121216] border border-white/10 rounded px-2 py-1 text-white text-[10px]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="checkbox"
                    checked={form.grainEnabled}
                    onChange={(e) => setForm({ ...form, grainEnabled: e.target.checked })}
                    className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
                  />
                </div>
              </div>

              {/* CRT Scanlines */}
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1c22] border border-white/5">
                <div>
                  <div className="text-white font-semibold">CRT Scanlines &amp; Grid</div>
                  <div className="text-[10px] text-white/40">Retro raster monitor horizontal lines</div>
                </div>
                <input
                  type="checkbox"
                  checked={form.scanlinesEnabled}
                  onChange={(e) => setForm({ ...form, scanlinesEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
                />
              </div>

              {/* CRT Phosphor Glow */}
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1c22] border border-white/5">
                <div>
                  <div className="text-white font-semibold">CRT Phosphor Screen Glow</div>
                  <div className="text-[10px] text-white/40">Vignetted cathode-ray tube glass glare</div>
                </div>
                <input
                  type="checkbox"
                  checked={form.crtGlowEnabled}
                  onChange={(e) => setForm({ ...form, crtGlowEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
                />
              </div>

              {/* VHS Noise */}
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1c22] border border-white/5">
                <div>
                  <div className="text-white font-semibold">Tape VHS Glitch / Tracking Noise</div>
                  <div className="text-[10px] text-white/40">Analog tape tracking artifacts &amp; chromatic drift</div>
                </div>
                <input
                  type="checkbox"
                  checked={form.vhsNoiseEnabled}
                  onChange={(e) => setForm({ ...form, vhsNoiseEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
                />
              </div>

              {/* REC Indicator */}
              <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1c22] border border-white/5">
                <div>
                  <div className="text-white font-semibold">Viewfinder HUD Overlay</div>
                  <div className="text-[10px] text-white/40">Camera viewfinder frame styling</div>
                </div>
                <input
                  type="checkbox"
                  checked={form.recIndicatorEnabled}
                  onChange={(e) => setForm({ ...form, recIndicatorEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
                />
              </div>
            </div>

            {/* Window Style Variant */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-white/70 uppercase mb-1.5">RETRO WINDOW FRAME AESTHETIC</label>
              <select
                value={form.windowStyle}
                onChange={(e) => setForm({ ...form, windowStyle: e.target.value as WindowStyle })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
              >
                <option value="retro-win95">Retro Win95 / Classic OS</option>
                <option value="y2k-silver">Y2K Brushed Silver &amp; Cyan</option>
                <option value="crt-terminal">CRT Hacker Green Phosphor</option>
                <option value="vhs-player">VHS Tape Player Violet</option>
                <option value="minimal-retro">Minimal Dark Frameless</option>
              </select>
            </div>

            {/* Default Portfolio Layout */}
            <div>
              <label className="block text-white/70 uppercase mb-1.5">DEFAULT ARCHIVE LAYOUT</label>
              <select
                value={form.portfolioLayout}
                onChange={(e) => setForm({ ...form, portfolioLayout: e.target.value as PortfolioLayout })}
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
              >
                <option value="collage">Surreal Collage &amp; Masonry</option>
                <option value="grid">Standard Film Grid</option>
                <option value="social">9:16 Social Media Priority</option>
                <option value="contact-sheet">Contact Sheet Index</option>
              </select>
            </div>
          </div>

          {/* Showreel Video Picker */}
          <div className="bg-[#141418] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase flex items-center gap-2 text-sm">
                <Film className="w-4 h-4 text-[#ff3b00]" />
                <span>HERO SHOWREEL VIDEO</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  onOpenDriveForShowreel((selectedDriveVideo) => {
                    setForm({
                      ...form,
                      showreelVideo: {
                        ...form.showreelVideo,
                        ...selectedDriveVideo,
                      },
                    });
                  });
                }}
                className="px-2.5 py-1 bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 rounded text-[11px] flex items-center gap-1 hover:bg-[#00e5ff]/20"
              >
                <HardDrive className="w-3 h-3" />
                <span>Choose Drive Reel</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 mb-1">PROVIDER</label>
                <select
                  value={form.showreelVideo.provider}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      showreelVideo: {
                        ...form.showreelVideo,
                        provider: e.target.value as any,
                      },
                    })
                  }
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="drive">Google Drive</option>
                  <option value="direct">Direct File</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1">ASPECT RATIO</label>
                <select
                  value={form.showreelVideo.aspectRatio}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      showreelVideo: {
                        ...form.showreelVideo,
                        aspectRatio: e.target.value as any,
                      },
                    })
                  }
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                >
                  <option value="16:9">16:9 Landscape</option>
                  <option value="9:16">9:16 Vertical</option>
                  <option value="1:1">1:1 Square</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/60 mb-1">SHOWREEL VIDEO URL / EMBED</label>
              <input
                type="text"
                value={form.showreelVideo.providerIdOrUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    showreelVideo: {
                      ...form.showreelVideo,
                      providerIdOrUrl: e.target.value,
                    },
                  })
                }
                className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
