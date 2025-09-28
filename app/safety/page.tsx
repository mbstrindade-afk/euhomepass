'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function SafetyGuide() {
  return (
    <div className="min-h-screen bg-[#f6fafb] font-[Quicksand,sans-serif] text-slate-900">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-6">Safety Guide</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Travel tips and best practices for safe and enjoyable home exchanges within the EU HomePass community.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-8 px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Before You Travel */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
                🧳 <span className="ml-2">Before You Travel</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Verify Your Host</h3>
                  <p className="text-slate-700">Always ensure your host is verified with the ✅ badge. Check their profile, reviews, and communication history before confirming your stay.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Use In-App Messaging</h3>
                  <p className="text-slate-700">Keep all communication within the EU HomePass platform for security and fund eligibility. Avoid sharing personal contact details until arrival.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Review House Rules</h3>
                  <p className="text-slate-700">Carefully read and understand the house rules, including quiet hours, visitor policies, and any special instructions from your host.</p>
                </div>
              </div>
            </section>

            {/* During Your Stay */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
                🏠 <span className="ml-2">During Your Stay</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Document Everything</h3>
                  <p className="text-slate-700">Take photos upon check-in and check-out. Report any issues immediately through the app to maintain fund coverage.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Respect the Property</h3>
                  <p className="text-slate-700">Treat the home as you would want your own home treated. Follow all house rules and local regulations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
                  <p className="text-slate-700">Keep emergency contacts handy: local emergency services, your host's contact, and HomePass support within the app.</p>
                </div>
              </div>
            </section>

            {/* Legal & Documentation */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
                📋 <span className="ml-2">Legal & Documentation</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Residence Registration</h3>
                  <p className="text-slate-700">If staying over 3 months total in the same country, you are responsible for any residence registration or legal requirements.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Travel Coverage</h3>
                  <p className="text-slate-700">While HomePass provides utility coverage through our community fund, consider additional personal travel coverage for belongings and health.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Local Laws</h3>
                  <p className="text-slate-700">Familiarize yourself with local laws and customs. Respect local noise ordinances, waste disposal rules, and cultural norms.</p>
                </div>
              </div>
            </section>

            {/* What's NOT Covered */}
            <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <h2 className="text-2xl font-bold mb-6 text-amber-900 flex items-center">
                ⚠️ <span className="ml-2">Important Reminders</span>
              </h2>
              <div className="space-y-4 text-amber-800">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Valuables Protection</h3>
                  <p>Hosts must remove or lock valuables (cash, jewelry, fine art, documents, high-value electronics). Valuables are never covered by HomePass.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No Accommodation Guarantee</h3>
                  <p>HomePass is a community platform connecting members. We don't guarantee property access or provide alternative stays if issues arise.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Utility Coverage Limits</h3>
                  <p>Coverage only applies to excessive consumption above €30 difference, up to €200/month, with proper documentation required.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            
            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-emerald-900">Quick Safety Tips</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Always verify host identity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Use in-app messaging only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Document check-in/out</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Follow house rules strictly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span>Report issues immediately</span>
                </li>
              </ul>
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Link href="/legal" className="block bg-white/70 hover:bg-white p-3 rounded-lg transition-colors">
                  <div className="font-semibold text-slate-800">Legal Center</div>
                  <div className="text-slate-600 text-sm">Terms, privacy & policies</div>
                </Link>
                <Link href="/know-more" className="block bg-white/70 hover:bg-white p-3 rounded-lg transition-colors">
                  <div className="font-semibold text-slate-800">About HomePass</div>
                  <div className="text-slate-600 text-sm">Learn how it works</div>
                </Link>
              </div>
            </div>

          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}