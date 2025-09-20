'use client';

import { useEffect, useState } from 'react';
import { CountryCode, COUNTRIES, ConsentSettings, loadConsent, saveConsent, getCountryFromCookie } from '@/lib/consent';

declare global {
  interface Window {
    openCMP?: () => void;
  }
}

export default function CMPModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryCode>('PT');
  const [consent, setConsent] = useState<ConsentSettings | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const country = getCountryFromCookie();
    setCurrentCountry(country);
    setConsent(loadConsent(country));

    // Expose global function to open modal
    window.openCMP = () => setIsOpen(true);

    // Listen for country changes
    const handleCountryChange = (event: CustomEvent<{ country: CountryCode }>) => {
      const newCountry = event.detail.country;
      setCurrentCountry(newCountry);
      setConsent(loadConsent(newCountry));
    };

    window.addEventListener('hp-country-changed', handleCountryChange as EventListener);

    return () => {
      window.removeEventListener('hp-country-changed', handleCountryChange as EventListener);
      delete window.openCMP;
    };
  }, []);

  const handleToggle = (category: 'analytics' | 'marketing' | 'research') => {
    if (!consent) return;
    
    setConsent(prev => prev ? {
      ...prev,
      [category]: !prev[category],
      updatedAt: new Date().toISOString()
    } : null);
  };

  const handleSavePreferences = () => {
    if (consent) {
      saveConsent(consent);
      setIsOpen(false);
    }
  };

  const handleAcceptAllOptional = () => {
    if (consent) {
      const updatedConsent = {
        ...consent,
        analytics: true,
        marketing: true,
        research: true,
        updatedAt: new Date().toISOString()
      };
      setConsent(updatedConsent);
      saveConsent(updatedConsent);
      setIsOpen(false);
    }
  };

  if (!mounted || !consent) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Cookie Settings
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600">
              Current country: <span className="font-medium">{COUNTRIES[currentCountry]} ({currentCountry})</span>
            </p>
          </div>

          <div className="space-y-4">
            {/* Strictly Necessary */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">Strictly necessary</h3>
                <p className="text-sm text-slate-600">Required for basic site functionality</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-slate-800 text-white text-xs rounded-full">
                  Always on
                </span>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">Analytics (opt-in)</h3>
                <p className="text-sm text-slate-600">Help us improve our services</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="sr-only"
                    aria-label="Toggle analytics cookies"
                  />
                  <div className={`w-11 h-6 bg-slate-200 rounded-full transition-colors ${
                    consent.analytics ? 'bg-sky-600' : 'bg-slate-200'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      consent.analytics ? 'translate-x-5' : 'translate-x-0'
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">Marketing (opt-in)</h3>
                <p className="text-sm text-slate-600">Personalized ads and content</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={() => handleToggle('marketing')}
                    className="sr-only"
                    aria-label="Toggle marketing cookies"
                  />
                  <div className={`w-11 h-6 bg-slate-200 rounded-full transition-colors ${
                    consent.marketing ? 'bg-sky-600' : 'bg-slate-200'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      consent.marketing ? 'translate-x-5' : 'translate-x-0'
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Product Research */}
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">Product research/beta (opt-in)</h3>
                <p className="text-sm text-slate-600">Help test new features</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.research}
                    onChange={() => handleToggle('research')}
                    className="sr-only"
                    aria-label="Toggle research cookies"
                  />
                  <div className={`w-11 h-6 bg-slate-200 rounded-full transition-colors ${
                    consent.research ? 'bg-sky-600' : 'bg-slate-200'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      consent.research ? 'translate-x-5' : 'translate-x-0'
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSavePreferences}
              className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              Save preferences
            </button>
            <button
              onClick={handleAcceptAllOptional}
              className="flex-1 border-2 border-emerald-600 text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              Accept all optional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}