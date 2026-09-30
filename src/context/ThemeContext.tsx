import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings, BrandSettings, ColorTokens, TypographyTokens, LayoutTokens, GlassTokens } from '../types';
import { THEME_PRESETS, DEFAULT_BRAND, applyThemeToDom } from '../theme/defaultTheme';

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'amber', name: 'Electric Amber', primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
  { id: 'emerald', name: 'Cyber Emerald', primary: '#10B981', secondary: '#059669', accent: '#34D399' },
  { id: 'gold', name: 'Solar Gold', primary: '#EAB308', secondary: '#CA8A04', accent: '#FDE047' },
  { id: 'crimson', name: 'Crimson Cinema', primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
  { id: 'violet', name: 'Ultra Violet', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
  { id: 'cyan', name: 'Anamorphic Cyan', primary: '#06B6D4', secondary: '#0891B2', accent: '#22D3EE' },
];

interface ThemeContextType {
  theme: ThemeSettings;
  brand: BrandSettings;
  colorPresets: ColorPreset[];
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  setBrand: React.Dispatch<React.SetStateAction<BrandSettings>>;
  updateBrandSettings: (updates: Partial<BrandSettings>) => void;
  updateColors: (newColors: Partial<ColorTokens>) => void;
  updateTypography: (newTypo: Partial<TypographyTokens>) => void;
  updateLayout: (newLayout: Partial<LayoutTokens>) => void;
  updateGlass: (newGlass: Partial<GlassTokens>) => void;
  applyPreset: (presetId: string) => void;
  applyColorPreset: (presetId: string) => void;
  resetTheme: () => void;
  toggleDarkMode: (mode?: 'dark' | 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'cinefolio_theme_settings';
const BRAND_STORAGE_KEY = 'cinefolio_brand_settings';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load theme from storage', e);
    }
    return THEME_PRESETS.cinematic;
  });

  const [brand, setBrand] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem(BRAND_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load brand from storage', e);
    }
    return DEFAULT_BRAND;
  });

  // Apply theme tokens to DOM on any change
  useEffect(() => {
    applyThemeToDom(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Persist brand updates
  useEffect(() => {
    try {
      localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(brand));
    } catch (e) {
      console.error(e);
    }
  }, [brand]);

  const updateColors = (newColors: Partial<ColorTokens>) => {
    setTheme(prev => ({
      ...prev,
      presetId: 'custom',
      colors: {
        ...prev.colors,
        ...newColors,
      },
    }));
  };

  const updateTypography = (newTypo: Partial<TypographyTokens>) => {
    setTheme(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        ...newTypo,
      },
    }));
  };

  const updateLayout = (newLayout: Partial<LayoutTokens>) => {
    setTheme(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        ...newLayout,
      },
    }));
  };

  const updateGlass = (newGlass: Partial<GlassTokens>) => {
    setTheme(prev => ({
      ...prev,
      glass: {
        ...prev.glass,
        ...newGlass,
      },
    }));
  };

  const applyPreset = (presetId: string) => {
    const preset = THEME_PRESETS[presetId];
    if (preset) {
      setTheme({
        ...preset,
        presetId: presetId as any,
      });
    }
  };

  const resetTheme = () => {
    setTheme(THEME_PRESETS.cinematic);
    setBrand(DEFAULT_BRAND);
  };

  const toggleDarkMode = (forcedMode?: 'dark' | 'light') => {
    const targetMode = forcedMode || (theme.mode === 'dark' ? 'light' : 'dark');
    if (targetMode === 'light') {
      updateColors({
        background: '#FAFAFA',
        surface: '#FFFFFF',
        surfaceElevated: '#F4F4F5',
        textPrimary: '#09090B',
        textSecondary: '#52525B',
        textMuted: '#A1A1AA',
        border: '#E4E4E7',
      });
      setTheme(prev => ({ ...prev, mode: 'light' }));
    } else {
      updateColors({
        background: '#09090B',
        surface: '#141417',
        surfaceElevated: '#1F1F24',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
        textMuted: '#71717A',
        border: '#27272A',
      });
      setTheme(prev => ({ ...prev, mode: 'dark' }));
    }
  };

  const updateBrandSettings = (updates: Partial<BrandSettings>) => {
    setBrand(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const applyColorPreset = (presetId: string) => {
    const preset = COLOR_PRESETS.find(p => p.id === presetId);
    if (preset) {
      updateColors({
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent,
        button: preset.primary,
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        brand,
        colorPresets: COLOR_PRESETS,
        setTheme,
        setBrand,
        updateBrandSettings,
        updateColors,
        updateTypography,
        updateLayout,
        updateGlass,
        applyPreset,
        applyColorPreset,
        resetTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
