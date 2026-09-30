import React, { useState } from 'react';
import { PricingConfig, PricingTier } from '../../types';
import { 
  Plus, Trash2, Edit3, Check, DollarSign, 
  Save, ShieldAlert, Layers, ArrowUp, ArrowDown 
} from 'lucide-react';

interface PricingTabProps {
  pricing: PricingConfig;
  onUpdate: (pricing: PricingConfig) => void;
}

export const PricingTab: React.FC<PricingTabProps> = ({ pricing, onUpdate }) => {
  const [config, setConfig] = useState<PricingConfig>(pricing);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Feature input helper for modal/editor
  const [featureInput, setFeatureInput] = useState<string>('');

  const handleSaveAll = () => {
    onUpdate(config);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleToggleEnabled = () => {
    const updated = { ...config, enabled: !config.enabled };
    setConfig(updated);
    onUpdate(updated);
  };

  const handleAddTier = () => {
    const newTier: PricingTier = {
      id: `tier-${Date.now()}`,
      name: 'New Production Tier',
      badge: '',
      price: '$1,500',
      currency: config.activeCurrency || 'USD',
      billingPeriod: 'project',
      description: 'Brief overview of what is included in this package.',
      features: ['High-bitrate ProRes Master', '2 rounds of revisions', 'Sound FX mix'],
      notIncluded: [],
      ctaText: 'SELECT PACKAGE',
      featured: false,
      available: true,
      order: config.packages.length + 1,
    };

    setEditingTier(newTier);
  };

  const handleSaveTier = () => {
    if (!editingTier) return;

    let updatedPackages = [...config.packages];
    const existingIndex = updatedPackages.findIndex((p) => p.id === editingTier.id);

    if (existingIndex >= 0) {
      updatedPackages[existingIndex] = editingTier;
    } else {
      updatedPackages.push(editingTier);
    }

    const updatedConfig = { ...config, packages: updatedPackages };
    setConfig(updatedConfig);
    onUpdate(updatedConfig);
    setEditingTier(null);
  };

  const handleDeleteTier = (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing package?')) return;
    const updatedPackages = config.packages.filter((p) => p.id !== id);
    const updatedConfig = { ...config, packages: updatedPackages };
    setConfig(updatedConfig);
    onUpdate(updatedConfig);
  };

  const handleMoveTier = (index: number, direction: 'up' | 'down') => {
    const updated = [...config.packages];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    const updatedConfig = { ...config, packages: updated };
    setConfig(updatedConfig);
    onUpdate(updatedConfig);
  };

  return (
    <div className="space-y-8 font-mono text-xs text-white/90">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#14141a] border border-white/10">
        <div>
          <h2 className="font-heading font-bold text-lg text-white">
            PRICING &amp; PACKAGE MANAGER
          </h2>
          <p className="font-body text-xs text-white/60 mt-0.5">
            Configure transparent production packages, multi-currency switcher, and custom quote settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> SAVED
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5520] text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>SAVE SETTINGS</span>
          </button>
        </div>
      </div>

      {/* Global Section Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-[#111116] border border-white/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white font-bold">ENABLE PRICING SECTION</label>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={handleToggleEnabled}
              className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-white/60 block mb-1">SECTION HEADLINE</label>
            <input
              type="text"
              value={config.headline}
              onChange={(e) => setConfig({ ...config, headline: e.target.value })}
              className="w-full bg-[#181820] border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00e5ff]"
            />
          </div>

          <div>
            <label className="text-white/60 block mb-1">SECTION SUBHEADLINE</label>
            <textarea
              rows={2}
              value={config.subheadline}
              onChange={(e) => setConfig({ ...config, subheadline: e.target.value })}
              className="w-full bg-[#181820] border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00e5ff]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/60 block mb-1">DEFAULT ACTIVE CURRENCY</label>
            <select
              value={config.activeCurrency}
              onChange={(e) => setConfig({ ...config, activeCurrency: e.target.value })}
              className="w-full bg-[#181820] border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00e5ff]"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="GHS">GHS (GH₵)</option>
              <option value="NGN">NGN (₦)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="text-white/80">ENABLE 'REQUEST CUSTOM ESTIMATE' FOOTER</label>
            <input
              type="checkbox"
              checked={config.allowCustomQuote}
              onChange={(e) => setConfig({ ...config, allowCustomQuote: e.target.checked })}
              className="w-4 h-4 accent-[#ff3b00] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-white/60 block mb-1">CUSTOM QUOTE CTA BUTTON TEXT</label>
            <input
              type="text"
              value={config.quoteCtaText}
              onChange={(e) => setConfig({ ...config, quoteCtaText: e.target.value })}
              className="w-full bg-[#181820] border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00e5ff]"
            />
          </div>
        </div>
      </div>

      {/* Package Tiers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-white">
            PACKAGES &amp; TIERS ({config.packages.length})
          </h3>
          <button
            type="button"
            onClick={handleAddTier}
            className="px-3 py-1.5 bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] border border-[#00e5ff]/30 rounded-lg flex items-center gap-1 font-bold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD PACKAGE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {config.packages.map((tier, idx) => (
            <div
              key={tier.id}
              className={`p-5 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                tier.featured
                  ? 'bg-[#181824] border-[#ff3b00]/60'
                  : 'bg-[#121216] border-white/10'
              }`}
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{tier.name}</span>
                  {tier.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ff3b00] text-white text-[10px] font-bold">
                      FEATURED
                    </span>
                  )}
                  {tier.badge && (
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[#00e5ff] text-[10px]">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="text-white/60 text-xs">{tier.description}</div>
                <div className="text-xs pt-1 flex items-center gap-3">
                  <span className="font-bold text-white text-base">{tier.price}</span>
                  <span className="text-white/40">({tier.features.length} features included)</span>
                </div>
              </div>

              {/* Tier Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleMoveTier(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveTier(idx, 'down')}
                  disabled={idx === config.packages.length - 1}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTier(tier)}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>EDIT</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTier(tier.id)}
                  className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#121218] border border-white/20 rounded-xl max-w-2xl w-full p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-bold text-lg text-white">
                EDIT PRICING PACKAGE
              </h3>
              <button
                type="button"
                onClick={() => setEditingTier(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 block mb-1">TIER NAME</label>
                <input
                  type="text"
                  value={editingTier.name}
                  onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                  className="w-full bg-[#1a1a24] border border-white/15 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">PRICE (e.g. $2,800 or Starting at $1,200)</label>
                <input
                  type="text"
                  value={editingTier.price}
                  onChange={(e) => setEditingTier({ ...editingTier, price: e.target.value })}
                  className="w-full bg-[#1a1a24] border border-white/15 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">OPTIONAL BADGE (e.g. MOST POPULAR)</label>
                <input
                  type="text"
                  value={editingTier.badge || ''}
                  onChange={(e) => setEditingTier({ ...editingTier, badge: e.target.value })}
                  className="w-full bg-[#1a1a24] border border-white/15 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">BILLING UNIT</label>
                <select
                  value={editingTier.billingPeriod || 'project'}
                  onChange={(e) => setEditingTier({ ...editingTier, billingPeriod: e.target.value as any })}
                  className="w-full bg-[#1a1a24] border border-white/15 rounded px-3 py-2 text-white"
                >
                  <option value="project">Per Project / Spot</option>
                  <option value="monthly">Monthly Retainer</option>
                  <option value="per-minute">Per Finished Minute</option>
                  <option value="one-off">One-Off Deliverable</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-white/60 block mb-1">DESCRIPTION</label>
                <input
                  type="text"
                  value={editingTier.description}
                  onChange={(e) => setEditingTier({ ...editingTier, description: e.target.value })}
                  className="w-full bg-[#1a1a24] border border-white/15 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTier.featured}
                    onChange={(e) => setEditingTier({ ...editingTier, featured: e.target.checked })}
                    className="accent-[#ff3b00] w-4 h-4"
                  />
                  <span className="text-white font-bold">HIGHLIGHT AS FEATURED / MOST POPULAR</span>
                </label>
              </div>
            </div>

            {/* Included Features Editor */}
            <div>
              <label className="text-white/60 block mb-1">INCLUDED FEATURES</label>
              <div className="space-y-2 mb-3">
                {editingTier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const updated = [...editingTier.features];
                        updated[fIdx] = e.target.value;
                        setEditingTier({ ...editingTier, features: updated });
                      }}
                      className="flex-1 bg-[#1a1a24] border border-white/15 rounded px-3 py-1.5 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = editingTier.features.filter((_, i) => i !== fIdx);
                        setEditingTier({ ...editingTier, features: updated });
                      }}
                      className="text-red-400 p-1 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add feature line */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add new feature bullet..."
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && featureInput.trim()) {
                      e.preventDefault();
                      setEditingTier({
                        ...editingTier,
                        features: [...editingTier.features, featureInput.trim()],
                      });
                      setFeatureInput('');
                    }
                  }}
                  className="flex-1 bg-[#14141a] border border-white/10 rounded px-3 py-1.5 text-white placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (featureInput.trim()) {
                      setEditingTier({
                        ...editingTier,
                        features: [...editingTier.features, featureInput.trim()],
                      });
                      setFeatureInput('');
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  ADD
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingTier(null)}
                className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-white/70 font-bold"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSaveTier}
                className="px-4 py-2 rounded bg-[#ff3b00] hover:bg-[#ff5520] text-white font-bold"
              >
                SAVE PACKAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
