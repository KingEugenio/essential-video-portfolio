import React, { useState, useEffect, useCallback } from 'react';
import { AdminData, Project } from './types';
import { defaultAdminData } from './data/defaultData';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { ProjectGrid } from './components/public/ProjectGrid';
import { QuickShowcase } from './components/public/QuickShowcase';
import { ProjectModal } from './components/public/ProjectModal';
import { ServicesSection } from './components/public/ServicesSection';
import { PricingSection } from './components/public/PricingSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { AboutSection } from './components/public/AboutSection';
import { FAQSection } from './components/public/FAQSection';
import { StudioLocationSection } from './components/public/StudioLocationSection';
import { BookingSection } from './components/public/BookingSection';
import { ThankYouPage } from './components/public/ThankYouPage';
import { PrivacyPolicyModal } from './components/public/PrivacyPolicyModal';
import { SocialShareModal } from './components/public/SocialShareModal';
import { NotFoundPage } from './components/public/NotFoundPage';
import { Footer } from './components/public/Footer';
import { FilmGrainCanvas } from './components/effects/FilmGrainCanvas';
import { ScanlineOverlay } from './components/effects/ScanlineOverlay';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginModal } from './components/admin/LoginModal';
import { PublicPortfolioSkeleton } from './components/skeletons/PublicPortfolioSkeleton';
import { AdminOverviewSkeleton } from './components/skeletons/AdminOverviewSkeleton';
import { RateCardModal } from './components/public/RateCardModal';
import { safeJsonStringify } from './utils/serialization';
import { themeEngine } from './themes/themeEngine';

