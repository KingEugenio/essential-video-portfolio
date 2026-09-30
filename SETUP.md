# SETUP & CONFIGURATION GUIDE

## 1. Prerequisites
- **Node.js**: v18.0+ or v20+ recommended.
- **NPM**: v9.0+.

---

## 2. Local Installation

```bash
# Clone or navigate to the project directory
cd video-editor-portfolio

# Install dependencies
npm install

# Start development server with tsx and Vite middleware
npm run dev
```

The application dev server binds to `0.0.0.0:3000`.

---

## 3. Environment Configuration

Copy `.env.example` to `.env` (optional for local testing, as defaults are pre-configured):

```env
PORT=3000
NODE_ENV=development
ADMIN_PASSWORD=admin123
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
WORDPRESS_REST_URL=https://cms.yourdomain.com/wp-json/wp/v2
```

---

## 4. Admin Access Credentials
- **Access URL**: `http://localhost:3000/?admin=true`
- **Shortcut**: `Ctrl + Shift + A` (Windows/Linux) or `Cmd + Shift + A` (macOS)
- **Default Passwords**: `admin123` or `ekopixels2026`
- **Token Storage**: Encrypted token in browser `localStorage` (`ekopixels_admin_token`).
