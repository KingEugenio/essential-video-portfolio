import React from 'react';
import { User, Cpu, MapPin, Award, CheckCircle, Terminal, HardDrive } from 'lucide-react';
import { BrandSettings } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';

interface AboutSectionProps {
  brand: BrandSettings;
  onContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ brand, onContact }) => {
  const softwareSkills = [
    { name: 'Premiere Pro', level: 'Master', cat: 'NLE' },
    { name: 'DaVinci Resolve Studio', level: 'Master Colorist', cat: 'Color' },
    { name: 'After Effects', level: 'Advanced', cat: 'Motion / VFX' },
    { name: 'Pro Tools / Logic', level: 'Sound Design', cat: 'Audio' },
    { name: 'Cinema 4D / Blender', level: '3D Elements', cat: '3D' },
    { name: 'ACES Color Pipeline', level: 'Color Science', cat: 'Pipeline' },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <RetroWindow
        title={`OPERATOR_DOSSIER // ${brand.brandName.toUpperCase()}`}
        subtitle="STATION SPECS &amp; BIOGRAPHY"
        badge="VERIFIED"
        styleVariant={brand.windowStyle}
        className="w-full"
      >
        <div className="p-6 sm:p-8 bg-[#0f0f12]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Operator Photo / Hologram using figure and figcaption */}
            <figure className="lg:col-span-4 flex flex-col items-center m-0">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl bg-black group">
                <img
                  src={brand.avatarUrl}
                  alt={`${brand.brandName} - ${brand.professionalTitle || 'Senior Video Editor & Colorist'} portrait in edit suite`}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* HUD Overlay */}
                <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center justify-between font-mono text-[9px] text-white/70">
                  <span>EDITORIAL ARCHIVE</span>
                  <span className="text-white/40">{brand.location}</span>
                </div>
              </div>

              <figcaption className="mt-4 text-center">
                <h3 className="font-heading font-bold text-xl text-white">
                  {brand.brandName}
                </h3>
                <p className="font-mono text-xs text-[#ff3b00] tracking-wider uppercase mt-0.5">
                  {brand.professionalTitle}
                </p>
                <address className="not-italic flex items-center justify-center gap-1.5 font-mono text-xs text-white/50 mt-1">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{brand.location}</span>
                </address>
              </figcaption>
            </figure>

            {/* Biography and Capabilities as Article */}
            <article className="lg:col-span-8 flex flex-col gap-6">
              <header>
                <div className="flex items-center gap-2 font-mono text-xs text-[#00e5ff] tracking-widest uppercase mb-2">
                  <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>OPERATOR MANIFESTO</span>
                </div>
                <h2 id="about-heading" className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                  {brand.aboutManifestoHeadline || 'CRAFTING INTENTIONAL VISUAL RHYTHM'}
                </h2>
                <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed">
                  {brand.bio}
                </p>
              </header>

              {/* Hardware & Software Pipeline as dl / dt / dd */}
              <div>
                <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#ff3b00]" aria-hidden="true" />
                  <span>PRIMARY SOFTWARE &amp; PIPELINE STACK</span>
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs m-0">
                  {softwareSkills.map((sk) => (
                    <div
                      key={sk.name}
                      className="p-2.5 rounded bg-[#16161b] border border-white/10 hover:border-[#ff3b00]/50 transition-colors"
                    >
                      <dt className="text-white font-semibold">{sk.name}</dt>
                      <dd className="flex items-center justify-between text-[10px] text-white/40 mt-1 m-0">
                        <span>{sk.cat}</span>
                        <span className="text-[#00e5ff]">{sk.level}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick specs metrics in Footer */}
              <footer className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <HardDrive className="w-4 h-4 text-[#ff3b00]" aria-hidden="true" />
                  <span>NVMe RAID 0 • 10GbE High-Speed Pipeline</span>
                </div>

                <button
                  id="about-cta-btn"
                  type="button"
                  onClick={onContact}
                  className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-semibold rounded text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  START A TRANSMISSION →
                </button>
              </footer>
            </article>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
};
