import React from 'react';
import {
  Scissors,
  Film,
  Sparkles,
  PlayCircle,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';

export const ServicesSection: React.FC = () => {
  const { services } = usePortfolio();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-[var(--brand-primary)]" />;
      case 'Film':
        return <Film className="w-6 h-6 text-[var(--brand-primary)]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[var(--brand-primary)]" />;
      case 'PlayCircle':
        return <PlayCircle className="w-6 h-6 text-[var(--brand-primary)]" />;
      default:
        return <Layers className="w-6 h-6 text-[var(--brand-primary)]" />;
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--brand-border)]">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-3">
          Capabilities & Packages
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
          SERVICES & SUITE
        </h2>
        <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] mt-3">
          End-to-end post-production solutions crafted for commercial brands, recording artists, and ambitious creators.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <article
            key={service.id}
            className="glass-card hover-glow rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300"
          >
            <div>
              <header className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)]">
                  {getIcon(service.icon)}
                </div>

                {service.showPrice && service.startingPrice && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--brand-text-muted)] block">
                      Starting from
                    </span>
                    <span className="text-lg font-bold font-heading text-[var(--brand-primary)]">
                      {service.startingPrice}
                    </span>
                  </div>
                )}
              </header>

              <h3 className="text-xl font-bold font-heading text-[var(--brand-text)] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2 pt-4 border-t border-[var(--brand-border)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] block">
                  What's Included:
                </span>
                <ul className="space-y-2 list-none p-0 m-0">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[var(--brand-text)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Turnaround & CTA */}
            <footer className="pt-4 border-t border-[var(--brand-border)] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[var(--brand-text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Turnaround: {service.turnaround}</span>
              </div>

              <button
                type="button"
                onClick={scrollToContact}
                className="text-xs font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Book Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};
