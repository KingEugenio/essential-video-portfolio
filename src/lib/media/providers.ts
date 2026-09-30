import { VideoAspectRatio, VideoOrientation, VideoProvider } from '../../types';

export interface NormalizedMediaObject {
  id?: string;
  title?: string;
  playbackUrl: string;
  fallbackUrl?: string;
  embedUrl?: string;
  streamType: 'direct_video' | 'youtube_embed' | 'vimeo_embed' | 'drive_embed' | 'hls_stream';
  posterUrl?: string;
  duration?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  aspectRatio: VideoAspectRatio;
  orientation: VideoOrientation;
  provider: VideoProvider | 'mux' | 'cloudflare_stream';
  mimeType?: string;
  isDirectStream: boolean;
  healthStatus: 'healthy' | 'warning' | 'broken' | 'unverified';
  errorDetails?: string;
}

export interface MediaHealthResult {
  isHealthy: boolean;
  status: 'healthy' | 'warning' | 'broken';
  statusCode?: number;
  message: string;
  suggestedAction?: string;
  testedAt: string;
}

export interface MediaMetadataResult {
  duration?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  aspectRatio: VideoAspectRatio;
  orientation: VideoOrientation;
  fileSize?: string;
  mimeType?: string;
  thumbnailUrl?: string;
}

/**
 * Universal Video Resolver & Provider Abstraction
 */
export class UniversalMediaResolver {
  /**
   * Determine aspect ratio from width and height
   */
  public static calculateAspectRatio(width?: number, height?: number): {
    aspectRatio: VideoAspectRatio;
    orientation: VideoOrientation;
  } {
    if (!width || !height || width <= 0 || height <= 0) {
      return { aspectRatio: '16:9', orientation: 'landscape' };
    }

    const ratio = width / height;

    if (ratio >= 2.2) {
      return { aspectRatio: '2.39:1', orientation: 'landscape' };
    }
    if (ratio >= 1.6) {
      return { aspectRatio: '16:9', orientation: 'landscape' };
    }
    if (ratio >= 1.25) {
      return { aspectRatio: '4:3', orientation: 'landscape' };
    }
    if (ratio >= 0.95 && ratio <= 1.05) {
      return { aspectRatio: '1:1', orientation: 'square' };
    }
    if (ratio <= 0.65) {
      return { aspectRatio: '9:16', orientation: 'portrait' };
    }
    if (ratio < 0.95) {
      return { aspectRatio: '9:16', orientation: 'portrait' };
    }

    return { aspectRatio: '16:9', orientation: 'landscape' };
  }

