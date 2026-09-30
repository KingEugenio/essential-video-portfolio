import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'pulse' | 'shimmer';
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Base atomic Skeleton box
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'shimmer',
  width,
  height,
  borderRadius,
  style,
  id,
}) => {
  const effectClass =
    variant === 'shimmer' ? 'skeleton-shimmer-effect' : 'skeleton-pulse-effect';

  return (
    <div
      id={id}
      className={`rounded-md ${effectClass} ${className}`}
      style={{
        width,
        height,
        borderRadius: borderRadius !== undefined ? borderRadius : undefined,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * Typography-aware Skeleton line generator
 */
export interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  gap?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '65%',
  size = 'base',
  className = '',
  gap = 'gap-2.5',
}) => {
  const getHeightClass = () => {
    switch (size) {
      case 'xs':
        return 'h-2.5';
      case 'sm':
        return 'h-3.5';
      case 'base':
        return 'h-4';
      case 'lg':
        return 'h-5';
      case 'xl':
        return 'h-6';
      case '2xl':
        return 'h-8';
      case '3xl':
        return 'h-10';
      case '4xl':
        return 'h-12';
      default:
        return 'h-4';
    }
  };

  const getLineWidth = (index: number, total: number) => {
    if (index === total - 1 && total > 1) return lastLineWidth;
    if (index % 3 === 0) return '100%';
    if (index % 3 === 1) return '92%';
    return '85%';
  };

  return (
    <div className={`flex flex-col ${gap} ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`${getHeightClass()} rounded`}
          style={{ width: getLineWidth(idx, lines) }}
        />
      ))}
    </div>
  );
};

/**
 * Button-shaped Skeleton
 */
export interface SkeletonButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'icon';
  pill?: boolean;
  className?: string;
  width?: string;
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'md',
  pill = false,
  className = '',
  width,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { height: '34px', minWidth: width || '80px' };
      case 'lg':
        return { height: '52px', minWidth: width || '180px' };
      case 'icon':
        return { height: '40px', width: '40px', minWidth: '40px' };
      case 'md':
      default:
        return { height: '42px', minWidth: width || '120px' };
    }
  };

  const { height, minWidth, width: explicitWidth } = getSizeStyles();

  return (
    <Skeleton
      className={`shrink-0 ${pill ? 'rounded-full' : 'rounded-[var(--button-radius,8px)]'} ${className}`}
      style={{
        height,
        minWidth,
        width: explicitWidth || width,
      }}
    />
  );
};

/**
 * Chip / Badge shaped Skeleton
 */
export const SkeletonBadge: React.FC<{
  width?: string;
  height?: string;
  className?: string;
}> = ({ width = '64px', height = '22px', className = '' }) => (
  <Skeleton
    className={`rounded-full shrink-0 ${className}`}
    style={{ width, height }}
  />
);

/**
 * Avatar / Profile circle or rounded square
 */
export const SkeletonAvatar: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  className?: string;
}> = ({ size = 'md', shape = 'circle', className = '' }) => {
  const getDims = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-28 h-28 sm:w-36 sm:h-36';
      case 'md':
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <Skeleton
      className={`${getDims()} ${shape === 'circle' ? 'rounded-full' : 'rounded-2xl'} shrink-0 ${className}`}
    />
  );
};

/**
 * Video / Media Frame Skeleton with Aspect Ratio awareness
 */
export interface SkeletonMediaProps {
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5' | '4:3' | '2.39:1';
  showPlayButton?: boolean;
  showBadges?: boolean;
  className?: string;
}

export const SkeletonMedia: React.FC<SkeletonMediaProps> = ({
  aspectRatio = '16:9',
  showPlayButton = true,
  showBadges = true,
  className = '',
}) => {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'aspect-[9/16] max-w-[360px] mx-auto';
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5] max-w-[480px] mx-auto';
      case '4:3':
        return 'aspect-[4/3]';
      case '2.39:1':
        return 'aspect-[2.39/1]';
      case '16:9':
      default:
        return 'aspect-video';
    }
  };

  return (
    <div
      className={`relative w-full ${getAspectClass()} rounded-xl overflow-hidden glass-card border border-[var(--brand-border)] bg-black/40 ${className}`}
      aria-hidden="true"
    >
      <Skeleton className="w-full h-full rounded-none" />

      {/* Floating Badges Skeleton */}
      {showBadges && (
        <>
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <Skeleton className="w-20 h-6 rounded-md bg-white/20" />
            <Skeleton className="w-16 h-6 rounded-md bg-white/15" />
          </div>
          <div className="absolute top-3 right-3 z-10">
            <Skeleton className="w-12 h-5 rounded bg-white/20" />
          </div>
        </>
      )}

      {/* Center Play Button Skeleton */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white/60 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Card skeleton container with design-system border radius & padding math
 */
export const SkeletonCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}> = ({ children, className = '', style, id }) => (
  <div
    id={id}
    className={`glass-card p-5 sm:p-6 rounded-[var(--card-radius,12px)] border border-[var(--brand-border)] space-y-4 ${className}`}
    style={style}
    aria-hidden="true"
  >
    {children}
  </div>
);
