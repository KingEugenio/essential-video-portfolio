import React, { useState } from 'react';
import {
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Code,
  Copy,
  ExternalLink,
  Layers,
  Database,
  Key,
  Sliders,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WordPressConfig } from '../../types';
import { GlassButton } from '../common/GlassButton';

export const AdminWordPress: React.FC = () => {
  const { wordPressConfig, saveWordPressConfig, syncWordPressProjects, showToast } = usePortfolio();

  const [config, setConfig] = useState<WordPressConfig>(wordPressConfig);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const handleChange = <K extends keyof WordPressConfig>(key: K, value: WordPressConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveWordPressConfig(config);
  };

  const handleTriggerSync = async () => {
    saveWordPressConfig(config);
    setIsSyncing(true);
    const res = await syncWordPressProjects();
    setIsSyncing(false);
  };

  const wpSnippet = `// In functions.php of your WordPress theme or custom plugin:
add_action('init', function() {
    register_post_type('portfolio_project', [
        'labels' => [
            'name' => 'Portfolio Projects',
            'singular_name' => 'Portfolio Project',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true, // CRITICAL for REST API access
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
    ]);
});

// Expose ACF or custom meta to WP REST API:
add_action('rest_api_init', function() {
    register_rest_field('portfolio_project', 'video_url', [
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'video_url', true);
        }
    ]);
    register_rest_field('portfolio_project', 'client', [
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'client', true);
        }
    ]);
});`;

  const copyCode = () => {
    navigator.clipboard.writeText(wpSnippet);
    setCopiedSnippet(true);
    showToast('WordPress CPT Code snippet copied to clipboard!');
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-[var(--brand-primary)]" />
            <span>WordPress Headless CMS Integration</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Optionally use WordPress as a headless content management system to publish and update portfolio projects via the WP REST API.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={isSyncing || !config.enabled}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync From WordPress Now'}</span>
          </button>

          <GlassButton variant="primary" size="md" onClick={handleSave}>
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Config</span>
          </GlassButton>
        </div>
      </div>

      {/* Main Toggle Card */}
      <div className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/20 border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--brand-text)]">Enable WordPress Headless Mode</h3>
              <p className="text-xs text-[var(--brand-text-secondary)]">
                When enabled, your portfolio will fetch and synchronize posts from your WordPress REST API.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={e => handleChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-primary)]" />
          </label>
        </div>

        {/* Sync Status Banner */}
        {config.lastSyncedAt && (
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Last synchronized: {new Date(config.lastSyncedAt).toLocaleString()}</span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              Status: {config.syncStatus}
            </span>
          </div>
        )}

        {config.errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{config.errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              WordPress REST API Endpoint URL
            </label>
            <input
              type="url"
              value={config.endpointUrl}
              onChange={e => handleChange('endpointUrl', e.target.value)}
              placeholder="https://your-wordpress-site.com/wp-json/wp/v2/portfolio_project"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none font-mono"
            />
            <p className="text-[11px] text-[var(--brand-text-secondary)] mt-1">
              Example: <code className="font-mono text-neutral-300">https://mysite.com/wp-json/wp/v2/portfolio_project</code> or <code className="font-mono text-neutral-300">https://mysite.com/wp-json/wp/v2/posts</code>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Custom Post Type Slug
            </label>
            <input
              type="text"
              value={config.customPostType || 'portfolio_project'}
              onChange={e => handleChange('customPostType', e.target.value)}
              placeholder="portfolio_project"
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] mb-1">
              Application Password / Bearer Token (Optional for Private Posts)
            </label>
            <input
              type="password"
              value={config.apiKey || ''}
              onChange={e => handleChange('apiKey', e.target.value)}
              placeholder="WP Application Password"
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Field Mapping Guide */}
      <div className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-4">
        <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>WordPress to CineFolio Field Mapping</span>
        </h3>
        <p className="text-xs text-[var(--brand-text-secondary)]">
          CineFolio automatically maps the standard WordPress post structure and Advanced Custom Fields (ACF) to the portfolio:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">title.rendered</span>
            <p className="text-neutral-400">Mapped to Project Title</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">content.rendered</span>
            <p className="text-neutral-400">Mapped to Project Story & Overview</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">_embedded['wp:featuredmedia']</span>
            <p className="text-neutral-400">Mapped to Project Thumbnail</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">acf.video_url</span>
            <p className="text-neutral-400">Mapped to Main Video Source (Drive / YouTube / MP4)</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">acf.client / acf.year</span>
            <p className="text-neutral-400">Mapped to Client Name & Release Year</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-mono text-[var(--brand-primary)] font-bold">acf.role / acf.software</span>
            <p className="text-neutral-400">Mapped to Credits & Tool Tags</p>
          </div>
        </div>
      </div>

      {/* WordPress Code Snippet Generator */}
      <div className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-[var(--brand-primary)]" />
            <h3 className="text-base font-bold text-[var(--brand-text)]">WordPress Custom Post Type Helper Snippet</h3>
          </div>

          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? 'Copied!' : 'Copy PHP Snippet'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-neutral-300 font-mono text-xs overflow-x-auto leading-relaxed">
          {wpSnippet}
        </pre>
      </div>
    </div>
  );
};
