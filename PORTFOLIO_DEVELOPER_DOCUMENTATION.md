# Video Editor Portfolio Platform — Developer Documentation

Comprehensive technical specifications, API contracts, deployment architecture, and design system engineering for developers.

---

## 1. Tech Stack Overview

- **Backend Runtime**: Express v4 on Node.js, binding strictly to host `0.0.0.0` and port `3000`.
- **Frontend SPA**: React 19, TypeScript, Vite 6.
- **Styling**: Tailwind CSS v4 with custom CSS Custom Property (`:root`) injection.
- **Visual Texture Engines**: Procedural 2D Canvas Film Grain generator (`FilmGrainCanvas.tsx`), SVG CRT scanlines overlay (`ScanlineOverlay.tsx`), interactive comparison divider (`BeforeAfterSlider.tsx`).
- **Icons**: Lucide React.
- **Bundler & Build Tooling**: `vite build` + `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`.

---

## 2. Environment Configuration & Port Requirements

- **PORT**: `3000` (strictly hardcoded for container reverse proxy).
- **HOST**: `0.0.0.0`.
- **ADMIN_SECRET**: Optional environment variable for custom master admin password (defaults to `admin123`).

---

## 3. Server Architecture (`server.ts`)

The Express server handles:
1. **API Endpoints**:
   - `GET /api/health` -> System health check.
   - `GET /api/portfolio` -> Public portfolio data (projects, brand settings, services, testimonials, social links, contact config).
   - `POST /api/inquiries` -> Public project brief submission with storage and Formspree proxy support.
   - `POST /api/auth/login` -> Admin password verification returning Bearer token.
   - `GET /api/admin/data` -> Full administrative dataset (requires `Authorization: Bearer <token>`).
   - `PUT /api/admin/data` -> State persistence endpoint (requires `Authorization: Bearer <token>`).
   - `GET /api/admin/drive/files` -> Google Drive video folder browser & file proxy.
   - `POST /api/admin/wordpress/sync` -> Headless WordPress REST API project synchronization.
2. **Vite Middleware in Development**: Handled via `createServer({ server: { middlewareMode: true }, appType: 'spa' })`.
3. **Static Production Serving**: Serves `dist/index.html` and static assets.

---

## 4. Brand Studio CSS Variable Pipeline

All visual styling is tied to CSS Custom Properties declared in `:root`:

```css
:root {
  --brand-primary: #ff3b00;
  --brand-secondary: #00e5ff;
  --bg-base: #080808;
  --surface-base: #121214;
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}
```

Updating settings in the **Brand Studio** automatically updates these properties dynamically on the document root without page reloads.

---

## 5. Required Developer Attribution

The public footer permanently renders:
**BUILT BY EKOPIXELS** (exact spelling: BUILT BY EKOPIXELS, not "BUILT BUY") linking directly to `https://www.instagram.com/ekopixels`.

---

## 6. Build and Production Run Commands

```bash
# Build production client and bundle server
npm run build

# Start production server
npm start
```
