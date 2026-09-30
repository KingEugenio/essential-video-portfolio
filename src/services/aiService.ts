/**
 * Client-Side AI Service Layer
 * Interfaces securely with backend Express server-side /api/ai endpoints.
 * Never leaks API keys or secrets to the browser.
 */

import { apiClient } from './apiClient';
import { AIDescriptionDraft, AISEODraft, AIBriefSummary, AICaseStudyDraft } from '../types';

export interface GenerateDescriptionParams {
  title: string;
  client?: string;
  category?: string;
  role?: string[];
  services?: string[];
  notes?: string;
}

export interface GenerateSEOParams {
  projectTitle: string;
  clientName?: string;
  description?: string;
  creatorName?: string;
}

export interface SummarizeBriefParams {
  enquiryMessage: string;
  clientName?: string;
  projectType?: string;
  budget?: string;
  deadline?: string;
}

export class AIService {
  public static async generateProjectDescription(
    params: GenerateDescriptionParams
  ): Promise<AIDescriptionDraft | null> {
    try {
      const res = await apiClient.generateProjectDescription(params);
      if (res.success && res.draft) {
        return res.draft;
      }
    } catch (e) {
      console.warn('[AIService] Failed to generate description:', e);
    }
    return null;
  }

  public static async generateSEO(params: GenerateSEOParams): Promise<AISEODraft | null> {
    try {
      const res = await apiClient.generateSEO(params);
      if (res.success && res.draft) {
        return res.draft;
      }
    } catch (e) {
      console.warn('[AIService] Failed to generate SEO tags:', e);
    }
    return null;
  }

  public static async summarizeBrief(params: SummarizeBriefParams): Promise<AIBriefSummary | null> {
    try {
      const res = await apiClient.summarizeBrief(params);
      if (res.success && res.summary) {
        return res.summary;
      }
    } catch (e) {
      console.warn('[AIService] Failed to summarize client brief:', e);
    }
    return null;
  }
}
