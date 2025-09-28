export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Eligibility & Purpose</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Summary</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              EU HomePass is a subscription-based EU community platform for listing and booking temporary exchanges of entire homes (host not present) for 13 months per stay. We are not a landlord or agent, and we do not mediate payments between members.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Plans: Quarterly €90 (3 months access) or Annual €270 (12 months access). Both include full platform features and the EU HomePass Community Fund (a discretionary benefit for abnormal utility overages; minimum €50, caps apply; not traditional insurance, not guaranteed). Pets: host's choice; excluded from the Fund.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Key points</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                EU/EEA citizens only — ID & proof of residence required
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                Entire homes only  Host not present
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                Stays: 13 months/home (you may continue in another home if needed)
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                Direct member contact  No payment platform
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                ID verification and background check required (once per member)
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                Community Fund: discretionary benefit for abnormal utility overages (€50 min, caps apply)
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
                Plans: Quarterly €90 (3 months)  Annual €270 (12 months)
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Membership & Fees</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quarterly Pass  €90</h3>
              <p className="text-slate-700">
                Access to the platform for 3 months: browse, list entire homes, book 13-month stays, messaging, calendar, verification workflow, and access to the Community Fund (discretionary utility overage benefit per rules).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Annual Pass  €270</h3>
              <p className="text-slate-700">
                Access for 12 months with the same features as the Quarterly Pass (including the Community Fund) for the whole year.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Billing & renewals</h3>
              <p className="text-slate-700">
                Plans renew until canceled. Fees are non-refundable except where mandatory law requires otherwise. We may update prices upon renewal with prior notice. Taxes (if any) are shown at checkout.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Listings & Stays</h2>
          <div className="space-y-4 text-slate-700">
            <p>Entire homes only (no shared rooms; no host presence).</p>
            <p>Stay length: minimum 1 month, maximum 3 months per home. You may book another 13 months in a different home, including in the same country (subject to availability).</p>
            <p>Local rules: if you stay over 3 months total in the same country, you are responsible for any residence registration or other legal requirements.</p>
            <p>House rules: Guests must comply with each home's House Rules (quiet hours, visitors, no parties/smoking rules, building regulations).</p>
            <p>Valuables: Hosts must remove or lock valuables (cash, jewellery, fine art, key documents, high-value electronics). Valuables are never covered by EU HomePass and are at the owner's sole risk.</p>
            <p>No commercial activity / no subletting: the platform is for community exchanges; strictly no rent and no commercial hosting.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Utilities  Fair Use</h2>
          <p className="text-slate-700">
            Members agree to reasonable use of electricity, gas and water (Fair Use). No off-platform payments or side-deals between members for utilities or any other purpose.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Pets</h2>
          <p className="text-slate-700">
            Pets are allowed only if the Host explicitly permits them and may impose rules (e.g., max 1, no sofa). Any pet-related matter (damage, cleaning, odors, neighbor complaints) is strictly between Host & Guest; EU HomePass does not mediate and the Community Fund does not apply to pets.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Community Fund (discretionary benefit, not traditional coverage)</h2>
          <div className="space-y-4 text-slate-700">
            <p>EU HomePass may, at its sole discretion, reimburse part of verified abnormal utility overages after a completed stay. This is a platform benefit, not traditional insurance coverage, not guaranteed, and no separate premium is charged.</p>
            
            <div>
              <p><strong>Minimum approved amount:</strong> €50 per stay</p>
              <p><strong>Caps (maximum limits):</strong> up to €200 per month of stay; up to €400 per stay; up to €800 per Host within any rolling 12 months</p>
              <p><strong>Eligibility:</strong> stay booked & completed via EU HomePass; Host & Guest verified; listing displayed Utilities: Fair Use; no off-platform payments</p>
              <p><strong>Evidence:</strong> baseline bills for the same period/season (or comparable months) and the actual bill covering the stay; meter photos may be requested</p>
              <p><strong>Process:</strong> submit within 14 days of check-out; target review 7 business days; outcomes: Approved (full/partial) or Declined with a brief reason; decisions are discretionary and not appealable (you may re-submit with new evidence)</p>
              <p><strong>Exclusions (examples):</strong> seasonal variation or poor insulation; pets-related costs; valuables; fines; anything unrelated to utilities or involving off-platform payments</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                For details, see the <a href="/legal/community-fund" className="underline hover:text-blue-900">Community Fund page</a> (which prevails over this summary).
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Last updated: 2025</h2>
        </div>
      </div>
    </div>
  );
}
