# USER SETUP & CUSTOMIZATION GUIDE
### The Complete Onboarding & Operational Manual for Video Editors, Filmmakers & Visual Artists

---

## 1. START HERE

### READ THIS BEFORE YOU START

Welcome to your **Video Editor & Creative Studio Portfolio Template**. This website was engineered specifically for video editors, colorists, filmmakers, VFX artists, motion designers, and creative post-production studios who need a high-converting, broadcast-grade showcase for their work.

Whether you have never written a line of code in your life or you are a seasoned creative director, this document is your **mandatory, step-by-step roadmap**. It walks you through every single step required to configure your brand, upload your projects, organize your footage, connect your forms, and launch your custom domain.

```
===================================================================================
                                SETUP ROADMAP
===================================================================================

   [ 1. DOWNLOAD TEMPLATE ]
              ↓
   [ 2. PREPARE YOUR CONTENT ]  (Logos, Showreel, Videos, Thumbnails, Bios)
              ↓
   [ 3. ADD LOGO + PROFILE PHOTO ] (Header, Footer, Favicon, Bio Portrait)
              ↓
   [ 4. ADD BRAND COLORS ]      (Primary, Secondary, Accent, Glass Tint)
              ↓
   [ 5. ADD FONTS ]             (Display, Headings, Body, Monospace Code)
              ↓
   [ 6. ADD PROJECTS ]          (Titles, Clients, Categories, Roles, Scope)
              ↓
   [ 7. ADD VIDEOS ]            (Direct Upload, YouTube, Vimeo, Google Drive)
              ↓
   [ 8. ADD IMAGES ]            (Before/After Color Grades, BTS, Stills)
              ↓
   [ 9. ADD SOCIAL LINKS ]      (Instagram, YouTube, Vimeo, WhatsApp, TikTok)
              ↓
   [ 10. CONFIGURE CONTACT FORM ] (Formspree ID, Email Route, WhatsApp)
              ↓
   [ 11. CUSTOMIZE WEBSITE ]    (Theme: Cinematic, Aurora, Retro VHS, Minimal)
              ↓
   [ 12. TEST WEBSITE ]         (Mobile Responsiveness, Video Playback, Forms)
              ↓
   [ 13. CHOOSE HOSTING ]       (Vercel, Netlify, Cloudflare, Web Host)
              ↓
   [ 14. CONNECT DOMAIN ]       (DNS A/CNAME Records, SSL Certificate)
              ↓
   [ 15. PUBLISH & PROMOTE ]    (Share with Directors, Agencies & Clients!)
===================================================================================
```

---

### What This Template Is
This template is a modern, ultra-responsive web application built with a client-first Content Management System (CMS). It gives you:
1. **A Public Portfolio Front-End**: An ultra-fast, cinematic website that displays your showreel, featured commercials, vertical social reels (TikTok/Shorts/Reels), DaVinci Resolve color grading comparison sliders, client reviews, pricing packages, and booking forms.
2. **An Integrated Admin Dashboard & Brand Studio**: A password-protected management suite (`/admin` or via the top-right lock icon) where you can change brand colors, fonts, project descriptions, pricing, and video links in real time with instant live previews—**without editing raw code**.

---

### What You Receive
When you unzip or clone your project, you receive:
* **The Full Source Code**: Everything needed to build, preview, and host your website.
* **Pre-configured Theme Presets**: Cinematic Luxury, Aurora Glow, Retro VHS/Film Grain, Cyberpunk Neon, and Editorial Monochrome.
* **Integrated Interactive Tools**: Split-screen Before/After color grade slider, frame-accurate client proofing & review portal, interactive pricing calculator with multi-currency support, and Google Drive video stream connector.
* **Documentation & Operations Manuals**: This onboarding guide, the developer architecture documentation, and the WordPress migration handbook.

---

### What You Need Before Starting
You only need three basic things:
1. **Your Project Content**: Video links (YouTube, Vimeo, Google Drive, or MP4s), high-resolution thumbnails, your bio, logo, and list of services.
2. **A Modern Web Browser**: Google Chrome, Brave, Apple Safari, or Mozilla Firefox.
3. **A Place to Host (When Ready)**: A free account on Vercel, Netlify, Cloudflare Pages, or your personal web hosting provider.

---

### What Can Be Customized vs. What Should Not Be Modified

| Area | Can I Customize It? | How to Customize |
| :--- | :--- | :--- |
| **Brand Colors & Palette** | ✅ Yes (100%) | Admin Dashboard > **Brand Studio** > Colors |
| **Typography & Fonts** | ✅ Yes (100%) | Admin Dashboard > **Typography & Fonts** |
| **Logos & Profile Photos** | ✅ Yes (100%) | Admin Dashboard > **Brand Studio** > Logo / Avatar |
| **Projects & Video Links** | ✅ Yes (100%) | Admin Dashboard > **Projects** > Add / Edit |
| **Pricing & Services** | ✅ Yes (100%) | Admin Dashboard > **Pricing Packages** & **Services** |
| **Contact Form & WhatsApp**| ✅ Yes (100%) | Admin Dashboard > **Booking & Form Settings** |
| **Interactive Themes & FX**| ✅ Yes (100%) | Admin Dashboard > **Layout & Glass Style** |
| **Core Build Engine / TSX** | ⚠️ Developers Only | Edit files in `/src/` only if you understand React & TypeScript |

---

### How the Template Separates Content From Design
This template uses a **Data & Token Architecture**. This means:
* Your **content** (videos, client names, project stories, pricing numbers) is kept separate from the visual code.
* Your **design** (colors, rounded corners, blur intensities, typography sizes) is controlled centrally through design tokens.
* When you switch from the **Aurora Theme** to the **Retro VHS Theme**, all your project text, videos, and client reviews stay 100% intact. Nothing is lost or overwritten.

---

## 2. WHAT YOU SHOULD PREPARE BEFORE CUSTOMIZATION

Before touching any settings, gather the following assets in a folder on your computer. Having everything prepared will cut your setup time down to under 15 minutes.

### Content Preparation Checklist

