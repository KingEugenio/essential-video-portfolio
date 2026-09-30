import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { QuickShowcaseSection } from './components/public/QuickShowcaseSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { ServicesSection } from './components/public/ServicesSection';
import { PricingSection } from './components/public/PricingSection';
import { AboutSection } from './components/public/AboutSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { EnquirySection } from './components/public/EnquirySection';
import { PublicFooter } from './components/public/PublicFooter';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { ShowreelModal } from './components/video/ShowreelModal';
import { ClientProofingView } from './components/proofing/ClientProofingView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginView } from './components/admin/AdminLoginView';
import { Toast } from './components/common/Toast';
import {
  PublicPageSkeleton,
  ClientProofingSkeleton,
} from './components/common/PublicSkeletons';
import { DashboardSkeleton } from './components/common/AdminSkeletons';

const AppContent: React.FC = () => {
  const {
    activeView,
    toastMessage,
    setActiveProofingId,
    setActiveView,
    isAdminAuthenticated,
    isLoading,
  } = usePortfolio();

  // Check URL parameters for direct proofing or admin links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proofingParam = params.get('proofing');
    if (proofingParam) {
      setActiveProofingId(proofingParam);
      setActiveView('proofing');
    }

    const adminParam = params.get('admin') || params.get('view');
    const isHashAdmin = window.location.hash === '#admin';
    if (adminParam === 'true' || adminParam === 'admin' || isHashAdmin) {
      setActiveView('admin');
    }
  }, [setActiveProofingId, setActiveView]);

  // Global Keyboard Shortcut: Alt + Shift + A to open Admin Gate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveView]);

  if (isLoading) {
    if (activeView === 'proofing') {
      return <ClientProofingSkeleton />;
    }
    if (activeView === 'admin') {
      return (
        <div className="min-h-screen bg-[var(--brand-bg)] p-6">
          <DashboardSkeleton />
        </div>
      );
    }
    return <PublicPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] font-sans antialiased selection:bg-[var(--brand-primary)] selection:text-black">
      {activeView === 'public' && (
        <>
          <PublicHeader />
          <main>
            <HeroSection />
            <QuickShowcaseSection />
            <PortfolioSection />
            <ServicesSection />
            <PricingSection />
            <AboutSection />
            <TestimonialsSection />
            <EnquirySection />
          </main>
          <PublicFooter />
          <ProjectDetailModal />
          <ShowreelModal />
        </>
      )}

      {activeView === 'proofing' && <ClientProofingView />}

      {activeView === 'admin' && (
        isAdminAuthenticated ? <AdminDashboard /> : <AdminLoginView />
      )}

      <Toast message={toastMessage} />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
