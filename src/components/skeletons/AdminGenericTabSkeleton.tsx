import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';

interface AdminGenericTabSkeletonProps {
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'form' | 'table';
  itemsCount?: number;
}

export const AdminGenericTabSkeleton: React.FC<AdminGenericTabSkeletonProps> = ({
  title = 'SECTION CONFIGURATION',
  subtitle = 'Manage settings, parameters, and portfolio attributes.',
  layout = 'grid',
  itemsCount = 4,
}) => {
  return (
    <SkeletonContainer
      label={`Loading ${title}...`}
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText={`CMS MODULE // ${title.toUpperCase()}`}
        timecode="00:00:00:00"
        format="AUTO-PERSIST // ENCRYPTED STORAGE"
      />

      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-64" variant="bright" />
          <SkeletonText height="h-3.5" width="w-80" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonButton width="w-28" height="h-9" rounded="md" />
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="accent" />
        </div>
      </div>

      {layout === 'form' ? (
        <div className="p-6 bg-[#13131a] border border-white/15 rounded-xl space-y-5 shadow-lg max-w-3xl">
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
            <SkeletonBox rounded="md" className="w-full h-24" />
          </div>
          <div className="pt-3 border-t border-white/10 flex justify-end">
            <SkeletonButton width="w-36" height="h-10" rounded="md" variant="accent" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: itemsCount }).map((_, i) => (
            <div
              key={i}
              className="p-5 bg-[#13131a] border border-white/15 rounded-xl flex flex-col justify-between gap-4 shadow-lg min-h-[220px]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <SkeletonBadge width="w-16" height="h-4" variant={i % 2 === 0 ? 'accent' : 'cyan'} />
                  <SkeletonBox rounded="md" className="w-6 h-6" />
                </div>
                <SkeletonText height="h-5" width="w-4/5" variant="bright" />
                <SkeletonText lines={2} height="h-3" gap="gap-1.5" />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <SkeletonText height="h-3" width="w-20" />
                <SkeletonButton width="w-24" height="h-7" rounded="md" />
              </div>
            </div>
          ))}
        </div>
      )}
    </SkeletonContainer>
  );
};
