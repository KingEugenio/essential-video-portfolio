import React, { useState, useEffect } from 'react';
import { 
  HardDrive, Folder, FileVideo, CheckCircle, RefreshCw, 
  Search, ExternalLink, Download, X, Plus, ShieldCheck,
  Check, Smartphone, Monitor
} from 'lucide-react';
import { GoogleDriveFile, MediaAsset } from '../../types';
import { GoogleDriveModalSkeleton } from '../skeletons/GoogleDriveModalSkeleton';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportDriveFile: (file: GoogleDriveFile) => void;
  userEmail?: string;
  connected: boolean;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  onImportDriveFile,
  userEmail = 'editor@ekopixels.com',
  connected = true,
}) => {
  const [currentFolder, setCurrentFolder] = useState<string>('Client Commercials');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<GoogleDriveFile | null>(null);
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  // Demo Google Drive sample file dataset
  const folders = [
    'Client Commercials',
    'Showreels 2026',
    'Music Videos 16mm',
    'Social 9x16 Cuts',
    'RAW Color Passes',
  ];

  const driveFiles: GoogleDriveFile[] = [
    {
      id: 'drive-vid-01',
      name: 'Nike_Air_Max_Commercial_Master_ProRes422HQ.mov',
      mimeType: 'video/quicktime',
      thumbnailLink: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      webViewLink: 'https://drive.google.com/file/d/1a2b3c4d5e6f/view',
      webContentLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      size: '4.8 GB',
      videoMediaMetadata: { width: 3840, height: 2160, durationMillis: '62000' }
    },
    {
      id: 'drive-vid-02',
      name: 'Gucci_Milan_Fashion_Vertical_Reel_9x16.mp4',
      mimeType: 'video/mp4',
      thumbnailLink: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80',
      webViewLink: 'https://drive.google.com/file/d/2b3c4d5e6f7g/view',
      webContentLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      size: '340 MB',
      videoMediaMetadata: { width: 1080, height: 1920, durationMillis: '28000' }
    },
    {
      id: 'drive-vid-03',
      name: 'RedBull_FPV_Drone_RAW_SLog3_Grade_Pass.mov',
      mimeType: 'video/quicktime',
      thumbnailLink: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
      webViewLink: 'https://drive.google.com/file/d/3c4d5e6f7g8h/view',
      webContentLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      size: '8.2 GB',
      videoMediaMetadata: { width: 4096, height: 2160, durationMillis: '135000' }
    },
    {
      id: 'drive-vid-04',
      name: 'Sony_Music_Aura_Music_Video_16mm_Scan.mov',
      mimeType: 'video/quicktime',
      thumbnailLink: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      webViewLink: 'https://drive.google.com/file/d/4d5e6f7g8h9i/view',
      webContentLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      size: '12.4 GB',
      videoMediaMetadata: { width: 2048, height: 1152, durationMillis: '214000' }
    },
    {
      id: 'drive-vid-05',
      name: 'Square_Instagram_Motion_Promo_1x1.mp4',
      mimeType: 'video/mp4',
      thumbnailLink: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      webViewLink: 'https://drive.google.com/file/d/5e6f7g8h9i0j/view',
      webContentLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
      size: '185 MB',
      videoMediaMetadata: { width: 1080, height: 1080, durationMillis: '45000' }
    }
  ];

  const filteredFiles = driveFiles.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = (file: GoogleDriveFile) => {
    onImportDriveFile(file);
    setImportedIds((prev) => new Set([...prev, file.id]));
  };

  if (!isOpen) return null;

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="drive-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 w-full h-full border-0 m-0 max-w-none max-h-none block"
    >
      {/* Backdrop click handler */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 bg-[#121214] border border-white/15 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto">
        {/* Top Header */}
        <header className="p-4 bg-[#1a1a20] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <HardDrive className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="drive-modal-title" className="font-heading font-bold text-base text-white">
                  GOOGLE DRIVE MEDIA INGESTION
                </h3>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/10 text-[10px] font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" /> AUTHORIZED
                </span>
              </div>
              <p className="text-white/50 text-xs font-mono">{userEmail}</p>
            </div>
          </div>

          <button
            id="drive-modal-close-top-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded cursor-pointer"
            aria-label="Close Google Drive Modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        {/* Browser Body (Folders on left, Files on right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden font-mono text-xs">
          {/* Folders Navigation */}
          <nav aria-label="Google Drive Folders" className="w-full md:w-56 bg-[#0e0e10] border-r border-white/10 p-3 space-y-1">
            <div className="text-[10px] font-bold text-white/40 uppercase px-2 mb-2">Drive Folders</div>
            <ul role="list" className="space-y-1 list-none p-0 m-0">
              {folders.map((folder) => (
                <li key={folder}>
                  <button
                    id={`drive-folder-btn-${folder.replace(/\s+/g, '-').toLowerCase()}`}
                    type="button"
                    onClick={() => setCurrentFolder(folder)}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left transition-colors cursor-pointer ${
                      currentFolder === folder
                        ? 'bg-[#ff3b00] text-white font-bold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="truncate">{folder}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Files List & Search */}
          <div className="flex-1 flex flex-col bg-[#121214] overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-white/10 bg-[#16161a] flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" aria-hidden="true" />
                <input
                  id="drive-search-input"
                  type="text"
                  placeholder={`Search video assets in ${currentFolder}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#1a1a20] rounded border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#ff3b00]"
                />
              </div>
              <button
                id="drive-refresh-btn"
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 500);
                }}
                className="p-1.5 text-white/60 hover:text-white bg-[#1a1a20] rounded border border-white/10 cursor-pointer"
                title="Refresh Drive Files"
                aria-label="Refresh Drive Files"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              </button>
            </div>

            {/* Files Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {isLoading ? (
                // Realistic Drive Skeletons
                <ul role="list" className="space-y-2.5 list-none p-0 m-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="p-3 rounded-xl bg-[#1a1a20] border border-white/5 flex items-center justify-between gap-3 animate-pulse">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-14 h-10 bg-white/10 rounded flex-shrink-0" />
                        <div className="space-y-1.5 flex-1 max-w-sm">
                          <div className="h-3.5 bg-white/10 rounded w-3/4" />
                          <div className="h-2.5 bg-white/5 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-white/5 rounded-lg" />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul role="list" className="space-y-2.5 list-none p-0 m-0">
                  {filteredFiles.map((file) => {
                    const isImported = importedIds.has(file.id);
                    const isVertical = file.name.toLowerCase().includes('9x16') || file.name.toLowerCase().includes('vertical');
                    const isSquare = file.name.toLowerCase().includes('1x1') || file.name.toLowerCase().includes('square');
                    const durationSeconds = file.videoMediaMetadata?.durationMillis
                      ? Math.floor(parseInt(file.videoMediaMetadata.durationMillis) / 1000)
                      : 60;
                    const durationText = `${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}:${String(
                      durationSeconds % 60
                    ).padStart(2, '0')}`;

                    return (
                      <li key={file.id}>
                        <article className="p-3 rounded-xl bg-[#1a1a20] border border-white/10 hover:border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
                          <div className="flex items-center gap-3">
                            <figure className="w-14 h-10 bg-black rounded overflow-hidden flex-shrink-0 relative m-0">
                              {file.thumbnailLink ? (
                                <img src={file.thumbnailLink} alt={file.name || "Drive video thumbnail"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                  <FileVideo className="w-4 h-4" aria-hidden="true" />
                                </div>
                              )}
                              <figcaption className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] text-white px-1 rounded">
                                {isVertical ? '9:16' : isSquare ? '1:1' : '16:9'}
                              </figcaption>
                            </figure>

                            <div className="min-w-0">
                              <h4 className="font-bold text-white text-xs truncate max-w-sm m-0" title={file.name}>
                                {file.name}
                              </h4>
                              <div className="text-[10px] text-white/50 flex items-center gap-2 mt-0.5">
                                <span>{file.size}</span>
                                <span aria-hidden="true">•</span>
                                <time>{durationText}</time>
                                <span aria-hidden="true">•</span>
                                <span>{file.videoMediaMetadata ? `${file.videoMediaMetadata.width}x${file.videoMediaMetadata.height}` : 'HD'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <a
                              id={`drive-file-link-${file.id}`}
                              href={file.webViewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-white/50 hover:text-white bg-black/40 rounded border border-white/10 text-[10px] flex items-center gap-1"
                              title="View on Google Drive"
                            >
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>

                            <button
                              id={`drive-file-import-btn-${file.id}`}
                              type="button"
                              onClick={() => handleImport(file)}
                              disabled={isImported}
                              className={`px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                                isImported
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                                  : 'bg-[#ff3b00] hover:bg-[#ff5522] text-white active:scale-95 shadow-md'
                              }`}
                            >
                              {isImported ? (
                                <>
                                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>IMPORTED</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>INGEST TO CMS</span>
                                </>
                              )}
                            </button>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-3 bg-[#1a1a20] border-t border-white/10 flex items-center justify-between text-white/50 font-mono text-[11px]">
          <div>Playback normalization and asset optimization verified.</div>
          <button
            id="drive-modal-close-bottom-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer"
          >
            CLOSE
          </button>
        </footer>
      </div>
    </dialog>
  );
};
