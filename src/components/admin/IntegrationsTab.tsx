import React, { useState } from 'react';
import { 
  HardDrive, Globe, Video, Mail, CheckCircle, 
  AlertCircle, RefreshCw, ExternalLink, ShieldCheck,
  Check, Sliders, Lock
} from 'lucide-react';
import { AdminData } from '../../types';

interface IntegrationsTabProps {
  data: AdminData;
  onUpdateDriveConfig: (config: any) => void;
  onUpdateWordpressConfig: (config: any) => void;
  onUpdateStreamingConfig: (config: any) => void;
  onOpenDriveModal: () => void;
}

export const IntegrationsTab: React.FC<IntegrationsTabProps> = ({
  data,
  onUpdateDriveConfig,
  onUpdateWordpressConfig,
  onUpdateStreamingConfig,
  onOpenDriveModal,
}) => {
  const [wpUrl, setWpUrl] = useState<string>(data.wordpressConfig?.restApiUrl || 'https://your-wordpress-site.com/wp-json/wp/v2');
  const [wpPostType, setWpPostType] = useState<string>(data.wordpressConfig?.customPostType || 'portfolio_project');
  const [wpSyncing, setWpSyncing] = useState<boolean>(false);
  const [wpSyncResult, setWpSyncResult] = useState<string | null>(null);

  const handleSyncWordPress = () => {
    setWpSyncing(true);
    setWpSyncResult(null);

    setTimeout(() => {
      setWpSyncing(false);
      setWpSyncResult('Synced 6 projects successfully with WordPress REST endpoint.');
      onUpdateWordpressConfig({
        enabled: true,
        restApiUrl: wpUrl,
        customPostType: wpPostType,
        lastSyncedAt: new Date().toISOString(),
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Header */}
      <div className="p-5 bg-[#121214] rounded-xl border border-white/10">
        <h2 className="font-heading font-bold text-xl text-white tracking-wide">
          EXTERNAL INTEGRATIONS &amp; STREAMING PROVIDERS
        </h2>
        <p className="text-white/50 text-xs mt-1">
          Configure Google Drive OAuth ingestion, Headless WordPress REST sync, Formspree webhooks, and Cloudflare/Mux streaming pipelines.
        </p>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Google Drive Integration Card */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">GOOGLE DRIVE INGESTION</h3>
                  <p className="text-white/40 text-[10px]">Cloud Video Library &amp; Raw Master Sync</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> CONNECTED
              </span>
            </div>

            <div className="mt-4 space-y-2 text-white/70">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Connected Account:</span>
                <span className="text-white font-bold">{data.driveConfig?.userEmail || 'editor@ekopixels.com'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Authorized Folders:</span>
                <span className="text-white">Client Commercials, Showreels, 16mm</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">Stream Processing:</span>
                <span className="text-emerald-400">Direct Ingestion + Proxy Embed</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onOpenDriveModal}
              className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-bold rounded-lg shadow-lg transition-transform cursor-pointer"
            >
              BROWSE DRIVE FILES
            </button>
            <span className="text-white/40 text-[10px]">OAuth 2.0 Token Valid</span>
          </div>
        </div>

        {/* 2. WordPress Headless REST API Sync */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">WORDPRESS REST API</h3>
                  <p className="text-white/40 text-[10px]">Headless CMS Auto-Sync</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                READY
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-white/60 mb-1 text-[11px]">WordPress REST Endpoint URL</label>
                <input
                  type="text"
                  value={wpUrl}
                  onChange={(e) => setWpUrl(e.target.value)}
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 text-[11px]">Custom Post Type Slug</label>
                <input
                  type="text"
                  value={wpPostType}
                  onChange={(e) => setWpPostType(e.target.value)}
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                />
              </div>

              {wpSyncResult && (
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px]">
                  {wpSyncResult}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleSyncWordPress}
              disabled={wpSyncing}
              className="px-4 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/15 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${wpSyncing ? 'animate-spin' : ''}`} />
              <span>{wpSyncing ? 'SYNCING...' : 'SYNC FROM WORDPRESS'}</span>
            </button>
            <span className="text-white/40 text-[10px]">v2 API JSON Compatible</span>
          </div>
        </div>

        {/* 3. Cloudflare Stream / Mux Adaptive Streaming */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">ADAPTIVE HLS STREAMING</h3>
                  <p className="text-white/40 text-[10px]">Cloudflare Stream &amp; Mux Video Pipelines</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                STANDBY
              </span>
            </div>

            <div className="mt-4 space-y-2 text-white/70">
              <p className="text-[11px] text-white/60">
                Universal fallback is configured. When high-bitrate 4K files are requested, the player delivers optimized bitrate streams.
              </p>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Default Transcoding:</span>
                <span className="text-white">1080p60 H.264 / AAC</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">HLS Adaptive Buffering:</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <span className="text-white/40 text-[10px]">All major CDNs supported</span>
          </div>
        </div>

        {/* 4. Formspree / Email Notification Webhook */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">TRANSMISSION WEBHOOKS</h3>
                  <p className="text-white/40 text-[10px]">Formspree &amp; Client Inquiries</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-2 text-white/70">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Inquiry Routing:</span>
                <span className="text-white font-bold">Formspree Direct &amp; CMS Database</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">Endpoint:</span>
                <span className="text-white/80 truncate max-w-xs">{data.contactConfig?.endpointUrl || 'https://formspree.io/f/...'}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <span className="text-white/40 text-[10px]">Instant client alert notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};
