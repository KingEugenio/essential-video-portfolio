import React, { useState } from 'react';
import { PricingConfig, PricingTier } from '../../types';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingSectionProps {
  config?: PricingConfig;
  onSelectTier?: (tier: PricingTier) => void;
  onRequestCustomQuote?: () => void;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  GHS: 'GH₵',
  NGN: '₦',
  CAD: 'CA$',
  AUD: 'AU$',
};

// Conversion multiplier table relative to USD for multi-currency viewing
const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  GHS: 15.2,
  NGN: 1480,
  CAD: 1.36,
  AUD: 1.54,
};

export const PricingSection: React.FC<PricingSectionProps> = ({
  config,
  onSelectTier,
  onRequestCustomQuote,
}) => {
  if (!config || !config.enabled) return null;

  const [activeCurrency, setActiveCurrency] = useState<string>(config.activeCurrency || 'USD');

  const currencies = config.supportedCurrencies && config.supportedCurrencies.length > 0
    ? config.supportedCurrencies
    : ['USD', 'EUR', 'GBP', 'GHS', 'NGN'];

  // Helper to format price according to chosen currency
  const formatPrice = (rawPriceStr: string, currency: string) => {
    // If raw price is not a standard number (e.g. Custom or starting with $), parse numerical value
    const match = rawPriceStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(match);

    if (isNaN(num)) {
      return rawPriceStr;
    }

    const rate = CURRENCY_RATES[currency] || 1;
    const symbol = CURRENCY_SYMBOLS[currency] || `${currency} `;
    const converted = Math.round(num * rate);

    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 w-full relative">
      {/* Section Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest mb-2 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            <span>TRANSPARENT PRICING &amp; PACKAGES</span>
          </div>
          <h2 id="pricing-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {config.headline || 'PRODUCTION PACKAGES'}
          </h2>
          <p className="font-body text-sm sm:text-base text-white/70 max-w-2xl mt-2 leading-relaxed">
            {config.subheadline || 'Select a standardized production package or request a bespoke quote tailored to your footage specifications and delivery pipeline.'}
          </p>
        </div>

        {/* Currency Switcher Navigation */}
        {currencies.length > 1 && (
          <nav aria-label="Currency Selector" className="flex items-center gap-1.5 p-1 bg-[#121214] border border-white/15 rounded-lg font-mono text-xs">
            <span className="text-white/40 text-[11px] px-2 font-medium">CURRENCY:</span>
            {currencies.map((curr) => (
              <button
                key={curr}
                id={`currency-btn-${curr.toLowerCase()}`}
                type="button"
                onClick={() => setActiveCurrency(curr)}
                className={`px-2.5 py-1 rounded transition-colors font-semibold cursor-pointer ${
                  activeCurrency === curr
                    ? 'bg-[#ff3b00] text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={activeCurrency === curr}
              >
                {curr}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {config.packages.map((tier) => {
          const isFeatured = tier.featured;

          return (
            <article
              key={tier.id}
              id={`pricing-tier-${tier.id}`}
              className={`relative flex flex-col justify-between rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
                isFeatured
                  ? 'bg-gradient-to-b from-[#181820] to-[#121216] border-[#ff3b00] shadow-[0_0_30px_rgba(255,59,0,0.15)] md:-translate-y-2'
                  : 'bg-[#121214] border-white/15 hover:border-white/30'
              }`}
            >
              {/* Featured Badge */}
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff3b00] text-white font-mono text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-md">
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  <span>{tier.badge || 'MOST POPULAR'}</span>
                </div>
              )}

              {/* Package Top */}
              <div>
                <header className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-xl text-white">
                      {tier.name}
                    </h3>
                    {!isFeatured && tier.badge && (
                      <span className="font-mono text-[10px] text-[#00e5ff] bg-[#00e5ff]/10 border border-[#00e5ff]/20 px-2 py-0.5 rounded">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs sm:text-sm text-white/60 min-h-[40px] leading-relaxed">
                    {tier.description}
                  </p>
                </header>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                      {formatPrice(tier.price, activeCurrency)}
                    </span>
                    {tier.billingPeriod && (
                      <span className="font-mono text-xs text-white/50 lowercase">
                        /{tier.billingPeriod === 'project' ? 'spot' : tier.billingPeriod}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-2">
                    INCLUDED IN PACKAGE:
                  </div>
                  <ul role="list" aria-label={`Features included in ${tier.name}`} className="space-y-3 list-none p-0 m-0">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.notIncluded && tier.notIncluded.length > 0 && (
                    <ul role="list" aria-label={`Features excluded in ${tier.name}`} className="pt-2 space-y-2 opacity-50 list-none p-0 m-0">
                      {tier.notIncluded.map((notFeat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-white/50 line-through">
                          <span className="w-4 text-center font-mono" aria-hidden="true">×</span>
                          <span className="leading-snug">{notFeat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Button Footer */}
              <footer>
                <button
                  id={`select-tier-${tier.id}`}
                  type="button"
                  onClick={() => onSelectTier && onSelectTier(tier)}
                  className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-[#ff3b00] hover:bg-[#ff5520] text-white shadow-lg shadow-[#ff3b00]/25'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  <span>{tier.ctaText || 'SELECT PACKAGE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      {/* Custom Quote Aside */}
      {config.allowCustomQuote && (
        <aside aria-label="Custom Quote Option" className="mt-12 bg-gradient-to-r from-[#121216] via-[#16161c] to-[#121216] border border-white/15 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Need a Custom Feature Film, VFX Suite, or Concert Cut?
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70 mt-0.5">
                We accommodate multi-TB raw rushes, custom ACES on-set DIT color pipelines, and 5.1 surround sound mastering.
              </p>
            </div>
          </div>

          <button
            id="custom-estimate-btn"
            type="button"
            onClick={onRequestCustomQuote}
            className="w-full md:w-auto flex-shrink-0 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-xs font-bold text-white tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#00e5ff]" aria-hidden="true" />
            <span>{config.quoteCtaText || 'REQUEST CUSTOM ESTIMATE'}</span>
          </button>
        </aside>
      )}
    </section>
  );
};
