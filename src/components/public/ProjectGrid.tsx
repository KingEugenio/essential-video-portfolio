import React, { useState, useMemo } from 'react';
import { 
  Play, Eye, Filter, Search, Grid, LayoutGrid, Film, 
  Smartphone, Maximize2, Tag, Calendar, User, Layers 
} from 'lucide-react';
import { Project, PortfolioLayout } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';
import { ProgressiveImage } from '../skeletons/ProgressiveImage';

interface ProjectGridProps {
  projects: Project[];
  defaultLayout?: PortfolioLayout;
  onSelectProject: (project: Project) => void;
  autoNumbering?: boolean;
  heading?: string;
  subheading?: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  defaultLayout = 'collage',
  onSelectProject,
  autoNumbering = true,
  heading,
  subheading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentLayout, setCurrentLayout] = useState<PortfolioLayout>(defaultLayout);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = selectedCategory === 'ALL' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.software.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="work" aria-labelledby="archive-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00e5ff] tracking-widest uppercase mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>{subheading || 'CREATIVE ARCHIVE // SELECTED CUTS'}</span>
          </div>
          <h2 id="archive-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {heading || 'PROJECT FILES & MASTER RELEASES'}
          </h2>
        </div>

        {/* Layout Mode Switcher */}
        <nav aria-label="Archive Layout Options" className="flex items-center gap-1.5 bg-[#121214] p-1 rounded-md border border-white/10 font-mono text-xs">
          <button
            id="layout-collage-btn"
            type="button"
            onClick={() => setCurrentLayout('collage')}
            className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentLayout === 'collage' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="Surreal Collage"
            aria-pressed={currentLayout === 'collage'}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Collage</span>
          </button>

          <button
            id="layout-grid-btn"
            type="button"
            onClick={() => setCurrentLayout('grid')}
            className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentLayout === 'grid' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="Standard Grid"
            aria-pressed={currentLayout === 'grid'}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            id="layout-social-btn"
            type="button"
            onClick={() => setCurrentLayout('social')}
            className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentLayout === 'social' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="9:16 Social Reels"
            aria-pressed={currentLayout === 'social'}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">9:16 Reels</span>
          </button>

          <button
            id="layout-contact-sheet-btn"
            type="button"
            onClick={() => setCurrentLayout('contact-sheet')}
            className={`px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentLayout === 'contact-sheet' ? 'bg-[#ff3b00] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
            title="Contact Sheet Index"
            aria-pressed={currentLayout === 'contact-sheet'}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact Sheet</span>
          </button>
        </nav>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-6">
        {/* Category Navigation Pills */}
        <nav aria-label="Project Categories" className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase()}`}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Search Field - Search Form */}
        <form role="search" aria-label="Search projects" onSubmit={(e) => e.preventDefault()} className="relative min-w-[240px]">
          <label htmlFor="project-search-input" className="sr-only">Search archive</label>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
          <input
            id="project-search-input"
            type="search"
            placeholder="Search title, client, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121214] border border-white/10 rounded-md pl-9 pr-3 py-1.5 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff3b00] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      {/* Empty Search Result */}
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center font-mono text-white/50 border border-dashed border-white/10 rounded-lg p-8">
          <Film className="w-8 h-8 mx-auto mb-3 text-white/30" />
          <p className="text-sm">NO PROJECTS MATCHING CURRENT FILTER CRITERIA</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-[#ff3b00] underline uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* LAYOUT VARIANT 1: CONTACT SHEET MODE                      */}
      {/* ========================================================= */}
      {currentLayout === 'contact-sheet' && (
        <div className="border border-white/15 bg-[#0d0d10] p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, idx) => {
              const projectNumber = String(idx + 1).padStart(3, '0');
              return (
                <article
                  key={project.id}
                  id={`project-sheet-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project); }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open project details: ${project.title}`}
                  className="group bg-[#141418] border border-white/10 hover:border-[#ff3b00] p-3 rounded transition-all cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#ff3b00]"
                >
                  <figure className="relative aspect-video overflow-hidden rounded bg-black mb-3 m-0">
                    <ProgressiveImage
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 font-mono text-[9px] font-bold bg-black/80 text-white px-1.5 py-0.5 rounded border border-white/20 z-10">
                      #{projectNumber}
                    </div>
                    <div className="absolute top-2 right-2 font-mono text-[9px] bg-[#ff3b00] text-white px-1.5 py-0.5 rounded font-bold uppercase z-10">
                      {project.mainVideo.aspectRatio}
                    </div>
                  </figure>

                  <header>
                    <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-1">
                      <span>{project.category}</span>
                      <time dateTime={project.year}>{project.year}</time>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-white group-hover:text-[#ff3b00] transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[11px] text-white/60 line-clamp-1 mt-0.5">
                      Client: {project.client}
                    </p>
                  </header>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LAYOUT VARIANT 2: 9:16 SOCIAL REELS MODE                  */}
      {/* ========================================================= */}
      {currentLayout === 'social' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => {
            const projectNumber = String(idx + 1).padStart(3, '0');
            
            return (
              <article
                key={project.id}
                id={`project-reel-${project.id}`}
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project); }}
                tabIndex={0}
                role="button"
                aria-label={`Open 9:16 social cut: ${project.title}`}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-white/15 bg-black shadow-lg cursor-pointer hover:border-[#00e5ff] transition-all focus:outline-none focus:ring-2 focus:ring-[#00e5ff]"
              >
                <figure className="relative w-full h-full m-0">
                  <ProgressiveImage
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {autoNumbering ? `CUT_${projectNumber}` : project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#00e5ff]/90 text-black font-bold">
                      9:16 REEL
                    </span>
                  </div>

                  {/* Play Icon Center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    <div className="w-12 h-12 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Details */}
                  <figcaption className="absolute bottom-4 inset-x-4 text-left">
                    <div className="font-mono text-[10px] text-[#00e5ff] uppercase tracking-wider mb-1">
                      <span>{project.client}</span> • <time dateTime={project.year}>{project.year}</time>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#ff3b00] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="font-mono text-[9px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* LAYOUT VARIANT 3: SURREAL COLLAGE & MASONRY (DEFAULT)     */}
      {/* ========================================================= */}
      {(currentLayout === 'collage' || currentLayout === 'grid') && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            const projectNumber = String(idx + 1).padStart(3, '0');
            const isWide = currentLayout === 'collage' && (idx % 3 === 0 || project.featured);
            const colSpan = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const aspectClass = isWide ? 'aspect-video' : project.mainVideo.aspectRatio === '9:16' ? 'aspect-[4/5]' : 'aspect-video';

            return (
              <article key={project.id} id={`project-card-${project.id}`} className={`${colSpan} flex flex-col`}>
                <RetroWindow
                  title={autoNumbering ? `PROJECT_${projectNumber}.MOV` : `${project.title}.MOV`}
                  subtitle={project.client}
                  badge={project.category}
                  className="h-full group hover:border-[#ff3b00]/60 transition-colors"
                >
                  <div 
                    onClick={() => onSelectProject(project)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project); }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open case study for ${project.title}`}
                    className="relative cursor-pointer overflow-hidden bg-black flex-1 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#ff3b00]"
                  >
                    {/* Thumbnail Figure */}
                    <figure className={`relative ${aspectClass} overflow-hidden m-0`}>
                      <ProgressiveImage
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" aria-hidden="true" />

                      {/* Play Button Indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                        <div className="w-14 h-14 rounded-full bg-[#ff3b00] text-white flex items-center justify-center shadow-[0_0_20px_#ff3b00] transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Orientation & Video Count Badges */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white border border-white/10">
                          {project.mainVideo.aspectRatio}
                        </span>
                        {project.additionalVideos.length > 0 && (
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#00e5ff] text-black font-bold">
                            +{project.additionalVideos.length} CUTS
                          </span>
                        )}
                        {project.beforeAfter && (
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400 text-black font-bold">
                            RAW/GRADE
                          </span>
                        )}
                      </div>
                    </figure>

                    {/* Metadata Footer inside Retro Window */}
                    <header className="p-4 bg-[#121214] border-t border-white/10 flex flex-col gap-2 text-left">
                      <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
                        <span className="text-[#00e5ff] font-semibold">{project.client}</span>
                        <span>YEAR: <time dateTime={project.year}>{project.year}</time></span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#ff3b00] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="font-body text-xs text-white/60 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Software stack chips */}
                      <ul role="list" aria-label="Software used" className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {project.software.map((sw) => (
                          <li
                            key={sw}
                            className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5"
                          >
                            {sw}
                          </li>
                        ))}
                      </ul>
                    </header>
                  </div>
                </RetroWindow>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
