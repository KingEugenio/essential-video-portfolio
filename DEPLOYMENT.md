# DEPLOYMENT GUIDE

This application is ready for production deployment across containerized platforms (Google Cloud Run, Docker, Kubernetes) or static/headless hosting (Vercel, Netlify, Cloudflare Pages with API proxy).

---

## 1. Production Build & Run (Container / Node.js)

The project includes an optimized single-step production build bundling the Express backend into `dist/server.cjs` and the static frontend assets into `dist/`:

```bash
# 1. Build client assets and server bundle
npm run build

# 2. Start production server
npm start
```

---

## 2. Docker Deployment

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

---

## 3. Environment Variables for Production
- `PORT`: Set automatically (defaults to `3000`).
- `NODE_ENV`: `production`.
- `ADMIN_PASSWORD`: Strong master password for the CMS portal.
- `FORMSPREE_ENDPOINT`: (Optional) Formspree transmission hook.
- `WORDPRESS_REST_URL`: (Optional) WordPress REST API base URL.
