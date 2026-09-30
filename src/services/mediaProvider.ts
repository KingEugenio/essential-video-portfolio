/**
 * Media Provider Abstraction Layer
 * 
 * Unifies playback resolution, embed iframe generation, poster fallback,
 * and aspect ratio detection across Direct Uploads, Google Drive,
 * YouTube, Vimeo, Mux, and Cloudflare Stream.
 */

import { VideoSource, VideoProvider, VideoAspectRatio } from '../types';

export interface IMediaProvider {
  provider: VideoProvider;
  validateUrl(url: string): boolean;
  extractId(url: string): string | null;
  getEmbedUrl(source: VideoSource): string;
  getPosterUrl(source: VideoSource): string;
}

export class YouTubeMediaProvider implements IMediaProvider {
  provider: VideoProvider = 'youtube';

  validateUrl(url: string): boolean {
    return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i.test(url);
  }

  extractId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  }

  getEmbedUrl(source: VideoSource): string {
    const id = source.embedId || this.extractId(source.url) || 'dQw4w9WgXcQ';
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  }

  getPosterUrl(source: VideoSource): string {
    if (source.posterUrl) return source.posterUrl;
    const id = source.embedId || this.extractId(source.url);
    if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    return 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80';
  }
}

export class VimeoMediaProvider implements IMediaProvider {
  provider: VideoProvider = 'vimeo';

  validateUrl(url: string): boolean {
    return /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/i.test(url);
  }

  extractId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
    return match ? match[3] : null;
  }

  getEmbedUrl(source: VideoSource): string {
    const id = source.embedId || this.extractId(source.url) || '76979871';
    return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
  }

  getPosterUrl(source: VideoSource): string {
    return source.posterUrl || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80';
  }
}

export class GoogleDriveMediaProvider implements IMediaProvider {
  provider: VideoProvider = 'googledrive';

  validateUrl(url: string): boolean {
    return /drive\.google\.com\/(?:file\/d\/([^\/?]+)|open\?id=([^\/?&]+))/i.test(url) || !!url;
  }

  extractId(url: string): string | null {
    const match = url.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/i);
    return match ? match[1] || match[2] : null;
  }

  getEmbedUrl(source: VideoSource): string {
    const fileId = source.driveFileId || this.extractId(source.url) || '1u_H01xVpY489t624';
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  getPosterUrl(source: VideoSource): string {
    if (source.posterUrl) return source.posterUrl;
    const fileId = source.driveFileId || this.extractId(source.url);
    if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1280`;
    return 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80';
  }
}

export class DirectMediaProvider implements IMediaProvider {
  provider: VideoProvider = 'direct';

  validateUrl(url: string): boolean {
    return /\.(mp4|webm|mov|m4v|m3u8)(\?.*)?$/i.test(url) || url.startsWith('blob:') || url.startsWith('http');
  }

  extractId(url: string): string | null {
    return url;
  }

  getEmbedUrl(source: VideoSource): string {
    return source.url;
  }

  getPosterUrl(source: VideoSource): string {
    return source.posterUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80';
  }
}

export class MediaProviderResolver {
  private static providers: Record<VideoProvider, IMediaProvider> = {
    youtube: new YouTubeMediaProvider(),
    vimeo: new VimeoMediaProvider(),
    googledrive: new GoogleDriveMediaProvider(),
    direct: new DirectMediaProvider(),
    mux: new DirectMediaProvider(),
    cloudflare_stream: new DirectMediaProvider(),
  };

  public static getProvider(providerName: VideoProvider): IMediaProvider {
    return this.providers[providerName] || this.providers.direct;
  }

  public static detectProvider(url: string): VideoProvider {
    if (!url) return 'direct';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('drive.google.com')) return 'googledrive';
    return 'direct';
  }

  public static resolveAspectRatio(ratio?: VideoAspectRatio): string {
    switch (ratio) {
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      case '4:3':
        return 'aspect-[4/3]';
      case '2.39:1':
        return 'aspect-[2.39/1]';
      case '16:9':
      default:
        return 'aspect-video';
    }
  }
}
