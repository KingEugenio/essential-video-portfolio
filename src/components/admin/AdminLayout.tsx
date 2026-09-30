import React, { useState } from 'react';
import { 
  Film, LayoutDashboard, Palette, Send, Sliders, 
  Star, Share2, Globe, BookOpen, HardDrive, 
  Eye, LogOut, RotateCcw, BarChart3, ShieldCheck, 
  SlidersHorizontal, Tag, X, ExternalLink, RefreshCw
} from 'lucide-react';
import { AdminData, Project, VideoItem, MediaAsset, GoogleDriveFile } from '../../types';
import { OverviewTab } from './OverviewTab';
import { ProjectsTab } from './ProjectsTab';
import { MediaLibraryTab } from './MediaLibraryTab';
import { BrandStudioTab } from './BrandStudioTab';
import { InquiriesTab } from './InquiriesTab';
import { ServicesTab } from './ServicesTab';
import { PricingTab } from './PricingTab';
import { TestimonialsTab } from './TestimonialsTab';
import { SocialLinksTab } from './SocialLinksTab';
import { ContactSettingsTab } from './ContactSettingsTab';
import { IntegrationsTab } from './IntegrationsTab';
import { AnalyticsTab } from './AnalyticsTab';
import { DocumentationViewer } from './DocumentationViewer';
import { GoogleDriveModal } from './GoogleDriveModal';
import {
  AdminOverviewSkeleton,
  AdminProjectsSkeleton,
  AdminMediaLibrarySkeleton,
  AdminBrandStudioSkeleton,
  AdminInquiriesSkeleton,
  AdminAnalyticsSkeleton,
  AdminIntegrationsSkeleton,
  AdminServicesSkeleton,
  AdminPricingSkeleton,
  AdminTestimonialsSkeleton,
  AdminSocialsSkeleton,
  AdminContactSkeleton,
  AdminDocsSkeleton,
} from '../skeletons';

interface AdminLayoutProps {
  data: AdminData;
  onUpdateData: (newData: AdminData) => void;
  onResetDemoData: () => void;
  onExitAdmin: () => void;
  onLogout: () => void;
  onPreviewSkeletons?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  data,
  onUpdateData,
  onResetDemoData,
  onExitAdmin,
  onLogout,
  onPreviewSkeletons,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [driveModalOpen, setDriveModalOpen] = useState<boolean>(false);
  const [driveCallback, setDriveCallback] = useState<((video: VideoItem) => void) | null>(null);
  const [simulateTabSkeleton, setSimulateTabSkeleton] = useState<boolean>(false);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects & Cuts', icon: Film, badge: data.projects.length },
    { id: 'media', label: 'Universal Media', icon: HardDrive, badge: data.media?.length },
    { id: 'brand', label: 'Brand & Studio Theme', icon: Palette },
    { id: 'inquiries', label: 'Inquiries Inbox', icon: Send, badge: data.inquiries.filter((i) => i.status === 'new').length || undefined },
    { id: 'analytics', label: 'Analytics & Logs', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations & Providers', icon: Globe },
    { id: 'services', label: 'Capabilities & Pipeline', icon: Sliders },
    { id: 'pricing', label: 'Pricing & Packages', icon: Tag, badge: data.pricing?.packages?.length },
    { id: 'testimonials', label: 'Client Reviews', icon: Star },
    { id: 'socials', label: 'Social Channels', icon: Share2 },
    { id: 'contact', label: 'Booking Form', icon: SlidersHorizontal },
    { id: 'docs', label: 'Platform Architecture', icon: BookOpen },
  ];

  const handleSavePartial = (key: keyof AdminData, value: any) => {
    const updated = { ...data, [key]: value };
    onUpdateData(updated);
  };

  const handleOpenDriveForProject = (callback: (video: VideoItem) => void) => {
    setDriveCallback(() => callback);
    setDriveModalOpen(true);
  };

