import React from 'react';
import {
  LayoutDashboard,
  Film,
  Palette,
  Type,
  Layout,
  HardDrive,
  FolderOpen,
  Briefcase,
  CreditCard,
  Quote,
  Mail,
  CheckCircle2,
  BarChart3,
  ArrowLeft,
  ExternalLink,
  Sun,
  Moon,
  Sparkles,
  Sliders,
  Globe,
  Share2,
  BookOpen,
  LogOut,
  Shield,
  FileCheck2,
  Wand2,
  Boxes,
  Cloud,
} from 'lucide-react';
import { usePortfolio, AdminTab } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { AdminOverview } from './AdminOverview';
import { AdminProjects } from './AdminProjects';
import { AdminBrandStudio } from './AdminBrandStudio';
import { AdminTypography } from './AdminTypography';
import { AdminLayoutSettings } from './AdminLayoutSettings';
import { AdminGoogleDrive } from './AdminGoogleDrive';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminServices } from './AdminServices';
import { AdminPricing } from './AdminPricing';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminProofing } from './AdminProofing';
import { AdminFormSettings } from './AdminFormSettings';
import { AdminWordPress } from './AdminWordPress';
import { AdminSocialLinks } from './AdminSocialLinks';
import { AdminSetupWizard } from './AdminSetupWizard';
import { AdminDocumentation } from './AdminDocumentation';
import { AdminInvoices } from './AdminInvoices';
import { AdminContracts } from './AdminContracts';
import { AdminAITools } from './AdminAITools';
import { AdminIntegrations } from './AdminIntegrations';
import { AdminCloudSync } from './AdminCloudSync';
import {
  DashboardSkeleton,
  AdminOverviewSkeleton,
  AdminProjectsSkeleton,
  AdminGoogleDriveSkeleton,
  AdminWordPressSkeleton,
  AdminBrandStudioSkeleton,
  AdminTypographySkeleton,
  AdminLayoutSkeleton,
  AdminServicesSkeleton,
  AdminTestimonialsSkeleton,
  AdminEnquiriesSkeleton,
  AdminProofingSkeleton,
  AdminMediaLibrarySkeleton,
  AdminSetupWizardSkeleton,
  AdminDocumentationSkeleton,
} from '../common/AdminSkeletons';
import { GlassButton } from '../common/GlassButton';

