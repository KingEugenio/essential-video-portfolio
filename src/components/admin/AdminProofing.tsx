import React, { useState } from 'react';
import {
  Plus,
  Share2,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Film,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassModal } from '../common/GlassModal';

export const AdminProofing: React.FC = () => {
  const {
    proofingReviews,
    createProofingReview,
    setActiveProofingId,
    setActiveView,
    showToast,
  } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    projectTitle: '',
    clientName: '',
    versionName: 'v1_RoughCut',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.projectTitle || !newReview.clientName) return;

    const id = createProofingReview({
      projectId: `proj-${Date.now()}`,
      projectTitle: newReview.projectTitle,
      clientName: newReview.clientName,
      versionName: newReview.versionName,
      status: 'in_review',
      videoSource: {
        provider: 'direct',
        url: newReview.videoUrl,
        posterUrl: newReview.posterUrl,
        duration: '03:10',
      },
    });

    setIsModalOpen(false);
    showToast('New client proofing review created!');
  };

  const copyShareLink = (reviewId: string) => {
    const url = `${window.location.origin}/?proofing=${reviewId}`;
    navigator.clipboard.writeText(url);
    showToast('Client proofing portal link copied to clipboard!');
  };

  const openReviewPortal = (reviewId: string) => {
    setActiveProofingId(reviewId);
    setActiveView('proofing');
  };

  return (
    <section className="space-y-6 animate-fade-in" id="admin-proofing-root">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)] flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[var(--brand-primary)]" />
            Client Proofing & Review System
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Create private timecoded review links for your clients and directors to leave frame-accurate revision notes.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Proofing Link
        </GlassButton>
      </header>

      <ul className="grid grid-cols-1 gap-4 list-none p-0 m-0">
        {proofingReviews.map(rev => (
          <li key={rev.id}>
            <article className="glass-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-[var(--brand-border)]">
              <div className="flex items-center gap-4">
                <figure className="relative w-28 h-18 rounded-xl overflow-hidden bg-black shrink-0 border border-[var(--brand-border)] m-0">
                  <img
                    src={rev.videoSource.posterUrl}
                    alt={rev.projectTitle}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/80 text-white">
                    {rev.versionName}
                  </span>
                  <figcaption className="sr-only">{rev.projectTitle} - {rev.versionName}</figcaption>
                </figure>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold font-heading text-[var(--brand-text)] m-0">
                      {rev.projectTitle}
                    </h3>
                    <span className="text-xs text-[var(--brand-text-muted)]">
                      · Client: <strong>{rev.clientName}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--brand-text-secondary)]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      <strong>{rev.comments.length}</strong> timecoded notes
                    </span>
                    <span>
                      ({rev.comments.filter(c => c.status === 'resolved').length} resolved)
                    </span>
                  </div>
                </div>
              </div>

              <footer className="flex items-center gap-2 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => copyShareLink(rev.id)}
                  className="px-3 py-1.5 rounded-lg glass-surface border border-[var(--brand-border)] text-xs text-[var(--brand-text)] hover:text-white flex items-center gap-1.5 cursor-pointer"
                  title="Copy client share link"
                  aria-label="Copy client share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Share Link</span>
                </button>

                <GlassButton
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  onClick={() => openReviewPortal(rev.id)}
                >
                  Open Review Room
                </GlassButton>
              </footer>
            </article>
          </li>
        ))}
      </ul>

      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Generate Client Proofing Link"
        subtitle="Upload or link a video cut for frame-by-frame client feedback."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <legend className="sr-only">Proofing Review Form</legend>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nike Winter Commercial"
                  value={newReview.projectTitle}
                  onChange={e => setNewReview({ ...newReview, projectTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Client / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wieden+Kennedy"
                  value={newReview.clientName}
                  onChange={e => setNewReview({ ...newReview, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Cut Version Name
                </label>
                <input
                  type="text"
                  value={newReview.versionName}
                  onChange={e => setNewReview({ ...newReview, versionName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Poster Preview Image URL
                </label>
                <input
                  type="url"
                  value={newReview.posterUrl}
                  onChange={e => setNewReview({ ...newReview, posterUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                Video File URL / Google Drive Embed URL *
              </label>
              <input
                type="url"
                required
                value={newReview.videoUrl}
                onChange={e => setNewReview({ ...newReview, videoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] font-mono"
              />
            </div>
          </fieldset>

          <footer className="flex justify-end gap-2 pt-3">
            <GlassButton variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary" size="sm">
              Generate Review Portal
            </GlassButton>
          </footer>
        </form>
      </GlassModal>
    </section>
  );
};
