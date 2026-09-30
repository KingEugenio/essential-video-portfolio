# Architecture & Technical Specifications

## 1. System Architecture Map

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
├──────────────────────┬───────────────────────┬─────────────────────────┤
│ Public Portfolio     │ Client Proofing Suite │ Admin Studio & CMS      │
│ (Hero, Grid, Detail) │ (Timeline & Feedback) │ (Themes, Media, Sync)   │
└──────────────────────┴───────────┬───────────┴─────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             THEME ENGINE                               │
├────────────────────────────────────────────────────────────────────────┤
│ CSS Design Tokens: Colors, Typography, Glass, Radius, Border, FX      │
│ Presets: Electric Lime, Cyber Blue, Cinema Gold, Retro CRT, Minimal   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA ABSTRACTION LAYER                          │
├────────────────────────────────────────────────────────────────────────┤
│ PortfolioService (Facade)                                              │
│  ├── LocalDataAdapter (LocalStorage + Initial Cache)                   │
│  ├── WordPressAdapter (Headless WP REST API)                           │
│  └── ExportService (JSON Snapshots & Portability)                      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       MEDIA PROVIDER ABSTRACTION                       │
├────────────────────────────────────────────────────────────────────────┤
│ MediaProviderResolver                                                  │
│  ├── DirectMediaProvider (MP4 / HLS / WebM)                            │
│  ├── GoogleDriveMediaProvider (Ad-free streaming & thumbnail resolver) │
│  ├── YouTubeMediaProvider (Privacy-enhanced embed & poster cache)      │
│  └── VimeoMediaProvider (HD Embed player)                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Separation of Concerns

1. **Content**: Managed strictly through domain types (`Project`, `BrandSettings`, `ServiceItem`, `TestimonialItem`, `EnquiryItem`, `ClientProofingReview`).
2. **Presentation**: Styled via reactive CSS custom properties (`var(--brand-primary)`, `var(--brand-bg)`, `var(--font-heading)`) dynamic classes, and motion animations.
3. **Functionality**: Reusable components (`UniversalVideoPlayer`, `BeforeAfterSlider`, `ClientProofingView`, `AdminDashboard`).
4. **Data Source**: Interfaced through `IDataAdapter`, enabling seamless migration between Local Storage, Custom REST API, and WordPress REST API.

---

## 3. Page-Aware Skeleton Loader Hierarchy

| View / Modal | Skeleton Component | Dynamic Responsive Handling |
| :--- | :--- | :--- |
| **Public Page** | `PublicPageSkeleton` | Full page layout container with sticky header & footer |
| **Hero Section** | `HeroSectionSkeleton` | Adapts to 4 Hero Layout Types (`type-video`, `fullscreen-showreel`, etc.) |
| **Portfolio Grid** | `PortfolioSectionSkeleton` | Adapts to 4 Card Styles (`grid`, `masonry`, `large-feature`, `editorial`) |
| **Project Modal** | `ProjectDetailModalSkeleton` | Preserves player ratio, deliverable cards, and dual-column brief |
| **Client Proofing** | `ClientProofingSkeleton` | Renders 16:9 player, action bar, and timestamp comment threads |
| **Admin Overview** | `DashboardSkeleton` | Renders analytics metrics, enquiry queue, and drive storage gauges |
| **Admin Projects** | `AdminProjectsSkeleton` | Renders table rows, thumbnail aspect placeholders, and badge chips |
| **Media Library** | `AdminMediaLibrarySkeleton` | Renders search bar, filter tabs, and responsive media grid cards |
| **Brand Studio** | `AdminBrandStudioSkeleton` | Renders logo preview, color swatches, and profile form blocks |
| **Setup Wizard** | `AdminSetupWizardSkeleton` | Renders multi-step progress bar and form question boxes |

---

## 4. Video Aspect Ratio & Responsive Math

All video players dynamically adapt to source aspect ratios without letterboxing artifacts:

| Aspect Ratio | Tailwind Utility | Target Delivery Format |
| :--- | :--- | :--- |
| `16:9` | `aspect-video` | Widescreen Commercials, Music Videos, YouTube |
| `9:16` | `aspect-[9/16]` | Instagram Reels, TikTok, YouTube Shorts |
| `1:1` | `aspect-square` | Social Feeds, Instagram Square |
| `4:5` | `aspect-[4/5]` | Vertical Feed Ads, Social Portraits |
| `4:3` | `aspect-[4/3]` | Retro / CRT / Broadcast 4:3 |
| `2.39:1` | `aspect-[2.39/1]` | Anamorphic Cinematic Widescreen |

---

## 5. Security & Isolation

- **Admin Isolation**: Admin routes are protected behind passcode verification stored in `sessionStorage` and never exposed via public navigational DOM elements.
- **API Key Safety**: Public client does not expose write credentials; headless WordPress calls use authenticated headers or server-side proxying when write operations are executed.
- **XSS Sanitization**: Rich text from WordPress excerpts and project briefs are safely sanitized through `stripHtml` before DOM rendering.
