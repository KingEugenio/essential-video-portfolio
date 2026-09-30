/**
 * Content Portability & Export Service
 * 
 * Generates portable standard JSON snapshots of the entire portfolio ecosystem
 * (creator profile, projects, media metadata, services, testimonials,
 * proofing sessions, and theme tokens) enabling easy migration between
 * Local Storage, WordPress, Headless CMS, or Static Jamstack hosts.
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
  ThemeSettings,
} from '../types';

export interface PortfolioExportData {
  version: string;
  exportedAt: string;
  schema: string;
  creator: BrandSettings;
  projects: Project[];
  services: ServiceItem[];
  pricingPackages?: PricingPackage[];
  testimonials: TestimonialItem[];
  proofingReviews: ClientProofingReview[];
  mediaLibrary: MediaItem[];
  bookingSettings: BookingFormSettings;
  wordPressConfig: WordPressConfig;
  themeSettings?: ThemeSettings;
}

export class ExportService {
  /**
   * Generates a downloadable JSON file of the complete portfolio data
   */
  public static exportPortfolio(data: Omit<PortfolioExportData, 'version' | 'exportedAt' | 'schema'>): void {
    const payload: PortfolioExportData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      schema: 'https://schema.ekopixels.com/portfolio-v2.json',
      ...data,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `portfolio-export-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Parses and validates an uploaded portfolio-export.json file
   */
  public static async parseImportFile(file: File): Promise<PortfolioExportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content) as PortfolioExportData;
          if (!parsed.projects || !Array.isArray(parsed.projects)) {
            throw new Error('Invalid portfolio backup file: missing projects array.');
          }
          resolve(parsed);
        } catch (err: any) {
          reject(new Error(`Failed to parse import file: ${err.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read backup file.'));
      reader.readAsText(file);
    });
  }
}
