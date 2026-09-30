import { useState, useEffect, useCallback } from 'react';
import { portfolioService } from '../services/portfolioService';
import { PublicPortfolioManifest } from '../services/dataAdapter/types';
import { defaultAdminData } from '../data/defaultData';
import { themeEngine } from '../themes/themeEngine';

export function usePortfolio() {
  const [manifest, setManifest] = useState<PublicPortfolioManifest>({
    success: true,
    brand: defaultAdminData.brand,
    projects: defaultAdminData.projects.filter((p) => p.status === 'published'),
    services: defaultAdminData.services.filter((s) => s.available),
    testimonials: defaultAdminData.testimonials.filter((t) => t.published),
    socialLinks: defaultAdminData.socialLinks.filter((s) => s.enabled),
    contactConfig: defaultAdminData.contactConfig,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await portfolioService.getPortfolioManifest();
      setManifest(data);
      if (data.brand) {
        themeEngine.applyBrand(data.brand);
      }
    } catch (err: any) {
      console.warn('Portfolio load fallback to default seed:', err.message);
      setError(err.message);
    } finally {
      // Natural micro-threshold to prevent UI jitter
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    manifest,
    brand: manifest.brand,
    projects: manifest.projects,
    services: manifest.services,
    testimonials: manifest.testimonials,
    socialLinks: manifest.socialLinks,
    contactConfig: manifest.contactConfig,
    isLoading,
    error,
    refresh: fetchPortfolio,
  };
}
