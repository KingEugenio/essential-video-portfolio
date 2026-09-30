/**
 * Centralized Design Tokens
 * Defines the foundational visual constants for typography, colors,
 * spacing, border radius, shadows, z-indexes, and retro shaders.
 */

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    border: string;
    crtGlow: string;
    filmTint: string;
  };
  typography: {
    fontDisplay: string;
    fontBody: string;
    fontMono: string;
    scaleRatio: number;
    baseSize: string;
    lineHeight: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    neonGlow: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    easeCustom: string;
  };
  zIndex: {
    base: number;
    elevated: number;
    sticky: number;
    modalBackdrop: number;
    modalContent: number;
    popover: number;
    tooltip: number;
  };
}

export const defaultDesignTokens: DesignTokens = {
  colors: {
    primary: '#ff3b00',
    secondary: '#00e5ff',
    accent: '#ffe600',
    background: '#080808',
    surface: '#121214',
    surfaceElevated: '#1a1a1e',
    text: '#f4f4f5',
    textMuted: '#8e8e93',
    border: '#26262b',
    crtGlow: 'rgba(255, 59, 0, 0.25)',
    filmTint: 'rgba(255, 140, 0, 0.03)',
  },
  typography: {
    fontDisplay: 'Space Grotesk, sans-serif',
    fontBody: 'Inter, system-ui, sans-serif',
    fontMono: 'IBM Plex Mono, monospace',
    scaleRatio: 1.25,
    baseSize: '16px',
    lineHeight: 1.6,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
    xxl: '4rem',
  },
  radii: {
    sm: '4px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.6)',
    lg: '0 12px 32px rgba(0,0,0,0.8)',
    neonGlow: '0 0 20px rgba(255,59,0,0.35)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    easeCustom: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  zIndex: {
    base: 1,
    elevated: 10,
    sticky: 40,
    modalBackdrop: 50,
    modalContent: 60,
    popover: 70,
    tooltip: 80,
  },
};
