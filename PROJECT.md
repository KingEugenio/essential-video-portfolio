# PROJECT SPECIFICATION & ARCHITECTURE MANIFEST

## 1. System Identity
- **Product Name**: EKO Pixels Video Editor Portfolio & CMS
- **Target Audience**: High-end commercial directors, agencies, record labels, and post-production houses seeking elite video editing, color grading, sound design, and VFX capabilities.
- **Visual Aesthetic**: Retro Digital Surrealism meets high-contrast Swiss grid minimalism (analog CRT glow, phosphor scanlines, 32-bit noise canvas, and neon orange/cyan accents).

---

## 2. Core Functional Modules

### Public-Facing Presentation
1. **Kinetic Hero & Live Showreel**: Interactive showreel preview, availability beacon, direct booking trigger, and kinetic typography.
2. **Dynamic Project Archive**: Multi-tag filtering (`Commercial`, `Music Video`, `Short Film`, `Social 9x16`, `Color Grading`), featured badge highlights, duration tags, and multi-format indicators.
3. **Immersive Project View Modal**:
   - Deep linking (`?project=slug`).
   - Adaptive video canvas with aspect ratio locking (`16:9`, `9:16`, `1:1`, `4:5`).
   - Interactive Before/After color grade slider with synchronized scrubbing.
   - Comprehensive project brief, editorial approach, software stack, and full production credits.
4. **Services & Turnaround Matrix**: Categorized service offerings with turnaround times, software badges, and deliverable specifications.
5. **Client Testimonials & Press**: Director/producer quotes with studio verification and star ratings.
6. **Transmission Brief Form**: Multi-step inquiry builder with footage storage selection (Google Drive, Frame.io, Dropbox, Local NAS), budget range picker, and Formspree / WhatsApp direct forwarding.

### Administration CMS
1. **Authentication & Rate Limiting**: Session-token authentication with brute-force defense (8 attempts / 5 minutes).
2. **Projects Manager**: Create, duplicate, edit, reorder, and publish/unpublish portfolio items.
3. **Universal Media Library**:
   - Direct file uploads with automatic thumbnail generation.
   - Automated media health checker (verifying streaming status and link uptime).
   - Google Drive Folder Browser & Direct Importer.
4. **Brand & Theme Studio**: Real-time CSS custom property controls for colors, typography, border radius, film grain intensity, scanline frequency, and CRT phosphor glow.
5. **Headless WordPress Sync Tab**: REST API endpoint configuration and automated post-type mapping.
6. **Live Project Preview Simulator**: Multi-device viewport emulator (Desktop, Tablet, Mobile) reflecting live unsaved draft changes.

---

## 3. Data Entities & Schema Types

```typescript
// Foundational Project Schema
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  brief?: string;
  approach?: string;
  role: string;
  software: string[];
  client: string;
  year: string;
  category: string;
  services: string[];
  tags: string[];
  thumbnail: string;
  mainVideo: VideoItem;
  additionalVideos?: VideoItem[];
  beforeAfter?: {
    beforeUrl: string;
    afterUrl: string;
    beforeLabel: string;
    afterLabel: string;
  };
  featured: boolean;
  order: number;
  status: 'draft' | 'published';
  visibility?: 'public' | 'private' | 'unlisted';
  views: number;
  credits?: ProjectCredit[];
}
```
