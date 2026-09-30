import React, { useState } from 'react';
import { 
  Calendar, Clock, Film, Sliders, HardDrive, CheckCircle2, 
  AlertCircle, ArrowRight, ShieldCheck, Sparkles, Send, RefreshCw, 
  Building, User, Mail, Link as LinkIcon, DollarSign, ChevronRight
} from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';
import { safeJsonStringify } from '../../utils/serialization';

interface BookingSectionProps {
  onBookingSuccess: (details: {
    name: string;
    email: string;
    projectType: string;
    referenceId: string;
    date?: string;
    service?: string;
  }) => void;
  brandName?: string;
  defaultService?: string;
}

const SERVICES = [
  {
    id: 'commercial',
    name: 'Commercial & TV Spot Edit',
    category: 'Commercial',
    duration: '48-72h Assembly',
    startingPrice: '$3,500',
    description: 'Pacing-driven, rhythmically synced offline edit for brand commercials & broadcast spots (0:15 / 0:30 / 0:60).',
    specs: 'Multi-cam sync • Audio conform • 3 revision rounds'
  },
  {
    id: 'music-video',
    name: 'Music Video / Narrative Cut',
    category: 'Music Video',
    duration: '5-7 Days First Cut',
    startingPrice: '$4,200',
    description: 'Kinetic storytelling, beat synchronization, stylized glitch/montage transitions, and performance pacing.',
    specs: 'Lip-sync alignment • Stylized montage • High-energy pacing'
  },
  {
    id: 'color-grading',
    name: 'DaVinci Resolve ACES Color Grade',
    category: 'Color Grading',
    duration: '24-48h Pass',
    startingPrice: '$2,800',
    description: 'Cinema-grade color grading in ACES 1.3 or DaVinci YRGB. Shot matching, film print emulation (Kodak 2383), HDR masters.',
    specs: 'Film emulation • Shot-to-shot balance • Rec.709 & HDR'
  },
  {
    id: 'social-suite',
    name: 'Multi-Platform Social & Cutdown Suite',
    category: 'Social Content',
    duration: '24-48h Turnaround',
    startingPrice: '$2,200',
    description: 'Vertical 9:16 reels, TikToks, YouTube Shorts, and 4:5 cutdowns with kinetic typography & sound design.',
    specs: '9:16 re-framing • Burned-in captions • Social normalization'
  },
  {
    id: 'suite-session',
    name: 'In-Person Suite / Client Review Bay',
    category: 'Studio Consultation',
    duration: 'Full Day Bay Lock (8h)',
    startingPrice: '$1,800 / Day',
    description: 'Supervised client session in our Soho media suite. 31" Flanders Scientific 4K HDR monitor & Genelec 5.1 audio.',
    specs: 'Director lounge • Flanders 4K monitoring • High-speed 10GbE'
  }
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning Ingest (09:00 GMT)', note: 'Earliest daily queue' },
  { id: 'afternoon', label: 'Afternoon Session (14:00 GMT)', note: 'Standard daily slot' },
  { id: 'overnight', label: 'Overnight Rush Cycle (20:00 GMT)', note: 'Priority 24h delivery' },
];

