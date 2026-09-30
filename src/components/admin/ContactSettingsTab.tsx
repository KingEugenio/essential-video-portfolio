import React, { useState } from 'react';
import { Save, Check, MessageSquare, Mail, Phone, Sliders } from 'lucide-react';
import { ContactFormConfig } from '../../types';

interface ContactSettingsTabProps {
  config: ContactFormConfig;
  onSaveConfig: (config: ContactFormConfig) => void;
}

export const ContactSettingsTab: React.FC<ContactSettingsTabProps> = ({
  config,
  onSaveConfig,
}) => {
  const [form, setForm] = useState<ContactFormConfig>({ ...config });
  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 font-mono text-xs max-w-3xl">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-white">
          BOOKING FORM &amp; FORMSPREE CONFIGURATION
        </h2>
        <p className="text-white/50">
          Configure transmission endpoints, Formspree email forwarding, WhatsApp numbers, and active fields.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Endpoints & Provider */}
        <div className="bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-4">
          <div className="font-bold text-white uppercase pb-2 border-b border-white/10">
            TRANSMISSION RECIPIENT &amp; FORMSPREE
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">RECIPIENT EMAIL ADDRESS</label>
            <input
              type="email"
              value={form.recipientEmail}
              onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">FORMSPREE ENDPOINT URL (OPTIONAL)</label>
            <input
              type="text"
              placeholder="https://formspree.io/f/xyz..."
              value={form.formspreeEndpoint || ''}
              onChange={(e) => setForm({ ...form, formspreeEndpoint: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
            <div className="text-[10px] text-white/40 mt-1">
              If left blank, messages are securely logged to the built-in Transmissions Inbox database.
            </div>
          </div>
        </div>

        {/* WhatsApp Fast Track */}
        <div className="bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-emerald-400 uppercase flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>WHATSAPP FAST-TRACK DIRECT LINK</span>
            </span>
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={form.showWhatsapp}
                onChange={(e) => setForm({ ...form, showWhatsapp: e.target.checked })}
                className="accent-emerald-500"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div>
            <label className="block text-white/70 uppercase mb-1">WHATSAPP PHONE NUMBER (WITH COUNTRY CODE)</label>
            <input
              type="text"
              placeholder="+447911123456"
              value={form.whatsappNumber || ''}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
            />
          </div>
        </div>

        {/* Field Toggles */}
        <div className="bg-[#141418] border border-white/10 p-5 rounded-lg flex flex-col gap-4">
          <div className="font-bold text-white uppercase pb-2 border-b border-white/10">
            ACTIVE FORM FIELDS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(form.fields || {}).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2 text-white/80 p-2 rounded bg-[#1c1c22] border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fields: {
                        ...form.fields,
                        [key]: e.target.checked,
                      },
                    })
                  }
                  className="accent-[#ff3b00]"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'SETTINGS SAVED!' : 'SAVE BOOKING CONFIG'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
