import React, { useState } from 'react';
import { Skeleton } from './SkeletonPrimitives';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  fallbackSrc = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton Shimmer Underlay */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none z-0" />
      )}

      {/* Actual Image with Fade-in */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 relative z-10 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
