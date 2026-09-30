import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Trash2,
  Printer,
  Send,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Invoice, InvoiceLineItem, SupportedCurrency, PaymentStatus } from '../../types';
import { GlassButton } from '../common/GlassButton';
import { InvoiceService } from '../../services/invoiceService';
import { formatCurrency } from '../../services/i18n';

export const AdminInvoices: React.FC = () => {
  const { invoices, saveInvoice, deleteInvoice, currency, showToast } = usePortfolio();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // New Invoice Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [notes, setNotes] = useState('Payment due within 14 days. 50% deposit required before final delivery.');
  const [items, setItems] = useState<InvoiceLineItem[]>([
    { id: 'item-1', description: 'Commercial Video Post-Production & Edit', quantity: 1, unitPrice: 3500, amount: 3500 },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: `item-${Date.now()}`, description: 'Color Grading & Sound Design Pass', quantity: 1, unitPrice: 800, amount: 800 },
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceLineItem, val: any) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.amount = (Number(updated.quantity) || 0) * (Number(updated.unitPrice) || 0);
        }
        return updated;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const totals = InvoiceService.calculateTotals(items, taxRate, depositAmount);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      showToast('Client Name and Email are required.');
      return;
    }

    const newInvoice: Invoice = {
      id: editingInvoice?.id || `inv-${Date.now()}`,
      portfolioId: 'tenant-default',
      invoiceNumber: editingInvoice?.invoiceNumber || `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      clientName,
      clientEmail,
      clientCompany,
      items,
      subtotal: totals.subtotal,
      taxRate,
      taxAmount: totals.taxAmount,
      depositAmount,
      total: totals.total,
      balanceDue: totals.balanceDue,
      currency: currency || 'USD',
      status: editingInvoice?.status || 'sent',
      dueDate,
      notes,
      paymentProvider: 'stripe',
      createdAt: editingInvoice?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveInvoice(newInvoice);
    setIsCreating(false);
    setEditingInvoice(null);
    resetForm();
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setClientCompany('');
    setItems([{ id: 'item-1', description: 'Commercial Video Post-Production & Edit', quantity: 1, unitPrice: 3500, amount: 3500 }]);
    setTaxRate(0);
    setDepositAmount(0);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus === 'all') return true;
    return inv.status === filterStatus;
  });

  const totalBilled = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalReceived = invoices.reduce((sum, inv) => sum + ((inv.total || 0) - (inv.balanceDue || 0)), 0);
  const totalPending = invoices.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

  return (
    <section className="space-y-8 animate-fade-in" id="admin-invoices-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-accent" />
            Invoices & Commercial Billing
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create professional commercial post-production invoices, track balances, and generate Stripe checkout links.
          </p>
        </div>
        <GlassButton
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingInvoice(null);
            setIsCreating(!isCreating);
          }}
          className="gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          {isCreating ? 'Cancel Invoice' : 'Create New Invoice'}
        </GlassButton>
      </header>

      {/* Metrics Row */}
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
        <li>
          <article className="glass-panel p-5 rounded-xl border border-border/50 h-full">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Total Invoiced</span>
            <div className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalBilled, currency)}</div>
            <span className="text-xs text-muted-foreground">{invoices.length} total issued</span>
          </article>
        </li>
        <li>
          <article className="glass-panel p-5 rounded-xl border border-border/50 h-full">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono">Collected Revenue</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(totalReceived, currency)}</div>
            <span className="text-xs text-muted-foreground">Paid deposits & balances</span>
          </article>
        </li>
        <li>
          <article className="glass-panel p-5 rounded-xl border border-border/50 h-full">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Outstanding Balance</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{formatCurrency(totalPending, currency)}</div>
            <span className="text-xs text-muted-foreground">Awaiting client payment</span>
          </article>
        </li>
      </ul>

      {/* Invoice Creation Modal / Form */}
      {isCreating && (
        <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl border border-accent/30 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              {editingInvoice ? 'Edit Commercial Invoice' : 'New Commercial Invoice'}
            </h3>
            <span className="text-xs font-mono bg-accent/10 text-accent px-3 py-1 rounded-full">
              Currency: {currency}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Client Full Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                required
                className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Client Email *</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="alex@company.com"
                required
                className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Client Company / Brand</label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="Red Bull Media House"
                className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Deliverable Line Items</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-accent hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Line Item
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 bg-background/30 p-3 rounded-lg border border-border/40">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="Description of editing, color pass, sound design..."
                      className="w-full bg-transparent border-0 text-sm text-foreground focus:outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      className="w-full bg-background/50 border border-border/50 rounded px-2 py-1 text-center text-sm"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                      placeholder="Rate"
                      className="w-full bg-background/50 border border-border/50 rounded px-2 py-1 text-right text-sm"
                    />
                  </div>
                  <div className="w-28 text-right font-mono text-sm font-semibold text-foreground">
                    {formatCurrency(item.amount, currency)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 text-muted-foreground hover:text-red-400"
                    disabled={items.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Payment Terms & Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-background/50 border border-border/60 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2 bg-background/40 p-4 rounded-xl border border-border/50 font-mono text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span>{formatCurrency(totals.subtotal, currency)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="flex items-center gap-1">Tax Rate (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-20 bg-background border border-border/50 rounded px-2 py-0.5 text-right text-xs"
                />
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Deposit Required:</span>
                <input
                  type="number"
                  min="0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-28 bg-background border border-border/50 rounded px-2 py-0.5 text-right text-xs"
                />
              </div>
              <div className="flex justify-between font-bold text-foreground border-t border-border/40 pt-2 text-base">
                <span>Total Amount:</span>
                <span>{formatCurrency(totals.total, currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-amber-400">
                <span>Balance Due:</span>
                <span>{formatCurrency(totals.balanceDue, currency)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <GlassButton variant="outline" type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" type="submit">
              Save & Issue Invoice
            </GlassButton>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <nav aria-label="Invoice status filters" className="flex items-center gap-2 overflow-x-auto pb-2">
        <ul className="flex items-center gap-2 list-none p-0 m-0">
          {['all', 'sent', 'partially_paid', 'paid', 'overdue'].map((st) => (
            <li key={st}>
              <button
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  filterStatus === st
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
              >
                {st.toUpperCase().replace('_', ' ')}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-border/40">
            <CreditCard className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground">No invoices found</h3>
            <p className="text-sm text-muted-foreground mt-1">Create your first client invoice to start collecting payments.</p>
          </div>
        ) : (
          <ul className="space-y-3 list-none p-0 m-0">
            {filteredInvoices.map((inv) => (
              <li key={inv.id}>
                <article
                  className="glass-panel p-5 rounded-xl border border-border/50 hover:border-accent/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-foreground">{inv.invoiceNumber}</span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          inv.status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : inv.status === 'partially_paid'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {inv.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {inv.clientName} {inv.clientCompany && <span className="text-muted-foreground font-normal">({inv.clientCompany})</span>}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-3">
                      <span>Due: <time dateTime={inv.dueDate}>{inv.dueDate}</time></span>
                      <span>•</span>
                      <span>Items: {inv.items.length}</span>
                    </div>
                  </div>

                  <footer className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-foreground">{formatCurrency(inv.total, inv.currency)}</div>
                      {inv.balanceDue > 0 ? (
                        <div className="text-xs font-mono text-amber-400">Bal: {formatCurrency(inv.balanceDue, inv.currency)}</div>
                      ) : (
                        <div className="text-xs font-mono text-emerald-400">Paid in Full</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => InvoiceService.printInvoice(inv)}
                        className="p-2 rounded-lg bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground border border-border/40 transition-colors cursor-pointer"
                        title="Print / Export PDF"
                        aria-label="Print or export invoice as PDF"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const link = `https://checkout.stripe.com/pay/cs_test_${inv.id}`;
                          navigator.clipboard.writeText(link);
                          showToast('Payment link copied to clipboard!');
                        }}
                        className="p-2 rounded-lg bg-card/60 hover:bg-card text-muted-foreground hover:text-accent border border-border/40 transition-colors cursor-pointer"
                        title="Copy Payment Link"
                        aria-label="Copy Stripe payment link"
                      >
                        <Send className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Delete this invoice?')) {
                            deleteInvoice(inv.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-card/60 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 border border-border/40 transition-colors cursor-pointer"
                        title="Delete Invoice"
                        aria-label="Delete this invoice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
