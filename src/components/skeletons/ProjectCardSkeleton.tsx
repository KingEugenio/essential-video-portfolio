import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonBadge } from './SkeletonPrimitives';

interface ProjectCardSkeletonProps {
  aspectRatio?: '16:9' | '9:16' | '1:1' | '2.35:1';
  layout?: 'grid' | 'social' | 'collage' | 'contact-sheet';
  className?: string;
  projectNumber?: string;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({
  aspectRatio = '16:9',
  layout = 'grid',
  className = '',
  projectNumber = '001',
}) => {
  const aspectClass = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square',
    '2.35:1': 'aspect-[2.35/1]',
  }[aspectRatio];

  if (layout === 'social') {
    return (
      <div className={`flex flex-col bg-[#121216] border border-white/15 rounded-xl overflow-hidden shadow-xl ${className}`} aria-hidden="true">
        {/* 9:16 Poster Area */}
        <div className="relative aspect-[9/16] bg-[#16161c] overflow-hidden">
          <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks withScanlines />
          
          {/* Top Chips */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#00e5ff] border border-white/10">
              CUT_{projectNumber}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#ff3b00]/90 font-mono text-[9px] text-white font-bold">
              9:16 REEL
            </span>
          </div>

          {/* Center Play Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/70 border border-[#ff3b00]/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,59,0,0.4)]">
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#ff3b00] ml-0.5" />
            </div>
          </div>

          {/* Bottom simulated captions */}
          <div className="absolute bottom-3 inset-x-3 p-2.5 bg-black/85 backdrop-blur-md rounded border border-white/10 flex flex-col gap-1.5 pointer-events-none">
            <SkeletonText height="h-3.5" width="w-4/5" variant="bright" />
            <div className="flex items-center justify-between">
              <SkeletonText height="h-2.5" width="w-1/2" />
              <SkeletonBadge width="w-12" height="h-4" variant="cyan" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'contact-sheet') {
    return (
      <div className={`p-3.5 bg-[#141418] border border-white/15 rounded-lg flex items-center gap-4 shadow-md ${className}`} aria-hidden="true">
        <div className="relative w-24 sm:w-32 aspect-video rounded overflow-hidden shrink-0 border border-white/10">
          <SkeletonBox rounded="sm" className="w-full h-full" withCornerTicks />
          <span className="absolute top-1 left-1 font-mono text-[8px] bg-black/80 text-white/70 px-1 rounded">
            #{projectNumber}
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0 font-mono text-xs">
          <div className="flex items-center justify-between">
            <SkeletonBadge width="w-20" height="h-4" variant="cyan" />
            <SkeletonText height="h-2.5" width="w-12" />
          </div>
          <SkeletonText height="h-4" width="w-3/4" variant="bright" />
          <div className="flex items-center gap-3 text-white/40 text-[10px]">
            <SkeletonText height="h-3" width="w-24" />
            <SkeletonBadge width="w-14" height="h-3.5" variant="accent" />
          </div>
        </div>
      </div>
    );
  }

  // Default Standard & Retro Window Collage Card
  return (
    <div className={`flex flex-col bg-[#121216] border border-white/15 rounded-xl overflow-hidden shadow-2xl ${className}`} aria-hidden="true">
      {/* Retro Window Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#18181f] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[10px] text-white/70 ml-2 font-bold tracking-wider">
            PROJECT_{projectNumber}.MOV
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SkeletonBadge width="w-16" height="h-4" variant="accent" />
        </div>
      </div>

      {/* Media Aspect Area */}
      <div className={`relative ${aspectClass} w-full bg-[#16161c] overflow-hidden`}>
        <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks withScanlines />
        
        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/80 text-[#00e5ff] border border-white/10">
            PRORES 422
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#ff3b00]/90 text-white font-bold">
            16:9 DCI
          </span>
        </div>

        {/* Center Play Button with Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#ff3b00]/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,59,0,0.5)]">
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Timecode HUD */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none text-[9px] font-mono text-white/70 bg-black/70 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          <span className="text-[#00e5ff]">TC 00:01:24:18</span>
          <span className="text-[#ff3b00]">BUFFERING 4K FRAME...</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 bg-[#0e0e12] flex flex-col gap-3 flex-1 justify-between border-t border-white/5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <SkeletonText height="h-5" width="w-2/3" variant="bright" />
            <SkeletonText height="h-3" width="w-12" />
          </div>
          <SkeletonText height="h-3.5" width="w-1/2" />
        </div>

        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
          <SkeletonBadge width="w-14" height="h-4" />
          <SkeletonBadge width="w-16" height="h-4" />
          <SkeletonBadge width="w-12" height="h-4" variant="cyan" />
        </div>
      </div>
    </div>
  );
};
