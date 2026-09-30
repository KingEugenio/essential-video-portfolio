import React, { useState } from 'react';
import { Project, AspectRatioType } from '../../types';
import { Play, Maximize2, Layers, Smartphone, Monitor, Square } from 'lucide-react';

interface QuickShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const QuickShowcase: React.FC<QuickShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType | 'all'>('all');

  // Filter projects based on main video aspect ratio or available ratio versions
  const filteredProjects = projects.filter((p) => {
    if (selectedRatio === 'all') return true;
    if (p.mainVideo?.aspectRatio === selectedRatio) return true;
    if (p.aspectRatioVersions?.some((v) => v.ratio === selectedRatio)) return true;
    return false;
  });

  const ratioOptions: Array<{ id: AspectRatioType | 'all'; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All Formats', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: '16:9', label: '16:9 Cinema / TVC', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: '9:16', label: '9:16 Reels / TikTok', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: '1:1', label: '1:1 Square Feed', icon: <Square className="w-3.5 h-3.5" /> },
  ];

  if (projects.length === 0) return null;

  return (
    <section id="formats-showcase" aria-labelledby="formats-showcase-heading" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs text-[#ff3b00] uppercase tracking-widest mb-1">
            QUICK FORMAT FILTER
          </div>
          <h2 id="formats-showcase-heading" className="font-heading font-bold text-xl sm:text-2xl text-white">
            Explore Work by Screen Architecture
          </h2>
        </div>

        {/* Filter Pills Navigation */}
        <nav aria-label="Screen Architecture Filter" className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {ratioOptions.map((opt) => (
            <button
              key={opt.id}
              id={`format-filter-${opt.id.replace(':', '-')}`}
              type="button"
              onClick={() => setSelectedRatio(opt.id)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedRatio === opt.id
                  ? 'bg-[#00e5ff] text-black shadow-md'
                  : 'bg-[#121214] text-white/70 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Grid of Format Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.slice(0, 6).map((project) => {
          const ratio = project.mainVideo?.aspectRatio || '16:9';
          const isVertical = ratio === '9:16';

          return (
            <article
              key={project.id}
              id={`showcase-project-${project.id}`}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project); }}
              tabIndex={0}
              role="button"
              aria-label={`Open case study: ${project.title} for ${project.client}`}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-[#121214] transition-all hover:border-[#00e5ff]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[#00e5ff]"
            >
              {/* Thumbnail Figure Container */}
              <figure className={`relative overflow-hidden m-0 ${isVertical ? 'aspect-[9/14]' : 'aspect-video'}`}>
                <img
                  src={project.thumbnail}
                  alt={`${project.title} - ${project.category} editorial master cut for ${project.client}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />

                {/* Aspect Ratio Badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-mono text-[10px] text-white/90 font-bold flex items-center gap-1">
                  <span>{ratio}</span>
                  <span className="text-white/40" aria-hidden="true">•</span>
                  <span className="text-[#00e5ff]">{project.category}</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <div className="w-12 h-12 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Info Figcaption */}
                <figcaption className="absolute bottom-3 inset-x-3 flex items-end justify-between text-left">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base leading-tight group-hover:text-[#00e5ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[11px] text-white/60 mt-0.5">
                      <span>{project.client}</span> • <time dateTime={project.year}>{project.year}</time>
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-md bg-white/10 backdrop-blur flex items-center justify-center text-white/80 group-hover:bg-white/20" aria-hidden="true">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </figcaption>
              </figure>
            </article>
          );
        })}
      </div>
    </section>
  );
};
