import React from 'react';
import {
  Eye,
  Film,
  Mail,
  Play,
  TrendingUp,
  CheckCircle2,
  HardDrive,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';

export const AdminOverview: React.FC = () => {
  const {
    analytics,
    projects,
    enquiries,
    proofingReviews,
    setAdminTab,
    isDriveConnected,
    driveAccountEmail,
    setShowShowreelModal,
  } = usePortfolio();
  const { brand } = useTheme();

  const stats = [
    {
      label: 'Total Portfolio Views',
      value: analytics.totalPortfolioViews.toLocaleString(),
      change: '+18.4% this month',
      icon: <Eye className="w-5 h-5 text-blue-400" />,
    },
    {
      label: 'Showreel Plays',
      value: analytics.showreelPlays.toLocaleString(),
      change: 'Avg 84% completion',
      icon: <Play className="w-5 h-5 text-amber-400" />,
    },
    {
      label: 'New Client Enquiries',
      value: enquiries.length,
      change: `${enquiries.filter(e => e.status === 'new').length} unread leads`,
      icon: <Mail className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'Active Client Reviews',
      value: proofingReviews.length,
      change: `${proofingReviews.filter(r => r.status === 'in_review').length} awaiting sign-off`,
      icon: <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)]" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <header className="glass-card p-6 sm:p-8 rounded-2xl border border-[var(--brand-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)]">
            Director & Editor Control Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--brand-text)] mt-1">
            Welcome back, {brand.brandName}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Your portfolio is live. Google Drive sync is{' '}
            <strong className={isDriveConnected ? 'text-emerald-400' : 'text-amber-400'}>
              {isDriveConnected ? `Active (${driveAccountEmail})` : 'Disconnected'}
            </strong>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => setAdminTab('brand-studio')}
          >
            Customize Brand
          </GlassButton>
          <GlassButton
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setAdminTab('projects')}
          >
            Add New Project
          </GlassButton>
        </div>
      </header>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading">
        <h3 id="stats-heading" className="sr-only">Key Performance Metrics</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-0 p-0">
          {stats.map((item, idx) => (
            <GlassCard key={idx} className="p-5 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <dt className="text-xs font-semibold text-[var(--brand-text-secondary)]">
                  {item.label}
                </dt>
                <div className="p-2 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)]">
                  {item.icon}
                </div>
              </div>

              <div>
                <dd className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--brand-text)] block m-0">
                  {item.value}
                </dd>
                <span className="text-[11px] text-[var(--brand-text-muted)] mt-1 block">
                  {item.change}
                </span>
              </div>
            </GlassCard>
          ))}
        </dl>
      </section>

      {/* Two Column Section: Recent Inquiries & Quick Drive Sync */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <section aria-labelledby="recent-enquiries-heading" className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 id="recent-enquiries-heading" className="text-lg font-bold font-heading text-[var(--brand-text)] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
              Recent Commercial Enquiries
            </h3>
            <button
              type="button"
              onClick={() => setAdminTab('enquiries')}
              className="text-xs font-semibold text-[var(--brand-primary)] hover:underline cursor-pointer"
            >
              View All ({enquiries.length}) →
            </button>
          </div>

          <ul className="space-y-3 list-none p-0 m-0">
            {enquiries.slice(0, 3).map(enq => (
              <li key={enq.id}>
                <article
                  className="p-4 rounded-xl glass-surface border border-[var(--brand-border)] flex items-start justify-between gap-4 hover:border-[var(--brand-primary)]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--brand-text)]">
                        {enq.clientName}
                      </span>
                      {enq.company && (
                        <span className="text-xs text-[var(--brand-text-muted)]">
                          · {enq.company}
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          enq.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--brand-text-secondary)] mt-1 line-clamp-1">
                      {enq.message}
                    </p>
                    <span className="text-[10px] font-mono text-[var(--brand-primary)] mt-1 block">
                      {enq.projectType} · Budget: {enq.budgetRange}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAdminTab('enquiries')}
                    className="p-2 rounded-lg hover:bg-white/10 text-[var(--brand-text-secondary)] cursor-pointer"
                    aria-label={`View enquiry from ${enq.clientName}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Media & Drive Status (5 cols) */}
        <section aria-labelledby="drive-storage-heading" className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 id="drive-storage-heading" className="text-lg font-bold font-heading text-[var(--brand-text)] flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[var(--brand-primary)]" />
              Google Drive Cloud Storage
            </h3>
            <button
              type="button"
              onClick={() => setAdminTab('googledrive')}
              className="text-xs font-semibold text-[var(--brand-primary)] hover:underline cursor-pointer"
            >
              Open Browser →
            </button>
          </div>

          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--brand-border)]">
              <div>
                <span className="text-xs text-[var(--brand-text-muted)] block">
                  Connected Account
                </span>
                <span className="text-sm font-semibold text-[var(--brand-text)] font-mono">
                  {driveAccountEmail || 'Not connected'}
                </span>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <dl className="space-y-2 text-xs text-[var(--brand-text-secondary)] m-0 p-0">
              <div className="flex justify-between">
                <dt>Indexed ProRes Masters:</dt>
                <dd className="m-0 font-bold text-[var(--brand-text)]">24 Files (412 GB)</dd>
              </div>
              <div className="flex justify-between">
                <dt>Client Proofing Cuts:</dt>
                <dd className="m-0 font-bold text-[var(--brand-text)]">6 Active Links</dd>
              </div>
              <div className="flex justify-between">
                <dt>Color Grade LUTs:</dt>
                <dd className="m-0 font-bold text-[var(--brand-text)]">18 LUTs</dd>
              </div>
            </dl>

            <GlassButton
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setAdminTab('googledrive')}
            >
              Select Google Drive Videos
            </GlassButton>
          </GlassCard>
        </section>
      </div>
    </div>
  );
};
