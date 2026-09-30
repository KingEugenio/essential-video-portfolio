import React, { useState } from 'react';
import { 
  Monitor, Tablet, Smartphone, X, Eye, 
  CheckCircle, ArrowUpRight, Sliders,
  Film, ShieldCheck
} from 'lucide-react';
import { Project } from '../../types';
import { UniversalVideoPlayer } from '../player/UniversalVideoPlayer';
import { BeforeAfterSlider } from '../player/BeforeAfterSlider';

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
  onPublishToggle?: (projectId: string, currentStatus: string) => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  onClose,
  onPublishToggle,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden">
      {/* Top Device Switcher & Controls */}
      <div className="w-full max-w-5xl bg-[#121214] border border-white/15 rounded-xl p-3 flex items-center justify-between shadow-2xl mb-3 font-mono text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="px-2 py-0.5 rounded bg-[#ff3b00]/20 text-[#ff3b00] border border-[#ff3b00]/30 text-[10px] font-bold">
            DEVICE PREVIEW
          </span>
          <span className="font-bold text-white truncate max-w-xs">{project.title}</span>
          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
            project.status === 'published' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-[#1a1a20] p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'desktop' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop (16:9)</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'tablet' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'mobile' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (9:16)</span>
          </button>
        </div>

        {/* Close & Publish Button */}
        <div className="flex items-center gap-2">
          {onPublishToggle && (
            <button
              onClick={() => onPublishToggle(project.id, project.status)}
              className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
                project.status === 'published'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {project.status === 'published' ? 'UNPUBLISH' : 'PUBLISH NOW'}
            </button>
          )}
          <button onClick={onClose} className="p-1.5 text-white/50 hover:text-white rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Simulated Device Frame */}
      <div className="flex-1 w-full flex items-center justify-center overflow-y-auto py-2">
        <div
          className={`bg-[#080808] border border-white/20 rounded-2xl overflow-y-auto transition-all shadow-2xl ${
            deviceView === 'desktop'
              ? 'w-full max-w-5xl max-h-[82vh]'
              : deviceView === 'tablet'
              ? 'w-[720px] max-h-[82vh]'
              : 'w-[380px] max-h-[82vh] border-4 border-neutral-800 rounded-3xl'
          }`}
        >
          {/* Mock Browser Header on desktop */}
          {deviceView === 'desktop' && (
            <div className="bg-[#16161a] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="bg-[#0e0e10] px-4 py-1 rounded text-white/60 text-[10px] w-64 text-center truncate">
                https://ekopixels.com/projects/{project.slug}
              </div>
              <div>PUBLIC VISITOR VIEW</div>
            </div>
          )}

          {/* Project Body */}
          <div className="p-4 sm:p-8 space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#ff3b00]/10 text-[#ff3b00] border border-[#ff3b00]/30 font-mono text-[10px] font-bold">
                  {project.category}
                </span>
                <span className="text-white/40 font-mono text-xs">{project.year}</span>
                <span className="text-white/40 font-mono text-xs">•</span>
                <span className="text-white/60 font-mono text-xs">{project.client}</span>
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {project.title}
              </h1>
              <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Video Player */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <UniversalVideoPlayer
                video={project.mainVideo}
                retroEffect={project.retroEffect}
                retroEffectIntensity={project.retroEffectIntensity}
                autoPlay={false}
              />
            </div>

            {/* Before / After Color Grade Slider if present */}
            {project.beforeAfter && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00e5ff]" />
                  <span>COLOR GRADE BREAKDOWN (BEFORE / AFTER)</span>
                </h3>
                <BeforeAfterSlider
                  beforeImage={project.beforeAfter.beforeImage || ''}
                  afterImage={project.beforeAfter.afterImage || ''}
                  beforeLabel={project.beforeAfter.beforeLabel || 'RAW LOG'}
                  afterLabel={project.beforeAfter.afterLabel || 'GRADE'}
                />
              </div>
            )}

            {/* Credits Section */}
            {project.credits && project.credits.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-heading font-bold text-xs text-white/50 uppercase tracking-wider mb-2">
                  PROJECT CREDITS
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {project.credits.map((c, i) => (
                    <div key={i} className="p-2 rounded bg-white/5 border border-white/5">
                      <div className="text-white/40 text-[10px] uppercase">{c.role}</div>
                      <div className="text-white font-bold">{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
