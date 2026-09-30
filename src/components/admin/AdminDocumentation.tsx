import React, { useState } from 'react';
import {
  BookOpen,
  Code,
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  Sparkles,
  Shield,
  Video,
  Layers,
  Search,
  CheckCircle2,
  HelpCircle,
  FolderOpen,
  Palette,
  Globe,
  Smartphone,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminDocumentation: React.FC = () => {
  const { showToast } = usePortfolio();
  const [docView, setDocView] = useState<'onboarding' | 'editor' | 'developer'>('onboarding');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    showToast('Portfolio link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadGuide = () => {
    // Generate downloadable markdown file
    const element = document.createElement('a');
    element.setAttribute('href', '/USER_SETUP_GUIDE.md');
    element.setAttribute('download', 'USER_SETUP_GUIDE.md');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('User Setup Guide download initiated!');
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-documentation-root">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[var(--brand-primary)]" />
            <span>Platform Documentation & Operations Manual</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Complete onboarding, brand customization, video publishing, Formspree setup, and technical developer specifications.
          </p>
        </div>

        {/* Tab Toggle & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <nav aria-label="Documentation Categories" className="p-1 rounded-xl bg-black/40 border border-white/10">
            <ul className="flex items-center gap-1.5 list-none p-0 m-0">
              <li>
                <button
                  type="button"
                  onClick={() => setDocView('onboarding')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    docView === 'onboarding'
                      ? 'bg-[var(--brand-primary)] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>User Setup Guide</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDocView('editor')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    docView === 'editor'
                      ? 'bg-[var(--brand-primary)] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Video Editor Manual</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDocView('developer')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    docView === 'developer'
                      ? 'bg-[var(--brand-primary)] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Developer Docs</span>
                </button>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={handleDownloadGuide}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {docView === 'onboarding' && (
        <div className="space-y-6">
          {/* Quick Setup Roadmap Banner */}
          <article className="p-6 rounded-3xl bg-gradient-to-r from-[var(--brand-primary)]/15 via-black/50 to-black/80 border border-[var(--brand-primary)]/30 space-y-4">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] font-extrabold border border-[var(--brand-primary)]/40">
                  Mandatory Onboarding
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white">
                  User Setup & Customization Guide
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                USER_SETUP_GUIDE.md
              </span>
            </header>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              This master guide is designed for both non-technical creators and experienced video editors. Follow the numbered modules below or open <code className="text-[var(--brand-primary)] font-mono">/USER_SETUP_GUIDE.md</code> to publish your broadcast-grade portfolio.
            </p>

            {/* Visual Roadmap Cards */}
            <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2 list-none p-0 m-0">
              {[
                { step: '01', title: 'Prepare Content', desc: 'Logos, Stills & Showreel' },
                { step: '02', title: 'Brand Colors', desc: 'Design Tokens in Studio' },
                { step: '03', title: 'Add Projects', desc: '16:9 & 9:16 Media' },
                { step: '04', title: 'Color Grades', desc: 'Before/After Sliders' },
                { step: '05', title: 'Bookings', desc: 'Formspree & WhatsApp' },
                { step: '06', title: 'Launch', desc: 'Domain & Vercel' },
              ].map((item, idx) => (
                <li key={idx}>
                  <article className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1 h-full">
                    <span className="text-[10px] font-mono font-bold text-[var(--brand-primary)]">{item.step}</span>
                    <h4 className="text-xs font-bold text-white truncate m-0">{item.title}</h4>
                    <p className="text-[10px] text-neutral-400 truncate m-0">{item.desc}</p>
                  </article>
                </li>
              ))}
            </ul>
          </article>

          {/* Quick Accordion Sections */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm list-none p-0 m-0">
            {/* Box 1: Video Integration */}
            <li>
              <article className="glass-card p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] space-y-3 h-full">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>1. Supported Video Sources</span>
                </h4>
                <ul className="space-y-2 text-neutral-300 text-xs list-none p-0 m-0">
                  <li><strong className="text-white">Direct Uploads (MP4/WebM):</strong> Best for sizzle clips under 45MB. Ultra-clean player without external branding.</li>
                  <li><strong className="text-white">Google Drive:</strong> Stream full rushes directly from your Google Drive folder by setting link sharing to &quot;Anyone with link&quot;.</li>
                  <li><strong className="text-white">YouTube & Vimeo:</strong> Seamless support for Public & Unlisted links with privacy settings.</li>
                </ul>
              </article>
            </li>

            {/* Box 2: Branding & Tokens */}
            <li>
              <article className="glass-card p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] space-y-3 h-full">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>2. Centralized Design Tokens</span>
                </h4>
                <p className="text-neutral-300 text-xs leading-relaxed m-0">
                  You never need to edit CSS files manually. Change primary colors, surface cards, and font sizes inside the <strong>Brand Studio</strong>. All changes propagate across buttons, modals, and headers automatically.
                </p>
              </article>
            </li>

            {/* Box 3: Contact & Booking */}
            <li>
              <article className="glass-card p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] space-y-3 h-full">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>3. Formspree & WhatsApp Booking</span>
                </h4>
                <p className="text-neutral-300 text-xs leading-relaxed m-0">
                  Create a free form at <a href="https://formspree.io" target="_blank" rel="noreferrer" className="text-[var(--brand-primary)] underline">formspree.io</a>, paste your ID into <strong>Booking & Form Settings</strong>, and receive client briefs directly in your email inbox.
                </p>
              </article>
            </li>

            {/* Box 4: Hosting & Custom Domain */}
            <li>
              <article className="glass-card p-5 sm:p-6 rounded-2xl border border-[var(--brand-border)] space-y-3 h-full">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>4. Hosting & Domain Setup</span>
                </h4>
                <p className="text-neutral-300 text-xs leading-relaxed m-0">
                  Deploy in one click on Vercel, Netlify, or Cloudflare Pages. Point your custom A record to your host&apos;s IP to enable HTTPS SSL certificate automatically.
                </p>
              </article>
            </li>
          </ul>
        </div>
      )}

      {docView === 'editor' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[var(--brand-border)] space-y-8 text-neutral-300 text-sm leading-relaxed">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--brand-primary)] font-bold">
                Non-Technical Guide
              </span>
              <h3 className="text-xl font-bold font-heading text-white mt-1">
                How to Operate & Manage Your Portfolio
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">PORTFOLIO_EDITOR_GUIDE.md</span>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs flex items-center justify-center font-mono font-bold">1</span>
              <span>Adding & Editing Video Projects</span>
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              In the <strong>Projects</strong> tab, click <strong>+ Add Project</strong>. You can configure:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-neutral-300">
              <li><strong>Horizontal (16:9, 2.39:1)</strong> for widescreen films & commercials.</li>
              <li><strong>Vertical (9:16, 4:5)</strong> for Instagram Reels, TikTok, and YouTube Shorts.</li>
              <li><strong>Multi-Video Deliverables</strong>: Add Director’s Cut, 30s Cutdowns, and BTS reels to a single project.</li>
              <li><strong>Interactive Before/After Grading</strong>: Add RAW Log and Final Grade images for real-time split-screen comparison.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs flex items-center justify-center font-mono font-bold">2</span>
              <span>Google Drive Video Ingest</span>
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Upload your video export directly to Google Drive. Set sharing to <strong>&quot;Anyone with the link can view&quot;</strong>. Paste the link into CineFolio, and it streams cleanly without ads or watermarks.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs flex items-center justify-center font-mono font-bold">3</span>
              <span>Formspree Client Booking Setup</span>
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              1. Create a free form at <a href="https://formspree.io" target="_blank" rel="noreferrer" className="text-[var(--brand-primary)] underline font-semibold">formspree.io</a>.<br />
              2. Paste your endpoint URL in the <strong>Booking Form</strong> tab.<br />
              3. Click <strong>Send Test Probe</strong> to verify. Submissions will now arrive straight in your inbox!
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs flex items-center justify-center font-mono font-bold">4</span>
              <span>Client Review & Proofing Portal</span>
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              In the <strong>Proofing</strong> tab, generate private review links. Clients can pause at any timestamp, leave frame-accurate revision notes, and approve cuts in real-time.
            </p>
          </div>
        </div>
      )}

      {docView === 'developer' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[var(--brand-border)] space-y-8 text-neutral-300 text-sm leading-relaxed">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--brand-primary)] font-bold">
                Technical Architecture
              </span>
              <h3 className="text-xl font-bold font-heading text-white mt-1">
                Developer Specifications & API Schemas
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">PORTFOLIO_DEVELOPER_DOCUMENTATION.md</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-white">1. Tech Stack Overview</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-neutral-400 block">Frontend</span>
                <span className="font-bold text-white">React 19 + TypeScript</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-neutral-400 block">Styling</span>
                <span className="font-bold text-white">Tailwind CSS v4</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-neutral-400 block">Build Engine</span>
                <span className="font-bold text-white">Vite 6</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-neutral-400 block">Attribution</span>
                <span className="font-bold text-[var(--brand-primary)]">BUILT BY EKO PIXELS</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white">2. Headless WordPress Sync</h4>
            <p className="text-neutral-400 text-xs">
              Synchronizes posts via standard WP REST API endpoint <code className="font-mono text-white">GET /wp-json/wp/v2/portfolio_project</code>.
              Maps ACF fields: <code className="font-mono text-[var(--brand-primary)]">video_url</code>, <code className="font-mono text-[var(--brand-primary)]">client</code>, <code className="font-mono text-[var(--brand-primary)]">year</code>, <code className="font-mono text-[var(--brand-primary)]">aspect_ratio</code>.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-base font-bold text-white">3. Security Model</h4>
            <p className="text-neutral-400 text-xs">
              Admin routes are protected via <code className="font-mono text-white">sessionStorage</code> auth tokens and master PIN verification. No management triggers or CMS buttons are exposed on the public DOM.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
