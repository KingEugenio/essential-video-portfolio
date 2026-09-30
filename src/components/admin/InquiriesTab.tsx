import React, { useState } from 'react';
import { 
  Send, Mail, Phone, Clock, CheckCircle2, 
  Trash2, MessageSquare, ExternalLink, Search, Filter 
} from 'lucide-react';
import { Inquiry } from '../../types';

interface InquiriesTabProps {
  inquiries: Inquiry[];
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({
  inquiries,
  onUpdateInquiries,
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(
    inquiries[0] || null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    onUpdateInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      const updated = inquiries.filter((i) => i.id !== id);
      onUpdateInquiries(updated);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(updated[0] || null);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            PROJECT TRANSMISSIONS &amp; INQUIRIES INBOX
          </h2>
          <p className="font-mono text-xs text-white/50">
            Incoming briefs with client budgets, timelines, footage links, and direct WhatsApp shortcuts.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search inquiries by name, email, project type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141418] border border-white/10 rounded-md pl-9 pr-3 py-2 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {['all', 'new', 'read', 'replied'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? 'bg-[#ff3b00] text-white font-bold'
                  : 'bg-[#141418] hover:bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Master Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Col: Inquiries List */}
        <div className="lg:col-span-5 bg-[#141418] border border-white/10 rounded-lg overflow-y-auto max-h-[650px] divide-y divide-white/5">
          {filteredInquiries.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-white/40">
              No inquiries found in this view.
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => {
                    setSelectedInquiry(inq);
                    if (inq.status === 'new') {
                      handleUpdateStatus(inq.id, 'read');
                    }
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1c1c24] border-l-4 border-[#ff3b00]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {inq.name}
                      {inq.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-[#ff3b00] animate-pulse" />
                      )}
                    </span>
                    <span className="text-[10px] text-white/40">{inq.createdAt.split('T')[0]}</span>
                  </div>

                  <div className="font-mono text-[11px] text-[#00e5ff] truncate">
                    {inq.projectType} • {inq.budget || 'Custom Scope'}
                  </div>

                  <p className="font-body text-xs text-white/60 line-clamp-1 mt-1">
                    {inq.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Inquiry Detail Viewer */}
        <div className="lg:col-span-7 bg-[#141418] border border-white/10 rounded-lg p-6 flex flex-col justify-between font-mono text-xs">
          {selectedInquiry ? (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="font-heading font-bold text-xl text-white">
                    {selectedInquiry.name}
                  </div>
                  <div className="text-white/50 text-[11px] mt-0.5">
                    {selectedInquiry.company ? `${selectedInquiry.company} • ` : ''}
                    {selectedInquiry.email}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value as any)}
                    className="bg-[#1c1c22] border border-white/15 rounded px-2.5 py-1 text-white text-xs uppercase"
                  >
                    <option value="new">Status: New</option>
                    <option value="read">Status: Read</option>
                    <option value="replied">Status: Replied</option>
                    <option value="archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4 bg-[#1c1c22] p-4 rounded-lg border border-white/5">
                <div>
                  <span className="text-white/40 text-[10px] block">PROJECT TYPE:</span>
                  <span className="text-white font-semibold">{selectedInquiry.projectType}</span>
                </div>

                <div>
                  <span className="text-white/40 text-[10px] block">ESTIMATED BUDGET:</span>
                  <span className="text-[#00e5ff] font-semibold">{selectedInquiry.budget || 'Not specified'}</span>
                </div>

                <div>
                  <span className="text-white/40 text-[10px] block">DEADLINE / TARGET:</span>
                  <span className="text-white">{selectedInquiry.deadline || 'Flexible timeline'}</span>
                </div>

                <div>
                  <span className="text-white/40 text-[10px] block">FOOTAGE STORAGE:</span>
                  <span className="text-white">{selectedInquiry.footageStorage || 'Google Drive'}</span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <div className="text-white/40 text-[10px] uppercase mb-1.5">CLIENT MESSAGE / BRIEF:</div>
                <div className="p-4 rounded-lg bg-[#101014] border border-white/10 text-white/90 font-body text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || 'No additional notes provided.'}
                </div>
              </div>

              {/* Action Buttons: Reply via Email or WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=RE:%20${encodeURIComponent(selectedInquiry.projectType)}%20Project%20Enquiry`}
                  className="px-4 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white rounded font-bold flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>REPLY VIA EMAIL</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP CLIENT</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="m-auto text-center text-white/40 py-20">
              Select an inquiry on the left to inspect its detailed specifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
