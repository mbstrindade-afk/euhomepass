import Link from 'next/link';

export default function LegalCenterPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Legal Center</h1>
        <p className="text-slate-600 mt-2">
          Access all legal documents, policies, and compliance information for HomePass.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/legal/terms"
          className="group p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700 mb-2">Terms & Conditions</h2>
          <p className="text-slate-600 text-sm">
            Platform rules, membership requirements, fees, and community guidelines for HomePass users.
          </p>
        </Link>

        <Link 
          href="/legal/privacy"
          className="group p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700 mb-2">Privacy Policy</h2>
          <p className="text-slate-600 text-sm">
            How we collect, use, and protect your personal data in compliance with GDPR and EU regulations.
          </p>
        </Link>

        <Link 
          href="/legal/cookies"
          className="group p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700 mb-2">Cookies / CMP</h2>
          <p className="text-slate-600 text-sm">
            Cookie usage, consent management, and privacy preferences for the HomePass platform.
          </p>
        </Link>

        <Link 
          href="/legal/imprint"
          className="group p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700 mb-2">Legal Notice / Imprint</h2>
          <p className="text-slate-600 text-sm">
            Company information, contact details, and regulatory compliance as required by EU law.
          </p>
        </Link>
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-medium text-slate-900 mb-2">Need Help?</h3>
        <p className="text-slate-600 text-sm">
          For legal questions or clarifications, contact us at{' '}
          <a href="mailto:legal@homepass.com" className="text-sky-600 hover:text-sky-800">
            legal@homepass.com
          </a>
        </p>
      </div>
    </div>
  );
}