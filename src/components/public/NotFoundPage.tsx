import React, { useState, useEffect } from 'react';
import { 
  Film, Home, ArrowLeft, Search, Layers, Mail, 
  HelpCircle, Play, AlertTriangle, RefreshCw, Compass 
} from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';
import { BrandSettings, Project } from '../../types';

interface NotFoundPageProps {
  brand?: BrandSettings;
  featuredProjects?: Project[];
  onNavigateHome: () => void;
  onNavigateArchive?: () => void;
  onNavigateContact?: () => void;
  onNavigateFAQ?: () => void;
  onSelectProject?: (project: Project) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  brand,
  featuredProjects = [],
  onNavigateHome,
  onNavigateArchive,
  onNavigateContact,
  onNavigateFAQ,
  onSelectProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [frameCounter, setFrameCounter] = useState(12);

  // Subtle frame increment for NLE timecode authenticity
  useEffect(() => {
    const timer = setInterval(() => {
      setFrameCounter((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigateArchive) {
      onNavigateArchive();
    } else {
      onNavigateHome();
    }
  };

  const brandName = brand?.name || 'EKO PIXELS';

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#ff3b00]/10 via-transparent to-transparent pointer-events-none opacity-50" />

      <div className="w-full max-w-3xl relative z-10 my-auto py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Error Breadcrumb" className="mb-4 flex items-center gap-2 font-mono text-xs text-white/50">
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
          <span className="text-[#ff3b00] font-bold">404 Sequence Not Found</span>
        </nav>

        <RetroWindow 
          title="TIMELINE MONITOR // ERROR 404: SEQUENCE NOT FOUND" 
          subtitle="SMPTE TEST PATTERN // REEL UNRESOLVED"
          badge="404 EXCEPTION"
          className="border-white/15 shadow-2xl bg-[#0c0c10]"
        >
          <div className="p-4 sm:p-8 flex flex-col items-center text-center">
            
            {/* SMPTE Color Bars & Timecode Diagnostic Card */}
            <div className="w-full max-w-lg rounded-lg overflow-hidden border border-white/15 bg-black mb-6 relative flex flex-col justify-between p-3.5 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/60 tracking-wider">
                <span className="flex items-center gap-1.5 text-[#ff3b00] font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PLAYHEAD DISCONNECTED</span>
                </span>
                <span className="text-[#00e5ff] font-bold">
                  TC: 00:04:04:{frameCounter < 10 ? `0${frameCounter}` : frameCounter}
                </span>
              </div>

              {/* SMPTE Broadcast Color Bars Graphic */}
              <div className="my-3 w-full">
                <div className="w-full h-14 sm:h-16 flex rounded-t overflow-hidden opacity-85 border-b border-black">
                  <div className="flex-1 bg-[#c0c0c0] flex items-end justify-center pb-1 text-[8px] font-mono text-black font-bold">75%</div>
                  <div className="flex-1 bg-[#c0c000] flex items-end justify-center pb-1 text-[8px] font-mono text-black font-bold">YEL</div>
                  <div className="flex-1 bg-[#00c0c0] flex items-end justify-center pb-1 text-[8px] font-mono text-black font-bold">CYN</div>
                  <div className="flex-1 bg-[#00c000] flex items-end justify-center pb-1 text-[8px] font-mono text-black font-bold">GRN</div>
                  <div className="flex-1 bg-[#c000c0] flex items-end justify-center pb-1 text-[8px] font-mono text-white font-bold">MAG</div>
                  <div className="flex-1 bg-[#c00000] flex items-end justify-center pb-1 text-[8px] font-mono text-white font-bold">RED</div>
                  <div className="flex-1 bg-[#0000c0] flex items-end justify-center pb-1 text-[8px] font-mono text-white font-bold">BLU</div>
                </div>
                <div className="w-full h-5 flex rounded-b overflow-hidden opacity-90">
                  <div className="w-1/6 bg-[#0000c0]" />
                  <div className="w-1/6 bg-[#131313]" />
                  <div className="w-1/6 bg-[#c000c0]" />
                  <div className="w-1/6 bg-[#131313]" />
                  <div className="w-1/6 bg-[#00c0c0]" />
                  <div className="w-1/6 bg-[#131313]" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                <span className="text-[#ff3b00] uppercase font-bold tracking-widest">
                  [ MISSING MEDIA LINK IN NLE TIMELINE ]
                </span>
                <span>CODEC: UNRESOLVED</span>
              </div>
            </div>

            {/* Error headline in display font */}
            <div className="font-heading font-extrabold text-6xl sm:text-7xl text-white tracking-tight leading-none mb-1">
              404
            </div>

            <h1 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2 tracking-wide uppercase">
              Requested Sequence Not Found
            </h1>

            <p className="text-white/60 text-sm sm:text-base max-w-lg mb-6 leading-relaxed font-body">
              The project cut, asset reel, or timeline destination you navigated to does not exist, 
              has been archived, or was moved to another reel directory.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="w-full max-w-md mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, commercials, grades, tags..."
                  className="w-full bg-[#121216] border border-white/20 rounded-lg pl-10 pr-24 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ff3b00] transition-colors"
                />
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors cursor-pointer"
                >
                  SEARCH
                </button>
              </div>
            </form>

            {/* Suggested Recent Projects if available */}
            {featuredProjects.length > 0 && (
              <div className="w-full border-t border-white/10 pt-5 mb-6 text-left">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>AVAILABLE MASTER REEL SEQUENCES:</span>
                  </span>
                  <span className="text-[10px] text-white/40">DIRECT PLAY</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {featuredProjects.slice(0, 3).map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => onSelectProject ? onSelectProject(project) : onNavigateArchive?.()}
                      className="group flex flex-col p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff3b00]/50 transition-all text-left cursor-pointer"
                    >
                      <div className="relative aspect-video rounded overflow-hidden bg-black/60 mb-2">
                        <img
                          src={project.thumbnailUrl}
                          alt={`${project.title} - ${project.category} editorial master cut for ${project.client}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                          <Play className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="font-heading font-bold text-xs text-white truncate group-hover:text-[#ff3b00] transition-colors">
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 truncate">
                        {project.client} • {project.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Navigation Links */}
            <div className="w-full border-t border-white/10 pt-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-3">
                RESOLVE NAVIGATION ROUTE:
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full font-mono">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-xs font-bold group cursor-pointer"
                >
                  <Home className="w-4 h-4 text-[#ff3b00] group-hover:scale-110 transition-transform" />
                  <span>MASTER REEL</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateArchive || onNavigateHome}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-xs font-bold group cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#00e5ff] group-hover:scale-110 transition-transform" />
                  <span>PROJECT ARCHIVE</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateFAQ || onNavigateHome}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-xs font-bold group cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#ffe600] group-hover:scale-110 transition-transform" />
                  <span>SPECS &amp; FAQ</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateContact || onNavigateHome}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all text-xs font-bold group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>BOOKINGS</span>
                </button>
              </div>
            </div>

            {/* Back Home Main Button */}
            <div className="mt-7">
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-[0_0_20px_rgba(255,59,0,0.3)] font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>RETURN TO PORTFOLIO TIMELINE</span>
              </button>
            </div>

          </div>
        </RetroWindow>

        {/* Footer diagnostic label */}
        <div className="text-center font-mono text-xs text-white/40 mt-5">
          {brandName} WORKSTATION // HTTP 404 DIAGNOSTIC // TIMEBASE: 24 FPS
        </div>
      </div>
    </div>
  );
};
