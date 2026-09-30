# MEDIA & VIDEO PROVIDER GUIDE

The **Universal Video Player** (`UniversalVideoPlayer.tsx`) and **Media Provider Abstraction** (`/src/services/mediaProviders/`) provide robust multi-ratio video presentation with zero aspect-ratio distortion.

---

## 1. Supported Aspect Ratios & Orientations

| Aspect Ratio | Orientation | Typical Use Case |
| :--- | :--- | :--- |
| **16:9** | Landscape | Cinema commercial masters, trailers, showreels |
| **9:16** | Portrait / Vertical | TikTok, Instagram Reels, YouTube Shorts, mobile spots |
| **1:1** | Square | Instagram feed, square social campaigns |
| **4:5** | Vertical Standard | Feed video ads, high-impact portraits |
| **2.39:1** | Anamorphic Widescreen | Theatrical trailers & music videos |

---

## 2. Google Drive Video Integration

Google Drive files are streamed using direct web content links:
- **Direct Playback**: `https://drive.google.com/uc?export=download&id=FILE_ID` or custom proxy.
- **Embedded Fallback**: `https://drive.google.com/file/d/FILE_ID/preview` inside a responsive sandbox container.

### Google Drive Browser Modal (`GoogleDriveModal.tsx`):
- Connects directly to folder structures.
- Parses metadata (width, height, duration, size).
- Automatically infers whether a video is vertical (`9:16`) or landscape (`16:9`).

---

## 3. Automated Media Health Checker

In the Admin **Media Library** tab:
- Run health checks across all assets to verify that video URLs are live and streaming.
- Assets flagged as `broken` or `warning` are visually marked with diagnostic details to prevent broken links on the public portfolio.
