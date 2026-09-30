import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';
import { Cloud, CheckCircle, RefreshCw, Key, ShieldCheck } from 'lucide-react';

export const AdminIntegrationsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading cloud storage and streaming integrations..."
      className="space-y-6 font-mono text-xs"
    >
      {/* HUD Header */}
      <SkeletonHudHeader
        statusText="INGESTION &amp; CLOUD PIPELINE INTEGRATIONS // PROTOCOL: REST / OAUTH2"
        timecode="00:00:00:00"
        format="GOOGLE DRIVE • FRAME.IO • WORDPRESS • DROPBOX"
      />

      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-72" variant="bright" />
          <SkeletonText height="h-3.5" width="w-96 max-w-full" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="accent" />
        </div>
      </div>

      {/* 2. Integrations Cards Grid (4 providers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'GOOGLE DRIVE & WORKSPACE', badge: 'CONNECTED', variant: 'accent' as const },
          { name: 'FRAME.IO REVIEW & C2C', badge: 'STANDBY', variant: 'cyan' as const },
          { name: 'WORDPRESS MEDIA SYNC', badge: 'ACTIVE', variant: 'bright' as const },
          { name: 'DROPBOX TRANSFER & ASPERA', badge: 'OPTIONAL', variant: 'default' as const },
        ].map((provider, i) => (
          <div
            key={i}
            className="bg-[#13131a] border border-white/15 rounded-xl p-5 flex flex-col justify-between gap-5 shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#181824] border border-white/10 flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-[#00e5ff]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-white font-bold text-sm block">{provider.name}</span>
                    <SkeletonText height="h-2.5" width="w-28" />
                  </div>
                </div>
                <SkeletonBadge width="w-20" height="h-5" variant={provider.variant} />
              </div>

              <div className="space-y-2">
                <SkeletonText lines={2} height="h-3.5" gap="gap-1.5" />
              </div>

              <div className="p-3 bg-[#181824] rounded-lg border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/40">API TOKEN / OAUTH CREDENTIAL:</span>
                  <span className="text-emerald-400 font-bold">CONFIGURED</span>
                </div>
                <SkeletonBox rounded="md" className="w-full h-8" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <SkeletonText height="h-3" width="w-32" />
              <div className="flex items-center gap-2">
                <SkeletonButton width="w-24" height="h-8" rounded="md" />
                <SkeletonButton width="w-28" height="h-8" rounded="md" variant="accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonContainer>
  );
};
