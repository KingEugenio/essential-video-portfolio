import React, { useState } from 'react';
import { Lock, ShieldAlert, Key, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';

interface LoginModalProps {
  onSuccess?: (token: string) => void;
  onCancel?: () => void;
  onLoginSuccess?: (token: string) => void;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onSuccess,
  onCancel,
  onLoginSuccess,
  onClose,
}) => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = onCancel || onClose || (() => {});
  const handleSuccess = (token: string) => {
    if (onSuccess) onSuccess(token);
    if (onLoginSuccess) onLoginSuccess(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('ekopixels_admin_token', data.token);
        handleSuccess(data.token);
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setError('Connection failed. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md w-full h-full border-0 m-0 max-w-none max-h-none block"
    >
      <div className="w-full max-w-md my-auto">
        <RetroWindow
          title="AUTHENTICATION_REQUIRED.EXE"
          subtitle="PRIVATE CMS GATEWAY"
          badge="PORTFOLIO CONTROL"
          onClose={handleClose}
          styleVariant="retro-win95"
        >
          <div className="p-6 bg-[#121216] flex flex-col gap-5">
            <header className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00]">
                <Lock className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 id="login-modal-title" className="font-heading font-bold text-lg text-white m-0">
                  OPERATOR ACCESS LOGIN
                </h3>
                <p className="font-mono text-xs text-white/50 m-0 mt-0.5">
                  Sign in to edit videos, brand logo, and copywriting.
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="admin-password-input" className="block font-mono text-xs text-white/70 uppercase cursor-pointer">
                    ADMIN MASTER PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setPassword('admin123')}
                    className="font-mono text-[10px] text-[#00e5ff] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Key className="w-3 h-3" />
                    <span>Auto-Fill (admin123)</span>
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
                  <input
                    id="admin-password-input"
                    name="admin_password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter admin password (admin123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1c1c22] border border-white/15 focus:border-[#ff3b00] rounded pl-9 pr-10 py-2.5 font-mono text-sm text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  id="cancel-login-btn"
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 font-mono text-xs text-white/60 hover:text-white bg-white/5 rounded border border-white/10 cursor-pointer"
                >
                  RETURN TO PUBLIC SITE
                </button>

                <button
                  id="submit-login-btn"
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-[#ff3b00] hover:bg-[#ff5500] text-white rounded flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(255,59,0,0.3)]"
                >
                  <span>{loading ? 'VERIFYING...' : 'ENTER DASHBOARD'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <footer className="text-center font-mono text-[10px] text-white/40 pt-2 border-t border-white/5">
                <small className="text-[10px]">Credentials: Password is <mark className="bg-transparent text-[#00e5ff] font-mono">admin123</mark> or <mark className="bg-transparent text-[#00e5ff] font-mono">ekopixels2026</mark></small>
              </footer>
            </form>
          </div>
        </RetroWindow>
      </div>
    </dialog>
  );
};
