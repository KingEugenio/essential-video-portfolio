# CineFolio — Video Editor Portfolio Platform
## User Guide & Operations Manual for Video Editors

Welcome to your new **Video Editor Portfolio Platform** built by **EKO Pixels**! This guide walks you step-by-step through customizing and operating your entire portfolio without touching a single line of code.

---

## Table of Contents
1. [Accessing Your Private Admin Studio](#1-accessing-your-private-admin-studio)
2. [12-Step Quick Setup Wizard](#2-12-step-quick-setup-wizard)
3. [Adding & Managing Portfolio Projects](#3-adding--managing-portfolio-projects)
4. [Supported Video Sources (Google Drive, YouTube, Vimeo, MP4)](#4-supported-video-sources)
5. [Horizontal (16:9) vs Vertical (9:16) Videos](#5-horizontal-vs-vertical-videos)
6. [Multi-Video Project Workflows](#6-multi-video-project-workflows)
7. [Interactive Before / After Color Grading](#7-interactive-before--after-color-grading)
8. [Connecting Google Drive Media & Ingest](#8-connecting-google-drive-media--ingest)
9. [Setting Up Client Booking & Formspree](#9-setting-up-client-booking--formspree)
10. [WhatsApp 1-Click Quick Booking](#10-whatsapp-1-click-quick-booking)
11. [Updating Social Media Channels](#11-updating-social-media-channels)
12. [Brand Studio & Visual Customization](#12-brand-studio--visual-customization)
13. [Client Video Proofing & Timecode Feedback](#13-client-video-proofing--timecode-feedback)
14. [WordPress Headless CMS (Optional)](#14-wordpress-headless-cms-optional)
15. [Troubleshooting & Best Practices](#15-troubleshooting--best-practices)

---

## 1. Accessing Your Private Admin Studio

Your public visitors will **never** see an Admin, Edit, or CMS button on your public website. 

To open your private Admin Studio:
- **Keyboard Shortcut**: Press `Alt + Shift + A` (or `Option + Shift + A` on Mac) anywhere on your portfolio.
- **Direct URL**: Add `?admin=true` or `#admin` to the end of your website URL (e.g. `https://myportfolio.com/?admin=true`).
- **Hidden Footer Action**: Double-click on the copyright line in the footer.

**Default Master Passcode**: `cinefolio2026`  
*(You can change this passcode at any time in your Settings)*.

---

## 2. 12-Step Quick Setup Wizard

If this is your first time configuring your portfolio, go to the **Setup Wizard** tab inside Admin:
1. **Brand Identity**: Enter your studio name, editorial title, and tagline.
2. **Profile & Bio**: Enter your photo URL and short bio.
3. **Hero Showreel**: Paste the video link for your flagship showreel.
4. **Color Palette**: Choose a preset accent color (Amber, Emerald, Gold, Violet, Cyan).
5. **Typography**: Select your Google Font pairing.
6. **Portfolio Layout**: Choose between Cinematic, Modern Grid, Split Showreel, or Bento Minimal.
7. **Video Projects**: Review or add your first projects.
8. **Google Drive**: Connect your Google Drive media folder.
9. **Booking Form**: Add your Formspree endpoint URL.
10. **Social Media**: Enter your Instagram, YouTube, Vimeo, and LinkedIn URLs.
11. **Client Proofing**: Configure client review links.
12. **Security & Launch**: Update your master PIN and launch!

---

## 3. Adding & Managing Portfolio Projects

In the **Projects** tab:
1. Click **+ Add Project**.
2. **Title**: The title of the film, music video, or commercial.
3. **Client / Brand**: e.g., *Nike, Universal Music, Sony*.
4. **Category**: Select or create categories like *Commercial, Music Video, Documentary, Social & TikTok, Color Grading*.
5. **Release Year**: e.g., *2026*.
6. **Overview / Story**: Explain the creative approach, pacing, sound design, and editing story.
7. **Role & Tools**: Add your credits (*Lead Editor, Colorist, Sound Designer*) and software (*DaVinci Resolve, Premiere Pro, After Effects*).
8. **Thumbnail URL**: Provide a high-resolution 16:9 or 9:16 poster image.

---

## 4. Supported Video Sources

CineFolio supports all major video formats without requiring custom encoding:

### A. Google Drive (Direct Streaming)
- Upload your master export (`.mp4` or `.mov`) to Google Drive.
- Set share settings to: **Anyone with the link can view**.
- Copy the link and paste it into CineFolio. CineFolio automatically converts it to high-bandwidth streaming without ads or watermarks.

### B. YouTube
- Paste standard YouTube links (e.g. `https://youtube.com/watch?v=...` or `https://youtu.be/...`).
- Plays in a clean, privacy-enhanced player.

### C. Vimeo
- Paste standard Vimeo video links (e.g. `https://vimeo.com/123456789`).

### D. Direct MP4 / Cloud Storage / CDN
- Paste direct HTTPS links from AWS S3, Cloudflare R2, Google Cloud Storage, or Frame.io.

---

## 5. Horizontal (16:9) vs Vertical (9:16) Videos

CineFolio intelligently adapts its video player and thumbnail cards based on video orientation:
- **Horizontal / Landscape (16:9, 2.39:1 CinemaScope, 4:3)**: Ideal for cinematic commercials, narrative films, and widescreen YouTube projects.
- **Vertical / Portrait (9:16, 4:5)**: Perfect for Instagram Reels, TikTok campaigns, and Shorts. They render in dedicated vertical cards and players without black sidebars.
- **Square (1:1)**: Ideal for feed carousels and square teasers.

---

## 6. Multi-Video Project Workflows

Projects can contain multiple video deliverables (e.g. Director's Cut, 30s Cutdown, 15s Social Reel, Behind the Scenes):
1. In the project editor, navigate to **Additional Project Deliverables / Videos**.
2. Click **+ Add Video Cut**.
3. Name each cut (e.g. *"Director's Cut 4K"*, *"9:16 TikTok Teaser"*).
4. Public visitors can easily switch between cuts directly inside the project modal.

---

## 7. Interactive Before / After Color Grading

Showcase your colorist skills with the interactive before/after split slider:
1. In the project editor, check **Enable Before/After Color Grading Comparison**.
2. Paste the **LOG / RAW image URL** in the "Before (Raw Log)" field.
3. Paste the **Graded / Master LUT image URL** in the "After (Final Grade)" field.
4. Add technical grade notes (e.g. *ARRI LogC3 to Kodak 2383 Print LUT with custom grain*).
5. Visitors can drag an interactive wipe slider in real-time.

---

## 8. Connecting Google Drive Media & Ingest

1. In the Admin Dashboard, go to **Google Drive**.
2. Click **Connect Google Drive**.
3. Paste your public folder link or index individual footage and export files.
4. Click **Import to Media Library** on any file to immediately use it in projects or showreels.

---

## 9. Setting Up Client Booking & Formspree

To receive client briefs directly in your inbox:
1. Visit [https://formspree.io](https://formspree.io) and create a free account.
2. Click **+ New Form** and copy your form endpoint URL (e.g. `https://formspree.io/f/xvgzbpwn`).
3. In your CineFolio Admin Dashboard, navigate to **Booking Form**.
4. Select **Formspree** as your provider.
5. Paste your endpoint URL and click **Send Test Probe** to verify.
6. Click **Save Changes**. Client submissions will now land straight in your email!

---

## 10. WhatsApp 1-Click Quick Booking

Enable immediate client chats directly on WhatsApp:
1. Go to **Booking Form** > **WhatsApp Quick Booking Link**.
2. Toggle the switch to **ON**.
3. Enter your phone number including country code (e.g. `+13108924021`).
4. Enter a custom pre-filled message (e.g. *"Hi! I saw your portfolio and would like to discuss a video project."*).
5. A green WhatsApp button will appear on your contact section.

---

## 11. Updating Social Media Channels

In the **Social Links** tab, paste your profile URLs for:
- Instagram
- YouTube
- Vimeo
- LinkedIn
- X / Twitter
- TikTok
- IMDb Pro

---

## 12. Brand Studio & Visual Customization

In **Brand Studio**:
- **Accent Colors**: Pick from Electric Amber, Cyber Emerald, Solar Gold, Crimson, Violet, or create custom hex codes.
- **Surface Elevation & Glassmorphism**: Fine-tune blur intensity, card background opacity, and border glow.
- **Corner Radii**: Adjust card and button roundness (Sharp 4px to Soft 24px).
- **Dark / Light Mode**: Toggle light and dark preview modes.

---

## 13. Client Video Proofing & Timecode Feedback

Send private client review links for video revisions without paying for expensive third-party tools:
1. Go to the **Proofing** tab.
2. Click **+ New Review Session**.
3. Select the project video and set a client passcode (optional).
4. Copy the review link (e.g. `/?proofing=review-crown-station`).
5. Your client can play the video, pause at any frame, and write timecode-accurate feedback.
6. Clients can approve cuts or request revisions with 1 click.

---

## 14. WordPress Headless CMS (Optional)

If you prefer managing projects inside a WordPress dashboard:
1. Go to the **WordPress** tab in Admin.
2. Toggle **Enable WordPress Headless Mode** to ON.
3. Enter your WordPress REST API endpoint (e.g. `https://yoursite.com/wp-json/wp/v2/portfolio_project`).
4. Click **Sync From WordPress Now**. All posts, ACF custom video URLs, and thumbnails will sync automatically.

---

## 15. Troubleshooting & Best Practices

- **Video Not Playing from Google Drive?** Verify that the file's sharing permission on Google Drive is set to **"Anyone with the link can view"**.
- **Images Not Loading?** Ensure your thumbnail image URLs use `https://` and allow hotlinking (Unsplash, Cloudinary, Imgur, or direct web hosts).
- **Form Submissions Failing?** Verify your Formspree endpoint in the Booking Form tab using the **Send Test Probe** button.

---
*Created by **EKO Pixels** — Platform for Film Editors & Visual Artists.*
