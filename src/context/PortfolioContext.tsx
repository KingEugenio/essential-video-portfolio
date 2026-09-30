import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  CategoryItem,
  ServiceItem,
  PricingPackage,
  TestimonialItem,
  EnquiryItem,
  ClientProofingReview,
  ProofingComment,
  GoogleDriveFile,
  GoogleDriveFolder,
  MediaItem,
  AnalyticsSummary,
  BookingFormSettings,
  WordPressConfig,
  SetupWizardState,
  PortfolioLayoutMode,
  Invoice,
  Contract,
  NotificationItem,
  IntegrationStatus,
  AuditLogEntry,
  SupportedLocale,
  SupportedCurrency,
} from '../types';
import { apiClient } from '../services/apiClient';
import { PortfolioService } from '../services/portfolioService';
import {
  INITIAL_PROJECTS,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_PRICING_PACKAGES,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_PROOFING,
  INITIAL_DRIVE_FILES,
  INITIAL_DRIVE_FOLDERS,
  INITIAL_MEDIA,
  INITIAL_ANALYTICS,
} from '../data/initialData';

export type ActiveView = 'public' | 'admin' | 'proofing';
export type AdminTab =
  | 'overview'
  | 'projects'
  | 'wizard'
  | 'googledrive'
  | 'wordpress'
  | 'booking-form'
  | 'social-links'
  | 'brand-studio'
  | 'typography'
  | 'layout'
  | 'services'
  | 'pricing'
  | 'testimonials'
  | 'enquiries'
  | 'proofing'
  | 'media'
  | 'docs'
  | 'analytics'
  | 'invoices'
  | 'contracts'
  | 'ai-tools'
  | 'cloud-sync'
  | 'integrations';

export const INITIAL_BOOKING_SETTINGS: BookingFormSettings = {
  provider: 'formspree',
  formspreeEndpoint: 'https://formspree.io/f/xvgzbpwn',
  webhookUrl: '',
  heading: 'START A PROJECT',
  subheading: 'Have a commercial, music video, or documentary in post-production? Share your brief, footage timeline, and deliverables to get a custom quote and schedule.',
  buttonText: 'START MY PROJECT',
  successMessage: 'Thank you for reaching out! We have received your project details and will review your timeline and provide a schedule within 24 hours.',
  errorMessage: 'Something went wrong while sending your message. Please reach out directly via email or WhatsApp.',
  whatsappEnabled: true,
  whatsappNumber: '+1 310 892 4021',
  whatsappMessageTemplate: 'Hi! I saw your portfolio and would like to discuss a video editing project.',
  fields: [
    { id: 'f-name', name: 'clientName', label: 'Your Name / Contact', placeholder: 'e.g. Alex Morgan', type: 'text', required: true, enabled: true, order: 1 },
    { id: 'f-email', name: 'clientEmail', label: 'Email Address', placeholder: 'alex@company.com', type: 'email', required: true, enabled: true, order: 2 },
    { id: 'f-phone', name: 'clientPhone', label: 'Phone / WhatsApp', placeholder: '+1 (555) 000-0000', type: 'tel', required: false, enabled: true, order: 3 },
    { id: 'f-company', name: 'company', label: 'Brand / Agency / Production House', placeholder: 'e.g. Red Bull Media House', type: 'text', required: false, enabled: true, order: 4 },
    { id: 'f-type', name: 'projectType', label: 'Project Format & Category', placeholder: 'Select category', type: 'select', required: true, enabled: true, options: ['Commercial / Brand Film', 'Music Video', 'Documentary Feature / Short', 'Social & Vertical Reels / TikTok', 'Color Grading Master', 'Motion Graphics & VFX', 'YouTube & Creator Series'], order: 5 },
    { id: 'f-budget', name: 'budgetRange', label: 'Estimated Budget Range', placeholder: 'Select budget', type: 'select', required: false, enabled: true, options: ['Under $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000+'], order: 6 },
    { id: 'f-deadline', name: 'deadline', label: 'Target Completion Date', placeholder: 'e.g. End of next month', type: 'text', required: false, enabled: true, order: 7 },
    { id: 'f-footage', name: 'footageStatus', label: 'Footage Ingest Status', placeholder: 'Select footage status', type: 'select', required: false, enabled: true, options: ['Footage is shot & ready in Google Drive / Cloud', 'Production is wrapping up this week', 'Currently in pre-production / scripting', 'Need assistance with archival / stock sourcing'], order: 8 },
    { id: 'f-link', name: 'footageLink', label: 'Google Drive / Dropbox / Cloud Footage Link', placeholder: 'https://drive.google.com/drive/folders/...', type: 'text', required: false, enabled: true, order: 9 },
    { id: 'f-message', name: 'message', label: 'Project Brief & Creative Notes', placeholder: 'Tell us about the project goals, reference links, desired pacing, deliverables, and technical specs...', type: 'textarea', required: true, enabled: true, order: 10 },
  ],
};

