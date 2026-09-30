import { BrandSettings, TemplatePreset } from '../types';

export interface ThemePresetDefinition {
  id: TemplatePreset;
  name: string;
  description: string;
  previewColor: string;
  secondaryPreviewColor: string;
  brandDefaults: Partial<BrandSettings>;
}

export const THEME_PRESETS: ThemePresetDefinition[] = [
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalism + Glass',
    description: 'High-contrast sharp architecture, raw geometry, frosted glass acrylics, and electric cyber lime accents.',
    previewColor: '#39ff14',
    secondaryPreviewColor: '#ffaa00',
    brandDefaults: {
      templatePreset: 'neo-brutalist',
      primaryColor: '#39ff14',
      secondaryColor: '#ffaa00',
      accentColor: '#ffffff',
      backgroundColor: '#0a0a0c',
      surfaceColor: '#121216',
      surfaceElevatedColor: '#1a1a22',
      textColor: '#ffffff',
      mutedTextColor: '#9ca3af',
      borderColor: '#39ff14',
      crtGlowColor: 'rgba(57, 255, 20, 0.25)',
      borderRadius: '2px',
      glassIntensity: 80,
      grainMode: 'clean',
      grainIntensity: 10,
      scanlinesEnabled: false,
      crtGlowEnabled: false,
      chromaticAberrationEnabled: false,
      headingFont: "'BD Gravel', 'Unbounded', 'Syne', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
    },
  },
  {
    id: 'dark-aurora',
    name: 'Dark Aurora + Kinetic',
    description: 'Deep celestial canvas with floating atmospheric gradients, cyan & violet aurora bloom, and smooth organic glass surfaces.',
    previewColor: '#00e5ff',
    secondaryPreviewColor: '#a855f7',
    brandDefaults: {
      templatePreset: 'dark-aurora',
      primaryColor: '#00e5ff',
      secondaryColor: '#a855f7',
      accentColor: '#ec4899',
      backgroundColor: '#06070d',
      surfaceColor: '#0e111a',
      surfaceElevatedColor: '#161a28',
      textColor: '#f8fafc',
      mutedTextColor: '#94a3b8',
      borderColor: '#1e293b',
      crtGlowColor: 'rgba(0, 229, 255, 0.3)',
      borderRadius: '16px',
      glassIntensity: 75,
      grainMode: 'film',
      grainIntensity: 12,
      scanlinesEnabled: false,
      crtGlowEnabled: true,
      chromaticAberrationEnabled: true,
      headingFont: "'BD Gravel', 'Unbounded', 'Syne', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
    },
  },
  {
    id: 'retro-surrealist',
    name: 'Retro Digital Surrealism',
    description: 'Phosphor CRT bloom, analog 35mm film grain, cathode scanlines, high-tempo orange & amber grading with vintage HUD overlays.',
    previewColor: '#ff3b00',
    secondaryPreviewColor: '#00e5ff',
    brandDefaults: {
      templatePreset: 'retro-surrealist',
      primaryColor: '#ff3b00',
      secondaryColor: '#00e5ff',
      accentColor: '#ffe600',
      backgroundColor: '#080808',
      surfaceColor: '#121214',
      surfaceElevatedColor: '#1a1a1e',
      textColor: '#f4f4f5',
      mutedTextColor: '#8e8e93',
      borderColor: '#26262b',
      crtGlowColor: 'rgba(255, 59, 0, 0.28)',
      borderRadius: '8px',
      glassIntensity: 65,
      grainMode: 'film',
      grainIntensity: 24,
      scanlinesEnabled: true,
      vhsNoiseEnabled: false,
      chromaticAberrationEnabled: true,
      crtGlowEnabled: true,
      timestampEnabled: true,
      recIndicatorEnabled: true,
      headingFont: "'BD Gravel', 'Unbounded', 'Syne', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
    },
  },
  {
    id: 'minimal-cinema',
    name: 'Minimal Cinema Luxury',
    description: 'Understated matte obsidian gallery layout, warm champagne gold accents, Swiss editorial typography, and distraction-free framing.',
    previewColor: '#d4af37',
    secondaryPreviewColor: '#ffffff',
    brandDefaults: {
      templatePreset: 'minimal-cinema',
      primaryColor: '#d4af37',
      secondaryColor: '#e5e5e5',
      accentColor: '#f59e0b',
      backgroundColor: '#0a0a0a',
      surfaceColor: '#141414',
      surfaceElevatedColor: '#1e1e1e',
      textColor: '#fafafa',
      mutedTextColor: '#a3a3a3',
      borderColor: '#262626',
      crtGlowColor: 'rgba(212, 175, 55, 0.2)',
      borderRadius: '6px',
      glassIntensity: 40,
      grainMode: 'clean',
      grainIntensity: 8,
      scanlinesEnabled: false,
      vhsNoiseEnabled: false,
      chromaticAberrationEnabled: false,
      crtGlowEnabled: false,
      timestampEnabled: false,
      recIndicatorEnabled: false,
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      monoFont: "'IBM Plex Mono', monospace",
    },
  },
];

