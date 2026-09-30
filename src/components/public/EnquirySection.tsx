import React, { useState } from 'react';
import {
  Send,
  Calendar,
  Mail,
  Phone,
  FolderSync,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { generateGoogleCalendarUrl, downloadICS, type CalendarBooking } from '../../utils/calendarUtils';

export const EnquirySection: React.FC = () => {
  const { submitEnquiry } = usePortfolio();
  const { brand } = useTheme();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    projectType: 'Commercial / Brand Film',
    budgetRange: '$5,000 – $10,000',
    deadline: '',
    footageStatus: 'Footage is shot & ready in Google Drive / Cloud',
    footageLink: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastBooking, setLastBooking] = useState<CalendarBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.message) return;

    submitEnquiry({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      company: formData.company,
      projectType: formData.projectType,
      budgetRange: formData.budgetRange,
      deadline: formData.deadline || 'Flexible',
      footageStatus: formData.footageStatus,
      footageLink: formData.footageLink,
      message: formData.message,
    });

    setLastBooking({
      title: `${brand.brandName || 'Studio'}: ${formData.projectType}`,
      date: formData.deadline,
      details: `Project enquiry from ${formData.clientName}${formData.company ? ` (${formData.company})` : ''}.\nProject: ${formData.projectType}\nBudget: ${formData.budgetRange}\nTarget: ${formData.deadline || 'Flexible'}\n\nTentative hold — ${brand.brandName || 'the studio'} will confirm the schedule after reviewing the brief.`,
      studioName: brand.brandName,
      studioEmail: brand.contactEmail || brand.email,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
    });

    setIsSubmitted(true);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      company: '',
      projectType: 'Commercial / Brand Film',
      budgetRange: '$5,000 – $10,000',
      deadline: '',
      footageStatus: 'Footage is shot & ready in Google Drive / Cloud',
      footageLink: '',
      message: '',
    });
  };

  return (
    <section id="contact-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--brand-border)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info Column */}
        <aside aria-label="Contact and booking details" className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-3">
              Direct Contact
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
              START A PROJECT
            </h2>
            <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] mt-3 leading-relaxed">
              Have a commercial, music video, or documentary in post-production? Share your brief, footage timeline, and deliverables to get a custom quote and schedule.
            </p>
          </div>

          {/* Contact Details Card */}
          <address className="glass-surface p-6 rounded-2xl border border-[var(--brand-border)] space-y-4 not-italic">
            <div className="flex items-center gap-3 text-sm text-[var(--brand-text)]">
              <Mail className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
              <a href={`mailto:${brand.contactEmail || brand.email}`} className="hover:underline font-mono">
                {brand.contactEmail || brand.email}
              </a>
            </div>

            {(brand.contactPhone || brand.phone) && (
              <div className="flex items-center gap-3 text-sm text-[var(--brand-text)]">
                <Phone className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                <a href={`tel:${brand.contactPhone || brand.phone}`} className="font-mono hover:underline">
                  {brand.contactPhone || brand.phone}
                </a>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-[var(--brand-text-secondary)]">
              <Calendar className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
              <span>{brand.availabilityStatus}</span>
            </div>
          </address>

          {/* Post Pipeline Guarantee */}
          <div className="glass-card p-5 rounded-2xl border border-[var(--brand-border)] space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Post-Production Workflow
            </h4>
            <ul className="space-y-2 text-xs text-[var(--brand-text-secondary)] list-none p-0 m-0">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Google Drive / Aspera high-speed footage ingest</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private timecoded client proofing portal for frame-accurate notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ProRes 4444 XQ / Rec.709 & DCP cinema master delivery</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 sm:p-8">
            {isSubmitted ? (
              <output className="block text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
                  Project Enquiry Received!
                </h3>
                <p className="text-sm text-[var(--brand-text-secondary)] max-w-md mx-auto">
                  Thank you for reaching out. We have received your creative details and will review the timeline and provide a schedule within 24 hours.
                </p>

                {lastBooking && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                    <a
                      href={generateGoogleCalendarUrl(lastBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider hover:bg-[var(--brand-primary)]/25 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadICS(lastBooking)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download .ics</span>
                    </button>
                  </div>
                )}

                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </GlassButton>
              </output>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <fieldset className="border-0 p-0 m-0 space-y-5">
                  <legend className="sr-only">Project Enquiry Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-client-name" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="enquiry-client-name"
                        type="text"
                        required
                        placeholder="e.g. Sarah Connor"
                        value={formData.clientName}
                        onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquiry-client-email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="enquiry-client-email"
                        type="email"
                        required
                        placeholder="e.g. sarah@agency.com"
                        value={formData.clientEmail}
                        onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-company" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Company / Brand (Optional)
                      </label>
                      <input
                        id="enquiry-company"
                        type="text"
                        placeholder="e.g. Horizon Films"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquiry-client-phone" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="enquiry-client-phone"
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.clientPhone}
                        onChange={e => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-project-type" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Project Type
                      </label>
                      <select
                        id="enquiry-project-type"
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      >
                        <option>Commercial / Brand Film</option>
                        <option>Music Video</option>
                        <option>Documentary / Narrative</option>
                        <option>Color Grading Master Only</option>
                        <option>Social Media Campaign & Reels</option>
                        <option>Motion Graphics & VFX</option>
                        <option>Full End-to-End Post Production</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="enquiry-budget-range" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        id="enquiry-budget-range"
                        value={formData.budgetRange}
                        onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      >
                        <option>&lt; $2,500</option>
                        <option>$2,500 – $5,000</option>
                        <option>$5,000 – $10,000</option>
                        <option>$10,000 – $25,000</option>
                        <option>$25,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-deadline" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Target Delivery Date
                      </label>
                      <input
                        id="enquiry-deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquiry-footage-status" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                        Footage Status
                      </label>
                      <select
                        id="enquiry-footage-status"
                        value={formData.footageStatus}
                        onChange={e => setFormData({ ...formData, footageStatus: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      >
                        <option>Footage is shot & ready in Google Drive / Cloud</option>
                        <option>Currently Shooting / In Production</option>
                        <option>Pre-Production / Concept Stage</option>
                        <option>Re-editing existing assets</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-footage-link" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                      Google Drive / Cloud Footage Link (Optional)
                    </label>
                    <div className="relative">
                      <FolderSync className="w-4 h-4 text-[var(--brand-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="enquiry-footage-link"
                        type="url"
                        placeholder="https://drive.google.com/drive/folders/..."
                        value={formData.footageLink}
                        onChange={e => setFormData({ ...formData, footageLink: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1.5">
                      Creative Brief & Requirements *
                    </label>
                    <textarea
                      id="enquiry-message"
                      required
                      rows={4}
                      placeholder="Tell us about the project story, target duration, reference videos, deliverables (e.g. 1x 60s broadcast + 3x 15s 9:16 reels), and tone..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)] transition-colors resize-none"
                    />
                  </div>

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<Send className="w-4 h-4" />}
                    className="w-full"
                  >
                    Submit Project Enquiry
                  </GlassButton>
                </fieldset>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