  /**
   * Extract YouTube Video ID from any standard URL
   */
  public static extractYouTubeId(url: string): string | null {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  /**
   * Extract Vimeo Video ID from any standard URL
   */
  public static extractVimeoId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|video\/|))(\d+)(?:[^\d]|$)/);
    return match ? match[1] : null;
  }

  /**
   * Extract Google Drive File ID from any Drive link
   */
  public static extractGoogleDriveId(url: string): string | null {
    if (!url) return null;
    // Format 1: drive.google.com/file/d/FILE_ID/view
    const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchFileD && matchFileD[1]) return matchFileD[1];

    // Format 2: id=FILE_ID
    const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

    // Format 3: drive.google.com/open?id=FILE_ID
    const matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
    if (matchOpen && matchOpen[1]) return matchOpen[1];

    // Format 4: direct ID passed
    if (/^[a-zA-Z0-9_-]{25,}$/.test(url.trim())) {
      return url.trim();
    }

    return null;
  }

  /**
   * Resolve any video source or media asset into a standardized NormalizedMediaObject
   */
  public static resolve(rawInput: {
    url: string;
    provider?: VideoProvider | 'mux' | 'cloudflare_stream';
    posterUrl?: string;
    aspectRatio?: VideoAspectRatio;
    orientation?: VideoOrientation;
    title?: string;
    duration?: string;
    driveFileId?: string;
    width?: number;
    height?: number;
  }): NormalizedMediaObject {
    const url = rawInput.url ? rawInput.url.trim() : '';
    let provider = rawInput.provider || 'direct';

    // Auto-detect provider if unspecified or generic
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      provider = 'youtube';
    } else if (url.includes('vimeo.com')) {
      provider = 'vimeo';
    } else if (url.includes('drive.google.com') || rawInput.driveFileId) {
      provider = 'googledrive';
    } else if (url.includes('.m3u8') || url.includes('mux.com') || url.includes('cloudflarestream.com')) {
      provider = 'mux';
    }

    const { aspectRatio: calculatedRatio, orientation: calculatedOrient } = this.calculateAspectRatio(
      rawInput.width,
      rawInput.height
    );

    const effectiveAspectRatio = rawInput.aspectRatio || calculatedRatio || '16:9';
    const effectiveOrientation = rawInput.orientation || calculatedOrient || 'landscape';

    // 1. YOUTUBE RESOLUTION
    if (provider === 'youtube') {
      const ytId = this.extractYouTubeId(url) || url;
      const embedUrl = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
      const poster = rawInput.posterUrl || `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`;

      return {
        playbackUrl: embedUrl,
        embedUrl,
        streamType: 'youtube_embed',
        posterUrl: poster,
        aspectRatio: effectiveAspectRatio,
        orientation: effectiveOrientation,
        provider: 'youtube',
        isDirectStream: false,
        healthStatus: 'healthy',
        title: rawInput.title,
        duration: rawInput.duration,
      };
    }

    // 2. VIMEO RESOLUTION
    if (provider === 'vimeo') {
      const vimeoId = this.extractVimeoId(url) || url;
      const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;

      return {
        playbackUrl: embedUrl,
        embedUrl,
        streamType: 'vimeo_embed',
        posterUrl: rawInput.posterUrl,
        aspectRatio: effectiveAspectRatio,
        orientation: effectiveOrientation,
        provider: 'vimeo',
        isDirectStream: false,
        healthStatus: 'healthy',
        title: rawInput.title,
        duration: rawInput.duration,
      };
    }

    // 3. GOOGLE DRIVE RESOLUTION
    if (provider === 'googledrive') {
      const driveId = rawInput.driveFileId || this.extractGoogleDriveId(url);
      if (driveId) {
        // Universal preview embed (always works without CORS issues)
        const embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;
        // Direct stream URL format (when browser permissions allow direct media decoding)
        const directStreamUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
        const poster = rawInput.posterUrl || `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`;

        return {
          playbackUrl: directStreamUrl,
          fallbackUrl: embedUrl,
          embedUrl,
          streamType: 'drive_embed',
          posterUrl: poster,
          aspectRatio: effectiveAspectRatio,
          orientation: effectiveOrientation,
          provider: 'googledrive',
          isDirectStream: false,
          healthStatus: 'healthy',
          title: rawInput.title,
          duration: rawInput.duration,
        };
      }
    }

    // 4. HLS / STREAMING (MUX / CLOUDFLARE)
    if (provider === 'mux' || provider === 'cloudflare_stream' || url.endsWith('.m3u8')) {
      return {
        playbackUrl: url,
        streamType: 'hls_stream',
        posterUrl: rawInput.posterUrl,
        aspectRatio: effectiveAspectRatio,
        orientation: effectiveOrientation,
        provider: 'mux',
        isDirectStream: true,
        healthStatus: 'healthy',
        title: rawInput.title,
        duration: rawInput.duration,
      };
    }

    // 5. DIRECT HTML5 VIDEO (MP4, WebM, MOV, Cloudinary, S3, GCS)
    return {
      playbackUrl: url,
      streamType: 'direct_video',
      posterUrl: rawInput.posterUrl,
      aspectRatio: effectiveAspectRatio,
      orientation: effectiveOrientation,
      provider: 'direct',
      isDirectStream: true,
      healthStatus: url ? 'healthy' : 'warning',
      title: rawInput.title,
      duration: rawInput.duration,
    };
  }

  /**
   * Health Check an asset URL / provider connection
   */
  public static async testMediaHealth(url: string, provider: string): Promise<MediaHealthResult> {
    const testedAt = new Date().toISOString();

    if (!url || url.trim().length === 0) {
      return {
        isHealthy: false,
        status: 'broken',
        message: 'No media source URL provided.',
        suggestedAction: 'Please enter a valid video stream or Google Drive URL.',
        testedAt,
      };
    }

    if (provider === 'youtube') {
      const id = this.extractYouTubeId(url);
      if (!id) {
        return {
          isHealthy: false,
          status: 'broken',
          message: 'Invalid YouTube link format.',
          suggestedAction: 'Copy standard YouTube watch or share URL.',
          testedAt,
        };
      }
      return {
        isHealthy: true,
        status: 'healthy',
        message: `YouTube video verified (ID: ${id}). Ready for responsive embedding.`,
        testedAt,
      };
    }

    if (provider === 'vimeo') {
      const id = this.extractVimeoId(url);
      if (!id) {
        return {
          isHealthy: false,
          status: 'broken',
          message: 'Invalid Vimeo link format.',
          suggestedAction: 'Copy standard Vimeo video URL with numeric ID.',
          testedAt,
        };
      }
      return {
        isHealthy: true,
        status: 'healthy',
        message: `Vimeo video verified (ID: ${id}). Ready for playback.`,
        testedAt,
      };
    }

    if (provider === 'googledrive') {
      const driveId = this.extractGoogleDriveId(url);
      if (!driveId) {
        return {
          isHealthy: false,
          status: 'broken',
          message: 'Could not extract Google Drive File ID from URL.',
          suggestedAction: 'Ensure link is set to "Anyone with the link can view".',
          testedAt,
        };
      }
      return {
        isHealthy: true,
        status: 'healthy',
        message: `Google Drive file linked (ID: ${driveId}). Streaming proxy and embed ready.`,
        testedAt,
      };
    }

    // Direct / Hosted video URLs
    try {
      // Basic format & protocol check
      const parsed = new URL(url);
      if (!['http:', 'https:', 'blob:'].includes(parsed.protocol)) {
        return {
          isHealthy: false,
          status: 'broken',
          message: `Unsupported protocol ${parsed.protocol}`,
          testedAt,
        };
      }

      return {
        isHealthy: true,
        status: 'healthy',
        message: 'Direct video stream URL formatted correctly. Ready for universal playback.',
        testedAt,
      };
    } catch {
      return {
        isHealthy: false,
        status: 'broken',
        message: 'Invalid URL string provided.',
        suggestedAction: 'Verify link starts with https://',
        testedAt,
      };
    }
  }

  /**
   * Extract video duration, width, height, and canvas thumbnail from a local File object
   */
  public static extractFileMetadata(file: File): Promise<MediaMetadataResult> {
    return new Promise((resolve) => {
      const blobUrl = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = blobUrl;
      video.muted = true;
      video.playsInline = true;

      const cleanup = () => {
        URL.revokeObjectURL(blobUrl);
      };

      const formatSeconds = (sec: number): string => {
        if (isNaN(sec)) return '00:00';
        const mins = Math.floor(sec / 60);
        const remainingSec = Math.floor(sec % 60);
        return `${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
      };

      const formatSize = (bytes: number): string => {
        if (bytes < 1024 * 1024) {
          return `${(bytes / 1024).toFixed(1)} KB`;
        }
        if (bytes < 1024 * 1024 * 1024) {
          return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        }
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      };

      video.onloadedmetadata = () => {
        const width = video.videoWidth || 1920;
        const height = video.videoHeight || 1080;
        const durationSec = video.duration || 0;
        const { aspectRatio, orientation } = this.calculateAspectRatio(width, height);

        // Seek slightly into the video to generate a thumbnail frame
        video.currentTime = Math.min(1.0, durationSec * 0.1);
      };

      video.onseeked = () => {
        let thumbUrl = '';
        try {
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(video.videoWidth || 640, 640);
          canvas.height = Math.round(canvas.width / ((video.videoWidth || 16) / (video.videoHeight || 9)));
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbUrl = canvas.toDataURL('image/jpeg', 0.85);
          }
        } catch {
          // Canvas capture might fail for cross-origin or restricted codecs
        }

        const width = video.videoWidth || 1920;
        const height = video.videoHeight || 1080;
        const { aspectRatio, orientation } = this.calculateAspectRatio(width, height);

        cleanup();
        resolve({
          width,
          height,
          duration: formatSeconds(video.duration || 0),
          durationSeconds: video.duration || 0,
          aspectRatio,
          orientation,
          fileSize: formatSize(file.size),
          mimeType: file.type || 'video/mp4',
          thumbnailUrl: thumbUrl || undefined,
        });
      };

      video.onerror = () => {
        cleanup();
        resolve({
          width: 1920,
          height: 1080,
          aspectRatio: '16:9',
          orientation: 'landscape',
          fileSize: formatSize(file.size),
          mimeType: file.type || 'video/mp4',
        });
      };

      // Timeout safety fallback (in case video event doesn't fire in 4 seconds)
      setTimeout(() => {
        cleanup();
        resolve({
          width: 1920,
          height: 1080,
          aspectRatio: '16:9',
          orientation: 'landscape',
          fileSize: formatSize(file.size),
          mimeType: file.type || 'video/mp4',
        });
      }, 4000);
    });
  }
}