  // Media Handlers
  const handleAddMedia = (newAsset: Partial<MediaAsset>) => {
    const asset: MediaAsset = {
      id: newAsset.id || `med-${Date.now()}`,
      name: newAsset.name || 'Untitled Video',
      title: newAsset.title || newAsset.name || 'Untitled Video',
      filename: newAsset.filename,
      playbackUrl: newAsset.playbackUrl || '',
      sourceUrl: newAsset.sourceUrl,
      thumbnailUrl: newAsset.thumbnailUrl,
      type: newAsset.type || 'video',
      provider: newAsset.provider || 'direct_upload',
      aspectRatio: newAsset.aspectRatio || '16:9',
      orientation: newAsset.orientation || 'landscape',
      duration: newAsset.duration || '01:00',
      size: newAsset.size || '30 MB',
      status: newAsset.status || 'healthy',
      visibility: newAsset.visibility || 'public',
      createdAt: new Date().toISOString().split('T')[0],
      lastHealthCheck: new Date().toISOString(),
    };

    const updatedMedia = [asset, ...(data.media || [])];
    handleSavePartial('media', updatedMedia);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Are you sure you want to remove this media asset from the library?')) {
      const updatedMedia = (data.media || []).filter((m) => m.id !== id);
      handleSavePartial('media', updatedMedia);
    }
  };

  const handleHealthCheckMedia = (id: string) => {
    const updatedMedia = (data.media || []).map((m) => {
      if (m.id === id) {
        return {
          ...m,
          status: m.playbackUrl ? ('healthy' as const) : ('broken' as const),
          lastHealthCheck: new Date().toISOString(),
        };
      }
      return m;
    });
    handleSavePartial('media', updatedMedia);
  };

  const handleHealthCheckAll = () => {
    const updatedMedia = (data.media || []).map((m) => ({
      ...m,
      status: m.playbackUrl ? ('healthy' as const) : ('broken' as const),
      lastHealthCheck: new Date().toISOString(),
    }));
    handleSavePartial('media', updatedMedia);
  };

  const handleImportDriveFile = (driveFile: GoogleDriveFile) => {
    const isVertical = driveFile.name.toLowerCase().includes('9x16') || driveFile.name.toLowerCase().includes('vertical');
    const isSquare = driveFile.name.toLowerCase().includes('1x1') || driveFile.name.toLowerCase().includes('square');
    const orientation = isVertical ? 'portrait' : isSquare ? 'square' : 'landscape';
    const aspectRatio = isVertical ? '9:16' : isSquare ? '1:1' : '16:9';

    const newMedia: MediaAsset = {
      id: `med-drv-${Date.now()}`,
      name: driveFile.name,
      title: driveFile.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      filename: driveFile.name,
      playbackUrl: driveFile.webContentLink || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      sourceUrl: driveFile.webViewLink,
      thumbnailUrl: driveFile.thumbnailLink,
      type: 'video',
      provider: 'google_drive',
      providerAssetId: driveFile.id,
      mimeType: driveFile.mimeType,
      size: driveFile.size || 'Stream',
      duration: '01:15',
      aspectRatio,
      orientation,
      status: 'healthy',
      visibility: 'public',
      createdAt: new Date().toISOString().split('T')[0],
      lastHealthCheck: new Date().toISOString(),
    };

    const updatedMedia = [newMedia, ...(data.media || [])];
    handleSavePartial('media', updatedMedia);

    if (driveCallback) {
      driveCallback({
        id: `vid-${Date.now()}`,
        title: newMedia.title || newMedia.name,
        provider: 'google_drive',
        providerIdOrUrl: newMedia.playbackUrl,
        orientation,
        aspectRatio,
        thumbnailUrl: newMedia.thumbnailUrl,
        driveFileId: driveFile.id,
        mediaAssetId: newMedia.id,
        status: 'healthy',
      });
      setDriveCallback(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col font-mono text-xs">
      {/* Top Navigation Header */}
      <header id="admin-header" role="banner" className="sticky top-0 z-40 bg-[#0e0e12]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff3b00] text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(255,59,0,0.5)]">
            EKO
          </div>
          <div>
            <div className="font-heading font-black text-sm text-white tracking-wide flex items-center gap-1.5">
              <span>{data.brand.brandName}</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-[#ff3b00] font-bold">CMS</span>
            </div>
            <div className="text-[10px] text-white/40">Portfolio Administration Portal</div>
          </div>
        </div>

        {/* Action Controls on Header */}
        <div className="flex items-center gap-2.5">
          <button
            id="admin-preview-tab-skeleton-btn"
            type="button"
            onClick={() => setSimulateTabSkeleton((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-mono font-bold ${
              simulateTabSkeleton
                ? 'bg-[#ff3b00] text-white shadow-[0_0_12px_rgba(255,59,0,0.5)]'
                : 'bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30'
            }`}
            title="Toggle Skeleton Loader for Current Tab"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {simulateTabSkeleton ? 'EXIT SKELETON' : 'TAB SKELETON'}
            </span>
          </button>

          {onPreviewSkeletons && (
            <button
              id="admin-preview-skeletons-btn"
              type="button"
              onClick={onPreviewSkeletons}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg transition-colors cursor-pointer text-xs font-mono font-bold"
              title="Test Full Public Portfolio Skeleton Loader"
            >
              <Eye className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span className="hidden lg:inline">PUBLIC SKELETON</span>
            </button>
          )}

          <button
            id="admin-view-site-btn"
            type="button"
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/10 rounded-lg transition-colors cursor-pointer"
            title="Preview Public Website"
          >
            <Eye className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="hidden sm:inline">VIEW PUBLIC SITE</span>
          </button>

          <button
            id="admin-reset-demo-btn"
            type="button"
            onClick={() => {
              if (confirm('Reset entire platform back to default demo projects and media assets?')) {
                onResetDemoData();
              }
            }}
            className="p-2 text-white/40 hover:text-white bg-[#1a1a20] rounded-lg border border-white/10 transition-colors cursor-pointer"
            title="Reset Default Demo Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            id="admin-logout-btn"
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors cursor-pointer"
            title="Log Out of CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOG OUT</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar on left + Content area on right */}
      <div id="admin-layout-root" className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside id="admin-sidebar" aria-label="CMS Administration Sections" className="w-full md:w-64 bg-[#0e0e12] border-r border-white/10 p-4 space-y-1.5 flex-shrink-0">
          <div className="text-[10px] font-bold text-white/40 uppercase px-2 mb-2 tracking-wider">
            PORTFOLIO ENGINE
          </div>

          <nav aria-label="Admin Navigation Menu">
            <ul role="list" className="space-y-1 list-none p-0 m-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      id={`admin-tab-btn-${item.id}`}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#ff3b00] text-white font-bold shadow-md'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content Pane */}
        <main id="admin-main-content" className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-6xl mx-auto w-full">
          {simulateTabSkeleton ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#ff3b00]/10 border border-[#ff3b00]/30 font-mono text-xs text-[#ff3b00]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff3b00] animate-pulse" />
                  PREVIEWING SKELETON LOADER FOR: <strong className="text-white uppercase">{activeTab}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSimulateTabSkeleton(false)}
                  className="px-2 py-1 rounded bg-[#ff3b00] text-white font-bold hover:bg-[#ff5500] cursor-pointer"
                >
                  DISMISS
                </button>
              </div>

              {activeTab === 'overview' && <AdminOverviewSkeleton />}
              {activeTab === 'projects' && <AdminProjectsSkeleton />}
              {activeTab === 'media' && <AdminMediaLibrarySkeleton />}
              {activeTab === 'brand' && <AdminBrandStudioSkeleton />}
              {activeTab === 'inquiries' && <AdminInquiriesSkeleton />}
              {activeTab === 'analytics' && <AdminAnalyticsSkeleton />}
              {activeTab === 'integrations' && <AdminIntegrationsSkeleton />}
              {activeTab === 'services' && <AdminServicesSkeleton />}
              {activeTab === 'pricing' && <AdminPricingSkeleton />}
              {activeTab === 'testimonials' && <AdminTestimonialsSkeleton />}
              {activeTab === 'socials' && <AdminSocialsSkeleton />}
              {activeTab === 'contact' && <AdminContactSkeleton />}
              {activeTab === 'docs' && <AdminDocsSkeleton />}
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewTab
                  data={data}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenUpload={() => setActiveTab('media')}
                  onOpenDrive={() => setDriveModalOpen(true)}
                  onHealthCheckAll={handleHealthCheckAll}
                  onPreviewPortfolio={onExitAdmin}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsTab
                  projects={data.projects}
                  media={data.media}
                  onSaveProjects={(projs) => handleSavePartial('projects', projs)}
                  onOpenDriveForVideo={(cb) => handleOpenDriveForProject(cb)}
                />
              )}

              {activeTab === 'media' && (
                <MediaLibraryTab
                  media={data.media || []}
                  onAddMedia={handleAddMedia}
                  onDeleteMedia={handleDeleteMedia}
                  onHealthCheckMedia={handleHealthCheckMedia}
                  onHealthCheckAll={handleHealthCheckAll}
                  onOpenDriveModal={() => setDriveModalOpen(true)}
                />
              )}

              {activeTab === 'brand' && (
                <BrandStudioTab
                  brand={data.brand}
                  onSaveBrand={(brand) => handleSavePartial('brand', brand)}
                  onOpenDriveForVideo={(cb) => handleOpenDriveForProject(cb)}
                />
              )}

              {activeTab === 'inquiries' && (
                <InquiriesTab
                  inquiries={data.inquiries}
                  onUpdateInquiries={(inqs) => handleSavePartial('inquiries', inqs)}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsTab
                  analytics={data.analytics}
                  projects={data.projects}
                />
              )}

              {activeTab === 'integrations' && (
                <IntegrationsTab
                  data={data}
                  onUpdateDriveConfig={(cfg) => handleSavePartial('driveConfig', cfg)}
                  onUpdateWordpressConfig={(cfg) => handleSavePartial('wordpressConfig', cfg)}
                  onUpdateStreamingConfig={(cfg) => handleSavePartial('streamingConfig', cfg)}
                  onOpenDriveModal={() => setDriveModalOpen(true)}
                />
              )}

              {activeTab === 'services' && (
                <ServicesTab
                  services={data.services}
                  onSaveServices={(srv) => handleSavePartial('services', srv)}
                />
              )}

              {activeTab === 'pricing' && data.pricing && (
                <PricingTab
                  pricing={data.pricing}
                  onUpdate={(pricingCfg) => handleSavePartial('pricing', pricingCfg)}
                />
              )}

              {activeTab === 'testimonials' && (
                <TestimonialsTab
                  testimonials={data.testimonials}
                  onSaveTestimonials={(tests) => handleSavePartial('testimonials', tests)}
                />
              )}

              {activeTab === 'socials' && (
                <SocialLinksTab
                  socialLinks={data.socialLinks}
                  onSaveSocialLinks={(soc) => handleSavePartial('socialLinks', soc)}
                />
              )}

              {activeTab === 'contact' && (
                <ContactSettingsTab
                  contactConfig={data.contactConfig}
                  onSaveContactConfig={(cfg) => handleSavePartial('contactConfig', cfg)}
                />
              )}

              {activeTab === 'docs' && <DocumentationViewer />}
            </>
          )}
        </main>
      </div>

      {/* Google Drive Ingestion Modal */}
      <GoogleDriveModal
        isOpen={driveModalOpen}
        onClose={() => {
          setDriveModalOpen(false);
          setDriveCallback(null);
        }}
        onImportDriveFile={handleImportDriveFile}
        userEmail={data.driveConfig?.userEmail}
        connected={Boolean(data.driveConfig?.connected)}
      />
    </div>
  );
};
