# CineFolio — Architecture & Developer Technical Documentation
## Technical Specification, State Management, API Schema & Deployment Guide

This documentation provides deep technical insight into the CineFolio Video Editor Portfolio Platform for frontend architects, full-stack developers, and DevOps engineers.

---

## 1. System Architecture Overview

```
 ┌────────────────────────────────────────────────────────────┐
 │                     CineFolio SPA                          │
 │         React 19 + TypeScript + Vite + Tailwind v4         │
 └──────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
┌──────────────────┐           ┌──────────────────┐
│  ThemeContext    │           │ PortfolioContext │
│  - CSS Variables │           │ - Projects       │
│  - Typography    │           │ - Google Drive   │
│  - Glass Styling │           │ - Booking / Form │
│  - Dark/Light    │           │ - WordPress Sync │
│  - Brand Data    │           │ - Proofing Engine│
└──────────────────┘           └──────────────────┘
        │                               │
        ▼                               ▼
┌──────────────────┐           ┌─────────────────────────────┐
│ Dynamic Tokens   │           │ Persistence / Integrations  │
│  :root variables │           │ - LocalStorage / Session    │
│  Tailwind v4     │           │ - Formspree REST API        │
│  Google WebFonts │           │ - Google Drive Embed API    │
└──────────────────┘           │ - WordPress Headless REST   │
                               └─────────────────────────────┘
```

---

## 2. Directory Structure

```
/
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── PORTFOLIO_DEVELOPER_DOCUMENTATION.md
├── PORTFOLIO_EDITOR_GUIDE.md
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                        # Master Router & View Controller
    ├── main.tsx                       # React DOM entry point
    ├── index.css                      # Tailwind v4 import & global styles
    ├── types.ts                       # Complete TypeScript Interfaces
    ├── context/
    │   ├── PortfolioContext.tsx       # Core CMS, Projects, Video & API State
    │   └── ThemeContext.tsx           # Brand Studio, Tokens & Theme Engine
    └── components/
        ├── admin/                     # Private Admin CMS Studio
        │   ├── AdminBrandStudio.tsx
        │   ├── AdminDashboard.tsx
        │   ├── AdminDocumentation.tsx
        │   ├── AdminEnquiries.tsx
        │   ├── AdminFormSettings.tsx
        │   ├── AdminGoogleDrive.tsx
        │   ├── AdminLayoutSettings.tsx
        │   ├── AdminLoginView.tsx
        │   ├── AdminMediaLibrary.tsx
        │   ├── AdminOverview.tsx
        │   ├── AdminProjects.tsx
        │   ├── AdminProofing.tsx
        │   ├── AdminServices.tsx
        │   ├── AdminSetupWizard.tsx
        │   ├── AdminSocialLinks.tsx
        │   ├── AdminTestimonials.tsx
        │   ├── AdminTypography.tsx
        │   └── AdminWordPress.tsx
        ├── common/                    # Reusable UI Primitives
        │   ├── GlassButton.tsx
        │   └── Toast.tsx
        ├── color/                     # Color Grading Tools
        │   └── ColorGradeCompare.tsx  # Interactive Wipe Before/After
        ├── proofing/                  # Client Video Proofing
        │   └── ClientProofingView.tsx # Frame-accurate Review Portal
        ├── public/                    # Public-facing Portfolio
        │   ├── AboutSection.tsx
        │   ├── EnquirySection.tsx
        │   ├── HeroSection.tsx
        │   ├── PortfolioSection.tsx
        │   ├── ProjectDetailModal.tsx
        │   ├── PublicFooter.tsx
        │   ├── PublicHeader.tsx
        │   ├── ServicesSection.tsx
        │   └── TestimonialsSection.tsx
        └── video/                     # Universal Video Playback Engine
            ├── ShowreelModal.tsx
            └── UniversalVideoPlayer.tsx
```

---

## 3. Data Schema & Core Interfaces (`types.ts`)

