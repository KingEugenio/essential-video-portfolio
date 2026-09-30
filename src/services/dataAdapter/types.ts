import { AdminData, Project, Service, PricingConfig, Testimonial, SocialLink, ContactFormConfig, BrandSettings } from '../../types';

export interface PublicPortfolioManifest {
  success: boolean;
  brand: BrandSettings;
  projects: Project[];
  services: Service[];
  pricing?: PricingConfig;
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  contactConfig: ContactFormConfig;
}

export interface InquirySubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  deadline?: string;
  hasFootage?: string;
  footageStorage?: string;
  deliverables?: string;
  message?: string;
}

export interface IDataAdapter {
  readonly name: string;
  getPortfolioManifest(): Promise<PublicPortfolioManifest>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getProjects(filter?: { category?: string; featured?: boolean }): Promise<Project[]>;
  getBrandSettings(): Promise<BrandSettings>;
  getServices(): Promise<Service[]>;
  getPricing?(): Promise<PricingConfig | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  getSocialLinks(): Promise<SocialLink[]>;
  getContactConfig(): Promise<ContactFormConfig>;
  submitInquiry(payload: InquirySubmissionPayload): Promise<{ success: boolean; message: string; inquiryId?: string }>;
  
  // Admin / CMS Methods
  getAdminData(token: string): Promise<AdminData>;
  saveAdminData(token: string, data: AdminData): Promise<{ success: boolean }>;
  syncWordPress?(token: string, restApiUrl: string, customPostType: string): Promise<{ success: boolean; message: string }>;
}
