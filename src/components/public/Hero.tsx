import React from 'react';
import { ArrowDown } from 'lucide-react';
import { BrandSettings } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';
import { VideoPlayer } from '../player/VideoPlayer';

interface HeroProps {
  brand: BrandSettings;
  onExploreWork: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ brand, onExploreWork, onOpenBooking }) => {
  return (
    <section id="hero" aria-label="Official Showreel and Editorial Introduction" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-30"
        style={{ background: 'radial-gradient(circle, var(--brand-primary, #ff3b00) 0%, transparent 70%)' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bold Kinetic Typography & Branding */}
        <header className="lg:col-span-5 flex flex-col items-start gap-5">
          {/* Headline */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.08]">
            {brand.heroHeadline}
          </h1>

          {/* Subheadline & Bio */}
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
            {brand.heroSubheadline}
          </p>

          {/* Technical Specs Tags */}
          <ul role="list" aria-label="Technical Pipeline Specifications" className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-white/60">
            <li className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">4K DCI CONFORM</li>
            <li className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">ACES COLOR PIPELINE</li>
            <li className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">35MM FILM HALATION</li>
            <li className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">SPATIAL SOUND</li>
          </ul>

          {/* CTA Buttons */}
          <nav aria-label="Hero Actions" className="flex flex-wrap items-center gap-4 pt-3">
            <button
              id="hero-explore-work-btn"
              type="button"
              onClick={onExploreWork}
              className="px-6 py-3 rounded-md bg-[#ff3b00] hover:bg-[#ff4d00] text-white font-mono font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,59,0,0.4)] flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
            >
              <span>{brand.heroCtaPrimary || 'EXPLORE ARCHIVE'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              id="hero-open-booking-btn"
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-md bg-[#18181b] hover:bg-[#27272a] text-white border border-white/15 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              {brand.heroCtaSecondary || 'TRANSMIT BRIEF'}
            </button>
          </nav>

          {/* Operator Specs Bar - Semantic Description List */}
          <dl className="flex items-center gap-6 pt-4 border-t border-white/10 w-full font-mono text-xs text-white/50">
            <div>
              <dd className="block text-white font-bold text-base">{brand.yearsExperience}</dd>
              <dt className="text-white/50 uppercase">EXPERIENCE</dt>
            </div>
            <div className="h-6 w-px bg-white/10" aria-hidden="true" />
            <div>
              <dd className="block text-white font-bold text-base">200+</dd>
              <dt className="text-white/50 uppercase">CUTS DELIVERED</dt>
            </div>
            <div className="h-6 w-px bg-white/10" aria-hidden="true" />
            <div>
              <dd className="block text-white font-bold text-base">4K 120FPS</dd>
              <dt className="text-white/50 uppercase">NATIVE PIPELINE</dt>
            </div>
          </dl>
        </header>

        {/* Right Column: Hero Showreel Retro Media Window in Semantic Figure */}
        <figure id="hero-showreel-figure" className="lg:col-span-7 m-0">
          <RetroWindow
            title={brand.showreelVideo.title || "OFFICIAL_SHOWREEL.MOV"}
            subtitle="MASTER 4K PRORES"
            badge="FEATURED REEL"
            styleVariant={brand.windowStyle}
            className="w-full shadow-2xl"
          >
            <div className="p-2 sm:p-3 bg-[#0a0a0c]">
              <VideoPlayer
                video={brand.showreelVideo}
                className="w-full"
                retroEffect={brand.vhsNoiseEnabled ? 'vhs' : brand.crtGlowEnabled ? 'crt' : 'off'}
                autoPlay={false}
              />
              
              {/* Retro HUD Metadata below video as Figcaption */}
              <figcaption className="mt-2.5 px-2 py-1.5 bg-black/60 rounded border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/60">
                <div className="flex items-center gap-2">
                  <span className="text-white/70 font-semibold">AUDIO: 48KHZ STEREO</span>
                </div>
                <div className="hidden sm:block text-white/40">
                  CODEC: APPLE PRORES 4444 XQ
                </div>
                <div className="text-[#00e5ff]">
                  ORIENTATION: {brand.showreelVideo.aspectRatio}
                </div>
              </figcaption>
            </div>
          </RetroWindow>
        </figure>
      </div>
    </section>
  );
};
