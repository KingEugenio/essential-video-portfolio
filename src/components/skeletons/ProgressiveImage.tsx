import React, { useState } from 'react';
import { SkeletonBox } from './SkeletonPrimitives';
import { Image as ImageIcon } from 'lucide-react';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  fallbackIcon?: boolean;
}

/**
 * Image component with page-aware skeleton placeholder and smooth fade-in reveal.
 * Eliminates sudden image jumps and maintains strict layout geometry.
 */
export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  aspectRatio,
  fallbackIcon = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#121214] ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton Shimmer while loading */}
      {!isLoaded && !hasError && (
        <SkeletonBox
          rounded="none"
          className="absolute inset-0 w-full h-full z-10"
        />
      )}

      {/* Actual Image */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          referrerPolicy="no-referrer"
          {...props}
        />
      ) : hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#141418] text-white/30 p-4 font-mono text-[10px]">
          {fallbackIcon && <ImageIcon className="w-6 h-6 mb-1.5 opacity-40" />}
          <span>MEDIA PREVIEW</span>
        </div>
      ) : null}
    </div>
  );
};