export const AdminDashboard: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    triggerTabTransition,
    isTabLoading,
    setActiveView,
    logoutAdmin,
    enquiries,
    proofingReviews,
  } = usePortfolio();
  const { theme, brand, toggleDarkMode } = useTheme();

  const navItems: Array<{ id: AdminTab; label: string; icon: React.ReactNode; badge?: number; section?: string }> = [
    { id: 'overview', label: 'Overview & Stats', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'wizard', label: '12-Step Setup Wizard', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Videos', icon: <Film className="w-4 h-4" /> },
    { id: 'ai-tools', label: 'AI Creative Suite', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices & Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'contracts', label: 'Client Contracts', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'googledrive', label: 'Google Drive Sync', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'wordpress', label: 'WordPress Headless', icon: <Globe className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations Hub', icon: <Boxes className="w-4 h-4" /> },
    { id: 'cloud-sync', label: 'Cloud DB & Portability', icon: <Cloud className="w-4 h-4" /> },
    { id: 'booking-form', label: 'Booking & Formspree', icon: <Sliders className="w-4 h-4" /> },
    { id: 'social-links', label: 'Social Media Links', icon: <Share2 className="w-4 h-4" /> },
    { id: 'brand-studio', label: 'Brand Studio & Colors', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography & Fonts', icon: <Type className="w-4 h-4" /> },
    { id: 'layout', label: 'Layout & Glass Style', icon: <Layout className="w-4 h-4" /> },
    { id: 'services', label: 'Services & Rates', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing Packages', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Client Reviews', icon: <Quote className="w-4 h-4" /> },
    {
      id: 'enquiries',
      label: 'Client Enquiries',
      icon: <Mail className="w-4 h-4" />,
      badge: enquiries.filter(e => e.status === 'new').length,
    },
    {
      id: 'proofing',
      label: 'Client Proofing',
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: proofingReviews.filter(r => r.status === 'in_review').length,
    },
    { id: 'media', label: 'Media Library', icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'docs', label: 'User & Dev Guide', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const renderActiveTab = () => {
    if (isTabLoading) {
      switch (adminTab) {
        case 'overview':
          return <DashboardSkeleton />;
        case 'wizard':
          return <AdminSetupWizardSkeleton />;
        case 'projects':
          return <AdminProjectsSkeleton />;
        case 'googledrive':
          return <AdminGoogleDriveSkeleton />;
        case 'wordpress':
          return <AdminWordPressSkeleton />;
        case 'booking-form':
          return <AdminOverviewSkeleton />;
        case 'social-links':
        case 'brand-studio':
          return <AdminBrandStudioSkeleton />;
        case 'typography':
          return <AdminTypographySkeleton />;
        case 'layout':
          return <AdminLayoutSkeleton />;
        case 'services':
          return <AdminServicesSkeleton />;
        case 'pricing':
          return <AdminServicesSkeleton />;
        case 'testimonials':
          return <AdminTestimonialsSkeleton />;
        case 'enquiries':
          return <AdminEnquiriesSkeleton />;
        case 'proofing':
          return <AdminProofingSkeleton />;
        case 'media':
          return <AdminMediaLibrarySkeleton />;
        case 'docs':
          return <AdminDocumentationSkeleton />;
        default:
          return <DashboardSkeleton />;
      }
    }

    switch (adminTab) {
      case 'overview':
        return <AdminOverview />;
      case 'wizard':
        return <AdminSetupWizard />;
      case 'projects':
        return <AdminProjects />;
      case 'ai-tools':
        return <AdminAITools />;
      case 'invoices':
        return <AdminInvoices />;
      case 'contracts':
        return <AdminContracts />;
      case 'googledrive':
        return <AdminGoogleDrive />;
      case 'wordpress':
        return <AdminWordPress />;
      case 'integrations':
        return <AdminIntegrations />;
      case 'cloud-sync':
        return <AdminCloudSync />;
      case 'booking-form':
        return <AdminFormSettings />;
      case 'social-links':
        return <AdminSocialLinks />;
      case 'brand-studio':
        return <AdminBrandStudio />;
      case 'typography':
        return <AdminTypography />;
      case 'layout':
        return <AdminLayoutSettings />;
      case 'services':
        return <AdminServices />;
      case 'pricing':
        return <AdminPricing />;
      case 'testimonials':
        return <AdminTestimonials />;
      case 'enquiries':
        return <AdminEnquiries />;
      case 'proofing':
        return <AdminProofing />;
      case 'media':
        return <AdminMediaLibrary />;
      case 'docs':
        return <AdminDocumentation />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--brand-surface)]/95 border-r border-[var(--brand-border)] p-4 flex flex-col justify-between shrink-0 max-h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="space-y-6">
          {/* Brand Badge */}
          <header className="flex items-center justify-between pb-4 border-b border-[var(--brand-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold font-heading text-[var(--brand-text)]">
                  CineFolio Studio
                </h1>
                <span className="text-[10px] text-[var(--brand-text-muted)] font-mono block">
                  Built by EKO Pixels
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleDarkMode()}
              className="p-1.5 rounded-lg glass-surface text-[var(--brand-text-secondary)] hover:text-white cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme.mode === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </header>

          {/* Navigation Links */}
          <nav aria-label="Admin Navigation" className="space-y-1">
            <ul className="space-y-1 list-none p-0 m-0">
              {navItems.map(item => {
                const isActive = adminTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => triggerTabTransition(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--brand-primary)] text-black font-bold shadow-md shadow-[var(--brand-primary)]/20'
                          : 'text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                          isActive ? 'bg-black text-white' : 'bg-[var(--brand-primary)] text-black'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer Actions */}
        <footer className="pt-4 border-t border-[var(--brand-border)] mt-6 space-y-2">
          <GlassButton
            variant="outline"
            size="sm"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="w-full justify-center"
            onClick={() => setActiveView('public')}
          >
            View Live Portfolio
          </GlassButton>

          <button
            type="button"
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
        </footer>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
        {renderActiveTab()}
      </main>
    </div>
  );
};
