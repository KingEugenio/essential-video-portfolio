import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonPricingCard,
} from './SkeletonPrimitives';
import { Zap, Plus, DollarSign } from 'lucide-react';

export const AdminPricingSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading pricing packages and tiers..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="PRICING MATRIX // MULTI-CURRENCY CONVERSION ENGINE"
        timecode="00:00:00:00"
        format="USD • EUR • GBP • GHS • NGN"
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
        <SkeletonPricingCard isFeatured={false} tierName="DAY RATE EDITORIAL" />
        <SkeletonPricingCard isFeatured={true} tierName="COMMERCIAL MASTER" />
        <SkeletonPricingCard isFeatured={false} tierName="MUSIC VIDEO TURNKEY" />
      </div>
    </SkeletonContainer>
  );
};
