'use client';

import { useState } from 'react';
// Temporary chevron icon component
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

interface DocumentItem {
  id: string;
  title: string;
  isActive?: boolean;
  hasSubItems?: boolean;
}

interface CookieToggle {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  required?: boolean;
}

export default function LegalCenter() {
  const [selectedDocument, setSelectedDocument] = useState('terms');
  const [selectedCountry, setSelectedCountry] = useState('PT');
  const [cookieSettings, setCookieSettings] = useState<CookieToggle[]>([
    {
      id: 'necessary',
      title: 'Strictly necessary',
      description: 'Essential functionality and core features.',
      enabled: true,
      required: true
    },
    {
      id: 'analytics',
      title: 'Analytics (opt-in)',
      description: 'Help us improve HomePass with anonymous data.',
      enabled: false
    },
    {
      id: 'marketing',
      title: 'Marketing (opt-in)',
      description: 'Personalized experiences and offers.',
      enabled: false
    },
    {
      id: 'research',
      title: 'Product research/beta (opt-in)',
      description: 'A/B tests and early features.',
      enabled: false
    }
  ]);

  const documents: DocumentItem[] = [
    { id: 'terms', title: 'Terms & Conditions', isActive: selectedDocument === 'terms' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'cookies', title: 'Cookies / CMP' },
    { id: 'gdpr', title: 'Data Requests (GDPR)' },
    { id: 'contact', title: 'Contact / Legal' }
  ];

  const countries = [
    { code: 'PT', name: 'Portugal (PT)' },
    { code: 'DE', name: 'Germany (DE)' },
    { code: 'ES', name: 'Spain (ES)' },
    { code: 'FR', name: 'France (FR)' }
  ];

  const toggleCookieSetting = (id: string) => {
    setCookieSettings(prev => prev.map(setting => 
      setting.id === id && !setting.required 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <img src="/loguinho.png" alt="HomePass logo" className="w-24 h-auto rounded" />
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                How it works
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Browse homes
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                FAQ
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Center</h1>
          <p className="text-gray-600">T&Cs, Privacy Policy and Cookies/CMP with country-specific content.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <nav className="space-y-2">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      doc.isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${
                        doc.isActive ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></span>
                      {doc.title}
                    </div>
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
                <p>Last updated</p>
                <p className="font-medium text-gray-700">2025-01-10</p>
                <p className="mt-1">Governing law: PT (example)</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                <p className="text-gray-600 mb-4">Summary</p>
                <p className="text-sm text-gray-600 mb-6">
                  HomePass is a subscription-based EU community platform for listing and booking home exchanges.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key points</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    EU citizens only - ID & proof of residence required
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Entire homes only - Host insurance required
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Stays 1-3 months/home (continue in another home if needed)
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Utilities: Fair Use - no off-platform payments
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Valuables: host must remove/lock; not covered by insurance
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cancellations: {'>'}1 month no penalties; 15-30 days warning; {'<'}15 days enforcement measures
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
                  Read full T&Cs
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Download (PDF)
                </button>
              </div>
            </div>
          </div>

          {/* Cookie Settings */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Cookie Settings (per country)</h2>
                <p className="text-sm text-gray-600 mb-4">Current country: Portugal (PT)</p>
                
                <div className="relative">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        Change to: {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {cookieSettings.map((setting) => (
                  <div key={setting.id} className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                        {setting.enabled && (
                          <span className="ml-2 text-xs text-green-600 font-medium">Always on</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => toggleCookieSetting(setting.id)}
                        disabled={setting.required}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          setting.enabled 
                            ? 'bg-blue-500' 
                            : 'bg-gray-200'
                        } ${setting.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                  Save preferences
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                  Accept all optional
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
            <span>© HomePass - EU Community Platform</span>
            <div className="flex space-x-6 mt-4 lg:mt-0">
              <a href="#" className="hover:text-gray-700">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Cookies / CMP</a>
              <a href="#" className="hover:text-gray-700">Imprint</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}