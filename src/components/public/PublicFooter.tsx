import React from 'react';
import {
  Film,
  ArrowUp,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';

export const PublicFooter: React.FC = () => {
  const { brand } = useTheme();
  const { setActiveView, setShowShowreelModal } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = brand.socialLinks || brand.socials || {};

  return (
    <footer className="mt-20 border-t border-[var(--brand-border)] bg-[var(--brand-surface)]/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--brand-border)]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl text-[var(--brand-text)] tracking-tight">
                {brand.brandName}
              </span>
            </div>
            <address className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1.5 not-italic">
              {brand.professionalTitle} · {brand.location}
            </address>
          </div>

          {/* Social Links */}
          <nav aria-label="Social Profiles" className="flex items-center gap-3">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {socials.vimeo && (
              <a
                href={socials.vimeo}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                aria-label="Vimeo"
              >
                <Film className="w-4 h-4" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {(socials.x || (socials as any).twitter) && (
              <a
                href={socials.x || (socials as any).twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--brand-text-muted)]">
          <small
            onDoubleClick={() => setActiveView('admin')}
            className="cursor-default select-none text-xs block"
            title="Portfolio System"
          >
            © <time dateTime={String(new Date().getFullYear())}>{new Date().getFullYear()}</time> {brand.brandName}. All rights reserved. Mastered in 4K ProRes & CinemaScope.
          </small>

          <div className="flex items-center gap-5">
            {/* Permanent Developer Attribution */}
            <div className="flex items-center gap-1.5 text-xs">
              <a
                href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold tracking-wider text-[var(--brand-primary)] hover:underline transition-all inline-flex items-center gap-1"
                title="Built by EKO Pixels"
              >
                BUILT BY EKO PIXELS
              </a>
            </div>

            <button
              onClick={() => setActiveView('proofing')}
              className="hover:text-[var(--brand-text)] flex items-center gap-1 transition-colors cursor-pointer text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Client Review Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass-surface hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