- [ ] **Creator / Studio Name**: Your legal or trading brand name (e.g. *Eko Visuals*, *Elena Rostova Film*).
- [ ] **Professional Title**: A clear, high-impact specialty statement (e.g. *Commercial Video Editor & Colorist*).
- [ ] **Primary Logo**: Vector SVG or high-resolution PNG with transparent background.
- [ ] **Favicon**: Small 32x32px or 64x64px square icon for browser tabs.
- [ ] **Profile / Director Portrait**: Professional, well-lit photo for your About section (1:1 square or 4:5 vertical).
- [ ] **Hero / Showreel Video**: Your 60–90 second master sizzle reel (YouTube, Vimeo, or MP4).
- [ ] **Project Videos**: 4 to 12 of your strongest client projects or spec commercials.
- [ ] **Project Thumbnails**: Sharp 16:9 (1920x1080) and 9:16 (1080x1920) cover frames.
- [ ] **Before/After Stills (Optional)**: Ungraded RAW log capture and graded hero still for the color grading slider.
- [ ] **Project Metadata**: Client name, year, software used (Premiere, DaVinci, After Effects), and your exact role.
- [ ] **Services & Deliverables**: List of services you sell (e.g. Commercial Assembly, Sound Design, Subtitles).
- [ ] **Pricing Packages**: Your rates, turnaround times, and revision policies (e.g. Social Cut, Commercial Master, Monthly Retainer).
- [ ] **Testimonials**: 2 to 5 quotes from directors, producers, or agency clients.
- [ ] **Bio & About Copy**: 2–3 paragraphs describing your background, aesthetic, and editing philosophy.
- [ ] **Gear & Hardware List**: Your editing workstation specs (e.g. Apple M3 Max, DaVinci Resolve Studio, Sony FX3).
- [ ] **Contact Email & Phone**: Your public business email and WhatsApp number with country code.
- [ ] **Social Profiles**: Links to your Instagram, YouTube, Vimeo, TikTok, LinkedIn, or Behance.
- [ ] **Domain Name**: Your target URL (e.g. `www.yourname.com`).

---

## 3. RECOMMENDED FILE ORGANIZATION

To prevent broken links, lost files, and confusion when updating your portfolio in the future, organize your computer folder structure exactly like this:

```text
MY-PORTFOLIO-ASSETS/
│
├── 01_BRAND/
│   ├── logo-primary.svg         <-- Vector main logo
│   ├── logo-white.svg           <-- White version for dark backgrounds
│   ├── logo-black.svg           <-- Dark version for light backgrounds
│   ├── favicon-64.png           <-- Browser tab icon
│   └── director-portrait.jpg    <-- Your high-res profile photo
│
├── 02_SHOWREEL/
│   ├── showreel-2026-master.mp4 <-- Master video export (H.264 or ProRes)
│   └── showreel-cover.jpg       <-- High-impact thumbnail frame
│
├── 03_PROJECTS/
│   ├── 01_NIKE_COMMERCIAL/
│   │   ├── video-master-16x9.mp4
│   │   ├── cover-thumbnail.jpg
│   │   ├── color-raw-log.jpg    <-- For Before/After grading slider
│   │   └── color-graded.jpg     <-- For Before/After grading slider
│   │
│   ├── 02_RED_BULL_DOC/
│   │   ├── video-stream-link.txt (Vimeo or YouTube URL)
│   │   └── cover-thumbnail.jpg
│   │
│   └── 03_FASHION_REELS_9x16/
│       ├── vertical-cut-01.mp4
│       └── cover-thumbnail-vertical.jpg
│
├── 04_DOCUMENTS/
│   ├── rate-card-2026.pdf       <-- Public downloadable rate card
│   └── terms-of-service.pdf     <-- Client contract policy
│
└── 05_FONTS/                    <-- Custom OTF/WOFF2 web fonts (if using local files)
```

---

## 4. FILE NAMING RULES

Web browsers and Content Delivery Networks (CDNs) can fail or load slowly when file names contain special characters, spaces, or uppercase letters. Follow these strict naming guidelines:

### ✅ Recommended File Names (Clean, Safe & SEO-Friendly)
* `commercial-nike-air-max-2026.mp4`
* `red-bull-drift-hero-thumbnail.jpg`
* `davinci-resolve-color-grade-before.jpg`
* `ekopixels-logo-white.svg`
* `director-elena-rostova-avatar.webp`

### ❌ Discouraged File Names (Prone to Breakage)
* `Final_Render_V2_FINAL_really_final(1).mp4` (Spaces, parentheses, confusing versioning)
* `IMG_9384920193.JPG` (Meaningless for SEO, impossible to search)
* `My Logo New & Updated!.png` (Special characters `&`, `!` break browser URLs)
* `video 1.mov` (Uncompressed 20GB QuickTime files will freeze client browsers)

---

## 5. LOGO SETUP

Your logo appears in the sticky navigation header, public footer, client proofing invoices, and mobile menu drawer.

```text
[SCREENSHOT: Brand Studio > Logo & Favicon Upload Settings]
```

### Supported Logo Formats
1. **SVG (Recommended)**: Scalable Vector Graphics. Renders razor-sharp on every display from 4K studio monitors to iPhones with zero pixelation and tiny file sizes (<15KB).
2. **PNG with Transparency**: If you do not have an SVG, export a high-resolution transparent PNG with no white or black background box.
3. **WebP**: Modern image format with high compression and transparency support.

### Logo Dimensions & Recommendations
* **Header / Navigation Logo**: Ideal aspect ratio is rectangular (3:1 or 4:1) with dimensions around `320px × 80px`.
* **Square / Monogram Logo**: Ideal dimensions around `200px × 200px`.
* **Maximum File Size**: Keep under `200 KB`.

### Handling Light & Dark Backgrounds
* If your portfolio uses a dark cinematic theme, ensure your logo text is **white or high-contrast silver/gold**.
* If you have a dark black logo mark, use the **Logo Invert Filter** in the Brand Studio or upload a dedicated light version (`logo-white.svg`) so it doesn't vanish against dark surfaces.

---

## 6. PROFILE PHOTO

Your portrait is the human anchor of your portfolio. It appears in the **About & Director Bio** section and inside client quote proposals.

### Specifications
* **Recommended Dimensions**: `800px × 800px` (Square 1:1) or `800px × 1000px` (Vertical 4:5).
* **Format**: WebP or JPG compressed at 80% quality. Keep file size under `350 KB`.
* **Composition**: Clean, cinematic lighting, editorial framing, eyes in focus. Avoid noisy background clutter.

---

## 7. HOW TO ADD YOUR VIDEOS

The template supports **four video integration methods**. Each method has distinct strengths depending on your client audience, video duration, and privacy requirements.

