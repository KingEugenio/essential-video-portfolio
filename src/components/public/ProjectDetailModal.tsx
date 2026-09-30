import React, { useEffect } from 'react';
import {
  X,
  Calendar,
  User,
  Film,
  Layers,
  Wrench,
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Sliders,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { UniversalVideoPlayer } from '../video/UniversalVideoPlayer';
import { BeforeAfterSlider } from '../video/BeforeAfterSlider';
import { GlassButton } from '../common/GlassButton';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProjectSlug, setSelectedProjectSlug, getProjectBySlug, showToast } = usePortfolio();

  const project = selectedProjectSlug ? getProjectBySlug(selectedProjectSlug) : undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectSlug(null);
    };
    if (selectedProjectSlug) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProjectSlug, setSelectedProjectSlug]);

  if (!project) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Project link copied to clipboard!');
  };

  return (
    <dialog
      open
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto bg-transparent border-0 w-full h-full max-w-none max-h-none m-0"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={() => setSelectedProjectSlug(null)}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-6xl glass-card bg-neutral-950/95 border border-[var(--brand-border)] p-4 sm:p-8 shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto flex flex-col gap-8"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        {/* Top Sticky Header */}
        <header className="flex items-center justify-between pb-4 border-b border-[var(--brand-border)]">
          <button
            type="button"
            onClick={() => setSelectedProjectSlug(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full text-[var(--brand-text-secondary)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Share Case Study"
              aria-label="Share Case Study"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedProjectSlug(null)}
              className="p-2 rounded-full text-[var(--brand-text-muted)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Hero Video Stage */}
        <figure className="w-full m-0">
          <UniversalVideoPlayer
            source={project.videoSource}
            title={project.title}
            autoPlay={true}
          />
        </figure>

        {/* Project Title & Metadata Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Story (8 Cols) */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            <header>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-2">
                <span>{project.category}</span>
                <span>·</span>
                <time dateTime={String(project.year)}>{project.year}</time>
              </div>
              <h1 id="modal-project-title" className="text-2xl sm:text-4xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-[var(--brand-text-secondary)] mt-3 leading-relaxed">
                {project.description}
              </p>
            </header>

            {/* THE BRIEF */}
            {project.brief && (
              <section aria-labelledby="brief-heading" className="p-5 rounded-xl glass-surface border border-[var(--brand-border)]">
                <h3 id="brief-heading" className="text-xs uppercase tracking-widest font-bold text-[var(--brand-primary)] mb-2 flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  The Brief & Creative Objectives
                </h3>
                <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  {project.brief}
                </p>
              </section>
            )}

            {/* THE APPROACH */}
            {project.approach && (
              <section aria-labelledby="approach-heading">
                <h3 id="approach-heading" className="text-lg font-bold font-heading text-[var(--brand-text)] mb-2">
                  The Editorial & Finishing Approach
                </h3>
                <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed">
                  {project.approach}
                </p>
              </section>
            )}

            {/* INTERACTIVE BEFORE / AFTER GRADING COMPARISON */}
            {project.beforeAfterData?.hasBeforeAfter && (
              <section aria-label="Grading Comparison" className="pt-4 border-t border-[var(--brand-border)]">
                <BeforeAfterSlider data={project.beforeAfterData} />
              </section>
            )}

            {/* GALLERY STILLS */}
            {project.gallery && project.gallery.length > 0 && (
              <section aria-labelledby="gallery-heading" className="pt-4 border-t border-[var(--brand-border)] space-y-4">
                <h3 id="gallery-heading" className="text-base font-bold font-heading text-[var(--brand-text)]">
                  Production Frames & High-Res Stills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.gallery.map(item => (
                    <figure
                      key={item.id}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-[var(--brand-border)] bg-black m-0"
                    >
                      <img
                        src={item.url}
                        alt={item.caption || 'Project still'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent text-[11px] text-white/90">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Meta Sidebar (4 Cols) */}
          <aside aria-label="Project details and meta" className="lg:col-span-4 flex flex-col gap-6">
            {/* Meta Card */}
            <div className="glass-surface p-5 rounded-2xl border border-[var(--brand-border)] space-y-4">
              <dl className="space-y-4 m-0">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-text-muted)] block">
                    Client
                  </dt>
                  <dd className="text-sm font-semibold text-[var(--brand-text)] mt-0.5 block m-0">
                    {project.client}
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-text-muted)] block">
                    Year
                  </dt>
                  <dd className="text-sm font-semibold text-[var(--brand-text)] mt-0.5 block m-0">
                    <time dateTime={String(project.year)}>{project.year}</time>
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-text-muted)] block mb-1">
                    My Role & Responsibilities
                  </dt>
                  <dd className="m-0">
                    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
                      {project.role.map((r, i) => (
                        <li
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-md bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] border border-[var(--brand-border)] font-medium"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-text-muted)] block mb-1">
                    Software Stack
                  </dt>
                  <dd className="m-0">
                    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
                      {project.software.map((sw, i) => (
                        <li
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 font-medium"
                        >
                          {sw}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                {project.services && project.services.length > 0 && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-text-muted)] block mb-1">
                      Services Delivered
                    </dt>
                    <dd className="m-0">
                      <ul className="space-y-1 list-none p-0 m-0">
                        {project.services.map((s, i) => (
                          <li key={i} className="text-xs text-[var(--brand-text-secondary)] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Quick Inquiry CTA */}
            <div className="glass-card p-5 rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 text-center space-y-3">
              <Sparkles className="w-6 h-6 text-[var(--brand-primary)] mx-auto" />
              <h4 className="text-sm font-bold text-[var(--brand-text)]">
                Have a similar commercial or film in mind?
              </h4>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                Let's discuss timeline, footage ingest, and deliverable specs.
              </p>
              <GlassButton
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setSelectedProjectSlug(null);
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Inquire for Booking
              </GlassButton>
            </div>
          </aside>
        </div>
      </div>
    </dialog>
  );
};
