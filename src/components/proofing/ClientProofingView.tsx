import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Send,
  Download,
  Share2,
  Sparkles,
  Film,
  Lock,
  Eye,
  FileText,
  Sliders,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { UniversalVideoPlayer } from '../video/UniversalVideoPlayer';
import { GlassButton } from '../common/GlassButton';
import { GlassCard } from '../common/GlassCard';

export const ClientProofingView: React.FC = () => {
  const {
    activeProofingId,
    setActiveProofingId,
    proofingReviews,
    getProofingReview,
    addProofingComment,
    toggleCommentResolved,
    updateProofingStatus,
    setActiveView,
    showToast,
  } = usePortfolio();

  const { brand } = useTheme();

  const currentReview = activeProofingId
    ? getProofingReview(activeProofingId)
    : proofingReviews[0];

  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('Client Lead / Director');
  const [seekTime, setSeekTime] = useState<number | undefined>(undefined);

  if (!currentReview) {
    return (
      <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold mb-4">No active proofing project found</h2>
        <GlassButton variant="primary" onClick={() => setActiveView('public')}>
          Return to Portfolio
        </GlassButton>
      </div>
    );
  }

  const handleTimeUpdate = (time: number, dur: number) => {
    setCurrentVideoTime(time);
    setVideoDuration(dur);
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addProofingComment(currentReview.id, commentText, currentVideoTime, reviewerName);
    setCommentText('');
  };

  const handleExportNotes = () => {
    const text = currentReview.comments
      .map(c => `[${c.formattedTime}] (${c.status.toUpperCase()}) ${c.author}: ${c.text}`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentReview.projectTitle}_${currentReview.versionName}_Notes.txt`;
    a.click();
    showToast('Exported review notes file.');
  };

  const getStatusBadge = (status: typeof currentReview.status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Approved for Final Delivery
          </span>
        );
      case 'changes_requested':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            Revisions in Progress
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            In Review
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] flex flex-col">
      {/* Top Proofing Bar */}
      <header className="sticky top-0 z-40 bg-[var(--brand-surface)]/95 border-b border-[var(--brand-border)] px-4 sm:px-6 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('public')}
              className="p-2 rounded-lg glass-surface text-[var(--brand-text-secondary)] hover:text-white transition-colors cursor-pointer"
              title="Return to Public Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-primary)] text-black">
                  Client Review Portal
                </span>
                <span className="text-xs font-mono text-[var(--brand-text-muted)]">
                  {currentReview.versionName}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold font-heading text-[var(--brand-text)]">
                {currentReview.projectTitle} · {currentReview.clientName}
              </h1>
            </div>
          </div>

          {/* Quick Review Switcher dropdown if multiple */}
          <div className="flex items-center gap-3">
            {proofingReviews.length > 1 && (
              <select
                value={currentReview.id}
                onChange={e => setActiveProofingId(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] focus:outline-none"
              >
                {proofingReviews.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.projectTitle} ({r.versionName})
                  </option>
                ))}
              </select>
            )}

            {getStatusBadge(currentReview.status)}

            <button
              onClick={handleExportNotes}
              className="p-2 rounded-lg glass-surface text-[var(--brand-text-secondary)] hover:text-white border border-[var(--brand-border)] text-xs flex items-center gap-1.5"
              title="Export Timecoded Notes"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Notes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Review Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Big Player + Instructions (8 Cols) */}
        <section aria-label="Proofing Video Player and Approval" className="lg:col-span-8 flex flex-col gap-5">
          {/* Universal Video Player */}
          <div className="w-full">
            <UniversalVideoPlayer
              source={currentReview.videoSource}
              title={`${currentReview.projectTitle} - ${currentReview.versionName}`}
              proofingComments={currentReview.comments}
              onTimeUpdate={handleTimeUpdate}
              externalCurrentTime={seekTime}
            />
          </div>

          {/* Reviewer Action Bar */}
          <article className="glass-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--brand-border)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--brand-text)] m-0">
                  Ready to sign off or request changes?
                </h4>
                <p className="text-xs text-[var(--brand-text-secondary)] m-0">
                  Add timestamped feedback below or click Approve to finalize delivery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => updateProofingStatus(currentReview.id, 'changes_requested')}
              >
                Request Revisions
              </GlassButton>

              <GlassButton
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => updateProofingStatus(currentReview.id, 'approved')}
              >
                Approve Cut
              </GlassButton>
            </div>
          </article>

          {/* Version Changelog / Editor's Note */}
          <article className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] text-xs text-[var(--brand-text-secondary)] space-y-1.5">
            <span className="font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
              Editor's Changelog for {currentReview.versionName}:
            </span>
            <p className="m-0">
              Adjusted speed ramp on motorcycle sequence at 00:24. Applied final Kodak 2383 film LUT with highlight rolloff and audio cross-fades leveled for -14 LUFS broadcast.
            </p>
          </article>
        </section>

        {/* Right Column: Timecoded Comments Thread (4 Cols) */}
        {/* RIGHT COLUMN: Timecoded Comments & Notes Sidebar */}
        <aside aria-label="Review Comments & Timecodes" className="lg:col-span-4 flex flex-col gap-4">
          {/* Add Timestamp Note Box */}
          <GlassCard className="p-4 sm:p-5">
            <header className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                Add Timecoded Note
              </span>
              <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-[var(--brand-primary)] text-black">
                @ {formatSeconds(currentVideoTime)}
              </span>
            </header>

            <form onSubmit={handleAddComment} className="space-y-3">
              <fieldset className="border-0 p-0 m-0 space-y-3">
                <legend className="sr-only">New review note</legend>
                <div>
                  <label htmlFor="proofing-reviewer-name" className="sr-only">Your Name / Role</label>
                  <input
                    id="proofing-reviewer-name"
                    type="text"
                    placeholder="Your Name / Role"
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] focus:outline-none focus:border-[var(--brand-primary)]"
                  />
                </div>

                <div>
                  <label htmlFor="proofing-comment-text" className="sr-only">Note Content</label>
                  <textarea
                    id="proofing-comment-text"
                    required
                    rows={3}
                    placeholder="e.g. Pause here - can we adjust the color grade or tighten this transition by 4 frames?"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Send className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  Post Note at {formatSeconds(currentVideoTime)}
                </GlassButton>
              </fieldset>
            </form>
          </GlassCard>

          {/* Comments List */}
          <section aria-labelledby="feedback-notes-heading" className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <h3 id="feedback-notes-heading" className="text-xs font-bold text-[var(--brand-text-secondary)] uppercase tracking-wider">
                Feedback Notes ({currentReview.comments.length})
              </h3>
              <span className="text-[11px] text-[var(--brand-text-muted)]">
                Click timecode to jump
              </span>
            </div>

            <ol className="space-y-2.5 overflow-y-auto max-h-[480px] pr-1 list-none p-0 m-0">
              {currentReview.comments.length === 0 ? (
                <li className="glass-surface p-6 text-center rounded-xl border border-[var(--brand-border)]">
                  <p className="text-xs text-[var(--brand-text-muted)]">
                    No comments posted yet. Scrub the video and post a note at any timestamp!
                  </p>
                </li>
              ) : (
                currentReview.comments.map(comment => (
                  <li key={comment.id}>
                    <article
                      className={`p-3.5 rounded-xl border transition-all ${
                        comment.status === 'resolved'
                          ? 'bg-[var(--brand-surface)]/40 border-[var(--brand-border)]/40 opacity-70'
                          : 'glass-card border-[var(--brand-border)] hover:border-[var(--brand-primary)]/50'
                      }`}
                    >
                      <header className="flex items-start justify-between gap-2 mb-1.5">
                        <button
                          type="button"
                          onClick={() => setSeekTime(comment.timestamp)}
                          className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)] text-[var(--brand-primary)] hover:text-black border border-[var(--brand-primary)]/40 transition-colors cursor-pointer"
                          title="Jump video to this timestamp"
                        >
                          ⏱ {comment.formattedTime}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleCommentResolved(currentReview.id, comment.id)}
                            className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              comment.status === 'resolved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700'
                            }`}
                          >
                            {comment.status === 'resolved' ? '✓ Resolved' : 'Mark Done'}
                          </button>
                        </div>
                      </header>

                      <p className={`text-xs text-[var(--brand-text)] leading-relaxed ${
                        comment.status === 'resolved' ? 'line-through text-[var(--brand-text-muted)]' : ''
                      }`}>
                        {comment.text}
                      </p>

                      <footer className="mt-2 text-[10px] text-[var(--brand-text-muted)] flex items-center justify-between">
                        <span>{comment.author}</span>
                        <time dateTime={comment.createdAt}>
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </time>
                      </footer>
                    </article>
                  </li>
                ))
              )}
            </ol>
          </section>
        </aside>
      </main>
    </div>
  );
};
