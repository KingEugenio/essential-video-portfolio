import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, Film, 
  Sliders, ShieldCheck, Clock, CreditCard, MessageSquare, 
  ArrowRight, CheckCircle2, FileVideo, HardDrive, Cpu
} from 'lucide-react';
import { RetroWindow } from '../effects/RetroWindow';

interface FAQItem {
  id: string;
  category: 'workflow' | 'formats' | 'turnaround' | 'commercial';
  question: string;
  answer: string;
  badge?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'workflow',
    question: 'How do we upload and transfer multi-terabyte raw project footage?',
    answer: 'We provide dedicated high-speed cloud partitions via Google Drive, Frame.io, Dropbox Transfer, or Aspera. For extensive multi-camera shoots (500GB–8TB+), clients can ship encrypted physical NVMe/RAID hard drives directly to our editing studio suite for same-day local ingestion and verification.',
    badge: 'INGESTION',
  },
  {
    id: 'faq-2',
    category: 'formats',
    question: 'Which raw camera formats, codecs, and color spaces do you support?',
    answer: 'We support all major professional digital cinema and broadcast pipelines including RED (R3D), ARRI (ARRIRAW/ProRes 4444 XQ), Sony (XAVC / RAW / S-Log3), Canon Cinema RAW Light (CRM / C-Log), Blackmagic (BRAW), Apple ProRes RAW, and 10-bit LOG mirrorless captures. We grade in ACES 1.3 or DaVinci YRGB Color Managed color science.',
    badge: 'COLOR / CODECS',
  },
  {
    id: 'faq-3',
    category: 'turnaround',
    question: 'What is your standard turnaround time for a first cut?',
    answer: 'Standard commercial short-form edits (0:15 / 0:30 / 0:60 / 9:16 reels) deliver an initial assembly / offline rough cut within 48 to 72 business hours. Music videos, documentaries, and long-form brand films typically deliver in 5 to 7 business days. Rush priority delivery (24-hour turnaround) is available upon request.',
    badge: 'DELIVERY',
  },
  {
    id: 'faq-4',
    category: 'workflow',
    question: 'How does the revision and review process work?',
    answer: 'All drafts are delivered through Frame.io or timestamped video review portals. Directors, creative leads, and clients can leave frame-accurate visual notes, drawing markers, and audio comments directly on the timeline. Standard project packages include up to 3 comprehensive revision cycles.',
    badge: 'COLLABORATION',
  },
  {
    id: 'faq-5',
    category: 'commercial',
    question: 'Do you execute Non-Disclosure Agreements (NDAs) for unreleased campaigns?',
    answer: 'Yes. We sign mutual or client-drafted NDAs before accepting any project drive, script, or footage link. Unreleased creative campaigns, product launches, and narrative projects remain strictly air-gapped on encrypted local RAID storage until their official public broadcast.',
    badge: 'SECURITY',
  },
  {
    id: 'faq-6',
    category: 'formats',
    question: 'What export master deliverables and social aspect ratios are provided?',
    answer: 'Final project handoffs include uncompressed master files (ProRes 4444 / ProRes 422 HQ), web-optimized master H.264/H.265 deliverables, clean textless international cuts, split audio stems (Dialogue, Music, SFX), and multi-platform cutdowns formatted for 16:9 widescreen, 9:16 vertical reels, 1:1 square, and 4:5 social feeds.',
    badge: 'DELIVERABLES',
  },
  {
    id: 'faq-7',
    category: 'workflow',
    question: 'Can you handle audio mastering, dialogue cleanup, and sound design?',
    answer: 'Yes. Every project undergoes a dedicated sound mix including vocal de-noising (iZotope RX Advanced), dialogue leveling, ambient foley layering, dynamic impact hits, and master normalization to broadcast standards (-14 LUFS for web/social or -24 LKFS for television broadcast).',
    badge: 'AUDIO CONFORM',
  },
  {
    id: 'faq-8',
    category: 'commercial',
    question: 'What are your payment terms and project booking milestones?',
    answer: 'Standard bookings require a 50% upfront project deposit to lock edit bay calendar time, with the remaining 50% due upon final master approval prior to watermark-free high-resolution file dispatch. We accept Wire Transfer, ACH, Credit Card, and Stripe invoice billing.',
    badge: 'PAYMENT',
  },
];

interface FAQSectionProps {
  onContactClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openItems, setOpenItems] = useState<string[]>(['faq-1', 'faq-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.badge && faq.badge.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff] uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 id="faq-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              PRODUCTION &amp; TECHNICAL SPECS FAQ
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl font-body">
              Everything you need to know about footage ingestion, raw color pipelines, turnaround times, Frame.io reviews, and project deliverables.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter questions..."
              className="w-full bg-[#121214] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00e5ff] transition-colors"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: 'ALL QUESTIONS', icon: HelpCircle },
            { id: 'workflow', label: 'WORKFLOW & REVIEW', icon: Sliders },
            { id: 'formats', label: 'CAMERAS & COLOR', icon: Film },
            { id: 'turnaround', label: 'DELIVERY & SPECS', icon: Clock },
            { id: 'commercial', label: 'BILLING & NDAS', icon: ShieldCheck },
          ].map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00e5ff]/15 text-[#00e5ff] border-[#00e5ff]/40 shadow-[0_0_12px_rgba(0,229,255,0.15)] font-bold'
                    : 'bg-[#121214] text-white/70 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List in Retro Window Container */}
        <RetroWindow title="PRODUCTION BRIEFING FAQ DATABASE" className="border-white/15 shadow-xl">
          <div className="divide-y divide-white/10 bg-[#0d0d10]">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center text-white/50 font-mono text-xs">
                NO MATCHING QUESTIONS FOUND FOR "{searchQuery}".
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openItems.includes(faq.id);
                return (
                  <div key={faq.id} className="transition-colors hover:bg-white/[0.02]">
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-xs font-mono shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {faq.badge && (
                              <span className="px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 text-[9px] font-mono font-bold tracking-wider uppercase">
                                {faq.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#00e5ff] transition-colors leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      <div className="shrink-0 p-1.5 rounded-md bg-white/5 text-white/60">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-6 pt-1 sm:pl-16 font-body text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/5 bg-black/30 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </RetroWindow>

        {/* Bottom Contact Callout */}
        <div className="mt-8 p-6 rounded-xl bg-radial from-[#ff3b00]/10 via-[#121214] to-[#121214] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff3b00]/20 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-base text-white">
                Have a customized project inquiry or specific technical constraint?
              </div>
              <p className="text-xs text-white/60 font-body">
                We provide custom timeline quotes and camera ingestion workflow consultations within 24 hours.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="shrink-0 inline-flex items-center gap-2 bg-[#ff3b00] hover:bg-[#ff551f] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(255,59,0,0.2)]"
          >
            <span>SEND CUSTOM BRIEF</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
