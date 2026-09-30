import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';
import { Film, Plus, Filter, Search, Eye } from 'lucide-react';

export const AdminProjectsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading projects and cuts directory..."
      className="flex flex-col gap-6 font-mono text-xs"
    >
      {/* Stream Buffer HUD Header */}
      <SkeletonHudHeader
        statusText="PROJECT CUTS REPOSITORY // VAULT DIRECTORY: /PROJECTS/MASTER_DELIVERABLES"
        timecode="00:00:00:00"
        format="PRORES 422 HQ • MULTI-FORMAT MATRIX"
      />

      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-64" variant="bright" />
          <SkeletonText height="h-3.5" width="w-80" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="accent" />
          <SkeletonButton width="w-36" height="h-9" rounded="md" variant="cyan" />
        </div>
      </div>

      {/* 2. Search, Status, & Layout Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#13131a] p-3 rounded-xl border border-white/15">
        <div className="flex-1 max-w-md">
          <SkeletonBox rounded="md" className="w-full h-9" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[#181824] p-1 rounded-md border border-white/10">
            <SkeletonBox rounded="sm" className="w-14 h-7" variant="accent" />
            <SkeletonBox rounded="sm" className="w-20 h-7" />
            <SkeletonBox rounded="sm" className="w-16 h-7" />
          </div>
          <div className="flex items-center gap-1 bg-[#181824] p-1 rounded-md border border-white/10">
            <SkeletonBox rounded="sm" className="w-7 h-7" />
            <SkeletonBox rounded="sm" className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 3. Projects Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#13131a] border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg"
          >
            {/* Thumbnail Preview Area */}
            <div className="relative aspect-video bg-[#1a1a24] w-full overflow-hidden border-b border-white/10">
              <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks withScanlines />
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                <SkeletonBadge width="w-20" height="h-4" variant={i % 2 === 0 ? 'accent' : 'cyan'} />
                <SkeletonBadge width="w-14" height="h-4" variant="bright" />
              </div>
              <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between text-[9px] text-white/60 bg-black/60 px-1.5 py-0.5 rounded">
                <span>CUT 0{i}</span>
                <span>16:9 DCI</span>
              </div>
            </div>

            {/* Details Area */}
            <div className="p-4 flex flex-col gap-3">
              <div className="space-y-1.5">
                <SkeletonText height="h-5" width="w-4/5" variant="bright" />
                <div className="flex items-center justify-between">
                  <SkeletonText height="h-3" width="w-24" />
                  <SkeletonText height="h-3" width="w-12" variant="cyan" />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <SkeletonBadge width="w-12" height="h-4" />
                  <SkeletonBadge width="w-16" height="h-4" variant="accent" />
                </div>
                <div className="flex items-center gap-1.5">
                  <SkeletonBox rounded="md" className="w-7 h-7" />
                  <SkeletonBox rounded="md" className="w-7 h-7" />
                  <SkeletonBox rounded="md" className="w-7 h-7" variant="accent" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonContainer>
  );
};