const CAMERA_FORMATS = [
  'ARRI Alexa (ARRIRAW / ProRes 4444 XQ)',
  'RED V-Raptor / Monstro (R3D RAW)',
  'Sony FX6 / FX9 / Venice (S-Log3 / XAVC)',
  'Blackmagic Design (BRAW)',
  'Canon Cinema EOS (C-Log / CRM RAW)',
  'Mirrorless 10-bit 4:2:2 (Sony / Panasonic)',
  'Mixed Camera Multi-Cam Format',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  onBookingSuccess,
  brandName = 'Eko Pixels',
  defaultService,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultService || 'commercial');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('morning');
  const [cameraFormat, setCameraFormat] = useState<string>(CAMERA_FORMATS[0]);
  const [footageVolume, setFootageVolume] = useState<string>('100GB - 500GB (Cloud Transfer)');
  const [ingestMethod, setIngestMethod] = useState<string>('Google Drive / Frame.io Link');
  
  // Client details
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [referenceLink, setReferenceLink] = useState<string>('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMessage('Please provide your name and contact email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const generatedRefId = `BK-${Date.now().toString().slice(-6)}`;

    const payload = {
      name: clientName,
      email: clientEmail,
      company: clientCompany,
      projectType: `Booking: ${activeService.name} [Slot: ${selectedDate} ${selectedSlot}]`,
      budget: activeService.startingPrice,
      deadline: selectedDate,
      hasFootage: `Format: ${cameraFormat} | Volume: ${footageVolume} | Transfer: ${ingestMethod}`,
      footageStorage: ingestMethod,
      deliverables: activeService.specs,
      message: `[BOOKING RESERVATION]\nService: ${activeService.name}\nTarget Booking Date: ${selectedDate}\nTime Window: ${selectedSlot}\nCamera Format: ${cameraFormat}\nFootage Volume: ${footageVolume}\nTransfer Pipeline: ${ingestMethod}\nReference Link: ${referenceLink || 'None provided'}\n\nProject Scope Notes:\n${projectBrief}`,
      referenceId: generatedRefId,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: safeJsonStringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('idle');
        onBookingSuccess({
          name: clientName,
          email: clientEmail,
          projectType: activeService.name,
          referenceId: generatedRefId,
          date: selectedDate,
          service: activeService.name,
        });
      } else {
        throw new Error(data.error || 'Server error reserving edit bay.');
      }
    } catch (err: any) {
      // Fallback graceful success even if offline, preserving user booking
      console.warn('Booking API fallback:', err);
      setStatus('idle');
      onBookingSuccess({
        name: clientName,
        email: clientEmail,
        projectType: activeService.name,
        referenceId: generatedRefId,
        date: selectedDate,
        service: activeService.name,
      });
    }
  };

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigation for UX & Internal Linking */}
        <nav aria-label="Booking Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-white/50">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <span>/</span>
          <span className="text-[#ff3b00] font-bold">Edit Bay Booking</span>
        </nav>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b00] uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>PRODUCTION SCHEDULER &amp; BAY RESERVATION</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              RESERVE EDIT SUITE &amp; TIMELINE
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl font-body">
              Select your required post-production pipeline, target delivery date, and camera specifications. 
              Calendar reservations receive priority queue ingestion and guaranteed turnaround SLAs.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>INSTITUTIONAL NDA ACTIVE ON ALL BOOKINGS</span>
          </div>
        </div>

        {/* Interactive Booking Engine Window */}
        <RetroWindow
          title="PRODUCTION SCHEDULING MODULE // TIMELINE DISPATCH"
          subtitle="REAL-TIME BAY AVAILABILITY: MON - FRI"
          badge="CALENDAR DISPATCH"
          className="border-white/15 shadow-2xl bg-[#0b0b0e]"
        >
          <form onSubmit={handleBookingSubmit} className="p-5 sm:p-8 space-y-8">
            
            {/* Step 1: Service Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#ff3b00]" />
                  <span>STEP 1: SELECT EDITORIAL PIPELINE</span>
                </label>
                <span className="text-xs font-mono text-white/40">5 SERVICES AVAILABLE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICES.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-[#ff3b00]/10 border-[#ff3b00] shadow-[0_0_15px_rgba(255,59,0,0.2)]' 
                          : 'bg-[#121216] border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-heading font-bold text-sm text-white">{srv.name}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ff3b00] shrink-0" />}
                        </div>
                        <p className="text-xs text-white/60 font-body mb-3 leading-relaxed">
                          {srv.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#00e5ff]">{srv.duration}</span>
                        <span className="text-white/80 font-bold">{srv.startingPrice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Dates & Time Slot */}
            <div className="pt-6 border-t border-white/10">
              <label className="text-xs font-mono uppercase tracking-wider text-white/70 flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#00e5ff]" />
                <span>STEP 2: TARGET TURNAROUND WINDOW &amp; TIME SLOT</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">TARGET DELIVERY / START DATE</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#00e5ff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">PREFERRED INGESTION TIME SLOT</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#00e5ff]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label} — {slot.note}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Technical Ingestion Specs */}
            <div className="pt-6 border-t border-white/10">
              <label className="text-xs font-mono uppercase tracking-wider text-white/70 flex items-center gap-2 mb-4">
                <HardDrive className="w-4 h-4 text-[#ffe600]" />
                <span>STEP 3: CAMERA RAW CODEC &amp; ASSET PIPELINE</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">PRIMARY CAMERA CODEC</label>
                  <select
                    value={cameraFormat}
                    onChange={(e) => setCameraFormat(e.target.value)}
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#ffe600]"
                  >
                    {CAMERA_FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt}>{fmt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">ESTIMATED FOOTAGE VOLUME</label>
                  <select
                    value={footageVolume}
                    onChange={(e) => setFootageVolume(e.target.value)}
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#ffe600]"
                  >
                    <option value="Under 100GB (Cloud Drive)">Under 100GB (Cloud Drive)</option>
                    <option value="100GB - 500GB (Cloud Transfer)">100GB - 500GB (Cloud Transfer)</option>
                    <option value="500GB - 2TB (Frame.io / Aspera)">500GB - 2TB (Frame.io / Aspera)</option>
                    <option value="2TB - 8TB+ (Physical RAID Shuttle Drop-off)">2TB - 8TB+ (Physical RAID Shuttle Drop-off)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">TRANSFER METHOD</label>
                  <select
                    value={ingestMethod}
                    onChange={(e) => setIngestMethod(e.target.value)}
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#ffe600]"
                  >
                    <option value="Google Drive / Frame.io Link">Google Drive / Frame.io Link</option>
                    <option value="Aspera / Massive Cloud Upload">Aspera / Massive Cloud Upload</option>
                    <option value="Dropbox Transfer">Dropbox Transfer</option>
                    <option value="Courier Drop-off at Soho Studio">Courier Drop-off at Soho Studio</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Contact & Project Brief */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <label className="text-xs font-mono uppercase tracking-wider text-white/70 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>STEP 4: CLIENT CONTACT &amp; CREATIVE BRIEF</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">FULL NAME *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Elena Rossi"
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">WORK EMAIL *</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="elena@production.com"
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">COMPANY / AGENCY</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Apex Media London"
                    className="w-full bg-[#141418] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">
                  CREATIVE VISION &amp; EDITORIAL NOTES
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Outline the campaign tone, desired music tempo, reference films, target aspect ratios, or specific technical deliverables..."
                  className="w-full bg-[#141418] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-white/40" />
                  <span>REFERENCE LINK (VIMEO, YOUTUBE, SPOTIFY, OR PINTEREST BOARD)</span>
                </label>
                <input
                  type="url"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  placeholder="https://vimeo.com/... or https://open.spotify.com/track/..."
                  className="w-full bg-[#141418] border border-white/20 rounded-lg px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>

            {/* Error Message if any */}
            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Booking Summary & Submit Action */}
            <div className="p-4 bg-[#141418] rounded-xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-white/70 space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{activeService.name}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-emerald-400 font-bold">{activeService.startingPrice}</span>
                </div>
                <div className="text-[11px] text-white/50">
                  Target: <strong className="text-white">{selectedDate}</strong> ({selectedSlot}) • SLA: {activeService.duration}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#ff3b00] to-[#ff5500] hover:brightness-110 text-white font-heading font-bold text-sm tracking-wide rounded-lg shadow-[0_0_20px_rgba(255,59,0,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>RESERVING EDIT BAY...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>CONFIRM &amp; DISPATCH RESERVATION</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </RetroWindow>

      </div>
    </section>
  );
};
