import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard } from '../common/GlassCard';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = usePortfolio();
  const publishedTestimonials = testimonials.filter(t => t.published);

  return (
    <section id="testimonials-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--brand-border)]">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-3">
          Endorsements
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
          CLIENT REVIEWS
        </h2>
        <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] mt-3">
          Feedback from commercial directors, agency producers, and recording artists.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishedTestimonials.map(item => (
          <figure
            key={item.id}
            className="glass-card hover-glow rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 m-0 transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Stars & Quote Icon */}
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-1" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[var(--brand-primary)]/40" />
              </header>

              {/* Quote Content */}
              <blockquote className="text-sm text-[var(--brand-text)] leading-relaxed italic m-0 p-0">
                "{item.quote || item.content}"
              </blockquote>
            </div>

            {/* Author details */}
            <figcaption className="pt-4 border-t border-[var(--brand-border)] flex items-center gap-3">
              <img
                src={item.avatarUrl}
                alt={item.clientName}
                className="w-10 h-10 rounded-full object-cover border border-[var(--brand-border)]"
              />
              <div>
                <cite className="text-sm font-bold text-[var(--brand-text)] not-italic block">
                  {item.clientName}
                </cite>
                <p className="text-xs text-[var(--brand-text-muted)] m-0">
                  {item.role}, {item.company}
                </p>
                {item.projectTitle && (
                  <span className="text-[10px] text-[var(--brand-primary)] font-mono block mt-0.5">
                    Re: {item.projectTitle}
                  </span>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
