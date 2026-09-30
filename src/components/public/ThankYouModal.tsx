import React from 'react';
import { 
  CheckCircle2, X, Calendar, Clock, MessageSquare, 
  ArrowRight, ShieldCheck, Mail, FileVideo, Copy, Check, FileText 
} from 'lucide-react';
import { WhatsAppIcon } from '../common/BrandIcons';
import { RetroWindow } from '../effects/RetroWindow';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryDetails?: {
    name?: string;
    email?: string;
    projectType?: string;
    referenceId?: string;
  };
  referenceCode?: string;
  clientName?: string;
  clientEmail?: string;
  brandName?: string;
  onReturnToArchive?: () => void;
  onViewFullPage?: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  inquiryDetails,
  referenceCode,
  clientName: directClientName,
  clientEmail: directClientEmail,
  brandName = 'Eko Pixels',
  onReturnToArchive,
  onViewFullPage,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const refId = referenceCode || inquiryDetails?.referenceId || `EKO-${Math.floor(100000 + Math.random() * 900000)}`;
  const clientName = directClientName || inquiryDetails?.name || 'Director / Creative Lead';
  const clientEmail = directClientEmail || inquiryDetails?.email || 'your email';
  const projectType = inquiryDetails?.projectType || 'Commercial Video Production';

  const whatsappMessage = encodeURIComponent(
    `Hello Eko Pixels! I just submitted an inquiry (Ref: #${refId}) for ${projectType}. Looking forward to discussing the timeline and footage ingestion!`
  );
  const whatsappUrl = `https://wa.me/447700900077?text=${whatsappMessage}`;

  const copyRefId = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="thank-you-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl my-auto relative">
        <RetroWindow
          title="TRANSMISSION CONFIRMED // BRIEF RECEIVED"
          className="border-white/20 shadow-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 bg-[#0e0e11] flex flex-col items-center text-center">
            
            {/* Animated Success Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Headline */}
            <h2 id="thank-you-title" className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
              THANK YOU, {clientName.toUpperCase()}!
            </h2>
            <p className="text-white/70 text-sm max-w-md mb-6 font-body leading-relaxed">
              Your project briefing has been ingested into our production calendar. 
              We are reviewing your specs and will reply to <span className="text-white font-mono font-semibold">{clientEmail}</span> within <strong className="text-white">24 business hours</strong> with a scope proposal and delivery schedule.
            </p>

            {/* Ingestion Receipt Box */}
            <div className="w-full bg-[#141418] border border-white/10 rounded-xl p-4 mb-6 text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">PROJECT REFERENCE ID:</span>
                <button
                  type="button"
                  onClick={copyRefId}
                  className="flex items-center gap-1 text-[#00e5ff] font-bold hover:text-white transition-colors cursor-pointer"
                  title="Copy Reference ID"
                >
                  <span>#{refId}</span>
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">SELECTED PIPELINE:</span>
                <span className="text-white font-bold truncate max-w-[220px]">{projectType}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">FIRST CUT TIMELINE:</span>
                <span className="text-emerald-400 font-bold">48-72H UPON FOOTAGE INGEST</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">DATA PRIVACY:</span>
                <span className="text-white/70 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>NDA Confirmed</span>
                </span>
              </div>
            </div>

            {/* Fast-Track WhatsApp CTA */}
            <div className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-xs sm:text-sm">
                    Need an instant turnaround response?
                  </div>
                  <p className="text-[11px] text-emerald-300/80 font-body">
                    Message lead editor directly on WhatsApp with Ref #{refId}.
                  </p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>OPEN WHATSAPP</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onReturnToArchive) onReturnToArchive();
                }}
                className="w-full flex-1 py-3 px-4 rounded-lg bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <FileVideo className="w-4 h-4" />
                <span>EXPLORE MORE PROJECTS</span>
              </button>

              {onViewFullPage && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewFullPage();
                  }}
                  className="w-full sm:w-auto py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-mono"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>FULL RECEIPT</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 text-xs font-bold transition-colors cursor-pointer"
              >
                DISMISS
              </button>
            </div>

          </div>
        </RetroWindow>
      </div>
    </div>
  );
};
