/**
 * Data Abstraction Layer
 * 
 * Provides an agnostic interface decoupling the UI/Presentation layer
 * from underlying persistence mechanisms (Local Storage, WordPress REST API,
 * Headless CMS, or Custom Backend).
 */

import {
  Project,
  BrandSettings,
  ServiceItem,
  PricingPackage,
  TestimonialItem,
  EnquiryItem,
  ClientProofingReview,
  MediaItem,
  BookingFormSettings,
  WordPressConfig,
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_PRICING_PACKAGES,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_PROOFING,
  INITIAL_MEDIA,
} from '../data/initialData';
import { DEFAULT_BRAND } from '../theme/defaultTheme';

export interface IDataAdapter {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  saveProject(project: Project): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;

  // Brand & Profile
  getBrandSettings(): Promise<BrandSettings>;
  saveBrandSettings(brand: BrandSettings): Promise<BrandSettings>;

  // Services
  getServices(): Promise<ServiceItem[]>;
  saveService(service: ServiceItem): Promise<ServiceItem>;
  deleteService(id: string): Promise<boolean>;

  // Pricing Packages
  getPricingPackages(): Promise<PricingPackage[]>;
  savePricingPackage(pkg: PricingPackage): Promise<PricingPackage>;
  deletePricingPackage(id: string): Promise<boolean>;

  // Testimonials
  getTestimonials(): Promise<TestimonialItem[]>;
  saveTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Enquiries
  getEnquiries(): Promise<EnquiryItem[]>;
  createEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'receivedAt'>): Promise<EnquiryItem>;
  updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<boolean>;

  // Proofing Reviews
  getProofingReviews(): Promise<ClientProofingReview[]>;
  getProofingReviewById(id: string): Promise<ClientProofingReview | null>;
  saveProofingReview(review: ClientProofingReview): Promise<ClientProofingReview>;

  // Media Library
  getMediaItems(): Promise<MediaItem[]>;
  saveMediaItem(item: MediaItem): Promise<MediaItem>;
  deleteMediaItem(id: string): Promise<boolean>;
}

/**
 * Local & Storage Data Adapter implementation
 */
export class LocalDataAdapter implements IDataAdapter {
  private getStored<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStored<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`[LocalDataAdapter] Failed to persist ${key}:`, e);
    }
  }

  async getProjects(): Promise<Project[]> {
    return this.getStored<Project[]>('ek_projects_v2', INITIAL_PROJECTS);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug || p.id === slug) || null;
  }

  async saveProject(project: Project): Promise<Project> {
    const projects = await this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        {
          ...project,
          createdAt: project.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...projects,
      ];
    }
    this.setStored('ek_projects_v2', updated);
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const projects = await this.getProjects();
    const updated = projects.filter((p) => p.id !== id);
    this.setStored('ek_projects_v2', updated);
    return true;
  }

  async getBrandSettings(): Promise<BrandSettings> {
    return this.getStored<BrandSettings>('ek_brand_settings_v2', DEFAULT_BRAND);
  }

  async saveBrandSettings(brand: BrandSettings): Promise<BrandSettings> {
    this.setStored('ek_brand_settings_v2', brand);
    return brand;
  }

  async getServices(): Promise<ServiceItem[]> {
    return this.getStored<ServiceItem[]>('ek_services_v2', INITIAL_SERVICES);
  }

  async saveService(service: ServiceItem): Promise<ServiceItem> {
    const services = await this.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    let updated: ServiceItem[];
    if (index >= 0) {
      updated = [...services];
      updated[index] = service;
    } else {
      updated = [...services, service];
    }
    this.setStored('ek_services_v2', updated);
    return service;
  }

  async deleteService(id: string): Promise<boolean> {
    const services = await this.getServices();
    this.setStored('ek_services_v2', services.filter((s) => s.id !== id));
    return true;
  }

  async getPricingPackages(): Promise<PricingPackage[]> {
    return this.getStored<PricingPackage[]>('ek_pricing_v2', INITIAL_PRICING_PACKAGES);
  }

  async savePricingPackage(pkg: PricingPackage): Promise<PricingPackage> {
    const list = await this.getPricingPackages();
    const index = list.findIndex((p) => p.id === pkg.id);
    let updated: PricingPackage[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = pkg;
    } else {
      updated = [...list, pkg];
    }
    this.setStored('ek_pricing_v2', updated);
    return pkg;
  }

  async deletePricingPackage(id: string): Promise<boolean> {
    const list = await this.getPricingPackages();
    this.setStored('ek_pricing_v2', list.filter((p) => p.id !== id));
    return true;
  }

  async getTestimonials(): Promise<TestimonialItem[]> {
    return this.getStored<TestimonialItem[]>('ek_testimonials_v2', INITIAL_TESTIMONIALS);
  }

  async saveTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
    const list = await this.getTestimonials();
    const index = list.findIndex((t) => t.id === testimonial.id);
    let updated: TestimonialItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = testimonial;
    } else {
      updated = [...list, testimonial];
    }
    this.setStored('ek_testimonials_v2', updated);
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const list = await this.getTestimonials();
    this.setStored('ek_testimonials_v2', list.filter((t) => t.id !== id));
    return true;
  }

  async getEnquiries(): Promise<EnquiryItem[]> {
    return this.getStored<EnquiryItem[]>('ek_enquiries_v2', INITIAL_ENQUIRIES);
  }

  async createEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'receivedAt'>): Promise<EnquiryItem> {
    const list = await this.getEnquiries();
    const newItem: EnquiryItem = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      receivedAt: new Date().toISOString(),
    };
    this.setStored('ek_enquiries_v2', [newItem, ...list]);
    return newItem;
  }

  async updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<boolean> {
    const list = await this.getEnquiries();
    const updated = list.map((e) => (e.id === id ? { ...e, status } : e));
    this.setStored('ek_enquiries_v2', updated);
    return true;
  }

  async getProofingReviews(): Promise<ClientProofingReview[]> {
    return this.getStored<ClientProofingReview[]>('ek_proofing_v2', INITIAL_PROOFING);
  }

  async getProofingReviewById(id: string): Promise<ClientProofingReview | null> {
    const list = await this.getProofingReviews();
    return list.find((p) => p.id === id) || null;
  }

  async saveProofingReview(review: ClientProofingReview): Promise<ClientProofingReview> {
    const list = await this.getProofingReviews();
    const index = list.findIndex((p) => p.id === review.id);
    let updated: ClientProofingReview[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...review, lastUpdated: new Date().toISOString() };
    } else {
      updated = [
        {
          ...review,
          createdAt: review.createdAt || new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setStored('ek_proofing_v2', updated);
    return review;
  }

  async getMediaItems(): Promise<MediaItem[]> {
    return this.getStored<MediaItem[]>('ek_media_v2', INITIAL_MEDIA);
  }

  async saveMediaItem(item: MediaItem): Promise<MediaItem> {
    const list = await this.getMediaItems();
    const index = list.findIndex((m) => m.id === item.id);
    let updated: MediaItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        {
          ...item,
          uploadedAt: item.uploadedAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...list,
      ];
    }
    this.setStored('ek_media_v2', updated);
    return item;
  }

  async deleteMediaItem(id: string): Promise<boolean> {
    const list = await this.getMediaItems();
    this.setStored('ek_media_v2', list.filter((m) => m.id !== id));
    return true;
  }
}
