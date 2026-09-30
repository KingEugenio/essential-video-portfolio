/**
 * Cloud Data Adapter
 * Implements IDataAdapter backed by the server-side API with automatic
 * local storage fallback and offline synchronization.
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
} from '../types';
import { IDataAdapter, LocalDataAdapter } from './dataAdapter';
import { apiClient } from './apiClient';
import { DEFAULT_BRAND } from '../theme/defaultTheme';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_PRICING_PACKAGES,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_PROOFING,
  INITIAL_MEDIA,
} from '../data/initialData';

export class CloudDataAdapter implements IDataAdapter {
  private fallback = new LocalDataAdapter();

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const res = await apiClient.getProjects();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching projects from server, using local fallback:', e);
    }
    return this.fallback.getProjects();
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const res = await apiClient.getProject(slug);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching project by slug:', e);
    }
    return this.fallback.getProjectBySlug(slug);
  }

  async saveProject(project: Project): Promise<Project> {
    // Save to local cache first
    await this.fallback.saveProject(project);

    try {
      if (project.id && !project.id.startsWith('temp_')) {
        const res = await apiClient.updateProject(project.id, project);
        if (res.success && res.data) return res.data;
      } else {
        const res = await apiClient.createProject(project);
        if (res.success && res.data) return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error syncing project to cloud:', e);
    }
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.fallback.deleteProject(id);
    try {
      const res = await apiClient.deleteProject(id);
      return res.success;
    } catch {
      return true;
    }
  }

  // Brand & Profile
  async getBrandSettings(): Promise<BrandSettings> {
    try {
      const res = await apiClient.getPortfolio();
      if (res.success && res.data?.brand) {
        return res.data.brand;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching branding from server:', e);
    }
    return this.fallback.getBrandSettings();
  }

  async saveBrandSettings(brand: BrandSettings): Promise<BrandSettings> {
    await this.fallback.saveBrandSettings(brand);
    try {
      const res = await apiClient.updateBranding(brand);
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error saving branding to server:', e);
    }
    return brand;
  }

  // Services
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await apiClient.request('/services');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching services from server:', e);
    }
    return this.fallback.getServices();
  }

  async saveService(service: ServiceItem): Promise<ServiceItem> {
    await this.fallback.saveService(service);
    try {
      const res = await apiClient.request('/services', {
        method: 'POST',
        body: JSON.stringify(service),
      });
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error syncing service to server:', e);
    }
    return service;
  }

  async deleteService(id: string): Promise<boolean> {
    await this.fallback.deleteService(id);
    try {
      const res = await apiClient.request(`/services/${id}`, { method: 'DELETE' });
      return res.success;
    } catch {
      return true;
    }
  }

  // Pricing Packages
  async getPricingPackages(): Promise<PricingPackage[]> {
    try {
      const res = await apiClient.request('/pricing');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching pricing from server:', e);
    }
    return this.fallback.getPricingPackages();
  }

  async savePricingPackage(pkg: PricingPackage): Promise<PricingPackage> {
    await this.fallback.savePricingPackage(pkg);
    try {
      const res = await apiClient.request('/pricing', {
        method: 'POST',
        body: JSON.stringify(pkg),
      });
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error saving pricing to server:', e);
    }
    return pkg;
  }

  async deletePricingPackage(id: string): Promise<boolean> {
    await this.fallback.deletePricingPackage(id);
    try {
      const res = await apiClient.request(`/pricing/${id}`, { method: 'DELETE' });
      return res.success;
    } catch {
      return true;
    }
  }

  // Testimonials
  async getTestimonials(): Promise<TestimonialItem[]> {
    try {
      const res = await apiClient.request('/testimonials');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching testimonials from server:', e);
    }
    return this.fallback.getTestimonials();
  }

  async saveTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
    await this.fallback.saveTestimonial(testimonial);
    try {
      const res = await apiClient.request('/testimonials', {
        method: 'POST',
        body: JSON.stringify(testimonial),
      });
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error saving testimonial:', e);
    }
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    await this.fallback.deleteTestimonial(id);
    try {
      const res = await apiClient.request(`/testimonials/${id}`, { method: 'DELETE' });
      return res.success;
    } catch {
      return true;
    }
  }

  // Enquiries
  async getEnquiries(): Promise<EnquiryItem[]> {
    try {
      const res = await apiClient.request('/enquiries');
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching enquiries from server:', e);
    }
    return this.fallback.getEnquiries();
  }

  async createEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'receivedAt'>): Promise<EnquiryItem> {
    try {
      const res = await apiClient.request('/enquiries', {
        method: 'POST',
        body: JSON.stringify(enquiry),
      });
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error creating enquiry via server:', e);
    }
    return this.fallback.createEnquiry(enquiry);
  }

  async updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<boolean> {
    await this.fallback.updateEnquiryStatus(id, status);
    try {
      const res = await apiClient.request(`/enquiries/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return res.success;
    } catch {
      return true;
    }
  }

  // Proofing Reviews
  async getProofingReviews(): Promise<ClientProofingReview[]> {
    try {
      const res = await apiClient.getProofingReviews();
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching proofing reviews:', e);
    }
    return this.fallback.getProofingReviews();
  }

  async getProofingReviewById(id: string): Promise<ClientProofingReview | null> {
    try {
      const res = await apiClient.getProofingReview(id);
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching review by ID:', e);
    }
    return this.fallback.getProofingReviewById(id);
  }

  async saveProofingReview(review: ClientProofingReview): Promise<ClientProofingReview> {
    await this.fallback.saveProofingReview(review);
    try {
      const res = await apiClient.createProofingReview(review);
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error syncing review to cloud:', e);
    }
    return review;
  }

  // Media Library
  async getMediaItems(): Promise<MediaItem[]> {
    try {
      const res = await apiClient.getMedia();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (e) {
      console.warn('[CloudDataAdapter] Error fetching media items:', e);
    }
    return this.fallback.getMediaItems();
  }

  async saveMediaItem(item: MediaItem): Promise<MediaItem> {
    await this.fallback.saveMediaItem(item);
    try {
      const res = await apiClient.createMedia(item);
      if (res.success && res.data) return res.data;
    } catch (e) {
      console.warn('[CloudDataAdapter] Error saving media to cloud:', e);
    }
    return item;
  }

  async deleteMediaItem(id: string): Promise<boolean> {
    await this.fallback.deleteMediaItem(id);
    try {
      const res = await apiClient.deleteMedia(id);
      return res.success;
    } catch {
      return true;
    }
  }
}
