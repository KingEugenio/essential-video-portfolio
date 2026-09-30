/**
 * Privacy-Conscious Video Engagement Analytics
 * Tracks video watch milestones (play, 25%, 50%, 75%, 100%) without cookies or invasive trackers.
 */

import { apiClient } from './apiClient';
import { VideoAnalyticsEventType, DetailedAnalyticsReport } from '../types';

export class AnalyticsService {
  private static milestonesTracked: Set<string> = new Set();

  public static trackVideoEvent(
    projectId: string,
    projectTitle: string,
    eventType: VideoAnalyticsEventType,
    currentTime: number = 0,
    duration: number = 0
  ) {
    const milestoneKey = `${projectId}-${eventType}`;
    if (eventType.startsWith('video_') && this.milestonesTracked.has(milestoneKey)) {
      return; // Deduplicate quartile triggers per session
    }
    if (eventType.startsWith('video_')) {
      this.milestonesTracked.add(milestoneKey);
    }

    const deviceCategory = window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
    const trafficSource = document.referrer ? new URL(document.referrer).hostname : 'Direct';

    apiClient.trackEvent({
      projectId,
      projectTitle,
      eventType,
      currentTime,
      duration,
      deviceCategory,
      trafficSource,
    });
  }

  public static async getDashboardReport(): Promise<DetailedAnalyticsReport | null> {
    try {
      const res = await apiClient.getAnalyticsDashboard();
      if (res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('[AnalyticsService] Error fetching dashboard data:', e);
    }
    return null;
  }
}
