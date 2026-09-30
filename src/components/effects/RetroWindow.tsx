import React, { ReactNode } from 'react';
import { Minus, Square, X, Film, Disc } from 'lucide-react';
import { WindowStyle } from '../../types';

interface RetroWindowProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  styleVariant?: WindowStyle;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  isExpanded?: boolean;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  id,
  title,
  subtitle,
  badge,
  styleVariant = 'retro-win95',
  onClose,
  onMinimize,
  onMaximize,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  // Variant specifics
  const getVariantStyles = () => {
    switch (styleVariant) {
      case 'retro-win95':
        return {
          container: 'bg-[#18181b] border-2 border-t-[#3f3f46] border-l-[#3f3f46] border-r-[#09090b] border-b-[#09090b] shadow-[4px_4px_0px_rgba(0,0,0,0.8)]',
          header: 'bg-gradient-to-r from-[#27272a] via-[#1f1f23] to-[#18181b] border-b border-[#27272a] text-white',
          btn: 'bg-[#27272a] hover:bg-[#3f3f46] border-t border-l border-white/20 border-r border-b border-black text-white/80',
          titleFont: 'font-mono text-xs tracking-wider uppercase',
        };
      case 'y2k-silver':
        return {
          container: 'bg-[#0f1115] border border-white/20 shadow-[0_8px_32px_rgba(0,229,255,0.08)] backdrop-blur-md',
          header: 'bg-gradient-to-r from-[#1c222e] to-[#0f1115] border-b border-white/10 text-[#00e5ff]',
          btn: 'bg-white/5 hover:bg-white/15 border border-white/15 text-white/90 rounded-xs',
          titleFont: 'font-mono text-xs tracking-widest font-semibold',
        };
      case 'crt-terminal':
        return {
          container: 'bg-[#0a0f0a] border border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]',
          header: 'bg-[#051c05] border-b border-[#22c55e]/30 text-[#4ade80]',
          btn: 'bg-[#0f2e0f] hover:bg-[#1b431b] border border-[#22c55e]/40 text-[#4ade80]',
          titleFont: 'font-mono text-xs tracking-widest font-bold',
        };
      case 'vhs-player':
        return {
          container: 'bg-[#121016] border border-[#a855f7]/30 shadow-[0_0_25px_rgba(168,85,247,0.12)]',
          header: 'bg-[#1e152a] border-b border-[#a855f7]/20 text-[#e9d5ff]',
          btn: 'bg-[#2e1d44] hover:bg-[#3f275e] border border-[#a855f7]/30 text-[#e9d5ff]',
          titleFont: 'font-mono text-xs tracking-widest',
        };
      case 'minimal-retro':
      default:
        return {
          container: 'bg-[#121214] border border-[#27272a] shadow-xl',
          header: 'bg-[#18181b] border-b border-[#27272a] text-white/90',
          btn: 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-sm',
          titleFont: 'font-mono text-xs tracking-wider uppercase',
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <section id={id} aria-label={title} className={`flex flex-col overflow-hidden transition-all duration-200 ${currentStyles.container} ${className}`}>
      {/* Window Titlebar */}
      <header className={`flex items-center justify-between px-3 py-2 select-none shrink-0 ${currentStyles.header} ${headerClassName}`}>
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-white/60">
            <Film className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
            <Disc className="w-3 h-3 animate-spin text-white/40" style={{ animationDuration: '6s' }} aria-hidden="true" />
          </div>
          <h2 className={`truncate m-0 ${currentStyles.titleFont}`}>
            {title}
          </h2>
          {subtitle && (
            <span className="hidden sm:inline-block font-mono text-[10px] text-white/40 truncate">
              // {subtitle}
            </span>
          )}
          {badge && (
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-white/10 text-white/80 rounded-xs border border-white/10">
              {badge}
            </span>
          )}
        </div>

        {/* Window Controls */}
        <div role="toolbar" aria-label="Window controls" className="flex items-center gap-1 shrink-0">
          {onMinimize && (
            <button
              id={id ? `${id}-minimize-btn` : undefined}
              type="button"
              onClick={onMinimize}
              className={`w-5 h-5 flex items-center justify-center text-[10px] transition-colors cursor-pointer ${currentStyles.btn}`}
              title="Minimize"
              aria-label="Minimize Window"
            >
              <Minus className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
          {onMaximize && (
            <button
              id={id ? `${id}-maximize-btn` : undefined}
              type="button"
              onClick={onMaximize}
              className={`w-5 h-5 flex items-center justify-center text-[10px] transition-colors cursor-pointer ${currentStyles.btn}`}
              title="Maximize"
              aria-label="Maximize Window"
            >
              <Square className="w-2.5 h-2.5" aria-hidden="true" />
            </button>
          )}
          {onClose && (
            <button
              id={id ? `${id}-close-btn` : undefined}
              type="button"
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center text-[10px] bg-red-500/20 hover:bg-red-500/80 border border-red-500/40 text-white transition-colors cursor-pointer"
              title="Close"
              aria-label="Close Window"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {/* Window Body */}
      <div className={`relative flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </section>
  );
};
