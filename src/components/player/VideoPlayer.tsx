import React from 'react';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { VideoItem, RetroEffectType, MediaAsset } from '../../types';

interface VideoPlayerProps {
  video: VideoItem;
  mediaAsset?: MediaAsset;
  className?: string;
  autoPlay?: boolean;
  retroEffect?: RetroEffectType;
  retroEffectIntensity?: 'low' | 'medium' | 'high';
  showControls?: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return <UniversalVideoPlayer {...props} />;
};
