import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Quote } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TestimonialItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassModal } from '../common/GlassModal';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = usePortfolio();
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreate = () => {
    const newItem: TestimonialItem = {
      id: `test-${Date.now()}`,
      clientName: 'Sarah Jenkins',
      role: 'Head of Production',
      company: 'Vanguard Creative Agency',
      quote: 'Eugene has an uncanny sense for pacing and storytelling rhythm. He took 12 hours of raw commercial footage and turned it into pure gold.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      rating: 5,
      projectTitle: 'Apex Kinetic 2026',
      published: true,
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    saveTestimonial(editingItem);
    setIsModalOpen(false);
  };

  return (
    <section className="space-y-6" id="admin-testimonials-root">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[var(--brand-text)]">
            Client Reviews & Testimonials
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Manage industry endorsements, director quotes, and agency recommendations.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreate}
        >
          Add Testimonial
        </GlassButton>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
        {testimonials.map(item => (
          <li key={item.id}>
            <article className="h-full">
              <GlassCard className="p-5 flex flex-col justify-between gap-4 h-full">
                <div className="space-y-3">
                  <header className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[var(--brand-primary)]" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-[var(--brand-text-muted)]" />
                  </header>

                  <blockquote className="m-0 p-0">
                    <p className="text-xs text-[var(--brand-text)] italic leading-relaxed m-0">
                      "{item.quote}"
                    </p>
                  </blockquote>
                </div>

                <footer className="pt-3 border-t border-[var(--brand-border)] flex items-center justify-between">
                  <figure className="flex items-center gap-2.5 m-0">
                    <img
                      src={item.avatarUrl}
                      alt={item.clientName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <figcaption>
                      <h3 className="text-xs font-bold text-[var(--brand-text)]">
                        {item.clientName}
                      </h3>
                      <span className="text-[10px] text-[var(--brand-text-muted)] block">
                        {item.role}, {item.company}
                      </span>
                    </figcaption>
                  </figure>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-[var(--brand-surface-elevated)] text-[var(--brand-text)] hover:text-[var(--brand-primary)] cursor-pointer"
                      title="Edit Testimonial"
                      aria-label={`Edit review from ${item.clientName}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(item.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer"
                      title="Delete Testimonial"
                      aria-label={`Delete review from ${item.clientName}`}
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

      {editingItem && (
        <GlassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Testimonial"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <fieldset className="space-y-4 border-0 p-0 m-0">
              <legend className="sr-only">Testimonial Details</legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="test-name" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                    Client Name *
                  </label>
                  <input
                    id="test-name"
                    type="text"
                    required
                    value={editingItem.clientName}
                    onChange={e => setEditingItem({ ...editingItem, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  />
                </div>

                <div>
                  <label htmlFor="test-company" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                    Role & Company
                  </label>
                  <input
                    id="test-company"
                    type="text"
                    value={editingItem.company}
                    onChange={e => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="test-quote" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Quote Content *
                </label>
                <textarea
                  id="test-quote"
                  required
                  rows={3}
                  value={editingItem.quote}
                  onChange={e => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label htmlFor="test-avatar" className="block text-xs font-bold text-[var(--brand-text)] mb-1">
                  Avatar Photo URL
                </label>
                <input
                  id="test-avatar"
                  type="url"
                  value={editingItem.avatarUrl}
                  onChange={e => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>
            </fieldset>

            <footer className="flex justify-end gap-2 pt-3">
              <GlassButton variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </GlassButton>
              <GlassButton type="submit" variant="primary" size="sm">
                Save Review
              </GlassButton>
            </footer>
          </form>
        </GlassModal>
      )}
    </section>
  );
};
