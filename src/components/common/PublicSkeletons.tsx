import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonButton,
  SkeletonBadge,
  SkeletonAvatar,
  SkeletonMedia,
  SkeletonCard,
} from './SkeletonPrimitives';
import { useTheme } from '../../context/ThemeContext';
import { HeroLayoutType, PortfolioCardStyle } from '../../types';

/**
 * 1. HERO SECTION SKELETON (Layout-Aware)
 */
export const HeroSectionSkeleton: React.FC<{ layoutType?: HeroLayoutType }> = ({
  layoutType,
}) => {
  const { theme } = useTheme();
  const activeLayout = layoutType || theme.layout.heroLayout || 'type-video';

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* LAYOUT A: Type + Video Stage */}
      {activeLayout === 'type-video' && (
        <div className="flex flex-col items-center text-center gap-8">
          {/* Status Badge */}
          <SkeletonBadge width="160px" height="28px" />

          {/* Headline & Subtitle */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-4">
            <Skeleton className="h-12 sm:h-16 w-4/5 max-w-3xl rounded-xl" />
            <Skeleton className="h-10 sm:h-14 w-2/3 max-w-2xl rounded-xl" />
            <SkeletonText lines={2} lastLineWidth="50%" className="w-full max-w-xl mx-auto mt-2" size="sm" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SkeletonButton size="lg" width="200px" pill />
            <SkeletonButton size="lg" width="170px" pill />
          </div>

          {/* Featured Video Stage */}
          <div className="w-full max-w-5xl mt-6">
            <div className="glass-card p-2 sm:p-3 rounded-2xl border border-[var(--brand-border)] shadow-2xl">
              <SkeletonMedia aspectRatio="16:9" />
              <div className="mt-3 px-2 flex items-center justify-between">
                <div className="space-y-1.5 w-1/3">
                  <Skeleton className="h-3 w-28 rounded" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT B: Fullscreen Showreel */}
      {activeLayout === 'fullscreen-showreel' && (
        <div className="relative rounded-3xl overflow-hidden border border-[var(--brand-border)] min-h-[70vh] flex items-end p-6 sm:p-12 shadow-2xl bg-neutral-950">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-40" />
          <div className="relative z-10 max-w-2xl w-full glass-card p-6 sm:p-8 space-y-4 border border-white/20">
            <SkeletonBadge width="140px" height="24px" />
            <Skeleton className="h-10 sm:h-14 w-3/4 rounded-xl" />
            <SkeletonText lines={2} size="sm" />
            <div className="flex flex-wrap gap-3 pt-2">
              <SkeletonButton size="md" width="180px" />
              <SkeletonButton size="md" width="140px" />
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT C: Split Profile + Video */}
      {activeLayout === 'split-profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <SkeletonAvatar size="xl" shape="rounded" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl" />
              <Skeleton className="h-5 w-1/2 rounded" />
            </div>
            <SkeletonText lines={3} size="sm" />
            <div className="flex flex-wrap gap-3">
              <SkeletonButton size="md" width="150px" />
              <SkeletonButton size="md" width="130px" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--brand-border)]">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-7 w-12 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="glass-card p-3 rounded-2xl border border-[var(--brand-border)] shadow-2xl">
              <SkeletonMedia aspectRatio="16:9" />
              <div className="p-3 flex items-center justify-between">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT D: Minimal Editorial */}
      {activeLayout === 'minimal-editorial' && (
        <div className="py-8 border-b border-[var(--brand-border)] flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 w-full max-w-xl">
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-12 sm:h-16 w-4/5 rounded-xl" />
              <Skeleton className="h-6 w-1/2 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonButton size="md" width="110px" />
              <SkeletonButton size="md" width="100px" />
            </div>
          </div>
          <SkeletonText lines={2} lastLineWidth="70%" size="base" className="max-w-3xl" />
        </div>
      )}
    </section>
  );
};

/**
 * 2. PORTFOLIO SECTION SKELETON (Style-Aware)
 */