```text
[SCREENSHOT: Projects Manager > Video Source Selector: Direct Upload / YouTube / Vimeo / Drive]
```

### Video Hosting Methods Comparison

| Method | Best Suited For | Advantages | Considerations & Limitations |
| :--- | :--- | :--- | :--- |
| **Direct Upload (MP4/WebM)** | Sizzle clips, background loops, teaser cutdowns (under 45MB) | Zero third-party logos; ultra-clean player; instant playback | Consumes web hosting bandwidth for large files |
| **Google Drive** | Existing client archives, direct RAW rushes, unreleased footage | Free cloud storage; easy folder organization; password control | May have rate limits for viral spikes |
| **Vimeo** | High-end commercial director reels & private pitch links | Pristine 4K bitrate; domain locking; privacy controls; clean embed | Advanced player customization requires Vimeo Plus/Pro |
| **YouTube** | Public creator edits, music videos, tutorials, long-form | Free bandwidth; globally fast CDN; familiar interface | YouTube logo, end-screen suggestions (use `rel=0`) |

---

## 8. DIRECT VIDEO UPLOADS

Direct video uploads give you a clean, unbranded video player with custom glass controls, scrubbing bars, and volume sliders.

### 10-Step Direct Upload Walkthrough
1. Log into your portfolio Admin Dashboard (`/admin`).
2. Click on the **Projects** tab in the sidebar.
3. Click **+ Add Project** or select an existing project card to edit.
4. Under **Primary Video Source**, select **Direct File / Local Asset**.
5. Click **Upload MP4/WebM** or drag your compressed video file into the upload zone.
6. Wait for the upload progress bar to reach 100%.
7. Upload a custom **16:9 or 9:16 Cover Thumbnail** (JPG/WebP).
8. Fill out the **Project Title, Client, Category, and Role Description**.
9. Click **Preview Project Modal** to verify audio synchronization and playback on desktop and mobile.
10. Click **Save Changes / Publish Project**.

### Compression Guidelines for Direct Uploads
* **Codec**: H.264 (AVC) or H.265 (HEVC).
* **Container**: `.mp4` with fast-start enabled (Moov atom at the beginning of the file).
* **Resolution**: 1080p (`1920×1080` for 16:9 or `1080×1920` for 9:16). Do not upload uncompressed 4K ProRes files (10GB+) directly—they will cause buffering on mobile networks.
* **Target Bitrate**: 4,000 kbps to 8,000 kbps (4–8 Mbps) provides pristine quality with lightweight file size.

---

## 9. VIDEO ASPECT RATIOS

Your portfolio handles all modern aspect ratios natively without letterboxing or squishing.

```text
   ┌───────────────┐      ┌────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
   │               │      │        │      │          │      │          │      │          │
   │     16:9      │      │  9:16  │      │   1:1    │      │   4:5    │      │   4:3    │
   │   Cinematic   │      │ Reels  │      │  Square  │      │Instagram │      │ Classic  │
   │               │      │ TikTok │      │          │      │          │      │          │
   └───────────────┘      └────────┘      └──────────┘      └──────────┘      └──────────┘
```

* **16:9 (Widescreen)**: Commercials, YouTube long-form, music videos, narrative films.
* **9:16 (Vertical)**: Instagram Reels, TikTok, YouTube Shorts, fashion campaigns.
* **1:1 (Square)**: Social media ads, product carousels.
* **4:5 (Portrait)**: Instagram main feed posts.
* **2.39:1 (Anamorphic Scope)**: High-end feature films, dramatic commercials.

---

## 10. VIDEO THUMBNAILS

A high-converting thumbnail makes the difference between an agency producer clicking your reel or scrolling past.

### Thumbnail Best Practices
1. **Resolution**: Match the video ratio (e.g. `1920×1080px` for horizontal, `1080×1920px` for vertical).
2. **Quality**: Export high-bitrate WebP or JPG at 85% quality.
3. **Framing**: Pick the most dramatic, visually striking frame of the project—a crisp subject closeup, high-contrast silhouette, or vibrant color moment.
4. **No Giant Text Titles**: Avoid baking large title text into the image itself; the website template already overlays title and metadata in crisp HTML typography.

---

## 11. GOOGLE DRIVE VIDEO INTEGRATION

You can stream video assets directly from your Google Drive account without re-uploading massive files to your website host.

```text
[SCREENSHOT: Google Drive Connect & Authorization Modal]
```

### Complete 10-Point Google Drive Workflow
1. **Organize Folders**: In Google Drive, create a dedicated master folder named `Portfolio-Videos`.
2. **Create Project Subfolders**: Inside, create subfolders for each project (e.g. `Project-01-Commercial`).
3. **Upload Compressed Footage**: Upload your H.264 `.mp4` video files to their respective subfolders.
4. **Set Link Sharing**: Right-click the video file > **Share** > Change to **"Anyone with the link can view"**.
5. **Copy Video ID or Share Link**: Copy the share link (e.g. `https://drive.google.com/file/d/1A2B3C4D5E.../view`).
6. **Paste into Admin**: In the portfolio Admin Projects tab, select **Google Drive** as the source and paste the link or File ID.
7. **Direct Stream Extraction**: The template automatically transforms the Drive ID into a secure streaming URL.
8. **Moving Files**: If you move the file to another folder in Google Drive, the link continues to work as long as the File ID is unchanged.
9. **Deleting Files**: If you delete the video from your Google Drive, the website will show a "Media Unavailable" placeholder. Keep your Drive organized.
10. **Storage Benefits**: The website only stores the lightweight metadata reference, keeping your website build ultra-fast and lightweight!

---

## 12. YOUTUBE INTEGRATION

YouTube embeds are ideal for public creator edits, documentaries, and agency commercials.

### How to Add a YouTube Video
1. Copy the URL from your browser or the YouTube Share dialog (e.g. `https://www.youtube.com/watch?v=dQw4w9WgXcQ` or `https://youtu.be/dQw4w9WgXcQ`).
2. In the Admin Projects tab, select **YouTube** as your video source.
3. Paste the URL. The template automatically extracts the 11-character video ID.
4. **Privacy Note**: You can use **Public** or **Unlisted** YouTube videos. **Private** videos cannot be viewed by website visitors.

---

## 13. VIMEO INTEGRATION

Vimeo is the standard for professional filmmakers, colorists, and commercial editors.

