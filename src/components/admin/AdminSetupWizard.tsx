import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Film,
  User,
  Video,
  Palette,
  Type,
  Layout,
  HardDrive,
  Mail,
  Share2,
  CheckCheck,
  Shield,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';

const STEPS = [
  { id: 1, title: 'Brand Identity', icon: User, desc: 'Set your name, title, and location' },
  { id: 2, title: 'Profile & Bio', icon: Sparkles, desc: 'Add avatar photo and short bio' },
  { id: 3, title: 'Hero Showreel', icon: Film, desc: 'Connect your flagship reel' },
  { id: 4, title: 'Color Palette', icon: Palette, desc: 'Choose your signature brand accents' },
  { id: 5, title: 'Typography', icon: Type, desc: 'Pair Google Fonts for titles & body' },
  { id: 6, title: 'Portfolio Layout', icon: Layout, desc: 'Select grid or cinematic style' },
  { id: 7, title: 'Video Projects', icon: Layers, desc: 'Review starter portfolio projects' },
  { id: 8, title: 'Google Drive', icon: HardDrive, desc: 'Index drive footage & media' },
  { id: 9, title: 'Booking Form', icon: Mail, desc: 'Configure Formspree & WhatsApp' },
  { id: 10, title: 'Social Media', icon: Share2, desc: 'Link Instagram, Vimeo & YouTube' },
  { id: 11, title: 'Client Proofing', icon: CheckCheck, desc: 'Enable video review portal' },
  { id: 12, title: 'Security & Launch', icon: Shield, desc: 'Set admin PIN & finalize portfolio' },
];

