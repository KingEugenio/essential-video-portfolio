import React from 'react';
import {
  SkeletonBox,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonContainer,
  SkeletonHudHeader,
  SkeletonWaveform,
} from './SkeletonPrimitives';
import { Activity, TrendingUp, Monitor, Smartphone, Globe, Download } from 'lucide-react';

export const AdminAnalyticsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer
      label="Loading studio analytics telemetry..."
      className="space-y-6 font-mono text-xs"
    >
      {/* HUD Telemetry Bar */}
      <SkeletonHudHeader
        statusText="TELEMETRY SUITE // TRAFFIC ENGINE: SERVER-SIDE EVENT STREAM"
        timecode="00:00:00:00"
        format="REALTIME INGESTION • RETENTION ANALYSIS"
      />

      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <SkeletonText height="h-7" width="w-64" variant="bright" />
          <SkeletonText height="h-3.5" width="w-80" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#13131a] p-1 rounded-md border border-white/10">
            <SkeletonBox rounded="sm" className="w-16 h-7" variant="accent" />
            <SkeletonBox rounded="sm" className="w-16 h-7" />
            <SkeletonBox rounded="sm" className="w-16 h-7" />
          </div>
          <SkeletonButton width="w-32" height="h-9" rounded="md" variant="cyan" />
        </div>
      </div>

      {/* 2. Top Metric Cards (4 KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL SHOWREEL VIEWS', val: '48,290', trend: '+18.4%', variant: 'accent' as const },
          { label: 'AVG WATCH DURATION', val: '01:42 MIN', trend: '78% RETENTION', variant: 'cyan' as const },
          { label: 'COMMISSION LEADS', val: '24 INQUIRIES', trend: '+12% CONV', variant: 'bright' as const },
          { label: 'BANDWIDTH SERVED', val: '1.42 TB', trend: 'CDN OPTIMIZED', variant: 'default' as const },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#13131a] rounded-xl border border-white/15 flex flex-col justify-between gap-3 min-h-[120px] shadow-md relative overflow-hidden"
          >
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/50">{item.label}</span>
              <SkeletonBadge width="w-16" height="h-4" variant={item.variant} />
            </div>
            <SkeletonText height="h-7" width="w-28" variant={item.variant} />
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
              <span className="text-emerald-400 font-bold">{item.trend}</span>
              <span className="text-white/40">VS PREV PERIOD</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Chart Canvas Area */}
      <div className="p-6 bg-[#13131a] border border-white/15 rounded-xl flex flex-col gap-6 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="space-y-1">
            <span className="text-white font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#ff3b00]" />
              TIMELINE ENGAGEMENT &amp; PLAYBACK SESSIONS
            </span>
            <p className="text-[10px] text-white/50">HOURLY VIDEO FRAME RETENTION</p>
          </div>
          <div className="flex items-center gap-2">
            <SkeletonBadge width="w-20" height="h-5" variant="accent" />
            <SkeletonBadge width="w-20" height="h-5" variant="cyan" />
          </div>
        </div>

        {/* Simulated Waveform & Chart Bars */}
        <div className="space-y-4">
          <div className="h-48 w-full bg-[#181824] rounded-lg border border-white/10 p-4 flex items-end justify-between gap-1.5 overflow-hidden relative">
            <SkeletonBox rounded="none" className="w-full h-full absolute inset-0" withScanlines />
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-[#ff3b00]/30 to-[#00e5ff]/80"
                style={{
                  height: `${20 + ((i * 37) % 75)}%`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
            <span>00:00 (DAY 1)</span>
            <span>DAY 7</span>
            <span>DAY 14</span>
            <span>DAY 21</span>
            <span>DAY 30 (TODAY)</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom 2-Column Split: Hardware & Geo Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-[#13131a] border border-white/15 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-white font-bold flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#00e5ff]" />
              DISPLAY RATIO &amp; DEVICE MATRIX
            </span>
          </div>
          <div className="space-y-3">
            {[
              { name: '16:9 DESKTOP WORKSTATION', pct: '58%', variant: 'accent' as const },
              { name: '9:16 MOBILE VERTICAL (REELS)', pct: '34%', variant: 'cyan' as const },
              { name: '1:1 SQUARE / TABLET', pct: '8%', variant: 'bright' as const },
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/70">{d.name}</span>
                  <span className="text-white font-bold">{d.pct}</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-[#ff3b00] rounded-full"
                    style={{ width: d.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-[#13131a] border border-white/15 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-white font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#ff3b00]" />
              GEOGRAPHIC ORIGIN &amp; MARKETS
            </span>
          </div>
          <div className="space-y-2.5">
            {[
              { code: 'US', market: 'UNITED STATES (LOS ANGELES / NYC)', share: '45%' },
              { code: 'GB', market: 'UNITED KINGDOM (LONDON SOHO)', share: '28%' },
              { code: 'GH', market: 'GHANA (ACCRA CREATIVE HUB)', share: '16%' },
              { code: 'EU', market: 'EUROPEAN UNION (BERLIN / PARIS)', share: '11%' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-[#181822] border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-black text-[#00e5ff] font-bold text-[10px]">
                    {m.code}
                  </span>
                  <span className="text-white/80 text-[11px]">{m.market}</span>
                </div>
                <span className="text-[#ff3b00] font-bold">{m.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};
