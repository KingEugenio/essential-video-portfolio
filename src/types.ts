export type VideoProvider = 'direct' | 'googledrive' | 'youtube' | 'vimeo' | 'mux' | 'cloudflare_stream';
export type VideoOrientation = 'landscape' | 'portrait' | 'square' | 'custom';
export type VideoAspectRatio = '16:9' | '9:16' | '1:1' | '4:5' | '4:3' | '2.39:1' | 'custom';
export type ProjectStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type ProjectVisibility = 'public' | 'private';

export interface VideoSource {
  provider: VideoProvider;
  url: string;
  driveFileId?: string;
  embedId?: string;
  aspectRatio?: VideoAspectRatio;
  orientation?: VideoOrientation;
  duration?: string;
  posterUrl?: string;
  quality?: string;
  width?: number;
  height?: number;
}

export interface ProjectDeliverable {
  id: string;
  name: string;
  type: 'master_4k' | 'vertical_reel' | 'broadcast_cut' | 'social_teaser' | 'bts' | 'color_pass';
  mediaAssetId?: string;
  source: VideoSource;
  aspectRatio?: VideoAspectRatio;
  duration?: string;
  isPrimary?: boolean;
}

export interface ProjectVideo {
  id: string;
  title: string;
  description?: string;
  source: VideoSource;
  type: 'main' | 'supporting' | 'bts' | 'vertical_cut' | 'before_after';
  isFeatured?: boolean;
  orientation?: VideoOrientation;
  aspectRatio?: VideoAspectRatio;
  duration?: string;
  order: number;
}