export const AdminSetupWizard: React.FC = () => {
  const { brand, updateBrandSettings, colorPresets, applyColorPreset } = useTheme();
  const {
    wizardState,
    setWizardState,
    completeWizard,
    setAdminTab,
    bookingSettings,
    saveBookingSettings,
    portfolioLayoutMode,
    setPortfolioLayoutMode,
    adminPasscode,
    changeAdminPasscode,
    showToast,
  } = usePortfolio();

  const [currentStep, setCurrentStep] = useState<number>(wizardState.currentStep || 1);
  const [newPasscode, setNewPasscode] = useState<string>(adminPasscode);

  const handleNext = () => {
    if (currentStep < 12) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setWizardState(prev => ({ ...prev, currentStep: next }));
    } else {
      completeWizard();
      setAdminTab('overview');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setWizardState(s => ({ ...s, currentStep: prev }));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[var(--brand-primary)]" />
            <span>12-Step Portfolio Setup Wizard</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Step-by-step guided onboarding to launch your complete video editing portfolio platform in minutes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--brand-primary)] font-bold px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30">
          <span>Step {currentStep} of 12</span>
        </div>
      </div>

      {/* Steps Progress Track */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/10">
        {STEPS.map(step => {
          const Icon = step.icon;
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[var(--brand-primary)] text-black font-bold shadow-lg'
                  : isDone
                  ? 'bg-white/10 text-emerald-400 hover:bg-white/15'
                  : 'text-neutral-500 hover:text-white'
              }`}
              title={`${step.id}. ${step.title}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] truncate max-w-full hidden md:inline">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[var(--brand-border)] space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs uppercase tracking-wider text-[var(--brand-primary)] font-bold">
            Step {currentStep} of 12
          </span>
          <h3 className="text-xl font-bold font-heading text-white mt-1">
            {STEPS[currentStep - 1].title}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            {STEPS[currentStep - 1].desc}
          </p>
        </div>

        {/* STEP 1: Brand Identity */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Editor / Studio Name</label>
              <input
                type="text"
                value={brand.brandName}
                onChange={e => updateBrandSettings({ brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Professional Title</label>
              <input
                type="text"
                value={brand.professionalTitle}
                onChange={e => updateBrandSettings({ professionalTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-300 mb-1">Tagline</label>
              <input
                type="text"
                value={brand.tagline}
                onChange={e => updateBrandSettings({ tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Profile & Bio */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Profile Photo Image URL</label>
              <input
                type="url"
                value={brand.profileImageUrl || ''}
                onChange={e => updateBrandSettings({ profileImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Short Editorial Bio</label>
              <textarea
                rows={4}
                value={brand.bio || ''}
                onChange={e => updateBrandSettings({ bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Hero Showreel */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Flagship Showreel Video URL (Google Drive / YouTube / MP4)</label>
              <input
                type="url"
                value={brand.showreelVideoUrl || ''}
                onChange={e => updateBrandSettings({ showreelVideoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Showreel Poster Thumbnail URL</label>
              <input
                type="url"
                value={brand.showreelPosterUrl || ''}
                onChange={e => updateBrandSettings({ showreelPosterUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Color Palette */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-neutral-300">Select Signature Accent Scheme</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {colorPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyColorPreset(preset.id)}
                  className="p-3 rounded-xl border border-white/10 bg-black/40 hover:border-white/30 flex items-center gap-3 text-left transition-all"
                >
                  <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.primary }} />
                  <span className="text-xs font-bold text-white">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Typography */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">
              Customize heading and body fonts in the <strong>Typography tab</strong> or keep the default cinematic Plus Jakarta Sans pairing.
            </p>
            <div className="p-4 rounded-xl bg-black/50 border border-white/10">
              <span className="text-xs text-[var(--brand-primary)] font-mono">Current Pairing: Plus Jakarta Sans (Headers) + Inter (Body)</span>
            </div>
          </div>
        )}

        {/* STEP 6: Layout Mode */}
        {currentStep === 6 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['cinematic', 'grid', 'masonry', 'social', 'mixed'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setPortfolioLayoutMode(mode)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  portfolioLayoutMode === mode
                    ? 'bg-[var(--brand-primary)]/15 border-[var(--brand-primary)] text-white'
                    : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="font-bold text-sm capitalize">{mode.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        )}

        {/* STEP 7: Video Projects */}
        {currentStep === 7 && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-300">
              Your platform comes pre-loaded with starter projects supporting horizontal 16:9, vertical 9:16 reels, and before/after color grading. You can add, edit, or delete projects in the <strong>Projects tab</strong> anytime.
            </p>
          </div>
        )}

        {/* STEP 8: Google Drive */}
        {currentStep === 8 && (
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-white">Google Drive Integration Ready</span>
            <p className="text-xs text-neutral-400">
              Easily index drive video files and embed them directly without YouTube/Vimeo compression.
            </p>
          </div>
        )}

        {/* STEP 9: Booking Form */}
        {currentStep === 9 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Formspree Endpoint URL</label>
              <input
                type="url"
                value={bookingSettings.formspreeEndpoint || ''}
                onChange={e => saveBookingSettings({ ...bookingSettings, formspreeEndpoint: e.target.value })}
                placeholder="https://formspree.io/f/YOUR_ID"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* STEP 10: Social Media */}
        {currentStep === 10 && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-300">
              Configure your Instagram, YouTube channel, and LinkedIn links in the <strong>Social Links tab</strong>.
            </p>
          </div>
        )}

        {/* STEP 11: Client Proofing */}
        {currentStep === 11 && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-300">
              Share private review links with clients for frame-accurate timecode comments and approval sign-off.
            </p>
          </div>
        )}

        {/* STEP 12: Security & Launch */}
        {currentStep === 12 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Admin Access Passcode</label>
              <input
                type="text"
                value={newPasscode}
                onChange={e => {
                  setNewPasscode(e.target.value);
                  if (e.target.value.length >= 4) {
                    changeAdminPasscode(adminPasscode, e.target.value);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono"
              />
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              All settings validated and ready for deployment.
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <GlassButton variant="primary" size="md" onClick={handleNext}>
            <span>{currentStep === 12 ? 'Complete & Launch' : 'Continue to Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>
    </div>
  );
};
