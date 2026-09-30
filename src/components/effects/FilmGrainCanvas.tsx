import React, { useEffect, useRef } from 'react';
import { GrainMode } from '../../types';

interface FilmGrainCanvasProps {
  mode?: GrainMode;
  intensity?: number;
  opacity?: number;
}

export const FilmGrainCanvas: React.FC<FilmGrainCanvasProps> = ({
  mode = 'film',
  intensity = 20,
  opacity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (mode === 'clean' || intensity === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 256);
    const height = (canvas.height = 256);
    const imgData = ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imgData.data.buffer);
    const len = buffer32.length;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery.matches;

    // Base alpha computation from intensity
    const alphaValue = Math.min(255, Math.max(8, Math.floor((intensity / 100) * 45)));

    const renderNoise = () => {
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.45) {
          const noise = (Math.random() * 255) | 0;
          // Format 32-bit ARGB / ABGR
          buffer32[i] = (alphaValue << 24) | (noise << 16) | (noise << 8) | noise;
        } else {
          buffer32[i] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      if (!isReducedMotion && mode !== 'clean') {
        animationFrameId = requestAnimationFrame(renderNoise);
      }
    };

    renderNoise();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mode, intensity]);

  if (mode === 'clean' || intensity === 0) {
    return null;
  }

  const effectiveOpacity = opacity !== undefined ? opacity / 100 : Math.min(0.7, (intensity / 100) * 0.9);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay"
      style={{
        opacity: effectiveOpacity,
        imageRendering: 'pixelated',
      }}
    />
  );
};
