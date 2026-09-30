import { MediaAsset, MediaProviderType, VideoItem, AspectRatioType, VideoOrientation } from '../../types';

export interface PlaybackResolution {
  src: string;
  type: string;
  isIframe: boolean;
  posterUrl?: string;
  aspectRatio: AspectRatioType;
  orientation: VideoOrientation;
}

export interface IMediaProvider {
  readonly providerType: MediaProviderType;
  resolvePlaybackSource(video: VideoItem, asset?: MediaAsset): PlaybackResolution;
  getThumbnail(video: VideoItem, asset?: MediaAsset): string | undefined;
  validate(url: string): boolean;
}

/**
 * Direct Upload Provider
 */
export class DirectUploadProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'direct_upload';

  public resolvePlaybackSource(video: VideoItem, asset?: MediaAsset): PlaybackResolution {
    const src = video.providerIdOrUrl || asset?.playbackUrl || asset?.sourceUrl || '';
    return {
      src,
      type: 'video/mp4',
      isIframe: false,
      posterUrl: video.thumbnailUrl || asset?.thumbnailUrl,
      aspectRatio: video.aspectRatio || asset?.aspectRatio || '16:9',
      orientation: video.orientation || asset?.orientation || 'landscape',
    };
  }

  public getThumbnail(video: VideoItem, asset?: MediaAsset): string | undefined {
    return video.thumbnailUrl || asset?.thumbnailUrl;
  }

  public validate(url: string): boolean {
    return url.startsWith('http') || url.startsWith('/') || url.startsWith('blob:');
  }
}

/**
 * Google Drive Provider
 */
export class GoogleDriveProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'google_drive';

  public resolvePlaybackSource(video: VideoItem, asset?: MediaAsset): PlaybackResolution {
    const rawUrl = video.providerIdOrUrl || asset?.playbackUrl || asset?.sourceUrl || '';
    const isDirectMp4 = rawUrl.includes('.mp4') || rawUrl.includes('commondatastorage');
    
    return {
      src: rawUrl,
      type: isDirectMp4 ? 'video/mp4' : 'application/x-google-drive',
      isIframe: !isDirectMp4 && (rawUrl.includes('drive.google.com/file') || rawUrl.includes('preview')),
      posterUrl: video.thumbnailUrl || asset?.thumbnailUrl,
      aspectRatio: video.aspectRatio || asset?.aspectRatio || '16:9',
      orientation: video.orientation || asset?.orientation || 'landscape',
    };
  }

  public getThumbnail(video: VideoItem, asset?: MediaAsset): string | undefined {
    return video.thumbnailUrl || asset?.thumbnailUrl;
  }

  public validate(url: string): boolean {
    return url.includes('drive.google.com') || url.includes('googleusercontent.com');
  }
}

/**
 * YouTube Provider
 */
export class YouTubeProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'youtube';

  public resolvePlaybackSource(video: VideoItem, asset?: MediaAsset): PlaybackResolution {
    const url = video.providerIdOrUrl || asset?.playbackUrl || asset?.sourceUrl || '';
    const videoId = this.extractYouTubeId(url);
    const embedUrl = videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`
      : url;

    return {
      src: embedUrl,
      type: 'video/youtube',
      isIframe: true,
      posterUrl: video.thumbnailUrl || asset?.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined),
      aspectRatio: video.aspectRatio || asset?.aspectRatio || '16:9',
      orientation: video.orientation || asset?.orientation || 'landscape',
    };
  }

  public getThumbnail(video: VideoItem, asset?: MediaAsset): string | undefined {
    const url = video.providerIdOrUrl || asset?.playbackUrl || asset?.sourceUrl || '';
    const videoId = this.extractYouTubeId(url);
    return video.thumbnailUrl || asset?.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined);
  }

  public validate(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  private extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }
}

/**
 * Vimeo Provider
 */
export class VimeoProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'vimeo';

  public resolvePlaybackSource(video: VideoItem, asset?: MediaAsset): PlaybackResolution {
    const url = video.providerIdOrUrl || asset?.playbackUrl || asset?.sourceUrl || '';
    const vimeoId = this.extractVimeoId(url);
    const embedUrl = vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&dnt=1`
      : url;

    return {
      src: embedUrl,
      type: 'video/vimeo',
      isIframe: true,
      posterUrl: video.thumbnailUrl || asset?.thumbnailUrl,
      aspectRatio: video.aspectRatio || asset?.aspectRatio || '16:9',
      orientation: video.orientation || asset?.orientation || 'landscape',
    };
  }

  public getThumbnail(video: VideoItem, asset?: MediaAsset): string | undefined {
    return video.thumbnailUrl || asset?.thumbnailUrl;
  }

  public validate(url: string): boolean {
    return url.includes('vimeo.com');
  }

  private extractVimeoId(url: string): string | null {
    const match = url.match(/(?:vimeo\.com\/(?:video\/|channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+)\/video\/|))(\d+)/);
    return match ? match[1] : null;
  }
}

/**
 * Media Provider Registry & Dispatcher
 */
export class MediaProviderManager {
  private static providers: Map<MediaProviderType, IMediaProvider> = new Map([
    ['direct_upload', new DirectUploadProvider()],
    ['direct', new DirectUploadProvider()],
    ['google_drive', new GoogleDriveProvider()],
    ['drive', new GoogleDriveProvider()],
    ['youtube', new YouTubeProvider()],
    ['vimeo', new VimeoProvider()],
  ]);

  public static getProvider(type: MediaProviderType = 'direct_upload'): IMediaProvider {
    return this.providers.get(type) || this.providers.get('direct_upload')!;
  }

  public static resolve(video: VideoItem, asset?: MediaAsset): PlaybackResolution {
    const provider = this.getProvider(video.provider || asset?.provider);
    return provider.resolvePlaybackSource(video, asset);
  }
}
