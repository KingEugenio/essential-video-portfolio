import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Film,
  Image as ImageIcon,
  HardDrive,
  Sparkles,
  Copy,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink,
  Sliders,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Check,
  FileVideo,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem, VideoAspectRatio, VideoProvider } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassModal } from '../common/GlassModal';
import { UniversalMediaResolver } from '../../lib/media/providers';
import { AdminEmptyState } from '../common/AdminSkeletons';

export const AdminMediaLibrary: React.FC = () => {
  const {
    mediaItems,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    replaceProjectMedia,
    recheckAllMediaHealth,
    projects,
    driveFiles,
    isDriveConnected,
    connectGoogleDrive,
    importDriveFileToMedia,
    showToast,
  } = usePortfolio();

  // Active Tab within Media Library
  const [activeTab, setActiveTab] = useState<
    'all' | 'direct_upload' | 'drive_ingest' | 'url_ingest' | 'health_center' | 'replacement_tool'
  >('all');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [healthFilter, setHealthFilter] = useState<string>('all');

  // Direct File Upload State
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [extractedMetadata, setExtractedMetadata] = useState<any>(null);
  const [uploadCustomTitle, setUploadCustomTitle] = useState<string>('');

  // URL Ingest Modal State
  const [urlModalOpen, setUrlModalOpen] = useState<boolean>(false);
  const [newUrlItem, setNewUrlItem] = useState<{
    title: string;
    url: string;
    provider: VideoProvider;
    thumbnailUrl: string;
    duration: string;
    aspectRatio: VideoAspectRatio;
  }>({
    title: '',
    url: '',
    provider: 'direct',
    thumbnailUrl: '',
    duration: '01:30',
    aspectRatio: '16:9',
  });

  // Media Replacement Tool State
  const [replaceSelectedProjectId, setReplaceSelectedProjectId] = useState<string>(
    projects[0]?.id || ''
  );
  const [replaceSelectedMediaId, setReplaceSelectedMediaId] = useState<string>(
    mediaItems[0]?.id || ''
  );

  // Health Center state
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);
  const [healthResults, setHealthResults] = useState<
    Array<{ id: string; title: string; isHealthy: boolean; message: string; testedAt: string }>
  >([]);

  // Filtered Assets
  const filteredAssets = mediaItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider =
      providerFilter === 'all' || item.source === providerFilter || item.provider === providerFilter;

    const matchesHealth =
      healthFilter === 'all' ||
      (healthFilter === 'healthy' && item.healthStatus !== 'broken') ||
      (healthFilter === 'broken' && item.healthStatus === 'broken');

    return matchesSearch && matchesProvider && matchesHealth;
  });

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Media URL copied to clipboard!');
  };

  // Handle direct file selection & metadata analysis
  const handleFileSelect = async (file: File) => {
    if (!file) return;
    setUploadFile(file);
    setUploadCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
    setUploadProgress(0);

    const meta = await UniversalMediaResolver.extractFileMetadata(file);
    setExtractedMetadata(meta);
  };

  const handleStartUpload = () => {
    if (!uploadFile) return;
    setIsUploading(true);
    setUploadProgress(10);

    // Simulate chunked upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Complete addition
          const objectUrl = URL.createObjectURL(uploadFile);
          addMediaItem({
            title: uploadCustomTitle || uploadFile.name,
            filename: uploadFile.name,
            type: 'video',
            source: 'direct',
            provider: 'direct',
            url: objectUrl,
            playbackUrl: objectUrl,
            thumbnailUrl:
              extractedMetadata?.thumbnailUrl ||
              'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
            size: extractedMetadata?.fileSize || `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
            duration: extractedMetadata?.duration || '01:30',
            aspectRatio: extractedMetadata?.aspectRatio || '16:9',
            status: 'ready',
            healthStatus: 'healthy',
            visibility: 'public',
          });

          setUploadFile(null);
          setExtractedMetadata(null);
          setActiveTab('all');
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const handleUrlIngestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlItem.title || !newUrlItem.url) return;

    const resolved = UniversalMediaResolver.resolve({
      url: newUrlItem.url,
      provider: newUrlItem.provider,
      posterUrl: newUrlItem.thumbnailUrl,
      aspectRatio: newUrlItem.aspectRatio,
      title: newUrlItem.title,
    });

    addMediaItem({
      title: newUrlItem.title,
      type: 'video',
      source: resolved.provider as any,
      provider: resolved.provider as any,
      url: newUrlItem.url,
      playbackUrl: resolved.playbackUrl,
      thumbnailUrl:
        resolved.posterUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      size: 'Streaming Manifest',
      duration: newUrlItem.duration,
      aspectRatio: resolved.aspectRatio,
      status: 'ready',
      healthStatus: 'healthy',
      visibility: 'public',
    });

    setUrlModalOpen(false);
    setNewUrlItem({
      title: '',
      url: '',
      provider: 'direct',
      thumbnailUrl: '',
      duration: '01:30',
      aspectRatio: '16:9',
    });
  };

  const runComprehensiveHealthCheck = async () => {
    setIsCheckingHealth(true);
    const results: Array<{ id: string; title: string; isHealthy: boolean; message: string; testedAt: string }> = [];

    for (const item of mediaItems) {
      const res = await UniversalMediaResolver.testMediaHealth(
        item.playbackUrl || item.url,
        item.provider || item.source
      );
      results.push({
        id: item.id,
        title: item.title,
        isHealthy: res.isHealthy,
        message: res.message,
        testedAt: res.testedAt,
      });

      updateMediaItem(item.id, {
        healthStatus: res.status,
        status: res.isHealthy ? 'ready' : 'failed',
      });
    }

    setHealthResults(results);
    setIsCheckingHealth(false);
    showToast('Batch media health check completed!');
  };

  const handleApplyReplacement = () => {
    const proj = projects.find(p => p.id === replaceSelectedProjectId);
    const media = mediaItems.find(m => m.id === replaceSelectedMediaId);
    if (!proj || !media) return;

    replaceProjectMedia(proj.id, media);
    showToast(`Successfully linked "${media.title}" to project "${proj.title}"`);
  };

  return (
    <section className="space-y-6" id="admin-media-library-root">
      {/* Header & Sub-Navigation Tabs */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[var(--brand-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/40">
              Universal Media Engine
            </span>
            <span className="text-xs text-[var(--brand-text-muted)] font-mono">
              {mediaItems.length} indexed assets
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
            Media Library & Stream Ingest
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Manage provider-agnostic video masters, Google Drive assets, direct uploads, and media replacement.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <GlassButton
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />}
            onClick={runComprehensiveHealthCheck}
            disabled={isCheckingHealth}
          >
            {isCheckingHealth ? 'Testing Streams...' : 'Check All Health'}
          </GlassButton>

          <GlassButton
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setUrlModalOpen(true)}
          >
            Add URL Stream
          </GlassButton>
        </div>
      </header>

      {/* Sub-Tabs Selector */}
      <nav aria-label="Media Library Navigation" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[var(--brand-border)]">
        <ul className="flex items-center gap-2 list-none p-0 m-0">
          {[
            { id: 'all', label: 'All Assets', icon: <Layers className="w-3.5 h-3.5" />, count: mediaItems.length },
            { id: 'direct_upload', label: 'Direct Upload', icon: <Upload className="w-3.5 h-3.5" /> },
            { id: 'drive_ingest', label: 'Google Drive Ingest', icon: <HardDrive className="w-3.5 h-3.5" />, count: driveFiles.length },
            { id: 'health_center', label: 'Health Diagnostics', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'replacement_tool', label: 'Media Replacement Tool', icon: <Sliders className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--brand-surface-elevated)] font-bold'
                    : 'border-transparent text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-white font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* TAB 1: ALL ASSETS GRID */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-card border border-[var(--brand-border)]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--brand-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search media by title or URL..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={providerFilter}
                onChange={e => setProviderFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
              >
                <option value="all">All Providers</option>
                <option value="direct">Direct Upload</option>
                <option value="googledrive">Google Drive</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="mux">Mux / HLS</option>
              </select>

              <select
                value={healthFilter}
                onChange={e => setHealthFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
              >
                <option value="all">All Health</option>
                <option value="healthy">Healthy Only</option>
                <option value="broken">Issues / Needs Attention</option>
              </select>
            </div>
          </div>

          {/* Grid Cards */}
          {filteredAssets.length === 0 ? (
            <AdminEmptyState
              title="No media assets match criteria"
              description="Upload a new video file, import from Google Drive, or adjust your search filters."
              actionLabel="Upload Video"
              onAction={() => setActiveTab('direct_upload')}
              secondaryLabel="Add URL Stream"
              onSecondaryAction={() => setUrlModalOpen(true)}
            />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
              {filteredAssets.map(item => {
                const isHealthy = item.healthStatus !== 'broken';
                return (
                  <li key={item.id}>
                    <article className="h-full">
                      <GlassCard
                        className="p-4 flex flex-col justify-between gap-3 group/card hover:border-[var(--brand-primary)]/50 transition-all shadow-lg h-full"
                      >
                        <div>
                          <figure className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3 border border-[var(--brand-border)] m-0">
                            <img
                              src={
                                item.thumbnailUrl ||
                                'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800'
                              }
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              loading="lazy"
                            />
                            <figcaption className="sr-only">{item.title}</figcaption>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Top Badges */}
                            <div className="absolute top-2 left-2 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/85 backdrop-blur-md text-white border border-white/20">
                                {item.provider || item.source}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--brand-primary)] text-black">
                                {item.aspectRatio || '16:9'}
                              </span>
                            </div>

                            {/* Health Status Indicator */}
                            <div className="absolute top-2 right-2">
                              <span
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isHealthy
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    isHealthy ? 'bg-emerald-400' : 'bg-red-400 animate-ping'
                                  }`}
                                />
                                {isHealthy ? 'Healthy' : 'Attention'}
                              </span>
                            </div>

                            {/* Duration */}
                            {item.duration && (
                              <time className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/85 text-white border border-white/10">
                                {item.duration}
                              </time>
                            )}
                          </figure>

                          <h3 className="font-bold text-sm text-[var(--brand-text)] truncate" title={item.title}>
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[var(--brand-text-secondary)] font-mono truncate mt-0.5">
                            {item.playbackUrl || item.url}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-[var(--brand-text-muted)] mt-2 pt-2 border-t border-[var(--brand-border)]">
                            <span>Size: {item.size || 'Stream'}</span>
                            <span>Added: <time>{item.uploadedAt}</time></span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <footer className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--brand-border)]">
                          <button
                            type="button"
                            onClick={() => copyUrl(item.playbackUrl || item.url)}
                            className="flex items-center gap-1 text-[11px] font-medium text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:underline cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setReplaceSelectedMediaId(item.id);
                                setActiveTab('replacement_tool');
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[var(--brand-primary)] hover:text-black text-[var(--brand-text-secondary)] transition-colors cursor-pointer"
                              title="Assign to Project"
                              aria-label={`Assign ${item.title} to Project`}
                            >
                              <Sliders className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteMediaItem(item.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                              title="Delete Asset"
                              aria-label={`Delete ${item.title}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </footer>
                      </GlassCard>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* TAB 2: DIRECT DRAG & DROP FILE UPLOAD */}
      {activeTab === 'direct_upload' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <GlassCard className="p-6 sm:p-8 rounded-3xl border border-[var(--brand-border)] shadow-xl">
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/40 flex items-center justify-center mx-auto shadow-lg">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[var(--brand-text)]">
                Direct Video Upload & Metadata Extractor
              </h3>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                Drag and drop MP4, WebM, or MOV masters. The engine automatically inspects duration, dimensions, aspect ratio, and generates a poster thumbnail.
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                uploadFile
                  ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                  : 'border-[var(--brand-border)] hover:border-[var(--brand-primary)]/60 bg-black/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={e => e.target.files && handleFileSelect(e.target.files[0])}
              />

              {uploadFile ? (
                <div className="space-y-3">
                  <FileVideo className="w-10 h-10 text-[var(--brand-primary)] mx-auto" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--brand-text)]">{uploadFile.name}</h4>
                    <p className="text-xs text-[var(--brand-text-secondary)] font-mono">
                      {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB · {uploadFile.type || 'Video'}
                    </p>
                  </div>
                  <span className="text-[11px] text-[var(--brand-primary)] font-semibold underline">
                    Click to choose a different file
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Film className="w-8 h-8 text-[var(--brand-text-muted)] mx-auto opacity-70" />
                  <p className="text-sm font-semibold text-[var(--brand-text)]">
                    Drag video file here or click to browse
                  </p>
                  <p className="text-[11px] text-[var(--brand-text-muted)]">
                    Supports 4K ProRes, Cinema DCI, H.264 / H.265 (MP4, MOV, WebM)
                  </p>
                </div>
              )}
            </div>

            {/* Extracted Metadata Inspection */}
            {extractedMetadata && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Video Metadata Verified
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2 rounded bg-black/40">
                    <span className="text-[10px] text-neutral-400 block">Resolution</span>
                    <span className="font-bold font-mono text-white">
                      {extractedMetadata.width} x {extractedMetadata.height}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-black/40">
                    <span className="text-[10px] text-neutral-400 block">Aspect Ratio</span>
                    <span className="font-bold font-mono text-[var(--brand-primary)]">
                      {extractedMetadata.aspectRatio}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-black/40">
                    <span className="text-[10px] text-neutral-400 block">Duration</span>
                    <span className="font-bold font-mono text-white">
                      {extractedMetadata.duration}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-black/40">
                    <span className="text-[10px] text-neutral-400 block">Size</span>
                    <span className="font-bold font-mono text-white">
                      {extractedMetadata.fileSize}
                    </span>
                  </div>
                </div>

                {extractedMetadata.thumbnailUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={extractedMetadata.thumbnailUrl}
                      alt="Captured Poster"
                      className="w-24 h-14 object-cover rounded-lg border border-white/20"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Auto-Captured Poster Frame</span>
                      <span className="text-[10px] text-neutral-400 block">
                        Captured at 10% timeline frame mark.
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Asset Title in CMS
                  </label>
                  <input
                    type="text"
                    value={uploadCustomTitle}
                    onChange={e => setUploadCustomTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:border-[var(--brand-primary)] focus:outline-none"
                    placeholder="Enter project or asset name..."
                  />
                </div>

                {isUploading && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Ingesting Asset & Chunking Manifest...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--brand-primary)] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    disabled={isUploading}
                    onClick={handleStartUpload}
                  >
                    {isUploading ? 'Uploading & Processing...' : 'Save to Media Library'}
                  </GlassButton>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB 3: GOOGLE DRIVE INGEST */}
      {activeTab === 'drive_ingest' && (
        <div className="space-y-6">
          <GlassCard className="p-6 rounded-2xl border border-[var(--brand-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/40 flex items-center justify-center">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--brand-text)]">
                  Google Drive Cloud Storage Bridge
                </h3>
                <p className="text-xs text-[var(--brand-text-secondary)]">
                  {isDriveConnected
                    ? 'Connected and synchronized. Import any cloud video with one click.'
                    : 'Connect your Drive account or index public folders.'}
                </p>
              </div>
            </div>

            {!isDriveConnected ? (
              <GlassButton variant="primary" size="sm" onClick={() => connectGoogleDrive()}>
                Connect Google Drive
              </GlassButton>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Drive Online</span>
              </span>
            )}
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {driveFiles.map(file => (
              <GlassCard key={file.id} className="p-4 flex flex-col justify-between gap-3 shadow-lg">
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3 border border-[var(--brand-border)]">
                    <img
                      src={file.thumbnailLink}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/80 text-white">
                      Drive Video
                    </span>
                    {file.duration && (
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                        {file.duration}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-[var(--brand-text)] truncate">{file.name}</h4>
                  <p className="text-[11px] text-[var(--brand-text-secondary)] font-mono mt-0.5">
                    {file.size} · {file.resolution || '1080p'}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <span className="text-[10px] text-[var(--brand-text-muted)] font-mono">
                    ID: {file.id.substring(0, 10)}...
                  </span>
                  <GlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => importDriveFileToMedia(file)}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Import Asset
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MEDIA HEALTH CENTER */}
      {activeTab === 'health_center' && (
        <div className="space-y-6">
          <GlassCard className="p-6 rounded-2xl border border-[var(--brand-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-[var(--brand-text)]">
                  Media Source Health & Stream Diagnostic
                </h3>
                <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
                  Validates streaming manifests, Google Drive permission tokens, CORS headers, and fallback embed fallbacks.
                </p>
              </div>

              <GlassButton
                variant="primary"
                size="sm"
                icon={<RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />}
                onClick={runComprehensiveHealthCheck}
                disabled={isCheckingHealth}
              >
                {isCheckingHealth ? 'Running Diagnostics...' : 'Run Full Health Scan'}
              </GlassButton>
            </div>

            <div className="space-y-3">
              {mediaItems.map(item => {
                const isHealthy = item.healthStatus !== 'broken';
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isHealthy
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {isHealthy ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--brand-text)]">{item.title}</h4>
                        <p className="text-[11px] text-[var(--brand-text-secondary)] font-mono truncate max-w-md">
                          Provider: {item.provider || item.source} · URL: {item.playbackUrl || item.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          isHealthy
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {isHealthy ? 'Stream Ready' : 'Permission Required'}
                      </span>

                      <button
                        type="button"
                        onClick={() => copyUrl(item.playbackUrl || item.url)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white"
                        title="Copy Source"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 5: MEDIA REPLACEMENT TOOL */}
      {activeTab === 'replacement_tool' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <GlassCard className="p-6 sm:p-8 rounded-3xl border border-[var(--brand-border)] shadow-2xl space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[var(--brand-primary)]" />
                <h3 className="text-xl font-bold font-heading text-[var(--brand-text)]">
                  Seamless Media Replacement Tool
                </h3>
              </div>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                Instantly swap the video master or color grade stream for any published project without changing the project's slug, SEO metadata, client testimonials, or views count.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Select Target Project */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                  1. Select Target Project
                </label>
                <select
                  value={replaceSelectedProjectId}
                  onChange={e => setReplaceSelectedProjectId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-[var(--brand-border)] text-xs text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.category})
                    </option>
                  ))}
                </select>

                {/* Target Project Card Preview */}
                {projects.find(p => p.id === replaceSelectedProjectId) && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] text-neutral-400 font-mono block">CURRENT SOURCE:</span>
                    <p className="text-xs font-semibold text-white">
                      {projects.find(p => p.id === replaceSelectedProjectId)?.videoSource?.provider} (
                      {projects.find(p => p.id === replaceSelectedProjectId)?.videoSource?.aspectRatio || '16:9'})
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">
                      {projects.find(p => p.id === replaceSelectedProjectId)?.videoSource?.url}
                    </p>
                  </div>
                )}
              </div>

              {/* Select New Media Asset */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)]">
                  2. Select Replacement Media Asset
                </label>
                <select
                  value={replaceSelectedMediaId}
                  onChange={e => setReplaceSelectedMediaId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-[var(--brand-border)] text-xs text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
                >
                  {mediaItems.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.provider || m.source})
                    </option>
                  ))}
                </select>

                {/* Replacement Preview */}
                {mediaItems.find(m => m.id === replaceSelectedMediaId) && (
                  <div className="p-3 rounded-xl bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 space-y-2">
                    <span className="text-[10px] text-[var(--brand-primary)] font-mono font-bold block">
                      NEW REPLACEMENT MASTER:
                    </span>
                    <p className="text-xs font-bold text-white">
                      {mediaItems.find(m => m.id === replaceSelectedMediaId)?.title}
                    </p>
                    <p className="text-[10px] text-neutral-300 font-mono truncate">
                      {mediaItems.find(m => m.id === replaceSelectedMediaId)?.playbackUrl ||
                        mediaItems.find(m => m.id === replaceSelectedMediaId)?.url}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--brand-border)]">
              <GlassButton
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<Check className="w-4 h-4" />}
                onClick={handleApplyReplacement}
              >
                Apply Video Swap Now
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* URL INGEST MODAL */}
      <GlassModal
        isOpen={urlModalOpen}
        onClose={() => setUrlModalOpen(false)}
        title="Add URL / Streaming Video Asset"
      >
        <form onSubmit={handleUrlIngestSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
              Asset Title
            </label>
            <input
              type="text"
              required
              value={newUrlItem.title}
              onChange={e => setNewUrlItem({ ...newUrlItem, title: e.target.value })}
              placeholder="e.g. Commercial 4K Master Cut"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[var(--brand-border)] text-sm text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
              Stream / Video URL
            </label>
            <input
              type="url"
              required
              value={newUrlItem.url}
              onChange={e => {
                const url = e.target.value;
                let provider: VideoProvider = 'direct';
                if (url.includes('youtube.com') || url.includes('youtu.be')) provider = 'youtube';
                else if (url.includes('vimeo.com')) provider = 'vimeo';
                else if (url.includes('drive.google.com')) provider = 'googledrive';
                else if (url.includes('.m3u8')) provider = 'mux';
                setNewUrlItem({ ...newUrlItem, url, provider });
              }}
              placeholder="https://... (Direct MP4, Google Drive, YouTube, Vimeo, Mux)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[var(--brand-border)] text-sm text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                Provider Type
              </label>
              <select
                value={newUrlItem.provider}
                onChange={e => setNewUrlItem({ ...newUrlItem, provider: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[var(--brand-border)] text-sm text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
              >
                <option value="direct">Direct Stream / Cloudinary / S3</option>
                <option value="googledrive">Google Drive</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="mux">Mux / HLS Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                Aspect Ratio
              </label>
              <select
                value={newUrlItem.aspectRatio}
                onChange={e => setNewUrlItem({ ...newUrlItem, aspectRatio: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[var(--brand-border)] text-sm text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
              >
                <option value="16:9">16:9 (Landscape Standard)</option>
                <option value="9:16">9:16 (Vertical Reel / TikTok)</option>
                <option value="1:1">1:1 (Square Feed)</option>
                <option value="4:5">4:5 (Social Portrait)</option>
                <option value="2.39:1">2.39:1 (Anamorphic CinemaScope)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
              Custom Poster Thumbnail URL (Optional)
            </label>
            <input
              type="url"
              value={newUrlItem.thumbnailUrl}
              onChange={e => setNewUrlItem({ ...newUrlItem, thumbnailUrl: e.target.value })}
              placeholder="https://... (Leave blank for auto-poster)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[var(--brand-border)] text-sm text-[var(--brand-text)] focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <GlassButton type="button" variant="outline" size="sm" onClick={() => setUrlModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary" size="sm">
              Index Asset
            </GlassButton>
          </div>
        </form>
      </GlassModal>
    </section>
  );
};
