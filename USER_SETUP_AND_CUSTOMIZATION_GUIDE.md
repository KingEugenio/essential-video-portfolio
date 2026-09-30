# USER SETUP & CUSTOMIZATION GUIDE
### The Official Onboarding & Master Customization Manual for Visual Creators
*For Video Editors, Filmmakers, Colorists, Motion Designers, VFX Artists & Creative Studios*

---

> ### ⚠️ MANDATORY ONBOARDING DOCUMENT
> **Please read this guide before editing any files, configuring databases, or deploying your website.**
> This guide is designed for **both complete beginners and experienced creators**. You do not need any prior coding, web design, or command-line experience to launch and personalize your portfolio.

---

# 1. START HERE

## READ THIS BEFORE YOU START

Welcome to your new **Video Editor Portfolio Website**. This template was custom-engineered specifically for visual storytellers. Unlike generic website builders that crush high-bitrate video, force portrait clips into tiny boxes, or strip out cinematic color depth, this platform is optimized for broadcast-grade showreels, multi-format social cuts (16:9, 9:16, 1:1), interactive RAW-vs-Graded color sliders, and direct streaming from Google Drive, Vimeo, and YouTube.

### What You Receive
1. **The Public Portfolio Website**: A lightning-fast, responsive web application featuring custom cinematic themes, an interactive video player with custom aspect ratios, a showreel hero, case-study modals, and a client booking transmit engine.
2. **The Built-In Visual Admin CMS**: A private, password-protected visual dashboard (`/?admin=true`) where you can customize your brand, colors, typography, projects, packages, testimonials, and media without touching code.
3. **Multi-Provider Media Architecture**: Native support for direct video streaming, Google Drive video libraries, YouTube, Vimeo, and Cloudinary.
4. **Interactive Creative Tools**: Before/After color grading sliders, production package pricing tables, and multi-format aspect ratio filter bars.
5. **Headless WordPress & REST Integration Ready**: Connect to your existing WordPress backend or run completely standalone with zero ongoing database costs.

---

### Setup Roadmap

Follow this simple 14-step roadmap from unboxing to launch:

```text
1. DOWNLOAD TEMPLATE & UNZIP
             ↓
2. PREPARE YOUR ASSETS & CONTENT
             ↓
3. OPEN ADMIN DASHBOARD (/?admin=true)
             ↓
4. UPLOAD LOGO & PROFILE PHOTO
             ↓
5. SELECT BRAND COLORS & THEME
             ↓
6. SELECT TYPOGRAPHY PAIRINGS
             ↓
7. ADD SHOWREEL & HERO VIDEO
             ↓
8. ADD PROJECTS & CASE STUDIES
             ↓
9. UPLOAD RAW vs GRADED FRAMES
             ↓
10. CONFIGURE SERVICES & PRICING
             ↓
11. SET UP CONTACT FORM & WHATSAPP
             ↓
12. RUN PRE-PUBLISH TEST ON MOBILE & DESKTOP
             ↓
13. CHOOSE HOSTING (Vercel / Netlify / Node)
             ↓
14. CONNECT YOUR CUSTOM DOMAIN & LAUNCH!
```

---

### What Can Be Customized Through the Admin UI (Zero Coding)
- **Brand Identity**: Creator Name, Professional Title, Bio Manifesto, Logo, Favicon, Profile Avatar.
- **Colors & Tokens**: Primary Accent, Secondary Accent, Background Canvas, Surface Panels, Text Colors, Button Colors, CRT/VHS Tint Effects, and Aurora Glows.
- **Themes & Aesthetics**: Minimal Cinema Luxury, Dark Aurora Kinetic, Retro Digital Surrealism, and Neo-Brutalism + Glass.
- **Projects & Case Studies**: Titles, Clients, Years, Software Tags, Creative Briefs, Editorial Workflows, DaVinci Resolve Color Notes, Sound Mix Stems, Multi-Ratio Clips (16:9, 9:16, 1:1), and Crew Credits.
- **Pricing & Packages**: Standardized production tiers, custom quote triggers, and multi-currency viewing (USD, EUR, GBP, GHS, NGN, CAD, AUD).
- **Social Media & Booking**: Direct links, WhatsApp Instant Booking button, and Formspree/Email inquiry transmission.

### What Should NOT Be Modified (Unless You Are a Developer)
- Files inside the `/src/services/dataAdapter/` internal engine.
- Webpack/Vite bundle configurations (`vite.config.ts`, `tsconfig.json`) unless modifying build targets.
- Core React hooks and player state listeners.

---

# 2. WHAT YOU SHOULD PREPARE BEFORE CUSTOMIZATION

To set up your website in under 30 minutes, gather these assets into a single folder on your computer before starting:

### Pre-Customization Checklist

- [ ] **Creator / Studio Name**: Your professional name or studio alias (e.g., *Eko Pixels*, *Alex Rivera Cine*).
- [ ] **Professional Title**: A 3 to 6-word descriptor (e.g., *Lead Commercial Video Editor & DaVinci Colorist*).
- [ ] **Vector Logo / Wordmark**: Transparent SVG or high-resolution PNG (both light and dark versions if available).
- [ ] **Favicon**: A clean 512×512 square PNG icon or SVG for browser tabs.
- [ ] **Profile Photo**: A high-resolution portrait or behind-the-scenes shot (1:1 square ratio recommended).
- [ ] **Showreel Video**: Your 60–90 second master reel (hosted on Vimeo, YouTube, Google Drive, or MP4).
- [ ] **3 to 8 Featured Projects**: For each project, prepare:
  - Project Title, Client Name, and Release Year.
  - 16:9 Master Video URL or Direct MP4 link.
  - Optional 9:16 Vertical Cut (TikTok / Reels / Shorts).
  - High-impact 16:9 Thumbnail Image (1920×1080 JPEG/WebP).
  - A 2-sentence summary of your role and the creative brief.
  - List of software used (e.g., *Premiere Pro, DaVinci Resolve, After Effects*).
  - Optional: RAW Log frame + Final Graded frame for the interactive grading comparison slider.
- [ ] **Services & Capabilities**: List of your key offerings (e.g., *Commercial Offline Edit, ACES Color Grading, 9:16 Social Cutdowns, Sound Design*).
- [ ] **Production Pricing / Packages**: Your baseline packages or starting rates.
- [ ] **Client Testimonials**: 2 to 4 quotes with client name, role, and company.
- [ ] **Contact Information**: Your business email and international WhatsApp phone number.
- [ ] **Social Media URLs**: Links to Instagram, Vimeo, YouTube, TikTok, Behance, LinkedIn, X, etc.
- [ ] **Custom Domain Name**: Your registered domain (e.g., `yournamefilms.com`).

