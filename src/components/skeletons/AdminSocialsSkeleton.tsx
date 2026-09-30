import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonCard,
} from './SkeletonPrimitives';
import { Share2, Plus, Globe } from 'lucide-react';

export const AdminSocialsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading social feeds and distribution channels..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="SOCIAL CHANNELS // SYNDICATION MATRIX"
        timecode="00:00:00:00"
        format="INSTAGRAM • VIMEO • YOUTUBE • WHATSAPP"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-64" variant="bright" />
          <SkeletonText height="h-3.5" width="w-80" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="accent" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { name: 'INSTAGRAM REELS', handle: '@ekopixels.studio', variant: 'accent' as const },
          { name: 'VIMEO 4K PRO', handle: 'vimeo.com/ekopixels', variant: 'cyan' as const },
          { name: 'YOUTUBE CINEMA', handle: 'youtube.com/@ekopixels', variant: 'bright' as const },
          { name: 'WHATSAPP DIRECT', handle: '+44 (0) 7911 123456', variant: 'default' as const },
        ].map((s, i) => (
          <div
            key={i}
            className="p-4 bg-[#13131a] border border-white/15 rounded-xl flex items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#181824] border border-white/10 flex items-center justify-center">
                <SkeletonBox rounded="md" className="w-5 h-5" variant={s.variant} />
              </div>
              <div className="space-y-1">
                <span className="text-white font-bold block">{s.name}</span>
                <span className="text-white/40 text-[10px]">{s.handle}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBox rounded="md" className="w-7 h-7" />
              <SkeletonBox rounded="md" className="w-7 h-7" variant="accent" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonContainer>
  );
};
