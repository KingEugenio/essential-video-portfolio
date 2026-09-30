import React from 'react';
import { 
  Film, Video, Eye, MessageSquare, Plus, HardDrive, 
  TrendingUp, CheckCircle, AlertCircle, Clock, ArrowUpRight,
  RefreshCw, Play, ShieldCheck, Upload, Download
} from 'lucide-react';
import { AdminData, Project, Inquiry, MediaAsset } from '../../types';
import { ExportService } from '../../services/exportService';

interface OverviewTabProps {
  data: AdminData;
  onNavigateTab: (tab: string) => void;
  onOpenUpload: () => void;
  onOpenDrive: () => void;
  onHealthCheckAll: () => void;
  onPreviewPortfolio: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  data,
  onNavigateTab,
  onOpenUpload,
  onOpenDrive,
  onHealthCheckAll,
  onPreviewPortfolio,
}) => {
  const publishedCount = data.projects.filter((p) => p.status === 'published').length;
  const draftCount = data.projects.filter((p) => p.status === 'draft').length;
  const mediaCount = data.media?.length || 0;
  const healthyMediaCount = data.media?.filter((m) => m.status === 'healthy').length || 0;
  const warningMediaCount = data.media?.filter((m) => m.status === 'warning' || m.status === 'broken').length || 0;
  const newInquiriesCount = data.inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner / Welcome */}
      <div className="p-6 bg-gradient-to-r from-[#16161a] to-[#121214] border border-white/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/40 font-bold text-[10px] tracking-wider uppercase">
              EDITORIAL CMS WORKSPACE
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl text-white tracking-tight">
            {data.brand.brandName} // CONTROL ARCHIVE
          </h1>
          <p className="text-white/50 text-xs mt-1">
            Portfolio archive currently contains {publishedCount} published projects.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onPreviewPortfolio}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-bold rounded-lg shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW PUBLIC SITE</span>
          </button>

          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/10 font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#ff3b00]" />
            <span>ADD PROJECT</span>
          </button>

          <button
            onClick={() => ExportService.downloadExportJSON(data)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white/80 hover:text-white border border-white/10 font-bold rounded-lg transition-colors cursor-pointer"
            title="Download complete portfolio backup JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>EXPORT JSON</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span>TOTAL VIEWS</span>
            <Eye className="w-4 h-4 text-[#00e5ff]" />
          </div>
          <div className="font-heading font-black text-2xl text-white">
            {data.analytics.totalViews.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% this month
          </div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span>VIDEO PLAYS</span>
            <Play className="w-4 h-4 text-[#ff3b00]" />
          </div>
          <div className="font-heading font-black text-2xl text-white">
            {data.analytics.videoPlays.toLocaleString()}
          </div>
          <div className="text-[10px] text-white/40 mt-1">
            {data.analytics.videoCompletions} completions
          </div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span>PROJECTS</span>
            <Film className="w-4 h-4 text-[#ffe600]" />
          </div>
          <div className="font-heading font-black text-2xl text-white">
            {publishedCount} <span className="text-sm font-normal text-white/40">/ {data.projects.length}</span>
          </div>
          <div className="text-[10px] text-white/40 mt-1">
            {draftCount} in drafts
          </div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span>NEW INQUIRIES</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-heading font-black text-2xl text-white">
            {data.inquiries.length}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">
            {newInquiriesCount} unread transmissions
          </div>
        </div>
      </div>

      {/* Media Provider & Stream Health Card */}
      <div className="p-5 bg-[#121214] rounded-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="font-heading font-bold text-sm text-white">
                MEDIA PROVIDERS &amp; STREAM PLAYBACK HEALTH
              </h3>
            </div>
            <p className="text-white/50 text-[11px] mt-0.5">
              Automated cross-browser playback resolution and buffer health tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenUpload}
              className="px-3 py-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white rounded border border-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span>UPLOAD VIDEO</span>
            </button>
            <button
              onClick={onOpenDrive}
              className="px-3 py-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white rounded border border-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-400" />
              <span>BROWSE DRIVE</span>
            </button>
            <button
              onClick={onHealthCheckAll}
              className="p-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white/70 hover:text-white rounded border border-white/10 cursor-pointer"
              title="Test All Streams"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Health status metrics bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3 bg-[#16161a] rounded-lg border border-emerald-500/20 flex items-center justify-between">
            <div>
              <div className="text-emerald-400 font-bold text-sm">{healthyMediaCount} READY</div>
              <div className="text-white/40 text-[10px]">Healthy Playback Streams</div>
            </div>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="p-3 bg-[#16161a] rounded-lg border border-blue-500/20 flex items-center justify-between">
            <div>
              <div className="text-blue-400 font-bold text-sm">CONNECTED</div>
              <div className="text-white/40 text-[10px]">Google Drive API Active</div>
            </div>
            <HardDrive className="w-5 h-5 text-blue-400" />
          </div>

          <div className="p-3 bg-[#16161a] rounded-lg border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-sm">{mediaCount} ASSETS</div>
              <div className="text-white/40 text-[10px]">Universal Library Count</div>
            </div>
            <button
              onClick={() => onNavigateTab('media')}
              className="text-[#ff3b00] hover:underline text-[10px] font-bold"
            >
              VIEW ALL &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries + Recent Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Recent Inquiries */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="font-heading font-bold text-sm text-white">RECENT TRANSMISSIONS</h3>
              </div>
              <button
                onClick={() => onNavigateTab('inquiries')}
                className="text-[#ff3b00] hover:underline text-[10px]"
              >
                VIEW ALL ({data.inquiries.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {data.inquiries.slice(0, 3).map((inq) => (
                <div
                  key={inq.id}
                  className="p-3 bg-[#1a1a20] rounded-lg border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">{inq.name}</span>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-white/50 text-[10px] truncate">{inq.projectType} • {inq.budget || 'Budget TBD'}</div>
                  <div className="text-white/40 text-[10px] line-clamp-1 mt-1">{inq.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Playback & Visitor Logs */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00e5ff]" />
                <h3 className="font-heading font-bold text-sm text-white">PLAYBACK &amp; EVENT LOGS</h3>
              </div>
              <button
                onClick={() => onNavigateTab('analytics')}
                className="text-[#00e5ff] hover:underline text-[10px]"
              >
                FULL ANALYTICS
              </button>
            </div>

            <div className="space-y-2">
              {data.analytics.recentEvents?.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 bg-[#1a1a20] rounded-lg border border-white/5 flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Play className="w-3 h-3 text-[#ff3b00] flex-shrink-0" />
                    <span className="text-white font-bold truncate">{evt.projectTitle || 'Showreel'}</span>
                  </div>
                  <div className="text-white/40 text-[10px] flex-shrink-0">{evt.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
