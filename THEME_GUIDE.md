# THEME & DESIGN TOKENS GUIDE

The portfolio features a flexible design token architecture orchestrated by `ThemeEngine` and configured in real-time via the **Brand Studio** tab.

---

## 1. CSS Custom Properties Reference

| CSS Variable | Description | Default Value |
| :--- | :--- | :--- |
| `--color-primary` | Primary brand accent | `#ff3b00` (Neon Orange) |
| `--color-secondary` | Secondary contrast accent | `#00e5ff` (Cyber Cyan) |
| `--color-accent` | Tertiary badge accent | `#ffe600` (Analog Amber) |
| `--color-background` | Canvas background | `#080808` (Dark Obsidian) |
| `--color-surface` | Card / Window surface | `#121214` |
| `--color-surface-elevated` | Modal & elevated surfaces | `#1a1a1e` |
| `--color-text` | Primary readable text | `#f4f4f5` |
| `--color-muted` | Metadata / Subtitle text | `#8e8e93` |
| `--color-border` | Subtle panel borders | `#26262b` |
| `--color-crt-glow` | Phosphor glow ambient | `rgba(255, 59, 0, 0.25)` |

---

## 2. Retro Digital Surrealism Shaders

The platform includes GPU-accelerated canvas shaders:

### A. 32-Bit Film Grain Noise (`FilmGrainCanvas.tsx`)
- Generates procedural analog film grain directly in a raw 32-bit pixel buffer (`ImageData.data.buffer`).
- Respects `prefers-reduced-motion` media queries.
- Intensity can be throttled from `0%` (clean digital) to `100%` (heavy 16mm grain).

### B. CRT Scanlines & Phosphor Bloom (`ScanlineOverlay.tsx`)
- Creates ultra-fine horizontal cathode-ray scanlines with subtle vertical flicker.
- Uses CSS blend modes (`mix-blend-mode: overlay`) for low battery and CPU impact.

### C. Retro Window Containers (`RetroWindow.tsx`)
- Encapsulates content in vintage terminal window frames with minimize/maximize mock dots, titlebars, and status badges.