export default function App() {
  const [data, setData] = useState<AdminData>(defaultAdminData);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showRateCardModal, setShowRateCardModal] = useState<boolean>(false);
  const [is404View, setIs404View] = useState<boolean>(false);
  const [isThankYouView, setIsThankYouView] = useState<boolean>(false);
  const [thankYouDetails, setThankYouDetails] = useState<{
    name?: string;
    email?: string;
    projectType?: string;
    referenceId?: string;
    date?: string;
    service?: string;
  } | undefined>(undefined);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string>('commercial');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Apply dynamic CSS variables for Brand Studio customization
  const applyCSSVariables = useCallback((brand: AdminData['brand']) => {
    themeEngine.applyBrand(brand);
    const root = document.documentElement;
    if (brand.primaryColor) root.style.setProperty('--brand-primary', brand.primaryColor);
    if (brand.secondaryColor) root.style.setProperty('--brand-secondary', brand.secondaryColor);
    if (brand.accentColor) root.style.setProperty('--brand-accent', brand.accentColor);
    if (brand.backgroundColor) root.style.setProperty('--bg-base', brand.backgroundColor);
    if (brand.surfaceColor) root.style.setProperty('--bg-surface', brand.surfaceColor);
    if (brand.surfaceElevatedColor) root.style.setProperty('--bg-surface-elevated', brand.surfaceElevatedColor);
    if (brand.textColor) root.style.setProperty('--text-main', brand.textColor);
    if (brand.mutedTextColor) root.style.setProperty('--text-muted', brand.mutedTextColor);
    if (brand.borderColor) root.style.setProperty('--border-token', brand.borderColor);
    if (brand.borderRadius) root.style.setProperty('--app-border-radius', brand.borderRadius);
  }, []);

  // Dynamic unique page title management based on current view & selection
  useEffect(() => {
    const brandName = data.brand.brandName || 'Eko Pixels';
    const brandTitle = data.brand.professionalTitle || 'Senior Video Editor & Colorist';

    if (is404View) {
      document.title = `404 Sequence Not Found // ${brandName}`;
    } else if (isThankYouView) {
      document.title = `Transmission Received // Brief Receipt & Confirmation - ${brandName}`;
    } else if (isAdminView) {
      document.title = `Admin CMS Console // ${brandName}`;
    } else if (selectedProject) {
      document.title = `${selectedProject.title} (${selectedProject.client}) // ${brandName} Portfolio`;
    } else if (showPrivacyModal) {
      document.title = `Privacy Policy & Asset Security // ${brandName}`;
    } else if (activeSection === 'booking') {
      document.title = `Book Edit Suite // Post-Production Calendar & Ingestion - ${brandName}`;
    } else {
      document.title = `${brandName} // ${brandTitle} | Commercial & Music Video Portfolio`;
    }
  }, [is404View, isThankYouView, isAdminView, selectedProject, showPrivacyModal, activeSection, data.brand]);

  // Preview skeleton loader simulation helper
  const handlePreviewSkeletons = (durationMs = 2500) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, durationMs);
  };

  // Fetch initial data from server
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const minBufferPromise = new Promise((resolve) => setTimeout(resolve, 650));
      const token = localStorage.getItem('ekopixels_admin_token');

      try {
        if (token) {
          // If token exists, attempt fetching full admin data
          const res = await fetch('/api/admin/data', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const adminJson = await res.json();
            if (adminJson.success && adminJson.data) {
              setData(adminJson.data);
              setIsAuthenticated(true);
              applyCSSVariables(adminJson.data.brand);
            }
          } else {
            // Token expired or invalid, clear token
            localStorage.removeItem('ekopixels_admin_token');
            setIsAuthenticated(false);
            const pubRes = await fetch('/api/portfolio');
            if (pubRes.ok) {
              const pubJson = await pubRes.json();
              if (pubJson.success) {
                setData((prev) => ({
                  ...prev,
                  brand: pubJson.brand || prev.brand,
                  projects: pubJson.projects || prev.projects,
                  services: pubJson.services || prev.services,
                  pricing: pubJson.pricing || prev.pricing,
                  testimonials: pubJson.testimonials || prev.testimonials,
                  socialLinks: pubJson.socialLinks || prev.socialLinks,
                  contactConfig: pubJson.contactConfig || prev.contactConfig,
                }));
                applyCSSVariables(pubJson.brand || data.brand);
              }
            }
          }
        } else {
          // Fetch public portfolio data
          const pubRes = await fetch('/api/portfolio');
          if (pubRes.ok) {
            const pubJson = await pubRes.json();
            if (pubJson.success) {
              setData((prev) => ({
                ...prev,
                brand: pubJson.brand || prev.brand,
                projects: pubJson.projects || prev.projects,
                services: pubJson.services || prev.services,
                pricing: pubJson.pricing || prev.pricing,
                testimonials: pubJson.testimonials || prev.testimonials,
                socialLinks: pubJson.socialLinks || prev.socialLinks,
                contactConfig: pubJson.contactConfig || prev.contactConfig,
              }));
              applyCSSVariables(pubJson.brand || data.brand);
            }
          }
        }
      } catch (err) {
        console.warn('Could not load from API, using default data.', err);
        applyCSSVariables(defaultAdminData.brand);
      } finally {
        await minBufferPromise;
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [applyCSSVariables]);

  // Check URL params for /admin route, 404, or project deep link
  useEffect(() => {
    const checkRoute = () => {
      const url = new URL(window.location.href);
      const path = url.pathname;
      const hash = url.hash;
      const adminQuery = url.searchParams.get('admin');
      const projectSlug = url.searchParams.get('project');

      if (path === '/admin' || hash === '#admin' || adminQuery === 'true') {
        const token = localStorage.getItem('ekopixels_admin_token');
        if (token) {
          setIsAdminView(true);
          setIs404View(false);
          setIsThankYouView(false);
        } else {
          setShowLoginModal(true);
        }
      } else if (path === '/thank-you' || hash === '#thank-you') {
        setIsThankYouView(true);
        setIs404View(false);
      } else if (path === '/privacy' || hash === '#privacy') {
        setShowPrivacyModal(true);
        setIs404View(false);
        setIsThankYouView(false);
      } else if (path === '/booking' || hash === '#booking') {
        setIs404View(false);
        setIsThankYouView(false);
        setActiveSection('booking');
        const bookingEl = document.getElementById('booking');
        if (bookingEl) {
          bookingEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (path === '/404' || hash === '#404') {
        setIs404View(true);
        setIsThankYouView(false);
      } else if (path !== '/' && path !== '') {
        // Unknown route -> Show 404 page
        setIs404View(true);
        setIsThankYouView(false);
      } else {
        setIs404View(false);
        setIsThankYouView(false);
      }

      if (hash === '#privacy') {
        setShowPrivacyModal(true);
      }

      if (hash === '#share') {
        setShowShareModal(true);
      }

      if (projectSlug && data.projects.length > 0) {
        const matched = data.projects.find((p) => p.slug === projectSlug || p.id === projectSlug);
        if (matched) {
          setSelectedProject(matched);
        }
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, [data.projects]);

  // Hotkey listener for admin portal access (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const token = localStorage.getItem('ekopixels_admin_token');
        if (token) {
          setIsAdminView((prev) => !prev);
        } else {
          setShowLoginModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update backend data handler
  const handleUpdateData = async (updatedData: AdminData) => {
    setData(updatedData);
    applyCSSVariables(updatedData.brand);

    const token = localStorage.getItem('ekopixels_admin_token');
    if (!token) return;

    try {
      await fetch('/api/admin/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: safeJsonStringify(updatedData),
      });
    } catch (err) {
      console.error('Failed to sync updated admin data to server:', err);
    }
  };

  // Reset database back to default state
  const handleResetDemoData = async () => {
    const token = localStorage.getItem('ekopixels_admin_token');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/reset-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setData(defaultAdminData);
        applyCSSVariables(defaultAdminData.brand);
      }
    } catch (err) {
      console.error('Failed to reset demo data:', err);
    }
  };

  // Login handler
  const handleLoginSuccess = (token: string) => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setIsAdminView(true);

    // Fetch complete admin data
    fetch('/api/admin/data', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data) {
          setData(resJson.data);
          applyCSSVariables(resJson.data.brand);
        }
      })
      .catch((err) => console.error(err));
  };

  // Logout handler
  const handleLogout = () => {
    const token = localStorage.getItem('ekopixels_admin_token');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }

    localStorage.removeItem('ekopixels_admin_token');
    setIsAuthenticated(false);
    setIsAdminView(false);
    setShowLoginModal(false);
    
    // Clean URL
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      window.history.replaceState(null, '', '/');
    }
  };

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    setIs404View(false);
    setActiveSection(sectionId);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', `/#${sectionId}`);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 0. Initial Loading States with Realistic Skeletons
  if (isLoading) {
    if (isAdminView || window.location.hash === '#admin' || window.location.pathname === '/admin') {
      return (
        <div className="min-h-screen bg-[#08080a] text-white flex flex-col font-mono text-xs selection:bg-[#ff3b00]">
          <header className="sticky top-0 z-40 bg-[#0e0e14] border-b border-white/15 px-4 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ff3b00] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(255,59,0,0.5)]">
                EKO
              </div>
              <div className="space-y-1">
                <div className="h-4 w-36 bg-white/20 rounded animate-pulse" />
                <div className="h-2.5 w-48 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-28 bg-[#ff3b00]/20 border border-[#ff3b00]/40 rounded-lg animate-pulse" />
              <div className="h-8 w-20 bg-white/10 border border-white/10 rounded-lg animate-pulse" />
            </div>
          </header>

          <div className="flex-1 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-[#0e0e14] border-r border-white/15 p-4 space-y-2 flex-shrink-0">
              <div className="text-[10px] font-bold text-[#00e5ff] uppercase px-2 mb-2 tracking-wider">
                PORTFOLIO ENGINE
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div 
                  key={i} 
                  className={`h-9 w-full rounded-lg border animate-pulse ${
                    i === 1 
                      ? 'bg-[#ff3b00]/20 border-[#ff3b00]/40' 
                      : i === 2 
                        ? 'bg-[#00e5ff]/10 border-[#00e5ff]/20' 
                        : 'bg-white/5 border-white/10'
                  }`} 
                />
              ))}
            </aside>

            <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-6xl mx-auto w-full">
              <AdminOverviewSkeleton />
            </main>
          </div>
        </div>
      );
    }

    return <PublicPortfolioSkeleton />;
  }

  // 1. If 404 Route is active, render the custom 404 page
  if (is404View) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <FilmGrainCanvas mode={data.brand.grainMode} intensity={data.brand.grainIntensity} />
        <NotFoundPage
          brand={data.brand}
          featuredProjects={data.projects.filter((p) => p.status === 'published' && p.visibility === 'public')}
          onNavigateHome={() => {
            window.history.pushState(null, '', '/');
            setIs404View(false);
          }}
          onNavigateArchive={() => {
            window.history.pushState(null, '', '/');
            setIs404View(false);
            setTimeout(() => handleNavigate('work'), 50);
          }}
          onNavigateContact={() => {
            window.history.pushState(null, '', '/');
            setIs404View(false);
            setTimeout(() => handleNavigate('contact'), 50);
          }}
          onNavigateFAQ={() => {
            window.history.pushState(null, '', '/');
            setIs404View(false);
            setTimeout(() => handleNavigate('faq'), 50);
          }}
          onSelectProject={(project) => {
            window.history.pushState(null, '', '/');
            setIs404View(false);
            setSelectedProject(project);
          }}
        />
      </div>
    );
  }

  // 1.5. If Thank You Route is active, render the dedicated Thank You / Brief Receipt page
  if (isThankYouView) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <FilmGrainCanvas mode={data.brand.grainMode} intensity={data.brand.grainIntensity} />
        <ThankYouPage
          brand={data.brand}
          submissionDetails={thankYouDetails}
          onNavigateHome={() => {
            window.history.pushState(null, '', '/');
            setIsThankYouView(false);
          }}
          onNavigateArchive={() => {
            window.history.pushState(null, '', '/');
            setIsThankYouView(false);
            setTimeout(() => handleNavigate('work'), 50);
          }}
          onOpenRateCard={() => setShowRateCardModal(true)}
          onOpenShare={() => setShowShareModal(true)}
        />
      </div>
    );
  }

  // 2. If Admin View is active and authenticated, show full Private Admin CMS
  if (isAdminView && isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-[#ff3b00] selection:text-white">
        <FilmGrainCanvas
          mode={data.brand.grainMode}
          intensity={Math.min(data.brand.grainIntensity, 10)}
        />
        <AdminLayout
          data={data}
          onUpdateData={handleUpdateData}
          onResetDemoData={handleResetDemoData}
          onExitAdmin={() => setIsAdminView(false)}
          onLogout={handleLogout}
          onPreviewSkeletons={() => handlePreviewSkeletons(2500)}
        />
      </div>
    );
  }

  // 3. Public Portfolio Experience
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ff3b00] selection:text-white font-body relative overflow-x-hidden">
      {/* 35mm Film Grain Canvas */}
      {data.brand.grainMode !== 'clean' && (
        <FilmGrainCanvas
          mode={data.brand.grainMode}
          intensity={data.brand.grainIntensity}
        />
      )}

      {/* CRT Scanline & Retro HUD Overlay */}
      <ScanlineOverlay
        scanlinesEnabled={data.brand.scanlinesEnabled}
        timestampEnabled={data.brand.timestampEnabled}
        recIndicatorEnabled={data.brand.recIndicatorEnabled}
        vhsNoiseEnabled={data.brand.vhsNoiseEnabled}
      />

      {/* Public Header Navigation */}
      <Navbar
        brand={data.brand}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Public Content Sections */}
      <main className="relative z-10 flex flex-col gap-8 sm:gap-14">
        {/* Hero Section with Master Showreel */}
        <Hero
          brand={data.brand}
          onExploreWork={() => handleNavigate('work')}
          onOpenBooking={() => handleNavigate('booking')}
        />

        {/* Quick Format Showcase (16:9 Cinema, 9:16 Shorts/Reels, 1:1 Socials) */}
        <QuickShowcase
          projects={data.projects.filter((p) => p.status === 'published' && (p.visibility === 'public' || !p.visibility))}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* Selected Work Archive (Only Published + Public Projects) */}
        <ProjectGrid
          projects={data.projects.filter((p) => p.status === 'published' && (p.visibility === 'public' || !p.visibility))}
          defaultLayout={data.brand.portfolioLayout}
          onSelectProject={(p) => setSelectedProject(p)}
          autoNumbering={data.brand.autoNumbering}
          heading={data.brand.archiveHeading}
          subheading={data.brand.archiveSubheading}
        />

        {/* Services & Pipeline Directory */}
        <ServicesSection
          services={data.services.filter((s) => s.available)}
          onBookService={(srv) => {
            setPreselectedBookingService(srv.id);
            handleNavigate('booking');
          }}
        />

        {/* Production Packages & Transparent Pricing */}
        {data.pricing && data.pricing.enabled && (
          <PricingSection
            config={data.pricing}
            onSelectTier={(tier) => {
              setPreselectedBookingService(tier.id);
              handleNavigate('booking');
            }}
            onRequestCustomQuote={() => handleNavigate('contact')}
          />
        )}

        {/* Real Booking System: Suite Calendar & Technical Ingestion */}
        <BookingSection
          brandName={data.brand.brandName}
          defaultService={preselectedBookingService}
          onBookingSuccess={(details) => {
            setThankYouDetails(details);
            setIsThankYouView(true);
            window.history.pushState(null, '', '/thank-you');
          }}
        />

        {/* Operator Bio / About Manifesto Section */}
        <AboutSection
          brand={data.brand}
          onContact={() => handleNavigate('contact')}
        />

        {/* FAQ Section */}
        <FAQSection
          onContactClick={() => handleNavigate('contact')}
        />

        {/* Studio Location, Direction & Physical Drop-off Section */}
        <StudioLocationSection
          onContactClick={() => handleNavigate('contact')}
          onBookSession={() => handleNavigate('booking')}
        />

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={data.testimonials.filter((t) => t.published)} />

        {/* Contact Brief Transmission Portal */}
        <ContactSection
          config={data.contactConfig}
          brandName={data.brand.brandName}
          onNavigateToReceipt={(details) => {
            setThankYouDetails(details);
            setIsThankYouView(true);
            window.history.pushState(null, '', '/thank-you');
          }}
        />
      </main>

      {/* Public Footer with Internal Links, Privacy Policy trigger & Social Share */}
      <Footer
        brand={data.brand}
        socialLinks={data.socialLinks.filter((s) => s.enabled)}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigate={handleNavigate}
        onOpenPrivacyPolicy={() => setShowPrivacyModal(true)}
        onDownloadRateCard={() => setShowRateCardModal(true)}
        onOpenShare={() => setShowShareModal(true)}
      />

      {/* Commercial Rate Card & Tech Specs Modal */}
      <RateCardModal
        isOpen={showRateCardModal}
        onClose={() => setShowRateCardModal(false)}
        onRequestBooking={() => {
          setShowRateCardModal(false);
          handleNavigate('booking');
        }}
      />

      {/* Project Detail Modal with Video & Grade Sliders */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onBookSimilar={() => handleNavigate('booking')}
        />
      )}

      {/* Privacy Policy & Confidentiality Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => {
          setShowPrivacyModal(false);
          if (window.location.hash === '#privacy') {
            window.history.replaceState(null, '', '/');
          }
        }}
      />

      {/* Social Sharing Dialog */}
      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          if (window.location.hash === '#share') {
            window.history.replaceState(null, '', '/');
          }
        }}
        shareData={{
          title: `${data.brand.brandName} // ${data.brand.professionalTitle}`,
          description: data.brand.tagline || 'High-end commercial & music video post-production editing portfolio.',
          url: window.location.origin,
          tags: ['VideoEditing', 'ColorGrading', 'FilmPostProduction', 'EkoPixels'],
        }}
      />

      {/* Login Modal for Administrator Access (Opened via /admin or Ctrl+Shift+A) */}
      {showLoginModal && (
        <LoginModal
          onLoginSuccess={handleLoginSuccess}
          onClose={() => {
            setShowLoginModal(false);
            if (window.location.hash === '#admin') {
              window.history.replaceState(null, '', '/');
            }
          }}
        />
      )}
    </div>
  );
}