export class ThemeEngine {
  private static instance: ThemeEngine;

  private constructor() {}

  public static getInstance(): ThemeEngine {
    if (!ThemeEngine.instance) {
      ThemeEngine.instance = new ThemeEngine();
    }
    return ThemeEngine.instance;
  }

  public applyBrand(brand: BrandSettings): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Colors
    root.style.setProperty('--color-primary', brand.primaryColor || '#ff3b00');
    root.style.setProperty('--brand-primary', brand.primaryColor || '#ff3b00');
    root.style.setProperty('--color-secondary', brand.secondaryColor || '#00e5ff');
    root.style.setProperty('--brand-secondary', brand.secondaryColor || '#00e5ff');
    root.style.setProperty('--color-accent', brand.accentColor || '#ffe600');
    root.style.setProperty('--brand-accent', brand.accentColor || '#ffe600');
    root.style.setProperty('--color-background', brand.backgroundColor || '#080808');
    root.style.setProperty('--brand-bg', brand.backgroundColor || '#080808');
    root.style.setProperty('--color-surface', brand.surfaceColor || '#121214');
    root.style.setProperty('--brand-surface', brand.surfaceColor || '#121214');
    root.style.setProperty('--color-surface-elevated', brand.surfaceElevatedColor || '#1a1a1e');
    root.style.setProperty('--brand-surface-elevated', brand.surfaceElevatedColor || '#1a1a1e');
    root.style.setProperty('--color-text', brand.textColor || '#f4f4f5');
    root.style.setProperty('--brand-text', brand.textColor || '#f4f4f5');
    root.style.setProperty('--color-muted', brand.mutedTextColor || '#8e8e93');
    root.style.setProperty('--brand-muted-text', brand.mutedTextColor || '#8e8e93');
    root.style.setProperty('--color-border', brand.borderColor || '#26262b');
    root.style.setProperty('--brand-border', brand.borderColor || '#26262b');
    root.style.setProperty('--color-crt-glow', brand.crtGlowColor || 'rgba(255, 59, 0, 0.25)');
    root.style.setProperty('--brand-crt-glow', brand.crtGlowColor || 'rgba(255, 59, 0, 0.25)');

    // Typography (BD Gravel / Cinema Editorial / NLE Timeline Mono)
    const headingFontVal = brand.headingFont || "'BD Gravel', 'Unbounded', 'Syne', sans-serif";
    const bodyFontVal = brand.bodyFont || "'Plus Jakarta Sans', 'Inter', sans-serif";
    const monoFontVal = brand.monoFont || "'JetBrains Mono', 'IBM Plex Mono', monospace";

    root.style.setProperty('--font-heading', headingFontVal);
    root.style.setProperty('--font-display', headingFontVal);
    root.style.setProperty('--font-body', bodyFontVal);
    root.style.setProperty('--font-mono', monoFontVal);

    // Border Radius
    root.style.setProperty('--border-radius-base', brand.borderRadius || '8px');

    // Shaders and Noise parameters
    root.style.setProperty('--grain-opacity', `${(brand.grainIntensity ?? 20) / 100}`);
    root.style.setProperty('--glass-opacity', `${(brand.glassIntensity ?? 65) / 100}`);
  }

  public getPreset(presetId: TemplatePreset): ThemePresetDefinition | undefined {
    return THEME_PRESETS.find((p) => p.id === presetId);
  }
}

export const themeEngine = ThemeEngine.getInstance();
