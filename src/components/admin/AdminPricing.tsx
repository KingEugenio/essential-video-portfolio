import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  CreditCard,
  Clock,
  RefreshCw,
  Star,
  DollarSign,
  Layers,
} from 'lucide-react';
import { PricingPackage } from '../../types';

export const AdminPricing: React.FC = () => {
  const { pricingPackages, savePricingPackage, deletePricingPackage } = usePortfolio();
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<PricingPackage>>({
    name: '',
    slug: '',
    price: '',
    currency: 'USD',
    billingPeriod: 'project',
    description: '',
    features: [''],
    turnaround: '3-5 Business Days',
    revisions: '2 Rounds',
    featured: false,
    badge: '',
    ctaText: 'Select Package',
    order: (pricingPackages.length || 0) + 1,
  });

  const handleStartCreate = () => {
    setEditingPackage(null);
    setFormData({
      id: `price-${Date.now()}`,
      name: '',
      slug: '',
      price: '',
      currency: 'USD',
      billingPeriod: 'project',
      description: '',
      features: [
        'Master 4K Video Export',
        'DaVinci Resolve Color Grade',
        'Custom Sound Design & Mix',
        '2 Revision Rounds Included',
      ],
      turnaround: '3 - 5 Days',
      revisions: '2 Rounds',
      featured: false,
      badge: '',
      ctaText: 'Select Package',
      order: pricingPackages.length + 1,
    });
    setIsCreating(true);
  };

  const handleStartEdit = (pkg: PricingPackage) => {
    setEditingPackage(pkg);
    setFormData({ ...pkg, features: [...pkg.features] });
    setIsCreating(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill out the package name and price.');
      return;
    }

    const cleanedFeatures = (formData.features || []).filter((f) => f.trim().length > 0);
    const finalPackage: PricingPackage = {
      id: formData.id || (editingPackage ? editingPackage.id : `price-${Date.now()}`),
      name: formData.name || 'New Package',
      slug: formData.slug || (formData.name || 'pkg').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: formData.price || '0',
      currency: formData.currency || 'USD',
      billingPeriod: formData.billingPeriod || 'project',
      description: formData.description || '',
      features: cleanedFeatures.length > 0 ? cleanedFeatures : ['Standard video editing and master deliverable'],
      turnaround: formData.turnaround || '3-5 Days',
      revisions: formData.revisions || '2 Rounds',
      featured: !!formData.featured,
      badge: formData.badge || undefined,
      ctaText: formData.ctaText || 'Select Package',
      order: formData.order || 1,
    };

    savePricingPackage(finalPackage);
    setEditingPackage(null);
    setIsCreating(false);
  };

  const handleAddFeatureField = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ''],
    }));
  };

  const handleUpdateFeatureField = (index: number, val: string) => {
    setFormData((prev) => {
      const next = [...(prev.features || [])];
      next[index] = val;
      return { ...prev, features: next };
    });
  };

  const handleRemoveFeatureField = (index: number) => {
    setFormData((prev) => {
      const next = [...(prev.features || [])];
      next.splice(index, 1);
      return { ...prev, features: next };
    });
  };

  return (
    <section className="space-y-8" id="admin-pricing-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[var(--brand-primary)]" />
            Pricing & Service Packages
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Configure client conversion packages, retainer models, and deliverable feature lists.
          </p>
        </div>
        <GlassButton
          id="btn-add-package"
          variant="primary"
          onClick={handleStartCreate}
          className="self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Package
        </GlassButton>
      </header>

      {/* Editor Modal / Drawer */}
      {(isCreating || editingPackage) && (
        <GlassCard className="p-6 sm:p-8 border-[var(--brand-primary)]/50 ring-1 ring-[var(--brand-primary)]/30">
          <header className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--brand-primary)]" />
              {isCreating ? 'Create New Pricing Package' : `Edit "${editingPackage?.name}"`}
            </h3>
            <button
              id="btn-cancel-edit-package"
              onClick={() => {
                setEditingPackage(null);
                setIsCreating(false);
              }}
              className="text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
          </header>

          <form onSubmit={handleSaveForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Commercial Master, Monthly Retainer"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Price Amount *
                </label>
                <input
                  type="text"
                  required
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. 1,800 or Custom"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>

              {/* Billing Period */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Billing Period / Unit
                </label>
                <select
                  value={formData.billingPeriod || 'project'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billingPeriod: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                >
                  <option value="project">Per Project</option>
                  <option value="per-video">Per Video / Deliverable</option>
                  <option value="per-month">Monthly Retainer</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Short Description / Ideal For
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe who this package is best suited for..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Turnaround */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  Turnaround Time
                </label>
                <input
                  type="text"
                  value={formData.turnaround || ''}
                  onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                  placeholder="e.g. 48 Hours, 3 - 5 Days"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>

              {/* Revisions */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  Revision Policy
                </label>
                <input
                  type="text"
                  value={formData.revisions || ''}
                  onChange={(e) => setFormData({ ...formData, revisions: e.target.value })}
                  placeholder="e.g. 2 Rounds, Unlimited"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  Highlight Badge (Optional)
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Most Popular, Best Value"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>
            </div>

            {/* Featured Checkbox & CTA Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.ctaText || ''}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="e.g. Book Commercial Project"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="pkg-featured"
                  checked={!!formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] bg-black"
                />
                <label htmlFor="pkg-featured" className="text-sm font-medium text-white select-none">
                  Highlight this as the Primary / Featured Plan
                </label>
              </div>
            </div>

            {/* Features / Deliverables List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Deliverables & Features Checklist
                </label>
                <button
                  type="button"
                  id="btn-add-feature-row"
                  onClick={handleAddFeatureField}
                  className="text-xs text-[var(--brand-primary)] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Feature Line
                </button>
              </div>

              <div className="space-y-2">
                {(formData.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleUpdateFeatureField(idx, e.target.value)}
                      placeholder={`Feature #${idx + 1}`}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:border-[var(--brand-primary)] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeatureField(idx)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove feature"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <GlassButton
                id="btn-cancel-pkg"
                variant="outline"
                type="button"
                onClick={() => {
                  setEditingPackage(null);
                  setIsCreating(false);
                }}
              >
                Cancel
              </GlassButton>
              <GlassButton id="btn-save-pkg" variant="primary" type="submit">
                <Check className="w-4 h-4 mr-1.5" />
                {isCreating ? 'Create Package' : 'Save Changes'}
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Package Cards List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
        {pricingPackages.map((pkg) => {
          return (
            <li key={pkg.id}>
              <article className="h-full">
                <GlassCard
                  id={`admin-pkg-card-${pkg.id}`}
                  className={`p-6 flex flex-col justify-between relative border h-full ${
                    pkg.featured ? 'border-[var(--brand-primary)]/80 ring-1 ring-[var(--brand-primary)]/40' : 'border-white/10'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-[var(--brand-primary)] text-black">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    <header className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white text-lg">{pkg.name}</h3>
                        <div className="text-2xl font-black text-[var(--brand-primary)] mt-1">
                          ${pkg.price}{' '}
                          <span className="text-xs text-white/50 font-normal">
                            {pkg.billingPeriod ? `/${pkg.billingPeriod}` : ''}
                          </span>
                        </div>
                      </div>
                    </header>

                    <p className="text-xs text-white/60 mb-4 line-clamp-2">{pkg.description}</p>

                    <ul className="space-y-1.5 mb-6 text-xs text-white/70 list-none p-0 m-0">
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3 h-3 text-[var(--brand-primary)] shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-[10px] text-white/40 italic">
                          + {pkg.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <footer className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[11px] text-white/50">{pkg.turnaround}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        id={`btn-edit-pkg-${pkg.id}`}
                        onClick={() => handleStartEdit(pkg)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Edit Package"
                        aria-label={`Edit package ${pkg.name}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`btn-delete-pkg-${pkg.id}`}
                        onClick={() => {
                          if (confirm(`Delete package "${pkg.name}"?`)) {
                            deletePricingPackage(pkg.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Package"
                        aria-label={`Delete package ${pkg.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </footer>
                </GlassCard>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
