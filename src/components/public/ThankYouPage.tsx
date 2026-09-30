import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowLeft, Calendar, Clock, HardDrive, 
  Copy, Check, MessageSquare, FileText, Download, Share2, 
  Film, ShieldCheck, ExternalLink, RefreshCw 
} from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';
import { WhatsAppIcon } from '../common/BrandIcons';
import { BrandSettings } from '../../types';
import { generateGoogleCalendarUrl, downloadICS, type CalendarBooking } from '../../utils/calendarUtils';

interface ThankYouPageProps {
  brand?: BrandSettings;
  submissionDetails?: {
    name?: string;
    email?: string;
    projectType?: string;
    referenceId?: string;
    date?: string;
    service?: string;
  };
  onNavigateHome: () => void;
  onNavigateArchive?: () => void;
  onOpenRateCard?: () => void;
  onOpenShare?: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  brand,
  submissionDetails,
  onNavigateHome,
  onNavigateArchive,
  onOpenRateCard,
  onOpenShare,
}) => {
  const [copied, setCopied] = useState(false);

  const brandName = brand?.name || 'EKO PIXELS';
  const refId = submissionDetails?.referenceId || `EP-${Math.floor(100000 + Math.random() * 900000)}`;
  const clientName = submissionDetails?.name || 'Director / Creative Lead';
  const clientEmail = submissionDetails?.email || 'your contact email';
  const projectType = submissionDetails?.projectType || submissionDetails?.service || 'Commercial Editorial & Color Grade';

  const copyRefId = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${brandName}! I just transmitted a project brief (Reference: #${refId}) for ${projectType}. Looking forward to connecting on footage ingestion and schedule!`
  );
  const whatsappUrl = `https://wa.me/447700900077?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none opacity-50" />

      <div className="w-full max-w-3xl relative z-10 my-auto py-8">
        
        {/* Breadcrumb navigation for internal linking & UX */}
        <nav aria-label="Thank You Breadcrumb" className="mb-4 flex items-center gap-2 font-mono text-xs text-white/50">
          <button 
            type="button" 
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            type="button" 
            onClick={onNavigateArchive || onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <span>/</span>
          <span className="text-emerald-400 font-bold">Transmission Confirmed</span>
        </nav>

        <RetroWindow
          title="TIMELINE STATUS: TRANSMISSION CONFIRMED // INGESTION LOGGED"
          subtitle={`DISPATCH ID: #${refId} // SECURITY: ENCRYPTED`}
          badge="SIGNAL CONFIRMED"
          className="border-white/15 shadow-2xl bg-[#0c0c10]"
        >
          <div className="p-5 sm:p-8 flex flex-col items-center text-center">
            
            {/* Animated Status Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-2 tracking-tight">
              BRIEF CONFIRMED &amp; QUEUED
            </h1>
            
            <p className="text-white/70 text-sm sm:text-base max-w-lg mb-6 leading-relaxed font-body">
              Thank you, <strong className="text-white">{clientName}</strong>. Your project brief has been logged into our studio editing workstation. 
              A confirmation receipt and next steps have been routed to <span className="text-[#00e5ff] font-mono font-semibold">{clientEmail}</span>.
            </p>

            {/* Ingestion Receipt Card */}
            <div className="w-full bg-[#121216] border border-white/10 rounded-xl p-4 sm:p-5 mb-6 text-left font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-white/50">PROJECT REFERENCE CODE:</span>
                <button
                  type="button"
                  onClick={copyRefId}
                  className="flex items-center gap-1.5 text-emerald-400 font-bold hover:text-white transition-colors cursor-pointer bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded"
                  title="Copy Reference ID"
                >
                  <span>#{refId}</span>
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">COMMISSIONED PIPELINE:</span>
                <span className="text-white font-bold truncate max-w-[240px] sm:max-w-xs">{projectType}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">FIRST CUT TURNAROUND:</span>
                <span className="text-emerald-400 font-bold">48 - 72 BUSINESS HOURS</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">NDA CUSTODY:</span>
                <span className="text-white/80">AIR-GAPPED RAID CUSTODY ACTIVE</span>
              </div>
            </div>

            {/* 3-Step Next Actions Roadmap */}
            <div className="w-full border-t border-white/10 pt-6 mb-8 text-left">
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>POST-SUBMISSION PIPELINE // NEXT MILESTONES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-[#00e5ff] font-bold mb-1">01. SCOPE AUDIT</div>
                    <p className="text-xs text-white/70 font-body leading-relaxed">
                      We evaluate your creative references, footage format, and audio assets within 12h.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 mt-2">&lt; 12 Hours</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-[#ffe600] font-bold mb-1">02. INGESTION LINK</div>
                    <p className="text-xs text-white/70 font-body leading-relaxed">
                      We transmit a dedicated high-speed Frame.io / Drive folder or courier drop authorization.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 mt-2">Day 1</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs text-emerald-400 font-bold mb-1">03. ASSEMBLY PASS</div>
                    <p className="text-xs text-white/70 font-body leading-relaxed">
                      Multi-cam sync, pacing cut, and initial offline rough cut delivered for interactive review.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 mt-2">48-72 Hours</span>
                </div>
              </div>
            </div>

            {/* Direct Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              {(() => {
                const booking: CalendarBooking = {
                  title: `${brandName}: ${projectType}`,
                  date: submissionDetails?.date || '',
                  details: `Booking reference #${refId}\nPipeline: ${projectType}\nClient: ${clientName}\n\nTentative edit-bay reservation — ${brandName} will confirm the final schedule.`,
                  studioName: brandName,
                  studioEmail: brand?.email,
                  clientName,
                  clientEmail: submissionDetails?.email,
                };
                return (
                  <>
                    <a
                      href={generateGoogleCalendarUrl(booking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer font-mono"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>ADD TO GOOGLE CALENDAR</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadICS(booking)}
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer font-mono"
                    >
                      <Download className="w-4 h-4 text-[#00e5ff]" />
                      <span>DOWNLOAD .ICS</span>
                    </button>
                  </>
                );
              })()}

              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-[0_0_20px_rgba(255,59,0,0.3)] font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>RETURN TO MASTER REEL</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer font-mono"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>FAST-TRACK ON WHATSAPP</span>
                <ExternalLink className="w-3 h-3 text-emerald-400/60" />
              </a>

              {onOpenRateCard && (
                <button
                  type="button"
                  onClick={onOpenRateCard}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer font-mono"
                >
                  <FileText className="w-4 h-4 text-[#00e5ff]" />
                  <span>VIEW RATE CARD &amp; SPECS</span>
                </button>
              )}
            </div>

          </div>
        </RetroWindow>

        {/* Diagnostic Footer */}
        <div className="text-center font-mono text-xs text-white/40 mt-5">
          {brandName} WORKSTATION // ENCRYPTED INGESTION RECEIPT // 24 FPS
        </div>
      </div>
    </div>
  );
};
