import React from 'react';
import { CheckCircle2, Sliders, Volume2, Film, Layers } from 'lucide-react';
import { Service } from '../../types';

interface ServicesSectionProps {
  services: Service[];
  onBookService: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b00] tracking-widest uppercase mb-2">
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            <span>OPERATIONAL CAPABILITIES // SERVICES</span>
          </div>
          <h2 id="services-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            SERVICE DIRECTORY &amp; PIPELINE
          </h2>
        </div>

        <p className="font-mono text-xs text-white/50">
          ALL SERVICES CONFORM TO DCI / ITU-R BT.709 &amp; 2020 STANDARDS
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => {
          const serviceNum = String(idx + 1).padStart(2, '0');
          return (
            <article
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-[#121214] border border-white/10 hover:border-[#ff3b00]/60 p-6 rounded-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <header className="flex items-center justify-between font-mono text-xs text-white/40 pb-3 border-b border-white/10 mb-4">
                  <span className="text-[#00e5ff] font-bold">SERVICE_{serviceNum}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10 text-[10px]">
                    OFFERED DIRECT
                  </span>
                </header>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#ff3b00] transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="font-body text-sm text-white/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6">
                  <div className="font-mono text-[11px] text-white/40 tracking-wider uppercase">
                    STANDARD DELIVERABLES:
                  </div>
                  <ul role="list" aria-label={`Deliverables for ${service.title}`} className="space-y-1.5 list-none p-0 m-0">
                    {service.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 font-mono text-xs text-white/80">
                        <span className="text-[#ff3b00] text-xs" aria-hidden="true">►</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & CTA Footer */}
              <footer className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-white/40 text-[10px] block">RATE STRUCTURE:</span>
                  <span className="text-white font-semibold">{service.pricing || 'Inquire for scope'}</span>
                </div>

                <button
                  id={`request-service-${service.id}`}
                  type="button"
                  onClick={onBookService}
                  className="px-3.5 py-1.5 rounded bg-white/5 hover:bg-[#ff3b00] text-white/80 hover:text-white border border-white/15 hover:border-[#ff3b00] transition-all cursor-pointer"
                >
                  REQUEST THIS SERVICE →
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};
