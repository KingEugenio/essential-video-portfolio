import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <aside role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <output className="glass-surface bg-[var(--brand-surface-elevated)]/95 border border-[var(--brand-primary)]/40 text-[var(--brand-text)] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium">
        <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
        <span>{message}</span>
      </output>
    </aside>
  );
};
