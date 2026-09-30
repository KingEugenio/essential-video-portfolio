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
import { Monitor, Smartphone, Tablet, ExternalLink } from 'lucide-react';

export const ProjectPreviewModalSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Rendering responsive viewport preview..."
      className="flex flex-col gap-5 font-mono text-xs w-full"
    >
      {/* 1. Device Viewport Switcher Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#14141c] rounded-xl border border-white/15 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-[#ff3b00] text-white">
            <Monitor className="w-4 h-4" />
          </div>
          <div className="p-2 rounded bg-[#181824] text-white/50 border border-white/10">
            <Tablet className="w-4 h-4" />
          </div>
          <div className="p-2 rounded bg-[#181824] text-white/50 border border-white/10">
            <Smartphone className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SkeletonBadge width="w-28" height="h-6" variant="cyan" />
          <SkeletonButton width="w-24" height="h-8" rounded="md" />
        </div>
      </div>

      {/* 2. Device Frame Container */}
      <SkeletonRetroWindow
        title="RESPONSIVE_VIEWPORT // 1920x1080 [DESKTOP 16:9]"
        badge="CANVAS ACTIVE"
        withGlow
      >
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-lg bg-[#14141c] relative overflow-hidden flex items-center justify-center border border-white/10">
            <SkeletonBox rounded="none" className="w-full h-full" withCornerTicks withScanlines />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,59,0,0.6)]">
                <div className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white ml-0.5" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SkeletonText height="h-6" width="w-2/3" variant="bright" />
            <SkeletonText lines={3} height="h-3.5" gap="gap-2" />
          </div>
        </div>
      </SkeletonRetroWindow>
    </SkeletonContainer>
  );
};
