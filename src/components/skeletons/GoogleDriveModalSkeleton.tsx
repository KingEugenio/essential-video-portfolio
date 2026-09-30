import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';
import { Cloud, Folder, HardDrive, RefreshCw } from 'lucide-react';

export const GoogleDriveModalSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Connecting to Google Drive and scanning video volumes..."
      className="space-y-4 font-mono text-xs"
    >
      {/* HUD Bar */}
      <SkeletonHudHeader
        statusText="GOOGLE DRIVE OAUTH // ACCESS: SECURE READ"
        timecode="00:00:00:00"
        format="CLOUD STORAGE BUFFERING"
        className="border-0 bg-[#161620] p-2"
      />

      {/* 1. Drive Header Info */}
      <div className="flex items-center justify-between p-3.5 bg-[#14141c] rounded-xl border border-white/15 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/20 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
            <Cloud className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <SkeletonText height="h-3.5" width="w-48" variant="bright" />
            <SkeletonText height="h-2.5" width="w-32" />
          </div>
        </div>
        <SkeletonBadge width="w-24" height="h-5" variant="cyan" />
      </div>

      {/* 2. Folder Navigation Breadcrumbs */}
      <div className="flex items-center gap-2 px-1 text-white/50 text-[11px]">
        <span className="text-[#ff3b00] font-bold">ROOT</span>
        <span>/</span>
        <SkeletonText height="h-3" width="w-20" />
        <span>/</span>
        <SkeletonText height="h-3" width="w-28" variant="cyan" />
      </div>

      {/* 3. Files List */}
      <div className="bg-[#121216] border border-white/15 rounded-xl divide-y divide-white/5 overflow-hidden shadow-lg">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-3.5 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#181824] border border-white/10 flex items-center justify-center shrink-0">
                <SkeletonBox rounded="md" className="w-5 h-5" variant={i % 2 === 0 ? 'accent' : 'cyan'} />
              </div>
              <div className="space-y-1 min-w-0">
                <SkeletonText height="h-3.5" width="w-56" variant="bright" />
                <div className="flex items-center gap-3 text-[10px] text-white/40">
                  <span>PRORES 422</span>
                  <span>•</span>
                  <span>1.42 GB</span>
                  <span>•</span>
                  <span>MODIFIED TODAY</span>
                </div>
              </div>
            </div>
            <SkeletonButton width="w-24" height="h-8" rounded="md" variant={i === 1 ? 'accent' : 'default'} />
          </div>
        ))}
      </div>
    </SkeletonContainer>
  );
};
