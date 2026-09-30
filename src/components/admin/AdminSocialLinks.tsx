import React, { useState } from 'react';
import {
  Share2,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  Film,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Video,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton } from '../common/GlassButton';

interface SocialPlatformConfig {
  id: string;
  name: string;
  key: string;
  iconName: string;
  placeholder: string;
  prefix: string;
}

const PRESET_PLATFORMS: SocialPlatformConfig[] = [
  { id: 'ig', name: 'Instagram', key: 'instagram', iconName: 'Instagram', placeholder: 'https://instagram.com/yourhandle', prefix: 'instagram.com/' },
  { id: 'yt', name: 'YouTube Channel', key: 'youtube', iconName: 'Youtube', placeholder: 'https://youtube.com/@yourchannel', prefix: 'youtube.com/' },
  { id: 'vm', name: 'Vimeo Portfolio', key: 'vimeo', iconName: 'Film', placeholder: 'https://vimeo.com/yourhandle', prefix: 'vimeo.com/' },
  { id: 'li', name: 'LinkedIn Profile', key: 'linkedin', iconName: 'Linkedin', placeholder: 'https://linkedin.com/in/yourprofile', prefix: 'linkedin.com/in/' },
  { id: 'x', name: 'X / Twitter', key: 'x', iconName: 'Twitter', placeholder: 'https://x.com/yourhandle', prefix: 'x.com/' },
  { id: 'tk', name: 'TikTok', key: 'tiktok', iconName: 'Video', placeholder: 'https://tiktok.com/@yourhandle', prefix: 'tiktok.com/@' },
  { id: 'bh', name: 'Behance', key: 'behance', iconName: 'Globe', placeholder: 'https://behance.net/yourprofile', prefix: 'behance.net/' },
  { id: 'imdb', name: 'IMDb Pro', key: 'imdb', iconName: 'Film', placeholder: 'https://imdb.com/name/nm...', prefix: 'imdb.com/name/' },
];

export const AdminSocialLinks: React.FC = () => {
  const { brand, updateBrandSettings } = useTheme();
  const { showToast } = usePortfolio();

  const [socials, setSocials] = useState<Record<string, string>>({
    ...brand.socialLinks,
    ...brand.socials,
  });

  const [customLinks, setCustomLinks] = useState<{ id: string; label: string; url: string }[]>([]);

  const handleUrlChange = (key: string, value: string) => {
    setSocials(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearUrl = (key: string) => {
    setSocials(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleAddCustomLink = () => {
    setCustomLinks(prev => [
      ...prev,
      { id: `custom-${Date.now()}`, label: 'Custom Profile', url: '' },
    ]);
  };

  const handleSave = () => {
    updateBrandSettings({
      socialLinks: socials,
      socials: socials,
    });
    showToast('Social media links updated successfully!');
  };

  return (
    <section className="space-y-8 animate-fade-in" id="admin-social-links-root">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--brand-border)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--brand-text)] flex items-center gap-2.5">
            <Share2 className="w-6 h-6 text-[var(--brand-primary)]" />
            <span>Social Media & Public Profile Links</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)] mt-1">
            Connect your social channels, YouTube showreels, Vimeo portfolio, IMDb credits, and Instagram to your public header and footer.
          </p>
        </div>

        <GlassButton variant="primary" size="md" onClick={handleSave}>
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Social Links</span>
        </GlassButton>
      </header>

      {/* Preset Platforms Grid */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-6">
        <header>
          <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>Core Video & Social Platforms</span>
          </h3>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
          {PRESET_PLATFORMS.map(platform => {
            const currentUrl = socials[platform.key] || '';
            const isActive = Boolean(currentUrl.trim());

            return (
              <li
                key={platform.id}
                className={`p-4 rounded-xl border transition-all ${
                  isActive ? 'bg-black/40 border-white/15' : 'bg-black/20 border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[var(--brand-primary)]">
                      {platform.key === 'instagram' && <Instagram className="w-4 h-4" />}
                      {platform.key === 'youtube' && <Youtube className="w-4 h-4" />}
                      {platform.key === 'vimeo' && <Film className="w-4 h-4" />}
                      {platform.key === 'linkedin' && <Linkedin className="w-4 h-4" />}
                      {platform.key === 'x' && <Twitter className="w-4 h-4" />}
                      {platform.key === 'tiktok' && <Video className="w-4 h-4" />}
                      {platform.key === 'behance' && <Globe className="w-4 h-4" />}
                      {platform.key === 'imdb' && <Film className="w-4 h-4" />}
                    </div>
                    <label htmlFor={`soc-${platform.key}`} className="text-sm font-bold text-white cursor-pointer">
                      {platform.name}
                    </label>
                  </div>

                  {isActive && (
                    <a
                      href={currentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id={`soc-${platform.key}`}
                    type="url"
                    value={currentUrl}
                    onChange={e => handleUrlChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    aria-label={`${platform.name} URL`}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:border-[var(--brand-primary)] focus:outline-none"
                  />
                  {currentUrl && (
                    <button
                      type="button"
                      onClick={() => handleClearUrl(platform.key)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                      title="Clear"
                      aria-label={`Clear ${platform.name} URL`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Custom Profile Links */}
      <section className="glass-card p-6 rounded-2xl border border-[var(--brand-border)] space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--brand-text)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Additional Custom Channels & Portfolios</span>
            </h3>
            <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
              Add links to Frame.io, ArtStation, Spotify, or external client portals.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCustomLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Link</span>
          </button>
        </header>

        {customLinks.length === 0 ? (
          <p className="text-xs text-neutral-500 italic py-2">
            No custom links added yet. Click &quot;Add Custom Link&quot; to insert another platform.
          </p>
        ) : (
          <ul className="space-y-3 list-none p-0 m-0">
            {customLinks.map((link, idx) => (
              <li key={link.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                <input
                  type="text"
                  value={link.label}
                  onChange={e => {
                    const next = [...customLinks];
                    next[idx].label = e.target.value;
                    setCustomLinks(next);
                  }}
                  placeholder="Platform Label (e.g. Frame.io)"
                  aria-label="Platform Label"
                  className="w-1/3 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={e => {
                    const next = [...customLinks];
                    next[idx].url = e.target.value;
                    setCustomLinks(next);
                  }}
                  placeholder="https://..."
                  aria-label="Platform URL"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => setCustomLinks(prev => prev.filter(item => item.id !== link.id))}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={`Remove custom link ${link.label}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
