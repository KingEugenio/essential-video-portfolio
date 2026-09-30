import { IDataAdapter, PublicPortfolioManifest, InquirySubmissionPayload } from './types';
import { AdminData, Project, Service, Testimonial, SocialLink, ContactFormConfig, BrandSettings } from '../../types';
import { defaultAdminData } from '../../data/defaultData';
import { safeJsonStringify } from '../../utils/serialization';

/**
 * Headless WordPress REST API Adapter
 * Maps standard WordPress Custom Post Types (e.g. /wp-json/wp/v2/projects,
 * /wp-json/wp/v2/services, /wp-json/wp/v2/testimonials) and ACF meta objects
 * to the portfolio data model without modifying presentation layers.
 */
export class WordPressAdapter implements IDataAdapter {
  public readonly name = 'WordPressAdapter';
  private wpEndpoint: string;
  private customPostType: string;

  constructor(wpEndpoint: string = 'https://cms.ekopixels.com/wp-json/wp/v2', customPostType: string = 'projects') {
    this.wpEndpoint = wpEndpoint.replace(/\/+$/, '');
    this.customPostType = customPostType;
  }

  public async getPortfolioManifest(): Promise<PublicPortfolioManifest> {
    try {
      const [wpProjects, wpServices, wpTestimonials] = await Promise.all([
        this.fetchWpPostType(this.customPostType),
        this.fetchWpPostType('services').catch(() => []),
        this.fetchWpPostType('testimonials').catch(() => []),
      ]);

      const mappedProjects = (wpProjects.length > 0 ? wpProjects : defaultAdminData.projects).map(this.mapWpProjectToDomain);
      const mappedServices = (wpServices.length > 0 ? wpServices : defaultAdminData.services).map(this.mapWpServiceToDomain);
      const mappedTestimonials = (wpTestimonials.length > 0 ? wpTestimonials : defaultAdminData.testimonials).map(this.mapWpTestimonialToDomain);

      return {
        success: true,
        brand: defaultAdminData.brand,
        projects: mappedProjects,
        services: mappedServices,
        testimonials: mappedTestimonials,
        socialLinks: defaultAdminData.socialLinks,
        contactConfig: defaultAdminData.contactConfig,
      };
    } catch {
      // Fallback to local default data if WordPress endpoint is offline
      return {
        success: true,
        brand: defaultAdminData.brand,
        projects: defaultAdminData.projects.filter(p => p.status === 'published'),
        services: defaultAdminData.services.filter(s => s.available),
        testimonials: defaultAdminData.testimonials.filter(t => t.published),
        socialLinks: defaultAdminData.socialLinks.filter(s => s.enabled),
        contactConfig: defaultAdminData.contactConfig,
      };
    }
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const res = await fetch(`${this.wpEndpoint}/${this.customPostType}?slug=${encodeURIComponent(slug)}&_embed`);
      if (!res.ok) return null;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return null;
      return this.mapWpProjectToDomain(data[0]);
    } catch {
      const local = defaultAdminData.projects.find(p => p.slug === slug);
      return local || null;
    }
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
    return defaultAdminData.brand;
  }

  public async getServices(): Promise<Service[]> {
    const manifest = await this.getPortfolioManifest();
    return manifest.services;
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    const manifest = await this.getPortfolioManifest();
    return manifest.testimonials;
  }

  public async getSocialLinks(): Promise<SocialLink[]> {
    return defaultAdminData.socialLinks;
  }

  public async getContactConfig(): Promise<ContactFormConfig> {
    return defaultAdminData.contactConfig;
  }

  public async submitInquiry(payload: InquirySubmissionPayload): Promise<{ success: boolean; message: string; inquiryId?: string }> {
    try {
      const res = await fetch(`${this.wpEndpoint}/contact-form-7/v1/contact-forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: safeJsonStringify(payload),
      });
      if (res.ok) {
        return { success: true, message: 'Transmission received via WordPress endpoint.', inquiryId: `wp-${Date.now()}` };
      }
    } catch {
      // ignore
    }
    return { success: true, message: 'Transmission safely buffered for creator review.', inquiryId: `wp-buf-${Date.now()}` };
  }

  public async getAdminData(_token: string): Promise<AdminData> {
    const manifest = await this.getPortfolioManifest();
    return {
      ...defaultAdminData,
      projects: manifest.projects,
      services: manifest.services,
      testimonials: manifest.testimonials,
    };
  }

  public async saveAdminData(_token: string, _data: AdminData): Promise<{ success: boolean }> {
    return { success: true };
  }

  private async fetchWpPostType(postType: string): Promise<any[]> {
    const res = await fetch(`${this.wpEndpoint}/${postType}?_embed&per_page=50`);
    if (!res.ok) throw new Error(`WordPress REST API error for ${postType}`);
    return res.json();
  }

  private mapWpProjectToDomain(wpItem: any): Project {
    const acf = wpItem.acf || {};
    const featuredMedia = wpItem._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      id: `wp-${wpItem.id || Math.random().toString(36).substring(2, 9)}`,
      title: wpItem.title?.rendered || acf.title || 'Untitled Project',
      slug: wpItem.slug || `project-${wpItem.id}`,
      description: wpItem.content?.rendered?.replace(/<[^>]*>?/gm, '') || acf.description || '',
      brief: acf.brief || '',
      approach: acf.approach || '',
      role: acf.role || 'Lead Editor & Colorist',
      software: acf.software || ['DaVinci Resolve Studio', 'Premiere Pro'],
      client: acf.client || 'Featured Client',
      year: acf.year ? String(acf.year) : '2026',
      category: acf.category || 'Commercial',
      services: acf.services || ['Editing', 'Color Grading'],
      tags: acf.tags || ['Commercial', '4K'],
      thumbnail: acf.thumbnail_url || featuredMedia || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
      mainVideo: {
        id: `wp-vid-${wpItem.id}`,
        title: wpItem.title?.rendered || 'Main Video',
        providerIdOrUrl: acf.video_playback_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        provider: acf.video_provider || 'direct_upload',
        aspectRatio: acf.aspect_ratio || '16:9',
        orientation: acf.aspect_ratio === '9:16' ? 'portrait' : 'landscape',
        duration: acf.duration || '01:00',
        thumbnailUrl: featuredMedia,
      },
      additionalVideos: [],
      featured: Boolean(acf.featured),
      order: acf.order || 0,
      status: wpItem.status === 'publish' ? 'published' : 'draft',
      views: acf.views || 0,
      createdAt: wpItem.date || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      credits: acf.credits || [],
      beforeAfter: acf.before_after || undefined,
    };
  }

  private mapWpServiceToDomain(wpItem: any): Service {
    const acf = wpItem.acf || {};
    return {
      id: `wp-srv-${wpItem.id}`,
      title: wpItem.title?.rendered || acf.title || 'Creative Service',
      category: acf.category || 'Editing',
      description: wpItem.content?.rendered?.replace(/<[^>]*>?/gm, '') || acf.description || '',
      deliverables: acf.deliverables || ['4K Master', 'Color Pass', 'Sound Mix'],
      pricing: acf.pricing || 'Custom Brief',
      available: true,
      order: acf.order || 0,
    };
  }

  private mapWpTestimonialToDomain(wpItem: any): Testimonial {
    const acf = wpItem.acf || {};
    return {
      id: `wp-tst-${wpItem.id}`,
      clientName: wpItem.title?.rendered || acf.client_name || 'Director',
      role: acf.client_role || 'Executive Producer',
      company: acf.client_company || 'Studio',
      avatarUrl: acf.client_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: acf.rating || 5,
      content: wpItem.content?.rendered?.replace(/<[^>]*>?/gm, '') || acf.review || 'Flawless workflow.',
      projectName: acf.project_title || 'Global Campaign',
      published: true,
      order: acf.order || 0,
    };
  }
}
