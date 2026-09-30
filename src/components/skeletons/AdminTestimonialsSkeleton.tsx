import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonTestimonialCard,
} from './SkeletonPrimitives';
import { MessageSquare, Plus, Star } from 'lucide-react';

export const AdminTestimonialsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading client endorsements and testimonials..."
      className="space-y-6 font-mono text-xs"
    >
      <SkeletonHudHeader
        statusText="CLIENT TESTIMONIALS // REPUTATION MATRIX"
        timecode="00:00:00:00"
        format="5-STAR RATINGS • VERIFIED DIRECTORS"
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
        <SkeletonTestimonialCard />
        <SkeletonTestimonialCard />
        <SkeletonTestimonialCard />
      </div>
    </SkeletonContainer>
  );
};
