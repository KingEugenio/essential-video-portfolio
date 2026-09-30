import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard,
  SkeletonContainer,
  SkeletonRetroWindow,
  SkeletonWaveform,
  SkeletonInput,
  SkeletonAccordion,
  SkeletonPricingCard,
  SkeletonTestimonialCard,
} from './SkeletonPrimitives';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { 
  Film, Layers, ShieldCheck, Zap, HelpCircle, 
  MapPin, MessageSquare, Send, Smartphone, Monitor, Square,
  Clock, HardDrive, Cpu, Compass, CheckCircle2
} from 'lucide-react';

export const PublicPortfolioSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading cinematic portfolio experience..."
      className="min-h-screen bg-[#080808] text-white font-body relative overflow-x-hidden flex flex-col"
    >
      {/* 1. Header / Navbar Skeleton - Exactly mirrors real Navbar fixed top */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#ff3b00] flex items-center justify-center text-white font-mono font-bold text-xs shadow-[0_0_12px_rgba(255,59,0,0.5)]">
              EP
            </div>
            <div className="flex flex-col gap-1">
              <SkeletonText height="h-4" width="w-32" variant="bright" />
              <SkeletonText height="h-2.5" width="w-24" />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 font-mono text-xs">
            <SkeletonText height="h-3.5" width="w-14" />
            <SkeletonText height="h-3.5" width="w-16" />
            <SkeletonText height="h-3.5" width="w-14" />
            <SkeletonText height="h-3.5" width="w-14" />
            <SkeletonText height="h-3.5" width="w-10" />
            <SkeletonText height="h-3.5" width="w-14" />
            <SkeletonText height="h-3.5" width="w-16" />
          </div>

          {/* Booking CTA Button */}
          <div className="flex items-center gap-3">
            <SkeletonButton width="w-36" height="h-9" rounded="md" variant="accent" />
          </div>
        </div>
      </header>

      {/* Main Skeleton Body */}
      <div className="pt-24 flex flex-col gap-12 sm:gap-16">
        
        {/* 2. Hero Section Skeleton */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-5 flex flex-col items-start gap-5">
              {/* Kinetic Headline */}
              <div className="flex flex-col gap-3 w-full">
                <SkeletonText height="h-10 sm:h-12" width="w-full" variant="bright" />
                <SkeletonText height="h-10 sm:h-12" width="w-4/5" variant="accent" />
              </div>

              {/* Subheadline & Bio */}
              <div className="flex flex-col gap-2 w-full max-w-xl">
                <SkeletonText height="h-4" width="w-full" />
                <SkeletonText height="h-4" width="w-5/6" />
                <SkeletonText height="h-4" width="w-2/3" />
              </div>

              {/* Technical Specs Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <SkeletonBadge width="w-28" height="h-6" variant="cyan" />
                <SkeletonBadge width="w-36" height="h-6" variant="accent" />
                <SkeletonBadge width="w-32" height="h-6" />
                <SkeletonBadge width="w-28" height="h-6" variant="cyan" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <SkeletonButton width="w-44" height="h-11" rounded="md" variant="accent" />
                <SkeletonButton width="w-36" height="h-11" rounded="md" />
              </div>

              {/* Operator Specs Bar */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-full font-mono">
                <div className="space-y-1">
                  <span className="text-[#ff3b00] font-bold text-lg">14+</span>
                  <SkeletonText height="h-2.5" width="w-20" />
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="space-y-1">
                  <span className="text-[#00e5ff] font-bold text-lg">98M+</span>
                  <SkeletonText height="h-2.5" width="w-20" />
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="space-y-1">
                  <span className="text-white font-bold text-lg">4K DCI</span>
                  <SkeletonText height="h-2.5" width="w-24" />
                </div>
              </div>
            </div>

            {/* Right Hero Column: Showreel Retro Window */}
            <div className="lg:col-span-7">
              <SkeletonRetroWindow
                title="TERMINAL // MASTER_SHOWREEL.MOV"
                badge="PRORES 4444 XQ"
                withGlow
              >
                {/* Video Player Box */}
                <div className="aspect-video w-full rounded-lg bg-[#141419] relative overflow-hidden flex items-center justify-center border border-white/10">
                  <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
                  
                  {/* Simulated CRT Reticle and Playhead */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,59,0,0.6)]">
                      <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1" />
                    </div>
                  </div>

                  {/* Bottom HUD Scrubber Bar */}
                  <div className="absolute bottom-3 inset-x-4 flex flex-col gap-1.5 bg-black/80 p-2.5 rounded border border-white/10 backdrop-blur-md pointer-events-none">
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-[#ff3b00] rounded-full" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#00e5ff]">TC 00:00:42:15</span>
                      <span className="text-white/50">00:02:30:00 [24 FPS]</span>
                    </div>
                  </div>
                </div>
              </SkeletonRetroWindow>
            </div>
          </div>
        </section>

        {/* 3. Quick Format Showcase Skeleton */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="font-mono text-xs text-[#ff3b00] uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>QUICK FORMAT FILTER</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Explore Work by Screen Architecture
              </h3>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <SkeletonBadge width="w-24" height="h-8" variant="cyan" />
              <SkeletonBadge width="w-32" height="h-8" />
              <SkeletonBadge width="w-32" height="h-8" />
              <SkeletonBadge width="w-28" height="h-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-4 bg-[#121216] border border-white/10 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#00e5ff] font-bold flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" />
                  16:9 CINEMA &amp; TVC
                </span>
                <span className="text-white/40">4K MASTER</span>
              </div>
              <div className="aspect-video w-full rounded-lg bg-[#181820] overflow-hidden relative">
                <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
              </div>
            </div>

            <div className="p-4 bg-[#121216] border border-white/10 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#ff3b00] font-bold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  9:16 VERTICAL REELS
                </span>
                <span className="text-white/40">1080x1920</span>
              </div>
              <div className="aspect-video w-full rounded-lg bg-[#181820] overflow-hidden relative">
                <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
              </div>
            </div>

            <div className="p-4 bg-[#121216] border border-white/10 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Square className="w-3.5 h-3.5" />
                  1:1 SQUARE TEASERS
                </span>
                <span className="text-white/40">1080x1080</span>
              </div>
              <div className="aspect-video w-full rounded-lg bg-[#181820] overflow-hidden relative">
                <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Project Archive Grid Skeleton */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00e5ff] tracking-widest uppercase">
                <Film className="w-3.5 h-3.5" />
                <span>SELECTED ARCHIVE // MASTER DIRECTORY</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                PROJECT FILES &amp; MASTER RELEASES
              </h2>
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-2 bg-[#121217] p-1.5 rounded-lg border border-white/10">
              <span className="px-3 py-1 rounded bg-[#ff3b00] text-white font-mono text-xs font-bold">
                COLLAGE
              </span>
              <span className="px-3 py-1 text-white/50 font-mono text-xs">GRID</span>
              <span className="px-3 py-1 text-white/50 font-mono text-xs">9:16 REELS</span>
              <span className="px-3 py-1 text-white/50 font-mono text-xs">SHEET</span>
            </div>
          </div>

          {/* Category Filters Bar */}
          <div className="flex items-center gap-2 overflow-x-auto py-6">
            <span className="px-3 py-1 rounded bg-[#ff3b00] text-white font-mono text-xs font-bold shrink-0">
              ALL CUTS [12]
            </span>
            <SkeletonBadge width="w-28" height="h-7" variant="cyan" />
            <SkeletonBadge width="w-32" height="h-7" />
            <SkeletonBadge width="w-36" height="h-7" />
            <SkeletonBadge width="w-28" height="h-7" />
            <SkeletonBadge width="w-28" height="h-7" variant="cyan" />
          </div>

          {/* 6-Card High-Definition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="001" />
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="002" />
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="003" />
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="004" />
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="005" />
            <ProjectCardSkeleton aspectRatio="16:9" projectNumber="006" />
          </div>
        </section>

        {/* 5. Services & Pipeline Capabilities Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>PRODUCTION PIPELINE &amp; CAPABILITIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-white">
              END-TO-END POST-PRODUCTION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} withGlow={i === 1} className="flex flex-col justify-between gap-6 min-h-[340px]">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <SkeletonText height="h-6" width="w-2/3" variant="bright" />
                    <SkeletonBadge width="w-20" height="h-5" variant={i === 1 ? 'accent' : 'cyan'} />
                  </div>
                  <SkeletonText lines={2} height="h-3.5" gap="gap-1.5" />
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <SkeletonBox rounded="full" className="w-3.5 h-3.5" variant="accent" />
                      <SkeletonText height="h-3" width="w-4/5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <SkeletonBox rounded="full" className="w-3.5 h-3.5" variant="cyan" />
                      <SkeletonText height="h-3" width="w-3/4" />
                    </div>
                    <div className="flex items-center gap-2">
                      <SkeletonBox rounded="full" className="w-3.5 h-3.5" />
                      <SkeletonText height="h-3" width="w-5/6" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <SkeletonText height="h-5" width="w-24" variant="bright" />
                  <SkeletonButton width="w-28" height="h-9" rounded="md" variant={i === 1 ? 'accent' : 'default'} />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </section>

        {/* 6. Pricing Packages & Currency Selector Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                <span>TRANSPARENT PRICING &amp; PACKAGES</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-white">
                FLEXIBLE COMMERCIAL COMMISSIONS
              </h2>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1.5 bg-[#121216] p-1.5 rounded-lg border border-white/10 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#ff3b00] text-white font-bold">USD</span>
              <span className="px-2.5 py-1 text-white/50">EUR</span>
              <span className="px-2.5 py-1 text-white/50">GBP</span>
              <span className="px-2.5 py-1 text-white/50">GHS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonPricingCard isFeatured={false} tierName="DAY RATE EDITORIAL" />
            <SkeletonPricingCard isFeatured={true} tierName="COMMERCIAL MASTER" />
            <SkeletonPricingCard isFeatured={false} tierName="MUSIC VIDEO TURNKEY" />
          </div>
        </section>

        {/* 7. Operator Bio / About Manifesto Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Avatar frame */}
            <div className="lg:col-span-4 aspect-[4/5] rounded-xl overflow-hidden border border-white/15 bg-[#121217] relative shadow-2xl">
              <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
              <div className="absolute bottom-3 inset-x-3 bg-black/85 p-3 rounded border border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#00e5ff]">OPERATOR SPEC</span>
                <span className="text-white/60">COLORIST / EDITOR</span>
              </div>
            </div>

            {/* Manifesto & Specs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider">
                  OPERATOR MANIFESTO
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  CRAFTING INTENTIONAL VISUAL RHYTHM
                </h2>
              </div>

              <SkeletonText lines={4} height="h-4" gap="gap-2.5" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono">
                <div className="p-3 bg-[#121217] rounded-lg border border-white/10 space-y-1">
                  <span className="text-[#ff3b00] font-bold text-lg">DAVINCI</span>
                  <p className="text-[10px] text-white/50">STUDIO MASTER</p>
                </div>
                <div className="p-3 bg-[#121217] rounded-lg border border-white/10 space-y-1">
                  <span className="text-[#00e5ff] font-bold text-lg">PREMIERE</span>
                  <p className="text-[10px] text-white/50">LONGFORM CUTS</p>
                </div>
                <div className="p-3 bg-[#121217] rounded-lg border border-white/10 col-span-2 sm:col-span-1 space-y-1">
                  <span className="text-white font-bold text-lg">AFTER FX</span>
                  <p className="text-[10px] text-white/50">VFX COMPOSITING</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] uppercase tracking-widest mb-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED PROTOCOLS</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-white">
                TECHNICAL &amp; LOGISTICAL ANSWERS
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs">
              <SkeletonBadge width="w-24" height="h-7" variant="accent" />
              <SkeletonBadge width="w-28" height="h-7" />
              <SkeletonBadge width="w-28" height="h-7" />
              <SkeletonBadge width="w-28" height="h-7" />
            </div>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            <SkeletonAccordion isOpen={true} />
            <SkeletonAccordion isOpen={false} />
            <SkeletonAccordion isOpen={false} />
            <SkeletonAccordion isOpen={false} />
          </div>
        </section>

        {/* 9. Studio Location & Ingestion Bay Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] uppercase tracking-widest mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>FACILITY &amp; PHYSICAL INGESTION BAY</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-white">
                STUDIO SUITE &amp; DRIVE DROP-OFF
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <SkeletonButton width="w-36" height="h-9" rounded="lg" />
              <SkeletonButton width="w-32" height="h-9" rounded="lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Facility specs */}
            <div className="lg:col-span-6 bg-[#121216] border border-white/10 rounded-xl p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <SkeletonText height="h-5" width="w-48" variant="bright" />
                  <SkeletonText lines={2} height="h-3.5" gap="gap-1.5" />
                </div>

                <div className="p-4 bg-[#181822] rounded-lg border border-white/10 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/40">COURIER PROTOCOL:</span>
                    <span className="text-[#00e5ff]">SAME-DAY INGESTION</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">STORAGE ARRAY:</span>
                    <span className="text-emerald-400 font-bold">128TB RAID 10 READY</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <SkeletonButton width="w-40" height="h-9" rounded="md" variant="accent" />
                <SkeletonText height="h-3" width="w-28" />
              </div>
            </div>

            {/* Map Preview Frame */}
            <div className="lg:col-span-6 aspect-video lg:aspect-auto min-h-[260px] bg-[#121216] border border-white/10 rounded-xl overflow-hidden relative">
              <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="p-3 bg-black/80 rounded-xl border border-white/15 flex items-center gap-3 backdrop-blur-md">
                  <MapPin className="w-5 h-5 text-[#ff3b00] animate-bounce" />
                  <div className="space-y-1 font-mono text-xs">
                    <span className="text-white font-bold">SOHO MEDIA ARTS SUITE</span>
                    <p className="text-[10px] text-white/50">LONDON W1D 3QU</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Client Testimonials Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#00e5ff] tracking-widest uppercase mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CLIENT TRANSMISSIONS &amp; ENDORSEMENTS</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-white">
              TRUSTED BY DIRECTORS &amp; LABELS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonTestimonialCard />
            <SkeletonTestimonialCard />
            <SkeletonTestimonialCard />
          </div>
        </section>

        {/* 11. Project Transmission Portal (Contact Form) Skeleton */}
        <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Transmission Guarantees */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5" />
                  <span>START COMMISSION TRANSMISSION</span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl text-white">
                  INITIATE PROJECT TIMELINE
                </h2>
                <SkeletonText lines={3} height="h-4" gap="gap-2" />

                {/* SLA Specs */}
                <div className="p-4 bg-[#14141c] border border-white/10 rounded-xl space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ff3b00]/20 border border-[#ff3b00]/40 flex items-center justify-center text-[#ff3b00]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 font-mono text-xs">
                      <span className="text-white font-bold">2-4 HR RESPONSE SLA</span>
                      <p className="text-[10px] text-white/50">SAME-DAY INTAKE REVIEW</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/20 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 font-mono text-xs">
                      <span className="text-white font-bold">STRICT NDA AIRGAP</span>
                      <p className="text-[10px] text-white/50">PROTECTED WORKFLOW</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast-track WhatsApp card */}
              <div className="p-4 bg-[#121e16] border border-emerald-500/30 rounded-xl flex items-center justify-between gap-3">
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">WHATSAPP FAST-TRACK</span>
                  <p className="text-[10px] text-white/50">DIRECT MOBILE LINE</p>
                </div>
                <SkeletonButton width="w-28" height="h-8" rounded="md" />
              </div>
            </div>

            {/* Right Column: Retro Transmission Form Window */}
            <div className="lg:col-span-7">
              <SkeletonRetroWindow
                title="TRANSMISSION_PROTOCOL // NEW_PROJECT_BRIEF"
                badge="ENCRYPTED SSL"
              >
                <div className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SkeletonInput label="YOUR NAME" />
                    <SkeletonInput label="EMAIL ADDRESS" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SkeletonInput label="PHONE / WHATSAPP" />
                    <SkeletonInput label="COMPANY / ARTIST" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SkeletonInput label="PROJECT TYPE" />
                    <SkeletonInput label="ESTIMATED BUDGET" />
                  </div>
                  <div className="space-y-1.5">
                    <SkeletonText height="h-3" width="w-32" variant="cyan" />
                    <SkeletonBox rounded="md" className="w-full h-24" />
                  </div>
                  <div className="pt-2">
                    <SkeletonButton width="w-full" height="h-12" rounded="lg" variant="accent" />
                  </div>
                </div>
              </SkeletonRetroWindow>
            </div>
          </div>
        </section>

        {/* 12. Footer Skeleton */}
        <footer className="border-t border-white/10 py-10 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#ff3b00] flex items-center justify-center text-white font-bold text-[10px]">
              EP
            </div>
            <span className="text-white font-bold tracking-wider">
              BUILT BY EKO PIXELS
            </span>
            <span className="text-white/40 text-[10px]">• PROTECTED ATTRIBUTION</span>
          </div>
          <div className="flex items-center gap-4 text-white/40 text-[11px]">
            <span>PORTFOLIO ARCHIVE</span>
            <span>PRIVACY POLICY</span>
            <span>SHARE</span>
          </div>
        </footer>
      </div>
    </SkeletonContainer>
  );
};
