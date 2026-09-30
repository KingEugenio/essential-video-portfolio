import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Sparkles,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  Film,
  ExternalLink,
} from 'lucide-react';
import { VideoSource, ProofingComment, VideoAspectRatio } from '../../types';
import { UniversalMediaResolver, NormalizedMediaObject } from '../../lib/media/providers';

interface UniversalVideoPlayerProps {
  source: VideoSource;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  proofingComments?: ProofingComment[];
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onAddCommentAtTime?: (time: number) => void;
  onSeekTo?: (time: number) => void;
  externalCurrentTime?: number;
  showAspectRatioBadge?: boolean;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  source,
  title,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
  proofingComments = [],
  onTimeUpdate,
  onAddCommentAtTime,
  externalCurrentTime,
  showAspectRatioBadge = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [resolvedMedia, setResolvedMedia] = useState<NormalizedMediaObject>(() =>
    UniversalMediaResolver.resolve(source)
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState<boolean>(muted);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(autoPlay);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [useFallbackEmbed, setUseFallbackEmbed] = useState<boolean>(false);

  // Re-resolve media when source prop changes
  useEffect(() => {
    const resolved = UniversalMediaResolver.resolve(source);
    setResolvedMedia(resolved);
    setHasError(false);
    setUseFallbackEmbed(false);
    if (autoPlay) {
      setHasStarted(true);
      setIsPlaying(true);
    }
  }, [source, autoPlay]);

  // Sync external seek if provided
  useEffect(() => {
    if (externalCurrentTime !== undefined && videoRef.current) {
      if (Math.abs(videoRef.current.currentTime - externalCurrentTime) > 0.5) {
        videoRef.current.currentTime = externalCurrentTime;
        setCurrentTime(externalCurrentTime);
      }
    }
  }, [externalCurrentTime]);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        // If autoplay / direct stream fails, check if fallback exists
        if (resolvedMedia.fallbackUrl) {
          setUseFallbackEmbed(true);
        }
      });
      setIsPlaying(true);
      setHasStarted(true);
    }
  }, [isPlaying, resolvedMedia.fallbackUrl]);

  // Keyboard shortcut navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!containerRef.current?.contains(document.activeElement) && !hasStarted) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, handlePlayPause, hasStarted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setDuration(dur);
    if (onTimeUpdate) {
      onTimeUpdate(curr, dur);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    setIsBuffering(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const jumpTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
      setCurrentTime(videoRef.current.currentTime);
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const skipSeconds = (sec: number) => {
    if (videoRef.current) {
      jumpTo(videoRef.current.currentTime + sec);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // User activity tracker to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSpeedMenu(false);
      }
    }, 3000);
  };

  const handleVideoError = () => {
    // If direct Google Drive playback threw CORS or codec error, switch seamlessly to Drive embed!
    if (resolvedMedia.provider === 'googledrive' && resolvedMedia.fallbackUrl && !useFallbackEmbed) {
      setUseFallbackEmbed(true);
      return;
    }
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    setUseFallbackEmbed(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        if (resolvedMedia.fallbackUrl) {
          setUseFallbackEmbed(true);
        }
      });
    }
  };

  // Determine Aspect Ratio Container CSS class
  const getAspectRatioClasses = (aspect: VideoAspectRatio = '16:9') => {
    switch (aspect) {
      case '9:16':
        return 'aspect-[9/16] max-w-[420px] mx-auto';
      case '1:1':
        return 'aspect-square max-w-[650px] mx-auto';
      case '4:5':
        return 'aspect-[4/5] max-w-[540px] mx-auto';
      case '4:3':
        return 'aspect-[4/3]';
      case '2.39:1':
        return 'aspect-[2.39/1]';
      case '16:9':
      default:
        return 'aspect-video';
    }
  };

  const isEmbedStream =
    resolvedMedia.streamType === 'youtube_embed' ||
    resolvedMedia.streamType === 'vimeo_embed' ||
    (resolvedMedia.streamType === 'drive_embed' && (useFallbackEmbed || !resolvedMedia.isDirectStream));

  return (
    <figure
      ref={containerRef}
      id="universal-video-player"
      role="region"
      aria-label={title || 'HTML5 Video Showcase Player'}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative rounded-2xl overflow-hidden bg-black select-none border border-[var(--brand-border)] shadow-2xl focus:outline-none transition-all m-0 ${getAspectRatioClasses(
        resolvedMedia.aspectRatio
      )} ${className}`}
    >
      {/* 1. FRIENDLY ERROR STATE (Graceful recovery without technical jargon) */}
      {hasError && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center bg-black/90 backdrop-blur-md">
          {resolvedMedia.posterUrl && (
            <img
              src={resolvedMedia.posterUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm pointer-events-none"
            />
          )}
          <div className="relative z-10 max-w-md space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center mx-auto border border-[var(--brand-primary)]/40">
              <Film className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold font-heading text-white tracking-wide">
              VIDEO TEMPORARILY UNAVAILABLE
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              The media source stream is synchronizing or awaiting permission refresh. Please try replaying.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[var(--brand-primary)] text-black hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Playback</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. THIRD-PARTY / EMBEDDED STREAM PLAYER (YouTube, Vimeo, Google Drive Embed) */}
      {isEmbedStream && hasStarted ? (
        <iframe
          src={useFallbackEmbed && resolvedMedia.fallbackUrl ? resolvedMedia.fallbackUrl : resolvedMedia.playbackUrl}
          title={title || 'Video Player'}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      ) : (
        /* 3. NATIVE / DIRECT HTML5 VIDEO PLAYER */
        <>
          <video
            ref={videoRef}
            src={hasStarted ? resolvedMedia.playbackUrl : undefined}
            poster={resolvedMedia.posterUrl}
            playsInline
            preload="metadata"
            loop={loop}
            muted={muted}
            onClick={handlePlayPause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onEnded={() => setIsPlaying(false)}
            onError={handleVideoError}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Buffering Spinner */}
          {isBuffering && hasStarted && !hasError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 pointer-events-none">
              <div className="w-10 h-10 border-3 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
            </div>
          )}

          {/* POSTER-FIRST OVERLAY PLAY BUTTON (Lazy Loading Shield) */}
          {!hasStarted && (
            <div
              onClick={handlePlayPause}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer group/overlay transition-all"
            >
              {resolvedMedia.posterUrl && (
                <img
                  src={resolvedMedia.posterUrl}
                  alt={title || 'Poster'}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover/overlay:bg-black/20 transition-colors" />

              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--brand-primary)] text-black shadow-2xl transition-transform transform group-hover/overlay:scale-110">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-30" />
              </div>
            </div>
          )}

          {/* Top Info Bar */}
          {title && (
            <header
              className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none z-20 flex items-center justify-between ${
                showControls || !hasStarted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2">
                {showAspectRatioBadge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-primary)]/20 border border-[var(--brand-primary)]/50 text-[var(--brand-primary)] rounded">
                    {resolvedMedia.aspectRatio}
                  </span>
                )}
                <h4 className="text-sm sm:text-base font-semibold text-white truncate drop-shadow-md m-0">
                  {title}
                </h4>
              </div>

              {onAddCommentAtTime && (
                <button
                  type="button"
                  onClick={() => onAddCommentAtTime(currentTime)}
                  className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/20 hover:bg-[var(--brand-primary)] hover:text-black text-white backdrop-blur-md transition-all shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Note @ {formatTime(currentTime)}</span>
                </button>
              )}
            </header>
          )}

          <figcaption className="sr-only">{title || 'Video Player'}</figcaption>

          {/* Glass Control Bar */}
          <footer
            className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 z-20 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Container with Proofing Comment Markers */}
            <div className="relative mb-2.5 flex items-center group/scrubber">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)] transition-all hover:h-2.5"
                style={{
                  background: `linear-gradient(to right, var(--brand-primary) ${
                    (currentTime / (duration || 1)) * 100
                  }%, rgba(255,255,255,0.25) ${(currentTime / (duration || 1)) * 100}%)`,
                }}
              />

              {/* Render Proofing Comment Flags */}
              {duration > 0 &&
                proofingComments.map(comment => {
                  const percent = (comment.timestamp / duration) * 100;
                  return (
                    <button
                      key={comment.id}
                      type="button"
                      onClick={() => jumpTo(comment.timestamp)}
                      title={`[${comment.formattedTime}] ${comment.author}: ${comment.text}`}
                      className={`absolute -top-1.5 w-3 h-3 rounded-full border border-white transform -translate-x-1/2 transition-transform hover:scale-150 z-30 cursor-pointer ${
                        comment.status === 'resolved' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                      }`}
                      style={{ left: `${Math.min(Math.max(percent, 2), 98)}%` }}
                    />
                  );
                })}
            </div>

            {/* Bottom Controls Row */}
            <nav aria-label="Video playback controls" className="flex items-center justify-between gap-2 text-white">
              {/* Left Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skipSeconds(-5)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors hidden sm:block cursor-pointer"
                  title="Rewind 5s (←)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => skipSeconds(5)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors hidden sm:block cursor-pointer"
                  title="Forward 5s (→)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-1.5 group/vol">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Mute / Unmute (M)"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-20 h-1 bg-white/30 rounded appearance-none accent-[var(--brand-primary)] opacity-80 group-hover/vol:opacity-100 cursor-pointer"
                  />
                </div>

                {/* Time Display */}
                <span className="text-xs font-mono font-medium text-white/90">
                  {formatTime(currentTime)} <span className="text-white/40">/</span>{' '}
                  {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Speed Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-2 py-1 text-xs font-mono font-semibold rounded bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
                  >
                    {playbackSpeed}x
                  </button>

                  {showSpeedMenu && (
                    <ul className="absolute bottom-full right-0 mb-2 py-1 bg-neutral-900/95 border border-white/20 rounded-lg shadow-xl backdrop-blur-md z-30 min-w-[70px] list-none p-0 m-0">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(spd => (
                        <li key={spd}>
                          <button
                            type="button"
                            onClick={() => changePlaybackSpeed(spd)}
                            className={`w-full px-3 py-1 text-left text-xs cursor-pointer ${
                              playbackSpeed === spd
                                ? 'text-[var(--brand-primary)] font-bold bg-white/10'
                                : 'text-white hover:bg-white/5'
                            }`}
                          >
                            {spd}x
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Fullscreen (F)"
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </button>
              </div>
            </nav>
          </footer>
        </>
      )}
    </figure>
  );
};
