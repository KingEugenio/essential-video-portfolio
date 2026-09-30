import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Layers, Sliders, SplitSquareVertical } from 'lucide-react';
import { BeforeAfterData } from '../../types';

interface BeforeAfterSliderProps {
  data: BeforeAfterData;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ data, className = '' }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'side-by-side'>('split');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <figure role="group" aria-label="Color Grade & VFX Comparison" className={`flex flex-col gap-3 select-none m-0 ${className}`}>
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-text-secondary)]">
            Color Grade & VFX Breakdown
          </span>
        </div>

        <nav aria-label="Comparison View Mode" className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)]">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'split'
                ? 'bg-[var(--brand-primary)] text-black font-semibold'
                : 'text-[var(--brand-text-secondary)] hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'side-by-side'
                ? 'bg-[var(--brand-primary)] text-black font-semibold'
                : 'text-[var(--brand-text-secondary)] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>
        </nav>
      </div>

      {/* Main View Area */}
      {viewMode === 'split' ? (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-video rounded-[var(--card-radius)] overflow-hidden cursor-ew-resize border border-[var(--brand-border)] bg-black shadow-2xl touch-none"
        >
          {/* AFTER (Graded) Image - Full background */}
          <img
            src={data.afterUrl}
            alt={data.labelAfter}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* BEFORE (RAW Log) Image - Clipped on Left */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={data.beforeUrl}
              alt={data.labelBefore}
              className="absolute inset-y-0 left-0 max-w-none w-full h-full object-cover"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none',
              }}
              draggable={false}
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-neutral-300 border border-white/20">
              {data.labelBefore}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)]/90 backdrop-blur-md text-black border border-black/30">
              {data.labelAfter}
            </span>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div
            className="absolute inset-y-0 z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Vertical Line */}
            <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

            {/* Handle Button */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border-2 border-neutral-900 pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4 text-neutral-900" />
            </div>
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span className="text-[11px] font-medium text-white/70 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
              Drag slider left / right to compare color grading
            </span>
          </div>
        </div>
      ) : (
        /* Side by Side Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative aspect-video rounded-[var(--card-radius)] overflow-hidden border border-[var(--brand-border)] bg-black">
            <img src={data.beforeUrl} alt={data.labelBefore} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-neutral-300 border border-white/20">
                {data.labelBefore}
              </span>
            </div>
          </div>
          <div className="relative aspect-video rounded-[var(--card-radius)] overflow-hidden border border-[var(--brand-border)] bg-black">
            <img src={data.afterUrl} alt={data.labelAfter} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)] text-black border border-black/30">
                {data.labelAfter}
              </span>
            </div>
          </div>
        </div>
      )}

      {data.notes && (
        <figcaption className="text-xs text-[var(--brand-text-muted)] italic px-1">
          {data.notes}
        </figcaption>
      )}
    </figure>
  );
};
