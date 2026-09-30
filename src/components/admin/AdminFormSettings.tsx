import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone,
  ShieldCheck,
  Plus,
  Trash2,
  Sliders,
  Settings,
  Mail,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BookingFormField, BookingFormSettings } from '../../types';
import { GlassButton } from '../common/GlassButton';

export const AdminFormSettings: React.FC = () => {
  const { bookingSettings, saveBookingSettings, showToast } = usePortfolio();

  const [settings, setSettings] = useState<BookingFormSettings>(bookingSettings);
  const [testingEndpoint, setTestingEndpoint] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);

  const handleChange = <K extends keyof BookingFormSettings>(key: K, value: BookingFormSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFieldToggle = (fieldId: string) => {
    setSettings(prev => ({
      ...prev,
      fields: prev.fields.map(f => (f.id === fieldId ? { ...f, enabled: !f.enabled } : f)),
    }));
  };

  const handleFieldRequiredToggle = (fieldId: string) => {
    setSettings(prev => ({
      ...prev,
      fields: prev.fields.map(f => (f.id === fieldId ? { ...f, required: !f.required } : f)),
    }));
  };

  const handleAddField = () => {
    const newField: BookingFormField = {
      id: `f-${Date.now()}`,
      name: `customField_${settings.fields.length + 1}`,
      label: 'New Custom Field',
      placeholder: 'Enter details...',
      type: 'text',
      required: false,
      enabled: true,
      order: settings.fields.length + 1,
    };
    setSettings(prev => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const handleDeleteField = (fieldId: string) => {
    setSettings(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== fieldId) }));
  };

  const handleTestFormspree = async () => {
    if (!settings.formspreeEndpoint) {
      setTestResult({ status: 'error', message: 'Please enter a Formspree endpoint URL first.' });
      return;
    }

    setTestingEndpoint(true);
    setTestResult(null);

    try {
      const res = await fetch(settings.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          clientName: 'Test Submission from CineFolio Studio',
          clientEmail: 'test@ekopixels.com',
          projectType: 'Test Project',
          message: 'This is a test connection to verify your Formspree inbox delivery.',
          _subject: 'CineFolio Formspree Test Probe',
        }),
      });

      if (res.ok) {
        setTestResult({ status: 'success', message: 'Formspree endpoint is active and accepted the test payload!' });
        showToast('Formspree connection verified successfully!');
      } else {
        setTestResult({
          status: 'error',
          message: `Formspree returned HTTP ${res.status}. Check your Form ID or origin settings on formspree.io.`,
        });
      }
    } catch (err: any) {
      setTestResult({
        status: 'error',
        message: err.message || 'Failed to reach Formspree. Ensure your URL is valid.',
      });
    } finally {
      setTestingEndpoint(false);
    }
  };

  const handleSave = () => {
    saveBookingSettings(settings);
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-form-settings-root">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-[var(--brand-primary)]" />
            <span>Booking & Enquiry Form Settings</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Configure how potential clients hire you, choose your form backend (Formspree / Webhook / Local), and enable WhatsApp quick booking.
          </p>
        </div>

        <GlassButton variant="primary" size="md" onClick={handleSave}>
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes</span>
        </GlassButton>
      </header>

      {/* Provider Selector Card */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-6">
        <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
          <Send className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>Form Submission Backend Provider</span>
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
          {/* Formspree Card */}
          <li>
            <article
              onClick={() => handleChange('provider', 'formspree')}
              className={`p-4 rounded-xl border cursor-pointer transition-all h-full ${
                settings.provider === 'formspree'
                  ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-white shadow-lg'
                  : 'glass-surface border-[var(--brand-border)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Formspree (Recommended)</span>
                {settings.provider === 'formspree' && <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />}
              </div>
              <p className="text-xs text-[var(--brand-text-secondary)] mt-2 m-0">
                Free & paid form endpoint. Forwards client briefs directly to your personal email with zero backend setup.
              </p>
            </article>
          </li>

          {/* Webhook Card */}
          <li>
            <article
              onClick={() => handleChange('provider', 'webhook')}
              className={`p-4 rounded-xl border cursor-pointer transition-all h-full ${
                settings.provider === 'webhook'
                  ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-white shadow-lg'
                  : 'glass-surface border-[var(--brand-border)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Custom Webhook</span>
                {settings.provider === 'webhook' && <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />}
              </div>
              <p className="text-xs text-[var(--brand-text-secondary)] mt-2 m-0">
                Send raw JSON payloads to Zapier, Make.com, Slack, Notion, or your own backend API.
              </p>
            </article>
          </li>

          {/* Local CMS Inbox Card */}
          <li>
            <article
              onClick={() => handleChange('provider', 'custom')}
              className={`p-4 rounded-xl border cursor-pointer transition-all h-full ${
                settings.provider === 'custom'
                  ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-white shadow-lg'
                  : 'glass-surface border-[var(--brand-border)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Dashboard Inbox Only</span>
                {settings.provider === 'custom' && <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />}
              </div>
              <p className="text-xs text-[var(--brand-text-secondary)] mt-2 m-0">
                Stores all client submissions directly in your local portfolio CMS inbox tab for offline review.
              </p>
            </article>
          </li>
        </ul>

        {/* Formspree Configuration Input */}
        {settings.provider === 'formspree' && (
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1.5">
                Formspree Endpoint URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={settings.formspreeEndpoint || ''}
                  onChange={e => handleChange('formspreeEndpoint', e.target.value)}
                  placeholder="https://formspree.io/f/YOUR_FORM_ID"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleTestFormspree}
                  disabled={testingEndpoint}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testingEndpoint ? 'Testing Endpoint...' : 'Send Test Probe'}</span>
                </button>
              </div>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                  testResult.status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-300 border border-red-500/20'
                }`}
              >
                {testResult.status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
                <span>{testResult.message}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-[var(--brand-text-secondary)]">
              <span>Need a free endpoint?</span>
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Create Formspree Form</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Webhook Configuration Input */}
        {settings.provider === 'webhook' && (
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Webhook Endpoint URL
            </label>
            <input
              type="url"
              value={settings.webhookUrl || ''}
              onChange={e => handleChange('webhookUrl', e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none font-mono"
            />
          </div>
        )}
      </section>

      {/* WhatsApp Quick Chat Integration Card */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--brand-text)]">WhatsApp Quick Booking Link</h3>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                Adds a direct one-click WhatsApp button so clients can message you immediately.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.whatsappEnabled ?? true}
              onChange={e => handleChange('whatsappEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
          </label>
        </div>

        {settings.whatsappEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={e => handleChange('whatsappNumber', e.target.value)}
                placeholder="+13108924021"
                className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
                Pre-filled Message Template
              </label>
              <input
                type="text"
                value={settings.whatsappMessageTemplate || ''}
                onChange={e => handleChange('whatsappMessageTemplate', e.target.value)}
                placeholder="Hi! I saw your portfolio and would like to discuss a video project."
                className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </section>

      {/* Form Copy & Custom Text */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-4">
        <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>Form Headings & Custom Copy</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={settings.heading || ''}
              onChange={e => handleChange('heading', e.target.value)}
              placeholder="START A PROJECT"
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Submit Button Text
            </label>
            <input
              type="text"
              value={settings.buttonText || ''}
              onChange={e => handleChange('buttonText', e.target.value)}
              placeholder="START MY PROJECT"
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Section Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={settings.subheading || ''}
              onChange={e => handleChange('subheading', e.target.value)}
              placeholder="Have a commercial, music video, or documentary in post-production?..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Success Confirmation Message
            </label>
            <input
              type="text"
              value={settings.successMessage || ''}
              onChange={e => handleChange('successMessage', e.target.value)}
              placeholder="Thank you for reaching out! We will review your brief within 24 hours."
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Dynamic Fields Manager */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Form Fields & Questionnaire Schema</span>
            </h3>
            <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
              Enable, disable, require, or add custom fields to tailor the intake questionnaire to your post-production workflow.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Field</span>
          </button>
        </header>

        <ul className="space-y-3 list-none p-0 m-0">
          {settings.fields.map(field => (
            <li key={field.id}>
              <article
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                  field.enabled ? 'bg-black/40 border-white/10' : 'bg-black/20 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={() => handleFieldToggle(field.id)}
                    className="rounded text-[var(--brand-primary)] focus:ring-0 cursor-pointer"
                    title="Enable/Disable Field"
                    aria-label={`Toggle ${field.label}`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{field.label}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-400">
                        {field.type}
                      </span>
                      {field.required && (
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 m-0">{field.placeholder}</p>
                  </div>
                </div>

                <footer className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleFieldRequiredToggle(field.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      field.required
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {field.required ? 'Mandatory' : 'Optional'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteField(field.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Remove Field"
                    aria-label={`Remove field ${field.label}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
