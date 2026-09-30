import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonInput,
} from './SkeletonPrimitives';
import { Send, Phone, Mail, ShieldCheck } from 'lucide-react';

export const AdminContactSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading contact settings and transmission routing..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="CONTACT ROUTING // TRANSMISSION PROTOCOL"
        timecode="00:00:00:00"
        format="RATE LIMITING • EMAIL DISPATCH • WHATSAPP FAST-TRACK"
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

      <div className="p-6 bg-[#13131a] border border-white/15 rounded-xl space-y-6 shadow-lg max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SkeletonInput label="OPERATOR INTAKE EMAIL" />
          <SkeletonInput label="WHATSAPP FAST-TRACK NUMBER" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SkeletonInput label="STUDIO LOCATION ADDRESS" />
          <SkeletonInput label="RESPONSE TIME SLA TEXT" />
        </div>
        <div className="p-4 bg-[#181824] rounded-lg border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-white/60 font-bold">CLIENT RATE LIMITING (ANTISPAM):</span>
            <SkeletonBadge width="w-20" height="h-4" variant="cyan" />
          </div>
          <SkeletonText lines={2} height="h-3" gap="gap-1.5" />
        </div>
        <div className="pt-2 flex justify-end">
          <SkeletonButton width="w-36" height="h-10" rounded="md" variant="accent" />
        </div>
      </div>
    </SkeletonContainer>
  );
};
