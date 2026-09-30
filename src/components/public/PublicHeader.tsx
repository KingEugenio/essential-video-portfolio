import React, { useState } from 'react';
import {
  Film,
  Menu,
  X,
  Play,
  Sun,
  Moon,
  Lock,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';

export const PublicHeader: React.FC = () => {
  const { theme, brand, toggleDarkMode } = useTheme();
  const { setActiveView, setShowShowreelModal, showToast } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Selected Work', id: 'portfolio-section' },
    { label: 'Showreel', action: () => setShowShowreelModal(true) },
    { label: 'Services', id: 'services-section' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About & Gear', id: 'about-section' },
    { label: 'Reviews', id: 'testimonials-section' },
    { label: 'Contact', id: 'contact-section' },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${brand.brandName} | ${brand.professionalTitle}`,
        text: brand.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Portfolio link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto">
        <nav className="glass-nav rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('hero-section')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              {brand.profileImageUrl ? (
                <img
                  src={brand.profileImageUrl}
                  alt={brand.brandName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[var(--brand-primary)] shadow-md group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold">
                  <Film className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors block leading-tight">
                  {brand.brandName}
                </span>
                <span className="text-[10px] sm:text-xs text-[var(--brand-text-secondary)] tracking-wider uppercase font-medium block">
                  {brand.professionalTitle.split('&')[0]}
                </span>
              </div>
            </button>

            {/* Availability Pill (Desktop) */}
            {brand.availableForHire && (
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Booking Available
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 list-none p-0 m-0">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => (link.id ? scrollTo(link.id) : link.action ? link.action() : null)}
                  className="text-sm font-nav font-medium text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              title="Share Portfolio"
              className="p-2 rounded-full text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => toggleDarkMode()}
              title="Toggle Light/Dark Theme"
              className="p-2 rounded-full text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-white/10 transition-colors cursor-pointer"
            >
              {theme.mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            </button>

            {/* Client Proofing Portal Link */}
            <button
              type="button"
              onClick={() => setActiveView('proofing')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--brand-surface-elevated)] hover:border-[var(--brand-primary)] text-[var(--brand-text-secondary)] hover:text-white border border-[var(--brand-border)] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Client Review</span>
            </button>

            {/* Quick Contact CTA */}
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => scrollTo('contact-section')}
              className="hidden md:inline-flex"
            >
              Hire Me
            </GlassButton>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[var(--brand-text)] hover:bg-white/10 lg:hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile Navigation" className="lg:hidden mt-2 max-w-7xl mx-auto glass-card p-5 flex flex-col gap-3 shadow-2xl border border-[var(--brand-border)] animate-fade-in">
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => (link.id ? scrollTo(link.id) : link.action ? link.action() : null)}
                  className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[var(--brand-text)] hover:bg-white/10 hover:text-[var(--brand-primary)] transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-[var(--brand-border)] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('proofing');
              }}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Client Review Portal</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