---

# 3. RECOMMENDED FILE ORGANIZATION

Before uploading assets to your website or cloud media library, organize your local folder structure like this:

```text
MY-PORTFOLIO-ASSETS/
│
├── 01_BRAND/
│   ├── logo-light.svg            # Primary vector logo for dark backgrounds
│   ├── logo-dark.svg             # Dark logo for light accents
│   ├── favicon-512.png           # 512x512 browser icon
│   ├── profile-portrait.jpg      # Creator avatar (1:1 square)
│   └── social-share-og.jpg       # 1200x630 Open Graph preview card
│
├── 02_SHOWREEL/
│   ├── master-showreel-4k.mp4    # Master reel file
│   └── showreel-poster.jpg       # Showreel cover frame
│
├── 03_PROJECTS/
│   ├── PROJECT-01_NIKE-AIR/
│   │   ├── master-16x9.mp4       # Main landscape video
│   │   ├── vertical-9x16.mp4     # Social cut
│   │   ├── thumbnail.jpg         # 1920x1080 cover image
│   │   ├── raw-log-frame.jpg     # RAW ungraded still
│   │   ├── graded-frame.jpg      # Final color grade still
│   │   └── stills/               # Extra production stills
│   │
│   └── PROJECT-02_MUSIC-VIDEO/
│       ├── master-16x9.mp4
│       ├── thumbnail.jpg
│       └── bts-photos/
│
├── 04_DOCUMENTS/
│   ├── rate-card-2026.pdf        # Optional downloadable rate card
│   └── creator-cv.pdf            # PDF Resume
│
└── 05_FONTS/                     # Any custom web font files (.woff2)
```

---

# 4. FILE NAMING RULES

Web browsers and cloud servers can fail or experience caching errors when filenames contain spaces, special symbols, or non-standard characters. 

### ✅ Recommended Filename Examples:
```text
eko-pixels-logo-white.svg
showreel-2026-master.mp4
nike-air-max-thumbnail.jpg
lumix-gh6-raw-log-frame.jpg
davinci-aces-graded-frame.jpg
sound-design-commercial-reel.mp4
```

### ❌ Bad Filename Examples to Avoid:
```text
finalfinal2(1).mp4               (Unclear, bad for SEO)
IMG_938472 4k!!@#.mp4             (Contains special characters)
Untitled Project 7 FINAL FINAL.mov (Spaces cause broken web links)
logo new new (copy).png          (Parentheses and spaces break CDN paths)
```

> **Pro Tip**: Use only **lowercase letters**, **numbers**, and **hyphens (`-`)**. Never use spaces or uppercase letters in media filenames.

---

# 5. LOGO SETUP

Your logo appears in the sticky navigation header, mobile menu, and footer.

```text
[SCREENSHOT: Brand Studio > Brand Identity & Logos]
```

### Supported Formats & Recommendations:
- **Best Format**: `.SVG` (Scalable Vector Graphics). SVGs scale crisply to any screen resolution, never blur on Retina displays, and have tiny file sizes (under 20 KB).
- **Secondary Format**: Transparent `.PNG` (at least 500px wide, 72 or 144 DPI, transparent background).
- **Maximum Recommended File Size**: Under 200 KB.

