/**
 * Central Portfolio Service
 * 
 * Aggregates all Data Adapters and provides standard async calls for
 * UI components, keeping views strictly separated from API/Storage details.
 */

import { IDataAdapter, LocalDataAdapter } from './dataAdapter';
import { CloudDataAdapter } from './cloudDataAdapter';
import { WordPressAdapter } from './wordpressAdapter';
import {
  Project,
  BrandSettings,
  ServiceItem,
  TestimonialItem,
  EnquiryItem,
  ClientProofingReview,
  MediaItem,
  WordPressConfig,
} from '../types';

export class PortfolioService {
  private static instance: PortfolioService;
  private adapter: IDataAdapter;

  private constructor() {
    this.adapter = new CloudDataAdapter();
  }

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  public setAdapter(adapter: IDataAdapter): void {
    this.adapter = adapter;
  }

  public getAdapter(): IDataAdapter {
    return this.adapter;
  }

  // --- Projects ---
  public async getProjects(): Promise<Project[]> {
    return this.adapter.getProjects();
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.adapter.getProjectBySlug(slug);
  }

  public async saveProject(project: Project): Promise<Project> {
    return this.adapter.saveProject(project);
  }

  public async deleteProject(id: string): Promise<boolean> {
    return this.adapter.deleteProject(id);
  }

  // --- Brand ---
  public async getBrandSettings(): Promise<BrandSettings> {
    return this.adapter.getBrandSettings();
  }

  public async saveBrandSettings(brand: BrandSettings): Promise<BrandSettings> {
    return this.adapter.saveBrandSettings(brand);
  }

  // --- Services ---
  public async getServices(): Promise<ServiceItem[]> {
    return this.adapter.getServices();
  }

  public async saveService(service: ServiceItem): Promise<ServiceItem> {
    return this.adapter.saveService(service);
  }

  public async deleteService(id: string): Promise<boolean> {
    return this.adapter.deleteService(id);
  }

  // --- Testimonials ---
  public async getTestimonials(): Promise<TestimonialItem[]> {
    return this.adapter.getTestimonials();
  }

  public async saveTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
    return this.adapter.saveTestimonial(testimonial);
  }

  public async deleteTestimonial(id: string): Promise<boolean> {
    return this.adapter.deleteTestimonial(id);
  }

  // --- Enquiries ---
  public async getEnquiries(): Promise<EnquiryItem[]> {
    return this.adapter.getEnquiries();
  }

  public async createEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'receivedAt'>): Promise<EnquiryItem> {
    return this.adapter.createEnquiry(enquiry);
  }

  public async updateEnquiryStatus(id: string, status: EnquiryItem['status']): Promise<boolean> {
    return this.adapter.updateEnquiryStatus(id, status);
  }

  // --- Client Proofing ---
  public async getProofingReviews(): Promise<ClientProofingReview[]> {
    return this.adapter.getProofingReviews();
  }

  public async getProofingReviewById(id: string): Promise<ClientProofingReview | null> {
    return this.adapter.getProofingReviewById(id);
  }

  public async saveProofingReview(review: ClientProofingReview): Promise<ClientProofingReview> {
    return this.adapter.saveProofingReview(review);
  }

  // --- Media Library ---
  public async getMediaItems(): Promise<MediaItem[]> {
    return this.adapter.getMediaItems();
  }

  public async saveMediaItem(item: MediaItem): Promise<MediaItem> {
    return this.adapter.saveMediaItem(item);
  }

  public async deleteMediaItem(id: string): Promise<boolean> {
    return this.adapter.deleteMediaItem(id);
  }

  // --- WordPress Sync Integration ---
  public async syncWithWordPress(config: WordPressConfig): Promise<{ success: boolean; projects: Project[]; message: string }> {
    const wpAdapter = new WordPressAdapter(config);
    const testResult = await wpAdapter.testConnection();
    if (!testResult.success) {
      return { success: false, projects: [], message: testResult.message };
    }

    try {
      const fetchedProjects = await wpAdapter.fetchProjects();
      if (fetchedProjects.length > 0) {
        // Save each fetched project
        for (const p of fetchedProjects) {
          await this.adapter.saveProject(p);
        }
      }
      return {
        success: true,
        projects: fetchedProjects,
        message: `Synced ${fetchedProjects.length} projects successfully from WordPress!`,
      };
    } catch (err: any) {
      return {
        success: false,
        projects: [],
        message: `Failed to sync projects: ${err.message}`,
      };
    }
  }
}
