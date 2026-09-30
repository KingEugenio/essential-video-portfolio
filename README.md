# Video Editor Portfolio & CMS Platform (Ekopixels Architecture)

A high-performance, WordPress-compatible portfolio platform engineered specifically for professional video editors, directors, colorists, and post-production studios.

---

## 1. Architectural Strategy & Technology Decision

### Chosen Framework: **React 19 + TypeScript + Tailwind CSS v4 + Vite**

#### Why React was chosen over Vanilla JavaScript for this project:
1. **Interactive State & Video Engine**: The platform features a complex, multi-provider universal video player (handling Direct MP4/HLS, Google Drive streaming, YouTube, Vimeo, Mux, Cloudflare Stream) across diverse aspect ratios (`16:9`, `9:16`, `1:1`, `4:5`, `4:3`, `2.39:1`).
2. **Real-Time Client Proofing Suite**: Includes frame-accurate timestamped revision commenting, player timeline seeking, passcode authentication, and live approval workflows.
3. **Comprehensive CMS & Brand Studio**: Real-time typography scaling, color token live-preview, dynamic section reordering, interactive Before/After color grading slider, and Google Drive folder browsing.
4. **Page-Aware Skeleton Loading Architecture**: Granular, component-specific loading states for every page and modal that dynamically adapt to active layout archetypes.
5. **Decoupled Data Abstraction Layer**: Built with clean interfaces (`IDataAdapter`, `LocalDataAdapter`, `WordPressAdapter`) ensuring zero lock-in and immediate compatibility with Headless WordPress, REST APIs, or local persistence.

---

## 2. Directory Structure

```text
/src
  ├── components/
  │    ├── admin/          # Admin Dashboard, Brand Studio, WordPress Sync, Proofing CMS, etc.
  │    ├── common/         # Page-aware Skeletons, GlassButton, GlassCard, GlassModal, Toast
  │    ├── proofing/       # Client Review Portal with timestamped comments & status actions
  │    ├── public/         # Public Hero, Portfolio, Modal, About, Services, Enquiry
  │    └── video/          # Universal Video Player, Before/After Color Slider, Showreel Modal
  ├── context/
  │    ├── PortfolioContext.tsx  # Central state management & orchestration
  │    └── ThemeContext.tsx      # Theme tokens, Presets, Typography & Layout engine
  ├── data/
  │    └── initialData.ts        # Default structured initial content & schemas
  ├── services/
  │    ├── dataAdapter.ts        # Abstract Data Layer (Local & Storage adapters)
  │    ├── wordpressAdapter.ts   # Headless WordPress REST API integration
  │    ├── mediaProvider.ts      # Multi-provider video resolution & ratio math
  │    ├── exportService.ts      # Portable JSON export/import (portfolio-export.json)
  │    └── portfolioService.ts   # Centralized portfolio business logic facade
  ├── theme/
  │    └── defaultTheme.ts       # Design tokens (Colors, Typography, Glass, Layout)
  ├── types.ts                   # Complete TypeScript interfaces & domain models
  ├── App.tsx                    # Root routing & dynamic view switcher
  ├── main.tsx                   # React 19 bootstrap
  └── index.css                  # Global Tailwind CSS v4 & custom keyframe animations
```

---

## 3. Data Abstraction Layer & CMS Decoupling

The platform isolates **Content** from **Presentation** and **Functionality**:

```text
               ┌─────────────────────────────────────────┐
               │              DATA SOURCES               │
               ├────────────────────┬────────────────────┤
               │ Local / Storage    │ Headless WordPress │
               │ Custom REST API    │ Export / Import    │
               └─────────┬──────────┴─────────┬──────────┘
                         │                    │
                         ▼                    ▼
               ┌─────────────────────────────────────────┐
               │        DATA ADAPTER INTERFACE           │
               │             (IDataAdapter)              │
               └──────────────────┬──────────────────────┘
                                  │
                                  ▼
               ┌─────────────────────────────────────────┐
               │           PORTFOLIO SERVICE             │
               │          (PortfolioService.ts)          │
               └──────────────────┬──────────────────────┘
                                  │
                                  ▼
               ┌─────────────────────────────────────────┐
               │          PORTFOLIO CONTEXT              │
               │        (State & React Hooks)            │
               └──────────────────┬──────────────────────┘
                                  │
                                  ▼
               ┌─────────────────────────────────────────┐
               │             PRESENTATION                │
               │      (Public & Admin Components)        │
               └─────────────────────────────────────────┘
```

---

## 4. Headless WordPress Integration

The application is 100% prepared for WordPress REST API integration without altering the visual design:
- **Custom Post Type**: `portfolio_project` (or standard `posts`)
- **Taxonomies**: `portfolio_category`
- **ACF / Custom Fields**: `video_url`, `client`, `year`, `aspect_ratio`, `brief`, `approach`, `software`, `role`, `has_before_after`, `before_url`, `after_url`
- **Sync Engine**: Admin can trigger one-click synchronization via `AdminWordPress.tsx` to pull all projects while retaining the custom frontend design and animations.

See `WORDPRESS_GUIDE.md` for complete PHP snippets and plugin setup instructions.

---

## 5. Page-Aware Skeleton Loader Architecture

Every major view and modal contains a layout-aware skeleton that mirrors the exact bounding boxes, aspect ratios, and column counts of the live content:
- **Hero Skeleton**: Adapts to `type-video`, `fullscreen-showreel`, `split-profile`, or `minimal-editorial`.
- **Portfolio Skeleton**: Adapts to `grid`, `masonry`, `large-feature`, or `editorial`.
- **Video Player Skeleton**: Renders proper aspect ratio frames (`16:9`, `9:16`, `1:1`, `4:5`, `2.39:1`).
- **Client Proofing Skeleton**: Replicates player, approval buttons, and timestamped comment feed.
- **Admin Skeletons**: Tailored loaders for Dashboard, Projects, Media Library, Drive Sync, Brand Studio, and Setup Wizard.

---

## 6. Development & Deployment

### Run Locally
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Checking & Linting
```bash
npm run lint
```
