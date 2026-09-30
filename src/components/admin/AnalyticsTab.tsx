import React from 'react';
import { 
  BarChart3, Eye, Play, CheckCircle, Smartphone, 
  Monitor, Tablet, Globe, TrendingUp, Clock
} from 'lucide-react';
import { AdminAnalytics, Project } from '../../types';

interface AnalyticsTabProps {
  analytics: AdminAnalytics;
  projects: Project[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ analytics, projects }) => {
  const completionRate = analytics.videoPlays > 0 
    ? Math.round((analytics.videoCompletions / analytics.videoPlays) * 100) 
    : 0;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Header */}
      <div className="p-5 bg-[#121214] rounded-xl border border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-[#00e5ff]" />
            <h2 className="font-heading font-bold text-xl text-white tracking-wide">
              PERFORMANCE &amp; AUDIENCE ANALYTICS
            </h2>
          </div>
          <p className="text-white/50 text-xs font-mono">
            Privacy-safe real-time telemetry on video playback completions, client engagement, and device distribution.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#121214] rounded-xl border border-white/10">
          <div className="text-white/50 text-[10px] uppercase">Total Views</div>
          <div className="font-heading font-black text-2xl text-white mt-1">
            {analytics.totalViews.toLocaleString()}
          </div>
          <div className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4%
          </div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10">
          <div className="text-white/50 text-[10px] uppercase">Video Plays Initiated</div>
          <div className="font-heading font-black text-2xl text-white mt-1">
            {analytics.videoPlays.toLocaleString()}
          </div>
          <div className="text-white/40 text-[10px] mt-1">Universal across all providers</div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10">
          <div className="text-white/50 text-[10px] uppercase">Completion Rate</div>
          <div className="font-heading font-black text-2xl text-white mt-1">
            {completionRate}%
          </div>
          <div className="text-[#00e5ff] text-[10px] mt-1">{analytics.videoCompletions} finished watch</div>
        </div>

        <div className="p-4 bg-[#121214] rounded-xl border border-white/10">
          <div className="text-white/50 text-[10px] uppercase">Inquiries Generated</div>
          <div className="font-heading font-black text-2xl text-white mt-1">
            {analytics.inquiriesCount}
          </div>
          <div className="text-emerald-400 text-[10px] mt-1">High conversion</div>
        </div>
      </div>

      {/* Middle Row: Device Breakdown & Browser Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Device Breakdown */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#ff3b00]" />
            <span>AUDIENCE DEVICE BREAKDOWN</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5" /> Desktop (16:9)</span>
                <span className="font-bold text-white">{analytics.deviceBreakdown.desktop}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-[#ff3b00] h-full" style={{ width: `${analytics.deviceBreakdown.desktop}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Mobile (9:16 Social)</span>
                <span className="font-bold text-white">{analytics.deviceBreakdown.mobile}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-[#00e5ff] h-full" style={{ width: `${analytics.deviceBreakdown.mobile}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span className="flex items-center gap-1.5"><Tablet className="w-3.5 h-3.5" /> Tablet</span>
                <span className="font-bold text-white">{analytics.deviceBreakdown.tablet}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-[#ffe600] h-full" style={{ width: `${analytics.deviceBreakdown.tablet}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Browser Breakdown */}
        <div className="p-5 bg-[#121214] rounded-xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00e5ff]" />
            <span>BROWSER DISTRIBUTION</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#1a1a20] rounded-lg border border-white/5">
              <div className="text-white/40 text-[10px]">Google Chrome</div>
              <div className="text-white font-bold text-lg mt-0.5">{analytics.browserBreakdown.chrome}%</div>
            </div>
            <div className="p-3 bg-[#1a1a20] rounded-lg border border-white/5">
              <div className="text-white/40 text-[10px]">Apple Safari</div>
              <div className="text-white font-bold text-lg mt-0.5">{analytics.browserBreakdown.safari}%</div>
            </div>
            <div className="p-3 bg-[#1a1a20] rounded-lg border border-white/5">
              <div className="text-white/40 text-[10px]">Mozilla Firefox</div>
              <div className="text-white font-bold text-lg mt-0.5">{analytics.browserBreakdown.firefox}%</div>
            </div>
            <div className="p-3 bg-[#1a1a20] rounded-lg border border-white/5">
              <div className="text-white/40 text-[10px]">Microsoft Edge / Brave</div>
              <div className="text-white font-bold text-lg mt-0.5">{analytics.browserBreakdown.edge + analytics.browserBreakdown.brave}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Views & Performance Leaderboard */}
      <div className="p-5 bg-[#121214] rounded-xl border border-white/10 space-y-4">
        <h3 className="font-heading font-bold text-sm text-white">
          PROJECT ENGAGEMENT LEADERBOARD
        </h3>

        <div className="divide-y divide-white/5">
          {projects.map((p, idx) => (
            <div key={p.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white/40 w-4">{idx + 1}</span>
                <div>
                  <div className="font-bold text-white">{p.title}</div>
                  <div className="text-white/40 text-[10px]">{p.category} • {p.client}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{p.views.toLocaleString()} views</div>
                <div className="text-emerald-400 text-[10px]">{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