export const PortfolioSectionSkeleton: React.FC<{
  cardStyle?: PortfolioCardStyle;
}> = ({ cardStyle }) => {
  const { theme } = useTheme();
  const activeStyle = cardStyle || theme.layout.portfolioCardStyle || 'grid';

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
          <Skeleton className="h-10 sm:h-12 w-64 rounded-xl" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Commercials', 'Music Videos', 'Documentaries', 'Social', 'Color Grading'].map(
            (cat, idx) => (
              <Skeleton
                key={idx}
                className="h-8 rounded-full shrink-0"
                style={{ width: `${cat.length * 9 + 32}px` }}
              />
            )
          )}
        </div>
      </div>

      {/* Grid Based on Card Style */}
      {activeStyle === 'large-feature' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="glass-card rounded-[var(--card-radius,12px)] overflow-hidden border border-[var(--brand-border)] flex flex-col"
            >
              <SkeletonMedia aspectRatio="16:9" />
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-12 rounded" />
                  </div>
                  <Skeleton className="h-7 w-3/4 rounded" />
                  <SkeletonText lines={2} size="sm" />
                </div>
                <div className="pt-3 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-20 rounded" />
                    <Skeleton className="h-5 w-16 rounded" />
                  </div>
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activeStyle === 'editorial' ? (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="glass-card p-4 sm:p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center border border-[var(--brand-border)]"
            >
              <div className="md:col-span-5">
                <SkeletonMedia aspectRatio="16:9" />
              </div>
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
                <Skeleton className="h-8 w-4/5 rounded-xl" />
                <SkeletonText lines={2} size="sm" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard Responsive Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="glass-card rounded-[var(--card-radius,12px)] overflow-hidden border border-[var(--brand-border)] flex flex-col"
            >
              <SkeletonMedia aspectRatio="16:9" />
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28 rounded" />
                  <Skeleton className="h-5 w-4/5 rounded" />
                </div>
                <div className="pt-2 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <Skeleton className="h-3.5 w-20 rounded" />
                  <Skeleton className="h-3.5 w-14 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

/**
 * 3. SERVICES SECTION SKELETON
 */
export const ServicesSectionSkeleton: React.FC = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
      <Skeleton className="h-3.5 w-32 rounded mx-auto" />
      <Skeleton className="h-10 sm:h-12 w-3/4 max-w-md rounded-xl mx-auto" />
      <SkeletonText lines={2} size="sm" className="max-w-lg mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <SkeletonCard key={i} className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-6 w-4/5 rounded" />
            <SkeletonText lines={3} size="sm" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--brand-border)]">
            <SkeletonButton size="sm" className="w-full" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  </section>
);

/**
 * 3.5. PRICING SECTION SKELETON
 */
export const PricingSectionSkeleton: React.FC = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div className="space-y-3 max-w-xl">
        <SkeletonBadge width="160px" height="26px" />
        <Skeleton className="h-10 sm:h-12 w-3/4 rounded-xl" />
        <SkeletonText lines={2} size="sm" />
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-8 w-14 rounded-lg" />
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} className="p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <SkeletonText lines={2} size="xs" />
            </div>
            <div className="py-4 border-y border-[var(--brand-border)] space-y-2">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            <div className="space-y-2.5 pt-2">
              {[1, 2, 3, 4, 5].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Skeleton className="w-3.5 h-3.5 rounded-full" />
                  <Skeleton className="h-3 w-4/5 rounded" />
                </div>
              ))}
            </div>
          </div>
          <SkeletonButton size="md" className="w-full" />
        </SkeletonCard>
      ))}
    </div>
  </section>
);

/**
 * 4. ABOUT SECTION SKELETON
 */
export const AboutSectionSkeleton: React.FC = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Portrait */}
      <div className="lg:col-span-5">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card border border-[var(--brand-border)]">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      </div>

      {/* Right Column: Bio & Stats */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-28 rounded" />
          <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl" />
          <Skeleton className="h-5 w-1/2 rounded" />
        </div>

        <SkeletonText lines={4} size="base" gap="gap-3" />
        <SkeletonText lines={3} size="base" gap="gap-3" />

        {/* Software Stack Icons */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-32 rounded" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-8 w-24 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <SkeletonButton size="md" width="160px" />
          <SkeletonButton size="md" width="140px" />
        </div>
      </div>
    </div>
  </section>
);

/**
 * 5. TESTIMONIALS SECTION SKELETON
 */
export const TestimonialsSectionSkeleton: React.FC = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
      <Skeleton className="h-3.5 w-28 rounded mx-auto" />
      <Skeleton className="h-10 w-64 rounded-xl mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <Skeleton key={s} className="w-4 h-4 rounded" />
              ))}
            </div>
            <SkeletonText lines={4} size="sm" />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[var(--brand-border)]">
            <SkeletonAvatar size="md" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
          </div>
        </SkeletonCard>
      ))}
    </div>
  </section>
);

/**
 * 6. ENQUIRY / BOOKING SECTION SKELETON
 */
export const EnquirySectionSkeleton: React.FC = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl" />
          <SkeletonText lines={3} size="sm" />
        </div>

        <div className="space-y-3 pt-4">
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-3.5 w-44 rounded" />
          </div>
          <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-3.5 w-40 rounded" />
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7">
        <SkeletonCard className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-32 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Skeleton className="h-3 w-36 rounded" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>

          <SkeletonButton size="lg" className="w-full" />
        </SkeletonCard>
      </div>
    </div>
  </section>
);

