import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Palette, Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW LOG FOOTAGE',
  afterLabel = 'FINAL FILM GRADE',
  aspectRatio = 'aspect-video',
  className = '',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <figure 
      ref={containerRef}
      aria-label="Color grade comparison slider"
      className={`relative select-none overflow-hidden rounded-md border border-white/15 bg-black m-0 p-0 ${aspectRatio} ${className}`}
      onClick={(e) => handleMove(e.clientX)}
    >
      <figcaption className="sr-only">
        Comparison between {beforeLabel} and {afterLabel}
      </figcaption>

      {/* After Image (Full width background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Subtle desaturation tint to emphasize raw log if needed */}
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay" aria-hidden="true" />
      </div>

      {/* Draggable Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle Knob */}
        <div 
          id="raw-grade-slider-handle"
          role="slider"
          tabIndex={0}
          aria-label="Slide to compare raw and graded footage"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
            if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
          }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#18181b] border-2 border-white text-white flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-[#ff3b00]"
        >
          <Sliders className="w-3.5 h-3.5 text-[#ff3b00]" aria-hidden="true" />
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-wider uppercase px-2 py-1 bg-black/75 backdrop-blur-md text-white/90 rounded border border-white/10 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
        <span>{beforeLabel}</span>
      </div>

      <div className="absolute top-3 right-3 z-10 font-mono text-[10px] tracking-wider uppercase px-2 py-1 bg-black/75 backdrop-blur-md text-white/90 rounded border border-white/10 flex items-center gap-1.5 pointer-events-none">
        <Palette className="w-3 h-3 text-[#00e5ff]" aria-hidden="true" />
        <span>{afterLabel}</span>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-mono text-[9px] text-white/60 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/10 pointer-events-none tracking-wider">
        ◄ DRAG TO COMPARE ►
      </div>
    </figure>
  );
};
