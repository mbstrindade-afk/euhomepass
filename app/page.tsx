"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import items from "./data/items";

// Import Google Fonts via CDN
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export default function Home() {
  const { isAuthenticated } = useAuth();
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
  
  const faqData = [
    {
      id: "passes",
      question: "How do the passes work?",
      answer: <>
        EU HomePass is a vibrant community platform where members list their homes and enjoy stays at other members' places across Europe. It's home-swapping reimagined for the modern traveler! Our membership passes give you full access to this exciting exchange:<br/><br/>
        <span className="font-medium">Quarterly Pass (€90):</span><br/>
        • 3 months validity from purchase date<br/>
        • Access to all platform features<br/>
        • Community fund coverage<br/>
        • Ability to list and book homes<br/>
        • Standard support<br/><br/>
        <span className="font-medium">Annual Pass (€270):</span><br/>
        • 12 months validity from purchase date<br/>
        • All Quarterly Pass features plus:<br/>
        • Priority support<br/>
        • Early access to new features<br/>
        • Saves €90 compared to purchasing 4 Quarterly passes
      </>
    },
    {
      id: "why-use",
      question: "Why use EU HomePass?",
      answer: <>
        • Entire homes only — autonomy and comfort;<br/>
        • No booking fees — passes only (Quarterly/Annual).<br/>
        • Flexible months — use your 1 up to 12 months any time within 1 year.<br/>
        • Trust & safety — ID verification, in-app messaging, photo check-in/out.<br/>
        • Utility coverage included — up to €200/month for excess consumption (see coverage rules above).<br/>
        • Utilities covered (Fair Use) — fewer frictions, no monthly reconciliations.<br/>
        • Fair community model — 1:1 reciprocity: offer months, use months.<br/>
        • EU/EEA-only — shared standards, easier paperwork and mobility.
      </>
    },
    {
      id: "how-works",
      question: "How does the home exchange work?",
      answer: <>
        • List your home and open 1-month availability.<br/>
        • Get 1 month credit for every month you make available (1:1 reciprocity).<br/>
        • Book 1–3 months in another EU home.<br/>
        • No booking fees, utility coverage for excess consumption.<br/>
        • Utility coverage included.<br/>
        • A usage month is deducted at the start date.<br/>
        • Maximum 3 months per stay in the same home.
      </>
    },
    {
      id: "utility-coverage",
      question: "How does utility coverage work?",
      answer: <>
        Utility coverage is included with your pass. It covers excess utility consumption (water, electricity, gas) up to €200 per month. Coverage applies only when excess consumption exceeds €30 above normal usage.<br/><br/>
        <span className="font-medium">Proof required:</span> 6 months of previous utility bills to establish baseline consumption.<br/><br/>
        <span className="font-medium">What's not covered?</span><br/>
        Property damage, normal utility consumption, bills without proper documentation, or consumption below the €30 threshold.<br/><br/>
        <span className="font-medium">How to claim?</span><br/>
        Open an in-app ticket within 48h of discovery (for utilities, within 14 days of receiving the bill). Provide: 6 months of previous bills, current bill, and evidence of excess consumption. Approved payouts cover only the difference amount.<br/><br/>
        <span className="font-medium">Examples:</span><br/>
        • €180 excess consumption: payout €180.<br/>
        • €25 excess: below the €30 threshold → no payout.<br/>
        • €60 excess: payout €60.<br/>
        • No previous bills provided → no payout.
      </>
    },
    {
      id: "fair-use",
      question: "Utilities — what is \"Fair Use\"?",
      answer: <>
        Guests are expected to use electricity, gas and water reasonably. If a host receives a bill that is clearly above normal for the same period, they can apply to the Community Fund (see below). No off-platform payments.
      </>
    },
    {
      id: "community-fund",
      question: "What is the Community Fund?",
      answer: <>
        A discretionary platform benefit. We may reimburse verified abnormal utility overages after a completed stay. It's not traditional insurance, not guaranteed, and has caps (maximum limits): €200 per month, €400 per stay, €800 per Host in 12 months. Minimum approved amount €50.
      </>
    },
    {
      id: "host-present",
      question: "Why can't the host be present?",
      answer: <>
        • EU HomePass is for entire-home exchanges only.<br/>
        • Guests get exclusive use while the host is away.<br/>
        • Protects privacy for all parties.<br/>
        • Keeps fund coverage and liability clear.<br/>
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
        • <strong>Each host keeps paying utilities of their own house</strong> — the costs should be more or less the same.<br/>
        • <strong>Guests enjoy utilities included</strong> under our Fair Use policy.<br/>
        • <strong>Fair Use means responsible consumption</strong> — similar to what you'd use at home.<br/>
        • <strong>Community Fund covers genuine excess</strong> (above €30, with 6-month bills proof).<br/>
        • <strong>Guests who abuse utilities</strong> face reputation penalties and potential suspension.<br/>
        • <strong>Most stays have zero issues</strong> — our community is respectful and responsible.
      </>
    },
    {
      id: "host-cancels",
      question: "What if the host cancels?",
      answer: <>
        In case of host cancellation or no-show, the guest's usage month is immediately returned to their balance and they are welcome to find another solution from our pool of available homes.<br/><br/>
        
        <strong>EU HomePass, being a platform where people list and share their houses, does not act as a hospitality service and therefore has no responsibilities in no-shows or cancellations.</strong><br/><br/>
        
        The host's reputation will be negatively impacted, and repeated cancellations lead to penalties. In severe cases, hosts may lose platform access entirely.
      </>
    },
    {
      id: "verification",
      question: "How are members verified?",
      answer: <>
        • <strong>EU/EEA verified members only.</strong><br/>
        • <strong>ID & proof of residence required</strong> (2–3 minutes).<br/>
        • <strong>Hosts: verify your home once</strong> to unlock bookings.<br/>
        • <strong>We use liveness + document checks</strong> to keep the community safe.<br/>
        • <strong>We don't store your selfie/video</strong> longer than needed — GDPR compliant.
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
        • Damage caused by pets is covered under normal fund terms.
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
            <Link href={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-block px-5 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">
              {isAuthenticated ? 'Go to dashboard' : 'Create account'}
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
            <img src="/ChatGPT Image Sep 9, 2025, 01_36_41 AM.png" alt="Map of Europe with EU HomePass houses" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>
        </div>
        {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
          <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">EU/EEA citizens only</span>
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"><span className="text-lg">✅</span> Verified members</span>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"><span className="text-lg">🛡️</span> Utility coverage included</span>
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
              <p className="mt-2 text-sm text-slate-600 text-center">Book another verified home in another EU country. No rent. Utility coverage included.</p>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <img src="/6-removebg-preview.png" alt="Live Anywhere" className="mb-2 object-contain mx-auto" style={{minWidth: '7cm', width: '13rem', maxHeight: '16rem'}} />
              <h3 className="font-semibold">Live Anywhere</h3>
              <p className="text-center text-sm">Discover new places, connect with amazing people, and build unforgettable memories as you explore the European Union and European Economic Area.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-10 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Pricing</h2>
          <div className="flex justify-center gap-6 mt-8">
            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col items-center w-64">
              <p className="text-lg font-bold text-slate-900">Quarterly</p>
              <p className="text-2xl font-bold text-slate-900">€90</p>
              <p className="text-sm text-slate-500 mb-4">/ 3 months</p>
              <Link 
                href={isAuthenticated ? "/payment?plan=quarterly" : "/register"}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                {isAuthenticated ? "Get Quarterly" : "Sign Up"}
              </Link>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col items-center w-64">
              <p className="text-lg font-bold text-slate-900">Annual</p>
              <p className="text-2xl font-bold text-slate-900">€270</p>
              <p className="text-sm text-slate-500">/12 months</p>
              <span className="mt-2 px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">Save €90</span>
              <Link 
                href={isAuthenticated ? "/payment?plan=annual" : "/register"}
                className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors mt-4"
              >
                {isAuthenticated ? "Get Annual" : "Sign Up"}
              </Link>
            </div>
          </div>
        </section>

        {/* Fund */}
        <section id="utility-coverage" className="py-16 sm:py-20 text-center">
          <h2 className="text-3xl font-extrabold">Fund</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Coverage for excessive utility consumption for host peace of mind.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Community Fund</h3>
              <p className="text-sm text-slate-600">A collective pool created by all EU HomePass members to provide security and peace of mind. Each subscription contributes to this shared fund that protects hosts against excessive utility costs and supports the community.</p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Coverage up to €200/month</h3>
              <p className="text-sm text-slate-600">Covers excess utility consumption (water, electricity, gas) above normal usage, with minimum €30 difference required. Must be proven with the last 6 utility bills.</p>
            </div>
            <div className="hp-card bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-1">Transparency</h3>
              <p className="text-sm text-slate-600">Fair and straightforward processes ensure the fund operates smoothly for everyone's benefit. Our commitment to honest communication builds trust within the community.</p>
            </div>
          </div>
        </section>

        {/* Community */}
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
                {/* Simple Clean Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-left min-w-[180px] max-w-[200px]">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-xs mb-2">{item.text}</p>
                    <div className="text-blue-600 text-xs font-medium">{item.metric}</div>
                    {/* Simple arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
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
      <p className="mt-2 text-slate-600">Everything you need to know about EU HomePass</p>
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
                {index === 0 && <span className="text-xl">🎫</span>}
                {index === 1 && <span className="text-xl">🏠</span>}
                {index === 2 && <span className="text-xl">🔄</span>}
                {index === 3 && <span className="text-xl">⚡</span>}
                {index === 4 && <span className="text-xl">🔧</span>}
                {index === 5 && <span className="text-xl">💰</span>}
                {index === 6 && <span className="text-xl">🚫</span>}
                {index === 7 && <span className="text-xl">❌</span>}
                {index === 8 && <span className="text-xl">�</span>}
                {index === 9 && <span className="text-xl">🏃</span>}
                {index === 10 && <span className="text-xl">✅</span>}
                {index === 11 && <span className="text-xl">⭐</span>}
                {index === 12 && <span className="text-xl">⏩</span>}
                {index === 13 && <span className="text-xl">🐾</span>}
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
              EU HomePass is a community platform that facilitates the temporary exchange of homes between EU/EEA citizens.
              EU HomePass does not provide direct accommodation and is not responsible for cancellations or access failures to the property.
            </p>
            <label className="mt-4 flex items-start gap-3 text-sm text-orange-700">
              <input id="accept" type="checkbox" className="mt-1 h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-600" />
              <span>I've read and accept the <a href="#" className="underline">Terms & Conditions</a> and the <a href="#" className="underline">Privacy Policy</a>.</span>
            </label>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button id="close" className="px-4 py-2 rounded-lg border">Close</button>
              {isAuthenticated ? (
                <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Go to dashboard</Link>
              ) : (
                <button id="create" disabled className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold disabled:bg-orange-200 disabled:text-orange-500">Create account</button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
