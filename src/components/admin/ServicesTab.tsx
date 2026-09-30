import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Sliders, DollarSign } from 'lucide-react';
import { Service } from '../../types';

interface ServicesTabProps {
  services: Service[];
  onSaveServices: (services: Service[]) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ services, onSaveServices }) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleStartCreate = () => {
    const newServ: Service = {
      id: `serv-${Date.now()}`,
      title: 'New Editorial Service',
      description: 'Comprehensive editorial and color grading pipeline.',
      category: 'Editorial',
      deliverables: ['4K ProRes Master', 'Social Cuts', 'Sound Mix'],
      pricing: '$1,500 / Day or $4,500 / Project',
      available: true,
      order: services.length + 1,
    };
    setEditingService(newServ);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    let updated: Service[];
    if (isCreating) {
      updated = [...services, editingService];
    } else {
      updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    }
    onSaveServices(updated);
    setEditingService(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this service?')) {
      onSaveServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            SERVICES &amp; EDITORIAL CAPABILITIES
          </h2>
          <p className="text-white/50">
            Define your service directory, standard deliverables, and rate cards.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white rounded font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD SERVICE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="font-heading font-bold text-base text-white">{s.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${s.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {s.available ? 'AVAILABLE' : 'BOOKED'}
                </span>
              </div>

              <p className="font-body text-xs text-white/70 mb-4">{s.description}</p>

              <div className="space-y-1 mb-4">
                <div className="text-white/40 text-[10px] uppercase">DELIVERABLES:</div>
                {s.deliverables.map((deliv, idx) => (
                  <div key={idx} className="text-white/80 text-[11px] flex items-center gap-1.5">
                    <span className="text-[#ff3b00]">✓</span>
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="text-white font-semibold">{s.pricing}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingService(s);
                    setIsCreating(false);
                  }}
                  className="p-1.5 bg-white/5 hover:bg-[#ff3b00] text-white rounded"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="w-full max-w-lg bg-[#121216] border border-white/15 rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-heading font-bold text-white text-base">
                {isCreating ? 'CREATE SERVICE' : 'EDIT SERVICE'}
              </span>
              <button onClick={() => setEditingService(null)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <div>
                <label className="block text-white/70 uppercase mb-1">SERVICE TITLE</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">DELIVERABLES (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={editingService.deliverables.join(', ')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split(',').map((d) => d.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase mb-1">RATE / PRICING</label>
                <input
                  type="text"
                  value={editingService.pricing}
                  onChange={(e) => setEditingService({ ...editingService, pricing: e.target.value })}
                  className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={editingService.available}
                  onChange={(e) => setEditingService({ ...editingService, available: e.target.checked })}
                  className="accent-[#ff3b00]"
                />
                <span className="text-white">Currently Open for Booking</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-3 py-1.5 bg-white/5 rounded text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
