import { IDataAdapter, PublicPortfolioManifest, InquirySubmissionPayload } from './types';
import { AdminData, Project, Service, Testimonial, SocialLink, ContactFormConfig, BrandSettings } from '../../types';
import { safeJsonStringify } from '../../utils/serialization';

export class CustomAPIAdapter implements IDataAdapter {
  public readonly name = 'CustomAPIAdapter';
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  public async getPortfolioManifest(): Promise<PublicPortfolioManifest> {
    const res = await fetch(`${this.baseUrl}/api/portfolio`);
    if (!res.ok) {
      throw new Error(`Failed to load portfolio manifest: ${res.statusText}`);
    }
    return res.json();
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    const res = await fetch(`${this.baseUrl}/api/portfolio/projects/${encodeURIComponent(slug)}`);
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Failed to load project '${slug}': ${res.statusText}`);
    }
    const data = await res.json();
    return data.project || data;
  }

  public async getProjects(filter?: { category?: string; featured?: boolean }): Promise<Project[]> {
    const manifest = await this.getPortfolioManifest();
    let projects = manifest.projects;

    if (filter?.category && filter.category !== 'All') {
      projects = projects.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.featured) {
      projects = projects.filter((p) => p.featured);
    }
    return projects;
  }

  public async getBrandSettings(): Promise<BrandSettings> {
    const manifest = await this.getPortfolioManifest();
    return manifest.brand;
  }

  public async getServices(): Promise<Service[]> {
    const manifest = await this.getPortfolioManifest();
    return manifest.services;
  }

  public async getPricing(): Promise<any> {
    const manifest = await this.getPortfolioManifest();
    return manifest.pricing;
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    const manifest = await this.getPortfolioManifest();
    return manifest.testimonials;
  }

  public async getSocialLinks(): Promise<SocialLink[]> {
    const manifest = await this.getPortfolioManifest();
    return manifest.socialLinks;
  }

  public async getContactConfig(): Promise<ContactFormConfig> {
    const manifest = await this.getPortfolioManifest();
    return manifest.contactConfig;
  }

  public async submitInquiry(payload: InquirySubmissionPayload): Promise<{ success: boolean; message: string; inquiryId?: string }> {
    const res = await fetch(`${this.baseUrl}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: safeJsonStringify(payload),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit project transmission');
    }
    return result;
  }

  public async getAdminData(token: string): Promise<AdminData> {
    const res = await fetch(`${this.baseUrl}/api/admin/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch admin data: ${res.statusText}`);
    }
    const result = await res.json();
    return result.data;
  }

  public async saveAdminData(token: string, data: AdminData): Promise<{ success: boolean }> {
    const res = await fetch(`${this.baseUrl}/api/admin/data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: safeJsonStringify(data),
    });
    if (!res.ok) {
      throw new Error(`Failed to save admin data: ${res.statusText}`);
    }
    return res.json();
  }

  public async syncWordPress(token: string, restApiUrl: string, customPostType: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${this.baseUrl}/api/admin/wordpress/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: safeJsonStringify({ restApiUrl, customPostType }),
    });
    return res.json();
  }
}
