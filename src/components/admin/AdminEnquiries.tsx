import React from 'react';
import { Mail, Phone, Calendar, DollarSign, ExternalLink, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EnquiryItem } from '../../types';
import { GlassCard } from '../common/GlassCard';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = usePortfolio();

  return (
    <section className="space-y-6" id="admin-enquiries-root">
      <header>
        <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
          Client Project Enquiries & Leads ({enquiries.length})
        </h2>
        <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
          Inbound client briefs, project deadlines, budgets, and cloud footage links submitted via your website.
        </p>
      </header>

      {enquiries.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <Mail className="w-12 h-12 text-[var(--brand-text-muted)] mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[var(--brand-text)]">No enquiries yet</h3>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-1">
            When clients fill out the contact form on your portfolio, leads will appear here.
          </p>
        </GlassCard>
      ) : (
        <ul className="space-y-4 list-none p-0 m-0">
          {enquiries.map(enq => (
            <li key={enq.id}>
              <article>
                <GlassCard className="p-5 space-y-4">
                  <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--brand-border)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[var(--brand-text)]">
                          {enq.clientName}
                        </h3>
                        {enq.company && (
                          <span className="text-xs text-[var(--brand-text-muted)]">
                            · {enq.company}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[var(--brand-text-muted)]">
                        Received:{' '}
                        <time dateTime={enq.receivedAt}>
                          {new Date(enq.receivedAt).toLocaleDateString()} at{' '}
                          {new Date(enq.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </time>
                      </span>
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={e => updateEnquiryStatus(enq.id, e.target.value as any)}
                        aria-label={`Update status for enquiry from ${enq.clientName}`}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border uppercase tracking-wider ${
                          enq.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : enq.status === 'in_discussion'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                            : enq.status === 'booked'
                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                        }`}
                      >
                        <option value="new">New Lead</option>
                        <option value="in_discussion">In Discussion</option>
                        <option value="booked">Booked & Confirmed</option>
                        <option value="archived">Archived</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enq.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer"
                        title="Delete Enquiry"
                        aria-label={`Delete enquiry from ${enq.clientName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </header>

                  {/* Message Content */}
                  <blockquote className="m-0 p-0">
                    <p className="text-sm text-[var(--brand-text)] leading-relaxed bg-[var(--brand-surface-elevated)] p-4 rounded-xl border border-[var(--brand-border)] m-0">
                      "{enq.message}"
                    </p>
                  </blockquote>

                  {/* Metadata & Contact */}
                  <address className="not-italic grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[var(--brand-text-secondary)]">
                      <Mail className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                      <a href={`mailto:${enq.clientEmail}`} className="hover:underline font-mono truncate">
                        {enq.clientEmail}
                      </a>
                    </div>

                    {enq.clientPhone && (
                      <div className="flex items-center gap-2 text-[var(--brand-text-secondary)]">
                        <Phone className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                        <a href={`tel:${enq.clientPhone}`} className="hover:underline font-mono">
                          {enq.clientPhone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[var(--brand-text-secondary)]">
                      <DollarSign className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                      <span>Budget: <strong className="text-[var(--brand-text)]">{enq.budgetRange}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-[var(--brand-text-secondary)]">
                      <Clock className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                      <span>Deadline: <strong className="text-[var(--brand-text)]">{enq.deadline}</strong></span>
                    </div>
                  </address>

                  {/* Cloud Footage Link if provided */}
                  {enq.footageLink && (
                    <footer className="pt-2 border-t border-[var(--brand-border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--brand-text-muted)]">Footage Link Provided:</span>
                      <a
                        href={enq.footageLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--brand-primary)] hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>Open Drive / Cloud Asset</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </footer>
                  )}
                </GlassCard>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
