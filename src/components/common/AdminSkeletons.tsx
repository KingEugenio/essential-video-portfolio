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
import {
  Film,
  HardDrive,
  Sparkles,
  FolderOpen,
  Plus,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  Sliders,
  Globe,
  Palette,
  Type,
  Layout,
  Briefcase,
  Quote,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { GlassButton } from './GlassButton';

/**
 * 1. ADMIN OVERVIEW / DASHBOARD SKELETON
 */
export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-8 animate-fade-in" id="dashboard-skeleton" aria-busy="true">
    {/* Welcome Banner Skeleton */}
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[var(--brand-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-2 w-full max-w-lg">
        <Skeleton className="h-3 w-40 rounded" />
        <Skeleton className="h-8 sm:h-9 w-3/4 rounded-xl" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
      </div>
      <div className="flex flex-wrap gap-3">
        <SkeletonButton size="sm" width="130px" />
        <SkeletonButton size="sm" width="140px" />
      </div>
    </div>

    {/* Top Stats Banner */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <SkeletonCard key={i} className="p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="w-9 h-9 rounded-lg" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-8 sm:h-9 w-20 rounded-lg" />
            <Skeleton className="h-2.5 w-28 rounded" />
          </div>
        </SkeletonCard>
      ))}
    </div>

    {/* Two Column Grid: Enquiries + Drive Storage */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-48 rounded" />
          <Skeleton className="h-3.5 w-20 rounded" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] flex items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-4 w-12 rounded-full" />
                </div>
                <Skeleton className="h-3 w-4/5 rounded" />
                <Skeleton className="h-2.5 w-1/2 rounded" />
              </div>
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-44 rounded" />
          <Skeleton className="h-3.5 w-24 rounded" />
        </div>

        <SkeletonCard className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--brand-border)]">
            <div className="space-y-1">
              <Skeleton className="h-2.5 w-24 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
            <Skeleton className="w-3 h-3 rounded-full" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-32 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            ))}
          </div>
          <SkeletonButton size="sm" className="w-full" />
        </SkeletonCard>
      </div>
    </div>
  </div>
);

export const AdminOverviewSkeleton = DashboardSkeleton;

/**
 * 2. ADMIN PROJECTS VIEW SKELETON
 */
export const AdminProjectsSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" id="admin-projects-skeleton" aria-busy="true">
    {/* Action Bar & Filters Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-3.5 w-64 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonButton size="sm" width="140px" />
      </div>
    </div>

    {/* Filters Row */}
    <div className="glass-card p-4 rounded-xl border border-[var(--brand-border)] flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-40 rounded-lg" />
      </div>
    </div>

    {/* Table / Cards List */}
    <div className="glass-card rounded-2xl p-4 sm:p-6 border border-[var(--brand-border)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--brand-border)]">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-20 h-12 bg-white/10 rounded-lg shrink-0 overflow-hidden">
                <Skeleton className="w-full h-full rounded-none" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-48 rounded" />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * 3. ADMIN PROJECT EDIT MODAL SKELETON
 */
