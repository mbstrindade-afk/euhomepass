'use client';

export default function CookiesPage() {
  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined' && window.openCMP) {
      window.openCMP();
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Cookies / CMP</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookie Categories</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            We use cookies to enhance your experience on HomePass. You can manage your preferences for different types of cookies below.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Strictly Necessary</h3>
            <p className="text-slate-600 mb-3">
              These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-white">
              Always on
            </span>
          </div>

          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Analytics (opt-in)</h3>
            <p className="text-slate-600">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Marketing (opt-in)</h3>
            <p className="text-slate-600">
              These cookies are used to deliver personalized advertisements and content. They may be set by us or third-party providers whose services we use.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Product Research/Beta (opt-in)</h3>
            <p className="text-slate-600">
              These cookies help us test new features and improvements. By allowing these cookies, you help us develop better products and services.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Manage Your Preferences</h2>
          <p className="text-slate-700 mb-6">
            You can customize your cookie preferences at any time. Your choices are saved per country and will be remembered for future visits.
          </p>
          
          <button
            onClick={handleOpenCookieSettings}
            className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Open Cookie Settings
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Technical Details</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <h4 className="font-medium text-slate-900">Storage Methods</h4>
              <p>We use both localStorage and HTTP cookies to store your preferences securely.</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Cookie Names</h4>
              <ul className="mt-2 space-y-1">
                <li><code className="bg-slate-100 px-2 py-1 rounded">hp_country</code> - Stores your selected country</li>
                <li><code className="bg-slate-100 px-2 py-1 rounded">hp_cmp_&lt;CC&gt;</code> - Stores consent preferences per country</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Data Retention</h4>
              <p>Cookie preferences are stored for 1 year and can be updated at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}