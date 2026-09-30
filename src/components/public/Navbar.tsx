import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandSettings } from '../../types';

interface NavbarProps {
  brand: BrandSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  brand, 
  activeSection, 
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'SELECTED WORK' },
    { id: 'services', label: 'SERVICES' },
    { id: 'booking', label: 'BOOKING' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'about', label: 'OPERATOR' },
    { id: 'faq', label: 'FAQ' },
    { id: 'studio-location', label: 'STUDIO' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header 
      id="site-header"
      role="banner"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo / Identity */}
        <button
          id="nav-brand-btn"
          type="button"
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer"
          aria-label={`${brand.brandName} - Return to top showreel`}
        >
          {brand.logoUrl ? (
            <img 
              src={brand.logoUrl} 
              alt={`${brand.brandName} - Video Production & Color Studio Emblem`} 
              className="h-8 max-w-[130px] object-contain rounded" 
              referrerPolicy="no-referrer" 
            />
          ) : (
            <div className="w-8 h-8 rounded bg-[#ff3b00] flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_12px_rgba(255,59,0,0.5)]">
              {brand.logoMonogram || brand.brandName?.slice(0, 2).toUpperCase() || 'EP'}
            </div>
          )}
          <div>
            <div className="font-heading font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-[#ff3b00] transition-colors">
              <span>{brand.brandName}</span>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase truncate max-w-[200px] sm:max-w-none">
              {brand.professionalTitle}
            </div>
          </div>
        </button>

        {/* Desktop Navigation Landmark */}
        <nav 
          id="primary-navigation"
          role="navigation"
          aria-label="Main Navigation"
          className="hidden md:block"
        >
          <ul role="menubar" className="flex items-center gap-1 font-mono text-xs tracking-widest bg-[#121214]/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} role="none">
                  <a
                    href={`#${link.id}`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className={`px-3 py-1 rounded-full transition-all duration-200 inline-block cursor-pointer ${
                      isActive
                        ? 'bg-[#ff3b00] text-white font-bold shadow-[0_0_10px_rgba(255,59,0,0.5)]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="nav-start-project-btn"
            type="button"
            onClick={() => onNavigate('booking')}
            className="font-mono text-xs tracking-wider uppercase px-4 py-2 bg-gradient-to-r from-[#ff3b00] to-[#ff6a00] hover:brightness-110 text-white font-semibold rounded border border-[#ff3b00]/60 shadow-[0_0_15px_rgba(255,59,0,0.35)] transition-all cursor-pointer"
          >
            BOOK SESSION
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          id="mobile-nav-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white bg-white/5 border border-white/10 rounded-md"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Navigation Landmark */}
      {mobileMenuOpen && (
        <nav 
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile Navigation Menu"
          className="md:hidden bg-[#0c0c0e] border-b border-white/10 px-4 py-5"
        >
          <ul className="flex flex-col gap-2 font-mono text-xs tracking-wider">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded hover:bg-white/5 text-white/80 hover:text-white flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#ff3b00]">→</span>
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#ff3b00] text-white font-bold rounded text-center"
              >
                START PROJECT
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
