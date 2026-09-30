import React from 'react';
import { 
  X, Download, Printer, CheckCircle2, Film, ShieldCheck, 
  Clock, HardDrive, Palette, Volume2, Sparkles 
} from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';

interface RateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestBooking?: () => void;
}

export const RateCardModal: React.FC<RateCardModalProps> = ({
  isOpen,
  onClose,
  onRequestBooking,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="rate-card-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto w-full h-full border-0 m-0 max-w-none max-h-none block"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col my-auto shadow-2xl">
        <RetroWindow
          title="POST-PRODUCTION RATE CARD // TECHNICAL WORKFLOW & DELIVERABLES SPEC"
          subtitle="ACES 1.3 • PRORES 4444 • 4K DCI"
          badge="OFFICIAL 2026 DECK"
          onClose={onClose}
          className="w-full flex-1 flex flex-col max-h-[92vh] bg-[#0c0c0f]"
          bodyClassName="overflow-y-auto p-4 sm:p-6 space-y-6"
        >
          {/* Header Actions Bar */}
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 id="rate-card-modal-title" className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                COMMERCIAL RATE CARD &amp; SPECIFICATIONS
              </h2>
              <p className="font-mono text-xs text-white/60 mt-0.5">
                Standard baseline investment tiers, pipeline deliverable standards, and turnaround terms.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="font-mono text-xs text-white/80 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>SAVE / PRINT (PDF)</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-white/60 hover:text-white rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Section 1: Core Service Packages */}
          <section aria-labelledby="rate-card-packages-title" className="space-y-3">
            <h3 id="rate-card-packages-title" className="font-mono text-xs uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              <span>1. CORE EDITORIAL &amp; POST PRODUCTION RATES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-lg bg-[#14141a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading font-bold text-base text-white">Commercial &amp; Brand Film Edit</h4>
                    <span className="text-[#ff3b00] font-bold text-sm">From $2,800</span>
                  </div>
                  <p className="font-body text-xs text-white/60 mt-1">
                    Multi-cam sync, A-roll/B-roll narrative assembly, rhythm pacing, sound design pass, and color grading.
                  </p>
                  <ul className="mt-3 space-y-1 text-white/70 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>4K DCI ProRes 422 HQ Master</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Cut-downs (0:60, 0:30, 0:15)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Clean textless broadcast master</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#14141a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading font-bold text-base text-white">Music Video Narrative Edit</h4>
                    <span className="text-[#ff3b00] font-bold text-sm">From $2,200</span>
                  </div>
                  <p className="font-body text-xs text-white/60 mt-1">
                    Performance lip-sync precision, experimental multi-layer compositing, speed ramps, and stylized film textures.
                  </p>
                  <ul className="mt-3 space-y-1 text-white/70 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Full Master 16:9 Cut</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>3x Vertical 9:16 Teaser Reels</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>35mm Film Halation &amp; Grain Pass</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#14141a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading font-bold text-base text-white">DaVinci ACES Color Grade</h4>
                    <span className="text-[#00e5ff] font-bold text-sm">From $950</span>
                  </div>
                  <p className="font-body text-xs text-white/60 mt-1">
                    Shot-to-shot matching, skin tone preservation, custom LUT authoring, and Rec.709 / DCI-P3 delivery.
                  </p>
                  <ul className="mt-3 space-y-1 text-white/70 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Up to 40 Shots graded in ACES 1.3</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Show LUT (.cube) export for on-set</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#14141a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading font-bold text-base text-white">Monthly Creator Retainer</h4>
                    <span className="text-amber-400 font-bold text-sm">$3,500 / month</span>
                  </div>
                  <p className="font-body text-xs text-white/60 mt-1">
                    Dedicated post-production bandwidth for agencies and high-volume brand campaigns.
                  </p>
                  <ul className="mt-3 space-y-1 text-white/70 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Up to 8 Deliverables per month</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>48-hour rush turnarounds</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Technical Pipeline Specifications */}
          <section aria-labelledby="rate-card-specs-title" className="p-4 bg-[#101014] rounded-lg border border-white/10 space-y-3 font-mono text-xs">
            <h3 id="rate-card-specs-title" className="uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span>2. TECHNICAL PIPELINE &amp; MASTER DELIVERABLE STANDARDS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-white/70 text-[11px]">
              <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                <span className="text-white font-bold block">VIDEO CODECS</span>
                <p>Apple ProRes 4444 XQ, ProRes 422 HQ, Avid DNxHR HQX, H.264 / H.265 (High Profile 10-bit).</p>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                <span className="text-white font-bold block">COLOR SCIENCE</span>
                <p>ACEScc / ACEScct 1.3, DaVinci YRGB Color Managed, ARRI LogC3/C4, REDWideGamut, Sony S-Log3.</p>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
                <span className="text-white font-bold block">AUDIO STANDARDS</span>
                <p>24-bit 48kHz Uncompressed LPCM Stereo / 5.1 Surround, EBU R128 (-23 LUFS) &amp; YouTube (-14 LUFS).</p>
              </div>
            </div>
          </section>

          {/* Section 3: Commercial Terms & SLA */}
          <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/10 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-white font-bold">COMMERCIAL TERMS:</span>
              <p className="text-white/60 text-[11px]">
                50% mobilization deposit on booking. 2 review revisions included. Standard turnaround: 48–72 hours for initial rough assembly.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onRequestBooking && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestBooking();
                  }}
                  className="px-5 py-2.5 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded shadow-[0_0_15px_rgba(255,59,0,0.4)] transition-all cursor-pointer"
                >
                  TRANSMIT BRIEF &amp; BOOK
                </button>
              )}
            </div>
          </footer>
        </RetroWindow>
      </div>
    </dialog>
  );
};
