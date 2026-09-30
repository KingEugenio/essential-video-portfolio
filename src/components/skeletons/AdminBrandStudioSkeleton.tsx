import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonRetroWindow,
} from './SkeletonPrimitives';
import { Sliders, Palette, Type, Eye, Sparkles, Monitor } from 'lucide-react';

export const AdminBrandStudioSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading brand studio aesthetic customization..."
      className="space-y-6 font-mono text-xs"
    >
      {/* HUD Bar */}
      <SkeletonHudHeader
        statusText="BRAND STUDIO &amp; THEME ENGINE // AESTHETICS: RETRO CRT HUD"
        timecode="00:00:00:00"
        format="BD GRAVEL DISPLAY • COLOR SCIENCE MATRIX"
      />

      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-72" variant="bright" />
          <SkeletonText height="h-3.5" width="w-96 max-w-full" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonButton width="w-28" height="h-9" rounded="md" />
          <SkeletonButton width="w-36" height="h-9" rounded="md" variant="accent" />
        </div>
      </div>

      {/* 2. Main 2-Column Split: Controls & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customization Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Card */}
          <div className="p-5 bg-[#13131a] border border-white/15 rounded-xl space-y-4 shadow-md">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-[#ff3b00]" />
              <span className="text-white font-bold">BRAND IDENTITY &amp; TITLES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <SkeletonText height="h-3" width="w-24" variant="cyan" />
                <SkeletonBox rounded="md" className="w-full h-10" />
              </div>
              <div className="space-y-1.5">
                <SkeletonText height="h-3" width="w-28" variant="cyan" />
                <SkeletonBox rounded="md" className="w-full h-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <SkeletonText height="h-3" width="w-32" variant="cyan" />
              <SkeletonBox rounded="md" className="w-full h-10" />
            </div>
          </div>

          {/* Color Matrix */}
          <div className="p-5 bg-[#13131a] border border-white/15 rounded-xl space-y-4 shadow-md">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Palette className="w-4 h-4 text-[#00e5ff]" />
              <span className="text-white font-bold">COLOR SCIENCE &amp; THEME PALETTE</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'PRIMARY ACCENT', color: 'bg-[#ff3b00]' },
                { name: 'SECONDARY CYAN', color: 'bg-[#00e5ff]' },
                { name: 'CANVAS DARK', color: 'bg-[#0a0a0e]' },
                { name: 'SURFACE PANEL', color: 'bg-[#181824]' },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-[#181822] rounded-lg border border-white/10 space-y-2">
                  <div className={`w-full h-8 rounded ${c.color} border border-white/20`} />
                  <span className="text-[10px] text-white/60 block">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Engine */}
          <div className="p-5 bg-[#13131a] border border-white/15 rounded-xl space-y-4 shadow-md">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Type className="w-4 h-4 text-white" />
              <span className="text-white font-bold">TYPOGRAPHY PAIRING MATRIX</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#ff3b00] font-bold">DISPLAY HEADLINE FONT:</span>
                <div className="p-2.5 bg-[#181824] rounded-lg border border-white/10 flex justify-between items-center">
                  <span className="text-white font-bold">BD GRAVEL / CINEMATIC</span>
                  <SkeletonBadge width="w-14" height="h-4" variant="accent" />
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#00e5ff] font-bold">BODY &amp; MONO FONT:</span>
                <div className="p-2.5 bg-[#181824] rounded-lg border border-white/10 flex justify-between items-center">
                  <span className="text-white font-bold">SPACE GROTESK / MONO</span>
                  <SkeletonBadge width="w-14" height="h-4" variant="cyan" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live CRT Preview Window (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#00e5ff]" />
              LIVE THEME RENDER PREVIEW
            </span>
            <span className="text-[#ff3b00] text-[10px] font-bold">REAL-TIME</span>
          </div>

          <SkeletonRetroWindow
            title="THEME_PREVIEW // CANVAS_RENDER.MOV"
            badge="LIVE CSS"
            withGlow
          >
            <div className="space-y-4">
              <div className="p-4 bg-[#14141d] rounded-lg border border-[#ff3b00]/30 space-y-2">
                <span className="text-[#ff3b00] font-bold text-lg block">EKO PIXELS // STUDIO</span>
                <SkeletonText height="h-3" width="w-4/5" />
                <SkeletonText height="h-3" width="w-3/5" />
                <div className="pt-2 flex gap-2">
                  <SkeletonBadge width="w-16" height="h-5" variant="accent" />
                  <SkeletonBadge width="w-20" height="h-5" variant="cyan" />
                </div>
              </div>

              <div className="p-3 bg-[#181822] rounded-lg border border-white/10 flex items-center justify-between">
                <span className="text-white/60">SCANLINE OPACITY</span>
                <SkeletonBox rounded="full" className="w-12 h-5" variant="accent" />
              </div>

              <div className="p-3 bg-[#181822] rounded-lg border border-white/10 flex items-center justify-between">
                <span className="text-white/60">CRT BLOOM GLOW</span>
                <SkeletonBox rounded="full" className="w-12 h-5" variant="cyan" />
              </div>
            </div>
          </SkeletonRetroWindow>
        </div>
      </div>
    </SkeletonContainer>
  );
};
