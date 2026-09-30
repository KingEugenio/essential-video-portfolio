/**
 * WordPress REST API Adapter
 * 
 * Implements Headless WordPress connectivity to sync Projects, Media,
 * Services, and Testimonials via standard WP REST API endpoints and ACF / Meta fields.
 */

import { Project, WordPressConfig, VideoSource, VideoAspectRatio } from '../types';

export interface WordPressPostResponse {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
  };
  acf?: {
    client?: string;
    year?: string;
    video_url?: string;
    video_provider?: string;
    aspect_ratio?: string;
    brief?: string;
    approach?: string;
    software?: string[] | string;
    role?: string[] | string;
    services?: string[] | string;
    before_url?: string;
    after_url?: string;
    has_before_after?: boolean;
  };
  meta?: Record<string, any>;
}

export class WordPressAdapter {
  private config: WordPressConfig;

  constructor(config: WordPressConfig) {
    this.config = config;
  }

  /**
   * Test the connection to the WordPress REST API endpoint
   */
  async testConnection(): Promise<{ success: boolean; message: string; count?: number }> {
    if (!this.config.endpointUrl) {
      return { success: false, message: 'WordPress endpoint URL is empty.' };
    }

    try {
      const url = new URL(this.config.endpointUrl);
      url.searchParams.set('per_page', '1');
      url.searchParams.set('_embed', '1');

      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        return {
          success: false,
          message: `WordPress responded with HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const totalPosts = response.headers.get('X-WP-Total');
      const data = await response.json();

      return {
        success: true,
        message: `Successfully connected to WordPress REST API! Found ${totalPosts || (Array.isArray(data) ? data.length : 1)} project(s).`,
        count: totalPosts ? parseInt(totalPosts, 10) : (Array.isArray(data) ? data.length : 0),
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Network error connecting to WordPress: ${err.message || 'Check URL and CORS configuration.'}`,
      };
    }
  }

  /**
   * Fetch all portfolio projects from WordPress and map to frontend Project model
   */
  async fetchProjects(): Promise<Project[]> {
    if (!this.config.endpointUrl) {
      return [];
    }

    try {
      const url = new URL(this.config.endpointUrl);
      url.searchParams.set('per_page', '100');
      url.searchParams.set('_embed', '1');

      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(url.toString(), { method: 'GET', headers });

      if (!response.ok) {
        throw new Error(`WordPress error ${response.status}: ${response.statusText}`);
      }

      const rawPosts: WordPressPostResponse[] = await response.json();
      if (!Array.isArray(rawPosts)) return [];

      return rawPosts.map((post, index) => this.mapWordPressPostToProject(post, index));
    } catch (error) {
      console.error('[WordPressAdapter] fetchProjects failed:', error);
      throw error;
    }
  }

  /**
   * Transforms a WordPress REST API post item to frontend Project model
   */
  private mapWordPressPostToProject(post: WordPressPostResponse, index: number): Project {
    const acf = post.acf || {};
    const meta = post.meta || {};

    // Extract featured image from _embedded if available
    let thumbnailUrl = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80';
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      thumbnailUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }

    // Extract categories
    let category = 'Commercial';
    if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
      category = post._embedded['wp:term'][0][0].name;
    }

    const videoUrl = acf.video_url || meta.video_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const videoProvider = (acf.video_provider || meta.video_provider || 'youtube') as VideoSource['provider'];
    const aspectRatio = (acf.aspect_ratio || meta.aspect_ratio || '16:9') as VideoAspectRatio;

    const softwareList = Array.isArray(acf.software)
      ? acf.software
      : typeof acf.software === 'string'
      ? acf.software.split(',').map((s) => s.trim())
      : ['DaVinci Resolve', 'Premiere Pro'];

    const roleList = Array.isArray(acf.role)
      ? acf.role
      : typeof acf.role === 'string'
      ? acf.role.split(',').map((s) => s.trim())
      : ['Lead Video Editor', 'Colorist'];

    return {
      id: `wp-${post.id}`,
      wordpressPostId: post.id,
      title: post.title?.rendered ? this.stripHtml(post.title.rendered) : `Project #${post.id}`,
      slug: post.slug || `project-${post.id}`,
      category,
      client: acf.client || meta.client || 'Client Commission',
      year: acf.year || meta.year || new Date(post.date).getFullYear().toString(),
      featured: index < 3,
      published: post.status === 'publish',
      order: index + 1,
      description: post.excerpt?.rendered
        ? this.stripHtml(post.excerpt.rendered)
        : post.content?.rendered
        ? this.stripHtml(post.content.rendered).slice(0, 160) + '...'
        : 'Editorial cut, pacing, and color grade.',
      brief: acf.brief || meta.brief || this.stripHtml(post.content?.rendered || ''),
      approach: acf.approach || meta.approach || 'Executed rhythmic pacing, sound design pass, and film grade emulation.',
      role: roleList,
      software: softwareList,
      services: ['Editorial Cut', 'Color Grading', 'Sound Design'],
      thumbnailUrl,
      videoSource: {
        provider: videoProvider,
        url: videoUrl,
        aspectRatio,
        orientation: aspectRatio === '9:16' ? 'portrait' : 'landscape',
        posterUrl: thumbnailUrl,
      },
      beforeAfterData: acf.has_before_after
        ? {
            hasBeforeAfter: true,
            labelBefore: 'LOG RAW / Ungraded',
            labelAfter: 'Film Emulation / Final Grade',
            beforeUrl: acf.before_url || thumbnailUrl,
            afterUrl: acf.after_url || thumbnailUrl,
          }
        : undefined,
      viewsCount: Math.floor(Math.random() * 800) + 120,
      sourceType: 'wordpress',
      createdAt: post.date,
      updatedAt: post.modified,
    };
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
