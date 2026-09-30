import React from 'react';
import { Film, Radio, Sliders, Volume2, ChevronDown, Check, Star, MapPin, Zap } from 'lucide-react';

export interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Base Shimmer Box for building high-visibility cinematic skeletons.
 */
export const SkeletonBox: React.FC<{
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  style?: React.CSSProperties;
  variant?: 'default' | 'accent' | 'cyan' | 'dark' | 'bright';
  withCornerTicks?: boolean;
  withScanlines?: boolean;
}> = ({ 
  className = '', 
  rounded = 'md', 
  style, 
  variant = 'default',
  withCornerTicks = false,
  withScanlines = false,
}) => {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }[rounded];

  const variantBorder = {
    default: 'border-white/15 bg-[#1b1b22] skeleton-shimmer-subtle',
    accent: 'border-[#ff3b00]/35 bg-[#221714] skeleton-shimmer-accent',
    cyan: 'border-[#00e5ff]/35 bg-[#121f24] skeleton-shimmer-cyan',
    dark: 'border-white/10 bg-[#141418] skeleton-shimmer-subtle',
    bright: 'border-white/25 bg-[#252530] skeleton-shimmer-subtle',
  }[variant];

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative overflow-hidden border ${roundedClass} ${variantBorder} ${className}`}
    >
      {/* Dynamic dual-gradient sweep */}
      <div className="absolute inset-0 skeleton-shimmer pointer-events-none" />

      {/* Subtle CRT Scanline overlay */}
      {withScanlines && (
        <div className="absolute inset-0 skeleton-scanline pointer-events-none opacity-40" />
      )}

      {/* Optional Video Editor HUD Corner Ticks */}
      {withCornerTicks && (
        <>
          <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#ff3b00] pointer-events-none" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#ff3b00] pointer-events-none" />
          <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#ff3b00] pointer-events-none" />
          <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#ff3b00] pointer-events-none" />
        </>
      )}
    </div>
  );
};

/**
 * Single line or multi-line text skeleton with authentic typography dimensions.
 */
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  height?: string;
  width?: string;
  lastLineWidth?: string;
  gap?: string;
  variant?: 'default' | 'accent' | 'cyan' | 'bright';
}> = ({
  lines = 1,
  className = '',
  height = 'h-4',
  width = 'w-full',
  lastLineWidth = 'w-4/5',
  gap = 'gap-2.5',
  variant = 'default',
}) => {
  if (lines === 1) {
    return (
      <SkeletonBox
        rounded="md"
        variant={variant}
        className={`${height} ${width} ${className}`}
      />
    );
  }

  return (
    <div className={`flex flex-col ${gap} ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox
          key={i}
          rounded="md"
          variant={variant}
          className={`${height} ${i === lines - 1 ? lastLineWidth : 'w-full'}`}
        />
      ))}
    </div>
  );
};

/**
 * Badge or Tag Pill Skeleton with distinct cinematic tone
 */
export const SkeletonBadge: React.FC<{
  className?: string;
  width?: string;
  height?: string;
  variant?: 'default' | 'accent' | 'cyan' | 'bright';
}> = ({ className = '', width = 'w-20', height = 'h-6', variant = 'default' }) => {
  return (
    <SkeletonBox
      rounded="full"
      variant={variant}
      className={`${height} ${width} inline-flex items-center justify-center shrink-0 ${className}`}
    />
  );
};

/**
 * Button-shaped Skeleton with high visual definition
 */
export const SkeletonButton: React.FC<{
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'md' | 'lg' | 'full';
  variant?: 'default' | 'accent' | 'cyan';
}> = ({ className = '', width = 'w-28', height = 'h-10', rounded = 'md', variant = 'default' }) => {
  return (
    <SkeletonBox
      rounded={rounded}
      variant={variant}
      className={`${height} ${width} shrink-0 shadow-md ${className}`}
    />
  );
};

/**
 * Avatar Skeleton
 */
export const SkeletonAvatar: React.FC<{
  className?: string;
  size?: string;
  rounded?: 'full' | 'md' | 'lg';
}> = ({ className = '', size = 'w-10 h-10', rounded = 'full' }) => {
  return (
    <SkeletonBox
      rounded={rounded}
      className={`${size} shrink-0 ${className}`}
    />
  );
};