export interface BeforeAfterData {
  hasBeforeAfter: boolean;
  labelBefore: string; // e.g. "LOG RAW / Before Grade"
  labelAfter: string;  // e.g. "Film Emulation / Final Grade"
  beforeUrl: string;
  afterUrl: string;
  beforeType?: 'video' | 'image';
  afterType?: 'video' | 'image';
  notes?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  type?: 'image' | 'video';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: string;
  featured: boolean;
  published: boolean;
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  order: number;
  description: string;
  brief: string;
  approach: string;
  role: string[];
  software: string[];
  services: string[];
  thumbnailUrl: string;
  videoSource: VideoSource;
  deliverables?: ProjectDeliverable[];
  videos?: ProjectVideo[];
  orientation?: VideoOrientation;
  beforeAfterData?: BeforeAfterData;
  gallery?: GalleryItem[];
  viewsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  socialPreviewUrl?: string;
  tags?: string[];
  sourceType?: 'local' | 'googledrive' | 'wordpress' | 'youtube' | 'vimeo' | 'mux';
  wordpressPostId?: number;
  scheduledAt?: string;
  archivedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormFieldConfig {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  enabled: boolean;
  options?: string[];
  order: number;
}

export type BookingFormField = FormFieldConfig;

export interface BookingFormSettings {
  provider: 'formspree' | 'custom' | 'webhook';
  formspreeEndpoint: string;
  webhookUrl?: string;
  heading: string;
  subheading: string;
  buttonText: string;
  successMessage: string;
  errorMessage?: string;
  whatsappEnabled: boolean;
  whatsappNumber: string;
  whatsappMessageTemplate?: string;
  fields: FormFieldConfig[];
}

export interface WordPressConfig {
  enabled: boolean;
  endpointUrl: string; // e.g. https://my-wp-site.com/wp-json/wp/v2/portfolio_project
  customPostType: string;
  apiKey?: string;
  lastSyncedAt?: string;
  autoSync: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  errorMessage?: string;
}

export interface SetupWizardState {
  isCompleted: boolean;
  currentStep: number;
  lastDismissedAt?: string;
}

export type PortfolioLayoutMode = 'grid' | 'masonry' | 'cinematic' | 'social' | 'mixed';

export interface ProofingComment {
  id: string;
  timestamp: number; // in seconds
  formattedTime: string; // e.g. "01:24"
  author: string;
  role: 'client' | 'editor';
  text: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface ClientProofingReview {
  id: string;
  projectId?: string;
  projectTitle: string;
  clientName: string;
  clientEmail?: string;
  passcode?: string;
  status: 'in_review' | 'changes_requested' | 'approved' | 'final_delivered';
  version?: string;
  versionName?: string;
  videoSource: VideoSource;
  comments: ProofingComment[];
  createdAt: string;
  lastUpdated: string;
}

export interface MediaItem {
  id: string;
  title: string;
  filename?: string;
  type: 'video' | 'image' | 'audio' | 'document';
  source: 'local' | 'direct' | 'googledrive' | 'cloud' | 'youtube' | 'vimeo' | 'mux';
  provider?: VideoProvider | 'mux' | 'cloudflare_stream';
  providerAssetId?: string;
  url: string;
  sourceUrl?: string;
  playbackUrl?: string;
  thumbnailUrl: string;
  size: string;
  fileSize?: string;
  mimeType?: string;
  dimensions?: string;
  width?: number;
  height?: number;
  aspectRatio?: VideoAspectRatio;
  duration?: string;
  category?: string;
  driveFileId?: string;
  uploadedAt: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'ready' | 'processing' | 'uploading' | 'failed' | 'disconnected';
  healthStatus?: 'healthy' | 'warning' | 'broken' | 'unverified';
  visibility?: 'public' | 'private';
  usedInProjectIds?: string[];
  metadata?: Record<string, any>;
}

export type MediaAsset = MediaItem;

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  modifiedTime: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
  embedUrl?: string;
  isVideo?: boolean;
  duration?: string;
  resolution?: string;
  folderId?: string;
  parentName?: string;
}

export interface GoogleDriveFolder {
  id: string;
  name: string;
  parentId?: string;
  filesCount?: number;
  itemCount?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  startingPrice?: string;
  showPrice?: boolean;
  icon: string;
  featured?: boolean;
  order?: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  slug?: string;
  price: string;
  currency: string; // e.g. "USD", "GHS", "NGN", "GBP", "EUR"
  billingPeriod?: 'project' | 'per-video' | 'per-month' | 'one-time';
  description: string;
  features: string[];
  deliverables?: string[];
  turnaround: string;
  revisions: string;
  featured: boolean;
  ctaText: string;
  badge?: string;
  order: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  avatarUrl: string;
  content?: string;
  quote?: string;
  projectTitle?: string;
  rating: number;
  published?: boolean;
  order?: number;
}

export interface EnquiryItem {
  id: string;
  name?: string;
  clientName?: string;
  email?: string;
  clientEmail?: string;
  phone?: string;
  clientPhone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  budgetRange?: string;
  deadline?: string;
  hasFootage?: 'yes' | 'no' | 'in_production';
  footageStatus?: string;
  footageLocation?: string;
  footageLink?: string;
  description?: string;
  message?: string;
  status: 'new' | 'in_discussion' | 'quoted' | 'booked' | 'archived';
  receivedAt: string;
  notes?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface SoftwareTool {
  name: string;
  category: 'NLE' | 'Color' | 'VFX' | 'Audio' | '3D' | 'Design';
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon: string;
}

export interface BrandSettings {
  brandName: string;
  professionalTitle: string;
  tagline: string;
  logoText: string;
  logoUrl?: string;
  faviconUrl?: string;
  profileImageUrl: string;
  heroVideoUrl?: string;
  bio: string;
  story: string;
  location: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  satisfiedClients: number;
  awardsWon: number;
  showStats: boolean;
  email?: string;
  contactEmail?: string;
  phone?: string;
  contactPhone?: string;
  whatsapp?: string;
  availableForHire: boolean;
  availabilityStatus: string;
  showreelTitle: string;
  showreelSource: VideoSource;
  showreelVideoUrl?: string;
  showreelPosterUrl?: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    tiktok?: string;
    linkedin?: string;
    x?: string;
    behance?: string;
    dribbble?: string;
    website?: string;
    whatsapp?: string;
  };
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    tiktok?: string;
    linkedin?: string;
    x?: string;
    behance?: string;
    dribbble?: string;
    website?: string;
    whatsapp?: string;
  };
  softwareTools?: SoftwareTool[];
  softwareStack?: SoftwareTool[];
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  button: string;
  buttonText: string;
  success: string;
  warning: string;
  error: string;
}

