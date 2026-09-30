import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, Sparkles, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassButton } from '../common/GlassButton';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, setActiveView } = usePortfolio();
  const { brand } = useTheme();

  const [passcode, setPasscode] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(passcode);
      setIsLoading(false);
      if (!success) {
        setErrorMsg('Incorrect passcode. The default passcode is "cinefolio2026".');
      }
    }, 300);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[var(--brand-primary)] selection:text-black">
      {/* Background glow & subtle grain */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--brand-primary)]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-primary)]/10 blur-3xl pointer-events-none" />

      {/* Top back button */}
      <nav aria-label="Back to public" className="absolute top-6 left-6">
        <button
          type="button"
          onClick={() => setActiveView('public')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </button>
      </nav>

      {/* Login Card */}
      <article className="w-full max-w-md bg-neutral-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-2xl relative z-10 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)]/20 border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] flex items-center justify-center mx-auto shadow-lg shadow-[var(--brand-primary)]/10">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
            Portfolio CMS Studio
          </h1>
          <p className="text-xs text-neutral-400">
            Secure administration portal for <span className="text-white font-semibold">{brand.brandName}</span>
          </p>
        </header>

        {/* Security Warning Notice */}
        <aside aria-label="Security information" className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-white">Private Admin Protected</p>
            <p className="text-[11px] text-neutral-400">
              Default access passcode is <code className="font-mono text-[var(--brand-primary)] font-bold">cinefolio2026</code>. You can update this passcode anytime inside settings.
            </p>
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <legend className="sr-only">Admin Authentication</legend>
            <div>
              <label htmlFor="admin-passcode-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Enter Admin Passcode / Master Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-passcode-input"
                  type={showPasscode ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errorMsg && (
                <p role="alert" className="text-xs text-red-400 mt-1.5 font-medium animate-shake">
                  {errorMsg}
                </p>
              )}
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Unlock CMS Studio'}
            </GlassButton>
          </fieldset>
        </form>

        {/* Quick Demo Shortcut & Footer */}
        <footer className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
          <button
            type="button"
            onClick={() => setPasscode('cinefolio2026')}
            className="text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Use default demo passcode</span>
          </button>

          <span>Built by EKO Pixels</span>
        </footer>
      </article>
    </main>
  );
};