/**
 * High-precision container for cards and panels with CRT/film styling
 */
export const SkeletonCard: React.FC<{
  className?: string;
  children: React.ReactNode;
  withGlow?: boolean;
}> = ({ className = '', children, withGlow = false }) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-[#121217] border border-white/15 rounded-xl p-5 relative overflow-hidden ${
        withGlow ? 'skeleton-box-glow' : ''
      } ${className}`}
    >
      {/* Corner HUD Ticks */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 pointer-events-none" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 pointer-events-none" />
      {children}
    </div>
  );
};

/**
 * Authentic Retro Window Window Container matching the site's CRT window aesthetic
 */
export const SkeletonRetroWindow: React.FC<{
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  withGlow?: boolean;
}> = ({
  title = 'TERMINAL // BUFFERING_STREAM.MOV',
  badge = 'PRORES 4444 XQ',
  children,
  className = '',
  withGlow = false,
}) => {
  return (
    <div className={`rounded-xl border border-white/15 bg-[#121216] overflow-hidden shadow-2xl ${withGlow ? 'skeleton-box-glow' : ''} ${className}`}>
      {/* Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#181820] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
          </div>
          <span className="font-mono text-[11px] text-white/80 font-bold ml-2 tracking-wider">
            {title}
          </span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded bg-[#ff3b00]/20 text-[#ff3b00] border border-[#ff3b00]/40 font-mono text-[10px] font-bold">
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 bg-[#0a0a0e]">
        {children}
      </div>
    </div>
  );
};

/**
 * Authentic Retro HUD Stream Buffer Banner matching the video editor theme
 */
export const SkeletonHudHeader: React.FC<{
  statusText?: string;
  timecode?: string;
  format?: string;
  className?: string;
}> = ({
  statusText = 'BUFFERING 4K SHOWREEL PRORES STREAM',
  timecode = '00:00:00:00',
  format = 'DCI-4K • REC.709 • 24.000 FPS',
  className = '',
}) => {
  return (
    <div className={`w-full bg-[#0d0d12]/90 border border-white/15 rounded-lg p-3 font-mono text-xs flex flex-wrap items-center justify-between gap-3 text-white/70 shadow-lg ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-xs tracking-wider flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>{statusText}</span>
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-white/50">
        <span className="hidden sm:inline font-mono text-[#00e5ff]">{format}</span>
        <span className="px-2 py-0.5 bg-black/60 border border-white/10 rounded font-mono text-white tracking-widest">
          TC {timecode}
        </span>
        {/* Animated simulated VU Meter */}
        <div className="flex items-end gap-0.5 h-3.5">
          <span className="w-1 h-2 bg-[#00e5ff] rounded-sm animate-pulse" />
          <span className="w-1 h-3 bg-white/70 rounded-sm" />
          <span className="w-1 h-2.5 bg-white/50 rounded-sm" />
          <span className="w-1 h-1.5 bg-[#ff3b00] rounded-sm" />
        </div>
      </div>
    </div>
  );
};

/**
 * Simulated Audio Waveform Bar for Timeline Scrubbers
 */
export const SkeletonWaveform: React.FC<{
  barsCount?: number;
  className?: string;
}> = ({ barsCount = 24, className = '' }) => {
  const heights = [30, 45, 75, 90, 60, 40, 85, 100, 70, 50, 65, 80, 95, 40, 60, 85, 70, 55, 90, 65, 40, 75, 50, 30];

  return (
    <div className={`flex items-end gap-1 h-8 ${className}`} aria-hidden="true">
      {Array.from({ length: barsCount }).map((_, i) => {
        const heightPercent = heights[i % heights.length];
        return (
          <div
            key={i}
            className="flex-1 rounded-sm bg-white/15 hover:bg-[#00e5ff] transition-all"
            style={{
              height: `${heightPercent}%`,
              backgroundColor: i % 3 === 0 ? 'rgba(255,59,0,0.4)' : i % 2 === 0 ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.2)',
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * Form Input Skeleton
 */
export const SkeletonInput: React.FC<{
  label?: string;
  className?: string;
}> = ({ label, className = '' }) => {
  return (
    <div className={`space-y-1.5 ${className}`} aria-hidden="true">
      {label && <SkeletonText height="h-3" width="w-24" variant="cyan" />}
      <SkeletonBox rounded="md" className="w-full h-10" />
    </div>
  );
};

/**
 * FAQ Accordion Item Skeleton
 */
export const SkeletonAccordion: React.FC<{
  className?: string;
  isOpen?: boolean;
}> = ({ className = '', isOpen = false }) => {
  return (
    <div className={`bg-[#121216] border border-white/10 rounded-lg overflow-hidden ${className}`} aria-hidden="true">
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonBadge width="w-20" height="h-5" variant="cyan" />
          <SkeletonText height="h-4" width="w-3/4" variant="bright" />
        </div>
        <SkeletonBox rounded="sm" className="w-5 h-5 shrink-0" />
      </div>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-white/5 space-y-2">
          <SkeletonText lines={2} height="h-3.5" gap="gap-2" />
        </div>
      )}
    </div>
  );
};

/**
 * Pricing Tier Card Skeleton
 */
export const SkeletonPricingCard: React.FC<{
  isFeatured?: boolean;
  tierName?: string;
  className?: string;
}> = ({ isFeatured = false, tierName = 'COMMERCIAL MASTER', className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-[#121216] border ${
        isFeatured ? 'border-[#ff3b00]/50 shadow-[0_0_30px_rgba(255,59,0,0.15)]' : 'border-white/10'
      } rounded-xl p-6 flex flex-col justify-between gap-6 min-h-[440px] relative overflow-hidden ${className}`}
    >
      {isFeatured && (
        <span className="absolute top-0 right-0 bg-[#ff3b00] text-white font-mono text-[9px] font-bold px-3 py-0.5 rounded-bl-lg tracking-wider">
          RECOMMENDED PIPELINE
        </span>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <SkeletonBadge width="w-28" height="h-5" variant={isFeatured ? 'accent' : 'cyan'} />
          <SkeletonText height="h-6" width="w-3/4" variant="bright" className="mt-2" />
          <SkeletonText lines={2} height="h-3.5" gap="gap-1.5" />
        </div>

        {/* Price display */}
        <div className="py-4 border-y border-white/10 flex items-baseline gap-2">
          <SkeletonText height="h-9" width="w-32" variant={isFeatured ? 'accent' : 'bright'} />
          <SkeletonText height="h-3.5" width="w-16" />
        </div>

        {/* Feature bullets */}
        <div className="space-y-2.5 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <SkeletonBox rounded="full" className="w-4 h-4 shrink-0" variant={isFeatured ? 'accent' : 'cyan'} />
              <SkeletonText height="h-3" width={i % 2 === 0 ? 'w-4/5' : 'w-3/4'} />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <SkeletonButton width="w-full" height="h-11" rounded="lg" variant={isFeatured ? 'accent' : 'default'} />
      </div>
    </div>
  );
};

/**
 * Testimonial Card Skeleton
 */
export const SkeletonTestimonialCard: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`bg-[#121214] border border-white/10 p-6 rounded-xl flex flex-col justify-between gap-5 min-h-[200px] ${className}`} aria-hidden="true">
      <div className="space-y-3">
        {/* 5-star rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="w-3.5 h-3.5 rounded-sm bg-amber-400/40" />
          ))}
        </div>
        <SkeletonText lines={3} height="h-3.5" gap="gap-2" />
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
        <SkeletonAvatar size="w-10 h-10" />
        <div className="space-y-1 flex-1">
          <SkeletonText height="h-3.5" width="w-28" variant="bright" />
          <SkeletonText height="h-2.5" width="w-36" />
        </div>
      </div>
    </div>
  );
};

/**
 * Accessible wrapper for entire skeleton pages or components
 */
export const SkeletonContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  label?: string;
}> = ({ children, className = '', label = 'Loading content...' }) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={`w-full select-none transition-opacity duration-300 ${className}`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
};