### Project Entity
```typescript
export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  category: string;
  description: string;
  brief?: string;
  approach?: string;
  role: string[];
  software: string[];
  services: string[];
  featured: boolean;
  published: boolean;
  status: 'published' | 'draft' | 'archived';
  order: number;
  viewsCount: number;
  thumbnailUrl: string;
  videoSource: VideoSource;
  videos?: ProjectVideo[];                // Multi-video deliverables
  beforeAfterColor?: BeforeAfterGrade;    // Interactive grade comparison
  sourceType?: 'manual' | 'googledrive' | 'wordpress';
  wordpressPostId?: number;
}
```

### Video Source & Orientation
```typescript
export type VideoOrientation = 'landscape' | 'portrait' | 'square';
export type VideoAspectRatio = '16:9' | '9:16' | '4:3' | '1:1' | '2.39:1' | '4:5' | 'custom';

export interface VideoSource {
  provider: 'googledrive' | 'youtube' | 'vimeo' | 'direct' | 'custom';
  url: string;
  embedUrl?: string;
  aspectRatio: VideoAspectRatio;
  orientation?: VideoOrientation;
  quality?: '4K' | '1080p' | '720p' | 'Source ProRes';
  duration?: string;
  posterUrl?: string;
}
```

---

## 4. Universal Video Player Engine

The `UniversalVideoPlayer.tsx` automatically resolves standard URLs into responsive embeds:

- **Google Drive**: Converts `/view` or `/open?id=FILE_ID` to `https://drive.google.com/file/d/FILE_ID/preview` with sandbox permissions and zero UI chrome.
- **YouTube**: Injects `youtube-nocookie.com` embed with `rel=0` and `modestbranding=1`.
- **Vimeo**: Injects `player.vimeo.com/video/ID` with `dnt=1` (Do Not Track) and custom brand color.
- **Direct MP4/WebM**: Native `<video>` player with custom controls, timecode tracking, playback rate toggles (0.5x to 2x), and fullscreen handling.

---

## 5. Booking Form Architecture & Formspree Dispatch

When a client submits an enquiry through `EnquirySection.tsx`:
1. Submission is received by `submitEnquiry()` in `PortfolioContext.tsx`.
2. The payload is stored in local client state for instant offline dashboard viewing.
3. If `bookingSettings.provider === 'formspree'`, a JSON `POST` request is sent to `bookingSettings.formspreeEndpoint`:
```typescript
await fetch(bookingSettings.formspreeEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    name: data.clientName,
    email: data.clientEmail,
    phone: data.clientPhone,
    company: data.company,
    projectType: data.projectType,
    budget: data.budgetRange,
    deadline: data.deadline,
    footageStatus: data.footageStatus,
    footageLink: data.footageLink,
    message: data.message,
    _subject: `New Video Project Brief from ${data.clientName}`,
  }),
});
```

---

## 6. Headless WordPress REST API Integration

CineFolio can operate as a headless frontend consuming standard WordPress REST API post collections:

### Endpoint Schema
`GET /wp-json/wp/v2/portfolio_project` (or `/posts`)

### Response Mapping
| WordPress Post Field | CineFolio Field |
|---|---|
| `post.title.rendered` | `project.title` |
| `post.content.rendered` | `project.description` |
| `post.acf.video_url` | `project.videoSource.url` |
| `post.acf.client` | `project.client` |
| `post.acf.year` | `project.year` |
| `post.acf.aspect_ratio` | `project.videoSource.aspectRatio` |
| `post.acf.role` | `project.role` |
| `post.acf.software` | `project.software` |
| `_embedded['wp:featuredmedia'][0].source_url` | `project.thumbnailUrl` |

---

## 7. Security & Admin Routing

To ensure privacy:
- The public header and footer contain **no admin links**.
- Accessing `activeView === 'admin'` verifies `sessionStorage.getItem('cinefolio_admin_auth') === 'true'`.
- If unauthenticated, `<AdminLoginView />` intercepts the render and requires the admin passcode before exposing the dashboard.
- Developer attribution (**BUILT BY EKOPIXELS**) is rendered in the public footer.

---

## 8. Build & Deployment

### Production Build
```bash
npm run build
```
Generates optimized static assets in `/dist`.

### Development Mode
```bash
npm run dev
```
Binds development server to `0.0.0.0:3000`.

---
*Architected by **EKO Pixels**.*
