export type VideoOrientation = 'landscape' | 'portrait' | 'square' | 'custom';
export type AspectRatioType = '16:9' | '9:16' | '1:1' | '2.35:1' | '4:3' | '4:5';

export type MediaProviderType = 
  | 'direct' 
  | 'direct_upload' 
  | 'google_drive' 
  | 'drive' 
  | 'youtube' 
  | 'vimeo' 
  | 'mux' 
  | 'cloudflare_stream' 
  | 's3' 
  | 'storage' 
  | 'custom';

export type MediaHealthStatus = 
  | 'healthy' 
  | 'processing' 
  | 'warning' 
  | 'broken' 
  | 'missing' 
  | 'provider_disconnected';

export interface MediaAsset {
  id: string;
  name: string;
  title?: string;
  filename?: string;
  url?: string;
  sourceUrl?: string;
  playbackUrl: string;
  fallbackPlaybackUrl?: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'logo' | 'thumbnail' | 'audio';
  provider: MediaProviderType;
  providerAssetId?: string;
  mimeType?: string;
  size?: string;
  fileSizeBytes?: number;
  duration?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  aspectRatio?: AspectRatioType;
  orientation?: VideoOrientation;
  status: MediaHealthStatus;
  visibility: 'public' | 'private';
  metadata?: Record<string, any>;
  usedInProjects?: string[];
  errorMessage?: string;
  lastHealthCheck?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  provider: MediaProviderType;
  providerIdOrUrl: string;
  orientation: VideoOrientation;
  aspectRatio: AspectRatioType;
  width?: number;
  height?: number;
  duration?: string;
  autoplay?: boolean;
  driveFileId?: string;
  thumbnailUrl?: string;
  mediaAssetId?: string;
  status?: MediaHealthStatus;
  fallbackUrl?: string;
}

export type ProjectStatus = 'published' | 'draft' | 'scheduled' | 'archived';
export type ProjectVisibility = 'public' | 'private' | 'unlisted';
export type RetroEffectType = 'off' | 'vhs' | 'crt' | 'film' | 'glitch' | 'custom';

export interface BeforeAfterFootage {
  beforeVideo?: VideoItem;
  afterVideo?: VideoItem;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface ProjectCredit {
  role: string;
  name: string;
  link?: string;
}

export interface ProjectVersion {
  id: string;
  versionNumber: string;
  name: string;
  mediaAssetId: string;
  videoUrl: string;
  createdAt: string;
  isPublished: boolean;
  notes?: string;
}

export interface AspectRatioVersion {
  id: string;
  ratio: AspectRatioType;
  label: string;
  videoUrl: string;
  thumbnailUrl?: string;
  provider?: MediaProviderType;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  brief?: string;
  approach?: string;
  
  // Extended Case Study Fields
  challenge?: string;
  creativeDirection?: string;
  editingProcess?: string;
  colorGradingNotes?: string;
  motionVfxNotes?: string;
  soundDesignNotes?: string;
  stills?: string[];
  btsMedia?: VideoItem[];
  aspectRatioVersions?: AspectRatioVersion[];

