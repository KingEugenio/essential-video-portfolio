import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Scissors, Film, Sparkles, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassModal } from '../common/GlassModal';

export const AdminServices: React.FC = () => {
  const { services, saveService, deleteService } = usePortfolio();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreate = () => {
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Commercial Offline & Online Finishing',
      description: 'Complete picture editing, rhythm tuning, and visual storytelling for broadcast and social.',
      deliverables: ['Story Assembly & Fine Cut', '2x Revision Rounds', 'ProRes 4444 Master Export'],
      startingPrice: '$3,500',
      showPrice: true,
      turnaround: '5 - 7 Business Days',
      icon: 'Scissors',
    };
    setEditingService(newSrv);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    saveService(editingService);
    setIsModalOpen(false);
  };

  return (
    <section className="space-y-6" id="admin-services-root">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
            Services & Production Packages
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Configure client service offerings, included deliverables, pricing tiers, and turnaround times.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreate}
        >
          Add Service Package
        </GlassButton>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
        {services.map(srv => (
          <li key={srv.id}>
            <article className="h-full">
              <GlassCard className="p-5 flex flex-col justify-between gap-4 h-full">
                <div>
                  <header className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold font-heading text-[var(--brand-text)]">
                      {srv.title}
                    </h3>
                    {srv.showPrice && srv.startingPrice && (
                      <span className="text-sm font-bold text-[var(--brand-primary)] font-mono">
                        {srv.startingPrice}
                      </span>
                    )}
                  </header>

                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  <ul className="space-y-1 pt-3 border-t border-[var(--brand-border)] list-none p-0 m-0">
                    {srv.deliverables.map((del, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-[var(--brand-text)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="pt-3 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--brand-text-muted)]">
                    Turnaround: <strong>{srv.turnaround}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(srv);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] hover:text-[var(--brand-primary)] cursor-pointer"
                      title="Edit Service"
                      aria-label={`Edit ${srv.title}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteService(srv.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer"
                      title="Delete Service"
                      aria-label={`Delete ${srv.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </footer>
              </GlassCard>
            </article>
          </li>
        ))}
      </ul>

      {editingService && (
        <GlassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Service Package Editor"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <fieldset className="space-y-4 border-0 p-0 m-0">
              <legend className="sr-only">Service Details</legend>
              <div>
                <label htmlFor="srv-title" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Package Title *
                </label>
                <input
                  id="srv-title"
                  type="text"
                  required
                  value={editingService.title}
                  onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label htmlFor="srv-desc" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Description
                </label>
                <textarea
                  id="srv-desc"
                  rows={2}
                  value={editingService.description}
                  onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="srv-price" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                    Starting Price Tag
                  </label>
                  <input
                    id="srv-price"
                    type="text"
                    placeholder="$2,500"
                    value={editingService.startingPrice || ''}
                    onChange={e => setEditingService({ ...editingService, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  />
                </div>

                <div>
                  <label htmlFor="srv-turnaround" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                    Turnaround Time
                  </label>
                  <input
                    id="srv-turnaround"
                    type="text"
                    placeholder="3-5 Business Days"
                    value={editingService.turnaround}
                    onChange={e => setEditingService({ ...editingService, turnaround: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="srv-deliv" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Deliverables (comma separated)
                </label>
                <input
                  id="srv-deliv"
                  type="text"
                  value={editingService.deliverables.join(', ')}
                  onChange={e =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>
            </fieldset>

            <div className="flex justify-end gap-2 pt-3">
              <GlassButton variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </GlassButton>
              <GlassButton type="submit" variant="primary" size="sm">
                Save Package
              </GlassButton>
            </div>
          </form>
        </GlassModal>
      )}
    </section>
  );
};
