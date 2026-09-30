import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';
import { HardDrive, Cloud, Activity, Plus, RefreshCw, Film } from 'lucide-react';

export const AdminMediaLibrarySkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading universal media assets library..."
      className="space-y-6 font-mono text-xs"
    >
      {/* HUD Header */}
      <SkeletonHudHeader
        statusText="UNIVERSAL MEDIA VAULT // STORAGE: MULTI-CLOUD HYBRID"
        timecode="00:00:00:00"
        format="PRORES • MP4 • 4K UHD • 10-BIT LOG"
      />

      {/* 1. Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-72" variant="bright" />
          <SkeletonText height="h-3.5" width="w-96 max-w-full" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="accent" />
          <SkeletonButton width="w-36" height="h-9" rounded="md" variant="cyan" />
          <SkeletonButton width="w-28" height="h-9" rounded="md" />
        </div>
      </div>

      {/* 2. Storage Quota Status Bar */}
      <div className="p-4 bg-[#13131a] border border-white/15 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff3b00]/20 border border-[#ff3b00]/40 flex items-center justify-center text-[#ff3b00]">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <SkeletonText height="h-4" width="w-48" variant="bright" />
            <SkeletonText height="h-2.5" width="w-64" />
          </div>
        </div>
        <div className="flex-1 max-w-xs space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-white/50">USED: 4.8 TB</span>
            <span className="text-[#00e5ff] font-bold">10 TB TOTAL</span>
          </div>
          <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10">
            <div className="w-1/2 h-full bg-gradient-to-r from-[#00e5ff] to-[#ff3b00] rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. Search & Provider Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#13131a] p-3 rounded-xl border border-white/15">
        <div className="flex-1 max-w-md">
          <SkeletonBox rounded="md" className="w-full h-9" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[#181824] p-1 rounded-md border border-white/10">
            <SkeletonBox rounded="sm" className="w-14 h-7" variant="accent" />
            <SkeletonBox rounded="sm" className="w-24 h-7" />
            <SkeletonBox rounded="sm" className="w-20 h-7" />
            <SkeletonBox rounded="sm" className="w-16 h-7" />
          </div>
          <SkeletonBox rounded="md" className="w-24 h-9" />
        </div>
      </div>

      {/* 4. Media Assets Grid (6 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#13131a] border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg"
          >
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-[#181824] w-full overflow-hidden border-b border-white/10">
              <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks withScanlines />
              {/* Provider Badge top-left */}
              <div className="absolute top-2.5 left-2.5">
                <SkeletonBadge width="w-20" height="h-4" variant={i % 2 === 0 ? 'accent' : 'cyan'} />
              </div>
              {/* Duration top-right */}
              <div className="absolute top-2.5 right-2.5">
                <span className="px-1.5 py-0.5 rounded bg-black/80 text-white/70 font-mono text-[9px] border border-white/10">
                  01:45
                </span>
              </div>
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-black/60 border border-[#ff3b00]/50 flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-[#ff3b00] ml-0.5" />
                </div>
              </div>
            </div>

            {/* Asset Info */}
            <div className="p-3.5 flex flex-col gap-2.5">
              <div className="space-y-1">
                <SkeletonText height="h-4" width="w-4/5" variant="bright" />
                <div className="flex items-center justify-between">
                  <SkeletonText height="h-2.5" width="w-20" />
                  <SkeletonText height="h-2.5" width="w-14" variant="cyan" />
                </div>
              </div>

              {/* Status & Actions Footer */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold text-[10px]">HEALTHY</span>
                </div>
                <div className="flex items-center gap-1">
                  <SkeletonBox rounded="md" className="w-6 h-6" />
                  <SkeletonBox rounded="md" className="w-6 h-6" />
                  <SkeletonBox rounded="md" className="w-6 h-6" variant="accent" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonContainer>
  );
};
