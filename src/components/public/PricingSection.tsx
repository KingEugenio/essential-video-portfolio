import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import {
  Check,
  Zap,
  Sparkles,
  Clock,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { PricingPackage } from '../../types';

export const PricingSection: React.FC = () => {
  const { pricingPackages } = usePortfolio();
  const { theme } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [activePackageId, setActivePackageId] = useState<string | null>(null);

  // Check section visibility
  const isVisible = theme?.layout?.visibleSections?.pricing !== false;
  if (!isVisible) return null;

  const currencies = [
    { code: 'USD', symbol: '$', rate: 1 },
    { code: 'EUR', symbol: '€', rate: 0.92 },
    { code: 'GBP', symbol: '£', rate: 0.79 },
    { code: 'GHS', symbol: 'GH₵', rate: 15.5 },
    { code: 'NGN', symbol: '₦', rate: 1520 },
  ];

  const currentCurr = currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  const formatPrice = (pkg: PricingPackage) => {
    if (pkg.price.toLowerCase() === 'custom') return 'Custom Quote';
    const num = parseFloat(pkg.price.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return pkg.price;
    const converted = Math.round(num * currentCurr.rate);
    return `${currentCurr.symbol}${converted.toLocaleString()}`;
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setActivePackageId(pkg.id);
    const enquiryEl = document.getElementById('contact') || document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment & Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-text)]">
            TRANSPARENT POST-PRODUCTION PACKAGES
          </h2>
          <p className="text-base sm:text-lg text-[var(--brand-text-muted)] leading-relaxed">
            High-caliber editing, calibrated color grading, and engineered retention curves. No hidden fees, clear revision rounds, and reliable turnaround dates.
          </p>
        </div>

        {/* Currency Switcher */}
        <nav aria-label="Currency Selector" className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md self-start md:self-auto">
          <ul className="flex items-center gap-1.5 list-none p-0 m-0">
            {currencies.map((c) => (
              <li key={c.code}>
                <button
                  id={`curr-btn-${c.code}`}
                  type="button"
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCurrency === c.code
                      ? 'bg-[var(--brand-primary)] text-black shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c.code}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Pricing Cards Grid */}
      {pricingPackages.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-white/15 bg-white/5">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-[var(--brand-primary)] opacity-60" />
          <h3 className="text-lg font-bold text-white mb-2">CUSTOM QUOTE WORKFLOW</h3>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
            Pricing packages are currently customized per project scope. Share your footage and deliverables to receive a custom proposal.
          </p>
          <GlassButton
            id="quote-cta-btn"
            variant="primary"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request Custom Scope & Schedule
          </GlassButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPackages.map((pkg) => {
            const isFeatured = pkg.featured;
            return (
              <article
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`glass-card relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl transition-all duration-300 ${
                  isFeatured
                    ? 'border-[var(--brand-primary)] shadow-xl shadow-[var(--brand-primary)]/10 ring-1 ring-[var(--brand-primary)]/40'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--brand-primary)] text-black shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Package Title & Description */}
                  <header className="mb-6">
                    <h3 className="text-xl font-black tracking-tight text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-white/65 leading-relaxed min-h-[48px]">
                      {pkg.description}
                    </p>
                  </header>

                  {/* Price display */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {formatPrice(pkg)}
                      </span>
                      {pkg.billingPeriod && pkg.price.toLowerCase() !== 'custom' && (
                        <span className="text-xs text-white/50 font-medium">
                          {pkg.billingPeriod === 'per-month'
                            ? '/ mo'
                            : pkg.billingPeriod === 'per-video'
                            ? '/ video'
                            : '/ project'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-[11px] text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--brand-primary)]" />
                        {pkg.turnaround}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 text-[var(--brand-primary)]" />
                        {pkg.revisions}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                      Included Deliverables
                    </div>
                    <ul className="space-y-2.5 list-none p-0 m-0">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-white/80">
                          <div className="w-4 h-4 rounded-full bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <footer className="pt-4 border-t border-white/5">
                  <GlassButton
                    id={`btn-select-pkg-${pkg.id}`}
                    variant={isFeatured ? 'primary' : 'outline'}
                    className="w-full justify-center group text-xs font-bold py-3"
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    <span>{pkg.ctaText || 'Select Package'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </GlassButton>
                </footer>
              </article>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Strip */}
      <aside aria-label="Service Guarantees" className="mt-14 p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-around gap-6 text-xs text-white/70">
        <ul className="flex flex-wrap items-center justify-around gap-6 text-xs text-white/70 list-none p-0 m-0 w-full">
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>Frame-Accurate Proofing Portal Included</span>
          </li>
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>High-Speed Cloud Storage Ingest (Drive / Dropbox)</span>
          </li>
          <li className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>Need a tailored scope? Custom agreements available</span>
          </li>
        </ul>
      </aside>
    </section>
  );
};
