import Link from 'next/link';
import Header from '../../components/Header';

export default function KnowMore() {
  return (
    <div className="min-h-screen bg-[#f6fafb] font-[Quicksand,sans-serif] text-slate-900">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-6">About HomePass</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Your trusted EU community for mid-term home exchanges. No rent, no booking fees, just authentic travel experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Start Your Journey
            </Link>
            <Link href="/" className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold transition-colors">
              Explore Homes
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Quick Navigation */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-4">
              <h3 className="font-bold text-lg mb-4 text-slate-800">Quick Navigation</h3>
              <nav className="space-y-2">
                <a href="#basics" className="block text-blue-600 hover:text-blue-800 transition-colors">📋 Basics</a>
                <a href="#membership" className="block text-blue-600 hover:text-blue-800 transition-colors">👤 Membership</a>
                <a href="#standards" className="block text-blue-600 hover:text-blue-800 transition-colors">🏠 Home Standards</a>
                <a href="#pricing" className="block text-blue-600 hover:text-blue-800 transition-colors">💰 Plans & Pricing</a>
                <a href="#reciprocity" className="block text-blue-600 hover:text-blue-800 transition-colors">🔄 Reciprocity</a>
                <a href="#bookings" className="block text-blue-600 hover:text-blue-800 transition-colors">📅 Bookings</a>
                <a href="#insurance" className="block text-blue-600 hover:text-blue-800 transition-colors">🛡️ Insurance</a>
                <a href="#support" className="block text-blue-600 hover:text-blue-800 transition-colors">💬 Support</a>
              </nav>
            </div>

            {/* Why Choose HomePass */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-green-800">🌟 Why Choose HomePass?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>No rent, no booking fees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Entire homes only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>EU-verified community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Insurance included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fair reciprocity system</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-2 space-y-6">
            <div id="basics"></div>

          <div className="space-y-6 text-slate-700">
            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-0">Q. What is HomePass?</h2>
              <p className="mb-0">A. A trusted EU community for mid-term exchanges of houses (1–3 months). No rent. A pass gives you access, tools, and protection.</p>

              <h2 className="text-base font-semibold mt-4 mb-0">Q. Does HomePass provide accommodation?</h2>
              <p className="mb-0">A. No. HomePass is a platform connecting verified members. It doesn’t guarantee property access or provide alternative stays.</p>

              <h2 className="text-base font-semibold mt-4 mb-0">Q. Who can join?</h2>
              <p className="mb-0">A. EU citizens, 18+, with completed ID verification and proof of residence.</p>

              <h2 className="text-base font-semibold mt-4 mb-0">Q. Which countries are supported?</h2>
              <p className="mb-0">A. European Union countries.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Membership & Verification</h2>

              <h3 className="font-semibold mt-2">Q. What is ID verification?</h3>
              <p>A. Government ID + selfie (liveness). We may also request proof of residence (e.g., lease, recent utility bill ≤ 3 months, municipal certificate, or a host declaration).</p>

              <h3 className="font-semibold mt-3">Q. What’s a “host declaration”?</h3>
              <p>A. A short statement in which a host confirms you resided at a specific address during a given period (with signature and contact). Useful when you don’t have a contract in your name.</p>

              <h3 className="font-semibold mt-3">Q. Can I have more than one account?</h3>
              <p>A. No. 1 person = 1 account.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Home Type & Standards</h2>

              <h3 className="font-semibold mt-2">Q. Can I list just a room?</h3>
              <p>A. Entire homes only, with the host absent during the stay.</p>

              <h3 className="font-semibold mt-3">Q. Minimum standards to list?</h3>
              <p>A. Ready-to-live: bed & linens, Wi-Fi ≥ 50 Mbps, equipped kitchen, washing machine, pre-check-in cleaning, and a House Guide (access, Wi-Fi, rubbish, building rules).</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Plans & Pricing</h2>

              <h3 className="font-semibold mt-2">Q. What plans are available?</h3>
              <h4 className="font-semibold mb-0">A.</h4>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-0">
                <li>Quarterly Flex — €80: 3 usage months, valid 12 months.</li>
                <li>Annual — €250: 12 usage months, valid 12 months.</li>
                <li>No booking fees. Insurance included.</li>
              </ul>

              <h3 className="font-semibold mt-4">Q. How does Quarterly Flex work?</h3>
              <p>A. Use your months any time within 12 months—as separate month-long stays, as a single three-month stay, or any mix in between.</p>

              <h3 className="font-semibold mt-4">Q. Does the pass buy stays?</h3>
              <p>A. No. It provides access + insurance. To book, you must also meet 1:1 reciprocity.</p>

              <h3 className="font-semibold mt-4">Q. Do passes expire?</h3>
              <p>A. Yes—each pass is valid 12 months (expiry shown in your account). If a pass would expire before a stay starts, renew first or the booking may be cancelled.</p>

              <h3 className="font-semibold mt-4">Q. Are passes refundable?</h3>
              <p>A. Subject to consumer law and our T&Cs. If a month has been used, restrictions may apply.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Reciprocity (1:1)</h2>

              <h3 className="font-semibold mt-2">Q. What is 1:1 reciprocity?</h3>
              <p>A. Within a rolling 12-month window, you can use up to the same number of months you made available. Offer 2 → use 2.</p>

              <h3 className="font-semibold mt-4">Q. How do I earn reciprocity months?</h3>
              <p>A. By opening availability in one-month blocks (minimum 1 month). Each month made available = +1 reciprocity month.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Availability & Bookings</h2>

              <h3 className="font-semibold mt-2">Q. What’s the minimum stay?</h3>
              <p>A. One month. Stays run 28–31 nights (calendar month) to keep reciprocity fair and host churn low.</p>

              <h3 className="font-semibold mt-4">Q. Can I offer only certain months (e.g., January and July)?</h3>
              <p>A. Yes. Open 1-month windows whenever you want.</p>

              <h3 className="font-semibold mt-4">Q. Typical stay length?</h3>
              <p>A. 1–3 months. Book 1, 2, or 3 consecutive months—or separate months within the year.</p>

              <h3 className="font-semibold mt-4">Q. When is a month deducted from my balance?</h3>
              <p>A. On the start date of the stay.</p>

              <h3 className="font-semibold mt-4">Q. Can I stay 6 months in the same country?</h3>
              <p>A. Yes. You can stay up to 3 months per home. For 6 months in the same country, book two different homes back-to-back (e.g., Jan–Mar in Sophie’s home, then Apr–Jun in John’s home, both in Italy).</p>
              <ul className="list-disc list-inside mt-2">
                <li>Pass balance: you need 6 usage months (e.g., two Quarterly Flex passes or one Annual).</li>
                <li>Reciprocity: you must have listed 6 months within the rolling 12-month window.</li>
                <li>Bookings: make two separate bookings (one per home).</li>
                <li>Local rules: staying over 3 months in the same country may require local registration—check the municipality before travelling.</li>
              </ul>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Cancellations & No-shows</h2>

              <h3 className="font-semibold mt-2">Q. What if I cancel?</h3>
              <p>A. Cancel before check-in → the month returns to your balance. After the start → it’s used.</p>

              <h3 className="font-semibold mt-4">Q. What if the host cancels or I can’t access the home?</h3>
              <p>A. HomePass is a platform; we don’t assume responsibility for access or alternatives. Hosts who fail face reputation penalties and account measures. Please report it in-app.</p>

              <h3 className="font-semibold mt-4">Q. What if the guest doesn’t show up?</h3>
              <p>A. A no-show results in a reputation penalty for the guest. Report it in-app.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Utilities (Fair Use)</h2>
              <h3 className="font-semibold mt-2">Q. Who pays water, power, gas, internet?</h3>
              <p className="mb-2">A. Included under a Fair Use policy. No monthly reconciliations.</p>
              <h3 className="font-semibold mt-2">Q. What counts as abusive consumption?</h3>
              <p className="mb-2">A. Examples: heating/AC running for days with windows open; parties; repeated neglect. This may affect reputation and can trigger an insurance review.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Community Insurance (Included)</h2>
              <h3 className="font-semibold mt-2">Q. What does the insurance cover?</h3>
              <p>A. Up to €1,000 per stay for material damage and abnormal utilities consumption (after review). €25 deductible per approved claim.
                Annual bonus: on the Annual plan, the first approved claim each membership year has €0 deductible.</p>

              <h3 className="font-semibold mt-3">Q. Any extra rules for the Annual deductible waiver?</h3>
              <p>A. Yes. Your Annual plan must be active both when you confirm the booking and when the incident happens. One waiver per membership year (12 months from purchase/renewal). It doesn’t roll over and has no cash value. Minimum approved claim €50. Coverage and exclusions are unchanged (limit €1,000 per stay).</p>

              <h3 className="font-semibold mt-3">Q. What’s not covered (valuables & more)?</h3>
              <p>A. Valuables are excluded. No cover for loss, theft or misplacement of cash, jewellery, watches, fine art, collectibles, rare items, documents, or unsecured high-value electronics. Hosts must remove or lock valuables in clearly off-limits spaces before check-in. Also excluded: gross negligence, illegal activity, and anything outside the rules.</p>

              <h3 className="font-semibold mt-3">Q. How do I file a claim?</h3>
              <p>A. Open an in-app ticket within 48 hours of the event with photos, a short description, and meter readings if relevant.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">House Rules, Access & Conduct</h2>

              <h3 className="font-semibold mt-2">Q. Can hosts set specific rules?</h3>
              <p className="mb-2">A. Yes—clearly state smoking/pets/visitors, quiet hours, max occupancy, and any off-limits areas. Guests must respect building rules.</p>

              <h3 className="font-semibold mt-2">Q. How do keys and access work?</h3>
              <p className="mb-2">A. Secure method chosen by the host (key box, smart lock, or hand-over). Details are in the House Guide.</p>

              <h3 className="font-semibold mt-2">Q. Do you recommend photo check-in/out?</h3>
              <p className="mb-2">A. Yes—arrival/departure photos (overall condition; meter readings if agreed).</p>

              <h3 className="font-semibold mt-2">Q. Are money transfers between members allowed?</h3>
              <p className="mb-2">A. No. No rent, deposits or side payments. No booking fees on the platform either.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-base font-semibold mb-3">Legal, Tenancy & Residency</h2>

              <h3 className="font-semibold mt-2">Q. I’m a tenant—can I list?</h3>
              <p className="mb-2">A. Check your lease. If needed, upload landlord authorization.</p>

              <h3 className="font-semibold mt-2">Q. Staying over 3 months in the same country—any paperwork?</h3>
              <p className="mb-2">A. In many EU countries you may need local registration. It’s the guest’s responsibility to comply.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border mb-12">
              <h2 className="text-base font-semibold mb-3">Privacy & Support</h2>

              <h3 className="font-semibold mt-2">Q. Is my data safe?</h3>
              <p className="mb-2">A. Yes. Data minimisation, EU-based storage, and strong security practices. See our Privacy Policy.</p>

              <h3 className="font-semibold mt-2">Q. Should I communicate outside the app?</h3>
              <p className="mb-2">A. Prefer in-app messaging for safety, records, and insurance eligibility.</p>

              <h3 className="font-semibold mt-2">Q. Property mismatch or issues—what do I do?</h3>
              <p className="mb-2">A. Report within 24 hours with photos via an in-app ticket. For urgent access issues, message the host immediately in the app.</p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border mb-12">
              <h2 className="text-base font-semibold mb-3">Costs & Transparency</h2>

              <h3 className="font-semibold mt-2">Q. Are there booking fees?</h3>
              <p className="mb-2">A. No. You only pay the pass (Quarterly Flex or Annual). Fixed pricing. Insurance included.</p>

              <h3 className="font-semibold mt-2">Q. Taxes?</h3>
              <p className="mb-2">A. Prices shown are final (tax included). No extra fees at checkout.</p>

              <h3 className="font-semibold mt-2">Q. Do you require a cash deposit?</h3>
              <p className="mb-2">A. No standard cash deposit. The community insurance covers incidents within its limits. Off-platform money requests are prohibited.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
