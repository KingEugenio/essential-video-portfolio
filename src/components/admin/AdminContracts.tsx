import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Shield,
  FileSignature,
  Download,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Contract, ContractStatus } from '../../types';
import { GlassButton } from '../common/GlassButton';
import { formatCurrency } from '../../services/i18n';

export const AdminContracts: React.FC = () => {
  const { contracts, saveContract, deleteContract, currency, showToast } = usePortfolio();
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('Commercial Video Post-Production Agreement');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState(
    'Full editorial assembly, fine cut, audio cleanup, DaVinci Resolve color grade, and broadcast master export.'
  );
  const [deliverablesSummary, setDeliverablesSummary] = useState(
    '1x 4K Master (ProRes 422HQ), 1x 1080p Web Master, 3x 9:16 Social Cutdowns.'
  );
  const [totalFee, setTotalFee] = useState(4500);
  const [revisionsAllowed, setRevisionsAllowed] = useState(3);
  const [killFeePercentage, setKillFeePercentage] = useState(35);
  const [terms, setTerms] = useState(
    'Editor retains right to display non-confidential project cuts in professional portfolio following official public launch. Turnaround milestones subject to timely client feedback.'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Client name and email are required.');
      return;
    }

    const newContract: Contract = {
      id: `ctr-${Date.now()}`,
      portfolioId: 'tenant-default',
      title,
      clientName,
      clientEmail,
      clientCompany,
      scopeOfWork,
      deliverablesSummary,
      totalFee: Number(totalFee),
      currency: currency || 'USD',
      paymentTerms: '50% deposit on ingest, 50% upon final master export.',
      killFeePercentage: Number(killFeePercentage),
      revisionsAllowed: Number(revisionsAllowed),
      termsAndConditions: terms,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveContract(newContract);
    setIsCreating(false);
    showToast('Contract agreement draft created.');
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-contracts-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-accent" />
            Client Contracts & Agreements
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate legally structured post-production contracts, revision limits, kill fees, and signature tracking.
          </p>
        </div>
        <GlassButton
          variant="primary"
          onClick={() => setIsCreating(!isCreating)}
          className="gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isCreating ? 'Cancel' : 'New Contract'}
        </GlassButton>
      </header>

      {isCreating && (
        <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl border border-accent/30 space-y-6 animate-fade-in">
          <fieldset className="space-y-6 border-0 p-0 m-0">
            <legend className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-4 w-full">
              <FileSignature className="w-5 h-5 text-accent" />
              Create Service Agreement
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ctr-title" className="block text-xs font-mono text-muted-foreground mb-1">Contract Title</label>
                <input
                  id="ctr-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="ctr-client" className="block text-xs font-mono text-muted-foreground mb-1">Client Full Name *</label>
                <input
                  id="ctr-client"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  placeholder="Alex Morgan"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="ctr-email" className="block text-xs font-mono text-muted-foreground mb-1">Client Email *</label>
                <input
                  id="ctr-email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  placeholder="alex@company.com"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ctr-fee" className="block text-xs font-mono text-muted-foreground mb-1">Total Project Fee ({currency})</label>
                <input
                  id="ctr-fee"
                  type="number"
                  value={totalFee}
                  onChange={(e) => setTotalFee(Number(e.target.value))}
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="ctr-revs" className="block text-xs font-mono text-muted-foreground mb-1">Revision Rounds Included</label>
                <input
                  id="ctr-revs"
                  type="number"
                  value={revisionsAllowed}
                  onChange={(e) => setRevisionsAllowed(Number(e.target.value))}
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="ctr-kill" className="block text-xs font-mono text-muted-foreground mb-1">Kill Fee Clause (%)</label>
                <input
                  id="ctr-kill"
                  type="number"
                  value={killFeePercentage}
                  onChange={(e) => setKillFeePercentage(Number(e.target.value))}
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ctr-scope" className="block text-xs font-mono text-muted-foreground mb-1">Scope of Editorial Work</label>
              <textarea
                id="ctr-scope"
                rows={2}
                value={scopeOfWork}
                onChange={(e) => setScopeOfWork(e.target.value)}
                className="w-full bg-background/50 border border-border/60 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="ctr-deliv" className="block text-xs font-mono text-muted-foreground mb-1">Deliverables Specification</label>
              <textarea
                id="ctr-deliv"
                rows={2}
                value={deliverablesSummary}
                onChange={(e) => setDeliverablesSummary(e.target.value)}
                className="w-full bg-background/50 border border-border/60 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="ctr-terms" className="block text-xs font-mono text-muted-foreground mb-1">Terms, Confidentiality & Portfolio Rights</label>
              <textarea
                id="ctr-terms"
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full bg-background/50 border border-border/60 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
          </fieldset>

          <footer className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <GlassButton variant="outline" type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" type="submit">
              Save Agreement
            </GlassButton>
          </footer>
        </form>
      )}

      {/* Contracts List */}
      <div className="space-y-3">
        {contracts.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-border/40">
            <Shield className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground">No contracts created yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Protect your creative work and set clear milestones with contracts.</p>
          </div>
        ) : (
          <ul className="space-y-3 list-none p-0 m-0">
            {contracts.map((ctr) => (
              <li key={ctr.id}>
                <article
                  className="glass-panel p-5 rounded-xl border border-border/50 hover:border-accent/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <header className="flex items-center gap-3">
                      <h2 className="font-bold text-foreground text-sm m-0">{ctr.title}</h2>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          ctr.status === 'signed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {ctr.status}
                      </span>
                    </header>
                    <address className="text-xs text-muted-foreground not-italic">
                      Client: <strong className="text-foreground">{ctr.clientName}</strong> ({ctr.clientEmail})
                    </address>
                    <p className="text-xs text-muted-foreground line-clamp-1 m-0">
                      Deliverables: {ctr.deliverablesSummary}
                    </p>
                  </div>

                  <footer className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right font-mono">
                      <div className="text-base font-bold text-foreground">{formatCurrency(ctr.totalFee, ctr.currency)}</div>
                      <div className="text-xs text-muted-foreground">{ctr.revisionsAllowed} Revisions • {ctr.killFeePercentage}% Kill Fee</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete this contract?')) {
                          deleteContract(ctr.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-card/60 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 border border-border/40 transition-colors cursor-pointer"
                      aria-label={`Delete contract ${ctr.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