  role: string;
  software: string[];
  client: string;
  year: string;
  category: string;
  services: string[];
  tags: string[];
  thumbnail: string;
  mainVideo: VideoItem;
  additionalVideos: VideoItem[];
  beforeAfter?: BeforeAfterFootage;
  featured: boolean;
  status: ProjectStatus;
  visibility?: ProjectVisibility;
  order: number;
  views: number;
  credits?: ProjectCredit[];
  versions?: ProjectVersion[];
  seoTitle?: string;
  seoDescription?: string;
  socialPreviewImage?: string;
  scheduledPublishDate?: string;
  createdAt: string;
  updatedAt: string;
  retroEffect?: RetroEffectType;
  retroEffectIntensity?: 'low' | 'medium' | 'high';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  deliverables: string[];
  pricing?: string;
  available: boolean;
  order: number;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  currency: string;
  billingPeriod?: 'one-off' | 'monthly' | 'per-minute' | 'project' | 'custom';
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  featured: boolean;
  available: boolean;
  order: number;
}

export interface PricingConfig {
  enabled: boolean;
  headline: string;
  subheadline: string;
  activeCurrency: string;
  supportedCurrencies: string[];
  allowCustomQuote: boolean;
  quoteCtaText: string;
  packages: PricingTier[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  avatarUrl?: string;
  content: string;
  projectName?: string;
  rating?: number;
  published: boolean;
  order: number;
}

export type SocialPlatform = 
  | 'instagram' 
  | 'tiktok' 
  | 'youtube' 
  | 'vimeo' 
  | 'linkedin' 
  | 'x' 
  | 'facebook' 
  | 'behance' 
  | 'dribbble' 
  | 'whatsapp' 
  | 'website' 
  | 'other';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
  enabled: boolean;
}

export interface ContactFormConfig {
  provider: 'formspree' | 'custom' | 'custom_endpoint';
  endpointUrl: string;
  heading: string;
  subheading: string;
  buttonText: string;
  successMessage: string;
  whatsappNumber: string;
  showWhatsapp: boolean;
  fields: {
    name: boolean;
    email: boolean;
    phone: boolean;
    company: boolean;
    projectType: boolean;
    budget: boolean;
    deadline: boolean;
    hasFootage: boolean;
    footageStorage: boolean;
    deliverables: boolean;
    message: boolean;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  deadline?: string;
  hasFootage?: string;
  footageStorage?: string;
  deliverables?: string;
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'archived';
  createdAt: string;
}

export type GrainMode = 'clean' | 'film' | '16mm' | 'vhs' | 'crt' | 'custom';
export type WindowStyle = 'retro-win95' | 'y2k-silver' | 'crt-terminal' | 'vhs-player' | 'minimal-retro';
export type PortfolioLayout = 'grid' | 'masonry' | 'cinematic' | 'social' | 'contact-sheet' | 'collage';
export type HeroLayout = 'cinematic' | 'split' | 'fullscreen' | 'minimal' | 'desktop';
export type TemplatePreset = 
  | 'retro-archive' 
  | 'neo-brutalist' 
  | 'dark-aurora' 
  | 'retro-surrealist' 
  | 'minimal-cinema' 
  | 'y2k-studio' 
  | 'film-lab' 
  | 'clean-modern';

export interface AttributionConfig {
  enabled: boolean;
  text: string;
  url: string;
}

export interface BrandSettings {
  brandName: string;
  professionalTitle: string;
  bio: string;
  avatarUrl: string;
  logoUrl: string;
  logoMonogram?: string;
  faviconUrl: string;
  location: string;
  yearsExperience: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  aboutManifestoHeadline?: string;
  archiveHeading?: string;
  archiveSubheading?: string;
  heroLayout: HeroLayout;
  showreelVideo: VideoItem;
  
  // Theme Color Tokens
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  surfaceElevatedColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  crtGlowColor: string;
  filmTint: string;
  
  // Typography Tokens
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  
  // Retro & UI Styling
  borderRadius: string;
  glassIntensity: number;
  grainMode: GrainMode;
  grainIntensity: number;
  scanlinesEnabled: boolean;
  vhsNoiseEnabled: boolean;
  chromaticAberrationEnabled: boolean;
  glitchEnabled: boolean;
  crtGlowEnabled: boolean;
  timestampEnabled: boolean;
  recIndicatorEnabled: boolean;
  windowStyle: WindowStyle;
  portfolioLayout: PortfolioLayout;
  templatePreset: TemplatePreset;
  autoNumbering: boolean;
  attribution?: AttributionConfig;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink: string;
  webContentLink?: string;
  size?: string;
  durationMillis?: string;
  videoMediaMetadata?: {
    width: number;
    height: number;
    durationMillis: string;
  };
}

export interface GoogleDriveConnectionConfig {
  connected: boolean;
  userEmail?: string;
  allowedFolderIds?: string[];
  selectedFolderName?: string;
  connectedAt?: string;
}

export interface StreamingProviderConfig {
  preferredProvider: 'direct' | 'google_drive' | 'mux' | 'cloudflare_stream' | 's3';
  muxConfig?: {
    tokenId?: string;
    tokenSecretSet: boolean;
  };
  cloudflareConfig?: {
    accountId?: string;
    apiTokenSet: boolean;
  };
  s3Config?: {
    bucketName?: string;
    region?: string;
    cdnUrl?: string;
  };
}

export interface WordPressConfig {
  enabled: boolean;
  restApiUrl: string;
  customPostType: string;
  autoSync: boolean;
  lastSyncedAt?: string;
}

export interface PortfolioData {
  brand: BrandSettings;
  projects: Project[];
  services: Service[];
  pricing: PricingConfig;
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  contactConfig: ContactFormConfig;
  wordpressConfig: WordPressConfig;
}

export interface AdminAnalytics {
  totalViews: number;
  videoPlays: number;
  videoCompletions: number;
  projectViews: Record<string, number>;
  inquiriesCount: number;
  ctaClicks: number;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserBreakdown: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    brave: number;
    other: number;
  };
  recentEvents: Array<{
    id: string;
    type: string;
    projectId?: string;
    projectTitle?: string;
    timestamp: string;
    device: string;
  }>;
}

export interface AdminData extends PortfolioData {
  inquiries: Inquiry[];
  media: MediaAsset[];
  driveConfig: GoogleDriveConnectionConfig;
  streamingConfig: StreamingProviderConfig;
  analytics: AdminAnalytics;
}