export interface GlassTokens {
  blur: number; // e.g. 16
  opacity: number; // e.g. 0.75
  borderOpacity: number; // e.g. 0.15
  surfaceIntensity: number; // e.g. 1
}

export interface TypographyTokens {
  headingFont: string;
  bodyFont: string;
  navFont: string;
  buttonFont: string;
  headingWeight: '300' | '400' | '500' | '600' | '700' | '800' | '900';
  bodyWeight: '300' | '400' | '500' | '600';
  headingScale: number; // 0.9 to 1.4
  bodyScale: number; // 0.9 to 1.2
  letterSpacing: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
}

export type HeroLayoutType = 'type-video' | 'fullscreen-showreel' | 'split-profile' | 'minimal-editorial';
export type PortfolioCardStyle = 'grid' | 'masonry' | 'large-feature' | 'editorial' | 'minimal';
export type NavStyle = 'floating-glass' | 'solid-top' | 'minimal-split';

export interface LayoutTokens {
  heroLayout: HeroLayoutType;
  portfolioCardStyle: PortfolioCardStyle;
  navStyle: NavStyle;
  cardRadius: number; // e.g. 12 or 16
  buttonRadius: number; // e.g. 8 or 9999
  borderThickness: number; // e.g. 2 for neo-brutalist 2px border
  shadowIntensity: 'none' | 'subtle' | 'hard' | 'brutalist';
  enableGradients: boolean;
  enableGrain: boolean;
  visibleSections: {
    hero: boolean;
    showreel: boolean;
    featured: boolean;
    showcase?: boolean;
    portfolio: boolean;
    beforeAfter: boolean;
    services: boolean;
    pricing?: boolean;
    about: boolean;
    software: boolean;
    testimonials: boolean;
    enquiry: boolean;
  };
  sectionOrder: string[];
}

export type PresetId =
  | 'electric-lime'
  | 'electric-violet'
  | 'cyber-blue'
  | 'hot-magenta'
  | 'solar-orange'
  | 'cinematic-gold'
  | 'monochrome'
  | 'cinematic'
  | 'minimal'
  | 'luxury'
  | 'modern-creative'
  | 'tech-creative'
  | 'custom';

export interface ThemeSettings {
  presetId: PresetId;
  mode: 'dark' | 'light' | 'system';
  colors: ColorTokens;
  glass: GlassTokens;
  typography: TypographyTokens;
  layout: LayoutTokens;
}

export interface AnalyticsSummary {
  totalPortfolioViews: number;
  projectViews: number;
  showreelPlays: number;
  enquiriesReceived: number;
  proofingsActive: number;
  topProjects: Array<{ title: string; views: number; slug: string }>;
  weeklyViews: Array<{ day: string; views: number }>;
}

// --------------------------------------------------------------------------
// Multi-Tenant, User & Authentication Types
// --------------------------------------------------------------------------

export type UserRole = 'PORTFOLIO_OWNER' | 'TEAM_MEMBER' | 'EDITOR' | 'CLIENT' | 'PLATFORM_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  portfolioId: string;
  createdAt: string;
}