### Handling Different Logo Colors:
1. **White / Light Logo on Dark Theme**: Standard setting. The website background is dark (#08080A to #121214), so a white or bright logo provides optimal contrast.
2. **Colored or Multi-tone Logo**: Ensure your SVG has transparent negative space so background gradients show through cleanly.
3. **Very Wide Wordmarks**: Recommended height is **32px to 44px**. The template's navigation bar automatically preserves your logo's natural aspect ratio.
4. **Square / Icon Logos**: Recommended dimension is **40px × 40px**.

### How to Update Your Logo via Admin:
1. Open the Admin Dashboard by appending `/?admin=true` to your URL.
2. Click the **Brand Studio** tab.
3. In the **Logo URL** field, paste the link to your uploaded SVG/PNG logo, or choose **Upload to Local Media**.
4. Click **Save Settings**. The logo will update immediately across the entire site.

---

# 6. PROFILE PHOTO

Your profile photo represents you in the **Operator Bio Manifesto** section.

```text
[SCREENSHOT: Public Homepage > Operator Bio Section]
```

### Profile Photo Specifications:
- **Aspect Ratio**: 1:1 (Square) or 4:5 (Vertical Portrait).
- **Recommended Resolution**: 800×800 pixels (or 1000×1000 pixels).
- **Format**: `.WebP` or `.JPG`.
- **Target File Size**: Under 250 KB (compress with TinyPNG or Squoosh).

### Profile Photo vs. Project Thumbnail:
- **Profile Photo**: Focuses on you—in your editing suite, on-set with a camera rig, or a professional editorial portrait.
- **Project Thumbnail**: A 16:9 cinematic screenshot representing a specific film, commercial, or music video.

---

# 7. ADDING VIDEOS

The template supports **four video streaming methods**. You can mix and match different methods across different projects.

### Video Methods Comparison Table

| Method | Best Used For | Key Advantages | Limitations / Considerations |
| :--- | :--- | :--- | :--- |
| **Direct Upload / MP4 Link** | High-priority hero reels, looping background clips, pristine quality | Zero platform ads, ultra-fast custom controls, seamless looping | Uses host bandwidth; keep files compressed under 50 MB |
| **Google Drive** | Existing production archives, multi-TB client cuts | No re-uploading needed; stream directly from your Google Drive folders | Requires files to be set to "Anyone with the link can view" |
| **Vimeo** | Premium commercial & narrative portfolios | Clean player, unlisted privacy, password protection, high-bitrate streaming | Advanced embedding requires Vimeo Plus/Pro |
| **YouTube** | Public music videos, client releases, maximum compatibility | Free unlimited 4K hosting, universal CDN caching | YouTube player watermark and recommended video overlays |

---

# 8. DIRECT VIDEO UPLOADS & MP4 HOSTING

If you host video files directly on your web server, AWS S3, Cloudflare R2, or a CDN, follow these encoding best practices:

### Step-by-Step Direct Video Setup:
1. Open the Admin Dashboard (`/?admin=true`).
2. Navigate to the **Projects & Reels** tab.
3. Click **Add New Project** (or click **Edit** on an existing project).
4. Under **Main Video**, set **Provider** to `Direct MP4 / CDN`.
5. Enter the direct video URL (e.g., `https://cdn.yourdomain.com/videos/nike-commercial.mp4`).
6. Set the video's native **Aspect Ratio** (16:9, 9:16, or 1:1).
7. Upload a 1920×1080 thumbnail image as the video cover poster.
8. Click **Save Project** and preview in the modal player.

### Video Encoding Guidelines for Web Performance:
- **Container Format**: `.mp4` (or `.webm`).
- **Video Codec**: H.264 (AVC) or H.265 (HEVC). H.264 provides 100% universal browser compatibility.
- **Audio Codec**: AAC-LC, Stereo, 48 kHz, 192–320 kbps.
- **Bitrate Target**:
  - 1080p (Full HD): 3,500 – 6,000 kbps (3.5 – 6 Mbps).
  - 4K (Ultra HD): 12,000 – 18,000 kbps (12 – 18 Mbps).
- **Fast Start (moov atom at front)**: Always enable "Web Optimized" / "Fast Start" in Adobe Media Encoder or DaVinci Resolve so videos begin playback instantly before downloading the entire file.

---

# 9. VIDEO ASPECT RATIOS

Unlike standard photography or generic blogs, modern video editing spans multiple display formats. This portfolio template provides native aspect-ratio rendering:

```text
┌──────────────────────────┐   ┌─────────┐   ┌───────┐
│                          │   │         │   │       │
│          16:9            │   │  9:16   │   │  1:1  │
│   Cinema / Commercial    │   │ TikTok  │   │ Feed  │
│                          │   │  Reels  │   │       │
└──────────────────────────┘   │ Shorts  │   └───────┘
                               └─────────┘
```

- **16:9 (Landscape / Widescreen)**: Broadcast TV commercials, music videos, narrative films, YouTube masters.
- **9:16 (Vertical / Fullscreen Mobile)**: TikTok campaigns, Instagram Reels, YouTube Shorts, 9:16 social cutdowns.
- **1:1 (Square)**: Instagram grid posts, LinkedIn feeds, corporate square teasers.
- **2.35:1 / 2.39:1 (Anamorphic Cinema Scope)**: Widescreen feature films and high-end cinematic trailers.

> **Responsive Guarantee**: The built-in player never forces a 9:16 vertical clip into a wide 16:9 container with ugly side letterboxing. It automatically scales the player window to match the exact ratio of the selected cut.

---

# 10. VIDEO THUMBNAILS

A captivating thumbnail is the single most important factor for getting visitors to click play.

### Thumbnail Specifications:
- **Resolution**: 1920×1080 (for 16:9), 1080×1920 (for 9:16), or 1080×1080 (for 1:1).
- **Format**: `.JPG` or `.WebP`.
- **Target Size**: 100 KB – 300 KB.

### Tips for High-Converting Video Thumbnails:
1. **Choose High-Contrast, Dynamic Frames**: Select a frame with strong color separation, clear facial expression, or compelling visual geometry.
2. **Avoid Plain Text in Images**: Let the portfolio's clean typography overlay display project titles; avoid baked-in graphics that become illegible on mobile.
3. **Capture from Graded Masters**: Always export stills from your final color-graded timeline in DaVinci Resolve or Premiere Pro, never from raw log rushes.

---

# 11. GOOGLE DRIVE DIRECT INTEGRATION

You can connect your Google Drive account to stream videos directly into your portfolio without re-uploading gigabytes of footage.

```text
[SCREENSHOT: Admin > Integrations & Providers > Google Drive Connect]
```

### Complete 10-Step Google Drive Walkthrough:

1. **Organize Your Drive**: In Google Drive, create a root folder named `Portfolio Videos`.
2. **Set Sharing Permissions**: Right-click the folder → **Share** → Change General Access to **"Anyone with the link can view"**.
3. **Open Portfolio Admin**: Go to `/?admin=true` → **Integrations & Providers**.
4. **Google Drive Integration**: Click **Connect Google Drive**.
5. **Authorize Access**: Sign in with your Google account and grant read-only view access.
6. **Browse Files**: Inside any project editor, click the **Browse Google Drive** button.
7. **Select Video File**: Click on any MP4/MOV file in your Drive tree.
8. **Instant Attachment**: The template automatically retrieves the streamable ID and attaches it to the project.
9. **Zero Server Load**: Videos stream directly from Google's high-speed global CDN servers.
10. **Disconnect Anytime**: To revoke access, click **Disconnect Drive** in the Integrations tab.

### Important Google Drive Rules:
- **Never delete or move the file out of your public folder in Drive**, or the link will break.
- **Do not set file permissions to "Restricted"**, or visitors will see an access request screen instead of the video.

---

# 12. YOUTUBE VIDEO SETUP

YouTube is ideal for public commercial work, client music videos, and public trailers.

### Step-by-Step YouTube Embedding:
1. Open the video on YouTube in your browser.
2. Copy the video link from the address bar (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`) or click **Share** → **Copy Link** (`https://youtu.be/dQw4w9WgXcQ`).
3. In your Portfolio Admin, navigate to **Projects** → **Edit Project**.
4. Under **Main Video**, set **Provider** to `YouTube`.
5. Paste the URL or the 11-character Video ID into the **Video URL / ID** field.
6. Save and preview.

### Privacy Settings for YouTube:
- **Public**: The video is discoverable on YouTube search and plays on your portfolio.
- **Unlisted**: The video is hidden from YouTube search but plays perfectly on your portfolio (recommended for unreleased client work).
- **Private**: ❌ **Do not use Private**. Private videos cannot be embedded on external websites.

---

# 13. VIMEO VIDEO SETUP

Vimeo is the industry standard for high-end cinematography, color grading showcases, and advertising reels.

### Step-by-Step Vimeo Setup:
1. Copy the Vimeo video URL (e.g., `https://vimeo.com/123456789`).
2. In your Portfolio Admin, go to **Projects** → **Edit Project**.
3. Under **Main Video**, select **Provider** → `Vimeo`.
4. Paste the link into the URL field.
5. Save the project.

### Vimeo Privacy & Domain Restrictions:
If you have a Vimeo Plus/Pro/Business account, you can set privacy to **"Hide from Vimeo"** and add your custom domain (e.g., `yourdomain.com`) to the **"Where can this be embedded?"** whitelist. This prevents unauthorized embedding on other sites while allowing your portfolio to stream it seamlessly.

---

# 14. ADDING IMAGES

Beyond video, visual storytelling relies on high-resolution production stills, behind-the-scenes (BTS) galleries, and client avatars.

### Supported Image Formats & Use Cases:

| Format | Best For | Advantages |
| :--- | :--- | :--- |
| **`.WebP`** | All web photos, stills, and thumbnails | 30% smaller than JPEG with identical visual quality |
| **`.JPG / .JPEG`** | Camera stills, portraits, photography | Universal support, high dynamic color depth |
| **`.PNG`** | Transparent graphics, UI elements, badges | Lossless transparency |
| **`.SVG`** | Logos, icons, vector shapes | Infinite scaling, zero pixelation, tiny file size |

### Image Compression Recommendation:
Before uploading any image, run it through **TinyPNG.com** or **Squoosh.app**. A 5 MB camera raw export should be compressed to approximately **150 KB – 300 KB** for instant mobile loading.

---

# 15. ADDING DOCUMENTS (RATE CARDS & MEDIA KITS)

You can link downloadable PDF documents directly from your navigation bar, footer, or contact section.

### Common Documents for Visual Creators:
- **Commercial Rate Card / Production Packages (PDF)**
- **Director / Editor Treatment Deck (PDF)**
- **Offline / Online Post-Production Workflow Guide (PDF)**
- **Creator CV / Resume (PDF)**
- **Standard Post-Production Terms & Conditions (PDF)**

> 🔒 **Security Notice**: Never upload confidential client NDAs, unreleased script treatments, or private invoices to public web folders. All files stored in `/public/` or linked on your website are accessible to anyone with the link.

---

# 16. BRAND COLORS & DESIGN TOKENS

You never need to edit dozens of CSS files or hunt through raw code to change your website's colors. The entire platform is powered by **Centralized Design Tokens**.

```text
[SCREENSHOT: Brand Studio > Live Color Tokens Studio]
```

### What is a Design Token?
A **Design Token** is a master color variable. When you change the **Primary Accent Color** in the Brand Studio, that single color automatically updates your navigation highlights, active buttons, player scrubber timelines, animated borders, and link hover states.

### Core Color Tokens Explained:

| Token Name | Default Value | Where It Appears |
| :--- | :--- | :--- |
| **Primary Accent** | `#FF3B00` (Electric Amber) | Main CTA buttons, active tabs, player timeline, highlight badges |
| **Secondary Accent** | `#00E5FF` (Cyber Cyan) | Category badges, verified ticks, technical metadata, glow accents |
| **Canvas Background** | `#08080A` (Deep Carbon) | The foundational dark background of your entire website |
| **Surface Panel** | `#121216` (Obsidian Gray) | Project cards, modal containers, dropdown menus, table rows |
| **Text Primary** | `#FFFFFF` (Pure White) | Main headings, project titles, primary reading copy |
| **Text Muted** | `rgba(255,255,255,0.6)` | Metadata labels, dates, client names, subtitles |
| **Border Subtle** | `rgba(255,255,255,0.12)` | Subtle card outlines, dividers, table borders |

---

# 17. COLOR CUSTOMIZATION WORKFLOW

```text
1. CHOOSE YOUR PALETTE (2 to 3 core colors)
                    ↓
2. OPEN BRAND STUDIO (/?admin=true > Brand Studio)
                    ↓
3. ENTER HEX COLOR CODES (e.g., #FF3B00, #00E5FF)
                    ↓
4. OBSERVE LIVE PREVIEW WINDOW
                    ↓
5. VERIFY READABILITY ON LIGHT & DARK ELEMENTS
                    ↓
6. CLICK "SAVE BRAND SETTINGS"
```

### Understanding Color Formats:
- **HEX (Hexadecimal)**: A 6-character code preceded by a hash symbol (e.g., `#FFFFFF` for white, `#000000` for black, `#FF3B00` for orange-red).
- **RGB / RGBA**: Red, Green, Blue values with an optional Alpha transparency channel (e.g., `rgba(255, 59, 0, 0.8)`).

### Where to Find Your Brand's HEX Codes:
- Open your logo in Adobe Illustrator or Photoshop and use the **Eyedropper Tool**.
- Use free online palette tools like **Coolors.co** or **Adobe Color**.

---

# 18. COLOR ACCESSIBILITY & CONTRAST

A sleek dark-mode portfolio must remain comfortable to read for creative directors and agency producers.

### The Golden Contrast Rules:
1. **Never Put Dark Gray Text on a Dark Background**: Keep all body copy at a minimum contrast ratio of **4.5:1** against the background canvas.
2. **Ensure Button Text Pops**: If your primary button is bright neon orange (`#FF3B00`) or cyan (`#00E5FF`), test whether black text or white text is more legible.
3. **Avoid Overly Saturated Backgrounds**: Keep your background canvas near neutral carbon (`#08080A` to `#101014`) so your video thumbnails and footage provide the primary splash of color.

---

# 19. TYPOGRAPHY & FONT PAIRINGS

Typography establishes the tone of your creative brand—from high-fashion luxury to underground cyberpunk.

```text
[SCREENSHOT: Brand Studio > Typography Studio]
```

### Font Categories Explained:
- **Display / Heading Font**: The expressive font used for your name, hero titles, and section headers (e.g., *Cinzel, Syne, Space Grotesk, Playfair Display*).
- **Body Font**: The clean, highly readable font used for case study descriptions, operator bios, and paragraphs (e.g., *Inter, Plus Jakarta Sans, DM Sans*).
- **Monospace / Metadata Font**: The technical, typewriter-style font used for timecodes, software tags, aspect ratios, and release years (e.g., *IBM Plex Mono, Space Mono*).

### Curated Editorial Font Pairings:

| Preset Style | Heading Font | Body Font | Best For |
| :--- | :--- | :--- | :--- |
| **Cinema Luxury** | *Cinzel / Playfair Display* | *Plus Jakarta Sans* | High-end fashion, wedding films, luxury brand commercials |
| **Neo-Kinetic** | *Syne / Space Grotesk* | *Inter* | Music videos, hype reels, extreme sports, modern commercials |
| **Cyber Technical** | *Space Mono / Orbitron* | *IBM Plex Mono* | VFX artists, 3D motion designers, game trailers, sci-fi |
| **Editorial Modern** | *Manrope / DM Sans* | *Inter* | Documentary filmmakers, corporate video agencies |

---

# 20. BRAND STUDIO WALKTHROUGH

The **Brand Studio** is your master control room. Here is what every setting controls:

```text
[SCREENSHOT: Full Brand Studio Tab View]
```

1. **Brand Name**: Your display name in the navigation bar and hero header.
2. **Professional Tagline**: Your role descriptor displayed in the hero ticker.
3. **Hero Headline**: The large display statement on your homepage (e.g., *"CRAFTING KINETIC NARRATIVES THROUGH PRECISION EDITING"*).
4. **Hero Subheadline**: A 2-sentence summary of your creative background and commercial clients.
5. **Showreel URL**: The master video link for the hero showreel button.
6. **Availability Status**: A live broadcast pill (e.g., `AVAILABLE FOR COMMISSIONS Q2/Q3` or `BOOKED UNTIL JUNE`).
7. **Primary / Secondary Colors**: Color pickers for site-wide design tokens.
8. **Font Selectors**: Dropdowns for Heading, Body, and Monospace typography.
9. **Retro Textures**: Checkboxes to toggle Film Grain, CRT Scanlines, VHS Glitch, and Timecode HUD overlays.

---

# 21. THEME CUSTOMIZATION

### The Difference Between Brand and Theme:
- **Your Brand** is your persistent identity: your logo, your colors, your fonts, and your projects.
- **Your Theme** is the atmospheric visual wrapper through which your portfolio is rendered.

> 💡 **Safety Guarantee**: Switching themes **never deletes or modifies your projects, videos, or contact settings**. You can change your theme in one click anytime.

### The 4 Master Theme Archetypes:

1. **Neo-Brutalism + Glass**: Ultra-high contrast, bold dark surfaces, crisp glassmorphic panels, and vibrant orange/cyan accents.
2. **Dark Aurora Kinetic**: Ethereal, organic ambient gradient glows that react smoothly to cursor movement and page scrolling.
3. **Retro Digital Surrealism**: 90s CRT monitor aesthetics, vintage Windows 95 / Y2K window chrome, 35mm grain, and green phosphor accents.
4. **Minimal Cinema Luxury**: Clean widescreen canvas, generous negative space, refined serif typography, and golden amber accents.

---

# 22. RETRO THEME SETTINGS

For music video editors and retro-futuristic motion designers, the template includes customizable vintage post-production overlays:

- **35mm Film Grain**: Adds an organic, cinematic analog texture overlay.
- **CRT Scanlines**: Simulates the authentic horizontal phosphor lines of a Sony PVM color grading monitor.
- **VHS Glitch / Tape Noise**: Subtle analog tracking artifacts on hover states.
- **REC Indicator & Timecode HUD**: An on-screen broadcast recording overlay displaying `[REC ● 00:24:18:12]`.

> **Best Practice**: Keep retro effect opacity between **15% and 35%** so your actual video work remains clear and undistorted.

---

# 23. AURORA THEME SETTINGS

The **Dark Aurora** theme creates ambient lighting effects behind your projects:

- **Aurora Glow Colors**: Automatically derived from your primary and secondary brand accents.
- **Interactive Cursor Glow**: A soft, blurred ambient light that tracks the visitor's cursor across the viewport.
- **Scroll Reactive Intensity**: The ambient background glow subtly pulses as the visitor scrolls past featured case studies.

---

# 24. MOTION & ACCESSIBILITY SETTINGS

- **Kinetic Page Transitions**: Smooth fade-in and slide-up animations powered by Framer Motion.
- **Reduced Motion Support**: The template automatically respects the visitor's operating system preference for `prefers-reduced-motion`. When enabled, heavy parallax and floating animations are disabled for a smooth, static reading experience.

---

# 25. ADDING A PROJECT (CASE STUDY)

Each project in your portfolio represents a complete, deep-dive case study.

```text
[SCREENSHOT: Admin > Projects & Reels > Add New Project Modal]
```

### Complete Project Fields Reference:

1. **Project Title**: The official name of the film, spot, or campaign (e.g., *Nike Air — London Calling*).
2. **Client / Label**: The brand or record label (e.g., *Nike / Wieden+Kennedy*).
3. **Release Year**: Year produced (e.g., *2026*).
4. **Category**: Filter tag (e.g., *Commercial, Music Video, Narrative Film, Documentaries, Social / Reels, Color Grading*).
5. **Your Role**: Specific creative contribution (e.g., *Lead Editor & Sound Designer*).
6. **Services Delivered**: Multi-select tags (e.g., *Offline Edit, Color Grade, Sound FX Mix, 9:16 Cutdowns*).
7. **Software & Pipeline**: Tool badges (e.g., *Premiere Pro, DaVinci Resolve Studio, After Effects*).
8. **Short Description**: A 1-sentence teaser displayed on the project card.
9. **The Creative Brief**: Detailed narrative explaining what the client needed.
10. **Production Challenge**: Specific hurdles overcome (e.g., *mixed frame rates, low light noise, tight 24-hour turnaround*).
11. **Editorial & Assembly Workflow**: Technical breakdown of your pacing, timeline organization, and cut choices.
12. **DaVinci Resolve Color Pipeline**: Color space transformation details (e.g., *ACEScct, Kodak 2383 film print emulation*).
13. **Sound Design & Mix Notes**: Foley layering, sub-bass riser hits, and LUFS mastering targets.
14. **Production Stills & Credits**: High-res screenshots and full crew list (Director, DP, Producer, Gaffer, etc.).
15. **Publish Status**: Set to `Published` (visible to public) or `Draft` (hidden).

---

# 26. PROJECT MEDIA & MULTI-RATIO VERSIONS

A single project entry can contain multiple deliverables:

- **Main Master Cut (16:9)**: The primary landscape commercial or music video.
- **Vertical Cut (9:16)**: The mobile-first Instagram Reel or TikTok edit.
- **Square Cut (1:1)**: The social feed version.
- **Before / After Color Grading Comparison**: RAW Log frame + Final Graded frame.
- **Behind The Scenes (BTS) Media**: On-set photos and timeline screenshot stills.

Visitors can seamlessly toggle between these deliverables inside the interactive case study modal!

---

# 27. PROJECT STATUS & VISIBILITY

- **Published**: The project is live and publicly viewable on your homepage.
- **Draft**: The project is saved in your admin dashboard but hidden from public visitors.
- **Archived**: Hidden from the main grid but preserved in your private database for future reference.

---

# 28. SOCIAL MEDIA LINKS

Add links to your creative channels in **Admin > Social Channels**.

```text
[SCREENSHOT: Admin > Social Channels Manager]
```

### Supported Platforms:
- **Instagram** (`https://instagram.com/yourusername`)
- **Vimeo** (`https://vimeo.com/yourusername`)
- **YouTube** (`https://youtube.com/@yourchannel`)
- **TikTok** (`https://tiktok.com/@yourusername`)
- **LinkedIn** (`https://linkedin.com/in/yourprofile`)
- **Behance** (`https://behance.net/yourprofile`)
- **X / Twitter** (`https://x.com/yourhandle`)
- **WhatsApp** (`https://wa.me/...`)
- **Custom Links**: Link to your IMDb page, Spotify playlist, or agency profile.

---

# 29. CONTACT FORM & INQUIRY TRANSMIT ENGINE

The public contact section allows prospective clients and producers to submit project briefs directly to your inbox.

```text
[SCREENSHOT: Public Homepage > Project Inquiry Transmit Form]
```

### Setting Up Free Formspree Email Delivery:
1. Visit **[Formspree.io](https://formspree.io)** and create a free account.
2. Click **+ New Form** and name it `Portfolio Inquiries`.
3. Copy your unique Formspree Endpoint URL (e.g., `https://formspree.io/f/xbjnvkzw`).
4. In your Portfolio Admin, open **Booking Form Settings**.
5. Paste the URL into the **Formspree Endpoint** field.
6. Click **Save Settings**.
7. Submit a test brief from your live website. You will receive an instant email notification!

> 🔒 **Security Best Practice**: Never paste secret SMTP passwords or private API tokens into public frontend files. The built-in proxy handles inquiry transmission safely.

---

# 30. WHATSAPP DIRECT BOOKING

Allow clients in fast-paced production markets to start an instant WhatsApp chat with you.

### How to Configure WhatsApp:
1. In **Admin > Brand Studio**, locate the **WhatsApp Number** field.
2. Enter your phone number in **International Format without plus signs, spaces, or hyphens**:
   - ✅ Correct: `14155552671` (US) or `447911123456` (UK)
   - ❌ Incorrect: `+1 (415) 555-2671`
3. Enter an optional **Pre-Filled Message** (e.g., *"Hi, I saw your portfolio and would like to discuss an upcoming video project."*).
4. When clicked, the website automatically launches WhatsApp with your chat pre-loaded!

---

# 31. SEARCH ENGINE OPTIMIZATION (SEO)

Make your portfolio rank on Google when producers search for video editors in your city or specialty.

### Key SEO Fields in Admin > Brand Studio:
- **Meta Title**: Appears in Google search results and browser tab (e.g., *Eko Pixels | Commercial Video Editor & Colorist*).
- **Meta Description**: A 150-character summary of your services (e.g., *Award-winning commercial video editor and DaVinci Resolve colorist specializing in automotive, fashion, and broadcast advertising.*).
- **Keywords**: Comma-separated search terms (e.g., *video editor, colorist, DaVinci Resolve, post production, commercial editor*).

---

# 32. FAVICON SETUP

A **Favicon** is the small icon displayed in the browser tab and bookmarks bar.

- **Recommended Format**: 512×512 square `.PNG` or `.SVG`.
- **Where to Place It**: Replace `/public/favicon.ico` or `/public/favicon.png` with your branded icon.

---

# 33. SOCIAL SHARING & OPEN GRAPH (OG) IMAGES

When you share your website link on **iMessage, WhatsApp, Slack, LinkedIn, or Twitter**, platforms display a rich visual card.

- **OG Image Dimensions**: **1200 × 630 pixels**.
- **Format**: `.JPG` or `.PNG` (under 500 KB).
- **What to Put on It**: A high-impact visual combining your logo, your best cinematic still, and your title (*"Commercial Video Editor Portfolio"*).
- **File Location**: Save as `/public/og-image.jpg`.

---

# 34. USING THE TEMPLATE WITH WORDPRESS

This template is architected as a **modern Headless web application** that can seamlessly sync with WordPress.

```text
[SCREENSHOT: Admin > WordPress Live Sync Tab]
```

### How the WordPress Integration Works:
1. **You keep your existing WordPress installation** (on Bluehost, SiteGround, WP Engine, or custom VPS).
2. **Your WordPress site acts as the CMS (Content Management System)** where you or your team write posts and upload media.
3. **This portfolio template connects to the WordPress REST API** to automatically pull your posts, projects, and featured media into this high-performance cinematic frontend.

### Connecting to WordPress:
1. Open the Portfolio Admin (`/?admin=true`) → **WordPress Sync** tab.
2. Enter your **WordPress REST API URL** (e.g., `https://cms.yourdomain.com/wp-json/wp/v2`).
3. Click **Test API Connection**.
4. Once verified, your portfolio will fetch and render projects directly from your WordPress database!

---

# 35. WORDPRESS MEDIA MANAGEMENT

When using WordPress as your media library:
- Upload your project stills and video posters via the standard WordPress **Media > Add New** menu.
- Copy the media attachment URL and paste it into the Portfolio project editor.
- Check your hosting provider's upload size limits in `php.ini` (`upload_max_filesize = 128M`).

---

# 36. RECOMMENDED WORDPRESS PLUGINS (OPTIONAL)

If you connect to WordPress, these optional free plugins improve performance:
- **WP REST Cache**: Caches API responses for sub-50ms query speeds.
- **Application Passwords**: Built into WordPress core for secure API authentication.
- **Better REST API Featured Images**: Includes full image dimensions in standard REST output.

---

# 37. WHERE CAN I HOST MY WEBSITE?

You have multiple high-performance, low-cost hosting options:

### 1. Static Web Hosting (Recommended for 95% of Users)
- **Platforms**: **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**.
- **Cost**: **100% Free** for personal portfolios.
- **Advantages**: Global CDN edge caching, automatic SSL certificates, instant deployment on git push, zero server maintenance.

### 2. Node.js Container Hosting (Full-Stack Mode)
- **Platforms**: **Google Cloud Run**, **Railway**, **Render**, **DigitalOcean App Platform**.
- **Cost**: $0 to $5 / month.
- **Advantages**: Runs the custom Express backend server for server-side API routing and dynamic persistence.

---

# 38. DEPLOYING THE TEMPLATE STEP-BY-STEP

### Option A: 1-Click Deploy via Vercel (Easiest)
1. Push your template folder to a private or public repository on **GitHub**.
2. Go to **[Vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **Add New Project** and select your portfolio repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. In under 60 seconds, your portfolio is live on a global `.vercel.app` URL!

### Option B: Deploying via Netlify
1. Go to **[Netlify.com](https://netlify.com)** and sign in.
2. Drag and drop your compiled `/dist` folder into the Netlify dashboard, or connect your GitHub repository.
3. Build Command: `npm run build`.
4. Publish Directory: `dist`.
5. Click **Deploy Site**.

---

# 39. CONNECTING YOUR CUSTOM DOMAIN

Once deployed, connect your personal domain (e.g., `www.yournamefilms.com`):

```text
[SCREENSHOT: DNS Management Records Table]
```

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains/Squarespace, Cloudflare).
2. Open the **DNS Management** or **DNS Zone Editor** settings.
3. Add the following standard DNS records (replace with values provided by your hosting dashboard):

| Record Type | Host / Name | Value / Destination | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (or root) | `76.76.21.21` (e.g., Vercel IP) | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

4. Save the records.
5. Wait 10 to 30 minutes for global DNS propagation.
6. Your hosting provider will automatically issue a free **Let's Encrypt SSL (HTTPS) certificate**.

---

# 40. DOMAIN & DNS TROUBLESHOOTING

### Common Issues & Quick Fixes:

- **"Website works on staging URL but not on custom domain"**:
  - *Cause*: DNS records have not finished propagating across global internet routers.
  - *Fix*: Wait 1 to 4 hours. Clear your browser cache or check on your mobile phone via cellular data.
- **"HTTPS / SSL Not Secure Warning"**:
  - *Cause*: SSL certificate is still generating.
  - *Fix*: Most hosts generate the certificate within 15 minutes of DNS verification. Do not click cancel.
- **"`www` works, but without `www` it fails"**:
  - *Cause*: Missing apex `@` A Record in your registrar's DNS table. Ensure both the `@` A-Record and `www` CNAME are present.

---

# 41. ENVIRONMENT VARIABLES EXPLAINED

An **Environment Variable** is a private configuration setting stored safely on your server rather than hardcoded in public files.

### The Template's `.env.example` File:
```env
# Server Port (Default: 3000)
PORT=3000

# Environment Mode
NODE_ENV=production

# Private Master Admin Password
ADMIN_PASSWORD=your_secure_password_here

# Formspree Endpoint for Contact Submissions
FORMSPREE_ENDPOINT=https://formspree.io/f/your_id_here

# Optional WordPress REST API Endpoint
WORDPRESS_REST_URL=https://cms.yourdomain.com/wp-json/wp/v2
```

> ⚠️ **Critical Rule**: Variables prefixed with `VITE_` are bundled into frontend code and visible to visitors in browser developer tools. Never prefix private database credentials or master passwords with `VITE_`.

---

# 42. SECURITY CHECKLIST

- [ ] Change the default admin password from `admin123` to a unique 16-character passphrase.
- [ ] Never share your `.env` file or commit it to a public GitHub repository.
- [ ] Ensure all Google Drive shared folders only grant **"Viewer"** permissions, never "Editor".
- [ ] Keep your domain registrar account protected with **Two-Factor Authentication (2FA)**.
- [ ] Download a local JSON backup of your portfolio data from the Admin dashboard once per month.

---

# 43. BACKUPS & DATA PERSISTENCE

Your portfolio data is completely portable.

### How to Back Up Your Website:
1. Open the Admin Dashboard (`/?admin=true`).
2. Go to **Overview** or **Integrations**.
3. Click **Export Portfolio JSON**.
4. This downloads a complete `portfolio-backup-[date].json` file containing all your project descriptions, theme colors, testimonial quotes, and configuration settings.
5. To restore on a new computer or server, click **Import Backup JSON**.

---

# 44. PERFORMANCE OPTIMIZATION TIPS

1. **Keep Page Load Under 2 Seconds**: Compress all thumbnails to WebP format under 300 KB.
2. **Never Autoplay Uncompressed 4K Video with Sound**: Use lightweight 1080p looping hero background clips (under 15 MB) with muted sound.
3. **Use External Streaming for Full Films**: Stream multi-gigabyte project deliverables through Vimeo, YouTube, or Google Drive rather than loading raw 10 GB ProRes files into web storage.

---

# 45. MOBILE RESPONSIVENESS CHECKLIST

Before sending your portfolio link to a creative director, test these items on your smartphone:

- [ ] Sticky navigation bar collapses cleanly into the mobile drawer.
- [ ] Logo is crisp and does not overlap the navigation toggle.
- [ ] Hero showreel plays smoothly on mobile cellular data.
- [ ] 9:16 vertical videos expand to fill mobile screens properly.
- [ ] Before/After color grading slider responds smoothly to touch dragging.
- [ ] All buttons and links have large, easy-to-tap touch targets (minimum 44×44 pixels).
- [ ] WhatsApp button launches the WhatsApp mobile app directly.
- [ ] Contact form fields do not cause awkward zooming on iPhone Safari.

---

# 46. FINAL PRE-PUBLISH CHECKLIST

Run through this 20-point verification checklist before launching:

- [ ] 1. Creator Name and Professional Tagline are updated.
- [ ] 2. Custom Logo and 512px Favicon are uploaded.
- [ ] 3. Master Showreel video URL is tested and playing.
- [ ] 4. All demo projects are replaced with your real work.
- [ ] 5. Project thumbnails are sharp and 16:9 ratio.
- [ ] 6. 9:16 vertical cuts are added for social campaigns.
- [ ] 7. Before/After color grading sliders have both RAW and Graded frames attached.
- [ ] 8. Operator Bio and creative manifesto are written.
- [ ] 9. Services and editing software badges are accurate.
- [ ] 10. Production packages and pricing are verified.
- [ ] 11. Client testimonials have accurate names and company credits.
- [ ] 12. All social media icons link to your active profiles.
- [ ] 13. WhatsApp booking number is in international format.
- [ ] 14. Contact form sends test emails successfully to your inbox.
- [ ] 15. SEO meta title and meta description are configured.
- [ ] 16. Open Graph social preview image is uploaded.
- [ ] 17. Custom domain is connected with active SSL (HTTPS lock icon).
- [ ] 18. Tested on Apple Safari, Google Chrome, and Mozilla Firefox.
- [ ] 19. Tested on both iPhone / Android mobile devices.
- [ ] 20. Downloaded a full JSON backup of your portfolio.

---

# 47. COMMON MISTAKES & TROUBLESHOOTING

| Problem | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Video fails to play** | Broken URL, deleted video, or unsupported video codec | Verify link in browser. Ensure direct MP4s use H.264 video codec and Fast Start encoding. |
| **Google Drive video won't load** | File sharing permission is set to "Restricted" | Open Google Drive → Right-click file → Share → Set to "Anyone with the link can view". |
| **Logo looks blurry** | Low-resolution raster PNG used on Retina display | Replace PNG with a crisp vector `.SVG` file or high-res 2x PNG. |
| **Brand colors not updating** | Browser caching old stylesheet | Perform a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`). |
| **Font looks generic** | Web font failed to load or typo in font name | Verify font selection in Brand Studio and check internet connection for Google Fonts. |
| **Contact form submissions not received** | Formspree endpoint missing or unverified | Verify Formspree endpoint URL in Admin and confirm your email on Formspree.io. |
| **WhatsApp link gives "Invalid Number"** | Number includes `+`, dashes, or leading zeros | Format as pure numbers with country code (e.g., `14155552671`). |
| **Social icon links to 404** | Incomplete URL pasted in admin | Ensure the full URL is entered (e.g., `https://instagram.com/username`). |
| **Website is slow to load** | Massive uncompressed 20 MB image files uploaded | Compress all images using TinyPNG.com to under 300 KB each. |
| **Custom domain shows error** | DNS records not propagated or mistyped | Double-check A-Record IP and CNAME in your registrar. Allow 2 hours for propagation. |
| **HTTPS padlock warning** | SSL certificate still provisioning | Wait 15–30 minutes for host to complete Let's Encrypt validation. |
| **Project appears in Admin but not on Homepage** | Project status is set to `Draft` or visibility is `Private` | Open project editor in Admin and change status to `Published`. |

---

# 48. FREQUENTLY ASKED QUESTIONS (FAQ)

#### Q: Can I use this template if I don't know how to code?
**A:** Yes! 100% of your portfolio's content, colors, fonts, videos, projects, testimonials, and contact settings can be managed visually through the built-in Admin CMS dashboard (`/?admin=true`).

#### Q: Will changing my theme delete my projects?
**A:** No. Your content (projects, videos, testimonials, bio) is completely separate from your visual theme. You can switch between *Minimal Cinema*, *Dark Aurora*, and *Retro Digital* with zero risk to your data.

#### Q: Can I add vertical 9:16 videos for TikTok and Instagram Reels?
**A:** Yes. Every project allows you to attach dedicated 9:16 vertical cuts alongside standard 16:9 widescreen masters. The player adapts automatically without letterboxing.

#### Q: Can I use my own custom domain name?
**A:** Yes. You can connect any custom domain (e.g., `yourname.com`, `yourstudio.film`) via your hosting provider in just a few clicks.

#### Q: How much does hosting cost?
**A:** If you deploy to Vercel, Netlify, or Cloudflare Pages, hosting is **100% free** on their standard starter tiers for personal portfolio traffic.

#### Q: Can I host videos on Google Drive?
**A:** Yes. The template has built-in Google Drive integration allowing you to stream videos directly from your Drive folders.

#### Q: Is this template suitable for motion designers, colorists, and 3D artists?
**A:** Absolutely. It includes specialized features like RAW-vs-Graded interactive before/after sliders, software pipeline badges (DaVinci, Maya, Cinema 4D, After Effects), and high-framerate playback support.

---

# 49. BEGINNER'S GLOSSARY

- **Domain**: Your website's web address (e.g., `www.alexrivera.film`).
- **Hosting**: The high-speed cloud computer where your website files live 24/7.
- **DNS (Domain Name System)**: The internet directory that connects your domain name to your hosting server.
- **SSL / HTTPS**: The security encryption protocol that gives your website the green padlock icon in the browser address bar.
- **Vercel / Netlify**: Modern global hosting platforms that deploy websites directly from code repositories.
- **Design Token**: A centralized master setting (e.g., Primary Accent Color) that controls styling across the entire site.
- **Aspect Ratio**: The proportional relationship between a video's width and height (e.g., 16:9 widescreen, 9:16 vertical).
- **Favicon**: The small tab icon displayed in web browsers.
- **Open Graph (OG)**: The image, title, and description displayed when your website link is shared on social media and messaging apps.
- **CMS (Content Management System)**: The visual admin interface where you manage your portfolio content.
- **Formspree**: A secure cloud service that delivers contact form submissions directly to your email inbox.

---

# 50. TECHNICAL USER & DEVELOPER REFERENCE

> 🛠️ **This section is strictly for developers who wish to modify the underlying React source code.** Beginners do not need to read this section.

### Project Architecture Overview
```text
/
├── server.ts                       # Express.js backend with Vite SSR/middleware
├── package.json                    # Dependencies and build scripts
├── vite.config.ts                  # Vite build bundler configuration
├── src/
│   ├── main.tsx                    # React application entry point
│   ├── App.tsx                     # Main layout & router controller
│   ├── types.ts                    # TypeScript schema definitions
│   ├── data/
│   │   └── defaultData.ts          # Seed data & fallback records
│   ├── themes/
│   │   └── themeEngine.ts          # Master theme definitions & CSS variables
│   ├── services/
│   │   ├── portfolioService.ts     # Data service facade
│   │   └── dataAdapter/            # Adapter Pattern (LocalJSON, CustomAPI, WP)
│   └── components/
│       ├── public/                 # Visitor-facing UI components
│       ├── admin/                  # CMS management tabs & modals
│       ├── player/                 # Custom video & before/after sliders
│       └── effects/                # CRT, 35mm grain, and retro window chrome
```

### Local Development Commands
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Compile production bundle and server
npm run build

# Launch production server
npm run start
```

### Adapter Pattern for Data Persistence
The codebase utilizes an **Adapter Interface (`IDataAdapter`)** located in `/src/services/dataAdapter/types.ts`. You can switch between:
- `LocalJSONAdapter`: Zero-dependency static storage for serverless edge deployments.
- `CustomAPIAdapter`: REST endpoint connector for Express, Firebase, or Node backends.
- `WordPressAdapter`: Headless WP REST API synchronization.

---

# 51. COMPLETE 20-STEP USER JOURNEY

```text
 1. PREPARE ASSETS (Logo, Bio, Stills, Videos)
 2. UNZIP & LAUNCH TEMPLATE
 3. LOG IN TO ADMIN DASHBOARD (/?admin=true)
 4. ENTER BRAND IDENTITY & UPLOAD LOGO
 5. SELECT LIVE COLOR TOKENS
 6. CHOOSE TYPOGRAPHY PAIRINGS
 7. SELECT MASTER THEME ARCHETYPE
 8. ADD SHOWREEL VIDEO TO HERO SECTION
 9. CREATE 3 TO 8 FEATURED CASE STUDIES
10. ATTACH MULTI-RATIO CUTS (16:9, 9:16, 1:1)
11. ADD RAW vs GRADED COLOR COMPARISON STILLS
12. POPULATE CREW CREDITS & SOFTWARE BADGES
13. CONFIGURE CAPABILITIES & PRICING PACKAGES
14. ADD CLIENT TESTIMONIALS
15. CONFIGURE FORMSPREE & WHATSAPP
16. CONFIGURE SEO METADATA & OG IMAGE
17. TEST ON DESKTOP & MOBILE BROWSERS
18. DEPLOY TO VERCEL / NETLIFY / HOSTING
19. CONNECT CUSTOM DOMAIN & ENABLE HTTPS
20. START SHARING YOUR NEW PORTFOLIO WITH CLIENTS!
```

---

# 52. FINAL MESSAGE TO THE CREATOR

> ### 🎬 Turn This Foundation Into Your Creative Legacy
> 
> A portfolio is more than just a gallery of videos—it is your **creative storefront, your director's reel, and the first impression you make on agencies, artists, and directors worldwide**.
> 
> This template provides you with the most advanced, high-performance visual foundation in the post-production industry. Take the time to replace all demo content, craft compelling case study narratives about your creative process, and dial in a color palette that expresses your unique aesthetic voice.
> 
> Keep this documentation bookmarked for whenever you release a new campaign, refresh your showreel, or update your production rates.
> 
> **Now go launch your portfolio and showcase your craft to the world!**

---
*Document Version: 2.6.0 (Updated for 2026 Production Standards)*
*Maintained by the Platform Core Post-Production Architecture Team.*
