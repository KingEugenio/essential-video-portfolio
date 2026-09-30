import React from 'react';
import { Play, Sparkles, ArrowRight, Film, Award, Clapperboard, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';
import { UniversalVideoPlayer } from '../video/UniversalVideoPlayer';

export const HeroSection: React.FC = () => {
  const { theme, brand } = useTheme();
  const { setShowShowreelModal, projects, setSelectedProjectSlug } = usePortfolio();

  const featuredProject = projects.find(p => p.featured) || projects[0];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const layoutType = theme.layout.heroLayout;

  // Render based on chosen layout
  return (
    <section id="hero-section" className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* LAYOUT A: Type + Video Stage */}
        {layoutType === 'type-video' && (
          <div className="flex flex-col items-center text-center gap-8">
            {/* Availability / Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface text-xs font-semibold text-[var(--brand-text-secondary)] border border-[var(--brand-border)]">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
              <span>{brand.availabilityStatus}</span>
            </div>

            {/* Main Headline */}
            <header className="max-w-4xl space-y-4">
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--brand-text)] leading-[1.08]">
                {brand.professionalTitle.toUpperCase()}
              </h1>
              <p className="text-base sm:text-xl text-[var(--brand-text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
                {brand.tagline}
              </p>
            </header>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GlassButton
                variant="primary"
                size="lg"
                icon={<Play className="w-5 h-5 fill-current" />}
                onClick={() => setShowShowreelModal(true)}
              >
                Watch 2026 Showreel
              </GlassButton>
              <GlassButton
                variant="glass"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                onClick={() => scrollTo('portfolio-section')}
              >
                Explore Projects
              </GlassButton>
            </div>

            {/* Featured Video Stage */}
            {featuredProject && (
              <figure className="w-full max-w-5xl mt-6 m-0">
                <div className="relative group p-2 sm:p-3 rounded-2xl glass-card border border-[var(--brand-border)] shadow-2xl">
                  <UniversalVideoPlayer
                    source={featuredProject.videoSource}
                    title={featuredProject.title}
                    autoPlay={false}
                  />

                  {/* Stage Caption Bar */}
                  <figcaption className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2 text-left">
                    <div>
                      <span className="text-xs uppercase font-bold text-[var(--brand-primary)] tracking-wider">
                        Featured Project · {featuredProject.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-[var(--brand-text)]">
                        {featuredProject.title} ({featuredProject.client})
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProjectSlug(featuredProject.slug)}
                      className="text-xs font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </figcaption>
                </div>
              </figure>
            )}
          </div>
        )}

        {/* LAYOUT B: Fullscreen Showreel / Immersive */}
        {layoutType === 'fullscreen-showreel' && (
          <figure className="relative rounded-3xl overflow-hidden border border-[var(--brand-border)] min-h-[70vh] flex items-end p-6 sm:p-12 shadow-2xl bg-black m-0">
            {/* Background Video */}
            <video
              src={brand.showreelSource.url}
              poster={brand.showreelSource.posterUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Foreground Content Card */}
            <figcaption className="relative z-10 max-w-2xl glass-card p-6 sm:p-8 border border-white/20 shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)] text-black mb-4 inline-block">
                Cinematic Portfolio
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {brand.brandName}
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 mb-6 leading-relaxed">
                {brand.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <GlassButton
                  variant="primary"
                  size="md"
                  icon={<Play className="w-4 h-4 fill-current" />}
                  onClick={() => setShowShowreelModal(true)}
                >
                  Full Showreel Experience
                </GlassButton>
                <GlassButton
                  variant="glass"
                  size="md"
                  onClick={() => scrollTo('contact-section')}
                >
                  Start a Project
                </GlassButton>
              </div>
            </figcaption>
          </figure>
        )}

        {/* LAYOUT C: Split Profile + Video */}
        {layoutType === 'split-profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Portrait & Bio */}
            <article className="lg:col-span-5 flex flex-col gap-6 text-left">
              <figure className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[var(--brand-primary)] shadow-xl m-0">
                <img
                  src={brand.profileImageUrl}
                  alt={brand.brandName}
                  className="w-full h-full object-cover"
                />
              </figure>

              <header>
                <span className="text-xs uppercase tracking-widest font-bold text-[var(--brand-primary)]">
                  {brand.location}
                </span>
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--brand-text)] mt-1 tracking-tight">
                  {brand.brandName}
                </h1>
                <p className="text-base text-[var(--brand-text-secondary)] font-medium mt-1">
                  {brand.professionalTitle}
                </p>
              </header>

              <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed">
                {brand.bio}
              </p>

              <div className="flex flex-wrap gap-3">
                <GlassButton
                  variant="primary"
                  size="md"
                  icon={<Play className="w-4 h-4 fill-current" />}
                  onClick={() => setShowShowreelModal(true)}
                >
                  Watch Showreel
                </GlassButton>
                <GlassButton
                  variant="secondary"
                  size="md"
                  onClick={() => scrollTo('portfolio-section')}
                >
                  View Archive
                </GlassButton>
              </div>

              {/* Quick Stats Grid */}
              {brand.showStats && (
                <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--brand-border)] m-0">
                  <div>
                    <dt className="block font-heading text-2xl font-bold text-[var(--brand-text)]">
                      {brand.yearsOfExperience}+
                    </dt>
                    <dd className="text-xs text-[var(--brand-text-muted)] m-0">Years Exp.</dd>
                  </div>
                  <div>
                    <dt className="block font-heading text-2xl font-bold text-[var(--brand-text)]">
                      {brand.projectsCompleted}+
                    </dt>
                    <dd className="text-xs text-[var(--brand-text-muted)] m-0">Films Cut</dd>
                  </div>
                  <div>
                    <dt className="block font-heading text-2xl font-bold text-[var(--brand-text)]">
                      {brand.awardsWon}
                    </dt>
                    <dd className="text-xs text-[var(--brand-text-muted)] m-0">Accolades</dd>
                  </div>
                </dl>
              )}
            </article>

            {/* Right Column: Video Stage */}
            <div className="lg:col-span-7">
              {featuredProject && (
                <figure className="glass-card p-3 rounded-2xl border border-[var(--brand-border)] shadow-2xl m-0">
                  <UniversalVideoPlayer
                    source={featuredProject.videoSource}
                    title={featuredProject.title}
                  />
                  <figcaption className="p-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--brand-text-secondary)]">
                      Latest Master: <strong className="text-[var(--brand-text)]">{featuredProject.title}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProjectSlug(featuredProject.slug)}
                      className="text-xs font-bold text-[var(--brand-primary)] hover:underline cursor-pointer"
                    >
                      Project Details →
                    </button>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        )}

        {/* LAYOUT D: Minimal Editorial */}
        {layoutType === 'minimal-editorial' && (
          <div className="py-8 border-b border-[var(--brand-border)] flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-primary)]">
                  // Portfolio 2026
                </span>
                <h1 className="font-heading text-4xl sm:text-7xl font-extrabold tracking-tighter text-[var(--brand-text)]">
                  {brand.brandName}
                </h1>
                <p className="text-lg sm:text-xl text-[var(--brand-text-secondary)]">
                  {brand.professionalTitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GlassButton
                  variant="primary"
                  size="md"
                  onClick={() => setShowShowreelModal(true)}
                  icon={<Play className="w-4 h-4 fill-current" />}
                >
                  Showreel
                </GlassButton>
                <GlassButton
                  variant="outline"
                  size="md"
                  onClick={() => scrollTo('contact-section')}
                >
                  Inquire
                </GlassButton>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[var(--brand-text-secondary)] max-w-3xl leading-relaxed">
              {brand.tagline}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
