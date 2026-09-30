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
import { Layers, Plus, Check } from 'lucide-react';

export const AdminServicesSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading production pipeline services..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="SERVICES &amp; PIPELINE SUITE // WORKFLOWS: END-TO-END POST"
        timecode="00:00:00:00"
        format="COMMERCIAL • MUSIC VIDEO • NARRATIVE"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} withGlow={i === 1} className="flex flex-col justify-between gap-6 min-h-[360px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <SkeletonText height="h-6" width="w-3/4" variant="bright" />
                <SkeletonBadge width="w-20" height="h-5" variant={i === 1 ? 'accent' : 'cyan'} />
              </div>
              <SkeletonText lines={3} height="h-3.5" gap="gap-2" />

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {[1, 2, 3, 4].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <SkeletonBox rounded="full" className="w-3.5 h-3.5" variant={i === 1 ? 'accent' : 'cyan'} />
                    <SkeletonText height="h-3" width={f % 2 === 0 ? 'w-4/5' : 'w-3/4'} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <SkeletonText height="h-5" width="w-20" variant="bright" />
              <div className="flex items-center gap-2">
                <SkeletonBox rounded="md" className="w-7 h-7" />
                <SkeletonBox rounded="md" className="w-7 h-7" variant="accent" />
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </SkeletonContainer>
  );
};
