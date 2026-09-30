import React, { useState } from 'react';
import {
  HardDrive,
  Folder,
  Film,
  Image as ImageIcon,
  Search,
  CheckCircle2,
  ExternalLink,
  Plus,
  RefreshCw,
  Share2,
  Download,
  Sliders,
  Layers,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GoogleDriveFile } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';

export const AdminGoogleDrive: React.FC = () => {
  const {
    isDriveConnected,
    driveAccountEmail,
    connectGoogleDrive,
    disconnectGoogleDrive,
    driveFiles,
    driveFolders,
    currentFolderId,
    setCurrentFolderId,
    importDriveFileToMedia,
    addDriveFile,
    createProofingReview,
    setActiveView,
    showToast,
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'image'>('all');
  const [manualDriveUrl, setManualDriveUrl] = useState<string>('');

  const filteredFiles = driveFiles.filter(f => {
    if (filterType === 'video' && !f.isVideo) return false;
    if (filterType === 'image' && f.isVideo) return false;
    if (searchQuery.trim()) {
      return f.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleManualIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualDriveUrl.trim()) return;

    // Extract ID
    const match = manualDriveUrl.match(/[-\w]{25,}/);
    const fileId = match ? match[0] : `drive-${Date.now()}`;
    const newFile: GoogleDriveFile = {
      id: fileId,
      name: `Google_Drive_Ingest_${Date.now()}.mp4`,
      mimeType: 'video/mp4',
      size: '1.8 GB',
      thumbnailLink: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
      webViewLink: manualDriveUrl,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      duration: '02:15',
      resolution: '3840x2160 (4K)',
      isVideo: true,
      modifiedTime: new Date().toISOString(),
    };

    addDriveFile(newFile);
    setManualDriveUrl('');
    showToast('Drive video indexed successfully!');
  };

  const handleCreateProofingFromDrive = (file: GoogleDriveFile) => {
    const revId = createProofingReview({
      projectId: `proj-${file.id}`,
      projectTitle: file.name.replace(/\.[^/.]+$/, ''),
      clientName: 'VIP Client Review',
      versionName: 'v1_ProResMaster',
      status: 'in_review',
      videoSource: {
        provider: 'googledrive',
        url: file.embedUrl,
        posterUrl: file.thumbnailLink,
        driveFileId: file.id,
        duration: file.duration,
      },
    });
    setActiveView('proofing');
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-google-drive-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <HardDrive className="w-6 h-6 text-[var(--brand-primary)]" />
            Google Drive Media System
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Connect your Google Drive post-production workspace to sync ProRes cuts, color LUTs, and client proofing media.
          </p>
        </div>

        {isDriveConnected ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected: {driveAccountEmail}
            </span>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={disconnectGoogleDrive}
            >
              Disconnect
            </GlassButton>
          </div>
        ) : (
          <GlassButton
            variant="primary"
            size="md"
            icon={<HardDrive className="w-4 h-4" />}
            onClick={() => connectGoogleDrive()}
          >
            Connect Google Drive
          </GlassButton>
        )}
      </header>

      {/* Manual Link Ingest Card */}
      <section className="glass-card p-5 space-y-3 rounded-2xl border border-[var(--brand-border)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[var(--brand-primary)]" />
          Ingest Any Shared Google Drive Video Link
        </h3>
        <form onSubmit={handleManualIngest} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            required
            placeholder="Paste Google Drive shared file or preview URL (e.g. https://drive.google.com/file/d/1a2b3c...)"
            value={manualDriveUrl}
            onChange={e => setManualDriveUrl(e.target.value)}
            aria-label="Google Drive shared file URL"
            className="flex-1 px-4 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] font-mono"
          />
          <GlassButton
            type="submit"
            variant="primary"
            size="sm"
          >
            Index Video
          </GlassButton>
        </form>
      </section>

      {/* Drive Folders Bar */}
      <nav aria-label="Google Drive Folders" className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)]">
          Google Drive Folders
        </span>
        <ul className="flex items-center gap-3 overflow-x-auto pb-2 list-none p-0 m-0">
          {driveFolders.map(folder => (
            <li key={folder.id}>
              <article
                onClick={() => setCurrentFolderId(folder.id)}
                className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center gap-3 min-w-[200px] ${
                  currentFolderId === folder.id
                    ? 'bg-[var(--brand-surface-elevated)] border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]'
                    : 'glass-card border-[var(--brand-border)] hover:border-white/30'
                }`}
              >
                <Folder className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[var(--brand-text)] truncate m-0">
                    {folder.name}
                  </h4>
                  <span className="text-[10px] text-[var(--brand-text-muted)]">
                    {folder.itemCount} files
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </nav>

      {/* Search & Filter Bar */}
      <nav aria-label="Drive file filters" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[var(--brand-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search drive files..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search drive files"
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
          />
        </div>

        <ul className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] list-none m-0">
          <li>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[var(--brand-primary)] text-black font-bold'
                  : 'text-[var(--brand-text-secondary)] hover:text-white'
              }`}
            >
              All ({driveFiles.length})
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setFilterType('video')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                filterType === 'video'
                  ? 'bg-[var(--brand-primary)] text-black font-bold'
                  : 'text-[var(--brand-text-secondary)] hover:text-white'
              }`}
            >
              Videos ({driveFiles.filter(f => f.isVideo).length})
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setFilterType('image')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                filterType === 'image'
                  ? 'bg-[var(--brand-primary)] text-black font-bold'
                  : 'text-[var(--brand-text-secondary)] hover:text-white'
              }`}
            >
              Stills ({driveFiles.filter(f => !f.isVideo).length})
            </button>
          </li>
        </ul>
      </nav>

      {/* Files Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
        {filteredFiles.map(file => (
          <li key={file.id}>
            <article
              className="glass-card p-4 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--brand-border)] h-full transition-all hover:border-[var(--brand-primary)]/50"
            >
              <div>
                {/* Thumbnail Container */}
                <figure className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3 border border-[var(--brand-border)] m-0">
                  <img
                    src={file.thumbnailLink}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white flex items-center gap-1">
                      {file.isVideo ? <Film className="w-3 h-3 text-[var(--brand-primary)]" /> : <ImageIcon className="w-3 h-3" />}
                      {file.isVideo ? 'Video' : 'Still'}
                    </span>
                  </div>
                  {file.duration && (
                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-neutral-300">
                        {file.duration}
                      </span>
                    </div>
                  )}
                  <figcaption className="sr-only">{file.name}</figcaption>
                </figure>

                <h4 className="text-sm font-bold text-[var(--brand-text)] truncate m-0" title={file.name}>
                  {file.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-[var(--brand-text-muted)] mt-1">
                  <span>{file.size}</span>
                  <span>{file.resolution || 'UHD'}</span>
                </div>
              </div>

              {/* Actions */}
              <footer className="pt-3 border-t border-[var(--brand-border)] flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => importDriveFileToMedia(file)}
                  className="text-xs font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Import to Media</span>
                </button>

                {file.isVideo && (
                  <button
                    type="button"
                    onClick={() => handleCreateProofingFromDrive(file)}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Proof Link</span>
                  </button>
                )}
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
