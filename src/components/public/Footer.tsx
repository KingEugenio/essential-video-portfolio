import React from 'react';
import { 
  Globe, ArrowUp, ShieldCheck, Share2 
} from 'lucide-react';
import { 
  InstagramIcon, YouTubeIcon, VimeoIcon, LinkedInIcon, XTwitterIcon, WhatsAppIcon, DiscordIcon 
} from '../common/BrandIcons';
import { BrandSettings, SocialLink } from '../../types';

interface FooterProps {
  brand: BrandSettings;
  socialLinks: SocialLink[];
  onScrollTop: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenPrivacyPolicy?: () => void;
  onDownloadRateCard?: () => void;
  onOpenShare?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  brand, 
  socialLinks, 
  onScrollTop,
  onNavigate,
  onOpenPrivacyPolicy,
  onDownloadRateCard,
  onOpenShare,
}) => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'youtube':
        return <YouTubeIcon className="w-4 h-4" />;
      case 'vimeo':
        return <VimeoIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedInIcon className="w-4 h-4" />;
      case 'x':
      case 'twitter':
        return <XTwitterIcon className="w-4 h-4" />;
      case 'whatsapp':
        return <WhatsAppIcon className="w-4 h-4 text-emerald-400" />;
      case 'discord':
        return <DiscordIcon className="w-4 h-4" />;
      case 'website':
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="site-footer" role="contentinfo" className="border-t border-white/10 bg-[#060608] py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Row: Brand & Quick Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            {brand.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={`${brand.brandName} - Video Editing & Color Grading Studio Emblem`}
                className="max-h-12 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-[#ff3b00] flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(255,59,0,0.3)]">
                {brand.logoMonogram || brand.brandName?.slice(0, 2).toUpperCase() || 'EP'}
              </div>
            )}
            <div>
              <div className="font-heading font-extrabold text-2xl text-white tracking-tight">
                <span>{brand.brandName}</span>
              </div>
              <p className="font-mono text-xs text-white/50 mt-0.5 max-w-md">
                {brand.professionalTitle} • {brand.location}
              </p>
            </div>
          </div>

          {/* Social Links Navigation List with Real SVGs */}
          <nav aria-label="Social Media Profiles">
            <ul role="list" className="flex flex-wrap items-center gap-2 font-mono text-xs list-none p-0 m-0">
              {socialLinks
                .filter((s) => s.enabled && s.url)
                .map((link) => (
                  <li key={link.id}>
                    <a
                      id={`footer-social-${link.platform}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded bg-[#121214] hover:bg-[#1f1f24] text-white/80 hover:text-white border border-white/10 hover:border-[#ff3b00]/60 transition-colors flex items-center gap-2"
                    >
                      {getSocialIcon(link.platform)}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {/* Middle Navigation & Internal Linking Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-b border-white/5 font-mono text-xs">
          <div>
            <div className="text-white/40 uppercase tracking-widest text-[10px] mb-3">
              PRODUCTION ARCHIVE
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleLinkClick(e, 'work')}
                  className="text-white/70 hover:text-[#ff3b00] transition-colors"
                >
                  Selected Commercials &amp; Cuts
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => handleLinkClick(e, 'booking')}
                  className="text-white/70 hover:text-[#ff3b00] transition-colors"
                >
                  Edit Bay Booking &amp; Schedule
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-white/70 hover:text-[#ff3b00] transition-colors"
                >
                  Editorial &amp; Color Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleLinkClick(e, 'pricing')}
                  className="text-white/70 hover:text-[#ff3b00] transition-colors"
                >
                  Production Packages &amp; Rates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/40 uppercase tracking-widest text-[10px] mb-3">
              FACILITY &amp; SPECS
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="text-white/70 hover:text-[#00e5ff] transition-colors"
                >
                  Ingestion &amp; Formats FAQ
                </a>
              </li>
              <li>
                <a
                  href="#studio-location"
                  onClick={(e) => handleLinkClick(e, 'studio-location')}
                  className="text-white/70 hover:text-[#00e5ff] transition-colors"
                >
                  Studio Suite &amp; Drop-Off Map
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="text-white/70 hover:text-[#00e5ff] transition-colors"
                >
                  Operator Manifesto &amp; Hardware
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/40 uppercase tracking-widest text-[10px] mb-3">
              CLIENTS &amp; TRUST
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleLinkClick(e, 'testimonials')}
                  className="text-white/70 hover:text-[#ffe600] transition-colors"
                >
                  Director Commendations
                </a>
              </li>
              <li>
                {onOpenPrivacyPolicy ? (
                  <button
                    type="button"
                    onClick={onOpenPrivacyPolicy}
                    className="text-white/70 hover:text-[#ffe600] transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy &amp; NDAs
                  </button>
                ) : (
                  <a
                    href="/privacy"
                    className="text-white/70 hover:text-[#ffe600] transition-colors"
                  >
                    Privacy Policy &amp; NDAs
                  </a>
                )}
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="text-white/70 hover:text-[#ffe600] transition-colors"
                >
                  Direct Inquiry Transmission
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/40 uppercase tracking-widest text-[10px] mb-3">
              CONFIDENTIALITY &amp; SECURITY
            </div>
            <div className="text-[11px] text-white/50 space-y-1.5 font-body">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NDA &amp; ACES 1.3 SECURE</span>
              </div>
              <p>
                All project rushes air-gapped on hardware encrypted RAID partitions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Permanent Developer Attribution, Admin Portal & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-4">
            <small className="text-xs text-white/50">
              &copy; <time dateTime={String(currentYear)}>{currentYear}</time> {brand.brandName}. ALL RIGHTS RESERVED.
            </small>

            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-[11px] text-white/40 hover:text-[#00e5ff] transition-colors underline cursor-pointer"
              >
                PRIVACY POLICY
              </button>
            )}

            {onDownloadRateCard && (
              <button
                id="footer-download-rate-card-btn"
                type="button"
                onClick={onDownloadRateCard}
                className="text-[11px] text-white/40 hover:text-[#ff3b00] transition-colors underline cursor-pointer"
              >
                RATE CARD &amp; SPECS (PDF)
              </button>
            )}

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/40 hover:text-white transition-colors underline"
            >
              SITEMAP.XML
            </a>

            {onOpenShare && (
              <button
                type="button"
                onClick={onOpenShare}
                className="text-[11px] text-white/40 hover:text-[#ff3b00] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3 h-3 text-[#ff3b00]" />
                <span>SHARE REEL</span>
              </button>
            )}

            <a
              href="/404"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
              title="Test custom 404 sequence monitor"
            >
              404 TEST
            </a>
          </div>

          {/* Required Permanent Developer Attribution - HARDCODED AND IMMUTABLE */}
          <address className="not-italic flex items-center gap-2">
            <span className="text-white/40">ARCHITECTED &amp;</span>
            <a
              id="dev-attribution-link"
              href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold tracking-widest text-[#ff3b00] hover:text-[#00e5ff] transition-colors py-1 px-2.5 rounded bg-white/5 border border-white/10 hover:border-[#00e5ff]/50 shadow-[0_0_12px_rgba(255,59,0,0.25)]"
            >
              <span>BUILT BY EKO PIXELS</span>
            </a>
          </address>

          {/* Back to top */}
          <button
            id="back-to-top-btn"
            type="button"
            onClick={onScrollTop}
            className="flex items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
