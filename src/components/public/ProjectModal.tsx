import React, { useState } from 'react';
import { 
  X, Film, Tag, Calendar, User, Cpu, 
  Smartphone, Share2, Check, ArrowRight, ExternalLink,
  Layers, Volume2, Palette, ShieldCheck, Image as ImageIcon,
  Monitor, Square
} from 'lucide-react';
import { Project, VideoItem } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';
import { VideoPlayer } from '../player/VideoPlayer';
import { BeforeAfterSlider } from '../player/BeforeAfterSlider';
import { SocialShareModal } from './SocialShareModal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookSimilar?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onBookSimilar }) => {
  if (!project) return null;

  // Compile all video items including ratio versions
  const baseVideos: VideoItem[] = [project.mainVideo, ...(project.additionalVideos || [])];
  
  // Also convert aspectRatioVersions to playable VideoItems if present
  if (project.aspectRatioVersions) {
    project.aspectRatioVersions.forEach((arv) => {
      if (!baseVideos.some((v) => v.providerIdOrUrl === arv.videoUrl)) {
        baseVideos.push({
          id: arv.id,
          title: arv.label,
          provider: arv.provider || 'direct_upload',
          providerIdOrUrl: arv.videoUrl,
          orientation: arv.ratio === '9:16' ? 'portrait' : arv.ratio === '1:1' ? 'square' : 'landscape',
          aspectRatio: arv.ratio,
          thumbnailUrl: arv.thumbnailUrl || project.thumbnail,
          status: 'healthy',
        });
      }
    });
  }

  const [activeVideoId, setActiveVideoId] = useState<string>(project.mainVideo.id);
  const [activeMediaView, setActiveMediaView] = useState<'video' | 'before_after'>('video');
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState<'overview' | 'breakdown' | 'credits'>('overview');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const currentVideo = baseVideos.find((v) => v.id === activeVideoId) || project.mainVideo;

  const handleCopyLink = () => {
    setShowShareModal(true);
  };

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto w-full h-full border-0 m-0 max-w-none max-h-none block"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col my-auto shadow-2xl">
        <RetroWindow
          title={`CASE_STUDY // ${project.title}`}
          subtitle={`CLIENT: ${project.client} • RELEASE: ${project.year}`}
          badge={project.category}
          onClose={onClose}
          className="w-full flex-1 flex flex-col max-h-[92vh] bg-[#0e0e11]"
          bodyClassName="overflow-y-auto"
        >
          {/* Breadcrumb Navigation for UX & Internal Linking */}
          <nav aria-label="Project Breadcrumb" className="px-4 sm:px-6 pt-3 flex items-center gap-1.5 font-mono text-[11px] text-white/50 border-b border-white/10 pb-2.5">
            <button type="button" onClick={onClose} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <button type="button" onClick={onClose} className="hover:text-white transition-colors cursor-pointer">Archive</button>
            <span>/</span>
            <span className="text-white/70">{project.category}</span>
            <span>/</span>
            <span className="text-[#ff3b00] font-bold truncate max-w-[250px]">{project.title}</span>
          </nav>

          <div className="p-4 sm:p-6 flex flex-col gap-6">
            {/* Top Video / Grade Switcher Bar */}
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              {/* Video Tabs */}
              <nav aria-label="Project Video Versions">
                <ul role="list" className="flex flex-wrap items-center gap-2 font-mono text-xs list-none p-0 m-0">
                  {baseVideos.map((vid) => (
                    <li key={vid.id}>
                      <button
                        id={`modal-video-btn-${vid.id}`}
                        type="button"
                        onClick={() => {
                          setActiveVideoId(vid.id);
                          setActiveMediaView('video');
                        }}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                          activeMediaView === 'video' && activeVideoId === vid.id
                            ? 'bg-[#ff3b00] text-white font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                        }`}
                      >
                        {vid.orientation === 'portrait' ? (
                          <Smartphone className="w-3.5 h-3.5 text-[#00e5ff]" aria-hidden="true" />
                        ) : vid.orientation === 'square' ? (
                          <Square className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                        ) : (
                          <Film className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{vid.title}</span>
                        <span className="text-[10px] opacity-70">({vid.aspectRatio})</span>
                      </button>
                    </li>
                  ))}

                  {/* Before / After Grade Tab if available */}
                  {project.beforeAfter && (
                    <li>
                      <button
                        id="modal-raw-grade-btn"
                        type="button"
                        onClick={() => setActiveMediaView('before_after')}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                          activeMediaView === 'before_after'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        <Palette className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>RAW vs FILM GRADE</span>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>

              {/* Share & Deep Link button */}
              <button
                id="modal-share-project-btn"
                type="button"
                onClick={handleCopyLink}
                className="font-mono text-xs text-white/60 hover:text-white flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded border border-white/10 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
                <span>{copiedLink ? 'LINK COPIED!' : 'SHARE PROJECT'}</span>
              </button>
            </header>

            {/* Main Media Showcase (Video or Before/After Slider) */}
            <section aria-label="Media Showcase" className="w-full bg-black rounded-lg overflow-hidden border border-white/15">
              {activeMediaView === 'video' ? (
                <div className="p-2 sm:p-4 bg-[#0a0a0c]">
                  <VideoPlayer
                    key={currentVideo.id}
                    video={currentVideo}
                    autoPlay={true}
                    retroEffect={project.retroEffect}
                  />
                  {currentVideo.description && (
                    <p className="font-mono text-xs text-white/60 mt-2 px-1">
                      // {currentVideo.description}
                    </p>
                  )}
                </div>
              ) : project.beforeAfter ? (
                <div className="p-2 sm:p-4 bg-[#0a0a0c]">
                  <BeforeAfterSlider
                    beforeImage={project.beforeAfter.beforeImage || project.thumbnail}
                    afterImage={project.beforeAfter.afterImage || project.thumbnail}
                    beforeLabel={project.beforeAfter.beforeLabel || 'RAW LOG FOOTAGE'}
                    afterLabel={project.beforeAfter.afterLabel || 'FINAL ACES MASTER GRADE'}
                  />
                </div>
              ) : null}
            </section>

            {/* Case Study Story Tabs Header */}
            <nav aria-label="Case study chapters" className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                id="case-study-tab-overview"
                type="button"
                onClick={() => setActiveCaseStudyTab('overview')}
                className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-colors cursor-pointer ${
                  activeCaseStudyTab === 'overview'
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                1. OVERVIEW &amp; STORY
              </button>

              {(project.editingProcess || project.colorGradingNotes || project.soundDesignNotes || project.motionVfxNotes) && (
                <button
                  id="case-study-tab-breakdown"
                  type="button"
                  onClick={() => setActiveCaseStudyTab('breakdown')}
                  className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-colors cursor-pointer ${
                    activeCaseStudyTab === 'breakdown'
                      ? 'bg-white/15 text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  2. EDITORIAL &amp; COLOR BREAKDOWN
                </button>
              )}

              {(project.credits || project.stills) && (
                <button
                  id="case-study-tab-credits"
                  type="button"
                  onClick={() => setActiveCaseStudyTab('credits')}
                  className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-colors cursor-pointer ${
                    activeCaseStudyTab === 'credits'
                      ? 'bg-white/15 text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  3. STILLS &amp; CREDITS
                </button>
              )}
            </nav>

            {/* Case Study Tab Contents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols as Article */}
              <article className="lg:col-span-2 flex flex-col gap-6">
                {activeCaseStudyTab === 'overview' && (
                  <div className="space-y-6">
                    {/* The Brief */}
                    <div>
                      <h3 className="font-mono text-xs tracking-widest text-[#00e5ff] uppercase mb-1 flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>THE CREATIVE BRIEF</span>
                      </h3>
                      <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed">
                        {project.brief || project.description}
                      </p>
                    </div>

                    {/* The Challenge */}
                    {project.challenge && (
                      <div className="p-4 rounded-lg bg-[#141418] border border-white/10">
                        <h4 className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-1">
                          PRODUCTION CHALLENGE
                        </h4>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {/* Creative Direction / Approach */}
                    {project.creativeDirection && (
                      <div>
                        <h3 className="font-mono text-xs tracking-widest text-[#ff3b00] uppercase mb-1">
                          CREATIVE DIRECTION &amp; PACING
                        </h3>
                        <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed">
                          {project.creativeDirection}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeCaseStudyTab === 'breakdown' && (
                  <div className="space-y-5">
                    {project.editingProcess && (
                      <div className="p-4 rounded-lg bg-[#121216] border border-white/10">
                        <div className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>EDITORIAL &amp; ASSEMBLY WORKFLOW</span>
                        </div>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {project.editingProcess}
                        </p>
                      </div>
                    )}

                    {project.colorGradingNotes && (
                      <div className="p-4 rounded-lg bg-[#121216] border border-white/10">
                        <div className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>DAVINCI RESOLVE COLOR PIPELINE</span>
                        </div>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {project.colorGradingNotes}
                        </p>
                      </div>
                    )}

                    {project.soundDesignNotes && (
                      <div className="p-4 rounded-lg bg-[#121216] border border-white/10">
                        <div className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>SOUND DESIGN &amp; AUDIO MIXING</span>
                        </div>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {project.soundDesignNotes}
                        </p>
                      </div>
                    )}

                    {project.motionVfxNotes && (
                      <div className="p-4 rounded-lg bg-[#121216] border border-white/10">
                        <div className="font-mono text-xs text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>MOTION GRAPHICS &amp; VFX</span>
                        </div>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {project.motionVfxNotes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeCaseStudyTab === 'credits' && (
                  <div className="space-y-6">
                    {/* Stills Gallery */}
                    {project.stills && project.stills.length > 0 && (
                      <div>
                        <div className="font-mono text-xs text-white/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>PRODUCTION STILLS ARCHIVE</span>
                        </div>
                        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0 m-0">
                          {project.stills.map((still, sIdx) => (
                            <li key={sIdx}>
                              <figure className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-black m-0">
                                <img
                                  src={still}
                                  alt={`${project.title} Still ${sIdx + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                              </figure>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Production Credits Table as dl/dt/dd */}
                    {project.credits && project.credits.length > 0 && (
                      <div>
                        <div className="font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
                          FULL CREW &amp; ROLES
                        </div>
                        <dl className="divide-y divide-white/10 font-mono text-xs m-0">
                          {project.credits.map((cr, cIdx) => (
                            <div key={cIdx} className="py-2 flex items-center justify-between">
                              <dt className="text-white/50">{cr.role}</dt>
                              <dd className="text-white font-semibold m-0">{cr.name}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </div>
                )}

                {/* Services Provided */}
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-white/50 uppercase mb-2">
                    SERVICES DELIVERED
                  </h3>
                  <ul role="list" className="flex flex-wrap gap-2 font-mono text-xs list-none p-0 m-0">
                    {project.services.map((serv) => (
                      <li
                        key={serv}
                        className="px-2.5 py-1 rounded bg-[#ff3b00]/10 border border-[#ff3b00]/30 text-[#ff3b00] font-medium"
                      >
                        ✓ {serv}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Right Col: Technical Metadata Specs Box & CTA as Semantic Aside */}
              <aside aria-label="Technical Archive Specs" className="flex flex-col gap-4">
                <dl className="bg-[#141418] border border-white/10 rounded-lg p-4 flex flex-col gap-4 font-mono text-xs m-0">
                  <dt className="text-white/40 pb-2 border-b border-white/10 uppercase tracking-widest text-[10px] font-bold">
                    TECHNICAL ARCHIVE METRICS
                  </dt>
                  <dd className="sr-only">Specifications</dd>

                  <div>
                    <dt className="text-white/40 block text-[10px]">CLIENT / LABEL:</dt>
                    <dd className="text-white font-semibold m-0">{project.client}</dd>
                  </div>

                  <div>
                    <dt className="text-white/40 block text-[10px]">RELEASE YEAR:</dt>
                    <dd className="text-white m-0">{project.year}</dd>
                  </div>

                  <div>
                    <dt className="text-white/40 block text-[10px]">ROLE:</dt>
                    <dd className="text-[#00e5ff] font-semibold m-0">{project.role}</dd>
                  </div>

                  <div>
                    <dt className="text-white/40 block text-[10px] mb-1.5">SOFTWARE &amp; PIPELINE:</dt>
                    <dd className="m-0">
                      <ul role="list" className="flex flex-wrap gap-1 list-none p-0 m-0">
                        {project.software.map((sw) => (
                          <li key={sw} className="px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10 text-[10px]">
                            {sw}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-white/40 block text-[10px] mb-1.5">TAGS:</dt>
                    <dd className="m-0">
                      <ul role="list" className="flex flex-wrap gap-1 list-none p-0 m-0">
                        {project.tags.map((tg) => (
                          <li key={tg} className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-[10px]">
                            #{tg}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                {/* Hire for Similar Project Button */}
                <button
                  id="modal-book-similar-btn"
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onBookSimilar) onBookSimilar(project);
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-[#ff3b00] hover:bg-[#ff5520] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#ff3b00]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>BOOK SIMILAR PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </aside>
            </div>
          </div>
        </RetroWindow>
      </div>

      {/* Social Sharing Dialog */}
      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={{
          title: `${project.title} // ${project.client} (${project.category})`,
          description: project.description || `Commercial video project edited by Eko Pixels.`,
          url: `${window.location.origin}/?project=${project.slug || project.id}`,
          tags: project.tags,
        }}
      />
    </dialog>
  );
};
