import { AdminData } from '../types';
import { safeJsonStringify } from '../utils/serialization';

export interface PortfolioExportPackage {
  version: string;
  exportedAt: string;
  schema: 'ekopixels-portfolio-v2';
  cmsSource: 'standalone' | 'wordpress' | 'custom-api';
  data: AdminData;
}

export class ExportService {
  /**
   * Generates a portable JSON export bundle
   */
  public static generateExportBundle(data: AdminData, cmsSource: 'standalone' | 'wordpress' | 'custom-api' = 'standalone'): PortfolioExportPackage {
    return {
      version: '2.4.0',
      exportedAt: new Date().toISOString(),
      schema: 'ekopixels-portfolio-v2',
      cmsSource,
      data,
    };
  }

  /**
   * Triggers a browser download of the export package
   */
  public static downloadExportJSON(data: AdminData): void {
    if (typeof window === 'undefined') return;

    const bundle = this.generateExportBundle(data);
    const jsonString = safeJsonStringify(bundle, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Validates an imported JSON package
   */
  public static validateImportBundle(jsonString: string): { valid: boolean; data?: AdminData; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { valid: false, error: 'Invalid JSON format.' };
      }

      const data = parsed.data || parsed;
      if (!data.brand || !Array.isArray(data.projects)) {
        return { valid: false, error: 'Missing required portfolio schema elements (brand, projects).' };
      }

      return { valid: true, data };
    } catch (e: any) {
      return { valid: false, error: `JSON Parse error: ${e.message}` };
    }
  }
}
