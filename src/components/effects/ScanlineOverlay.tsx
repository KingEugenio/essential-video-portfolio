import React from 'react';

interface ScanlineOverlayProps {
  scanlinesEnabled?: boolean;
  timestampEnabled?: boolean;
  recIndicatorEnabled?: boolean;
  vhsNoiseEnabled?: boolean;
}

export const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({
  scanlinesEnabled = true,
}) => {
  return (
    <aside className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden" aria-hidden="true">
      {/* Scanline CRT Pattern */}
      {scanlinesEnabled && (
        <div className="absolute inset-0 scanlines opacity-55 mix-blend-overlay" />
      )}

      {/* Screen Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,0,0,0.95)',
        }}
      />
    </aside>
  );
};
