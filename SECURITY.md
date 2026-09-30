# SECURITY POLICY & AUTHENTICATION SPECIFICATION

## 1. Authentication Architecture
- **Admin Tokens**: 24-hour cryptographic session tokens generated via `crypto` pseudorandomness upon successful password verification.
- **Client Storage**: Session tokens stored securely in `localStorage` under `ekopixels_admin_token` and passed via `Authorization: Bearer <token>`.

---

## 2. Rate Limiting & Brute Force Defense
- **Login Rate Limiter**: Maximum 8 failed login attempts per IP address within any 5-minute sliding window. Additional attempts result in HTTP 429 Too Many Requests.
- **Inquiry Rate Limiter**: Form submissions are throttled to prevent spam flooding.

---

## 3. Data Sanitization & Circular Protection
- **Circular Reference Safety**: All state serialization routes utilize `safeJsonStringify` to guarantee that DOM elements, React Fiber nodes, or cyclical objects are filtered before JSON conversion.
- **XSS & Content Security**: All user-provided fields in forms and markdown are stripped of executable script tags.