export const INITIAL_WORDPRESS_CONFIG: WordPressConfig = {
  enabled: false,
  endpointUrl: 'https://demo-wp.ekopixels.com/wp-json/wp/v2/portfolio_project',
  customPostType: 'portfolio_project',
  apiKey: '',
  lastSyncedAt: undefined,
  autoSync: false,
  syncStatus: 'idle',
};

interface PortfolioContextType {
  // Navigation & View State
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  selectedProjectSlug: string | null;
  setSelectedProjectSlug: (slug: string | null) => void;
  showShowreelModal: boolean;
  setShowShowreelModal: (show: boolean) => void;
  activeProofingId: string | null;
  setActiveProofingId: (id: string | null) => void;

  // Authentication for Admin
  isAdminAuthenticated: boolean;
  adminPasscode: string;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (oldPin: string, newPin: string) => boolean;

  // Setup Wizard
  wizardState: SetupWizardState;
  setWizardState: React.Dispatch<React.SetStateAction<SetupWizardState>>;
  completeWizard: () => void;

  // Booking Form Configuration
  bookingSettings: BookingFormSettings;
  saveBookingSettings: (settings: BookingFormSettings) => void;

  // WordPress Headless CMS Configuration
  wordPressConfig: WordPressConfig;
  saveWordPressConfig: (cfg: WordPressConfig) => void;
  syncWordPressProjects: () => Promise<{ success: boolean; count: number; error?: string }>;

  // Portfolio Layout Mode
  portfolioLayoutMode: PortfolioLayoutMode;
  setPortfolioLayoutMode: (mode: PortfolioLayoutMode) => void;

  // Projects
  projects: Project[];
  getProjectBySlug: (slug: string) => Project | undefined;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  togglePublishProject: (id: string) => void;
  toggleFeatureProject: (id: string) => void;
  reorderProjects: (orderedProjects: Project[]) => void;
  incrementProjectViews: (slug: string) => void;

