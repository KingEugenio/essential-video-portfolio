import React, { useState } from 'react';
import { Plus, Trash2, Globe, Save, Check } from 'lucide-react';
import { SocialLink } from '../../types';

interface SocialLinksTabProps {
  socialLinks: SocialLink[];
  onSaveSocialLinks: (links: SocialLink[]) => void;
}

export const SocialLinksTab: React.FC<SocialLinksTabProps> = ({
  socialLinks,
  onSaveSocialLinks,
}) => {
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [saved, setSaved] = useState<boolean>(false);

  const handleAdd = () => {
    const newL: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: 'instagram',
      url: 'https://instagram.com/',
      label: 'Instagram',
      enabled: true,
    };
    setLinks([...links, newL]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSocialLinks(links);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            SOCIAL CHANNELS &amp; CONTACT CHANNELS
          </h2>
          <p className="text-white/50">
            Configure your Instagram, YouTube, Vimeo, TikTok, LinkedIn, or WhatsApp links.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Channel</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-3">
        {links.map((link, idx) => (
          <div key={link.id || idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-[#1c1c22] p-2.5 rounded border border-white/5">
            <div className="sm:col-span-3">
              <select
                value={link.platform}
                onChange={(e) => {
                  const updated = [...links];
                  updated[idx].platform = e.target.value as any;
                  setLinks(updated);
                }}
                className="w-full bg-[#121216] border border-white/10 rounded p-1.5 text-white"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="x">X / Twitter</option>
                <option value="behance">Behance</option>
                <option value="website">Custom Web</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <input
                type="text"
                placeholder="Button Label"
                value={link.label}
                onChange={(e) => {
                  const updated = [...links];
                  updated[idx].label = e.target.value;
                  setLinks(updated);
                }}
                className="w-full bg-[#121216] border border-white/10 rounded p-1.5 text-white"
              />
            </div>

            <div className="sm:col-span-5">
              <input
                type="text"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => {
                  const updated = [...links];
                  updated[idx].url = e.target.value;
                  setLinks(updated);
                }}
                className="w-full bg-[#121216] border border-white/10 rounded p-1.5 text-white"
              />
            </div>

            <div className="sm:col-span-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                className="p-1.5 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded flex items-center gap-1.5"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'SAVED!' : 'SAVE SOCIAL CHANNELS'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
