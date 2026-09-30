import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, HardDrive, Film, Clock, DollarSign, ShieldCheck, RefreshCw } from 'lucide-react';
import { ContactFormConfig } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';
import { WhatsAppIcon } from '../common/BrandIcons';
import { ThankYouModal } from './ThankYouModal';
import { safeJsonStringify } from '../../utils/serialization';

interface ContactSectionProps {
  config: ContactFormConfig;
  brandName?: string;
  onNavigateToReceipt?: (details: {
    name: string;
    email: string;
    projectType: string;
    referenceId: string;
  }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  config, 
  brandName = 'Eko Pixels',
  onNavigateToReceipt 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Commercial Campaign',
    budget: '$5,000 - $10,000',
    deadline: '',
    hasFootage: 'Yes - Footage is Ready',
    footageStorage: 'Google Drive',
    deliverables: '16:9 4K Master + Vertical 9:16 Cuts',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submissionReference, setSubmissionReference] = useState<string>('');
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const [rateLimitCooldown, setRateLimitCooldown] = useState<number>(0);

  // Check client rate limiting (max 3 submissions in 10 minutes)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ekopixels_submission_history');
      if (stored) {
        const timestamps: number[] = JSON.parse(stored);
        const recent = timestamps.filter((t) => Date.now() - t < 10 * 60 * 1000);
        if (recent.length >= 3) {
          const earliest = Math.min(...recent);
          const remainingSeconds = Math.ceil((earliest + 10 * 60 * 1000 - Date.now()) / 1000);
          if (remainingSeconds > 0) {
            setRateLimitCooldown(remainingSeconds);
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (rateLimitCooldown <= 0) return;
    const interval = setInterval(() => {
      setRateLimitCooldown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rateLimitCooldown > 0) {
      setErrorMessage(`Rate limit active: Please wait ${rateLimitCooldown}s before transmitting another brief.`);
      setStatus('error');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide both your name and email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: safeJsonStringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Record timestamp in local storage
        try {
          const stored = localStorage.getItem('ekopixels_submission_history');
          const timestamps: number[] = stored ? JSON.parse(stored) : [];
          timestamps.push(Date.now());
          localStorage.setItem('ekopixels_submission_history', JSON.stringify(timestamps.slice(-10)));
        } catch {
          // Ignore storage errors
        }

        const generatedRef = result.inquiryId || `EP-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmissionReference(generatedRef);
        setStatus('success');
        setShowThankYouModal(true);
      } else {
        setStatus('error');
        if (response.status === 429) {
          const retrySeconds = result.retryAfterSeconds || 600;
          setRateLimitCooldown(retrySeconds);
          setErrorMessage(`Rate limit reached: Maximum submissions exceeded. Please wait ${retrySeconds}s before transmitting.`);
        } else {
          setErrorMessage(result.error || 'Failed to transmit brief. Please retry or contact directly via WhatsApp.');
        }
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network transmission error. Please check your connection or contact via WhatsApp.');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column as Semantic Header / Aside */}
        <header className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] tracking-widest uppercase mb-2">
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>TRANSMISSION PORTAL // BOOKINGS</span>
            </div>
            <h2 id="contact-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {config.heading || 'START A PROJECT TRANSMISSION'}
            </h2>
          </div>

          <p className="font-body text-base text-white/70 leading-relaxed">
            {config.subheading || 'Provide project parameters below. We calibrate timeline availability, storage workflows, and deliverable specs.'}
          </p>

          {/* WhatsApp Direct Option with Real SVG */}
          {config.showWhatsapp && config.whatsappNumber && (
            <aside aria-label="Direct WhatsApp Contact" className="bg-[#121214] border border-white/10 p-5 rounded-lg flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <WhatsAppIcon className="w-4 h-4" />
                <span className="font-bold">FAST-TRACK WHATSAPP DIRECT</span>
              </div>
              <p className="font-body text-xs text-white/60">
                For urgent turnaround inquiries, commercial holds, or on-set DIT consults:
              </p>
              <a
                id="contact-whatsapp-link"
                href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20video%20editing%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold rounded transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>OPEN WHATSAPP CHAT</span>
              </a>
            </aside>
          )}

          {/* Rate Limiting Notice Badge */}
          {rateLimitCooldown > 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-xs flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Rate limiter active: {rateLimitCooldown}s cooldown</span>
            </div>
          )}

          {/* Protocol specs */}
          <ul role="list" aria-label="Delivery protocol guarantees" className="space-y-3 font-mono text-xs text-white/50 border-t border-white/10 pt-4 list-none p-0 m-0">
            <li className="flex items-center gap-2">
              <span className="text-[#00e5ff]" aria-hidden="true">✓</span>
              <span>Encrypted transmission logs</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00e5ff]" aria-hidden="true">✓</span>
              <span>Google Drive &amp; Frame.io native support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00e5ff]" aria-hidden="true">✓</span>
              <span>Response guarantee within 24 hours</span>
            </li>
          </ul>
        </header>

        {/* Right Column: Retro Transmission Window Form */}
        <div className="lg:col-span-7">
          <RetroWindow
            title="TRANSMISSION_FORM // NEW_PROJECT_REQUEST.EXE"
            subtitle="PROTOCOL v2.4"
            badge="SECURE"
            className="w-full shadow-2xl"
          >
            <div className="p-6 sm:p-8 bg-[#101014]">
              {status === 'success' ? (
                <div role="status" aria-live="polite" className="py-12 text-center flex flex-col items-center gap-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center" aria-hidden="true">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    TRANSMISSION LOGGED
                  </h3>
                  <div className="font-mono text-xs text-[#00e5ff] px-3 py-1 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/30">
                    REF: {submissionReference}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
                    {config.successMessage || "Thanks for reaching out. Your project enquiry has been received. I'll get back to you shortly."}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowThankYouModal(true)}
                      className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff551f] text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      VIEW RECEIPT DETAILS
                    </button>
                    <button
                      id="contact-reset-btn"
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          projectType: 'Commercial Campaign',
                          budget: '$5,000 - $10,000',
                          deadline: '',
                          hasFootage: 'Yes - Footage is Ready',
                          footageStorage: 'Google Drive',
                          deliverables: '16:9 4K Master + Vertical 9:16 Cuts',
                          message: '',
                        });
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded border border-white/20 cursor-pointer"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </div>
                </div>
              ) : (
                <form id="project-inquiry-form" onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                        YOUR NAME <span className="text-[#ff3b00]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                        EMAIL ADDRESS <span className="text-[#ff3b00]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="e.g. alex@studio.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {config.fields?.phone && (
                      <div>
                        <label htmlFor="contact-phone" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          PHONE / WHATSAPP
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                        />
                      </div>
                    )}

                    {config.fields?.company && (
                      <div>
                        <label htmlFor="contact-company" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          COMPANY / LABEL
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          autoComplete="organization"
                          placeholder="e.g. Universal Music / Nike"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Type & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {config.fields?.projectType && (
                      <div>
                        <label htmlFor="contact-project-type" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          PROJECT TYPE
                        </label>
                        <select
                          id="contact-project-type"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        >
                          <option value="Commercial Campaign">Commercial Campaign</option>
                          <option value="Music Video">Music Video</option>
                          <option value="Fashion / Editorial Film">Fashion / Editorial Film</option>
                          <option value="Documentary Short">Documentary Short</option>
                          <option value="Social Media Short-Form (9:16)">Social Media Short-Form (9:16)</option>
                          <option value="Color Grading Only">Color Grading Only</option>
                          <option value="Motion Graphics &amp; Title Design">Motion Graphics &amp; Title Design</option>
                        </select>
                      </div>
                    )}

                    {config.fields?.budget && (
                      <div>
                        <label htmlFor="contact-budget" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          ESTIMATED BUDGET
                        </label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        >
                          <option value="Under $3,000">Under $3,000</option>
                          <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000+">$25,000+</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Footage & Storage Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {config.fields?.hasFootage && (
                      <div>
                        <label htmlFor="contact-has-footage" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          FOOTAGE STATUS
                        </label>
                        <select
                          id="contact-has-footage"
                          name="hasFootage"
                          value={formData.hasFootage}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        >
                          <option value="Yes - Footage is Ready">Yes - Footage is Ready</option>
                          <option value="Currently in Production">Currently in Production</option>
                          <option value="Pre-production / Planning">Pre-production / Planning</option>
                        </select>
                      </div>
                    )}

                    {config.fields?.footageStorage && (
                      <div>
                        <label htmlFor="contact-footage-storage" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                          FOOTAGE STORAGE PROVIDER
                        </label>
                        <select
                          id="contact-footage-storage"
                          name="footageStorage"
                          value={formData.footageStorage}
                          onChange={handleChange}
                          className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        >
                          <option value="Google Drive">Google Drive</option>
                          <option value="Frame.io / Dropbox">Frame.io / Dropbox</option>
                          <option value="Physical Hard Drive (Ship to London)">Physical Hard Drive (Ship to London)</option>
                          <option value="MASV / WeTransfer">MASV / WeTransfer</option>
                          <option value="AWS S3 / Cloud Storage">AWS S3 / Cloud Storage</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Project Message */}
                  {config.fields?.message && (
                    <div>
                      <label htmlFor="contact-message" className="block font-mono text-xs text-white/70 uppercase mb-1.5">
                        PROJECT BRIEF / VISION DETAILS
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Describe your visual style, reference links, audio tracks, key deadline targets..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-[#18181d] border border-white/15 focus:border-[#ff3b00] rounded p-3 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Error Alert */}
                  {status === 'error' && (
                    <div role="alert" className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'submitting' || rateLimitCooldown > 0}
                    className="w-full py-3.5 bg-[#ff3b00] hover:bg-[#ff4d00] text-white font-mono font-bold text-xs tracking-widest uppercase rounded shadow-[0_0_20px_rgba(255,59,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span>TRANSMITTING DATA PACKETS...</span>
                    ) : rateLimitCooldown > 0 ? (
                      <span>COOLDOWN ACTIVE ({rateLimitCooldown}s)</span>
                    ) : (
                      <>
                        <span>{config.buttonText || 'START MY PROJECT'}</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </RetroWindow>
        </div>
      </div>

      {/* Thank You / Confirmation Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        referenceCode={submissionReference}
        clientName={formData.name || 'Valued Collaborator'}
        clientEmail={formData.email}
        brandName={brandName}
        onViewFullPage={
          onNavigateToReceipt
            ? () =>
                onNavigateToReceipt({
                  name: formData.name || 'Valued Collaborator',
                  email: formData.email,
                  projectType: formData.projectType,
                  referenceId: submissionReference,
                })
            : undefined
        }
      />
    </section>
  );
};
