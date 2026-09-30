import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsTabProps {
  testimonials: Testimonial[];
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
}

export const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  onSaveTestimonials,
}) => {
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleStartCreate = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      clientName: 'Director Name',
      role: 'Creative Director',
      company: 'Production Studio',
      content: 'Incredible editing rhythm, seamless color pipeline, and delivered ahead of broadcast deadline.',
      rating: 5,
      avatarUrl: '',
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: Testimonial[];
    if (isCreating) {
      updated = [...testimonials, editingItem];
    } else {
      updated = testimonials.map((t) => (t.id === editingItem.id ? editingItem : t));
    }
    onSaveTestimonials(updated);
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      onSaveTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            CLIENT ENDORSEMENTS &amp; TESTIMONIALS
          </h2>
          <p className="text-white/50">
            Showcase director reviews, record label testimonials, and 5-star ratings.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white rounded font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD TESTIMONIAL</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#141418] border border-white/10 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setEditingItem(t); setIsCreating(false); }} className="p-1 text-white/60 hover:text-white">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1 text-red-400 hover:text-red-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="font-body text-xs text-white/80 italic mb-4">"{t.content}"</p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="font-heading font-bold text-white text-sm">{t.clientName}</div>
              <div className="text-[10px] text-white/50">{t.role} • <span className="text-[#00e5ff]">{t.company}</span></div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="w-full max-w-md bg-[#121216] border border-white/15 rounded-lg p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white">{isCreating ? 'ADD TESTIMONIAL' : 'EDIT TESTIMONIAL'}</span>
              <button onClick={() => setEditingItem(null)} className="text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">CLIENT NAME</label>
                <input
                  type="text"
                  required
                  value={editingItem.clientName}
                  onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/70 uppercase mb-1">ROLE</label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 uppercase mb-1">COMPANY</label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">TESTIMONIAL QUOTE</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">AVATAR PHOTO URL (OPTIONAL)</label>
                <input
                  type="text"
                  value={editingItem.avatarUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button type="button" onClick={() => setEditingItem(null)} className="px-3 py-1.5 bg-white/5 rounded text-white/60">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#ff3b00] text-white font-bold rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
