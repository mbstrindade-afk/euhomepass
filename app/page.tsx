"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import items from "../components/ItemsData";

// Import Google Fonts via CDN
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export default function Home() {
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  useEffect(() => {
    // SSR fallback for EU grid
    const grid = document.getElementById("eu-grid");
    if (grid) {
      grid.innerHTML = Array.from({ length: 36 })
        .map(
          () =>
            '<div class="aspect-square rounded-lg bg-white/15 flex items-center justify-center text-2xl">' +
            (Math.random() > 0.45 ? "🏠" : "") +
            "</div>"
        )
        .join("");
    }
    // Footer year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear().toString();
  }, []);
  
  // Navigation links
  const authNavLinks = [
    { href: "/register-test", label: "Register Test Page" },
    { href: "/debug", label: "Debug Page" },
    { href: "/login", label: "Login Page" },
    { href: "/register", label: "Register Page" },
    { href: "/dashboard", label: "Dashboard (Protected)" },
    { href: "/messages", label: "Messages" }
  ];

  const faqData = [
    {
      id: "passes",
      question: "How do the passes work?",
      answer: <>
        <span className="font-medium">Quarterly Pass (€80):</span><br/>
        • 3 months validity from purchase date<br/>
        • Access to all platform features<br/>
        • Community insurance with standard €25 deductible<br/>
        • Ability to list and book homes<br/>
        • Standard support<br/><br/>
        <span className="font-medium">Annual Pass (€250):</span><br/>
        • 12 months validity from purchase date<br/>
        • All Quarterly Pass features plus:<br/>
        • First approved insurance claim with €0 deductible<br/>
        • Priority support<br/>
        • Early access to new features<br/>
        • Saves €70 compared to purchasing 4 Quarterly passes
      </>
    },
    {
      id: "why-use",
      question: "Why use HomePass?",
      answer: <>
        • Entire homes only — autonomy and comfort;<br/>
        • No booking fees — passes only (Quarterly/Annual).<br/>
        • Flexible months — use your 1 up to 12 months any time within 1 year.<br/>
        • Trust & safety — ID verification, in-app messaging, photo check-in/out.<br/>
        • Insurance included — up to €1,000/stay (see deductible rules above).<br/>
        • Utilities covered (Fair Use) — fewer frictions, no monthly reconciliations.<br/>
        • Fair community model — 1:1 reciprocity: offer months, use months.<br/>
        • EU-only — shared standards, easier paperwork and mobility.
      </>
    },
    {
      id: "how-works",
      question: "How does the home exchange work?",
      answer: <>
        • List your home and open 1-month availability.<br/>
        • Get 1 month credit for every month you make available (1:1 reciprocity).<br/>
        • Book 1–3 months in another EU home.<br/>
        • No booking fees, utilities included under Fair Use.<br/>
        • Community insurance included.<br/>
        • A usage month is deducted at the start date.<br/>
        • Maximum 3 months per stay in the same home.
      </>
    },
    {
      id: "insurance",
      question: "How does insurance work?",
      answer: <>
        Insurance is included with your pass. After review, it covers material damage and abnormal utilities consumption up to €1,000 per stay. Minimum approved claim - €50. €25 deductible per approved claim.<br/><br/>
        <span className="font-medium">Bonus:</span> On the Annual plan, the first approved claim each membership year has €0 deductible.<br/><br/>
        <span className="font-medium">What's not covered?</span><br/>
        Valuables (cash, jewellery, watches, fine art, collectibles, documents, unsecured high-value electronics), normal wear, pre-existing issues, gross negligence, illegal activity, or anything outside the rules. Hosts must remove or lock valuables in off-limits areas.<br/><br/>
        <span className="font-medium">How to claim?</span><br/>
        Open an in-app ticket within 48h of the event (for utilities, within 14 days of the bill). Add photos and a short description (meter readings if relevant). Approved payouts go to the host.<br/><br/>
        <span className="font-medium">Examples:</span><br/>
        • €120 damage (Quarterly): payout €95 (120 − 25).<br/>
        • €120 damage (Annual, first claim this year): €120 (deductible waived).<br/>
        • €45 damage (Annual): below the €50 threshold for the waiver → no waiver; standard rules apply → payout €20 (45 − 25).<br/>
        • €40 damage: below the €50 minimum → no payout.
      </>
    },
    {
      id: "host-present",
      question: "Why can't the host be present?",
      answer: <>
        • HomePass is for entire-home exchanges only.<br/>
        • Guests get exclusive use while the host is away.<br/>
        • Protects privacy for all parties.<br/>
        • Keeps insurance and liability clear.<br/>
        • Avoids coliving/tenancy complications.<br/>
        • Shared occupancy isn't permitted.
      </>
    },
    {
      id: "cancel-booking",
      question: "Can I cancel my booking?",
      answer: <>
        Yes. If you cancel before the start date, your usage month returns to your balance.<br/><br/>
        <span className="font-medium">Penalties depend on timing:</span><br/>
        • ≥ 30 days before start: No penalty.<br/>
        • 15–29 days: Warning on your account (reputation impact).<br/>
        • &lt; 15 days (including same-day): Stricter measures may apply:<br/>
        &nbsp;&nbsp;&nbsp;- Strike on your account<br/>
        &nbsp;&nbsp;&nbsp;- Temporary booking freeze (up to 30 days)<br/> 
        &nbsp;&nbsp;&nbsp;- Listing de-prioritisation<br/>
        • Repeat cases can lead to suspension.
      </>
    },
    {
      id: "bills",
      question: "Who pays the bills?",
      answer: <>
        • Hosts pay all utility bills.<br/>
        • Guests don't pay any utility costs.<br/>
        • Utilities covered under Fair Use policy.<br/>
        • Irresponsible consumption may be penalized by reputation impact.<br/>
        • Excessive usage may trigger insurance claims.
      </>
    },
    {
      id: "host-cancels",
      question: "What if the host cancels?",
      answer: <>
        • Host reputation is negatively impacted.<br/>
        • Guest is prioritized for new bookings.<br/>
        • Platform support helps find alternatives.<br/>
        • Repeated cancellations lead to penalties.<br/>
        • Severe cases: hosts may lose platform access.<br/>
        • Guest usage month is returned to their balance.
      </>
    },
    {
      id: "verification",
      question: "How are members verified?",
      answer: <>
        • ID verification (passport/national ID).<br/>
        • EU residence document verification.<br/>
        • Secure document review by our team.<br/>
        • Home ownership/rental agreement checks.<br/>
        • Phone number verification.<br/>
        • Email verification.<br/>
        • Profile completeness requirements.
      </>
    },
    {
      id: "reputation",
      question: "How do reputations work?",
      answer: <>
        • Members earn reputation scores based on behavior.<br/>
        • Factors affecting reputation:<br/>
        &nbsp;&nbsp;&nbsp;- Honoring bookings<br/>
        &nbsp;&nbsp;&nbsp;- Home condition accuracy<br/>
        &nbsp;&nbsp;&nbsp;- Communication responsiveness<br/>
        &nbsp;&nbsp;&nbsp;- Cleanliness<br/>
        &nbsp;&nbsp;&nbsp;- Following community rules<br/>
        • Higher reputation = more visibility and booking opportunities.<br/>
        • Reputation affects listing priority in search results.
      </>
    },
    {
      id: "extend-stay",
      question: "Can I extend my stay?",
      answer: <>
        • Yes, extensions are possible with host approval.<br/>
        • Request extensions through the platform messaging.<br/>
        • You must have available months in your balance.<br/>
        • Host must approve any extension.<br/>
        • Maximum stay limit: 3 months per host.<br/>
        • Extensions are subject to host availability.
      </>
    },
    {
      id: "pet-policy",
      question: "What is the pet policy?",
      answer: <>
        • Each host sets their own pet policy for their home.<br/>
        • Look for the pet policy indicator on each listing.<br/>
        • Common pet policies include:<br/>
        &nbsp;&nbsp;&nbsp;- No pets allowed<br/>
        &nbsp;&nbsp;&nbsp;- Small pets only (up to 10kg)<br/>
        &nbsp;&nbsp;&nbsp;- All pets welcome<br/>
        &nbsp;&nbsp;&nbsp;- Cats only / Dogs only<br/>
        • Always disclose your pets when booking.<br/>
        • Undisclosed pets may result in booking cancellation.<br/>
        • Extra cleaning fees may apply for stays with pets.<br/>
        • Damage caused by pets is covered under normal insurance terms.
      </>
    }
  ];

  return (
  <div className="min-h-screen bg-[#f6fafb] font-[Quicksand,sans-serif] text-slate-900">
      {/* Skip link for a11y */}
      <a href="#content" className="sr-only sr-only-focus">Skip to content</a>

  <Header />
  <div className="max-w-7xl mx-auto px-6">


  {/* Hero */}
  <section className="bg-white rounded-2xl shadow w-full mt-8 p-6 md:p-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3 font-[Quicksand,sans-serif]">
              <span className="block text-sky-700">Live anywhere.</span>
              <span className="block text-emerald-600">Share everywhere</span>
            </h1>
            <p className="text-slate-700 mb-6">Swap homes with EU residents — no rent, just sharing</p>
            <a href="#" className="inline-block px-5 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">Create account</a>
          </div>
          <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
            <img src="/ChatGPT Image Sep 9, 2025, 01_36_41 AM.png" alt="Map of Europe with HomePass houses" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>
        </div>
        {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
          <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">EU citizens only</span>
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"><span className="text-lg">✅</span> Verified members</span>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"><span className="text-lg">🛡️</span> Insurance included</span>
        </div>
      </section>

  <main id="content" className="w-full mt-8">
        {/* How it works */}
        <section id="how-it-works" className="mt-10 text-center">
          <h2 className="text-3xl font-extrabold mb-2">How it works</h2>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <img src="/4-removebg-preview.png" alt="List" className="mb-2 object-contain mx-auto" style={{minWidth: '7cm', width: '13rem', maxHeight: '16rem'}} />
              <h3 className="font-semibold">List</h3>
              <p className="mt-2 text-sm text-slate-600 text-center">Verify your identity, add your home, and open availability (3-month module, you can use 1 month).</p>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <img src="/5-removebg-preview.png" alt="Book" className="mb-2 object-contain mx-auto" style={{minWidth: '7cm', width: '13rem', maxHeight: '16rem'}} />
              <h3 className="font-semibold">Book</h3>
              <p className="mt-2 text-sm text-slate-600 text-center">Book another verified home in another EU country. No rent. Community insurance included.</p>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <img src="/6-removebg-preview.png" alt="Live Anywhere" className="mb-2 object-contain mx-auto" style={{minWidth: '7cm', width: '13rem', maxHeight: '16rem'}} />
              <h3 className="font-semibold">Live Anywhere</h3>
              <p className="text-center text-sm">Discover new places, connect with amazing people, and build unforgettable memories as you explore the European Union.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-10 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Pricing</h2>
          <div className="flex justify-center gap-6 mt-8">
            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col items-center w-64">
              <p className="text-lg font-bold text-slate-900">Quarterly</p>
              <p className="text-2xl font-bold text-slate-900">€80</p>
              <p className="text-sm text-slate-500">/ 3 months</p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col items-center w-64">
              <p className="text-lg font-bold text-slate-900">Annual</p>
              <p className="text-2xl font-bold text-slate-900">€250</p>
              <p className="text-sm text-slate-500">/12 months</p>
              <span className="mt-2 px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">Save €70</span>
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section id="insurance" className="py-16 sm:py-20 text-center">
          <h2 className="text-3xl font-extrabold">Community insurance included</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Simple, transparent coverage for host confidence and guest peace of mind.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Included in all passes</h3>
              <p className="text-sm text-slate-600">No add-ons: each subscription contributes to the community fund that covers incidents.</p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Coverage up to €1,000</h3>
              <p className="text-sm text-slate-600">Physical damage and abnormal utility consumption during the stay, subject to review.</p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Transparency</h3>
              <p className="text-sm text-slate-600">Clear processes and open communication about how the service works.</p>
            </div>
          </div>
        </section>

        {/* Comunidade */}
        <section id="community" className="mt-6 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Community</h2>
          <p className="mt-2 text-slate-600">A European network of fair exchange — verified, secure, and active.</p>
          <div className="mt-6 flex justify-center gap-6 flex-wrap">
            {items.map((item, index) => (
              <div key={index} className="relative group">
                <div className="h-32 w-32 rounded-full border border-slate-300 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                    style={{
                      transform: 'scale(2.2)',
                      transformOrigin: 'center',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}
                  />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 min-w-[200px] max-w-[250px]">
                    <div className="relative">
                      <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs mb-2 leading-relaxed">{item.text}</p>
                      <div className="border-t border-slate-100 pt-2">
                        <p className="text-blue-600 font-semibold text-xs">{item.metric}</p>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                        <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-slate-200 absolute top-[-1px] left-1/2 transform -translate-x-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

    {/* Rules */}
  <section id="rules" className="mt-28 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Rules</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Clear and simple rules to ensure a smooth and fair experience for all members.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Respect</h3>
              <p className="text-sm text-slate-600">
                Treat all members and their homes with respect and care.
              </p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Honesty</h3>
              <p className="text-sm text-slate-600">
                Provide accurate information about your home and availability.
              </p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Communication</h3>
              <p className="text-sm text-slate-600">
                Respond promptly to inquiries and maintain clear communication.
              </p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Compliance</h3>
              <p className="text-sm text-slate-600">
                Follow all local laws and regulations during your stay.
              </p>
            </div>
            <div className="md:col-span-2 flex justify-center mt-6">
              <Link
                href="/know-more"
                id="know-more-btn"
                className="inline-block px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold shadow-xl hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200"
              >
                Know more about our rules
              </Link>
            </div>
          </div>
        </section>
  {/* FAQ */}
  <section id="faq" className="mt-16 mb-20 max-w-5xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold mb-2">FAQ</h2>
      <p className="mt-2 text-slate-600">Everything you need to know about HomePass</p>
    </div>
    
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {faqData.map((faq, index) => (
        <div 
          key={faq.id}
          className={`border-b border-slate-100 last:border-none ${selectedFaq === faq.id ? 'bg-gradient-to-r from-sky-50 to-emerald-50' : ''}`}
        >
          <button
            onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
            className="flex items-center justify-between w-full px-6 py-5 text-left transition-all duration-300 hover:bg-slate-50 focus:outline-none focus:ring-0"
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${selectedFaq === faq.id ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                {index === 0 && <span className="text-xl">�️</span>}
                {index === 1 && <span className="text-xl">🏠</span>}
                {index === 2 && <span className="text-xl">🔄</span>}
                {index === 3 && <span className="text-xl">�️</span>}
                {index === 4 && <span className="text-xl">�</span>}
                {index === 5 && <span className="text-xl">�</span>}
                {index === 6 && <span className="text-xl">�</span>}
                {index === 7 && <span className="text-xl">❌</span>}
                {index === 8 && <span className="text-xl">🔍</span>}
                {index === 9 && <span className="text-xl">⭐</span>}
                {index === 10 && <span className="text-xl">⏩</span>}
                {index === 11 && <span className="text-xl">🐾</span>}
              </div>
              <h3 className="font-bold text-lg text-slate-800">{faq.question}</h3>
            </div>
            <div className={`transition-transform duration-300 ${selectedFaq === faq.id ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 overflow-hidden ${
              selectedFaq === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 pt-1 text-slate-600 border-t border-slate-100 bg-white/60">
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/80 to-emerald-50/80">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
      </main>
    </div>

      {/* Footer */}
      <Footer />

      {/* Modal: Sign up disclaimer */}
      <div id="modal" className="hidden fixed inset-0 z-50">
        <div className="absolute inset-0 bg-orange-900/60"></div>
        <div className="relative z-10 max-w-lg mx-auto mt-24 px-4">
          <div className="rounded-xl bg-white hp-card p-6">
            <h3 className="text-lg font-semibold">Important Notice</h3>
            <p className="mt-2 text-sm text-orange-700">
              HomePass is a community platform that facilitates the temporary exchange of homes between EU citizens.
              HomePass does not provide direct accommodation and is not responsible for cancellations or access failures to the property.
            </p>
            <label className="mt-4 flex items-start gap-3 text-sm text-orange-700">
              <input id="accept" type="checkbox" className="mt-1 h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-600" />
              <span>I've read and accept the <a href="#" className="underline">Terms & Conditions</a> and the <a href="#" className="underline">Privacy Policy</a>.</span>
            </label>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button id="close" className="px-4 py-2 rounded-lg border">Close</button>
              <button id="create" disabled className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold disabled:bg-orange-200 disabled:text-orange-500">Create account</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