### How to Add a Vimeo Video
1. Copy the Vimeo video URL (e.g. `https://vimeo.com/123456789`).
2. In the Admin Projects tab, select **Vimeo** as your video source and paste the URL.
3. **Privacy Settings (Vimeo Plus/Pro)**: If your Vimeo video has privacy restrictions, set the video privacy to **"Hide from Vimeo"** or configure **Domain-Level Privacy** to allow embeds on your domain (e.g. `yourname.com`).

---

## 14. ADDING IMAGES

The template supports rich gallery grids, Before/After color grading split-screens, and Behind-The-Scenes (BTS) production stills.

### Supported Image Formats

| Format | When to Use | Recommended Max Size |
| :--- | :--- | :--- |
| **WebP** | Default choice for all thumbnails, galleries, and stills | `< 300 KB` |
| **JPG / JPEG** | Photography stills, RAW color grading exports | `< 450 KB` |
| **PNG** | Graphics requiring transparent cutouts | `< 250 KB` |
| **SVG** | Brand logos, sponsor icons, camera badge vectors | `< 30 KB` |

---

## 15. ADDING DOCUMENTS & MEDIA KITS

You can link public documents such as your Rate Card, Media Kit, or Equipment List.

```text
[SCREENSHOT: Brand Studio > Media Kit & Document Attachments]
```

### Public Documents vs. Private Documents
* **Public Documents**: PDFs intended for prospective clients (e.g. `2026-Rate-Card.pdf`, `Editor-CV.pdf`). Place these in your cloud storage (Google Drive, Dropbox) or public media library and link them in the Brand Studio.
* **Private / Confidential Documents**: Client NDAs, unreleased master rushes, or raw billing statements. **NEVER** upload private documents into public website folders.

---

## 16. MAKE THE WEBSITE MATCH YOUR BRAND

You do **NOT** need to edit CSS code across dozens of files to rebrand this website. The template uses a centralized **Design Token Engine**.

```text
===================================================================================
                       CENTRALIZED BRAND TOKENS
===================================================================================
  Primary Accent:   [ #E50914 ] ──────► Buttons, Active Indicators, Play Icons
  Secondary Accent: [ #00D4FF ] ──────► Subtitles, Category Tags, Glow Highlights
  Canvas Background:[ #0B0C10 ] ──────► Main Page Body, Modal Backdrops
  Card Surface:     [ #1F2833 ] ──────► Glass Containers, Project Cards
  Primary Text:     [ #FFFFFF ] ──────► Headlines, Hero Titles
  Muted Text:       [ #C5C6C7 ] ──────► Descriptions, Year Meta, Roles
===================================================================================
```

When you update these tokens in the Admin Dashboard (**Brand Studio** > **Colors**), the changes automatically cascade across every button, card, header, modal, and footer in real time.

---

## 17. COLOR CUSTOMIZATION WORKFLOW

Follow this simple workflow to test and apply your color identity:

```text
1. CHOOSE BRAND COLORS (Extract 2–3 HEX codes from your logo or palette)
        ↓
2. ENTER HEX VALUES IN ADMIN (Brand Studio > Colors)
        ↓
3. LIVE PREVIEW IN BROWSER (Check against both Dark and Light surfaces)
        ↓
4. CHECK TEXT CONTRAST (Ensure white text on dark cards is easily readable)
        ↓
5. CHECK BUTTONS & HOVER (Verify button text is sharp and high-contrast)
        ↓
6. SAVE BRAND PRESET (Changes persist immediately to your portfolio)
```

### Finding Your Brand HEX Codes
A HEX color code is a 6-character code preceded by a hash symbol (e.g. `#FF0055` for neon red, `#00E5FF` for cyan). You can find your exact HEX codes using:
* Adobe Photoshop / Illustrator: Color Picker Eyedropper.
* DaVinci Resolve: Color Wheels / Scopes palette.
* Free online color pickers (e.g. `coolors.co`).

---

## 18. COLOR ACCESSIBILITY & READABILITY RULES

A visually striking color is useless if visitors cannot read your project descriptions.

> ⚠️ **CRITICAL CONTRAST RULE**: Never use dark gray text on a dark gray background, or light yellow text on a white background. Maintain a high contrast ratio (at least 4.5:1 for body copy) to ensure your portfolio passes accessibility standards and looks professional on all monitors.

---

## 19. TYPOGRAPHY & FONTS

Typography sets the emotional tone of your portfolio—whether bold, cinematic, technical, or minimal.

```text
[SCREENSHOT: Typography & Font Selection Studio]
```

### Font Roles
* **Display & Hero Font**: Used for large introductory statements, hero titles, and major numbers.
* **Heading Font**: Used for section headers, project card titles, and modal names.
* **Body Font**: Used for project descriptions, bio paragraphs, and client reviews.
* **Monospace / Metadata Font**: Used for timecodes, camera frame rates (e.g. `24 FPS`, `4K DCI`), software tags, and status badges.

### Recommended Font Pairings
* **Cinematic Luxury**: Syne / Clash Display (Headings) + Plus Jakarta Sans (Body).
* **Technical Post-Production**: Space Grotesk (Headings) + Inter (Body) + Space Mono (Metadata).
* **Editorial Minimalist**: Playfair Display (Headings) + Manrope (Body).
* **Modern Studio**: Sora / Montserrat (Headings) + DM Sans (Body).

---

## 20. BRAND STUDIO SETTINGS REFERENCE

The **Brand Studio** panel contains all core creator identity fields:

| Field Name | Description | Example Value |
| :--- | :--- | :--- |
| **Creator Name** | Your professional or business name | `Elena Rostova` |
| **Hero Title** | Your primary specialty headline | `Commercial Video Editor & Colorist` |
| **Hero Tagline** | Brief mission or aesthetic description | `Crafting high-retention visual stories for global brands.` |
| **Location & Timezone**| Your city and working timezone | `London, UK (GMT / UTC+0)` |
| **Availability Status**| Current booking capacity | `Booking Q3 Commercials & Music Videos` |
| **Email Address** | Inquiries destination email | `elena@rostovafilm.com` |
| **WhatsApp Number** | International format phone number | `+447911123456` |
| **Software Arsenal** | Tools you master daily | `DaVinci Resolve Studio, Premiere Pro, After Effects` |

---

## 21. THEME CUSTOMIZATION

Your portfolio includes multiple built-in presentation themes:

