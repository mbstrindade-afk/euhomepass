import Link from 'next/link';
import Header from '../../components/Header';

export default function KnowMore() {
  return (
    <div className="min-h-screen bg-[#f6fafb] font-[Quicksand,sans-serif] text-slate-900">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-6">About EU HomePass</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Your trusted EU community for mid-term home exchanges. No rent, no booking fees, just authentic travel experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Start Your Journey
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
                <a href="#utility-coverage" className="block text-blue-600 hover:text-blue-800 transition-colors">🛡️ Coverage</a>
                <a href="#support" className="block text-blue-600 hover:text-blue-800 transition-colors">💬 Support</a>
              </nav>
            </div>

            {/* Why Choose EU HomePass */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-green-800">🌟 Why Choose EU HomePass?</h3>
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
                  <span>EU/EEA-verified community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Community fund included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fair reciprocity system</span>
                </li>
              </ul>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-purple-800">📊 Community Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Verified Members</span>
                  <span className="font-semibold text-purple-600">15,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Homes</span>
                  <span className="font-semibold text-purple-600">5,500+</span>
                </div>
                <div className="flex justify-between">
                  <span>EU Countries</span>
                  <span className="font-semibold text-purple-600">27</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Stay Rating</span>
                  <span className="font-semibold text-purple-600">4.8/5</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-2 space-y-6">
            <article id="basics" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                📋 <span className="ml-2">The Basics</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold mb-1">Q. What is EU HomePass?</h3>
                  <p className="mb-0">A. A trusted EU community for mid-term exchanges of houses (1–3 months). No rent. A pass gives you access, tools, and protection.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-1">Q. Does EU HomePass provide accommodation?</h3>
                  <p className="mb-0">A. No. EU HomePass is a platform connecting verified members. It doesn't guarantee property access or provide alternative stays.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-1">Q. Who can join?</h3>
                  <p className="mb-0">A. EU/EEA citizens, 18+, with completed ID verification and proof of residence.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-1">Q. Which countries are supported?</h3>
                  <p className="mb-0">A. European Union and European Economic Area countries.</p>
                </div>
              </div>
            </article>

            <article id="membership" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                👤 <span className="ml-2">Membership & Verification</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. How am I verified?</h3>
                  <p>A. You take a photo of your EU/EEA document, complete a guided selfie (proof of life), and submit proof of residence. Within minutes, you receive the Verified ID/Address badges.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What documents do you accept?</h3>
                  <p>A. Valid EU/EEA ID; and for residence: utility bill ≤ 3 months, lease agreement, municipal certificate, or host declaration + proof.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What about listing a house?</h3>
                  <p>A. We need proof of legitimacy (property deed/contract/utility bill) and your House Guide. Then you earn the Verified Host badge.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Do you store my photos and documents?</h3>
                  <p>A. Only what's strictly necessary for the minimum time required. We don't keep your liveness selfie longer than needed for validation. You can request copies/deletion (GDPR).</p>
                </div>
              </div>
            </article>

            <article id="standards" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                🏠 <span className="ml-2">Home Type & Standards</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. Can I list just a room?</h3>
                  <p>A. Entire homes only, with the host absent during the stay.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Minimum standards to list?</h3>
                  <p>A. Ready-to-live: bed & linens, Wi-Fi ≥ 50 Mbps, equipped kitchen, washing machine, pre-check-in cleaning, and a House Guide (access, Wi-Fi, rubbish, building rules).</p>
                </div>
              </div>
            </article>

            <article id="pricing" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                💰 <span className="ml-2">Plans & Pricing</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. What plans are available?</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mt-2">
                    <h4 className="font-semibold mb-2">Available Plans:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Quarterly Flex — €90:</strong> 3 usage months, valid 12 months.</li>
                      <li><strong>Annual — €270:</strong> 12 usage months, valid 12 months.</li>
                      <li>No booking fees. Utility coverage included.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Q. How does Quarterly Flex work?</h3>
                  <p>A. Use your months any time within 12 months—as separate month-long stays, as a single three-month stay, or any mix in between.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Does the pass buy stays?</h3>
                  <p>A. No. It provides access + community fund coverage. To book, you must also meet 1:1 reciprocity.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Do passes expire?</h3>
                  <p>A. Yes—each pass is valid 12 months (expiry shown in your account). If a pass would expire before a stay starts, renew first or the booking may be cancelled.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Are passes refundable?</h3>
                  <p>A. Subject to consumer law and our T&Cs. If a month has been used, restrictions may apply.</p>
                </div>
              </div>
            </article>

            <article id="reciprocity" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                🔄 <span className="ml-2">Reciprocity (1:1)</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. What is 1:1 reciprocity?</h3>
                  <p>A. Within a rolling 12-month window, you can use up to the same number of months you made available. Offer 2 → use 2.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. How do I earn reciprocity months?</h3>
                  <p>A. By opening availability in one-month blocks (minimum 1 month). Each month made available = +1 reciprocity month.</p>
                </div>
              </div>
            </article>

            <article id="bookings" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                📅 <span className="ml-2">Availability & Bookings</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. What's the minimum stay?</h3>
                  <p>A. One month. Stays run 28–31 nights (calendar month) to keep reciprocity fair and host churn low.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Can I offer only certain months (e.g., January and July)?</h3>
                  <p>A. Yes. Open 1-month windows whenever you want.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Typical stay length?</h3>
                  <p>A. 1–3 months. Book 1, 2, or 3 consecutive months—or separate months within the year.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Why 1–3 months per stay?</h3>
                  <p>A. It keeps things simple and lawful across the EU, avoids long-term tenancy issues, and fits remote work, projects, and study rhythms.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. When is a month deducted from my balance?</h3>
                  <p>A. On the start date of the stay.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Can I stay 6 months in the same country?</h3>
                  <p>A. Yes. You can stay up to 3 months per home. For 6 months in the same country, book two different homes back-to-back (e.g., Jan–Mar in Sophie's home, then Apr–Jun in John's home, both in Italy).</p>
                  <ul className="list-disc list-inside mt-2 bg-yellow-50 p-3 rounded">
                    <li>Pass balance: you need 6 usage months (e.g., two Quarterly Flex passes or one Annual).</li>
                    <li>Reciprocity: you must have listed 6 months within the rolling 12-month window.</li>
                    <li>Bookings: make two separate bookings (one per home).</li>
                    <li>Local rules: staying over 3 months in the same country may require local registration—check the municipality before travelling.</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                ❌ <span className="ml-2">Cancellations & No-shows</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. What if I cancel?</h3>
                  <p>A. Cancel before check-in → the month returns to your balance. After the start → it's used.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What if the host cancels or I can't access the home?</h3>
                  <p>A. EU HomePass is a platform; we don't assume responsibility for access or alternatives. Hosts who fail face reputation penalties and account measures. Please report it in-app.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What if the guest doesn't show up?</h3>
                  <p>A. A no-show results in a reputation penalty for the guest. Report it in-app.</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                ⚡ <span className="ml-2">Utilities (Fair Use)</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. Who pays water, power, gas, internet?</h3>
                  <p>A. Covered under the utility coverage policy for excess consumption. Difference payments required only for excessive usage (proven with documentation).</p>
                </div>
                <div>
                  <h3 className="font-semibold">Q. What counts as abusive consumption?</h3>
                  <p>A. Examples: heating/AC running for days with windows open; repeated neglect. Utilities include all electricity, water, and gas consumption. This may affect reputation and can trigger a fund review.</p>
                </div>
              </div>
            </article>

            <article id="utility-coverage" className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                🛡️ <span className="ml-2">Utility Coverage (Included)</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. What does the utility coverage cover?</h3>
                  <p>A. Up to €200 per month for excess utility consumption (water, electricity, gas) above normal usage.
                    Coverage applies only when excess consumption exceeds €30 above normal usage. Proof required with 6 months of previous utility bills.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. How is normal usage determined?</h3>
                  <p>A. Normal usage is established by providing 6 months of previous utility bills from the same period of the year. This creates a baseline to determine what constitutes excess consumption. Only the difference amount above this baseline is covered.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What's not covered (valuables & more)?</h3>
                  <p>A. Valuables are excluded. No cover for loss, theft or misplacement of cash, jewellery, watches, fine art, collectibles, rare items, documents, or unsecured high-value electronics. Hosts must remove or lock valuables in clearly off-limits spaces before check-in. Also excluded: gross negligence, illegal activity, and anything outside the rules.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. How do I file a claim?</h3>
                  <p>A. Open an in-app ticket within 48 hours of the event with photos, a short description, and meter readings if relevant.</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                🏡 <span className="ml-2">House Rules, Access & Conduct</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. Can hosts set specific rules?</h3>
                  <p>A. Yes—clearly state smoking/pets/visitors, quiet hours, max occupancy, and any off-limits areas. Guests must respect building rules.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. How do keys and access work?</h3>
                  <p>A. Secure method chosen by the host (key box, smart lock, or hand-over). Details are in the House Guide.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Do you recommend photo check-in/out?</h3>
                  <p>A. Yes—arrival/departure photos (overall condition; meter readings if agreed).</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Are money transfers between members allowed?</h3>
                  <p>A. No. No rent, deposits or side payments. No booking fees on the platform either.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Can I bring pets?</h3>
                  <p>A. Only if the Host's listing indicates "Pets allowed". Otherwise, no.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Who pays if there's damage caused by pets?</h3>
                  <p>A. Host and Guest agree and settle directly. EU HomePass does not mediate or process payments.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Does the community fund cover pet damage?</h3>
                  <p>A. No. Pet-related issues are excluded from community fund coverage.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. What about service animals?</h3>
                  <p>A. Only if the Host permits (no obligation, except under applicable local law). Costs/conditions are agreed between Host and Guest; EU HomePass assumes no charges.</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                ⚖️ <span className="ml-2">Legal, Tenancy & Residency</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. I'm a tenant—can I list?</h3>
                  <p>A. Check your lease. If needed, upload landlord authorization.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Staying over 3 months in the same country—any paperwork?</h3>
                  <p>A. In many EU countries you may need local registration. It's the guest's responsibility to comply.</p>
                </div>
              </div>
            </article>

            <article id="support" className="bg-white p-6 rounded-2xl shadow-sm border mb-12">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                💬 <span className="ml-2">Privacy & Support</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. Is my data safe?</h3>
                  <p>A. Yes. Data minimisation, EU-based storage, and strong security practices. See our Privacy Policy.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Should I communicate outside the app?</h3>
                  <p>A. Prefer in-app messaging for safety, records, and fund eligibility.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Property mismatch or issues—what do I do?</h3>
                  <p>A. Report within 24 hours with photos via an in-app ticket. For urgent access issues, message the host immediately in the app.</p>
                </div>
              </div>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-sm border mb-12">
              <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
                💳 <span className="ml-2">Costs & Transparency</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Q. Are there booking fees?</h3>
                  <p>A. No. You only pay the pass (Quarterly Flex or Annual). Fixed pricing. Utility coverage included.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Taxes?</h3>
                  <p>A. Prices shown are final (tax included). No extra fees at checkout.</p>
                </div>

                <div>
                  <h3 className="font-semibold">Q. Do you require a cash deposit?</h3>
                  <p>A. No standard cash deposit. The community fund covers incidents within its limits. Off-platform money requests are prohibited.</p>
                </div>
              </div>
            </article>
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Success Stories */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-orange-800">⭐ Success Stories</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-white/70 p-3 rounded-lg">
                  <p className="italic">"Amazing experience in Barcelona! The apartment was exactly as described."</p>
                  <p className="text-xs text-orange-600 mt-1">- Maria, Italy</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <p className="italic">"EU HomePass made our work-from-anywhere dream come true."</p>
                  <p className="text-xs text-orange-600 mt-1">- Jan, Netherlands</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <p className="italic">"Safe, verified community. Community fund gave us peace of mind."</p>
                  <p className="text-xs text-orange-600 mt-1">- Sophie, France</p>
                </div>
              </div>
            </div>

            {/* How It Works - Quick Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-blue-800">🚀 How It Works</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                  <span>Get verified & buy a pass</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                  <span>List your home for months you're away</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                  <span>Book amazing homes across the EU</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                  <span>Travel with fund coverage & support</span>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-2xl border">
              <h3 className="font-bold text-lg mb-4 text-red-800">❓ Need More Help?</h3>
              <div className="space-y-3 text-sm">
                <Link href="/contact" className="block bg-white/70 hover:bg-white p-3 rounded-lg transition-colors">
                  <div className="font-semibold text-red-800">Contact Support</div>
                  <div className="text-red-600">Get personalized assistance</div>
                </Link>
                <Link href="/community" className="block bg-white/70 hover:bg-white p-3 rounded-lg transition-colors">
                  <div className="font-semibold text-red-800">Join Community</div>
                  <div className="text-red-600">Connect with other members</div>
                </Link>
                <Link href="/safety" className="block bg-white/70 hover:bg-white p-3 rounded-lg transition-colors">
                  <div className="font-semibold text-red-800">Safety Guide</div>
                  <div className="text-red-600">Travel tips & best practices</div>
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}