import React, { useState } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, ExternalLink, Globe, HardDrive, Key, Save } from 'lucide-react';
import { WordPressConfig } from '../../types';

interface WordPressSyncTabProps {
  config: WordPressConfig;
  onSaveConfig: (config: WordPressConfig) => void;
}

export const WordPressSyncTab: React.FC<WordPressSyncTabProps> = ({
  config,
  onSaveConfig,
}) => {
  const [form, setForm] = useState<WordPressConfig>({ ...config });
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    setSyncResult('Settings saved successfully.');
    setTimeout(() => setSyncResult(''), 3000);
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncResult('');
    try {
      const token = localStorage.getItem('ekopixels_admin_token') || 'dev-admin-master-token';
      const res = await fetch('/api/admin/wordpress/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restApiUrl: form.apiUrl,
          customPostType: form.customPostType || 'projects',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncResult(data.message || `Synced ${data.syncedCount || 0} projects from WordPress!`);
        setForm((prev) => ({
          ...prev,
          lastSyncTime: data.lastSyncedAt || new Date().toISOString(),
          autoSyncStatus: 'synced',
        }));
      } else {
        setSyncResult(data.error || 'Failed to sync with WordPress.');
      }
    } catch (err: any) {
      setSyncResult('Sync failed. Please check network connection and WordPress URL.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs max-w-4xl">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-white">
          HEADLESS WORDPRESS REST API CONNECTOR
        </h2>
        <p className="text-white/50">
          Sync portfolio projects, case studies, and media directly from any existing WordPress website or Custom Post Type.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-white uppercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#00e5ff]" />
              <span>WORDPRESS SITE CONNECTION</span>
            </span>

            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="accent-[#00e5ff]"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">WORDPRESS REST API URL</label>
            <input
              type="text"
              placeholder="https://my-wordpress-site.com/wp-json"
              value={form.apiUrl}
              onChange={(e) => setForm({ ...form, apiUrl: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">CUSTOM POST TYPE SLUG</label>
            <input
              type="text"
              placeholder="e.g. portfolio, projects, video"
              value={form.customPostType}
              onChange={(e) => setForm({ ...form, customPostType: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">APPLICATION PASSWORD / AUTH TOKEN (OPTIONAL)</label>
            <input
              type="password"
              placeholder="xxxx xxxx xxxx xxxx"
              value={form.apiKey || ''}
              onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
          </div>

          {/* Sync Status Info */}
          <div className="p-3 bg-[#1c1c22] rounded border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-white/40 block text-[10px]">LAST SYNC:</span>
              <span className="text-white font-semibold">{form.lastSyncTime || 'Never'}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
              {form.autoSyncStatus}
            </span>
          </div>

          {syncResult && (
            <div className="p-2.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff]">
              {syncResult}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleSyncNow}
              disabled={syncing || !form.enabled}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-bold flex items-center gap-1.5 disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'SYNCING...' : 'SYNC FROM WORDPRESS NOW'}</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE CONFIG</span>
            </button>
          </div>
        </form>

        {/* Right Guide */}
        <div className="lg:col-span-5 bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-4 text-white/70">
          <div className="font-bold text-white uppercase text-sm pb-2 border-b border-white/10">
            HOW TO CONNECT WORDPRESS
          </div>

          <div className="space-y-3 font-body text-xs leading-relaxed">
            <p>
              <strong className="text-white font-mono">1. REST API Endpoint:</strong> Ensure your WordPress installation has the standard REST API enabled at <code className="text-[#00e5ff]">/wp-json/wp/v2/</code>.
            </p>
            <p>
              <strong className="text-white font-mono">2. Custom Post Type:</strong> If you use ACF or CPT UI to create a "portfolio" or "project" post type, make sure <code className="text-[#00e5ff]">show_in_rest = true</code> is checked.
            </p>
            <p>
              <strong className="text-white font-mono">3. Custom Fields (ACF):</strong> Video URLs, aspect ratios, and before/after images stored in ACF fields will be automatically mapped to your portfolio showcase.
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded border border-white/10 font-mono text-[11px] text-white/50">
            💡 <strong className="text-white">Dual-Mode:</strong> You can manage projects directly in the built-in CMS or pull them from WordPress dynamically.
          </div>
        </div>
      </div>
    </div>
  );
};
