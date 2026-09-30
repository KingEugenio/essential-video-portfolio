import React from 'react';
import { Award, Monitor, Cpu, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';

export const AboutSection: React.FC = () => {
  const { brand } = useTheme();

  const hardwareGear = [
    { name: 'Apple Mac Studio M2 Ultra (128GB Unified RAM)', type: 'Workstation' },
    { name: 'Flanders Scientific DM240 Broadcast Color Monitor', type: 'Color Reference' },
    { name: 'Pro Display XDR 32" 6K Retina', type: 'GUI Primary' },
    { name: 'Tangent Element Color Control Surface', type: 'Grading Console' },
    { name: 'QNAP 128TB 10GbE All-NVMe Media RAID', type: 'High-Speed Storage' },
    { name: 'Genelec 8030C Studio Nearfield Monitors', type: 'Audio Reference' },
  ];

  return (
    <section id="about-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--brand-border)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Portrait & Personal Bio */}
        <article className="lg:col-span-5 flex flex-col gap-6">
          <figure className="relative aspect-square max-w-md rounded-3xl overflow-hidden border-2 border-[var(--brand-border)] shadow-2xl bg-black m-0">
            <img
              src={brand.profileImageUrl}
              alt={brand.brandName}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)]">
                {brand.location}
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                {brand.brandName}
              </h3>
              <p className="text-xs text-neutral-300">
                {brand.professionalTitle}
              </p>
            </figcaption>
          </figure>

          <div className="space-y-4 text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed">
            <p>{brand.bio}</p>
            <p>
              Whether cutting fast-paced broadcast spots for global sports apparel or crafting nuanced long-form documentaries, the focus is always on pacing, emotional gravity, and visual polish.
            </p>
          </div>

          {/* Key Stats */}
          {brand.showStats && (
            <dl className="grid grid-cols-3 gap-3 p-4 rounded-2xl glass-surface border border-[var(--brand-border)] text-center m-0">
              <div>
                <dt className="block font-heading text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)]">
                  {brand.yearsOfExperience}+
                </dt>
                <dd className="text-[11px] text-[var(--brand-text-muted)] font-medium m-0">Years in Post</dd>
              </div>
              <div>
                <dt className="block font-heading text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)]">
                  {brand.projectsCompleted}+
                </dt>
                <dd className="text-[11px] text-[var(--brand-text-muted)] font-medium m-0">Films Delivered</dd>
              </div>
              <div>
                <dt className="block font-heading text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)]">
                  {brand.awardsWon}
                </dt>
                <dd className="text-[11px] text-[var(--brand-text-muted)] font-medium m-0">Industry Awards</dd>
              </div>
            </dl>
          )}
        </article>

        {/* Right Column: Software Mastery & Hardware Suite */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Software Skills */}
          <section aria-labelledby="software-stack-heading">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--brand-primary)]" />
              <h3 id="software-stack-heading" className="text-xl font-bold font-heading text-[var(--brand-text)]">
                NLE & Post-Production Software Stack
              </h3>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {(brand.softwareStack || brand.softwareTools || []).map((sw, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-xl glass-card border border-[var(--brand-border)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                    <span className="text-sm font-semibold text-[var(--brand-text)]">
                      {sw.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--brand-surface-elevated)] text-[var(--brand-primary)] border border-[var(--brand-border)]">
                    {sw.level} {sw.category ? `· ${sw.category}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Post Suite Hardware */}
          <section aria-labelledby="hardware-gear-heading">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-[var(--brand-primary)]" />
              <h3 id="hardware-gear-heading" className="text-xl font-bold font-heading text-[var(--brand-text)]">
                Hardware, Monitoring & Storage Infrastructure
              </h3>
            </div>

            <dl className="space-y-2.5 m-0">
              {hardwareGear.map((gear, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl glass-surface border border-[var(--brand-border)] flex items-center justify-between text-xs"
                >
                  <dt className="font-medium text-[var(--brand-text)] m-0">{gear.name}</dt>
                  <dd className="text-[var(--brand-text-muted)] font-mono m-0">{gear.type}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Client Accolades / Logos */}
          <footer className="pt-4 border-t border-[var(--brand-border)]">
            <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-text-muted)] block mb-3">
              Trusted by Leading Brands & Agencies
            </span>
            <ul className="flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all list-none p-0 m-0">
              {['RED BULL', 'NIKE COMMERCIAL', 'SONY MUSIC', 'SPOTIFY STUDIOS', 'BBC FILMS', 'UNIVERSAL'].map((client, i) => (
                <li key={i} className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-[var(--brand-text)]">
                  {client}
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </div>
    </section>
  );
};
