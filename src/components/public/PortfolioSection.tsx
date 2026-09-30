import React from 'react';
import { Play, Sparkles, Eye, ArrowUpRight, Film, Sliders } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { Project } from '../../types';

export const PortfolioSection: React.FC = () => {
  const {
    publicProjects,
    categories,
    selectedCategory,
    setSelectedCategory,
    setSelectedProjectSlug,
    incrementProjectViews,
  } = usePortfolio();
  const { theme } = useTheme();

  const filteredProjects = publicProjects.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === selectedCategory;
  });

  const cardStyle = theme.layout.portfolioCardStyle;

  const handleOpenProject = (project: Project) => {
    incrementProjectViews(project.slug);
    setSelectedProjectSlug(project.slug);
  };

  return (
    <section id="portfolio-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-4 h-4 text-[var(--brand-primary)]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--brand-text-secondary)]">
              Curated Index
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
            SELECTED WORK
          </h2>
        </div>

        {/* Category Filters */}
        <nav aria-label="Portfolio Categories" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          <ul className="flex items-center gap-2 list-none p-0 m-0">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--brand-primary)] text-[var(--brand-button-text)] shadow-lg shadow-[var(--brand-primary)]/20 scale-105'
                        : 'glass-surface text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:border-[var(--brand-primary)]/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Projects Display based on Card Style */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card p-12 text-center my-8">
          <Film className="w-12 h-12 text-[var(--brand-text-muted)] mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-[var(--brand-text)]">No projects found in this category</h3>
          <p className="text-sm text-[var(--brand-text-secondary)] mt-1">
            Try selecting another category or view all work.
          </p>
        </div>
      ) : cardStyle === 'large-feature' ? (
        /* LARGE FEATURE CARDS */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <article
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group cursor-pointer glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[var(--brand-primary)]/50 flex flex-col"
            >
              {/* Media Thumbnail Container */}
              <figure className="relative aspect-video w-full overflow-hidden bg-black m-0">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20">
                    {project.category}
                  </span>
                  {project.beforeAfterData?.hasBeforeAfter && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--brand-primary)] text-black flex items-center gap-1">
                      <Sliders className="w-3 h-3" />
                      Grade Slider
                    </span>
                  )}
                </div>

                {project.videoSource?.duration && (
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-black/80 text-neutral-300 backdrop-blur-sm">
                      {project.videoSource.duration}
                    </span>
                  </div>
                )}

                {/* Center Play Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center shadow-2xl transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                </div>
              </figure>

              {/* Text Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--brand-text-muted)] mb-1.5">
                    <span>{project.client}</span>
                    <time dateTime={String(project.year)}>{project.year}</time>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Role tags & Read Case Study Link */}
                <div className="pt-3 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.role.slice(0, 2).map((r, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-[var(--brand-surface-elevated)] text-[var(--brand-text-secondary)] border border-[var(--brand-border)]"
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-[var(--brand-primary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : cardStyle === 'editorial' ? (
        /* EDITORIAL WIDE LIST */
        <div className="flex flex-col gap-6">
          {filteredProjects.map(project => (
            <article
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group cursor-pointer glass-card p-4 sm:p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:border-[var(--brand-primary)]/60 transition-all"
            >
              <figure className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-black m-0">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>
              </figure>

              <div className="md:col-span-7 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[var(--brand-text-muted)] mb-1">
                    <span className="uppercase font-bold tracking-wider text-[var(--brand-primary)]">
                      {project.category}
                    </span>
                    <span>·</span>
                    <span>{project.client}</span>
                    <span>·</span>
                    <time dateTime={String(project.year)}>{project.year}</time>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--brand-text-secondary)] mt-2 leading-relaxed line-clamp-2">
                    {project.brief || project.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {project.software.map((sw, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-[var(--brand-surface-elevated)] text-[var(--brand-text-secondary)] border border-[var(--brand-border)]"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* STANDARD RESPONSIVE GRID (grid, masonry, minimal) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <article
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group cursor-pointer glass-card overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[var(--brand-primary)]/50 transition-all flex flex-col"
            >
              <figure className="relative aspect-video bg-black overflow-hidden m-0">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center shadow-xl">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>
              </figure>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[var(--brand-text-muted)] block mb-1">
                    {project.client} · <time dateTime={String(project.year)}>{project.year}</time>
                  </span>
                  <h4 className="text-base font-bold font-heading text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-[var(--brand-border)] flex items-center justify-between text-xs text-[var(--brand-text-secondary)]">
                  <span>{project.role[0]}</span>
                  <span className="font-semibold text-[var(--brand-primary)]">View →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
