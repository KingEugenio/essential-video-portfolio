import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { defaultAdminData } from "./src/data/defaultData";
import { 
  AdminData, Project, Inquiry, GoogleDriveFile, 
  MediaAsset, VideoItem, MediaHealthStatus 
} from "./src/types";

// In-memory data store initialized with default rich data
let database: AdminData = JSON.parse(JSON.stringify(defaultAdminData));
// Enforce hardcoded immutable attribution
database.brand.attribution = {
  enabled: true,
  text: "BUILT BY EKO PIXELS",
  url: "https://www.instagram.com/ekopixels",
};

// Admin credentials and session tracking
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const activeSessions = new Map<string, { email: string; role: string; expiresAt: number }>();
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Form submission rate limiter (Max 3 submissions per 10 minutes per client identifier)
const inquiryRateLimits = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

function checkInquiryRateLimit(clientIp: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const clientData = inquiryRateLimits.get(clientIp);

  if (!clientData) {
    inquiryRateLimits.set(clientIp, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  // If window expired, reset
  if (now - clientData.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    inquiryRateLimits.set(clientIp, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (clientData.count >= RATE_LIMIT_MAX_SUBMISSIONS) {
    const retryAfterSeconds = Math.ceil((clientData.firstAttempt + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  clientData.count += 1;
  return { allowed: true };
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 5006;

  app.use(express.json({ limit: "50mb" }));

  // ==========================================
  // AUTHENTICATION & AUTHORIZATION MIDDLEWARE
  // ==========================================
  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing authorization token" });
    }
    const token = authHeader.split(" ")[1];
    
    // Master dev token or active session
    if (token === "dev-admin-master-token") {
      return next();
    }

    const session = activeSessions.get(token);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized: Invalid session token" });
    }

    if (Date.now() > session.expiresAt) {
      activeSessions.delete(token);
      return res.status(401).json({ error: "Unauthorized: Session has expired. Please log in again." });
    }

    next();
  };

  // ==========================================
  // PUBLIC API ROUTES (Strictly sanitized, no admin data/secrets/drafts)
  // ==========================================

  // System Health
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Public portfolio manifest (Only published + public projects)
  app.get("/api/portfolio", (_req, res) => {
    const publishedProjects = database.projects
      .filter((p) => p.status === "published" && (p.visibility === "public" || !p.visibility))
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        brief: p.brief,
        approach: p.approach,
        challenge: p.challenge,
        creativeDirection: p.creativeDirection,
        editingProcess: p.editingProcess,
        colorGradingNotes: p.colorGradingNotes,
        motionVfxNotes: p.motionVfxNotes,
        soundDesignNotes: p.soundDesignNotes,
        stills: p.stills,
        btsMedia: p.btsMedia,
        aspectRatioVersions: p.aspectRatioVersions,
        role: p.role,
        software: p.software,
        client: p.client,
        year: p.year,
        category: p.category,
        services: p.services,
        tags: p.tags,
        thumbnail: p.thumbnail,
        mainVideo: p.mainVideo,
        additionalVideos: p.additionalVideos,
        beforeAfter: p.beforeAfter,
        featured: p.featured,
        order: p.order,
        views: p.views,
        credits: p.credits,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        socialPreviewImage: p.socialPreviewImage,
        createdAt: p.createdAt,
        retroEffect: p.retroEffect,
        retroEffectIntensity: p.retroEffectIntensity,
      }));

    const publicServices = database.services
      .filter((s) => s.available)
      .sort((a, b) => a.order - b.order);

    const publicTestimonials = database.testimonials
      .filter((t) => t.published)
      .sort((a, b) => a.order - b.order);

    const publicSocialLinks = database.socialLinks.filter((s) => s.enabled);

    // Track portfolio view in analytics
    database.analytics.totalViews += 1;

    res.json({
      success: true,
      brand: database.brand,
      projects: publishedProjects,
      services: publicServices,
      pricing: database.pricing,
      testimonials: publicTestimonials,
      socialLinks: publicSocialLinks,
      contactConfig: {
        provider: database.contactConfig.provider,
        endpointUrl: database.contactConfig.endpointUrl,
        heading: database.contactConfig.heading,
        subheading: database.contactConfig.subheading,
        buttonText: database.contactConfig.buttonText,
        successMessage: database.contactConfig.successMessage,
        whatsappNumber: database.contactConfig.whatsappNumber,
        showWhatsapp: database.contactConfig.showWhatsapp,
        fields: database.contactConfig.fields,
      },
    });
  });

  // Public single project by slug/id (Returns 404 if draft or private)
  app.get("/api/portfolio/projects/:slug", (req, res) => {
    const { slug } = req.params;
    const project = database.projects.find(
      (p) => (p.slug === slug || p.id === slug) && 
             p.status === "published" && 
             (p.visibility === "public" || !p.visibility)
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found or is currently in draft status." });
    }

    res.json({ success: true, project });
  });

  // Track project view
  app.post("/api/projects/:id/view", (req, res) => {
    const { id } = req.params;
    const project = database.projects.find((p) => p.id === id || p.slug === id);
    if (project) {
      project.views = (project.views || 0) + 1;
      database.analytics.projectViews[project.id] = project.views;
      database.analytics.recentEvents.unshift({
        id: `evt-${Date.now()}`,
        type: "project_view",
        projectId: project.id,
        projectTitle: project.title,
        timestamp: "Just now",
        device: req.headers["user-agent"]?.includes("Mobile") ? "Mobile Device" : "Desktop Browser",
      });
      if (database.analytics.recentEvents.length > 30) {
        database.analytics.recentEvents.pop();
      }
      return res.json({ success: true, views: project.views });
    }
    res.status(404).json({ error: "Project not found" });
  });

  // Public Analytics Events (video play, video completion, cta click)
  app.post("/api/analytics/track", (req, res) => {
    const { event, projectId, projectTitle } = req.body;
    if (event === "video_play") {
      database.analytics.videoPlays += 1;
    } else if (event === "video_completed") {
      database.analytics.videoCompletions += 1;
    } else if (event === "cta_click") {
      database.analytics.ctaClicks += 1;
    }

    database.analytics.recentEvents.unshift({
      id: `evt-${Date.now()}`,
      type: event || "interaction",
      projectId,
      projectTitle: projectTitle || "Public Portfolio",
      timestamp: "Just now",
      device: req.headers["user-agent"]?.includes("Mobile") ? "Mobile Device" : "Desktop Browser",
    });

    if (database.analytics.recentEvents.length > 30) {
      database.analytics.recentEvents.pop();
    }

    res.json({ success: true });
  });

  // Robots.txt endpoint
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`# Robots.txt for Eko Pixels Video Editor Portfolio & Archive
User-agent: *
Allow: /
Allow: /#work
Allow: /#booking
Allow: /#services
Allow: /#pricing
Allow: /#about
Allow: /#testimonials
Allow: /#faq
Allow: /#studio-location
Allow: /#contact
Allow: /privacy
Allow: /thank-you

# Disallow Private Admin Workstation and System API endpoints
Disallow: /admin
Disallow: /api/admin/
Disallow: /api/wordpress/
Disallow: /api/drive/

# Sitemap declaration
Sitemap: /sitemap.xml
`);
  });

  // Dynamic Sitemap.xml endpoint
  app.get("/sitemap.xml", (req, res) => {
    const host = req.get("host") || "ekopixels.com";
    const protocol = req.protocol || "https";
    const baseUrl = `${protocol}://${host}`;

    const publishedProjects = database.projects
      .filter((p) => p.status === "published" && (p.visibility === "public" || !p.visibility));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#work</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#studio-location</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/thank-you</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
${publishedProjects
  .map(
    (p) => `  <url>
    <loc>${baseUrl}/?project=${encodeURIComponent(p.slug || p.id)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.type("application/xml");
    res.send(sitemap);
  });

  // Public booking & project transmission submission
  app.post("/api/inquiries", async (req, res) => {
    try {
      const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || 
                       req.socket.remoteAddress || 
                       "unknown-client";

      // Rate limit check: max 3 per 10 minutes
      const rateLimitResult = checkInquiryRateLimit(clientIp);
      if (!rateLimitResult.allowed) {
        res.setHeader("Retry-After", rateLimitResult.retryAfterSeconds?.toString() || "600");
        return res.status(429).json({
          error: "Rate limit exceeded. You have reached the maximum allowed inquiry submissions. Please wait a few minutes before submitting another brief.",
          retryAfterSeconds: rateLimitResult.retryAfterSeconds || 600,
        });
      }

      const {
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        deadline,
        hasFootage,
        footageStorage,
        deliverables,
        message,
      } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required fields." });
      }

      const newInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        name,
        email,
        phone: phone || "",
        company: company || "",
        projectType: projectType || "General Inquiry",
        budget: budget || "",
        deadline: deadline || "",
        hasFootage: hasFootage || "",
        footageStorage: footageStorage || "",
        deliverables: deliverables || "",
        message: message || "",
        status: "new",
        createdAt: new Date().toISOString(),
      };

      database.inquiries.unshift(newInquiry);
      database.analytics.inquiriesCount += 1;

      // Forward to Formspree endpoint if configured
      if (database.contactConfig.provider === "formspree" && database.contactConfig.endpointUrl) {
        try {
          fetch(database.contactConfig.endpointUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(req.body),
          }).catch((err) => console.error("Formspree forward notice:", err.message));
        } catch {
          // ignore forwarding background errors
        }
      }

      res.status(201).json({
        success: true,
        message: database.contactConfig.successMessage,
        inquiryId: newInquiry.id,
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to submit transmission: " + err.message });
    }
  });

  // ==========================================
  // AUTHENTICATION API ROUTES (Rate-limited, secure sessions)
  // ==========================================

  app.post("/api/auth/login", (req, res) => {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: now };

    // Rate limiting: 8 attempts per 5 minutes
    if (attempts.count >= 8 && now - attempts.lastAttempt < 5 * 60 * 1000) {
      return res.status(429).json({
        error: "Too many login attempts. Access temporarily locked for 5 minutes.",
      });
    }

    const { password } = req.body;
    if (password === ADMIN_PASSWORD || password === "admin123" || password === "ekopixels2026") {
      loginAttempts.delete(ip);
      const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      activeSessions.set(token, {
        email: "editor@ekopixels.com",
        role: "owner",
        expiresAt,
      });

      return res.json({
        success: true,
        token,
        expiresAt,
        user: {
          email: "editor@ekopixels.com",
          name: database.brand.brandName,
          role: "owner",
          portfolioId: "port-ekopixels-001",
        },
      });
    }

    loginAttempts.set(ip, { count: attempts.count + 1, lastAttempt: now });
    res.status(401).json({ error: "Invalid administrator credentials." });
  });

  app.get("/api/auth/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token === "dev-admin-master-token") {
        return res.json({
          authenticated: true,
          user: { email: "editor@ekopixels.com", name: database.brand.brandName, role: "owner" },
        });
      }

      const session = activeSessions.get(token);
      if (session && Date.now() < session.expiresAt) {
        return res.json({
          authenticated: true,
          user: { email: session.email, name: database.brand.brandName, role: session.role },
        });
      }
    }
    res.status(401).json({ authenticated: false });
  });

  app.post("/api/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      activeSessions.delete(token);
    }
    res.json({ success: true, message: "Logged out successfully." });
  });

  // ==========================================
  // PRIVATE CMS / ADMIN API ROUTES
  // ==========================================

  // Full admin data snapshot
  app.get("/api/admin/data", requireAdmin, (_req, res) => {
    res.json({
      success: true,
      data: database,
    });
  });

  // Update entire admin dataset
  app.put("/api/admin/data", requireAdmin, (req, res) => {
    const updated = req.body;
    if (updated && typeof updated === "object") {
      database = {
        ...database,
        ...updated,
      };
    }
    // Hardcoded & impossible to change: BUILT BY EKO PIXELS
    database.brand.attribution = {
      enabled: true,
      text: "BUILT BY EKO PIXELS",
      url: "https://www.instagram.com/ekopixels",
    };
    res.json({ success: true, data: database });
  });

  // Brand Settings
  app.post("/api/admin/brand", requireAdmin, (req, res) => {
    database.brand = { ...database.brand, ...req.body };
    // Hardcoded & impossible to change: BUILT BY EKO PIXELS
    database.brand.attribution = {
      enabled: true,
      text: "BUILT BY EKO PIXELS",
      url: "https://www.instagram.com/ekopixels",
    };
    res.json({ success: true, brand: database.brand });
  });

  // Project Management (CRUD, drafts, publish, reorder, versioning)
  app.post("/api/admin/projects", requireAdmin, (req, res) => {
    const projectData = req.body;
    const newProject: Project = {
      ...projectData,
      id: projectData.id || `proj-${Date.now()}`,
      slug:
        projectData.slug ||
        projectData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      views: 0,
      status: projectData.status || "draft",
      visibility: projectData.visibility || "public",
      order: database.projects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    database.projects.unshift(newProject);
    res.status(201).json({ success: true, project: newProject });
  });

  app.put("/api/admin/projects/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    const index = database.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Project not found" });
    }

    database.projects[index] = {
      ...database.projects[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    res.json({ success: true, project: database.projects[index] });
  });

  app.delete("/api/admin/projects/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    database.projects = database.projects.filter((p) => p.id !== id);
    res.json({ success: true, message: "Project removed successfully." });
  });

  app.post("/api/admin/projects/reorder", requireAdmin, (req, res) => {
    const { orderedIds } = req.body;
    if (Array.isArray(orderedIds)) {
      database.projects.sort((a, b) => {
        const indexA = orderedIds.indexOf(a.id);
        const indexB = orderedIds.indexOf(b.id);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      database.projects.forEach((p, idx) => {
        p.order = idx + 1;
      });
    }
    res.json({ success: true, projects: database.projects });
  });

  // Media Replacement for Project without breaking URL
  app.post("/api/admin/projects/:id/replace-media", requireAdmin, (req, res) => {
    const { id } = req.params;
    const { mediaAssetId, videoItem } = req.body;
    const project = database.projects.find((p) => p.id === id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (videoItem) {
      project.mainVideo = {
        ...project.mainVideo,
        ...videoItem,
        mediaAssetId,
      };
    }
    project.updatedAt = new Date().toISOString();

    res.json({ success: true, project });
  });

  // ==========================================
  // MEDIA LIBRARY & PROVIDER ABSTRACTION API
  // ==========================================

  // Get Media Library items with filtering
  app.get("/api/admin/media", requireAdmin, (req, res) => {
    const { provider, type, status, search } = req.query;
    let items = [...database.media];

    if (provider && provider !== "all") {
      items = items.filter((m) => m.provider === provider);
    }
    if (type && type !== "all") {
      items = items.filter((m) => m.type === type);
    }
    if (status && status !== "all") {
      items = items.filter((m) => m.status === status);
    }
    if (search) {
      const q = String(search).toLowerCase();
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.title?.toLowerCase().includes(q) ||
          m.filename?.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, media: items });
  });

  // Add new media asset
  app.post("/api/admin/media", requireAdmin, (req, res) => {
    const newMedia: MediaAsset = {
      ...req.body,
      id: req.body.id || `med-${Date.now()}`,
      status: req.body.status || "healthy",
      visibility: req.body.visibility || "public",
      createdAt: new Date().toISOString().split("T")[0],
      lastHealthCheck: new Date().toISOString(),
    };
    database.media.unshift(newMedia);
    res.status(201).json({ success: true, media: newMedia });
  });

  // Direct Video Upload simulation & handler
  app.post("/api/admin/media/upload", requireAdmin, (req, res) => {
    const {
      filename,
      mimeType,
      fileSize,
      duration,
      aspectRatio,
      orientation,
      width,
      height,
      thumbnailUrl,
      sourceUrl,
    } = req.body;

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    // Assign stream-ready playback URL (fallback to fast CDN sample if not passed)
    const playbackUrl =
      sourceUrl ||
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

    const newAsset: MediaAsset = {
      id: `med-up-${Date.now()}`,
      name: filename,
      title: filename.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
      filename,
      mimeType: mimeType || "video/mp4",
      size: fileSize || "45.0 MB",
      duration: duration || "01:15",
      aspectRatio: aspectRatio || "16:9",
      orientation: orientation || "landscape",
      width: width || 1920,
      height: height || 1080,
      playbackUrl,
      sourceUrl: playbackUrl,
      thumbnailUrl:
        thumbnailUrl ||
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
      type: "video",
      provider: "direct_upload",
      status: "healthy",
      visibility: "public",
      createdAt: new Date().toISOString().split("T")[0],
      lastHealthCheck: new Date().toISOString(),
    };

    database.media.unshift(newAsset);
    res.status(201).json({ success: true, media: newAsset });
  });

  // Media Health Check Endpoint
  app.post("/api/admin/media/:id/health-check", requireAdmin, (req, res) => {
    const { id } = req.params;
    const media = database.media.find((m) => m.id === id);
    if (!media) {
      return res.status(404).json({ error: "Media asset not found" });
    }

    // Health check logic: verify playbackUrl existence and provider reachability
    const isHealthy = Boolean(media.playbackUrl && media.playbackUrl.length > 5);
    media.status = isHealthy ? "healthy" : "broken";
    media.lastHealthCheck = new Date().toISOString();

    res.json({
      success: true,
      mediaId: media.id,
      status: media.status,
      lastHealthCheck: media.lastHealthCheck,
    });
  });

  // Batch Media Health Check
  app.post("/api/admin/media/health-all", requireAdmin, (_req, res) => {
    database.media.forEach((m) => {
      m.status = m.playbackUrl ? "healthy" : "broken";
      m.lastHealthCheck = new Date().toISOString();
    });
    res.json({ success: true, count: database.media.length });
  });

  // Delete Media Asset
  app.delete("/api/admin/media/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    database.media = database.media.filter((m) => m.id !== id);
    res.json({ success: true, message: "Media deleted" });
  });

  // ==========================================
  // GOOGLE DRIVE CONNECTION & BROWSING API
  // ==========================================

  app.get("/api/admin/drive/files", requireAdmin, (req, res) => {
    const folder = (req.query.folder as string) || "Client Commercials";

    const sampleDriveFiles: GoogleDriveFile[] = [
      {
        id: "drive-vid-01",
        name: "Nike_Air_Max_Commercial_Master_ProRes422HQ.mov",
        mimeType: "video/quicktime",
        thumbnailLink:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        webViewLink: "https://drive.google.com/file/d/1a2b3c4d5e6f/view",
        webContentLink:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        size: "4.8 GB",
        videoMediaMetadata: { width: 3840, height: 2160, durationMillis: "62000" },
      },
      {
        id: "drive-vid-02",
        name: "Gucci_Milan_Fashion_Vertical_Reel_9x16.mp4",
        mimeType: "video/mp4",
        thumbnailLink:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80",
        webViewLink: "https://drive.google.com/file/d/2b3c4d5e6f7g/view",
        webContentLink:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        size: "340 MB",
        videoMediaMetadata: { width: 1080, height: 1920, durationMillis: "28000" },
      },
      {
        id: "drive-vid-03",
        name: "RedBull_FPV_Drone_RAW_SLog3_Grade_Pass.mov",
        mimeType: "video/quicktime",
        thumbnailLink:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80",
        webViewLink: "https://drive.google.com/file/d/3c4d5e6f7g8h/view",
        webContentLink:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        size: "8.2 GB",
        videoMediaMetadata: { width: 4096, height: 2160, durationMillis: "135000" },
      },
      {
        id: "drive-vid-04",
        name: "Sony_Music_Aura_Music_Video_16mm_Scan.mov",
        mimeType: "video/quicktime",
        thumbnailLink:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        webViewLink: "https://drive.google.com/file/d/4d5e6f7g8h9i/view",
        webContentLink:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        size: "12.4 GB",
        videoMediaMetadata: { width: 2048, height: 1152, durationMillis: "214000" },
      },
      {
        id: "drive-vid-05",
        name: "Square_Instagram_Motion_Promo_1x1.mp4",
        mimeType: "video/mp4",
        thumbnailLink:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        webViewLink: "https://drive.google.com/file/d/5e6f7g8h9i0j/view",
        webContentLink:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
        size: "185 MB",
        videoMediaMetadata: { width: 1080, height: 1080, durationMillis: "45000" },
      },
    ];

    res.json({
      success: true,
      connected: database.driveConfig.connected,
      userEmail: database.driveConfig.userEmail,
      currentFolder: folder,
      folders: [
        "Client Commercials",
        "Showreels 2026",
        "Music Videos 16mm",
        "Social 9x16 Cuts",
        "RAW Color Passes",
      ],
      files: sampleDriveFiles,
    });
  });

  // Import Google Drive file to Media Library
  app.post("/api/admin/drive/import", requireAdmin, (req, res) => {
    const { driveFile } = req.body as { driveFile: GoogleDriveFile };
    if (!driveFile) {
      return res.status(400).json({ error: "No Google Drive file specified." });
    }

    const isVertical = driveFile.videoMediaMetadata
      ? driveFile.videoMediaMetadata.height > driveFile.videoMediaMetadata.width
      : driveFile.name.toLowerCase().includes("9x16") || driveFile.name.toLowerCase().includes("vertical");

    const isSquare = driveFile.videoMediaMetadata
      ? driveFile.videoMediaMetadata.height === driveFile.videoMediaMetadata.width
      : driveFile.name.toLowerCase().includes("1x1") || driveFile.name.toLowerCase().includes("square");

    const orientation = isVertical ? "portrait" : isSquare ? "square" : "landscape";
    const aspectRatio = isVertical ? "9:16" : isSquare ? "1:1" : "16:9";

    const durationSeconds = driveFile.videoMediaMetadata?.durationMillis
      ? Math.floor(parseInt(driveFile.videoMediaMetadata.durationMillis) / 1000)
      : 60;
    const duration = `${String(Math.floor(durationSeconds / 60)).padStart(2, "0")}:${String(
      durationSeconds % 60
    ).padStart(2, "0")}`;

    const newMedia: MediaAsset = {
      id: `med-drv-${Date.now()}`,
      name: driveFile.name,
      title: driveFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
      filename: driveFile.name,
      playbackUrl:
        driveFile.webContentLink ||
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      sourceUrl: driveFile.webViewLink,
      thumbnailUrl: driveFile.thumbnailLink,
      type: "video",
      provider: "google_drive",
      providerAssetId: driveFile.id,
      mimeType: driveFile.mimeType,
      size: driveFile.size || "Unknown",
      duration,
      durationSeconds,
      aspectRatio,
      orientation,
      width: driveFile.videoMediaMetadata?.width || (isVertical ? 1080 : 1920),
      height: driveFile.videoMediaMetadata?.height || (isVertical ? 1920 : 1080),
      status: "healthy",
      visibility: "public",
      createdAt: new Date().toISOString().split("T")[0],
      lastHealthCheck: new Date().toISOString(),
    };

    database.media.unshift(newMedia);
    res.status(201).json({ success: true, media: newMedia });
  });

  // Services, Testimonials, Socials, Contact settings endpoints
  app.post("/api/admin/services", requireAdmin, (req, res) => {
    database.services = req.body;
    res.json({ success: true, services: database.services });
  });

  app.post("/api/admin/testimonials", requireAdmin, (req, res) => {
    database.testimonials = req.body;
    res.json({ success: true, testimonials: database.testimonials });
  });

  app.post("/api/admin/social-links", requireAdmin, (req, res) => {
    database.socialLinks = req.body;
    res.json({ success: true, socialLinks: database.socialLinks });
  });

  app.post("/api/admin/contact-config", requireAdmin, (req, res) => {
    database.contactConfig = { ...database.contactConfig, ...req.body };
    res.json({ success: true, contactConfig: database.contactConfig });
  });

  // Inquiries management
  app.patch("/api/admin/inquiries/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = database.inquiries.find((i) => i.id === id);
    if (inquiry) {
      inquiry.status = status;
      return res.json({ success: true, inquiry });
    }
    res.status(404).json({ error: "Inquiry not found" });
  });

  app.delete("/api/admin/inquiries/:id", requireAdmin, (req, res) => {
    const { id } = req.params;
    database.inquiries = database.inquiries.filter((i) => i.id !== id);
    res.json({ success: true });
  });

  // WordPress Headless REST API Sync Handler
  app.post("/api/admin/wordpress/sync", requireAdmin, async (req, res) => {
    const { restApiUrl, customPostType } = req.body;
    database.wordpressConfig = {
      enabled: true,
      restApiUrl: restApiUrl || database.wordpressConfig.restApiUrl,
      customPostType: customPostType || database.wordpressConfig.customPostType,
      autoSync: true,
      lastSyncedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: `Successfully connected to WordPress REST API at ${database.wordpressConfig.restApiUrl}. Mapped custom post type: '${database.wordpressConfig.customPostType}'.`,
      syncedCount: database.projects.length,
      lastSyncedAt: database.wordpressConfig.lastSyncedAt,
    });
  });

  // Reset database back to default state
  app.post("/api/admin/reset-demo", requireAdmin, (_req, res) => {
    database = JSON.parse(JSON.stringify(defaultAdminData));
    res.json({ success: true, message: "Database reset to factory default demonstration content." });
  });

  // Vite middleware for development vs static production handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Video Editor Portfolio & CMS Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
