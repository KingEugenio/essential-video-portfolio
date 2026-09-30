import React from 'react';
import { X, ShieldCheck, Lock, FileText, Database, Trash2, EyeOff, CheckCircle } from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col my-auto relative">
        <RetroWindow
          title="LEGAL &amp; SECURITY PROTOCOLS: PRIVACY POLICY &amp; ASSET CONFIDENTIALITY"
          className="shadow-2xl border-white/20 flex flex-col max-h-[85vh]"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#121214]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 id="privacy-policy-title" className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Privacy Policy &amp; Asset Protection
                </h2>
                <p className="text-xs text-white/50 font-mono">
                  EFFECTIVE DATE: AUGUST 2026 // VERSION 2.4 (ACES-SECURE)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close Privacy Policy Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Policy Body */}
          <div className="p-4 sm:p-6 overflow-y-auto font-body text-sm text-white/80 space-y-6 leading-relaxed bg-[#0c0c0e]">
            
            {/* Section 1: Core Confidentiality */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <Lock className="w-4 h-4 text-[#ff3b00]" />
                <h3>1. Client Footage &amp; Creative Confidentiality (NDA Compliance)</h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                We treat all unreleased client production assets, RAW camera footage (RED, ARRI, Sony, Blackmagic),
                script treatments, project stems, audio recordings, and editorial cuts with strict institutional confidentiality.
                All project materials are stored on encrypted local RAID storage and secure private project cloud partitions.
                We execute standard mutual or client-provided Non-Disclosure Agreements (NDAs) prior to footage ingestion.
              </p>
            </div>

            {/* Section 2: Inquiries & Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <FileText className="w-4 h-4 text-[#00e5ff]" />
                <h3>2. Information We Collect via Booking Inquiries</h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                When you submit a project inquiry, booking request, or direct brief through our website, we collect:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-white/60 space-y-1 pl-2 font-mono">
                <li>Your full name and company / production entity</li>
                <li>Contact email address and direct phone/WhatsApp number</li>
                <li>Project scope, target deliverables, budget tier, and delivery deadlines</li>
                <li>Reference links or cloud folder URLs for project briefing</li>
              </ul>
              <p className="text-white/70 text-xs sm:text-sm">
                This information is used strictly to prepare editorial estimates, schedule edit bay time, and coordinate project deliveries. We never sell, rent, or distribute your contact details.
              </p>
            </div>

            {/* Section 3: Cookies & Local Storage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <Database className="w-4 h-4 text-[#ffe600]" />
                <h3>3. Cookies, Storage &amp; Anti-Spam Rate Limiting</h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                Our portfolio utilizes lightweight browser storage (`localStorage` and technical session identifiers) solely for:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-white/60 space-y-1 pl-2 font-mono">
                <li>Saving your preferred visual theme and display filter choices</li>
                <li>Preventing automated spam bot abuse via client-side rate-limit cooldown timers</li>
                <li>Maintaining authenticated operator sessions in the private workstation portal</li>
              </ul>
            </div>

            {/* Section 4: Footage Retention & Deletion */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <Trash2 className="w-4 h-4 text-emerald-400" />
                <h3>4. Footage Retention &amp; Secure Purging Policy</h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                Upon final client approval and delivery of master watermark-free deliverables (ProRes 4444 / H.264), source assets and project archives are retained on offline cold storage for 60 calendar days to accommodate potential cutdown or re-format requests. Following this window, or upon written request, all working proxy and project files are securely wiped.
              </p>
            </div>

            {/* Section 5: Portfolio Showcase Rights */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <EyeOff className="w-4 h-4 text-purple-400" />
                <h3>5. Portfolio Showcase &amp; Release Embargoes</h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                Projects are showcased on this portfolio website only after the client's official public release, theatrical broadcast, or commercial premiere. If a project must remain private or unlisted, please notify us during briefing and we will mark it strictly confidential.
              </p>
            </div>

            {/* Section 6: User Rights */}
            <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Your Data Rights (GDPR &amp; CCPA)</span>
              </div>
              <p className="text-white/60 text-xs">
                You have the absolute right to request a full copy of all communication records we hold regarding your projects, or request the immediate permanent deletion of your inquiry details by emailing{' '}
                <a href="mailto:privacy@ekopixels.com" className="text-[#ff3b00] underline hover:text-white transition-colors">
                  privacy@ekopixels.com
                </a>.
              </p>
            </div>

          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-white/10 bg-[#121214] flex items-center justify-between">
            <div className="text-xs font-mono text-white/50">
              OPERATIONAL COMPLIANCE: 100% ENFORCED
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              ACKNOWLEDGE &amp; CLOSE
            </button>
          </div>
        </RetroWindow>
      </div>
    </div>
  );
};