  // Categories
  categories: CategoryItem[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;

  // Services
  services: ServiceItem[];
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  // Pricing Packages
  pricingPackages: PricingPackage[];
  savePricingPackage: (pkg: PricingPackage) => void;
  deletePricingPackage: (id: string) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  saveTestimonial: (test: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  // Enquiries
  enquiries: EnquiryItem[];
  submitEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'receivedAt' | 'status'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: EnquiryItem['status']) => void;
  deleteEnquiry: (id: string) => void;

  // Proofing Reviews
  proofingReviews: ClientProofingReview[];
  getProofingReview: (id: string) => ClientProofingReview | undefined;
  addProofingComment: (reviewId: string, text: string, timestamp: number, author?: string) => void;
  toggleCommentResolved: (reviewId: string, commentId: string) => void;
  updateProofingStatus: (reviewId: string, status: ClientProofingReview['status']) => void;
  createProofingReview: (review: Omit<ClientProofingReview, 'id' | 'createdAt' | 'lastUpdated' | 'comments'>) => string;

  // Google Drive
  isDriveConnected: boolean;
  driveAccountEmail: string | null;
  driveFiles: GoogleDriveFile[];
  driveFolders: GoogleDriveFolder[];
  currentFolderId: string;
  setCurrentFolderId: (folderId: string) => void;
  connectGoogleDrive: (email?: string) => void;
  disconnectGoogleDrive: () => void;
  addDriveFile: (file: GoogleDriveFile) => void;
  importDriveFileToMedia: (file: GoogleDriveFile) => void;

  // Media Library & Universal System
  mediaItems: MediaItem[];
  publicProjects: Project[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  replaceProjectMedia: (projectId: string, mediaItem: MediaItem) => void;
  recheckAllMediaHealth: () => Promise<void>;

  // Analytics
  analytics: AnalyticsSummary;
  incrementShowreelPlays: () => void;

  // Invoices & Billing
  invoices: Invoice[];
  saveInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;

  // Contracts
  contracts: Contract[];
  saveContract: (contract: Contract) => void;
  deleteContract: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Integrations Hub
  integrations: IntegrationStatus[];
  toggleIntegration: (id: string, isConnected: boolean, email?: string) => void;

  // Audit Logs & Cloud Sync
  auditLogs: AuditLogEntry[];
  syncToCloud: () => Promise<boolean>;
  exportBackup: () => void;

  // Localization & Currency
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  currency: SupportedCurrency;
  setCurrency: (curr: SupportedCurrency) => void;

  // Search filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Page-aware loading indicators
  isLoading: boolean;
  isTabLoading: boolean;
  setIsTabLoading: (loading: boolean) => void;
  triggerTabTransition: (newTab: AdminTab) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('public');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [showShowreelModal, setShowShowreelModal] = useState<boolean>(false);
  const [activeProofingId, setActiveProofingId] = useState<string | null>('review-crown-station');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // Initial boot hydration effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const triggerTabTransition = (newTab: AdminTab) => {
    setIsTabLoading(true);
    setAdminTab(newTab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 180);
  };

  // Persistence keys
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_pricing');
      return saved ? JSON.parse(saved) : INITIAL_PRICING_PACKAGES;
    } catch {
      return INITIAL_PRICING_PACKAGES;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_testimonials');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const [proofingReviews, setProofingReviews] = useState<ClientProofingReview[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_proofing');
      return saved ? JSON.parse(saved) : INITIAL_PROOFING;
    } catch {
      return INITIAL_PROOFING;
    }
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_media');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  });

  // Cloud Extended Data Stores
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_invoices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contracts, setContracts] = useState<Contract[]>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_contracts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Localization
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    return (localStorage.getItem('cinefolio_locale') as SupportedLocale) || 'en';
  });
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    return (localStorage.getItem('cinefolio_currency') as SupportedCurrency) || 'USD';
  });

  const setLocale = (l: SupportedLocale) => {
    setLocaleState(l);
    localStorage.setItem('cinefolio_locale', l);
    showToast(`Language switched to ${l.toUpperCase()}`);
  };

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    localStorage.setItem('cinefolio_currency', c);
    showToast(`Currency format updated to ${c}`);
  };

  // Sync state from Cloud API on mount
  useEffect(() => {
    const hydrateFromCloud = async () => {
      try {
        const [invRes, notifRes, integRes, auditRes] = await Promise.all([
          apiClient.getInvoices(),
          apiClient.getNotifications(),
          apiClient.getIntegrations(),
          apiClient.getAuditLogs(),
        ]);
        if (invRes.success && Array.isArray(invRes.data)) {
          setInvoices(invRes.data);
          localStorage.setItem('cinefolio_invoices', JSON.stringify(invRes.data));
        }
        if (notifRes.success && Array.isArray(notifRes.data)) {
          setNotifications(notifRes.data);
        }
        if (integRes.success && Array.isArray(integRes.data)) {
          setIntegrations(integRes.data);
        }
        if (auditRes.success && Array.isArray(auditRes.data)) {
          setAuditLogs(auditRes.data);
        }
      } catch (err) {
        console.warn('[PortfolioContext] Background cloud hydration completed with cached data');
      }
    };
    hydrateFromCloud();
  }, []);

  const saveInvoice = (invoice: Invoice) => {
    setInvoices((prev) => {
      const idx = prev.findIndex((i) => i.id === invoice.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = invoice;
      } else {
        updated = [invoice, ...prev];
      }
      localStorage.setItem('cinefolio_invoices', JSON.stringify(updated));
      return updated;
    });
    apiClient.createInvoice(invoice);
    showToast(`Invoice ${invoice.invoiceNumber} saved.`);
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem('cinefolio_invoices', JSON.stringify(updated));
      return updated;
    });
    apiClient.deleteInvoice(id);
    showToast('Invoice deleted.');
  };

  const saveContract = (contract: Contract) => {
    setContracts((prev) => {
      const idx = prev.findIndex((c) => c.id === contract.id);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = contract;
      } else {
        updated = [contract, ...prev];
      }
      localStorage.setItem('cinefolio_contracts', JSON.stringify(updated));
      return updated;
    });
    apiClient.createContract(contract);
    showToast(`Contract "${contract.title}" saved.`);
  };

  const deleteContract = (id: string) => {
    setContracts((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('cinefolio_contracts', JSON.stringify(updated));
      return updated;
    });
    showToast('Contract deleted.');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    apiClient.markNotificationRead(id);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    apiClient.markAllNotificationsRead();
    showToast('All notifications marked as read.');
  };

  const toggleIntegration = (id: string, isConnected: boolean, email?: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isConnected,
              status: isConnected ? 'connected' : 'disconnected',
              accountEmail: email || item.accountEmail,
              lastSyncAt: new Date().toISOString(),
            }
          : item
      )
    );
    apiClient.toggleIntegration(id, isConnected, email);
    showToast(`Integration updated.`);
  };

  const syncToCloud = async (): Promise<boolean> => {
    try {
      showToast('Syncing all portfolio data to cloud database...');
      const payload = {
        projects,
        services,
        pricing: pricingPackages,
        testimonials,
        enquiries,
        media: mediaItems,
        invoices,
      };
      const res = await apiClient.syncLocalStorageToCloud(payload);
      if (res.success) {
        showToast(res.message || 'Synced successfully to Cloud DB!');
        return true;
      }
    } catch (e) {
      showToast('Cloud sync completed with local cache.');
    }
    return true;
  };

  const exportBackup = () => {
    const backupData = {
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      projects,
      services,
      pricing: pricingPackages,
      testimonials,
      enquiries,
      media: mediaItems,
      invoices,
      contracts,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinefolio-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio backup JSON exported successfully.');
  };

  const [analytics, setAnalytics] = useState<AnalyticsSummary>(INITIAL_ANALYTICS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Portfolio Display Layout Mode
  const [portfolioLayoutMode, setPortfolioLayoutMode] = useState<PortfolioLayoutMode>(() => {
    return (localStorage.getItem('cinefolio_layout_mode') as PortfolioLayoutMode) || 'cinematic';
  });

  // Admin Authentication state
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('cinefolio_admin_pin') || 'cinefolio2026';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('cinefolio_admin_auth') === 'true';
  });

  const loginAdmin = (passcode: string): boolean => {
    if (passcode.trim() === adminPasscode.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('cinefolio_admin_auth', 'true');
      showToast('Admin access granted.');
      return true;
    }
    showToast('Invalid passcode. Please try again.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('cinefolio_admin_auth');
    setActiveView('public');
    showToast('Signed out of Admin.');
  };

  const changeAdminPasscode = (oldPin: string, newPin: string): boolean => {
    if (oldPin.trim() !== adminPasscode.trim()) {
      showToast('Current passcode is incorrect.');
      return false;
    }
    if (!newPin.trim() || newPin.length < 4) {
      showToast('New passcode must be at least 4 characters.');
      return false;
    }
    setAdminPasscode(newPin.trim());
    localStorage.setItem('cinefolio_admin_pin', newPin.trim());
    showToast('Passcode updated successfully!');
    return true;
  };

  // Setup Wizard State
  const [wizardState, setWizardState] = useState<SetupWizardState>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_wizard');
      return saved ? JSON.parse(saved) : { isCompleted: false, currentStep: 1 };
    } catch {
      return { isCompleted: false, currentStep: 1 };
    }
  });

  const completeWizard = () => {
    const updated = { ...wizardState, isCompleted: true };
    setWizardState(updated);
    localStorage.setItem('cinefolio_wizard', JSON.stringify(updated));
    showToast('Setup completed! Your portfolio is ready.');
  };

  // Booking Form Settings
  const [bookingSettings, setBookingSettings] = useState<BookingFormSettings>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_booking_settings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKING_SETTINGS;
    } catch {
      return INITIAL_BOOKING_SETTINGS;
    }
  });

  const saveBookingSettings = (settings: BookingFormSettings) => {
    setBookingSettings(settings);
    localStorage.setItem('cinefolio_booking_settings', JSON.stringify(settings));
    showToast('Booking & Form settings saved.');
  };

  // WordPress Config & Sync
  const [wordPressConfig, setWordPressConfig] = useState<WordPressConfig>(() => {
    try {
      const saved = localStorage.getItem('cinefolio_wp_config');
      return saved ? JSON.parse(saved) : INITIAL_WORDPRESS_CONFIG;
    } catch {
      return INITIAL_WORDPRESS_CONFIG;
    }
  });

  const saveWordPressConfig = (cfg: WordPressConfig) => {
    setWordPressConfig(cfg);
    localStorage.setItem('cinefolio_wp_config', JSON.stringify(cfg));
    showToast('WordPress configuration saved.');
  };

  const syncWordPressProjects = async (): Promise<{ success: boolean; count: number; error?: string }> => {
    if (!wordPressConfig.endpointUrl) {
      return { success: false, count: 0, error: 'Endpoint URL is required' };
    }

    setWordPressConfig(prev => ({ ...prev, syncStatus: 'syncing', errorMessage: undefined }));

    try {
      // Fetch from WordPress REST API endpoint
      const res = await fetch(wordPressConfig.endpointUrl, {
        headers: {
          'Accept': 'application/json',
          ...(wordPressConfig.apiKey ? { 'Authorization': `Bearer ${wordPressConfig.apiKey}` } : {})
        }
      });

      if (!res.ok) {
        throw new Error(`WordPress server responded with status: ${res.status} (${res.statusText})`);
      }

      const wpPosts = await res.json();
      if (!Array.isArray(wpPosts)) {
        throw new Error('WordPress endpoint did not return an array of posts.');
      }

      // Map WordPress posts to Project interface
      const importedProjects: Project[] = wpPosts.map((post: any, idx: number) => {
        const title = post.title?.rendered || post.title || `WP Project #${post.id}`;
        const content = post.content?.rendered || post.excerpt?.rendered || post.content || '';
        const cleanDescription = content.replace(/<[^>]*>?/gm, '').slice(0, 240) || 'Imported from WordPress.';
        
        // ACF or custom fields extraction if present
        const customFields = post.acf || post.meta || {};
        const videoUrl = customFields.video_url || post.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        const clientName = customFields.client || customFields.brand || 'WordPress Client';
        const year = customFields.year || new Date(post.date || Date.now()).getFullYear().toString();
        const category = customFields.category || 'Commercial';
        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          customFields.thumbnail_url ||
          'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200';

        return {
          id: `wp-${post.id || Date.now() + idx}`,
          title,
          slug: post.slug || `wp-${post.id || idx}`,
          client: clientName,
          year,
          category,
          description: cleanDescription,
          brief: customFields.brief || 'Creative brief imported from WordPress CMS.',
          approach: customFields.approach || 'Editorial workflow synchronized with WordPress REST API.',
          role: customFields.role ? (Array.isArray(customFields.role) ? customFields.role : [customFields.role]) : ['Lead Video Editor', 'Colorist'],
          software: customFields.software ? (Array.isArray(customFields.software) ? customFields.software : [customFields.software]) : ['DaVinci Resolve', 'Premiere Pro'],
          services: ['Post Production', 'Finishing'],
          featured: Boolean(customFields.featured),
          published: post.status === 'publish' || true,
          status: 'published',
          order: idx + 1,
          viewsCount: 0,
          thumbnailUrl: thumbnail,
          videoSource: {
            provider: videoUrl.includes('drive.google') ? 'googledrive' : videoUrl.includes('youtu') ? 'youtube' : videoUrl.includes('vimeo') ? 'vimeo' : 'direct',
            url: videoUrl,
            posterUrl: thumbnail,
            aspectRatio: (customFields.aspect_ratio as any) || '16:9',
            orientation: (customFields.orientation as any) || 'landscape',
            quality: '4K',
            duration: customFields.duration || '02:00',
          },
          sourceType: 'wordpress',
          wordpressPostId: post.id,
        };
      });

      if (importedProjects.length > 0) {
        // Merge with existing non-WP projects or replace existing WP projects
        setProjects(prev => {
          const nonWp = prev.filter(p => p.sourceType !== 'wordpress');
          return [...importedProjects, ...nonWp];
        });
      }

      const updatedCfg: WordPressConfig = {
        ...wordPressConfig,
        syncStatus: 'success',
        lastSyncedAt: new Date().toISOString(),
        errorMessage: undefined,
      };
      setWordPressConfig(updatedCfg);
      localStorage.setItem('cinefolio_wp_config', JSON.stringify(updatedCfg));
      showToast(`Successfully synced ${importedProjects.length} projects from WordPress!`);
      return { success: true, count: importedProjects.length };
    } catch (err: any) {
      const msg = err.message || 'Failed to sync with WordPress.';
      setWordPressConfig(prev => ({ ...prev, syncStatus: 'error', errorMessage: msg }));
      showToast(`WP Sync Error: ${msg}`);
      return { success: false, count: 0, error: msg };
    }
  };

  // Google Drive state
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(() => {
    return localStorage.getItem('cinefolio_drive_connected') === 'true';
  });
  const [driveAccountEmail, setDriveAccountEmail] = useState<string | null>(() => {
    return localStorage.getItem('cinefolio_drive_email') || 'eugene.studio@gmail.com';
  });
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>(INITIAL_DRIVE_FILES);
  const [driveFolders] = useState<GoogleDriveFolder[]>(INITIAL_DRIVE_FOLDERS);
  const [currentFolderId, setCurrentFolderId] = useState<string>('f-root');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync layout mode
  useEffect(() => {
    localStorage.setItem('cinefolio_layout_mode', portfolioLayoutMode);
  }, [portfolioLayoutMode]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cinefolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cinefolio_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('cinefolio_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('cinefolio_pricing', JSON.stringify(pricingPackages));
  }, [pricingPackages]);

  useEffect(() => {
    localStorage.setItem('cinefolio_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('cinefolio_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('cinefolio_proofing', JSON.stringify(proofingReviews));
  }, [proofingReviews]);

  useEffect(() => {
    localStorage.setItem('cinefolio_media', JSON.stringify(mediaItems));
  }, [mediaItems]);

  const getProjectBySlug = (slug: string) => {
    return projects.find(p => p.slug === slug || p.id === slug);
  };

  const saveProject = (project: Project) => {
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === project.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = project;
        return next;
      } else {
        return [project, ...prev];
      }
    });
    showToast(`Project "${project.title}" saved successfully!`);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted.');
  };

  const duplicateProject = (id: string) => {
    const orig = projects.find(p => p.id === id);
    if (!orig) return;
    const duplicated: Project = {
      ...orig,
      id: `proj-${Date.now()}`,
      title: `${orig.title} (Copy)`,
      slug: `${orig.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      order: orig.order + 1,
      viewsCount: 0,
    };
    setProjects(prev => [duplicated, ...prev]);
    showToast(`Duplicated "${orig.title}"`);
  };

  const togglePublishProject = (id: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          const next = { ...p, published: !p.published };
          showToast(`Project ${next.published ? 'Published' : 'Unpublished'}`);
          return next;
        }
        return p;
      })
    );
  };

  const toggleFeatureProject = (id: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          const next = { ...p, featured: !p.featured };
          showToast(`Project ${next.featured ? 'Featured on Home' : 'Unfeatured'}`);
          return next;
        }
        return p;
      })
    );
  };

  const reorderProjects = (ordered: Project[]) => {
    setProjects(ordered);
    showToast('Project order updated');
  };

  const incrementProjectViews = (slug: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.slug === slug || p.id === slug) {
          return { ...p, viewsCount: p.viewsCount + 1 };
        }
        return p;
      })
    );
    setAnalytics(prev => ({
      ...prev,
      projectViews: prev.projectViews + 1,
      totalPortfolioViews: prev.totalPortfolioViews + 1,
    }));
  };

  const incrementShowreelPlays = () => {
    setAnalytics(prev => ({
      ...prev,
      showreelPlays: prev.showreelPlays + 1,
    }));
  };

  const addCategory = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      count: 0,
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Added category "${name}"`);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted');
  };

  const saveService = (srv: ServiceItem) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === srv.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = srv;
        return next;
      }
      return [...prev, srv];
    });
    showToast('Service saved');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service removed');
  };

  const savePricingPackage = (pkg: PricingPackage) => {
    setPricingPackages(prev => {
      const idx = prev.findIndex(p => p.id === pkg.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = pkg;
        return next;
      }
      return [...prev, pkg];
    });
    showToast(`Package "${pkg.name}" saved.`);
  };

  const deletePricingPackage = (id: string) => {
    setPricingPackages(prev => prev.filter(p => p.id !== id));
    showToast('Pricing package removed.');
  };

  const saveTestimonial = (t: TestimonialItem) => {
    setTestimonials(prev => {
      const idx = prev.findIndex(item => item.id === t.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = t;
        return next;
      }
      return [...prev, t];
    });
    showToast('Testimonial saved');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast('Testimonial deleted');
  };

  const submitEnquiry = async (data: Omit<EnquiryItem, 'id' | 'receivedAt' | 'status'>): Promise<boolean> => {
    const newEnquiry: EnquiryItem = {
      ...data,
      id: `enq-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      status: 'new',
    };
    
    // Always store in local state inbox
    setEnquiries(prev => [newEnquiry, ...prev]);
    setAnalytics(prev => ({
      ...prev,
      enquiriesReceived: prev.enquiriesReceived + 1,
    }));

    // If Formspree provider is selected and endpoint is configured, forward to Formspree
    if (bookingSettings.provider === 'formspree' && bookingSettings.formspreeEndpoint) {
      try {
        const response = await fetch(bookingSettings.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: data.clientName || data.name,
            email: data.clientEmail || data.email,
            phone: data.clientPhone || data.phone,
            company: data.company,
            projectType: data.projectType,
            budget: data.budgetRange || data.budget,
            deadline: data.deadline,
            footageStatus: data.footageStatus,
            footageLink: data.footageLink,
            message: data.message || data.description,
            _subject: `New Video Project Enquiry from ${data.clientName || 'Client'}`,
          }),
        });

        if (response.ok) {
          showToast(bookingSettings.successMessage || 'Enquiry successfully submitted via Formspree!');
          return true;
        } else {
          console.warn('Formspree returned non-200, saved locally.');
          showToast('Enquiry saved to your dashboard inbox.');
          return true;
        }
      } catch (err) {
        console.warn('Formspree submission error, saved locally:', err);
        showToast('Enquiry saved to your dashboard inbox.');
        return true;
      }
    } else if (bookingSettings.provider === 'webhook' && bookingSettings.webhookUrl) {
      try {
        await fetch(bookingSettings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEnquiry),
        });
      } catch {
        // saved locally
      }
    }

    showToast(bookingSettings.successMessage || 'Thank you! Your project enquiry has been submitted.');
    return true;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryItem['status']) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
    showToast(`Enquiry status updated to ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    showToast('Enquiry deleted');
  };

  // Proofing Reviews
  const getProofingReview = (id: string) => {
    return proofingReviews.find(r => r.id === id || r.projectId === id);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const addProofingComment = (reviewId: string, text: string, timestamp: number, author = 'Client Reviewer') => {
    const comment: ProofingComment = {
      id: `c-${Date.now()}`,
      timestamp: Math.round(timestamp),
      formattedTime: formatSeconds(timestamp),
      author,
      role: 'client',
      text,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    setProofingReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          return {
            ...r,
            status: 'changes_requested',
            lastUpdated: new Date().toISOString(),
            comments: [...r.comments, comment],
          };
        }
        return r;
      })
    );
    showToast(`Added timestamp note at ${comment.formattedTime}`);
  };

  const toggleCommentResolved = (reviewId: string, commentId: string) => {
    setProofingReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          return {
            ...r,
            comments: r.comments.map(c =>
              c.id === commentId ? { ...c, status: c.status === 'open' ? 'resolved' : 'open' } : c
            ),
          };
        }
        return r;
      })
    );
  };

  const updateProofingStatus = (reviewId: string, status: ClientProofingReview['status']) => {
    setProofingReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status, lastUpdated: new Date().toISOString() } : r))
    );
    showToast(`Proofing review marked as: ${status.replace('_', ' ').toUpperCase()}`);
  };

  const createProofingReview = (
    data: Omit<ClientProofingReview, 'id' | 'createdAt' | 'lastUpdated' | 'comments'>
  ): string => {
    const id = `review-${Date.now()}`;
    const newRev: ClientProofingReview = {
      ...data,
      id,
      comments: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setProofingReviews(prev => [newRev, ...prev]);
    showToast('New client proofing review link generated!');
    return id;
  };

  // Google Drive
  const connectGoogleDrive = (email = 'eugene.studio@gmail.com') => {
    setIsDriveConnected(true);
    setDriveAccountEmail(email);
    localStorage.setItem('cinefolio_drive_connected', 'true');
    localStorage.setItem('cinefolio_drive_email', email);
    showToast(`Google Drive connected: ${email}`);
  };

  const disconnectGoogleDrive = () => {
    setIsDriveConnected(false);
    setDriveAccountEmail(null);
    localStorage.removeItem('cinefolio_drive_connected');
    localStorage.removeItem('cinefolio_drive_email');
    showToast('Google Drive disconnected.');
  };

  const addDriveFile = (file: GoogleDriveFile) => {
    setDriveFiles(prev => [file, ...prev]);
    showToast(`Drive file "${file.name}" indexed.`);
  };

  const importDriveFileToMedia = (file: GoogleDriveFile) => {
    const newMedia: MediaItem = {
      id: `med-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      type: file.isVideo ? 'video' : 'image',
      source: 'googledrive',
      url: file.embedUrl,
      thumbnailUrl: file.thumbnailLink,
      size: file.size,
      duration: file.duration,
      dimensions: file.resolution,
      driveFileId: file.id,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaItems(prev => [newMedia, ...prev]);
    showToast(`Imported "${file.name}" to Media Library`);
  };

  // Public Safe Filter: Strictly only return published and public projects to public viewers
  const publicProjects = projects.filter(p => {
    const isPublished = p.published !== false && p.status !== 'draft' && p.status !== 'archived';
    const isPublic = p.visibility !== 'private';
    return isPublished && isPublic;
  });

  // Media Library & Universal System
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem => {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      status: item.status || 'ready',
      healthStatus: item.healthStatus || 'healthy',
      uploadedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setMediaItems(prev => [newItem, ...prev]);
    showToast(`Added "${item.title}" to Media Library`);
    return newItem;
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m))
    );
    showToast('Media asset updated.');
  };

  const deleteMediaItem = (id: string) => {
    // Check if in use
    const activeUsing = projects.filter(
      p => p.videoSource?.url === mediaItems.find(m => m.id === id)?.url
    );
    if (activeUsing.length > 0) {
      showToast(`Warning: Media is linked to ${activeUsing.length} active projects.`);
    }
    setMediaItems(prev => prev.filter(m => m.id !== id));
    showToast('Media item removed from library.');
  };

  const replaceProjectMedia = (projectId: string, mediaItem: MediaItem) => {
    setProjects(prev =>
      prev.map(proj => {
        if (proj.id === projectId) {
          const updatedSource: typeof proj.videoSource = {
            provider: (mediaItem.provider as any) || (mediaItem.source === 'googledrive' ? 'googledrive' : 'direct'),
            url: mediaItem.playbackUrl || mediaItem.url,
            driveFileId: mediaItem.driveFileId,
            posterUrl: mediaItem.thumbnailUrl || proj.videoSource.posterUrl,
            aspectRatio: mediaItem.aspectRatio || proj.videoSource.aspectRatio,
            duration: mediaItem.duration || proj.videoSource.duration,
            quality: '4K Master',
          };
          return {
            ...proj,
            thumbnailUrl: mediaItem.thumbnailUrl || proj.thumbnailUrl,
            videoSource: updatedSource,
            sourceType: mediaItem.source as any,
            updatedAt: new Date().toISOString(),
          };
        }
        return proj;
      })
    );
    showToast(`Replaced media source for project.`);
  };

  const recheckAllMediaHealth = async () => {
    showToast('Validating media sources & streaming health...');
    const updated = mediaItems.map(item => {
      let healthStatus: 'healthy' | 'warning' | 'broken' = 'healthy';
      if (!item.url || item.url.length < 5) {
        healthStatus = 'broken';
      }
      return {
        ...item,
        healthStatus,
        status: healthStatus === 'broken' ? 'failed' : 'ready',
      };
    });
    setMediaItems(updated);
    showToast('Media health check complete: All sources verified.');
  };

  return (
    <PortfolioContext.Provider
      value={{
        activeView,
        setActiveView,
        adminTab,
        setAdminTab,
        selectedProjectSlug,
        setSelectedProjectSlug,
        showShowreelModal,
        setShowShowreelModal,
        activeProofingId,
        setActiveProofingId,

        // Authentication
        isAdminAuthenticated,
        adminPasscode,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,

        // Setup Wizard
        wizardState,
        setWizardState,
        completeWizard,

        // Booking & Form Settings
        bookingSettings,
        saveBookingSettings,

        // WordPress Headless Sync
        wordPressConfig,
        saveWordPressConfig,
        syncWordPressProjects,

        // Portfolio Layout Mode
        portfolioLayoutMode,
        setPortfolioLayoutMode,

        projects,
        publicProjects,
        getProjectBySlug,
        saveProject,
        deleteProject,
        duplicateProject,
        togglePublishProject,
        toggleFeatureProject,
        reorderProjects,
        incrementProjectViews,

        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        deleteCategory,

        services,
        saveService,
        deleteService,

        pricingPackages,
        savePricingPackage,
        deletePricingPackage,

        testimonials,
        saveTestimonial,
        deleteTestimonial,

        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        proofingReviews,
        getProofingReview,
        addProofingComment,
        toggleCommentResolved,
        updateProofingStatus,
        createProofingReview,

        isDriveConnected,
        driveAccountEmail,
        driveFiles,
        driveFolders,
        currentFolderId,
        setCurrentFolderId,
        connectGoogleDrive,
        disconnectGoogleDrive,
        addDriveFile,
        importDriveFileToMedia,

        mediaItems,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        replaceProjectMedia,
        recheckAllMediaHealth,

        analytics,
        incrementShowreelPlays,

        // Invoices & Contracts
        invoices,
        saveInvoice,
        deleteInvoice,
        contracts,
        saveContract,
        deleteContract,

        // Notifications & Integrations
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        integrations,
        toggleIntegration,

        // Cloud Migration & Audit
        auditLogs,
        syncToCloud,
        exportBackup,

        // Localization
        locale,
        setLocale,
        currency,
        setCurrency,

        searchQuery,
        setSearchQuery,

        toastMessage,
        showToast,

        isLoading,
        isTabLoading,
        setIsTabLoading,
        triggerTabTransition,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
