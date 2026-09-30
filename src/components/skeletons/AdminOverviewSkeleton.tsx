import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonRetroWindow,
} from './SkeletonPrimitives';
import { HardDrive, Film, Sliders, Activity, ShieldCheck, Database, Zap } from 'lucide-react';

export const AdminOverviewSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading dashboard metrics and overview..."
      className="space-y-6 font-mono text-xs"
    >
      {/* Workstation HUD Status Banner */}
      <SkeletonHudHeader
        statusText="OPERATOR CMS // DIRECTORY: /VOLUMES/RAID_ARRAY/EKO_PIXELS"
        timecode="00:00:00:00"
        format="RAID 10 • 128TB • NVMe CACHE READY"
      />

      {/* 1. Top Banner / Status Overview */}
      <div className="p-6 bg-[#13131a] border border-white/15 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#ff3b00]/20 text-[#ff3b00] border border-[#ff3b00]/40 text-[10px] font-bold">
              CMS CONSOLE READY
            </span>
            <span className="px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 text-[10px] font-bold">
              PORTFOLIO LIVE
            </span>
          </div>
          <SkeletonText height="h-7" width="w-64 sm:w-80" variant="bright" />
          <SkeletonText height="h-3.5" width="w-96 max-w-full" />
        </div>

        <div className="flex items-center gap-3">
          <SkeletonButton width="w-36" height="h-10" rounded="lg" variant="accent" />
          <SkeletonButton width="w-32" height="h-10" rounded="lg" />
        </div>
      </div>

      {/* 2. 4-Card Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL CUTS', val: '12 PROJECTS', variant: 'accent' as const },
          { label: 'MEDIA STORAGE', val: '4.8 TB / 10 TB', variant: 'cyan' as const },
          { label: 'UNREAD LEADS', val: '5 PENDING', variant: 'accent' as const },
          { label: 'PORTFOLIO VISITS', val: '14.2K / MO', variant: 'bright' as const },
        ].map((metric, i) => (
          <div
            key={i}
            className="p-4 bg-[#14141c] rounded-xl border border-white/15 flex flex-col justify-between gap-3 min-h-[115px] shadow-md relative overflow-hidden"
          >
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/50">{metric.label}</span>
              <SkeletonBox rounded="md" className="w-4 h-4" variant={metric.variant} />
            </div>
            <SkeletonText height="h-7" width="w-28" variant={metric.variant} />
            <SkeletonText height="h-2.5" width="w-24" />
          </div>
        ))}
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div className="p-4 bg-[#14141c] border border-white/15 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="text-white/80 font-bold">QUICK SYSTEM SHORTCUTS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonButton width="w-28" height="h-8" rounded="md" variant="accent" />
          <SkeletonButton width="w-32" height="h-8" rounded="md" />
          <SkeletonButton width="w-28" height="h-8" rounded="md" />
          <SkeletonButton width="w-36" height="h-8" rounded="md" variant="cyan" />
        </div>
      </div>

      {/* 4. Bottom 2-Column Grid (Recent Projects & Storage / System Health) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Cuts List (Left 8 cols) */}
        <div className="lg:col-span-8 bg-[#13131a] border border-white/15 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-white font-bold tracking-wider uppercase flex items-center gap-2">
              <Film className="w-4 h-4 text-[#ff3b00]" />
              RECENT PROJECT CUTS IN PIPELINE
            </span>
            <span className="text-[#00e5ff] text-[11px]">VIEW ALL →</span>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-3 bg-[#181822] rounded-lg border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-9 bg-black rounded border border-white/10 overflow-hidden relative">
                    <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
                  </div>
                  <div className="space-y-1">
                    <SkeletonText height="h-3.5" width="w-44" variant="bright" />
                    <SkeletonText height="h-2.5" width="w-28" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SkeletonBadge width="w-16" height="h-5" variant={i % 2 === 0 ? 'accent' : 'cyan'} />
                  <SkeletonBox rounded="md" className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health & Ingestion (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Storage Quota Card */}
          <div className="bg-[#13131a] border border-white/15 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#00e5ff]" />
                RAID STORAGE QUOTA
              </span>
              <span className="text-[#ff3b00] font-bold text-[10px]">48% USED</span>
            </div>
            <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10">
              <div className="w-1/2 h-full bg-gradient-to-r from-[#00e5ff] to-[#ff3b00] rounded-full" />
            </div>
            <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-white/60">
              <div className="flex justify-between">
                <span>4K MASTER ASSETS:</span>
                <span className="text-white font-mono">3.2 TB</span>
              </div>
              <div className="flex justify-between">
                <span>PROXIES &amp; CACHE:</span>
                <span className="text-white font-mono">1.1 TB</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABLE:</span>
                <span className="text-emerald-400 font-mono">5.2 TB FREE</span>
              </div>
            </div>
          </div>

          {/* Attribution Lock Banner */}
          <div className="p-4 bg-[#1a1514] border border-[#ff3b00]/30 rounded-xl flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#ff3b00] text-white flex items-center justify-center font-bold text-xs shrink-0">
              EP
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-white font-bold text-[11px] truncate">BUILT BY EKO PIXELS</p>
              <p className="text-[10px] text-white/50">PROTECTED HARDCODED ATTRIBUTION</p>
            </div>
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};