* **Cinematic Luxury (Default)**: Deep obsidian surfaces, subtle amber/gold accents, smooth glassmorphism cards.
* **Aurora Glow**: Fluid multi-colored gradient meshes that react to cursor movement and scroll position.
* **Retro VHS / 90s Broadcast**: Analog film grain, chromatic aberration, scanlines, REC indicator, and vintage timestamps.
* **Minimalist Monochrome**: Ultra-clean high-fashion editorial layout with high-contrast typography.

> 💡 **Non-Destructive Switching**: Switching themes changes only the visual presentation layer. Your projects, uploaded videos, and settings remain 100% safe.

---

## 22. RETRO THEME SETTINGS

For music video editors, skate videographers, and indie filmmakers, the **Retro Theme** adds tactile analog flavor:

* **Film Grain Intensity**: Adjust opacity of 35mm film grain overlay (0% to 50%).
* **Scanlines & CRT Emulation**: Subtle horizontal scanlines reminiscent of Sony PVM broadcast monitors.
* **REC Indicator & Live Timecode**: Authentic flashing red record dot and real-time running timecode in the header.
* **Analog Glitch / Chromatic Fringe**: Slight RGB color splitting on card hovers.

> 💡 **Best Practice**: Keep effect opacities subtle (10–25%) so they enhance your visual style without distracting from your client work.

---

## 23. AURORA THEME SETTINGS

The **Aurora Theme** generates ambient glowing color orbs behind your cards:
* **Colors**: Automatically derived from your primary and secondary brand colors.
* **Blur Radius**: Controls softness of the glow clouds (default `120px`).
* **Interactive Cursor Tracking**: Glow subtly shifts towards the user's cursor on desktop screens.

---

## 24. MOTION & ANIMATION SETTINGS

You can adjust the animation intensity across the entire site:
* **Full Motion**: Smooth entrance fades, floating element hover effects, and springy interactive cards.
* **Reduced Motion**: Instantly simplifies all animations into clean, static transitions for users who prefer minimal movement or have accessibility preferences enabled.

---

## 25. ADDING A PROJECT (STEP-BY-STEP)

```text
[SCREENSHOT: Admin > Projects Manager > Project Editor Form]
```

### Complete Project Fields Guide

```text
1. PROJECT TITLE      ──► e.g. "Nike – Faster Than Time"
2. CLIENT / AGENCY    ──► e.g. "Wieden+Kennedy / Nike"
3. YEAR               ──► e.g. "2026"
4. CATEGORY           ──► Commercial, Music Video, Documentary, Social Reel, VFX
5. ROLE               ──► Lead Editor, Colorist, Sound Designer, Motion Graphics
6. SERVICES DELIVERED ──► Offline Edit, 4K Color Grade, 5.1 Audio Mix
7. SOFTWARE USED      ──► DaVinci Resolve, Premiere Pro, After Effects
8. DESCRIPTION        ──► 2–4 sentences detailing narrative challenges & creative pacing
9. THUMBNAIL          ──► High-resolution 16:9 or 9:16 cover frame
10. VIDEO SOURCE      ──► YouTube, Vimeo, Direct MP4, or Google Drive URL
11. BEFORE/AFTER (OPT)──► RAW Log Still & Graded Hero Still for split-slider
12. STATUS            ──► Draft, Published, or Featured
```

---

## 26. PROJECT MULTI-DELIVERABLES

A single project can contain multiple media deliverables so clients can explore the complete campaign:
* **Director's Cut (Master 16:9)**: Full-length widescreen narrative.
* **Social Cutdowns (9:16 & 4:5)**: Fast-paced 15s and 30s vertical reels.
* **Behind-The-Scenes (BTS)**: Short reel or still gallery showing your timeline setup and editing workstation.
* **Before / After Color Grade**: Interactive split-screen comparison.

---

## 27. PROJECT STATUS TYPES

* **Published**: Live on your public portfolio, visible to all visitors.
* **Draft**: Saved in your admin panel for staging, invisible on the public site.
* **Featured**: Given prominent placement at the top of the Selected Work grid and highlighted in the Quick Showcase.
* **Archived**: Hidden from the public portfolio but preserved in your admin records for future reference.

---

## 28. SOCIAL MEDIA LINKS

Add your social media channels in the Admin Dashboard (**Brand Studio** > **Social Links**):

* Supported platforms: **Instagram, YouTube, Vimeo, TikTok, LinkedIn, X (Twitter), Behance, Dribbble, WhatsApp, and Custom URL**.
* **Automatic Visibility**: Only networks with a configured URL appear publicly. Empty fields are hidden automatically.
* **Reordering**: Drag and drop icons to arrange your social priority in the header and footer.

---

## 29. CONTACT FORM & BOOKING CONFIGURATION

The template includes an asynchronous, spam-protected client inquiry and booking form.

```text
[SCREENSHOT: Admin > Booking & Form Settings > Formspree Endpoint Setup]
```

### Connecting Your Email with Formspree (Free & Fast)
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Click **+ New Form**, give it a name (e.g. *Portfolio Inquiries*), and enter your email address.
3. Formspree will provide an Endpoint ID (e.g. `https://formspree.io/f/mqkznvab` or just `mqkznvab`).
4. In your portfolio Admin Dashboard, navigate to **Booking & Form Settings**.
5. Paste your Formspree ID into the **Formspree Endpoint** field.
6. Submit a test message on your live portfolio contact form.
7. Check your email inbox to confirm receipt of the inquiry!

> 🔒 **Security Best Practice**: The Formspree endpoint is designed to be public. Never paste secret API keys, private passwords, or database credentials into frontend form fields.

---

## 30. WHATSAPP DIRECT CHAT & BOOKING

You can enable an instant WhatsApp booking button for rapid client inquiries:
1. In the Admin Dashboard, enter your phone number in **International Format without spaces or symbols** (e.g. `+14155552671` for US or `+447911123456` for UK).
2. Configure a **Pre-filled Message** (e.g. *"Hi Elena, I saw your portfolio and would like to discuss a video editing project."*).
3. When visitors tap the WhatsApp button on mobile or desktop, WhatsApp opens immediately with your chat ready to send!

---

## 31. SEARCH ENGINE OPTIMIZATION (SEO)

Make sure directors, agency producers, and creative leads can find you on Google.

```text
[SCREENSHOT: Admin > Website Metadata & SEO Settings]
```

