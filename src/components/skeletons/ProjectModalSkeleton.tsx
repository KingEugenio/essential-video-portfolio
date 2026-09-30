import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonBadge, SkeletonButton, SkeletonContainer, SkeletonHudHeader } from './SkeletonPrimitives';
import { Film, X } from 'lucide-react';

interface ProjectModalSkeletonProps {
  onClose?: () => void;
}

export const ProjectModalSkeleton: React.FC<ProjectModalSkeletonProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col my-auto shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        <div className="w-full flex-1 flex flex-col max-h-[92vh] bg-[#0c0c10] rounded-xl border border-white/20 overflow-hidden shadow-2xl">
          {/* Retro Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#16161e] border-b border-white/10 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="h-4 w-px bg-white/15 mx-1" />
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span className="font-mono text-xs text-white/80 font-bold tracking-wider">
                  CASE_STUDY_INSPECTOR // PRORES MASTER
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#ff3b00]/20 text-[#ff3b00] border border-[#ff3b00]/40 font-mono text-[10px] font-bold">
                STREAMING 4K
              </span>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <SkeletonContainer label="Loading project case study..." className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-6">
            {/* Top Retro HUD Buffer Status Banner */}
            <SkeletonHudHeader
              statusText="BUFFERING COLOR GRADE // PRORES 4444 XQ [REC.709]"
              timecode="00:00:00:00"
              format="3840x2160 • 24.00 FPS • DOLBY 5.1"
            />

            {/* Top Video Format Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded bg-[#ff3b00] text-white font-mono text-xs font-bold">
                  MASTER CUT [16:9]
                </span>
                <span className="px-3 py-1.5 rounded bg-[#16161e] border border-white/10 text-white/60 font-mono text-xs">
                  SOCIAL REEL [9:16]
                </span>
                <span className="px-3 py-1.5 rounded bg-[#16161e] border border-white/10 text-white/60 font-mono text-xs">
                  TEASER [1:1]
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 font-mono text-xs font-bold">
                PRORES 422 HQ
              </span>
            </div>

            {/* Main Video Player Container (16:9) */}
            <div className="w-full rounded-lg overflow-hidden border border-white/20 p-2 sm:p-3 bg-[#08080a]">
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-[#14141a] flex items-center justify-center border border-white/10">
                <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks />
                
                {/* Center Play indicator with warm glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,59,0,0.6)]">
                    <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1" />
                  </div>
                </div>

                {/* Simulated Scrubber Bar */}
                <div className="absolute bottom-3 inset-x-4 flex flex-col gap-1.5 bg-black/80 p-2.5 rounded border border-white/10 backdrop-blur-md">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-[#ff3b00] rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#00e5ff]">TC 00:00:12:08</span>
                    <span className="text-white/60">00:03:15:00 [24.00 FPS]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Overview Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Left Column: Description & Approach */}
              <div className="md:col-span-8 flex flex-col gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <SkeletonBadge width="w-24" height="h-5" variant="cyan" />
                    <SkeletonBadge width="w-20" height="h-5" variant="accent" />
                  </div>
                  <SkeletonText height="h-8" width="w-3/4" variant="bright" className="mb-3" />
                  <SkeletonText lines={3} height="h-4" gap="gap-2.5" />
                </div>

                <div className="p-4 bg-[#14141c] rounded-lg border border-white/15 flex flex-col gap-3">
                  <span className="font-mono text-xs text-[#ff3b00] font-bold tracking-wider uppercase">
                    EDITORIAL EDITING APPROACH
                  </span>
                  <SkeletonText lines={2} height="h-3.5" gap="gap-2" />
                </div>

                {/* Deliverables chips */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-xs text-white/50 uppercase">DELIVERABLE ASSETS</span>
                  <div className="flex flex-wrap gap-2">
                    <SkeletonBadge width="w-28" height="h-6" variant="cyan" />
                    <SkeletonBadge width="w-32" height="h-6" variant="accent" />
                    <SkeletonBadge width="w-24" height="h-6" />
                    <SkeletonBadge width="w-36" height="h-6" />
                  </div>
                </div>
              </div>

              {/* Right Column: Project Metadata & Credits */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="p-4 bg-[#14141c] rounded-lg border border-white/15 flex flex-col gap-3 font-mono text-xs">
                  <span className="text-[#00e5ff] font-bold uppercase tracking-wider">
                    SPECIFICATIONS
                  </span>
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/40">CLIENT:</span>
                      <SkeletonText height="h-3.5" width="w-24" variant="bright" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">YEAR:</span>
                      <SkeletonText height="h-3.5" width="w-16" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">RATIO:</span>
                      <span className="text-[#ff3b00] font-bold">16:9 NATIVE</span>
                    </div>
                  </div>
                </div>

                {/* Credits Grid */}
                <div className="p-4 bg-[#14141c] rounded-lg border border-white/15 flex flex-col gap-2.5 font-mono text-xs">
                  <span className="text-white/80 font-bold uppercase tracking-wider">CREDITS &amp; ROLES</span>
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/40">EDITOR:</span>
                      <span className="text-white font-bold">EKO PIXELS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">COLORIST:</span>
                      <span className="text-[#00e5ff]">DAVINCI RESOLVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SkeletonContainer>
        </div>
      </div>
    </div>
  );
};