export interface PortfolioTenant {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  customDomain?: string;
  plan: 'free' | 'creator' | 'pro' | 'studio' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// --------------------------------------------------------------------------
// Invoicing, Billing & Payment Types
// --------------------------------------------------------------------------

export type PaymentStatus = 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
export type PaymentProviderType = 'stripe' | 'paypal' | 'lemonsqueezy' | 'bank_transfer' | 'crypto';
export type SupportedCurrency = 'USD' | 'GHS' | 'NGN' | 'GBP' | 'EUR' | 'CAD';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  portfolioId: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientAddress?: string;
  items: InvoiceLineItem[];
  subtotal: number;
  taxRate: number; // percentage, e.g. 10
  taxAmount: number;
  depositAmount: number;
  total: number;
  balanceDue: number;
  currency: SupportedCurrency;
  status: PaymentStatus;
  dueDate: string;
  notes?: string;
  paymentLink?: string;
  paymentProvider?: PaymentProviderType;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Contract System
// --------------------------------------------------------------------------

export type ContractStatus = 'draft' | 'sent' | 'signed' | 'declined' | 'expired';

export interface Contract {
  id: string;
  portfolioId: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  scopeOfWork: string;
  deliverablesSummary: string;
  totalFee: number;
  currency: SupportedCurrency;
  paymentTerms: string;
  killFeePercentage?: number;
  revisionsAllowed: number;
  termsAndConditions: string;
  status: ContractStatus;
  sentAt?: string;
  signedAt?: string;
  signerIp?: string;
  signatureData?: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Centralized Notifications
// --------------------------------------------------------------------------

export type NotificationType = 'enquiry' | 'payment' | 'proofing' | 'integration' | 'system';

export interface NotificationItem {
  id: string;
  portfolioId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// --------------------------------------------------------------------------
// AI Service Types
// --------------------------------------------------------------------------

export interface AIDescriptionDraft {
  title: string;
  category: string;
  description: string;
  brief: string;
  approach: string;
  tags: string[];
  role: string[];
  software: string[];
}

export interface AISEODraft {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  socialDescription: string;
}

export interface AIBriefSummary {
  projectType: string;
  clientObjective: string;
  deliverables: string[];
  targetTimeline: string;
  budgetEstimated: string;
  keyChallenges: string[];
  suggestedQuestions: string[];
}

export interface AICaseStudyDraft {
  challenge: string;
  creativeDirection: string;
  editingTechnique: string;
  colorGradingPass: string;
  motionVfxWork: string;
  outcomeAndImpact: string;
}

// --------------------------------------------------------------------------
// Video Engagement & Privacy Analytics
// --------------------------------------------------------------------------

export type VideoAnalyticsEventType =
  | 'video_loaded'
  | 'video_started'
  | 'video_25_percent'
  | 'video_50_percent'
  | 'video_75_percent'
  | 'video_completed'
  | 'video_seek'
  | 'video_paused'
  | 'video_fullscreen';

export interface VideoEngagementRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  eventType: VideoAnalyticsEventType;
  currentTime: number;
  duration: number;
  deviceCategory: 'desktop' | 'mobile' | 'tablet';
  trafficSource: string;
  timestamp: string;
}

export interface DetailedAnalyticsReport {
  summary: AnalyticsSummary;
  totalPlays: number;
  totalCompletions: number;
  averageEngagementRate: number;
  dropOffPoints: Array<{ quartile: string; percentage: number }>;
  topPerformingVideos: Array<{
    projectId: string;
    title: string;
    views: number;
    plays: number;
    completionRate: number;
  }>;
  trafficSources: Array<{ source: string; percentage: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
}

// --------------------------------------------------------------------------
// Integration Hub
// --------------------------------------------------------------------------

export type IntegrationId = 'googledrive' | 'stripe' | 'resend' | 'gemini' | 'wordpress' | 'cloudflare_stream' | 'mux';

export interface IntegrationStatus {
  id: IntegrationId;
  name: string;
  description: string;
  category: 'Storage' | 'Payment' | 'Email' | 'AI' | 'CMS' | 'Streaming';
  isConnected: boolean;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  accountEmail?: string;
  lastSyncAt?: string;
  errorMessage?: string;
  config?: Record<string, any>;
}

// --------------------------------------------------------------------------
// Audit Logging
// --------------------------------------------------------------------------

export interface AuditLogEntry {
  id: string;
  portfolioId: string;
  actorEmail: string;
  action: string;
  entityType: 'project' | 'media' | 'invoice' | 'proofing' | 'brand' | 'auth' | 'integration';
  entityId?: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

// --------------------------------------------------------------------------
// Feature Flags
// --------------------------------------------------------------------------

export interface FeatureFlags {
  enableCloudStorage: boolean;
  enablePayments: boolean;
  enableInvoices: boolean;
  enableContracts: boolean;
  enableAiTools: boolean;
  enableProofing: boolean;
  enableAnalytics: boolean;
  enableI18n: boolean;
  enableWordPress: boolean;
  enableCustomDomains: boolean;
}

// --------------------------------------------------------------------------
// Internationalization & Localization
// --------------------------------------------------------------------------

export type SupportedLocale = 'en' | 'fr' | 'es' | 'de';

export interface LocalizationConfig {
  defaultLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
  currency: SupportedCurrency;
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  timezone: string;
}
