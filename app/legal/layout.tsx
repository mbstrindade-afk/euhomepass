'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CountrySwitch from '@/components/CountrySwitch';
import CMPModal from '@/components/CMPModal';

const navigationItems = [
  { href: '/legal', label: 'Legal Center', exact: true },
  { href: '/legal/terms', label: 'Terms & Conditions', exact: false },
  { href: '/legal/privacy', label: 'Privacy Policy', exact: false },
  { href: '/legal/cookies', label: 'Cookies / CMP', exact: false },
  { href: '/legal/imprint', label: 'Legal Notice / Imprint', exact: false },
  { href: '/legal/gdpr', label: 'Data Requests (GDPR)', exact: false },
  { href: '/legal/community-fund', label: 'Community Fund', exact: false },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined' && window.openCMP) {
      window.openCMP();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logoyellowprint-removebg-preview.png" alt="HomePass logo" className="w-40 h-auto rounded" />
            </Link>
          </div>
        </div>
      </header>

      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Legal Center</h1>
              <p className="text-slate-600 mt-1">
                T&Cs, Privacy Policy and Cookies/CMP with country-specific consent.
              </p>
            </div>
            <CountrySwitch />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href, item.exact)
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      isActive(item.href, item.exact) ? 'bg-sky-600' : 'bg-slate-300'
                    }`}>
                      {isActive(item.href, item.exact) ? '●' : '○'}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={handleOpenCookieSettings}
                  className="w-full px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50 rounded-md hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                >
                  Open Cookie Settings
                </button>
              </div>

              {/* Last Updated Card */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-sm font-medium text-slate-900 mb-2">Legal Information</h3>
                <div className="space-y-1 text-xs text-slate-600">
                  <p><span className="font-medium">Last updated:</span> 2025-01-10</p>
                  <p><span className="font-medium">Governing law:</span> PT (example)</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
            <Link href="/legal/terms" className="hover:text-slate-900 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/legal/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">·</span>
            <button 
              onClick={handleOpenCookieSettings}
              className="hover:text-slate-900 transition-colors"
            >
              Open Cookie Settings
            </button>
            <span className="text-slate-300">·</span>
            <Link href="/legal/imprint" className="hover:text-slate-900 transition-colors">
              Imprint
            </Link>
          </div>
        </div>
      </footer>

      {/* CMP Modal */}
      <CMPModal />
    </div>
  );
}