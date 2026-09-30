import { IDataAdapter, PublicPortfolioManifest, InquirySubmissionPayload } from './dataAdapter/types';
import { CustomAPIAdapter } from './dataAdapter/CustomAPIAdapter';
import { WordPressAdapter } from './dataAdapter/WordPressAdapter';
import { LocalJSONAdapter } from './dataAdapter/LocalJSONAdapter';
import { Project, Service, Testimonial, SocialLink, ContactFormConfig, BrandSettings, AdminData } from '../types';

/**
 * Portfolio Service (Single Entry Point for UI Content)
 * Abstracted orchestrator decoupling UI components from physical data sources.
 */
export class PortfolioService {
  private static instance: PortfolioService;
  private adapter: IDataAdapter;

  private constructor() {
    // Default to CustomAPIAdapter in full-stack context
    this.adapter = new CustomAPIAdapter();
  }

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  /**
   * Switch the underlying data adapter on the fly
   * (e.g. switch to WordPress REST API or Local JSON)
   */
  public setAdapter(type: 'api' | 'wordpress' | 'local', options?: { wpUrl?: string; customPostType?: string }): void {
    if (type === 'wordpress') {
      this.adapter = new WordPressAdapter(options?.wpUrl, options?.customPostType);
    } else if (type === 'local') {
      this.adapter = new LocalJSONAdapter();
    } else {
      this.adapter = new CustomAPIAdapter();
    }
  }

  public getAdapterName(): string {
    return this.adapter.name;
  }

  public async getPortfolioManifest(): Promise<PublicPortfolioManifest> {
    return this.adapter.getPortfolioManifest();
  }

  public async getProjects(filter?: { category?: string; featured?: boolean }): Promise<Project[]> {
    return this.adapter.getProjects(filter);
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.adapter.getProjectBySlug(slug);
  }

  public async getBrandSettings(): Promise<BrandSettings> {
    return this.adapter.getBrandSettings();
  }

  public async getServices(): Promise<Service[]> {
    return this.adapter.getServices();
  }

  public async getPricing() {
    return this.adapter.getPricing ? this.adapter.getPricing() : undefined;
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    return this.adapter.getTestimonials();
  }

  public async getSocialLinks(): Promise<SocialLink[]> {
    return this.adapter.getSocialLinks();
  }

  public async getContactConfig(): Promise<ContactFormConfig> {
    return this.adapter.getContactConfig();
  }

  public async submitInquiry(payload: InquirySubmissionPayload): Promise<{ success: boolean; message: string; inquiryId?: string }> {
    return this.adapter.submitInquiry(payload);
  }

  public async getAdminData(token: string): Promise<AdminData> {
    return this.adapter.getAdminData(token);
  }

  public async saveAdminData(token: string, data: AdminData): Promise<{ success: boolean }> {
    return this.adapter.saveAdminData(token, data);
  }
}

export const portfolioService = PortfolioService.getInstance();
