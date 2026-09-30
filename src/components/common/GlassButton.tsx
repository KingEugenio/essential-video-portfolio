import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold gap-2.5',
    icon: 'p-2.5 aspect-square',
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--brand-button)] text-[var(--brand-button-text)] font-heading font-extrabold uppercase tracking-wider border-2 border-[var(--brand-button)] shadow-[3px_3px_0px_rgba(0,0,0,0.9)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.9)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.9)]';
      case 'secondary':
        return 'bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] font-semibold border-2 border-[var(--brand-border)] hover:border-[var(--brand-text)] shadow-[2px_2px_0px_var(--brand-border)] hover:-translate-y-0.5 active:translate-y-0.5';
      case 'glass':
        return 'glass-pill text-[var(--brand-text)] font-medium border border-white/20 hover:border-[var(--brand-primary)] hover:text-white backdrop-blur-xl shadow-lg active:scale-95';
      case 'outline':
        return 'bg-transparent text-[var(--brand-text)] font-bold uppercase tracking-wider border-2 border-[var(--brand-border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] shadow-[2px_2px_0px_rgba(0,0,0,0.7)] hover:-translate-y-0.5';
      case 'danger':
        return 'bg-red-500/20 text-red-400 font-bold border-2 border-red-500/50 hover:bg-red-500/30';
      case 'ghost':
        return 'bg-transparent text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-white/5 font-medium';
      default:
        return '';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${getVariantStyles()} ${className}`}
      style={{
        borderRadius: 'var(--button-radius)',
      }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
