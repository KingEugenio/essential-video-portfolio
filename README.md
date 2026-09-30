# EKO Pixels // Cinematic Video Editor Portfolio Platform & CMS

A high-performance portfolio platform engineered specifically for professional commercial video editors, colorists, and post-production artists. Built with a component-driven React & TypeScript architecture, custom full-stack Express API, WordPress REST API abstraction layer, Universal Multi-Format Video Player, real-time Brand Studio, and Retro Digital Surrealism shaders.

---

## ⚡ Key Highlights

- **UI & Experience Preservation**: 100% fidelity to the original cinematic aesthetic, CRT scanlines, custom film grain, analog chromatic aberration, and retro-futuristic terminal styling.
- **Universal Multi-Format Video Player**: Native support for **16:9**, **9:16** (TikTok/Reels), **1:1** (Square), **4:5**, and anamorphic ratios with before/after split color grading comparison.
- **Decoupled Data Abstraction Layer**: Single interface (`IDataAdapter`) connecting either the built-in Express CMS backend, Headless WordPress REST API (`/wp-json/wp/v2/`), or local offline JSON.
- **Media Provider Abstraction**: Seamless integration of Google Drive streaming assets, Direct Uploads, Vimeo, and YouTube.
- **Page-Aware Skeleton Loading**: Pixel-accurate layout skeletons for every public view, modal, and admin tab eliminating layout shifts and vibe-coded transitions.
- **Production-Ready CMS**: Comprehensive administrative suite for projects, media health checks, inquiries, services, testimonials, and live visual brand configuration.

---

## 🏗️ Architecture Overview

```text
                 ┌──────────────────────────────────────┐
                 │             DATA SOURCES             │
                 ├──────────────────────────────────────┤
                 │ Express REST API (/api/portfolio)    │
                 │ Headless WordPress (/wp-json/wp/v2/)  │
                 │ Local JSON / Seed Database           │
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │       PORTFOLIO SERVICE LAYER        │
                 │         (IDataAdapter Pattern)       │
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │        CORE APPLICATION (React)      │
                 ├──────────────────────────────────────┤
                 │ Public Experience & Project Modals   │
                 │ Universal Multi-Ratio Video Engine   │
                 │ Admin CMS & Live Preview Simulator   │
                 │ Progressive Image & Skeleton System  │
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │             THEME ENGINE             │
                 ├──────────────────────────────────────┤
                 │ CSS Custom Properties (Tokens)       │
                 │ CRT Glow & Scanline Shaders          │
                 │ Film Grain Noise Canvas              │
                 └──────────────────────────────────────┘
```

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the live portfolio.

3. **Access Admin Portal**:
   - Navigate to `http://localhost:3000/?admin=true` or press `Ctrl + Shift + A` (or `Cmd + Shift + A`).
   - Default Master Password: `admin123` or `ekopixels2026`.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 📚 Documentation Index

- [PROJECT.md](./PROJECT.md) – Functional inventory, architecture breakdown, and data schemas.
- [SETUP.md](./SETUP.md) – Environment variables, installation, and deployment configuration.
- [WORDPRESS_GUIDE.md](./WORDPRESS_GUIDE.md) – Complete guide to connecting Headless WordPress.
- [THEME_GUIDE.md](./THEME_GUIDE.md) – Design tokens, CSS custom properties, and shader controls.
- [MEDIA_GUIDE.md](./MEDIA_GUIDE.md) – Video formats, aspect ratios, Google Drive, and streaming setup.
- [DEPLOYMENT.md](./DEPLOYMENT.md) – Cloud Run, Docker, and static hosting options.
- [SECURITY.md](./SECURITY.md) – Authentication, rate limiting, and token management.
- [CHANGELOG.md](./CHANGELOG.md) – Release notes and migration changelog.
- [ROADMAP.md](./ROADMAP.md) – Future roadmap and expansion points.
