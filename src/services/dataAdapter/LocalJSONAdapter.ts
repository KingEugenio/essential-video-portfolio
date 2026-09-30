import { IDataAdapter, PublicPortfolioManifest, InquirySubmissionPayload } from './types';
import { AdminData, Project, Service, PricingConfig, Testimonial, SocialLink, ContactFormConfig, BrandSettings } from '../../types';
import { defaultAdminData } from '../../data/defaultData';
import { safeClone } from '../../utils/serialization';

/**
 * Local JSON & Offline Adapter
 * Provides high-speed static rendering and zero-latency preview fallbacks.
 */
export class LocalJSONAdapter implements IDataAdapter {
  public readonly name = 'LocalJSONAdapter';
  private localData: AdminData;

  constructor(seedData: AdminData = defaultAdminData) {
    this.localData = safeClone(seedData);
  }

  public async getPortfolioManifest(): Promise<PublicPortfolioManifest> {
    return {
      success: true,
      brand: this.localData.brand,
      projects: this.localData.projects.filter((p) => p.status === 'published' && (p.visibility === 'public' || !p.visibility)),
      services: this.localData.services.filter((s) => s.available),
      pricing: this.localData.pricing,
      testimonials: this.localData.testimonials.filter((t) => t.published),
      socialLinks: this.localData.socialLinks.filter((s) => s.enabled),
      contactConfig: this.localData.contactConfig,
    };
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    const p = this.localData.projects.find((item) => item.slug === slug || item.id === slug);
    return p ? safeClone(p) : null;
  }

  public async getProjects(filter?: { category?: string; featured?: boolean }): Promise<Project[]> {
    let list = this.localData.projects.filter((p) => p.status === 'published' && (p.visibility === 'public' || !p.visibility));
    if (filter?.category && filter.category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.featured) {
      list = list.filter((p) => p.featured);
    }
    return safeClone(list);
  }

  public async getBrandSettings(): Promise<BrandSettings> {
    return safeClone(this.localData.brand);
  }

  public async getServices(): Promise<Service[]> {
    return safeClone(this.localData.services.filter((s) => s.available));
  }

  public async getPricing(): Promise<PricingConfig | undefined> {
    return this.localData.pricing ? safeClone(this.localData.pricing) : undefined;
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    return safeClone(this.localData.testimonials.filter((t) => t.published));
  }

  public async getSocialLinks(): Promise<SocialLink[]> {
    return safeClone(this.localData.socialLinks.filter((s) => s.enabled));
  }

  public async getContactConfig(): Promise<ContactFormConfig> {
    return safeClone(this.localData.contactConfig);
  }

  public async submitInquiry(payload: InquirySubmissionPayload): Promise<{ success: boolean; message: string; inquiryId?: string }> {
    const id = `inq-local-${Date.now()}`;
    return {
      success: true,
      message: 'Your project brief has been recorded locally.',
      inquiryId: id,
    };
  }

  public async getAdminData(_token: string): Promise<AdminData> {
    return safeClone(this.localData);
  }

  public async saveAdminData(_token: string, data: AdminData): Promise<{ success: boolean }> {
    this.localData = safeClone(data);
    return { success: true };
  }
}
