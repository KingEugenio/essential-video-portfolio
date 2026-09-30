import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: 'article' | 'section' | 'aside' | 'div' | 'figure' | 'li';
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
  bordered?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  as: Component = 'article',
  className = '',
  hoverEffect = false,
  intensity = 'medium',
  bordered = true,
  ...props
}) => {
  const intensityClasses = {
    subtle: 'bg-opacity-40 backdrop-blur-md',
    medium: 'bg-opacity-70 backdrop-blur-lg',
    high: 'bg-opacity-90 backdrop-blur-xl',
  };

  return (
    <Component
      className={`glass-card transition-all duration-300 ${intensityClasses[intensity]} ${
        bordered ? 'border' : 'border-0'
      } ${
        hoverEffect
          ? 'hover:border-opacity-80 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40'
          : ''
      } ${className}`}
      style={{
        borderColor: bordered ? 'color-mix(in srgb, var(--brand-border) 60%, transparent)' : undefined,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
