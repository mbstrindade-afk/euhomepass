'use client';

import Link from 'next/link';

export default function Footer() {
  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined' && window.openCMP) {
      window.openCMP();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/loguinho.png" alt="HomePass logo" className="w-20 h-auto rounded" />
            </div>
            <p className="text-slate-600 text-sm max-w-md">
              EU community platform for temporary home exchanges. Live anywhere, share everywhere.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Help & Support - Mais prominente */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Help & Support</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/#faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                  FAQ
                </Link>
                <Link href="/legal" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                  Legal Center
                </Link>
                <a href="mailto:support@homepass.com" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Contact Support
                </a>
                <Link href="/#rules" className="text-slate-600 hover:text-slate-900 transition-colors">
                  House Rules
                </Link>
              </nav>
            </div>

            {/* Legal - Expandido */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/legal/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="/legal/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
                <button 
                  onClick={handleOpenCookieSettings}
                  className="text-slate-600 hover:text-slate-900 transition-colors text-left"
                >
                  Cookie Settings
                </button>
                <Link href="/legal/imprint" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Legal Notice
                </Link>
              </nav>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Platform</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/#como" className="text-slate-600 hover:text-slate-900 transition-colors">
                  How it works
                </Link>
                <Link href="/#precos" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/#comunidade" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Community
                </Link>
                <Link href="/#rules" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Rules
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {currentYear} HomePass Europe, Lda. All rights reserved.
            </p>
            
            {/* Quick Legal Links - Mais visíveis */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <Link href="/legal" className="hover:text-slate-900 transition-colors font-medium">
                Legal Center
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/legal/terms" className="hover:text-slate-900 transition-colors">
                Terms
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/legal/privacy" className="hover:text-slate-900 transition-colors">
                Privacy
              </Link>
              <span className="text-slate-300">·</span>
              <button 
                onClick={handleOpenCookieSettings}
                className="hover:text-slate-900 transition-colors"
              >
                Cookie Settings
              </button>
              <span className="text-slate-300">·</span>
              <a href="mailto:support@homepass.com" className="hover:text-slate-900 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}