export const AdminProjectEditModalSkeleton: React.FC = () => (
  <div className="space-y-6 p-2 sm:p-4" aria-busy="true">
    {/* Tabs header */}
    <div className="flex items-center gap-2 border-b border-[var(--brand-border)] pb-3">
      {['Core Media', 'Story & Brief', 'Color Grade', 'Tech Specs'].map((tab, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-lg" />
      ))}
    </div>

    {/* Video & Poster Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-7 space-y-4">
        <SkeletonMedia aspectRatio="16:9" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-28 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      <div className="md:col-span-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <Skeleton className="h-3 w-32 rounded" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>

    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--brand-border)]">
      <SkeletonButton size="sm" width="90px" />
      <SkeletonButton size="sm" width="120px" />
    </div>
  </div>
);

/**
 * 4. MEDIA LIBRARY SKELETON
 */
export const MediaGridSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" id="media-skeleton" aria-busy="true">
    {/* Media Library Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-3.5 w-60 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonButton size="sm" width="130px" />
        <SkeletonButton size="sm" width="110px" />
      </div>
    </div>

    {/* Storage usage bar */}
    <div className="glass-card p-4 rounded-xl border border-[var(--brand-border)] space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-3.5 w-36 rounded" />
        <Skeleton className="h-3.5 w-24 rounded" />
      </div>
      <Skeleton className="h-2.5 w-full rounded-full" />
    </div>

    {/* Filter Pills */}
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {['All Assets', 'Google Drive (18)', 'Direct Stream (8)', 'Vimeo', 'YouTube'].map((f, i) => (
        <Skeleton key={i} className="h-8 w-28 rounded-full shrink-0" />
      ))}
    </div>

    {/* Media Items Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="glass-card p-3.5 rounded-xl space-y-3 border border-[var(--brand-border)]">
          <SkeletonMedia aspectRatio="16:9" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-1/4 rounded" />
              <Skeleton className="h-3 w-1/4 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AdminMediaLibrarySkeleton = MediaGridSkeleton;

/**
 * 5. GOOGLE DRIVE SYNC SKELETON
 */
export const AdminGoogleDriveSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-52 rounded-xl" />
        <Skeleton className="h-3.5 w-72 rounded" />
      </div>
      <SkeletonButton size="sm" width="130px" />
    </div>

    {/* Connection status banner */}
    <div className="glass-card p-5 rounded-2xl border border-[var(--brand-border)] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
      </div>
      <SkeletonButton size="sm" width="110px" />
    </div>

    {/* Folder tree & file grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 glass-card p-4 rounded-xl border border-[var(--brand-border)] space-y-3">
        <Skeleton className="h-4 w-28 rounded mb-2" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-3.5 w-32 rounded" />
          </div>
        ))}
      </div>

      <div className="lg:col-span-8 glass-card p-4 rounded-xl border border-[var(--brand-border)] space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
              <SkeletonMedia aspectRatio="16:9" />
              <Skeleton className="h-3.5 w-3/4 rounded" />
              <div className="flex justify-between">
                <Skeleton className="h-2.5 w-14 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * 6. WORDPRESS SYNC SKELETON
 */
export const AdminWordPressSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="space-y-1.5">
      <Skeleton className="h-8 w-60 rounded-xl" />
      <Skeleton className="h-3.5 w-80 rounded" />
    </div>

    <SkeletonCard className="p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-40 rounded" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-36 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-40 rounded" />
        <SkeletonButton size="sm" width="140px" />
      </div>
    </SkeletonCard>
  </div>
);

/**
 * 7. BRAND STUDIO SKELETON
 */
export const AdminBrandStudioSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="space-y-1.5">
      <Skeleton className="h-8 w-56 rounded-xl" />
      <Skeleton className="h-3.5 w-72 rounded" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 space-y-4">
        <SkeletonCard className="p-5 space-y-4">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-14 rounded-xl bg-white/10 p-2 space-y-1">
                <Skeleton className="h-2 w-10 rounded" />
                <Skeleton className="h-4 w-14 rounded" />
              </div>
            ))}
          </div>
        </SkeletonCard>

        <SkeletonCard className="p-5 space-y-3">
          <Skeleton className="h-4 w-28 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </SkeletonCard>
      </div>

      <div className="lg:col-span-6">
        <SkeletonCard className="p-6 space-y-4">
          <Skeleton className="h-4 w-36 rounded" />
          <div className="aspect-video w-full rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
            <Skeleton className="h-6 w-3/4 rounded" />
            <SkeletonText lines={3} size="sm" />
            <SkeletonButton size="sm" width="110px" />
          </div>
        </SkeletonCard>
      </div>
    </div>
  </div>
);

/**
 * 8. TYPOGRAPHY & LAYOUT SKELETONS
 */
export const AdminTypographySkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="space-y-1.5">
      <Skeleton className="h-8 w-60 rounded-xl" />
      <Skeleton className="h-3.5 w-80 rounded" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map(i => (
        <SkeletonCard key={i} className="p-5 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
          <SkeletonText lines={2} size="sm" />
        </SkeletonCard>
      ))}
    </div>
  </div>
);

export const AdminLayoutSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="space-y-1.5">
      <Skeleton className="h-8 w-52 rounded-xl" />
      <Skeleton className="h-3.5 w-64 rounded" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <SkeletonCard key={i} className="p-4 space-y-3 text-center">
          <div className="aspect-video w-full rounded-lg bg-white/10" />
          <Skeleton className="h-4 w-28 rounded mx-auto" />
          <Skeleton className="h-2.5 w-20 rounded mx-auto" />
        </SkeletonCard>
      ))}
    </div>
  </div>
);

/**
 * 9. SERVICES / TESTIMONIALS / ENQUIRIES / PROOFING ADMIN SKELETONS
 */
export const AdminServicesSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="flex justify-between items-center">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-3.5 w-60 rounded" />
      </div>
      <SkeletonButton size="sm" width="130px" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} className="p-5 space-y-4">
          <div className="flex justify-between">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <Skeleton className="h-5 w-3/4 rounded" />
          <SkeletonText lines={3} size="sm" />
          <SkeletonButton size="sm" className="w-full" />
        </SkeletonCard>
      ))}
    </div>
  </div>
);