/**
 * 7. PROJECT DETAIL MODAL SKELETON
 */
export const ProjectDetailModalSkeleton: React.FC<{
  onClose?: () => void;
}> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-fade-in"
      onClick={onClose}
    />

    <div
      className="relative w-full max-w-6xl glass-card bg-neutral-950/95 border border-[var(--brand-border)] p-4 sm:p-8 shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto flex flex-col gap-8"
      style={{ borderRadius: 'var(--card-radius)' }}
      aria-busy="true"
    >
      {/* Sticky Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--brand-border)]">
        <Skeleton className="h-4 w-32 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Hero Video Stage */}
      <div className="w-full">
        <SkeletonMedia aspectRatio="16:9" />
      </div>

      {/* Grid: Story + Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-3.5 w-36 rounded" />
            <Skeleton className="h-9 sm:h-12 w-4/5 rounded-xl" />
            <SkeletonText lines={3} size="base" gap="gap-2.5" />
          </div>

          {/* Brief Card Skeleton */}
          <div className="p-5 rounded-xl glass-surface border border-[var(--brand-border)] space-y-3">
            <Skeleton className="h-4 w-48 rounded" />
            <SkeletonText lines={3} size="sm" />
          </div>

          {/* Approach Card Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-52 rounded" />
            <SkeletonText lines={4} size="sm" />
          </div>

          {/* Stills Gallery Skeleton */}
          <div className="pt-4 border-t border-[var(--brand-border)] space-y-4">
            <Skeleton className="h-5 w-44 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SkeletonMedia aspectRatio="16:9" showPlayButton={false} showBadges={false} />
              <SkeletonMedia aspectRatio="16:9" showPlayButton={false} showBadges={false} />
            </div>
          </div>
        </div>

        {/* Right Column Meta (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-surface p-5 rounded-2xl border border-[var(--brand-border)] space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-28 rounded" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-6 w-28 rounded" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[var(--brand-border)] space-y-3 text-center">
            <Skeleton className="w-8 h-8 rounded-full mx-auto" />
            <Skeleton className="h-4 w-3/4 rounded mx-auto" />
            <SkeletonText lines={2} size="xs" />
            <SkeletonButton size="sm" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 8. CLIENT PROOFING VIEW SKELETON
 */
export const ClientProofingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] flex flex-col" aria-busy="true">
    {/* Top Proofing Bar */}
    <header className="sticky top-0 z-40 bg-[var(--brand-surface)]/95 border-b border-[var(--brand-border)] px-4 sm:px-6 py-3 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-5 w-48 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-36 rounded-lg" />
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>
    </header>

    {/* Main Proofing Workspace */}
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Player & Action Bar (8 cols) */}
      <div className="lg:col-span-8 space-y-5">
        <SkeletonMedia aspectRatio="16:9" />

        <SkeletonCard className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-44 rounded" />
              <Skeleton className="h-3 w-64 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <SkeletonButton size="sm" width="110px" />
            <SkeletonButton size="sm" width="100px" />
          </div>
        </SkeletonCard>

        <div className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] space-y-2">
          <Skeleton className="h-3.5 w-40 rounded" />
          <SkeletonText lines={2} size="xs" />
        </div>
      </div>

      {/* Right Column: Comments Thread (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        <SkeletonCard className="p-4 sm:p-5 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-3.5 w-32 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <SkeletonButton size="sm" className="w-full" />
        </SkeletonCard>

        <div className="space-y-3">
          <div className="flex justify-between px-1">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>

          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="p-3.5 rounded-xl glass-card border border-[var(--brand-border)] space-y-2"
            >
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-14 rounded" />
              </div>
              <SkeletonText lines={2} size="xs" />
              <div className="flex justify-between pt-1">
                <Skeleton className="h-2.5 w-20 rounded" />
                <Skeleton className="h-2.5 w-14 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

/**
 * 9. FULL PUBLIC PAGE SKELETON
 */
export const PublicPageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] animate-fade-in" aria-busy="true">
    {/* Header Skeleton */}
    <header className="sticky top-0 z-40 bg-[var(--brand-surface)]/80 backdrop-blur-xl border-b border-[var(--brand-border)] px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-5 w-36 rounded" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="sm" width="110px" pill />
        </div>
      </div>
    </header>

    <main>
      <HeroSectionSkeleton />
      <PortfolioSectionSkeleton />
      <ServicesSectionSkeleton />
      <PricingSectionSkeleton />
      <AboutSectionSkeleton />
      <TestimonialsSectionSkeleton />
      <EnquirySectionSkeleton />
    </main>
  </div>
);
