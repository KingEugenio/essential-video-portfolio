import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  RotateCcw, RefreshCw, AlertCircle, Film,
  Sliders, ShieldCheck, Check
} from 'lucide-react';
import { VideoItem, RetroEffectType, MediaAsset } from '../../types';
import { normalizeVideoPlayback, formatTimeSeconds, getAspectRatioClasses } from '../../services/mediaAdapter';

interface UniversalVideoPlayerProps {
  video: VideoItem;
  mediaAsset?: MediaAsset;
  className?: string;
  autoPlay?: boolean;
  retroEffect?: RetroEffectType;
  retroEffectIntensity?: 'low' | 'medium' | 'high';
  showControls?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (errorMessage: string) => void;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  video,
  mediaAsset,
  className = '',
  autoPlay = false,
  retroEffect = 'off',
  retroEffectIntensity = 'medium',
  showControls = true,
  loop = false,
  onPlay,
  onPause,
  onEnded,
  onError,
}) => {
  const playback = normalizeVideoPlayback(video, mediaAsset);

  const [hasStarted, setHasStarted] = useState<boolean>(autoPlay);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(autoPlay); // Default muted if autoplay to adhere to browser policies
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedEnd, setBufferedEnd] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Time & Buffer tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      const totalDur = videoRef.current.duration;
      if (!isNaN(totalDur) && totalDur > 0) {
        setDuration(totalDur);
      }

      // Calculate buffered range
      if (videoRef.current.buffered.length > 0) {
        try {
          const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
          setBufferedEnd(end);
        } catch {
          // ignore buffer range indexing errors
        }
      }
    }
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (playback.isEmbed) {
      setHasStarted(true);
      return;
    }

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    } else {
      setIsLoading(true);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          setIsLoading(false);
          setHasError(false);
          if (onPlay) onPlay();
        })
        .catch((err) => {
          console.warn('Playback interrupted or blocked by policy:', err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, onPlay, onPause, playback.isEmbed]);

  // Volume & Mute handling
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    if (!newMutedState && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Seek bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    const nextTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  // Speed rate cycle (0.5x, 1x, 1.25x, 1.5x, 2x)
  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  // Fullscreen management with Safari webkit compatibility
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Handle keyboard shortcuts (when player container is focused or hovered)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered && !isFullscreen) return;

      if (e.key === ' ' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipSeconds(5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipSeconds(-5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, isFullscreen, togglePlay]);

  // Track fullscreen changes from ESC or system events
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  // Handle retry
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setRetryCount((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHasError(true);
        });
    }
  };

  // Retro post-processing filter class
  const getRetroFilterClass = () => {
    if (retroEffect === 'crt') return 'contrast-125 saturate-110 hue-rotate-[-5deg]';
    if (retroEffect === 'vhs') return 'contrast-115 brightness-95 saturate-125';
    if (retroEffect === 'film') return 'contrast-110 brightness-100 sepia-[0.08]';
    if (retroEffect === 'glitch') return 'contrast-130 saturate-150';
    return '';
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <figure
      ref={containerRef}
      id={`player-${video.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group bg-[#09090b] text-white select-none overflow-hidden rounded-lg border border-white/10 shadow-2xl transition-all m-0 p-0 ${getAspectRatioClasses(
        playback.aspectRatio,
        playback.orientation
      )} ${className}`}
    >
      <figcaption className="sr-only">{playback.title || 'Video Player'}</figcaption>

      {/* 1. Error State with Branded Non-Technical Experience */}
      {hasError ? (
        <div role="alert" className="absolute inset-0 z-30 bg-[#121214] flex flex-col items-center justify-center p-6 text-center">
          {playback.posterUrl && (
            <img
              src={playback.posterUrl}
              alt={`${playback.title || 'Video project'} preview poster backdrop`}
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm pointer-events-none"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="relative z-10 max-w-sm flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertCircle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="font-heading font-bold text-base tracking-wide text-white">
              VIDEO TEMPORARILY UNAVAILABLE
            </div>
            <p className="text-white/60 text-xs font-mono">
              The media source is preparing a streaming pass. Please try reconnecting the stream.
            </p>
            <button
              id={`retry-btn-${video.id}`}
              type="button"
              onClick={handleRetry}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-mono text-xs font-bold rounded shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>RETRY PLAYBACK</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* 2. Loading State */}
      {isLoading && (
        <div role="status" aria-live="polite" className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="w-9 h-9 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-[11px] text-white/80 tracking-widest uppercase">
            Buffering Stream...
          </span>
        </div>
      )}

      {/* 3. Embedded Video Player (YouTube, Vimeo, Google Drive Embed) */}
      {playback.isEmbed ? (
        <div className="w-full h-full relative">
          {!hasStarted && playback.posterUrl ? (
            <div className="absolute inset-0 z-10">
              <img
                src={playback.posterUrl}
                alt={playback.title || 'Video project playback poster'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  id={`embed-play-btn-${video.id}`}
                  type="button"
                  onClick={() => setHasStarted(true)}
                  className="w-16 h-16 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,0,0.6)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label="Play Video"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white font-mono text-[10px] border border-white/10">
                {playback.title}
              </div>
            </div>
          ) : (
            <iframe
              src={playback.src}
              title={playback.title}
              className={`w-full h-full border-0 ${getRetroFilterClass()}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        /* 4. Native Video Player (Direct Uploads, Google Drive Stream Ingestion, MP4/WebM) */
        <div className="w-full h-full relative" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={playback.src}
            poster={playback.posterUrl}
            muted={isMuted}
            loop={loop}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
              setHasError(false);
            }}
            onError={(e) => {
              const errorDetail = (e.currentTarget && e.currentTarget.error ? e.currentTarget.error.message : '') || 'Video playback failed to stream';
              console.warn('Video load issue:', errorDetail);
              setIsLoading(false);
              setHasError(true);
              if (onError) onError(errorDetail);
            }}
            onEnded={() => {
              setIsPlaying(false);
              if (onEnded) onEnded();
            }}
            className={`w-full h-full object-cover cursor-pointer ${getRetroFilterClass()}`}
          />

          {/* Initial Poster Play Trigger */}
          {!hasStarted && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <button
                id={`native-play-btn-${video.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 rounded-full bg-[#ff3b00] hover:bg-[#ff5522] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,0,0.6)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                aria-label="Play Master Stream"
              >
                <Play className="w-7 h-7 fill-white translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Big Center Play/Pause Flash Indicator */}
          {hasStarted && !isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-opacity">
              <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <Play className="w-6 h-6 fill-white translate-x-0.5" aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Retro CRT Scanline Texture inside player if requested */}
          {retroEffect === 'crt' && (
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 mix-blend-overlay" aria-hidden="true" />
          )}

          {/* Custom Sleek Transport Controls */}
          {showControls && hasStarted && (
            <footer
              role="toolbar"
              aria-label="Video playback controls"
              onClick={(e) => e.stopPropagation()}
              className={`absolute inset-x-0 bottom-0 z-20 p-3 pt-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
                isHovered || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Seek Bar with Buffered Range */}
              <div className="relative mb-2.5 flex items-center group/seek">
                <div className="absolute inset-x-0 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  {/* Buffer Bar */}
                  <div
                    className="h-full bg-white/30 transition-all duration-300"
                    style={{ width: `${bufferPercent}%` }}
                  />
                </div>
                {/* Active Progress Bar */}
                <div
                  className="absolute left-0 h-1.5 bg-[#ff3b00] rounded-full pointer-events-none transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
                {/* Seek Range Input */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-valuemin={0}
                  aria-valuemax={duration || 100}
                  aria-valuenow={currentTime}
                  className="relative z-10 w-full h-4 opacity-0 cursor-pointer"
                  aria-label="Seek Video Time"
                />
              </div>

              {/* Controls Bar Row */}
              <div className="flex items-center justify-between text-xs font-mono text-white/90">
                {/* Left: Play/Pause, Skip, Timecode */}
                <div className="flex items-center gap-3">
                  <button
                    id={`toggle-play-btn-${video.id}`}
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#ff3b00] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" aria-hidden="true" /> : <Play className="w-4 h-4 fill-current" aria-hidden="true" />}
                  </button>

                  <button
                    id={`skip-10s-btn-${video.id}`}
                    type="button"
                    onClick={() => skipSeconds(10)}
                    className="p-1 hover:text-white text-white/60 transition-colors cursor-pointer hidden sm:block"
                    title="Skip 10s"
                    aria-label="Skip forward 10 seconds"
                  >
                    <RotateCcw className="w-3.5 h-3.5 scale-x-[-1]" aria-hidden="true" />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-1.5 group/vol">
                    <button
                      id={`toggle-mute-btn-${video.id}`}
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-[#ff3b00] transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-400" aria-hidden="true" />
                      ) : (
                        <Volume2 className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-valuemin={0}
                      aria-valuemax={1}
                      aria-valuenow={isMuted ? 0 : volume}
                      className="w-14 h-1 accent-[#ff3b00] bg-white/20 rounded cursor-pointer opacity-80 hover:opacity-100 hidden sm:block"
                      aria-label="Volume Slider"
                    />
                  </div>

                  {/* Time Display with time element */}
                  <div className="text-[11px] text-white/70 font-mono tracking-tight flex items-center">
                    <time dateTime={formatTimeSeconds(currentTime)} className="text-white font-bold">
                      {formatTimeSeconds(currentTime)}
                    </time>
                    <span className="opacity-40 mx-1" aria-hidden="true">/</span>
                    <time dateTime={formatTimeSeconds(duration || 0)}>
                      {formatTimeSeconds(duration || 0)}
                    </time>
                  </div>
                </div>

                {/* Right: Resolution Tag, Playback Speed, Fullscreen */}
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-[#00e5ff] font-bold tracking-wider hidden sm:inline">
                    {playback.aspectRatio}
                  </span>

                  {/* Speed Button */}
                  <button
                    id={`speed-btn-${video.id}`}
                    type="button"
                    onClick={cyclePlaybackRate}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold transition-colors cursor-pointer"
                    title="Change Playback Speed"
                    aria-label={`Playback speed: ${playbackRate}x`}
                  >
                    {playbackRate}x
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    id={`fullscreen-btn-${video.id}`}
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-[#ff3b00] transition-colors cursor-pointer"
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" aria-hidden="true" /> : <Maximize className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </footer>
          )}
        </div>
      )}
    </figure>
  );
};
