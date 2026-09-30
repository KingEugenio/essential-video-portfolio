import React from 'react';
import { Quote, Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#00e5ff] tracking-widest uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          <span>CLIENT TRANSMISSIONS &amp; ENDORSEMENTS</span>
        </div>
        <h2 id="testimonials-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          TRUSTED BY DIRECTORS &amp; LABELS
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <article
            key={test.id}
            id={`testimonial-${test.id}`}
            className="bg-[#121214] border border-white/10 hover:border-white/30 p-6 rounded-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-4" aria-label={`Rating: ${test.rating || 5} out of 5 stars`}>
                {Array.from({ length: test.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>

              {/* Quote Content as Blockquote */}
              <blockquote className="m-0 p-0">
                <p className="font-body text-sm text-white/80 leading-relaxed italic mb-6">
                  &ldquo;{test.content}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Client Info Footer with Cite */}
            <footer className="pt-4 border-t border-white/10 flex items-center gap-3">
              {test.avatarUrl ? (
                <img
                  src={test.avatarUrl}
                  alt={`${test.clientName}, ${test.clientRole || 'Creative Director'} at ${test.company || 'Studio'}`}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1e1e24] text-[#ff3b00] flex items-center justify-center font-mono font-bold text-xs border border-white/10" aria-hidden="true">
                  {test.clientName.substring(0, 2).toUpperCase()}
                </div>
              )}
              <cite className="not-italic">
                <span className="font-heading font-bold text-sm text-white block">
                  {test.clientName}
                </span>
                <span className="font-mono text-[11px] text-white/50 block">
                  {test.role} • <span className="text-[#00e5ff]">{test.company}</span>
                </span>
                {test.projectName && (
                  <span className="font-mono text-[10px] text-white/30 truncate block mt-0.5">
                    Ref: {test.projectName}
                  </span>
                )}
              </cite>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};
