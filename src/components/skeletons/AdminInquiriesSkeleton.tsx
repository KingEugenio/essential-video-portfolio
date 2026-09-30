import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
} from './SkeletonPrimitives';
import { MessageSquare, Mail, Phone, Calendar, DollarSign, HardDrive, CheckCircle2 } from 'lucide-react';

export const AdminInquiriesSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading client commission inquiries..."
      className="space-y-6 font-mono text-xs"
    >
      {/* HUD Bar */}
      <SkeletonHudHeader
        statusText="INQUIRIES INBOX // TRANSMISSION PROTOCOL: ENCRYPTED"
        timecode="00:00:00:00"
        format="5 PENDING LEADS • AUTO-RESPONDER ACTIVE"
      />

      {/* 1. Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-72" variant="bright" />
          <SkeletonText height="h-3.5" width="w-96 max-w-full" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#13131a] p-1 rounded-md border border-white/10">
            <SkeletonBox rounded="sm" className="w-16 h-7" variant="accent" />
            <SkeletonBox rounded="sm" className="w-16 h-7" />
            <SkeletonBox rounded="sm" className="w-20 h-7" />
          </div>
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="cyan" />
        </div>
      </div>

      {/* 2. Split Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left Master List (5 cols) */}
        <div className="lg:col-span-5 bg-[#13131a] border border-white/15 rounded-xl p-4 flex flex-col gap-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-white font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#ff3b00]" />
              TRANSMISSION LOGS [5]
            </span>
            <span className="text-[#00e5ff] text-[10px]">SORT: NEWEST</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`p-3.5 rounded-lg border transition-all ${
                  i === 1
                    ? 'bg-[#1e1a24] border-[#ff3b00]/50 shadow-md'
                    : 'bg-[#181822] border-white/10'
                } flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/50">REF: TX-2026-00{i}</span>
                  <SkeletonBadge width="w-16" height="h-4" variant={i === 1 ? 'accent' : 'cyan'} />
                </div>
                <SkeletonText height="h-4" width="w-4/5" variant="bright" />
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <SkeletonText height="h-2.5" width="w-24" />
                  <span className="text-[#00e5ff] font-bold">$5K - $10K</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 bg-[#13131a] border border-white/15 rounded-xl p-6 flex flex-col justify-between gap-6 shadow-lg">
          <div className="space-y-6">
            {/* Header with Client Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SkeletonText height="h-6" width="w-48" variant="bright" />
                  <SkeletonBadge width="w-20" height="h-5" variant="accent" />
                </div>
                <SkeletonText height="h-3" width="w-56" />
              </div>

              <div className="flex items-center gap-2">
                <SkeletonButton width="w-24" height="h-8" rounded="md" variant="cyan" />
                <SkeletonButton width="w-24" height="h-8" rounded="md" />
              </div>
            </div>

            {/* Project Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#181824] rounded-lg border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40">BUDGET RANGE</span>
                <span className="text-[#00e5ff] font-bold block text-sm">$8,000 USD</span>
              </div>
              <div className="p-3 bg-[#181824] rounded-lg border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40">PROJECT TYPE</span>
                <span className="text-[#ff3b00] font-bold block text-sm">COMMERCIAL TVC</span>
              </div>
              <div className="p-3 bg-[#181824] rounded-lg border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-white/40">STORAGE INGEST</span>
                <span className="text-white font-bold block text-sm">GOOGLE DRIVE</span>
              </div>
            </div>

            {/* Brief Message Body */}
            <div className="space-y-2">
              <span className="text-white/60 text-[11px] font-bold uppercase">CLIENT CREATIVE BRIEF:</span>
              <div className="p-4 bg-[#181824] rounded-xl border border-white/10 space-y-2">
                <SkeletonText lines={4} height="h-3.5" gap="gap-2" />
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SkeletonBox rounded="md" className="w-8 h-8" />
              <SkeletonBox rounded="md" className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonButton width="w-36" height="h-10" rounded="lg" variant="accent" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};
