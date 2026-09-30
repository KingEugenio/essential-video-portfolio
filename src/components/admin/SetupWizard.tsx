import React, { useState } from 'react';
import { 
  Check, ArrowRight, ArrowLeft, Film, 
  Palette, Type, HardDrive, Phone, Globe, Save, HelpCircle 
} from 'lucide-react';
import { AdminData, BrandSettings } from '../../types';
import { RetroWindow } from '../effects/RetroWindow';

interface SetupWizardProps {
  data: AdminData;
  onComplete: (updatedData: AdminData) => void;
  onCancel: () => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({
  data,
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState<AdminData>({ ...data });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-2xl">
        <RetroWindow
          title={`PORTFOLIO_SETUP_WIZARD.EXE // STEP ${currentStep} OF ${totalSteps}`}
          subtitle="INITIAL CONFIGURATION"
          badge="GUIDED SETUP"
          onClose={onCancel}
          styleVariant="retro-win95"
        >
          <div className="p-6 sm:p-8 bg-[#121216] flex flex-col gap-6 font-mono text-xs">
            {/* Progress Bar */}
            <div className="w-full bg-[#1c1c22] h-2 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#ff3b00] to-[#00e5ff] transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>

            {/* STEP 1: Creator & Brand Name */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="font-heading font-bold text-lg text-white">
                  Step 1: Your Brand &amp; Professional Title
                </div>
                <p className="text-white/60 font-body text-xs">
                  Set your public artist/studio identity and headline for the homepage.
                </p>

                <div>
                  <label className="block text-white/70 uppercase mb-1">BRAND / CREATOR NAME</label>
                  <input
                    type="text"
                    value={formData.brand.brandName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: { ...formData.brand, brandName: e.target.value },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">PROFESSIONAL TITLE</label>
                  <input
                    type="text"
                    value={formData.brand.professionalTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: { ...formData.brand, professionalTitle: e.target.value },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">LOCATION / REGION</label>
                  <input
                    type="text"
                    value={formData.brand.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: { ...formData.brand, location: e.target.value },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Color Palette */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="font-heading font-bold text-lg text-white">
                  Step 2: Visual Color Identity
                </div>
                <p className="text-white/60 font-body text-xs">
                  Select your primary glow accent and secondary highlight tone.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 uppercase mb-1">PRIMARY ACCENT</label>
                    <input
                      type="color"
                      value={formData.brand.primaryColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: { ...formData.brand, primaryColor: e.target.value },
                        })
                      }
                      className="w-full h-10 rounded bg-[#1c1c22] border border-white/15 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 uppercase mb-1">SECONDARY ACCENT</label>
                    <input
                      type="color"
                      value={formData.brand.secondaryColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: { ...formData.brand, secondaryColor: e.target.value },
                        })
                      }
                      className="w-full h-10 rounded bg-[#1c1c22] border border-white/15 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Retro Effects */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="font-heading font-bold text-lg text-white">
                  Step 3: Texture &amp; Retro Aesthetics
                </div>
                <p className="text-white/60 font-body text-xs">
                  Enable or calibrate the visual textures of the platform.
                </p>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded bg-[#1c1c22] border border-white/10 cursor-pointer">
                    <span className="text-white">35mm Film Grain Canvas</span>
                    <input
                      type="checkbox"
                      checked={formData.brand.grainEnabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: { ...formData.brand, grainEnabled: e.target.checked },
                        })
                      }
                      className="accent-[#ff3b00]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded bg-[#1c1c22] border border-white/10 cursor-pointer">
                    <span className="text-white">CRT Scanlines &amp; Glitch</span>
                    <input
                      type="checkbox"
                      checked={formData.brand.scanlinesEnabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: { ...formData.brand, scanlinesEnabled: e.target.checked },
                        })
                      }
                      className="accent-[#ff3b00]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded bg-[#1c1c22] border border-white/10 cursor-pointer">
                    <span className="text-white">Viewfinder Frame HUD</span>
                    <input
                      type="checkbox"
                      checked={formData.brand.recIndicatorEnabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand: { ...formData.brand, recIndicatorEnabled: e.target.checked },
                        })
                      }
                      className="accent-[#ff3b00]"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: Hero Showreel */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="font-heading font-bold text-lg text-white">
                  Step 4: Hero Showreel Video
                </div>
                <p className="text-white/60 font-body text-xs">
                  Set the main featured showreel cut that plays on the homepage header window.
                </p>

                <div>
                  <label className="block text-white/70 uppercase mb-1">SHOWREEL TITLE</label>
                  <input
                    type="text"
                    value={formData.brand.showreelVideo.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: {
                          ...formData.brand,
                          showreelVideo: { ...formData.brand.showreelVideo, title: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">VIDEO URL (YOUTUBE / VIMEO / DRIVE)</label>
                  <input
                    type="text"
                    value={formData.brand.showreelVideo.providerIdOrUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: {
                          ...formData.brand,
                          showreelVideo: { ...formData.brand.showreelVideo, providerIdOrUrl: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: WhatsApp & Booking */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="font-heading font-bold text-lg text-white">
                  Step 5: Client Booking &amp; WhatsApp
                </div>
                <p className="text-white/60 font-body text-xs">
                  Configure where client project transmissions are directed.
                </p>

                <div>
                  <label className="block text-white/70 uppercase mb-1">BOOKINGS EMAIL</label>
                  <input
                    type="email"
                    value={formData.contactFormConfig.recipientEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactFormConfig: { ...formData.contactFormConfig, recipientEmail: e.target.value },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase mb-1">WHATSAPP DIRECT NUMBER</label>
                  <input
                    type="text"
                    placeholder="+447911123456"
                    value={formData.contactFormConfig.whatsappNumber || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactFormConfig: { ...formData.contactFormConfig, whatsappNumber: e.target.value },
                      })
                    }
                    className="w-full bg-[#1c1c22] border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Review & Launch */}
            {currentStep === 6 && (
              <div className="flex flex-col gap-4 animate-in fade-in text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-8 h-8" />
                </div>
                <div className="font-heading font-extrabold text-2xl text-white">
                  READY FOR TRANSMISSION!
                </div>
                <p className="text-white/70 font-body text-xs max-w-md mx-auto">
                  Your portfolio platform is primed. You can now publish projects, browse Google Drive cuts, and receive direct client inquiries.
                </p>
              </div>
            )}

            {/* Footer Nav Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded disabled:opacity-30"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-[#ff3b00] hover:bg-[#ff5500] text-white font-bold rounded flex items-center gap-2"
              >
                <span>{currentStep === totalSteps ? 'LAUNCH PORTFOLIO' : 'NEXT STEP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </RetroWindow>
      </div>
    </div>
  );
};