### Essential SEO Fields
* **Page Title**: Include your name, specialty, and primary market (e.g. *Elena Rostova | Commercial Video Editor & Colorist – London*).
* **Meta Description**: A compelling 150–160 character summary (e.g. *Portfolio of Elena Rostova, award-winning video editor and colorist specializing in commercial, fashion, and narrative films.*).
* **Keywords**: `video editor, colorist, daVinci resolve, commercial post-production, london video editor`.
* **Social Sharing Image (Open Graph)**: A clean 1200×630px banner showcasing your name, title, and strongest project still.

---

## 32. FAVICON SETUP

A favicon is the small icon displayed in browser tabs and bookmark bars.

* **Format**: `.png` or `.ico`.
* **Dimensions**: `32×32px` and `64×64px`.
* **Design**: Keep it extremely simple—a bold single letter monogram or high-contrast studio icon.

---

## 33. SOCIAL SHARING & OPEN GRAPH (OG)

When you share your website link on iMessage, Slack, LinkedIn, WhatsApp, or X, the platform fetches your Open Graph card.

```text
┌────────────────────────────────────────────────────────┐
│ [OG IMAGE: 1200 × 630 px Hero Still / Studio Banner]   │
├────────────────────────────────────────────────────────┤
│ Elena Rostova | Commercial Video Editor & Colorist     │
│ Crafting high-retention visual stories for brands.    │
│ www.rostovafilm.com                                    │
└────────────────────────────────────────────────────────┘
```

Update your Open Graph image in the Admin Dashboard (**Website Metadata** > **Social Share Image**).

---

## 34. WORDPRESS INTEGRATION & MIGRATION

This template provides multiple WordPress integration approaches:

```text
[SCREENSHOT: Admin > WordPress & Cloud Sync Hub]
```

### Supported WordPress Workflows
1. **Headless WordPress (REST API)**: If you already run a WordPress site, you can use WordPress as your backend database while using this template as the high-speed frontend. Enter your WordPress URL in Admin > **WordPress Sync** to pull posts and media dynamically.
2. **Static Export to WordPress Hosting**: Export your compiled portfolio files directly to your WordPress web server (`public_html/` root or subdirectory).
3. **Dedicated WordPress Theme Package**: See `WORDPRESS_GUIDE.md` for our companion standalone WordPress theme version.

---

## 35. MEDIA LIBRARY & ASSET MANAGEMENT

The built-in **Media Library** tab lets you organize, preview, and copy URLs for all images, stills, thumbnails, and PDF rate cards in one place.

* **Alt Text**: Always add descriptive alt text to images (e.g. *"DaVinci Resolve color grading split-screen for Nike Commercial"*).
* **Storage Optimization**: Delete obsolete test uploads to keep your site lightweight.

---

## 36. PLUGINS & EXTERNAL INTEGRATIONS

The template runs natively with zero required plugins. However, you can seamlessly connect:
* **Formspree**: For serverless contact form email routing (Recommended, Free).
* **Google Drive API**: For reading files from your Google Drive storage.
* **Google Analytics / Plausible**: For visitor traffic metrics.

---

## 37. WHERE CAN I HOST MY WEBSITE?

You can host this portfolio on any modern static hosting provider or traditional web server.

### Recommended Hosting Providers

| Host | Best For | Free Tier? | Difficulty |
| :--- | :--- | :--- | :--- |
| **Vercel** | Overall best performance, instant deployment | ✅ Yes (Generous) | 🟢 Very Easy |
| **Netlify** | Great all-rounder with easy drag-and-drop | ✅ Yes | 🟢 Very Easy |
| **Cloudflare Pages** | Fastest global CDN and unlimited bandwidth | ✅ Yes (Unlimited) | 🟢 Very Easy |
| **cPanel / Apache / Nginx** | Traditional web hosting (Bluehost, Hostinger, Siteground) | ❌ Paid host | 🟡 Intermediate |

---

## 38. DEPLOYING YOUR WEBSITE (STEP-BY-STEP)

```text
[SCREENSHOT: Deploying to Vercel with GitHub or ZIP Upload]
```

### Option A: One-Click Deploy via Vercel / Netlify (Recommended)
1. Push your template repository to your **GitHub** account.
2. Log into [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
3. Click **Add New Project** and select your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**. Your site will be live on a `*.vercel.app` URL in under 60 seconds!

### Option B: Build Static Files for Traditional Hosting
1. On your computer, open a terminal in the project directory.
2. Run the build command:
   ```bash
   npm run build
   ```
3. This creates a production-ready `dist/` folder containing your compiled HTML, CSS, and JavaScript.
4. Upload the contents of the `dist/` folder to your server's `public_html/` directory via FTP (FileZilla) or cPanel File Manager.

---

## 39. CONNECTING YOUR CUSTOM DOMAIN

To replace the temporary hosting URL with your own domain (e.g. `www.yourname.com`):

```text
1. PURCHASE DOMAIN (Namecheap, GoDaddy, Google Domains / Squarespace)
        ↓
2. OPEN HOSTING SETTINGS (Vercel / Netlify > Domains)
        ↓
3. ADD YOUR DOMAIN NAME (e.g. yourname.com and www.yourname.com)
        ↓
4. UPDATE DNS RECORDS AT YOUR REGISTRAR (Add A record and CNAME record)
        ↓
5. WAIT FOR DNS PROPAGATION (Usually 5–30 minutes)
        ↓
6. AUTOMATIC SSL CERTIFICATE ISSUED (Green padlock HTTPS active!)
```

### Typical DNS Configuration Records

| Type | Name / Host | Target / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or root) | `76.76.21.21` (Example for Vercel) | Routes root domain to host |
| **CNAME** | `www` | `cname.vercel-dns.com` | Routes www subdomain |

---

## 40. DOMAIN & DNS TROUBLESHOOTING

### Common Issues & Quick Fixes

