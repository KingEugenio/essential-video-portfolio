import React, { useEffect } from 'react';
import { X, Sparkles, MessageSquare, Award } from 'lucide-react';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassButton } from '../common/GlassButton';

export const ShowreelModal: React.FC = () => {
  const { showShowreelModal, setShowShowreelModal, incrementShowreelPlays, setActiveView } = usePortfolio();
  const { brand } = useTheme();

  useEffect(() => {
    if (showShowreelModal) {
      incrementShowreelPlays();
    }
  }, [showShowreelModal]);

  if (!showShowreelModal) return null;

  return (
    <dialog
      open
      aria-modal="true"
      aria-labelledby="showreel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-transparent border-0 w-full h-full max-w-none max-h-none m-0"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={() => setShowShowreelModal(false)}
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-5xl glass-card bg-neutral-950 border border-[var(--brand-border)] p-4 sm:p-6 shadow-2xl z-10 my-auto flex flex-col gap-4 max-h-[95vh] overflow-y-auto"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-4 pb-2 border-b border-[var(--brand-border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="showreel-modal-title" className="text-lg sm:text-xl font-bold font-heading text-[var(--brand-text)]">
                {brand.showreelTitle || 'Director & Editor Showreel'}
              </h3>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                {brand.brandName} · {brand.professionalTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowShowreelModal(false)}
            className="p-2 rounded-full text-[var(--brand-text-muted)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close showreel modal"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Video Player */}
        <figure className="w-full m-0">
          <UniversalVideoPlayer
            source={brand.showreelSource}
            title={brand.showreelTitle}
            autoPlay={true}
          />
        </figure>

        {/* Footer Quick Action */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-[var(--brand-text-muted)]">
            <Award className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>Mastered in 4K ProRes · 2.39:1 CinemaScope & 16:9 Broadcast</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setShowShowreelModal(false)}
              className="w-full sm:w-auto"
            >
              Close
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              icon={<MessageSquare className="w-4 h-4" />}
              onClick={() => {
                setShowShowreelModal(false);
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              Discuss a Project
            </GlassButton>
          </div>
        </footer>
      </div>
    </dialog>
  );
};
