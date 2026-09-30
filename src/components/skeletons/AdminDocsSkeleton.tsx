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
import { FileText, BookOpen, Code, Terminal } from 'lucide-react';

export const AdminDocsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading operator studio documentation..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="DOCUMENTATION VIEWER // SYSTEM MANUAL: V2.4"
        timecode="00:00:00:00"
        format="MARKDOWN • API SCHEMAS • CMS GUIDE"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nav sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-[#13131a] border border-white/15 rounded-xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white font-bold">
            <BookOpen className="w-4 h-4 text-[#ff3b00]" />
            <span>OPERATOR MANUALS</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border ${
                  i === 1 ? 'bg-[#1e1822] border-[#ff3b00]/40' : 'bg-[#181822] border-white/5'
                } flex items-center justify-between`}
              >
                <SkeletonText height="h-3.5" width="w-3/4" variant={i === 1 ? 'accent' : 'default'} />
                <SkeletonBadge width="w-12" height="h-4" variant="cyan" />
              </div>
            ))}
          </div>
        </div>

        {/* Content body (8 cols) */}
        <div className="lg:col-span-8">
          <SkeletonRetroWindow
            title="DOCS_RENDERER // CMS_MANUAL.MD"
            badge="READ ONLY"
          >
            <div className="space-y-4">
              <SkeletonText height="h-6" width="w-2/3" variant="bright" />
              <SkeletonText lines={4} height="h-3.5" gap="gap-2" />
              <div className="p-4 bg-[#181824] rounded-lg border border-white/10 space-y-2">
                <SkeletonText height="h-3" width="w-40" variant="cyan" />
                <SkeletonText lines={2} height="h-3" gap="gap-1.5" />
              </div>
              <SkeletonText lines={3} height="h-3.5" gap="gap-2" />
            </div>
          </SkeletonRetroWindow>
        </div>
      </div>
    </SkeletonContainer>
  );
};
