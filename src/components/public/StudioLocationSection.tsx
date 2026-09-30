import React, { useState } from 'react';
import { 
  MapPin, Navigation, Compass, ExternalLink, Copy, 
  Check, HardDrive, Clock, ShieldCheck, Phone, Car, Train, Building
} from 'lucide-react';
import { GoogleMapsIcon, AppleMapsIcon } from '../common/BrandIcons';
import { RetroWindow } from '../effects/RetroWindow';

interface StudioLocationProps {
  onContactClick?: () => void;
  onBookSession?: () => void;
}

export const StudioLocationSection: React.FC<StudioLocationProps> = ({ onContactClick, onBookSession }) => {
  const [copied, setCopied] = useState(false);

  const studioAddress = "450 Production Row, Edit Suite 4B, Soho Media Arts District, London W1D 3QU";
  const mapGoogleUrl = "https://maps.google.com/?q=" + encodeURIComponent(studioAddress);
  const directionsGoogleUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(studioAddress);
  const mapAppleUrl = "https://maps.apple.com/?address=" + encodeURIComponent(studioAddress);
  const directionsAppleUrl = "https://maps.apple.com/?daddr=" + encodeURIComponent(studioAddress);

  const copyAddress = () => {
    navigator.clipboard.writeText(studioAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="studio-location" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b00] uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>FACILITY &amp; PHYSICAL INGESTION BAY</span>
            </div>
            <h2 id="location-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              STUDIO SUITE &amp; DRIVE DROP-OFF
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl font-body">
              Client color grading suite, physical RAID/NVMe courier drop-offs, and master review sessions.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={directionsGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ff3b00] hover:bg-[#ff551f] text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(255,59,0,0.3)] transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={mapGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all text-xs font-bold cursor-pointer font-mono"
            >
              <GoogleMapsIcon className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span>GOOGLE MAPS</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
            </a>

            <a
              href={mapAppleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all text-xs font-bold cursor-pointer font-mono"
            >
              <AppleMapsIcon className="w-3.5 h-3.5 text-white" />
              <span>APPLE MAPS</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
            </a>

            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all text-xs font-bold cursor-pointer font-mono"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Visual Map View + Logistics & Suite Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Interactive Map Vector View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <RetroWindow title="MAP GRID // COORDINATES: 51.5138° N, 0.1337° W" className="border-white/15 h-full flex flex-col shadow-xl">
              <div className="p-4 bg-[#09090c] flex-1 flex flex-col relative min-h-[360px] rounded-b-lg overflow-hidden">
                
                {/* SVG Dark Architectural Map Representation */}
                <div className="w-full h-full flex-1 rounded-lg border border-white/10 bg-[#0d0d12] relative overflow-hidden flex items-center justify-center p-4">
                  
                  {/* Subtle Grid Lines & Roads */}
                  <svg className="w-full h-full absolute inset-0 opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="studio-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#studio-grid)" />
                    
                    {/* Simulated Major Arterial Roads */}
                    <path d="M 0,140 Q 200,160 400,120 T 800,160" fill="none" stroke="#262630" strokeWidth="18" />
                    <path d="M 0,140 Q 200,160 400,120 T 800,160" fill="none" stroke="#ff3b00" strokeWidth="2" strokeDasharray="6,6" opacity="0.6" />
                    
                    <path d="M 320,0 L 340,500" fill="none" stroke="#262630" strokeWidth="22" />
                    <path d="M 120,0 L 160,500" fill="none" stroke="#1f1f26" strokeWidth="14" />
                    <path d="M 540,0 L 520,500" fill="none" stroke="#1f1f26" strokeWidth="14" />

                    {/* Building Blocks */}
                    <rect x="80" y="40" width="160" height="70" rx="4" fill="#14141a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect x="80" y="190" width="180" height="90" rx="4" fill="#14141a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect x="400" y="50" width="220" height="80" rx="4" fill="#14141a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect x="420" y="200" width="200" height="110" rx="4" fill="#14141a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                    {/* Studio Suite Highlighted Polygon */}
                    <rect x="290" y="180" width="90" height="75" rx="6" fill="#ff3b00" fillOpacity="0.15" stroke="#ff3b00" strokeWidth="2" />
                  </svg>

                  {/* Studio Pin Marker in Center */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff3b00]/20 border-2 border-[#ff3b00] flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,59,0,0.4)]">
                      <MapPin className="w-6 h-6 text-[#ff3b00]" />
                    </div>
                    <div className="mt-2 px-3 py-1 rounded-md bg-black/90 border border-white/20 text-white font-mono text-[11px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <span>EKO PIXELS STUDIO SUITE 4B</span>
                    </div>
                  </div>

                  {/* Corner Map HUD Badges */}
                  <div className="absolute top-3 left-3 bg-black/80 border border-white/10 rounded px-2 py-1 text-[10px] font-mono text-white/70">
                    SOHO MEDIA PRECINCT
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 border border-white/10 rounded px-2 py-1 text-[10px] font-mono text-[#00e5ff] flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>COURIER ACCESS GATE 2</span>
                  </div>
                </div>

                {/* Map Bottom Metadata */}
                <div className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
                  <div className="text-white/80 truncate">
                    <strong className="text-white">ADDRESS:</strong> {studioAddress}
                  </div>
                  <div className="text-[#00e5ff] text-[11px] shrink-0">
                    HOURS: 09:00 - 20:00 GMT (MON-FRI)
                  </div>
                </div>

              </div>
            </RetroWindow>
          </div>

          {/* Logistics, Drop-off Guidelines & Suite Specs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Courier & Hard Drive Drop-off Card */}
            <div className="p-5 rounded-xl bg-[#121214] border border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <HardDrive className="w-4 h-4 text-[#ff3b00]" />
                <h3>Physical Hard Drive Drop-Offs</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                Courier and client drop-offs are received at <strong>Gate 2 Loading Bay</strong>. 
                We accept rugged shuttle drives (SanDisk Extreme PRO, Samsung T7/T9, Glyph, LaCie 2big/6big RAID). 
                Please ensure drive enclosures include client labels and contact numbers for same-day ingestion checksum verification.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 10GbE Local Ingestion Checksum</span>
              </div>
            </div>

            {/* In-Person Client Viewing Bay */}
            <div className="p-5 rounded-xl bg-[#121214] border border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <Building className="w-4 h-4 text-[#00e5ff]" />
                <h3>Client Color &amp; Audio Suite</h3>
              </div>
              <ul className="text-xs text-white/70 font-mono space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>31" Flanders Scientific 4K HDR Reference Monitor</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>5.1 Genelec Nearfield Surround Audio Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>DaVinci Resolve Advanced Color Panel Surface</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>Private Director &amp; Agency Client Lounge</span>
                </li>
              </ul>
            </div>

            {/* Transit & Parking */}
            <div className="p-5 rounded-xl bg-[#121214] border border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                <Car className="w-4 h-4 text-[#ffe600]" />
                <h3>Transit &amp; Parking</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70 font-body">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#ffe600]" />
                    <span>Underground</span>
                  </div>
                  <span className="text-[11px] text-white/60">Tottenham Court Rd (3m walk) / Oxford Circus (6m walk)</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#ffe600]" />
                    <span>Client Parking</span>
                  </div>
                  <span className="text-[11px] text-white/60">Reserved visitor bays available via booking confirmation</span>
                </div>
              </div>

              {/* Schedule In-Person Bay Session CTA */}
              <button
                type="button"
                onClick={onBookSession || onContactClick}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff3b00] to-[#ff5500] hover:brightness-110 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,59,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>SCHEDULE IN-PERSON EDIT BAY SESSION</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
