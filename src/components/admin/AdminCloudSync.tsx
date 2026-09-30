import React, { useState } from 'react';
import {
  Cloud,
  Download,
  Upload,
  RefreshCw,
  History,
  Shield,
  CheckCircle2,
  Database,
  Layers,
  FileJson,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';

export const AdminCloudSync: React.FC = () => {
  const {
    syncToCloud,
    exportBackup,
    auditLogs,
    projects,
    mediaItems,
    invoices,
    showToast,
  } = usePortfolio();

  const [isSyncing, setIsSyncing] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    await syncToCloud();
    setIsSyncing(false);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(importJson);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        localStorage.setItem('cinefolio_projects', JSON.stringify(parsed.projects));
      }
      if (parsed.invoices && Array.isArray(parsed.invoices)) {
        localStorage.setItem('cinefolio_invoices', JSON.stringify(parsed.invoices));
      }
      showToast('Import successful! Reloading data from package...');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      showToast('Invalid JSON file or schema mismatch.');
    }
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-cloud-sync-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Cloud className="w-6 h-6 text-accent" />
            Cloud Database & Data Portability
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Persist your portfolio to the cloud, export zero-lockin JSON backups, and review system audit logs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GlassButton
            variant="outline"
            onClick={exportBackup}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export Backup JSON
          </GlassButton>

          <GlassButton
            variant="primary"
            onClick={handleSync}
            disabled={isSyncing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Local to Cloud DB
          </GlassButton>
        </div>
      </header>

      {/* Cloud Status Cards */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
        <li>
          <article className="glass-panel p-5 rounded-2xl border border-border/50 space-y-2 h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase">Cloud Sync Status</span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground">Multi-Tenant Cloud</div>
            <p className="text-xs text-muted-foreground">Server-side Express + File Database storage active</p>
          </article>
        </li>

        <li>
          <article className="glass-panel p-5 rounded-2xl border border-border/50 space-y-2 h-full">
            <span className="text-xs font-mono text-muted-foreground uppercase">Synced Entities</span>
            <div className="text-2xl font-bold text-foreground">
              {projects.length + mediaItems.length + invoices.length} Records
            </div>
            <p className="text-xs text-muted-foreground">
              {projects.length} Projects • {mediaItems.length} Media • {invoices.length} Invoices
            </p>
          </article>
        </li>

        <li>
          <article className="glass-panel p-5 rounded-2xl border border-border/50 space-y-2 h-full">
            <span className="text-xs font-mono text-muted-foreground uppercase">Portability Standard</span>
            <div className="text-2xl font-bold text-foreground">Open Schema 2.5</div>
            <p className="text-xs text-muted-foreground">Portable JSON compatible with any server or CMS</p>
          </article>
        </li>
      </ul>

      {/* JSON Import & Restore */}
      <section className="glass-panel p-6 rounded-2xl border border-border/50 space-y-4">
        <header className="flex items-center justify-between border-b border-border/40 pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <FileJson className="w-4 h-4 text-accent" />
            Restore / Import Portfolio JSON Backup
          </h2>
          <button
            type="button"
            onClick={() => setIsImporting(!isImporting)}
            className="text-xs text-accent hover:underline cursor-pointer"
          >
            {isImporting ? 'Hide Panel' : 'Open Import Box'}
          </button>
        </header>

        {isImporting && (
          <form onSubmit={handleImport} className="space-y-3 animate-fade-in">
            <textarea
              rows={4}
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste previously exported Cinefolio JSON backup text here..."
              aria-label="Paste Cinefolio JSON backup"
              className="w-full bg-background/50 border border-border/60 rounded-xl p-3 text-xs font-mono text-foreground focus:outline-none focus:border-accent"
            />
            <footer className="flex justify-end gap-2">
              <GlassButton variant="primary" type="submit" className="text-xs">
                Validate & Restore Records
              </GlassButton>
            </footer>
          </form>
        )}
      </section>

      {/* Audit Logs */}
      <section className="glass-panel p-6 rounded-2xl border border-border/50 space-y-4">
        <header className="border-b border-border/40 pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            Server Audit Logs & Activity History
          </h2>
        </header>

        <div className="max-h-72 overflow-y-auto">
          {auditLogs.length === 0 ? (
            <div className="text-xs text-muted-foreground text-center py-6">No audit records recorded yet.</div>
          ) : (
            <ul className="space-y-2 list-none p-0 m-0">
              {auditLogs.map((log) => (
                <li key={log.id}>
                  <article className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/40 text-xs font-mono">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{log.action}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-card text-muted-foreground border border-border/40">
                          {log.entityType}
                        </span>
                      </div>
                      <p className="text-muted-foreground m-0">{log.details}</p>
                    </div>
                    <time dateTime={new Date(log.timestamp).toISOString()} className="text-right text-muted-foreground text-[10px]">
                      <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                      <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </time>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </section>
  );
};
