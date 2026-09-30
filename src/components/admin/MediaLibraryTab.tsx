import React, { useState } from 'react';
import { 
  Film, Upload, HardDrive, Youtube, Video, Search, Filter, 
  CheckCircle, AlertCircle, Clock, RefreshCw, Trash2, 
  ExternalLink, Plus, Eye, Copy, ArrowRight, ShieldCheck,
  Smartphone, Monitor, X, Check, FileVideo
} from 'lucide-react';
import { MediaAsset, MediaProviderType, MediaHealthStatus, AspectRatioType, VideoOrientation, GoogleDriveFile } from '../../types';
import { formatBytes } from '../../services/mediaAdapter';
import { UniversalVideoPlayer } from '../player/UniversalVideoPlayer';

interface MediaLibraryTabProps {
  media: MediaAsset[];
  onAddMedia: (media: Partial<MediaAsset>) => void;
  onDeleteMedia: (id: string) => void;
  onHealthCheckMedia: (id: string) => void;
  onHealthCheckAll: () => void;
  onOpenDriveModal: () => void;
}

export const MediaLibraryTab: React.FC<MediaLibraryTabProps> = ({
  media,
  onAddMedia,
  onDeleteMedia,
  onHealthCheckMedia,
  onHealthCheckAll,
  onOpenDriveModal,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState<boolean>(false);
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);

  // Upload Form State
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [uploadDuration, setUploadDuration] = useState<string>('01:30');
  const [uploadAspectRatio, setUploadAspectRatio] = useState<AspectRatioType>('16:9');
  const [uploadOrientation, setUploadOrientation] = useState<VideoOrientation>('landscape');
  const [uploadSourceUrl, setUploadSourceUrl] = useState<string>('');
  const [uploadThumbnailUrl, setUploadThumbnailUrl] = useState<string>('');

  // YouTube / Vimeo Form State
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [externalTitle, setExternalTitle] = useState<string>('');
  const [externalProvider, setExternalProvider] = useState<'youtube' | 'vimeo'>('youtube');

  // Filtered media calculation
  const filteredMedia = media.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.filename && item.filename.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProvider = 
      providerFilter === 'all' || 
      item.provider === providerFilter ||
      (providerFilter === 'drive' && (item.provider === 'google_drive' || item.provider === 'drive')) ||
      (providerFilter === 'direct' && (item.provider === 'direct_upload' || item.provider === 'direct'));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesProvider && matchesStatus;
  });

  // Handle direct file upload simulation
  const handleStartUpload = () => {
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(100);

            // Add new asset to state & server
            onAddMedia({
              name: uploadFileName,
              title: uploadFileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
              filename: uploadFileName,
              playbackUrl: uploadSourceUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
              thumbnailUrl: uploadThumbnailUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
              type: 'video',
              provider: 'direct_upload',
              mimeType: uploadFileName.endsWith('.mov') ? 'video/quicktime' : 'video/mp4',
              size: '42.5 MB',
              duration: uploadDuration,
              aspectRatio: uploadAspectRatio,
              orientation: uploadOrientation,
              status: 'healthy',
              visibility: 'public',
            });

            // Reset modal
            setShowUploadModal(false);
            setUploadProgress(0);
            setUploadFileName('');
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  // Handle YouTube / Vimeo import
  const handleImportExternal = () => {
    if (!externalUrl.trim()) return;

    onAddMedia({
      name: externalTitle || `${externalProvider.toUpperCase()} Stream`,
      title: externalTitle || `${externalProvider.toUpperCase()} Master Cut`,
      playbackUrl: externalUrl,
      sourceUrl: externalUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      type: 'video',
      provider: externalProvider,
      size: 'Cloud Stream',
      aspectRatio: '16:9',
      orientation: 'landscape',
      status: 'healthy',
      visibility: 'public',
    });

    setShowYoutubeModal(false);
    setExternalUrl('');
    setExternalTitle('');
  };

  // Provider badge color helper
  const getProviderBadge = (provider: MediaProviderType) => {
    switch (provider) {
      case 'google_drive':
      case 'drive':
        return (
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
            <HardDrive className="w-3 h-3" /> GOOGLE DRIVE
          </span>
        );
      case 'youtube':
        return (
          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
            <Youtube className="w-3 h-3" /> YOUTUBE
          </span>
        );
      case 'vimeo':
        return (
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
            <Film className="w-3 h-3" /> VIMEO
          </span>
        );
      case 'direct_upload':
      case 'direct':
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
            <Upload className="w-3 h-3" /> DIRECT UPLOAD
          </span>
        );
    }
  };

  // Health status pill helper
  const getHealthPill = (status: MediaHealthStatus) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5 text-emerald-400" /> READY
          </span>
        );
      case 'processing':
        return (
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-mono font-bold flex items-center gap-1 animate-pulse">
            <Clock className="w-2.5 h-2.5 text-amber-400" /> PROCESSING
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5 text-yellow-400" /> WARNING
          </span>
        );
      case 'broken':
      case 'missing':
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5 text-red-400" /> BROKEN
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#121214] rounded-xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-5 h-5 text-[#ff3b00]" />
            <h2 className="font-heading font-bold text-xl text-white tracking-wide">
              UNIVERSAL MEDIA LIBRARY
            </h2>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono text-xs font-bold">
              {media.length} ASSETS
            </span>
          </div>
          <p className="text-white/50 text-xs font-mono">
            Manage, upload, and stream media across Google Drive, Direct Ingestion, YouTube, and Vimeo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-mono text-xs font-bold rounded-lg shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>UPLOAD VIDEO</span>
          </button>

          <button
            onClick={onOpenDriveModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/15 hover:border-blue-400 font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <HardDrive className="w-4 h-4 text-blue-400" />
            <span>GOOGLE DRIVE</span>
          </button>

          <button
            onClick={() => setShowYoutubeModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/15 hover:border-red-400 font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Youtube className="w-4 h-4 text-red-400" />
            <span>EXTERNAL URL</span>
          </button>

          <button
            onClick={onHealthCheckAll}
            className="p-2 bg-[#1a1a20] hover:bg-[#24242c] text-white/80 hover:text-white border border-white/15 rounded-lg transition-colors cursor-pointer"
            title="Revalidate All Media Playback Streams"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#121214] rounded-lg border border-white/10 font-mono text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search media by filename, title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#1a1a20] rounded border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#ff3b00]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {/* Provider */}
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="bg-[#1a1a20] text-white/80 border border-white/10 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#ff3b00] cursor-pointer"
          >
            <option value="all">All Providers</option>
            <option value="direct">Direct Upload</option>
            <option value="drive">Google Drive</option>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a20] text-white/80 border border-white/10 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#ff3b00] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="healthy">Ready (Healthy)</option>
            <option value="processing">Processing</option>
            <option value="warning">Warning</option>
            <option value="broken">Broken / Unavailable</option>
          </select>

          {/* Grid / List toggle */}
          <div className="flex items-center border border-white/10 rounded bg-[#1a1a20] p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#ff3b00] text-white' : 'text-white/50 hover:text-white'} transition-colors cursor-pointer`}
              title="Grid View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#ff3b00] text-white' : 'text-white/50 hover:text-white'} transition-colors cursor-pointer`}
              title="List View"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Assets List or Grid */}
      {filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-[#121214] rounded-xl border border-dashed border-white/15">
          <FileVideo className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-white mb-1">NO MEDIA ASSETS FOUND</h3>
          <p className="text-white/50 text-xs font-mono mb-4">
            Upload your master videos, connect Google Drive, or import YouTube/Vimeo streams.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-mono text-xs font-bold rounded-lg transition-transform cursor-pointer"
            >
              UPLOAD VIDEO
            </button>
            <button
              onClick={onOpenDriveModal}
              className="px-4 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/15 font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              BROWSE GOOGLE DRIVE
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMedia.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#121214] rounded-xl border border-white/10 hover:border-white/25 overflow-hidden transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-black/60 overflow-hidden border-b border-white/10">
                {asset.thumbnailUrl ? (
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/80 text-white/30 font-mono text-xs">
                    NO THUMBNAIL
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  {getProviderBadge(asset.provider)}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  {getHealthPill(asset.status)}
                </div>

                {/* Duration & Aspect Ratio Badge */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 font-mono text-[10px] text-white bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
                  <span>{asset.aspectRatio || '16:9'}</span>
                  <span className="opacity-40">|</span>
                  <span className="font-bold">{asset.duration || '00:00'}</span>
                </div>

                {/* Quick Play Trigger */}
                <button
                  onClick={() => setPreviewMedia(asset)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  title="Preview Media Playback"
                >
                  <div className="w-12 h-12 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Metadata Details */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-white line-clamp-1 mb-1" title={asset.name}>
                    {asset.title || asset.name}
                  </h4>
                  <div className="font-mono text-[11px] text-white/50 truncate" title={asset.filename || asset.playbackUrl}>
                    {asset.filename || asset.playbackUrl}
                  </div>
                </div>

                {/* Specs row */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/60">
                  <span>{asset.size || 'Stream'}</span>
                  <span>{asset.width && asset.height ? `${asset.width}x${asset.height}` : 'Normalized'}</span>
                  <span>{asset.createdAt}</span>
                </div>

                {/* Action controls */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onHealthCheckMedia(asset.id)}
                    className="p-1.5 text-white/60 hover:text-white bg-[#1a1a20] hover:bg-[#24242c] rounded border border-white/10 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                    title="Test Playback Health"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>TEST STREAM</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewMedia(asset)}
                      className="p-1.5 text-white/70 hover:text-white bg-[#1a1a20] hover:bg-[#24242c] rounded border border-white/10 cursor-pointer"
                      title="Inspect Video"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteMedia(asset.id)}
                      className="p-1.5 text-red-400/80 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-[#121214] rounded-xl border border-white/10 overflow-hidden font-mono text-xs">
          <div className="grid grid-cols-12 gap-3 p-3 bg-[#1a1a20] border-b border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-wider">
            <div className="col-span-4">Asset Name / Source</div>
            <div className="col-span-2">Provider</div>
            <div className="col-span-2">Aspect / Specs</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredMedia.map((asset) => (
              <div key={asset.id} className="grid grid-cols-12 gap-3 p-3 items-center hover:bg-white/[0.02] transition-colors">
                <div className="col-span-4 flex items-center gap-2.5 truncate">
                  <div className="w-10 h-7 bg-black rounded overflow-hidden flex-shrink-0 relative">
                    {asset.thumbnailUrl ? (
                      <img src={asset.thumbnailUrl} alt={asset.title || asset.name || "Media asset thumbnail"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20"><Film className="w-3 h-3" /></div>
                    )}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-white text-xs truncate">{asset.title || asset.name}</div>
                    <div className="text-[10px] text-white/40 truncate">{asset.filename || asset.playbackUrl}</div>
                  </div>
                </div>

                <div className="col-span-2">{getProviderBadge(asset.provider)}</div>
                <div className="col-span-2 text-white/70 text-[11px]">{asset.aspectRatio} • {asset.duration || '00:00'}</div>
                <div className="col-span-2">{getHealthPill(asset.status)}</div>
                
                <div className="col-span-2 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => setPreviewMedia(asset)}
                    className="p-1.5 text-white/70 hover:text-white bg-[#1a1a20] rounded border border-white/10 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onHealthCheckMedia(asset.id)}
                    className="p-1.5 text-white/70 hover:text-white bg-[#1a1a20] rounded border border-white/10 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteMedia(asset.id)}
                    className="p-1.5 text-red-400 bg-red-500/10 rounded border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Video Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/15 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#ff3b00]" />
                <h3 className="font-heading font-bold text-lg text-white">DIRECT VIDEO UPLOAD</h3>
              </div>
              <button
                onClick={() => {
                  if (!isUploading) setShowUploadModal(false);
                }}
                className="text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isUploading ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 border-3 border-[#ff3b00] border-t-transparent rounded-full animate-spin mx-auto" />
                <div>
                  <div className="font-heading font-bold text-white text-base">UPLOADING &amp; INGESTING VIDEO</div>
                  <p className="text-white/50 text-xs font-mono mt-1">{uploadFileName}</p>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                  <div
                    className="bg-[#ff3b00] h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[#00e5ff] font-bold">{uploadProgress}%</span>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                {/* Dropzone mockup */}
                <div className="border-2 border-dashed border-white/20 hover:border-[#ff3b00] rounded-xl p-6 text-center bg-[#1a1a20] transition-colors cursor-pointer">
                  <FileVideo className="w-8 h-8 text-[#ff3b00] mx-auto mb-2" />
                  <div className="font-bold text-white text-sm mb-0.5">Drop master video file here</div>
                  <div className="text-white/40 text-[11px]">Supports MP4, ProRes MOV, WebM (up to 4K resolution)</div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Video Filename *</label>
                  <input
                    type="text"
                    placeholder="e.g., Nike_Air_Max_Commercial_Master_4K.mp4"
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Aspect Ratio</label>
                    <select
                      value={uploadAspectRatio}
                      onChange={(e) => {
                        const r = e.target.value as AspectRatioType;
                        setUploadAspectRatio(r);
                        setUploadOrientation(r === '9:16' ? 'portrait' : r === '1:1' ? 'square' : 'landscape');
                      }}
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00] cursor-pointer"
                    >
                      <option value="16:9">16:9 Landscape</option>
                      <option value="9:16">9:16 Vertical Reel</option>
                      <option value="1:1">1:1 Square</option>
                      <option value="4:5">4:5 Social Feed</option>
                      <option value="2.35:1">2.35:1 Anamorphic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      placeholder="01:30"
                      value={uploadDuration}
                      onChange={(e) => setUploadDuration(e.target.value)}
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Direct Stream / Cloud Storage URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://.../video.mp4"
                    value={uploadSourceUrl}
                    onChange={(e) => setUploadSourceUrl(e.target.value)}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Custom Thumbnail Poster Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={uploadThumbnailUrl}
                    onChange={(e) => setUploadThumbnailUrl(e.target.value)}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-transparent hover:bg-white/10 text-white/70 rounded cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleStartUpload}
                    disabled={!uploadFileName.trim()}
                    className="px-5 py-2 bg-[#ff3b00] hover:bg-[#ff5522] disabled:opacity-50 text-white font-bold rounded shadow-lg transition-transform cursor-pointer"
                  >
                    START INGESTION
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* External URL Importer Modal (YouTube / Vimeo) */}
      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/15 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-400" />
                <h3 className="font-heading font-bold text-lg text-white">IMPORT EXTERNAL STREAM</h3>
              </div>
              <button onClick={() => setShowYoutubeModal(false)} className="text-white/40 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-1">Provider Source</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExternalProvider('youtube')}
                    className={`py-2 rounded border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      externalProvider === 'youtube'
                        ? 'bg-red-500/20 text-red-400 border-red-500/50'
                        : 'bg-[#1a1a20] text-white/60 border-white/10'
                    }`}
                  >
                    <Youtube className="w-4 h-4" /> YouTube
                  </button>
                  <button
                    type="button"
                    onClick={() => setExternalProvider('vimeo')}
                    className={`py-2 rounded border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      externalProvider === 'vimeo'
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                        : 'bg-[#1a1a20] text-white/60 border-white/10'
                    }`}
                  >
                    <Film className="w-4 h-4" /> Vimeo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Stream / Embed URL *</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Asset Title</label>
                <input
                  type="text"
                  placeholder="e.g., Behind The Scenes Cut"
                  value={externalTitle}
                  onChange={(e) => setExternalTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white focus:outline-none focus:border-[#ff3b00]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                <button
                  onClick={() => setShowYoutubeModal(false)}
                  className="px-4 py-2 bg-transparent hover:bg-white/10 text-white/70 rounded cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleImportExternal}
                  disabled={!externalUrl.trim()}
                  className="px-5 py-2 bg-[#ff3b00] hover:bg-[#ff5522] disabled:opacity-50 text-white font-bold rounded shadow-lg transition-transform cursor-pointer"
                >
                  IMPORT STREAM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Inspection & Playback Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/15 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#1a1a20] border-b border-white/10">
              <div className="flex items-center gap-2">
                {getProviderBadge(previewMedia.provider)}
                <span className="font-heading font-bold text-white text-sm truncate max-w-md">
                  {previewMedia.title || previewMedia.name}
                </span>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-1 text-white/60 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-4 bg-black/90">
              <UniversalVideoPlayer
                video={{
                  id: previewMedia.id,
                  title: previewMedia.title || previewMedia.name,
                  provider: previewMedia.provider,
                  providerIdOrUrl: previewMedia.playbackUrl,
                  orientation: previewMedia.orientation || 'landscape',
                  aspectRatio: previewMedia.aspectRatio || '16:9',
                  thumbnailUrl: previewMedia.thumbnailUrl,
                  status: previewMedia.status,
                }}
                autoPlay={false}
                className="max-h-[60vh] mx-auto"
              />
            </div>

            {/* Media Specifications Inspector */}
            <div className="p-5 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#121214] border-t border-white/10">
              <div>
                <div className="text-white/40 text-[10px] uppercase">Playback Status</div>
                <div className="mt-1">{getHealthPill(previewMedia.status)}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase">Aspect Ratio</div>
                <div className="text-white font-bold mt-1">{previewMedia.aspectRatio || '16:9'}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase">Duration</div>
                <div className="text-white font-bold mt-1">{previewMedia.duration || '00:00'}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase">File Size / Format</div>
                <div className="text-white font-bold mt-1">{previewMedia.size || 'Stream'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
