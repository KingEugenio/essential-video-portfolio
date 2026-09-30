import React, { useState } from 'react';
import { 
  Share2, X, Copy, Check, ExternalLink, Link2, 
  Film, Sliders, Send
} from 'lucide-react';
import { 
  XTwitterIcon, LinkedInIcon, WhatsAppIcon, FacebookIcon 
} from '../common/BrandIcons';
import { RetroWindow } from '../effects/RetroWindow';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData?: {
    title: string;
    description?: string;
    url?: string;
    tags?: string[];
  };
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  shareData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = shareData?.url || (typeof window !== 'undefined' ? window.location.href : 'https://ekopixels.com');
  const title = shareData?.title || 'Eko Pixels // Lead Video Editor & Colorist Portfolio';
  const description = shareData?.description || 'Explore commercial video editing, ACES color grading, and kinetic rhythm reel archives.';

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`${title} — ${description}`);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: XTwitterIcon,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=VideoEditing,ColorGrading,Cinematography,DaVinciResolve`,
      color: 'hover:bg-white/10 hover:text-white',
      accent: '#f4f4f5',
    },
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0077b5]/20 hover:text-[#0077b5]',
      accent: '#0077b5',
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${currentUrl}`)}`,
      color: 'hover:bg-emerald-500/20 hover:text-emerald-400',
      accent: '#25D366',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-400',
      accent: '#1877F2',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg my-auto relative">
        <RetroWindow
          title="METADATA DISPATCH // SOCIAL DISTRIBUTION PIPELINE"
          className="border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#121214]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00]">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h2 id="share-modal-title" className="font-heading font-bold text-base sm:text-lg text-white">
                  Share Project / Reel
                </h2>
                <p className="text-[11px] text-white/50 font-mono truncate max-w-[260px] sm:max-w-xs">
                  {title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close share modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 bg-[#0e0e11] space-y-6">
            
            {/* Direct Link Copy Bar */}
            <div>
              <label className="block text-xs font-mono uppercase text-white/60 mb-2">
                DIRECT URL LINK:
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#141418] border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white/80 font-mono truncate flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <span className="truncate">{currentUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#ff3b00] hover:bg-[#ff551f] text-white shadow-[0_0_12px_rgba(255,59,0,0.3)]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY LINK</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Share Grid */}
            <div>
              <div className="text-xs font-mono uppercase text-white/60 mb-3">
                BROADCAST TO PLATFORMS:
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {shareLinks.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-[#141418] border border-white/10 text-white/80 transition-all flex items-center justify-between group cursor-pointer ${platform.color}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-white/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-heading font-bold">{platform.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/80 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Embed / Portfolio Quick Summary */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-white/60 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Format: 4K DCI / ProRes Video Package</span>
              </span>
              <span className="text-[#ffe600]">PUBLIC ARCHIVE</span>
            </div>

          </div>

          {/* Footer */}
          <div className="p-3.5 border-t border-white/10 bg-[#121214] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </RetroWindow>
      </div>
    </div>
  );
};
