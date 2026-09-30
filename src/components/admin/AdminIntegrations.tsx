import React from 'react';
import {
  Boxes,
  CheckCircle2,
  XCircle,
  HardDrive,
  CreditCard,
  Sparkles,
  Mail,
  Globe,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';

export const AdminIntegrations: React.FC = () => {
  const { integrations, toggleIntegration, showToast } = usePortfolio();

  const getIcon = (id: string) => {
    switch (id) {
      case 'googledrive':
        return <HardDrive className="w-6 h-6 text-blue-400" />;
      case 'stripe':
        return <CreditCard className="w-6 h-6 text-purple-400" />;
      case 'gemini':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'resend':
        return <Mail className="w-6 h-6 text-emerald-400" />;
      case 'wordpress':
        return <Globe className="w-6 h-6 text-cyan-400" />;
      default:
        return <Boxes className="w-6 h-6 text-accent" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Boxes className="w-6 h-6 text-accent" />
            Integrations & Cloud Ecosystem
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connect your portfolio to cloud footage storage, payment processors, transactional email, and generative AI.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          Server-Side Secrets Enforced
        </div>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 rounded-2xl border border-border/50 hover:border-border transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-card border border-border/60">{getIcon(item.id)}</div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">{item.name}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-background/50 border border-border/40">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.isConnected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground bg-card/60 px-2 py-1 rounded-full border border-border/40">
                      <XCircle className="w-3.5 h-3.5" />
                      Disconnected
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{item.description}</p>

              {item.accountEmail && (
                <div className="mt-3 text-xs font-mono text-foreground bg-background/40 p-2 rounded border border-border/40">
                  Account: {item.accountEmail}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs">
              <span className="text-muted-foreground font-mono">
                {item.lastSyncAt ? `Last active: ${new Date(item.lastSyncAt).toLocaleTimeString()}` : 'Never synced'}
              </span>

              <GlassButton
                variant={item.isConnected ? 'outline' : 'primary'}
                onClick={() => {
                  toggleIntegration(item.id, !item.isConnected, item.accountEmail || 'creator@cinefolio.io');
                  showToast(item.isConnected ? `Disconnected ${item.name}` : `Connected ${item.name}`);
                }}
                className="text-xs py-1.5 px-3"
              >
                {item.isConnected ? 'Disconnect' : 'Connect Integration'}
              </GlassButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