#### 1. "Website works on Vercel URL, but custom domain shows an error"
* **Cause**: DNS records have not propagated yet, or there is a typo in the IP address.
* **Fix**: Check your domain on [whatsmydns.net](https://www.whatsmydns.net). DNS updates can take up to 24 hours (though usually 15 minutes).

#### 2. "HTTPS / SSL Certificate is Not Active"
* **Cause**: Hosting provider is still verifying domain ownership.
* **Fix**: Ensure both `@` and `www` records point to the exact hosting target.

#### 3. "Website shows old version after publishing changes"
* **Cause**: Your browser cached the previous version.
* **Fix**: Perform a hard refresh (`Ctrl + Shift + R` on Windows or `Cmd + Shift + R` on Mac).

---

## 41. ENVIRONMENT VARIABLES EXPLAINED

Environment variables are configuration settings kept outside your visible code.

### Public Variables vs. Private Secrets

```text
┌────────────────────────────────────────────────────────┐
│ PUBLIC (Safe in browser code)                          │
│ VITE_PUBLIC_SITE_URL=https://www.yourname.com         │
│ VITE_FORMSPREE_ID=mqkznvab                             │
├────────────────────────────────────────────────────────┤
│ PRIVATE (Server-side secrets - NEVER put in browser)  │
│ (AI Assist is built-in — no AI API key required)       │
│ STRIPE_SECRET_KEY=sk_live_...                          │
└────────────────────────────────────────────────────────┘
```

> 🔒 **Security Notice**: Never put private API secret keys in files that are bundled to the client. Keep them in your server-side environment settings.

---

## 42. SECURITY CHECKLIST

- [ ] **Change Admin Password**: Set a strong password for your admin dashboard.
- [ ] **Never Share API Keys**: Keep cloud API credentials confidential.
- [ ] **Keep Dependencies Updated**: Periodically run `npm audit` and update packages.
- [ ] **Verify Link Permissions**: Ensure Google Drive files are set to *Viewer* permissions, not *Editor*.
- [ ] **Backup Regularly**: Export your portfolio configuration JSON after major project updates.

---

## 43. BACKUP STRATEGY

To safeguard your portfolio against accidental data loss:
1. **Export Portfolio Backup**: In Admin Dashboard > **Settings / Export**, click **Export Full Portfolio JSON**. Save this file to your computer.
2. **Store Video Masters**: Keep original ProRes/H.264 video exports safely backed up on an external SSD or cloud storage (Dropbox/Google Drive).
3. **Version Control**: Keep a copy of your project source code on GitHub.

---

## 44. PERFORMANCE & SPEED OPTIMIZATION

Clients and agency producers will leave if your portfolio takes 10 seconds to load.

### How to Keep Your Site Lightning Fast:
* **Compress Thumbnails**: Convert large PNG cover images to modern `.webp` format under 300KB.
* **Use Video Hosting for Long-form**: Use YouTube or Vimeo for videos longer than 60 seconds.
* **Limit Hero Background Video Weight**: If using an autoplaying hero background video, compress it under `15 MB` with no audio track.
* **Enable Lazy Loading**: Thumbnails outside the initial viewport load only when the visitor scrolls down.

---

## 45. MOBILE LAUNCH CHECKLIST

Over 60% of creative directors and producers will view your portfolio on an iPhone or Android phone. Test these items on a physical mobile device:

- [ ] Sticky header hamburger menu opens and closes smoothly.
- [ ] Brand logo is crisp and properly sized on mobile screens.
- [ ] Showreel video plays smoothly with full-screen playback option.
- [ ] Vertical 9:16 reels fill mobile screens naturally without awkward cropping.
- [ ] Interactive Before/After color slider supports smooth finger drag touch events.
- [ ] Pricing package cards stack into an easy-to-read single column.
- [ ] WhatsApp button launches the WhatsApp mobile app directly.
- [ ] Contact form input fields do not trigger awkward iOS browser zoom bugs.

---

## 46. FINAL PRE-PUBLISH LAUNCH CHECKLIST

Complete this master checklist before sharing your link with clients:

- [ ] **Brand Identity**: Creator name, hero title, and bio are 100% accurate.
- [ ] **Logo & Favicon**: Custom logo and browser favicon are uploaded and sharp.
- [ ] **Color Palette**: Brand colors look great with high text contrast.
- [ ] **Showreel**: Master sizzle reel plays instantly on click.
- [ ] **Selected Projects**: All 4–12 projects have working video links, client names, and hero thumbnails.
- [ ] **Before/After Grading**: RAW and Graded comparison stills align properly.
- [ ] **Pricing & Services**: Rates, currencies, and turnaround guarantees are up to date.
- [ ] **Contact Form**: Formspree email destination tested and confirmed receiving inquiries.
- [ ] **Social Media**: All configured social links direct to your authentic accounts.
- [ ] **SEO Metadata**: Page title, description, and Open Graph share image are configured.
- [ ] **Custom Domain**: `www.yourname.com` is connected with active SSL (HTTPS).

---

## 47. COMMON MISTAKES & TROUBLESHOOTING

| Problem | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Video doesn't play on click** | URL format invalid or privacy restricted | Ensure Vimeo/YouTube link is public/unlisted. For Drive, ensure link sharing is "Anyone with link". |
| **Logo looks blurry on Retina screens** | Low-resolution raster PNG used | Replace with a vector `.svg` or high-resolution `@2x` PNG. |
| **Contact form submissions not arriving** | Formspree ID missing or not verified | Verify your Formspree email address in your Formspree dashboard. |
| **Before/After slider shows blank image** | Broken image URL or missing file path | Re-upload both the RAW Log and Graded stills in the Project editor. |
| **Mobile menu button doesn't respond** | JavaScript blocker or stale cache | Perform a hard refresh and test in private browsing window. |
| **Custom domain shows 404 error** | DNS records not fully propagated | Wait 15–30 minutes and verify A/CNAME records at your registrar. |
| **Colors didn't update after editing** | Unsaved changes in Brand Studio | Click **Save Brand Preset** and refresh the public page. |
| **Project appears in Admin but not on public site** | Status is set to "Draft" | Edit project and toggle status from **Draft** to **Published**. |

---

## 48. FREQUENTLY ASKED QUESTIONS (FAQ)

#### Q: Can I change the website colors to match my logo?
**A:** Yes! Go to Admin Dashboard > **Brand Studio** > **Colors**. You can customize primary, secondary, accent, and background colors with a live preview.

#### Q: Do I have to pay for video hosting?
**A:** No. You can embed videos for free from YouTube, Vimeo, or your Google Drive account.

#### Q: Will changing the theme delete my projects?
**A:** No. The content database is completely decoupled from visual themes. Switching between Cinematic, Aurora, and Retro themes preserves all projects, videos, and settings.

#### Q: Can I showcase vertical 9:16 TikTok and Reel videos?
**A:** Yes! The project gallery natively supports vertical 9:16, square 1:1, portrait 4:5, and widescreen 16:9 videos.

#### Q: Can I use this portfolio for a creative studio with multiple editors?
**A:** Yes. In the project details, you can specify individual editors, colorists, sound designers, and directors for each project.

#### Q: How do I back up my portfolio?
**A:** In the Admin Dashboard, click **Settings / Export** and choose **Export Full Portfolio JSON**. This saves your entire setup in a portable backup file.

---

## 49. BEGINNER'S GLOSSARY

* **Aspect Ratio**: The proportional relationship between video width and height (e.g. `16:9` widescreen or `9:16` vertical).
* **Before/After Slider**: An interactive visual comparison tool allowing clients to drag a split line between ungraded RAW footage and the final color graded frame.
* **CDN (Content Delivery Network)**: A global network of servers that delivers your images and site files from the location closest to your visitor.
* **CNAME Record**: A DNS record that points a subdomain (like `www.yourname.com`) to your website host.
* **Design Token**: A centralized variable (e.g. `var(--brand-primary)`) that controls a visual property across the entire website.
* **DNS (Domain Name System)**: The Internet phonebook that connects your human-readable domain (`yourname.com`) to computer server IP addresses.
* **Favicon**: The small icon shown in browser tabs next to your website title.
* **Formspree**: A serverless email service that securely routes contact form submissions to your inbox without requiring a backend server.
* **Open Graph (OG)**: Metadata tags that determine the title, description, and banner preview image shown when your site is shared on social media.
* **Responsive Design**: A website architecture that automatically adapts its layout, fonts, and controls to fit phones, tablets, and desktop monitors perfectly.
* **SSL / HTTPS**: Security encryption (indicated by the padlock in the browser address bar) ensuring safe data transfer.
* **WebP**: A modern high-performance image format developed by Google that delivers smaller file sizes than JPG with superior quality.

---

## 50. TECHNICAL USER & DEVELOPER SECTION

> 💻 **Note**: This section is optional for advanced users and developers looking to extend the source code.

```text
===================================================================================
                       PROJECT DIRECTORY STRUCTURE
===================================================================================
├── /public/                     <-- Static assets & root favicon
├── /src/
│   ├── /components/
│   │   ├── /admin/              <-- Admin Dashboard, Brand Studio, Project CMS
│   │   ├── /common/             <-- GlassCard, GlassButton, Skeletons
│   │   ├── /proofing/           <-- Frame-accurate client review & notes portal
│   │   ├── /public/             <-- Hero, Portfolio, Pricing, Before/After, Showcase
│   │   └── /video/              <-- Custom video player & before/after slider
│   ├── /context/                <-- PortfolioContext (State), ThemeContext (Tokens)
│   ├── /data/                   <-- Initial seed data & mock structures
│   ├── /services/               <-- DataAdapter, ExportService, Cloud Sync
│   ├── /theme/                  <-- Theme presets (Cinematic, Aurora, Retro, Minimal)
│   ├── App.tsx                  <-- Main application layout & route controller
│   ├── index.css                <-- Global Tailwind CSS & design token root
│   ├── main.tsx                 <-- React DOM root mounting point
│   └── types.ts                 <-- TypeScript interfaces & data contracts
├── package.json                 <-- Project dependencies & build scripts
├── tsconfig.json                <-- TypeScript compiler configuration
└── vite.config.ts               <-- Vite build engine configuration
===================================================================================
```

### Extending Design Tokens in TypeScript
Theme definitions are located in `/src/theme/presets.ts`. All tokens map directly to CSS custom variables in `:root`:

```typescript
export interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    glassSurface: string;
    glassBorder: string;
  };
  typography: {
    fontDisplay: string;
    fontHeading: string;
    fontBody: string;
    fontMono: string;
  };
  layout: {
    cardRadius: string;
    cardBlur: string;
    cardBorderWidth: string;
  };
}
```

### Production Build & Static Compilation
To produce an optimized production bundle:
```bash
npm run build
```
This generates tree-shaken static assets inside `/dist` ready for Cloudflare Pages, Vercel, Netlify, or any standard HTTP web server.

---

## 51. COMPLETE 20-STEP CREATOR LAUNCH JOURNEY

```text
 1. PREPARE CONTENT      ──► Gather showreel, project links, bio, and logo.
 2. INSTALL TEMPLATE     ──► Open local development or cloud preview.
 3. OPEN ADMIN PANEL     ──► Navigate to /admin and log into your dashboard.
 4. ADD BRAND LOGO       ──► Upload high-res SVG/PNG in Brand Studio.
 5. CHOOSE BRAND COLORS  ──► Set primary, secondary, and background HEX values.
 6. CHOOSE TYPOGRAPHY    ──► Select your display, heading, and body font pairing.
 7. CHOOSE THEME PRESET  ──► Pick Cinematic Luxury, Aurora, Retro, or Minimal.
 8. CONFIGURE SHOWREEL   ──► Link your 60–90s master sizzle reel.
 9. ADD YOUR PROJECTS    ──► Add 4–12 client commercials, films, or reels.
10. ADD BEFORE/AFTER     ──► Add RAW Log vs Graded stills to highlight color skills.
11. ADD PRICING PACKAGES ──► Set deliverables, turnarounds, and rates.
12. ADD SOCIAL LINKS     ──► Connect Instagram, Vimeo, YouTube, and LinkedIn.
13. CONFIGURE CONTACT    ──► Set your Formspree endpoint & WhatsApp booking.
14. SET SEO METADATA     ──► Add page title, meta description, and share banner.
15. TEST ON MOBILE       ──► Test on your phone to verify touch controls.
16. TEST ON DESKTOP      ──► Test video playback and modals on desktop.
17. DEPLOY TO HOST       ──► Connect to Vercel, Netlify, or your web host.
18. CONNECT DOMAIN       ──► Point your custom domain via DNS records.
19. EXPORT DATA BACKUP   ──► Download your portfolio JSON backup file.
20. SHARE WITH CLIENTS   ──► Start pitching directors, agencies, and brands!
```

---

## 52. FINAL MESSAGE TO THE CREATOR

> **Your work deserves a stage that matches its craftsmanship.**
>
> A great portfolio website is not just a digital resume—it is an immersive visual experience that positions you as a high-value creative partner. Use this guide to make this template unmistakably yours. Inject your aesthetic, showcase your strongest cuts, tell the story behind your edits, and build a career you are proud of.
>
> Keep this document saved for future updates as your creative catalog continues to grow. Now go create something unforgettable!

---
*Video Editor Portfolio Website Template — User Setup & Customization Guide*
