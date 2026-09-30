import { 
  MediaProviderType, 
  VideoOrientation, 
  AspectRatioType, 
  MediaAsset, 
  VideoItem,
  MediaHealthStatus
} from '../types';

export interface NormalizedPlayback {
  isEmbed: boolean;
  src: string;
  posterUrl?: string;
  aspectRatio: AspectRatioType;
  orientation: VideoOrientation;
  provider: MediaProviderType;
  title: string;
  duration?: string;
  isStreamReady: boolean;
  healthStatus: MediaHealthStatus;
  fallbackSrc?: string;
}

/**
 * Normalizes any video source (Google Drive, Direct Upload, YouTube, Vimeo, Mux, Cloudflare Stream)
 * into a single unified playback configuration for the Universal Video Player.
 */
export function normalizeVideoPlayback(
  video: VideoItem, 
  mediaAsset?: MediaAsset
): NormalizedPlayback {
  const provider = (video.provider || 'direct_upload') as MediaProviderType;
  const rawUrl = video.providerIdOrUrl || '';
  const title = video.title || mediaAsset?.title || 'Video Track';
  const posterUrl = video.thumbnailUrl || mediaAsset?.thumbnailUrl;
  const aspectRatio = video.aspectRatio || mediaAsset?.aspectRatio || '16:9';
  const orientation = video.orientation || mediaAsset?.orientation || 'landscape';
  const healthStatus: MediaHealthStatus = video.status || mediaAsset?.status || 'healthy';

  // 1. YouTube Provider
  if (provider === 'youtube' || rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
    let videoId = rawUrl;
    if (rawUrl.includes('v=')) {
      videoId = rawUrl.split('v=')[1].split('&')[0];
    } else if (rawUrl.includes('youtu.be/')) {
      videoId = rawUrl.split('youtu.be/')[1].split('?')[0];
    } else if (rawUrl.includes('embed/')) {
      videoId = rawUrl.split('embed/')[1].split('?')[0];
    }

    return {
      isEmbed: true,
      src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
      posterUrl,
      aspectRatio,
      orientation,
      provider: 'youtube',
      title,
      duration: video.duration,
      isStreamReady: true,
      healthStatus,
    };
  }

  // 2. Vimeo Provider
  if (provider === 'vimeo' || rawUrl.includes('vimeo.com')) {
    let videoId = rawUrl.split('/').pop()?.split('?')[0] || rawUrl;
    return {
      isEmbed: true,
      src: `https://player.vimeo.com/video/${videoId}?dnt=1&playsinline=1`,
      posterUrl,
      aspectRatio,
      orientation,
      provider: 'vimeo',
      title,
      duration: video.duration,
      isStreamReady: true,
      healthStatus,
    };
  }

  // 3. Google Drive Provider
  if (provider === 'google_drive' || provider === 'drive' || rawUrl.includes('drive.google.com')) {
    let fileId = video.driveFileId || '';
    if (!fileId && rawUrl.includes('/file/d/')) {
      fileId = rawUrl.split('/file/d/')[1].split('/')[0];
    } else if (!fileId && rawUrl.includes('id=')) {
      fileId = rawUrl.split('id=')[1].split('&')[0];
    }

    // If we have a direct streamable playback URL (such as ingested CDN or proxied stream), use native video
    const isDirectStream = rawUrl.endsWith('.mp4') || rawUrl.endsWith('.webm') || rawUrl.includes('commondatastorage.googleapis.com');
    
    if (isDirectStream) {
      return {
        isEmbed: false,
        src: rawUrl,
        posterUrl,
        aspectRatio,
        orientation,
        provider: 'google_drive',
        title,
        duration: video.duration,
        isStreamReady: true,
        healthStatus,
        fallbackSrc: fileId ? `https://drive.google.com/file/d/${fileId}/preview` : undefined,
      };
    }

    // Otherwise use Google Drive secure iframe preview embed
    return {
      isEmbed: true,
      src: fileId ? `https://drive.google.com/file/d/${fileId}/preview` : rawUrl,
      posterUrl,
      aspectRatio,
      orientation,
      provider: 'google_drive',
      title,
      duration: video.duration,
      isStreamReady: true,
      healthStatus,
    };
  }

  // 4. Mux / Cloudflare Stream / HLS Adaptive
  if (provider === 'mux' || provider === 'cloudflare_stream') {
    return {
      isEmbed: false,
      src: rawUrl,
      posterUrl,
      aspectRatio,
      orientation,
      provider,
      title,
      duration: video.duration,
      isStreamReady: true,
      healthStatus,
    };
  }

  // 5. Direct Upload / Custom / S3 Storage (Native Video)
  return {
    isEmbed: false,
    src: rawUrl,
    posterUrl,
    aspectRatio,
    orientation,
    provider: 'direct_upload',
    title,
    duration: video.duration,
    isStreamReady: Boolean(rawUrl),
    healthStatus,
  };
}

/**
 * Returns clean human-readable file sizes
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Converts seconds into MM:SS format
 */
export function formatTimeSeconds(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Returns aspect ratio Tailwind classes for responsive containers
 */
export function getAspectRatioClasses(ratio: AspectRatioType, orientation?: VideoOrientation): string {
  switch (ratio) {
    case '9:16':
      return 'aspect-[9/16] max-w-[360px] mx-auto';
    case '1:1':
      return 'aspect-square max-w-[520px] mx-auto';
    case '4:5':
      return 'aspect-[4/5] max-w-[440px] mx-auto';
    case '2.35:1':
      return 'aspect-[2.35/1] w-full';
    case '4:3':
      return 'aspect-[4/3] max-w-[680px] mx-auto';
    case '16:9':
    default:
      if (orientation === 'portrait') {
        return 'aspect-[9/16] max-w-[360px] mx-auto';
      }
      return 'aspect-video w-full';
  }
}