export const AdminTestimonialsSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="flex justify-between items-center">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-3.5 w-56 rounded" />
      </div>
      <SkeletonButton size="sm" width="130px" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} className="p-5 space-y-4">
          <SkeletonText lines={3} size="sm" />
          <div className="flex items-center gap-3 pt-3 border-t border-[var(--brand-border)]">
            <SkeletonAvatar size="md" />
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-2.5 w-20 rounded" />
            </div>
          </div>
        </SkeletonCard>
      ))}
    </div>
  </div>
);

export const AdminEnquiriesSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="flex justify-between items-center">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-3.5 w-64 rounded" />
      </div>
      <Skeleton className="h-8 w-32 rounded-lg" />
    </div>
    <div className="glass-card rounded-2xl p-4 border border-[var(--brand-border)] space-y-3">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-3 w-4/5 rounded" />
          <Skeleton className="h-2.5 w-40 rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const AdminProofingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in" aria-busy="true">
    <div className="flex justify-between items-center">
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-52 rounded-xl" />
        <Skeleton className="h-3.5 w-72 rounded" />
      </div>
      <SkeletonButton size="sm" width="140px" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map(i => (
        <SkeletonCard key={i} className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Skeleton className="h-5 w-44 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <SkeletonMedia aspectRatio="16:9" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  </div>
);

export const AdminSetupWizardSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" aria-busy="true">
    <div className="space-y-2 text-center">
      <Skeleton className="h-8 w-64 rounded-xl mx-auto" />
      <Skeleton className="h-3.5 w-80 rounded mx-auto" />
    </div>
    {/* Stepper bar */}
    <div className="flex justify-between items-center px-4 py-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Skeleton key={i} className="w-8 h-8 rounded-full" />
      ))}
    </div>
    <SkeletonCard className="p-8 space-y-6">
      <Skeleton className="h-6 w-1/2 rounded" />
      <SkeletonText lines={4} size="sm" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="flex justify-between pt-4 border-t border-[var(--brand-border)]">
        <SkeletonButton size="md" width="100px" />
        <SkeletonButton size="md" width="140px" />
      </div>
    </SkeletonCard>
  </div>
);

export const AdminDocumentationSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl mx-auto" aria-busy="true">
    <div className="space-y-1.5">
      <Skeleton className="h-8 w-56 rounded-xl" />
      <Skeleton className="h-3.5 w-72 rounded" />
    </div>
    <SkeletonCard className="p-8 space-y-6">
      <Skeleton className="h-6 w-1/3 rounded" />
      <SkeletonText lines={4} size="base" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <SkeletonText lines={5} size="base" />
    </SkeletonCard>
  </div>
);

export const ProjectTableSkeleton = AdminProjectsSkeleton;

/**
 * EMPTY & ERROR STATES
 */
export interface AdminEmptyStateProps {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  id,
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) => (
  <div
    id={id}
    className="glass-card p-8 sm:p-12 text-center rounded-2xl border border-[var(--brand-border)] flex flex-col items-center justify-center max-w-xl mx-auto my-8 shadow-xl"
  >
    <div className="w-16 h-16 rounded-2xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-primary)] mb-4 shadow-md">
      {icon || <FolderOpen className="w-8 h-8 opacity-80" />}
    </div>
    <h3 className="text-xl font-bold font-heading text-[var(--brand-text)] tracking-tight">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-2 max-w-md leading-relaxed">
      {description}
    </p>

    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      {actionLabel && onAction && (
        <GlassButton variant="primary" size="sm" onClick={onAction} icon={<Plus className="w-4 h-4" />}>
          {actionLabel}
        </GlassButton>
      )}
      {secondaryLabel && onSecondaryAction && (
        <GlassButton variant="secondary" size="sm" onClick={onSecondaryAction}>
          {secondaryLabel}
        </GlassButton>
      )}
    </div>
  </div>
);

export const PublicEmptyState: React.FC<{
  title?: string;
  message?: string;
}> = ({
  title = 'CURATED COLLECTION EXPANDING',
  message = 'New cinematic commercials, film grades, and documentary edits are currently in finishing mastering.',
}) => (
  <div className="glass-card p-12 text-center my-12 max-w-2xl mx-auto rounded-2xl border border-[var(--brand-border)] shadow-2xl">
    <div className="w-14 h-14 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 flex items-center justify-center mx-auto mb-4">
      <Film className="w-6 h-6" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--brand-text)] tracking-tight">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-2.5 leading-relaxed">
      {message}
    </p>
  </div>
);
