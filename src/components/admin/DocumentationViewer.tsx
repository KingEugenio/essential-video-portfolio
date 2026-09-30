import React, { useState } from 'react';
import { BookOpen, Code, FileText, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck, Film, HelpCircle } from 'lucide-react';

export const DocumentationViewer: React.FC = () => {
  const [docType, setDocType] = useState<'onboarding' | 'editor' | 'developer'>('onboarding');
  const [copied, setCopied] = useState<boolean>(false);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#ff3b00]" />
            <span>USER SETUP &amp; CUSTOMIZATION MANUAL</span>
          </h2>
          <p className="text-white/50">
            Mandatory onboarding reference, brand customization manual, and deployment guide for creators.
          </p>
        </div>

        {/* Doc Switcher */}
        <div className="flex items-center gap-1.5 bg-[#141418] p-1 rounded border border-white/10">
          <button
            onClick={() => setDocType('onboarding')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              docType === 'onboarding' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Master Setup Guide</span>
          </button>

          <button
            onClick={() => setDocType('editor')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              docType === 'editor' ? 'bg-[#1e1e28] text-white font-bold border border-white/20' : 'text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quick Editor Cheatsheet</span>
          </button>

          <button
            onClick={() => setDocType('developer')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              docType === 'developer' ? 'bg-[#00e5ff] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Developer Docs</span>
          </button>
        </div>
      </div>

      {/* Main Documentation Viewer Container */}
      <div className="bg-[#121216] border border-white/10 rounded-lg p-6 sm:p-8 text-white/80 font-body text-sm leading-relaxed overflow-y-auto max-h-[75vh] space-y-8">
        {docType === 'onboarding' ? (
          <>
            {/* Header Banner */}
            <div className="border-b border-white/10 pb-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ff3b00]/10 border border-[#ff3b00]/30 text-[#ff3b00] font-mono text-xs font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                MANDATORY ONBOARDING &amp; SETUP MANUAL
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                USER SETUP &amp; CUSTOMIZATION GUIDE
              </h1>
              <p className="text-white/60 mt-1 font-body text-sm">
                Official onboarding manual for video editors, filmmakers, colorists, motion designers, and creative studios.
              </p>
            </div>

            {/* 1. START HERE */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">01.</span>
                READ THIS BEFORE YOU START
              </h2>
              <p>
                Welcome to your new <strong>Video Editor Portfolio Platform</strong>. This template is custom-engineered specifically for visual storytellers. Unlike generic website builders that compress high-bitrate showreels, distort vertical cuts, or strip out cinematic color depth, this platform is optimized for broadcast-grade showreels, multi-aspect ratio social cuts (16:9, 9:16, 1:1), interactive RAW-vs-Graded color sliders, and streaming from Google Drive, Vimeo, and YouTube.
              </p>

              <div className="bg-[#181820] border border-white/10 rounded-lg p-4 font-mono text-xs text-white/90">
                <div className="text-[#ff3b00] font-bold mb-2">COMPLETE 14-STEP ONBOARDING ROADMAP:</div>
                <div className="space-y-1 text-white/70">
                  <div>1. DOWNLOAD TEMPLATE &amp; UNZIP</div>
                  <div>2. PREPARE LOGO, PROFILE PHOTO &amp; VIDEOS</div>
                  <div>3. OPEN ADMIN DASHBOARD (<code className="text-[#00e5ff]">/?admin=true</code>)</div>
                  <div>4. UPLOAD LOGO &amp; AVATAR</div>
                  <div>5. CHOOSE LIVE BRAND COLORS &amp; THEME</div>
                  <div>6. SELECT TYPOGRAPHY PAIRINGS</div>
                  <div>7. ADD SHOWREEL &amp; HERO VIDEO</div>
                  <div>8. ADD PROJECTS &amp; CASE STUDY NARRATIVES</div>
                  <div>9. UPLOAD RAW vs GRADED COMPARISON FRAMES</div>
                  <div>10. CONFIGURE SERVICES &amp; PRICING TIERS</div>
                  <div>11. SET UP FORMSPREE EMAIL &amp; WHATSAPP</div>
                  <div>12. TEST ON SMARTPHONE &amp; DESKTOP</div>
                  <div>13. CHOOSE FREE HOSTING (Vercel / Netlify)</div>
                  <div>14. CONNECT CUSTOM DOMAIN &amp; LAUNCH!</div>
                </div>
              </div>
            </section>

            {/* 2. PREPARATION CHECKLIST */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">02.</span>
                WHAT YOU SHOULD PREPARE BEFORE CUSTOMIZING
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#181820] p-3 rounded border border-white/10 space-y-1.5">
                  <div className="font-bold text-white uppercase text-[#ff3b00]">Identity &amp; Branding</div>
                  <div>✓ Creator / Business Name</div>
                  <div>✓ Professional Tagline (e.g. Lead Commercial Video Editor)</div>
                  <div>✓ Transparent Vector SVG or PNG Logo</div>
                  <div>✓ 512×512 Favicon Icon</div>
                  <div>✓ 1:1 Square Profile Photo (800×800px)</div>
                </div>
                <div className="bg-[#181820] p-3 rounded border border-white/10 space-y-1.5">
                  <div className="font-bold text-white uppercase text-[#00e5ff]">Media &amp; Projects</div>
                  <div>✓ Master Showreel Video URL (Vimeo / YouTube / Drive)</div>
                  <div>✓ 3 to 8 Featured Projects with 16:9 Thumbnails</div>
                  <div>✓ Optional 9:16 Vertical TikTok/Reels Cutdowns</div>
                  <div>✓ RAW Log Frame + Graded Frame for Color Sliders</div>
                  <div>✓ Software Tool Badges (Premiere, DaVinci, AE)</div>
                </div>
              </div>
            </section>

            {/* 3. VIDEO HOSTING & STREAMING */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">03.</span>
                HOW TO ADD YOUR VIDEOS
              </h2>
              <p>
                The platform supports four primary video methods. You can mix and match different methods across your portfolio:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-white/10">
                  <thead>
                    <tr className="bg-[#181820] text-white">
                      <th className="p-2.5 border border-white/10 font-bold">Method</th>
                      <th className="p-2.5 border border-white/10 font-bold">Best Used For</th>
                      <th className="p-2.5 border border-white/10 font-bold">Key Advantages</th>
                      <th className="p-2.5 border border-white/10 font-bold">Important Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white/70">
                    <tr>
                      <td className="p-2.5 border border-white/10 font-bold text-white">Direct MP4 / CDN</td>
                      <td className="p-2.5 border border-white/10">Hero reels, looping background clips</td>
                      <td className="p-2.5 border border-white/10">Zero ads, pristine custom controls</td>
                      <td className="p-2.5 border border-white/10">Keep compressed under 50MB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-white/10 font-bold text-white">Google Drive</td>
                      <td className="p-2.5 border border-white/10">Existing multi-TB production archives</td>
                      <td className="p-2.5 border border-white/10">Stream directly with zero re-uploading</td>
                      <td className="p-2.5 border border-white/10">Set file sharing to "Anyone with link"</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-white/10 font-bold text-white">Vimeo</td>
                      <td className="p-2.5 border border-white/10">Commercial &amp; cinematography reels</td>
                      <td className="p-2.5 border border-white/10">High bitrate, clean player, unlisted privacy</td>
                      <td className="p-2.5 border border-white/10">Domain embed restrictions supported</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-white/10 font-bold text-white">YouTube</td>
                      <td className="p-2.5 border border-white/10">Music videos, public campaigns</td>
                      <td className="p-2.5 border border-white/10">Free unlimited 4K global CDN caching</td>
                      <td className="p-2.5 border border-white/10">Use Unlisted for client previews</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. BRAND COLORS & DESIGN TOKENS */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">04.</span>
                BRAND COLORS &amp; DESIGN TOKENS
              </h2>
              <p>
                You never need to edit dozens of CSS files or write code to match your brand. Changing your <strong>Primary Accent</strong> or <strong>Background Canvas</strong> in the <em>Brand Studio</em> tab automatically dispatches live CSS custom properties to every button, timeline scrubber, glowing border, and modal throughout the entire portfolio.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-3 bg-[#181820] border border-white/10 rounded">
                  <div className="w-6 h-6 rounded-full mx-auto mb-1 bg-[#ff3b00]" />
                  <div className="font-bold text-white">Primary Accent</div>
                  <div className="text-white/50 text-[10px]">#FF3B00</div>
                </div>
                <div className="p-3 bg-[#181820] border border-white/10 rounded">
                  <div className="w-6 h-6 rounded-full mx-auto mb-1 bg-[#00e5ff]" />
                  <div className="font-bold text-white">Secondary Accent</div>
                  <div className="text-white/50 text-[10px]">#00E5FF</div>
                </div>
                <div className="p-3 bg-[#181820] border border-white/10 rounded">
                  <div className="w-6 h-6 rounded-full mx-auto mb-1 bg-[#08080a] border border-white/30" />
                  <div className="font-bold text-white">Canvas BG</div>
                  <div className="text-white/50 text-[10px]">#08080A</div>
                </div>
                <div className="p-3 bg-[#181820] border border-white/10 rounded">
                  <div className="w-6 h-6 rounded-full mx-auto mb-1 bg-[#ffffff]" />
                  <div className="font-bold text-white">Primary Text</div>
                  <div className="text-white/50 text-[10px]">#FFFFFF</div>
                </div>
              </div>
            </section>

            {/* 5. CONTACT & WHATSAPP */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">05.</span>
                CONTACT TRANSMISSION &amp; WHATSAPP
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#181820] p-4 rounded border border-white/10 space-y-2">
                  <div className="font-bold text-white uppercase text-[#ff3b00]">Formspree Email Setup</div>
                  <p className="text-white/70">
                    1. Create a free account at <strong>Formspree.io</strong>.<br />
                    2. Create a form called <em>Portfolio Inquiries</em>.<br />
                    3. Copy endpoint and paste into <strong>Admin &gt; Booking Form Settings</strong>.<br />
                    4. Test transmission from your live website.
                  </p>
                </div>
                <div className="bg-[#181820] p-4 rounded border border-white/10 space-y-2">
                  <div className="font-bold text-white uppercase text-[#22c55e]">WhatsApp Click-To-Chat</div>
                  <p className="text-white/70">
                    1. Enter your phone number in <strong>International format without plus signs or dashes</strong> (e.g. <code className="text-white">14155552671</code>).<br />
                    2. Add a pre-filled booking message.<br />
                    3. Visitors can tap to start an instant mobile chat.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. DEPLOYMENT & DOMAIN */}
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-[#ff3b00] font-mono text-sm">06.</span>
                FREE HOSTING &amp; CUSTOM DOMAIN
              </h2>
              <p>
                Deploy your portfolio on <strong>Vercel</strong> or <strong>Netlify</strong> for 100% free global hosting with automatic SSL certificates:
              </p>
              <div className="bg-black/50 p-4 rounded border border-white/10 font-mono text-xs space-y-2">
                <div className="text-[#00e5ff]">STANDARD DNS CONFIGURATION FOR YOUR CUSTOM DOMAIN:</div>
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-2 text-white/80">
                  <div><strong>Type</strong></div>
                  <div><strong>Host / Name</strong></div>
                  <div><strong>Value / Points To</strong></div>
                  <div>A Record</div>
                  <div>@ (root)</div>
                  <div>76.76.21.21 (e.g. Vercel)</div>
                  <div>CNAME</div>
                  <div>www</div>
                  <div>cname.vercel-dns.com</div>
                </div>
              </div>
            </section>

            {/* 7. FULL DOCUMENTATION NOTICE */}
            <div className="bg-[#ff3b00]/10 border border-[#ff3b00]/30 rounded-lg p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-xs">LOOKING FOR THE COMPLETE 52-SECTION MANUAL?</div>
                <div className="text-white/60 text-xs">
                  The complete unabridged guide is saved in your project root as <code className="text-[#00e5ff]">/USER_SETUP_AND_CUSTOMIZATION_GUIDE.md</code>.
                </div>
              </div>
              <button
                onClick={() => copyText('/USER_SETUP_AND_CUSTOMIZATION_GUIDE.md')}
                className="px-3 py-1.5 bg-[#ff3b00] text-white rounded font-mono text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy File Path'}</span>
              </button>
            </div>
          </>
        ) : docType === 'editor' ? (
          <>
            <div className="border-b border-white/10 pb-4">
              <h1 className="font-heading font-extrabold text-2xl text-white">
                VIDEO EDITOR'S COMPLETE PLATFORM USER GUIDE
              </h1>
              <p className="font-mono text-xs text-[#ff3b00] mt-1">
                FOR EDITORS, COLORISTS &amp; MOTION DESIGNERS
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">1. Accessing Your Private Admin Portal</h2>
              <p>
                Your public website is completely clean and visitor-facing. To access your private management dashboard, add <code className="font-mono text-[#00e5ff] bg-black/50 px-1.5 py-0.5 rounded">/?admin=true</code> to your portfolio URL. Enter your master password (default: <code className="font-mono text-white">admin123</code>).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">2. Adding and Managing Portfolio Projects</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Multi-Orientation Video:</strong> You can attach 16:9 Landscape cuts, 9:16 Vertical TikTok/Reels cuts, and 1:1 Square cuts to every project.</li>
                <li><strong className="text-white">Before &amp; After Grading Comparison:</strong> Upload or link a RAW Log frame and a Graded Master frame to generate the interactive draggable comparison slider.</li>
                <li><strong className="text-white">Video Sources:</strong> Paste YouTube links, Vimeo links, direct MP4 URLs, or connect your Google Drive account.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">3. Google Drive Direct Streaming</h2>
              <p>
                Under the Google Drive modal, you can browse all video folders in your linked Google Drive account. Simply click <strong className="text-white">"Use in Master Cut"</strong> to attach any 4K video instantly with zero server upload time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">4. Customizing Your Brand &amp; Retro Aesthetics</h2>
              <p>
                Inside the <strong className="text-[#ff3b00]">Brand Studio</strong> tab, customize:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Brand Name, Professional Title, Operator Bio Manifesto</li>
                <li>Typography pairings (Cinzel, Syne, Space Grotesk, Playfair Display)</li>
                <li>Live Color Tokens (Primary Accent, Secondary Accent, Background)</li>
                <li>Retro Textures: 35mm Film Grain, CRT Scanlines, VHS Glitch, and REC HUD</li>
                <li>Window Styles: Retro Win95, Y2K Silver, CRT Terminal, VHS Player</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">5. Client Inquiries &amp; WhatsApp Bookings</h2>
              <p>
                All client project transmissions are securely logged in your Inquiries Inbox. Clients can also tap the WhatsApp button to initiate immediate direct conversations on your mobile phone.
              </p>
            </section>
          </>
        ) : (
          <>
            <div className="border-b border-white/10 pb-4">
              <h1 className="font-heading font-extrabold text-2xl text-white">
                DEVELOPER ARCHITECTURE &amp; DEPLOYMENT SPECIFICATION
              </h1>
              <p className="font-mono text-xs text-[#00e5ff] mt-1">
                EXPRESS + VITE + REACT + TAILWIND ARCHITECTURE
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">1. Server Architecture &amp; Port Binding</h2>
              <p>
                The platform is architected as an Express backend running on host <code className="font-mono text-[#00e5ff]">0.0.0.0</code> and port <code className="font-mono text-[#00e5ff]">3000</code>. In development, Vite is mounted in middleware mode. In production, <code className="font-mono text-[#00e5ff]">esbuild</code> bundles <code className="font-mono text-white">server.ts</code> to <code className="font-mono text-white">dist/server.cjs</code> with static SPA serving.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">2. CSS Variable Customization Engine</h2>
              <p>
                Brand Studio injects CSS custom properties dynamically to <code className="font-mono text-white">:root</code>:
              </p>
              <pre className="bg-black/60 p-3 rounded font-mono text-xs text-[#00e5ff] overflow-x-auto">
{`:root {
  --brand-primary: #ff3b00;
  --brand-secondary: #00e5ff;
  --bg-base: #080808;
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}`}
              </pre>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">3. REST API Routes Reference</h2>
              <div className="font-mono text-xs space-y-1.5 bg-black/40 p-3 rounded">
                <div><span className="text-[#22c55e]">GET</span> /api/portfolio (Public data)</div>
                <div><span className="text-[#22c55e]">POST</span> /api/inquiries (Public brief submission)</div>
                <div><span className="text-[#eab308]">POST</span> /api/auth/login (Admin token generation)</div>
                <div><span className="text-[#00e5ff]">GET</span> /api/admin/data (Requires Bearer token)</div>
                <div><span className="text-[#ff3b00]">PUT</span> /api/admin/data (Update CMS state)</div>
                <div><span className="text-[#a855f7]">GET</span> /api/admin/drive/files (Google Drive proxy)</div>
                <div><span className="text-[#ec4899]">POST</span> /api/admin/wordpress/sync (WordPress sync)</div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-white">4. Developer Attribution Mandate</h2>
              <p>
                The public footer includes the mandatory developer attribution: <strong className="text-[#ff3b00]">BUILT BY EKO PIXELS</strong> linking to <code className="font-mono text-white">https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr</code>.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

