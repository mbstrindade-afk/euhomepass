export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Summary</h2>
          <p className="text-slate-700 leading-relaxed">
            HomePass is a subscription-based EU community platform for listing and booking temporary exchanges of entire homes (host not present) for 1–3 months per stay. We are not a landlord or agent, and we do not mediate payments between members. Insurance/Fund: up to €1,000 per stay, €25 deductible; Annual: first approved claim each membership year has €0 deductible (≥ €50). Pets: host's choice, excluded from cover.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Key points</h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>EU citizens only · ID & proof of residence required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Entire homes only · Host not present</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Stays 1–3 months/home (continue in another home if needed)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Direct member contact · No payment platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Background check required once with us</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Fund: €1,000 per stay · €25 deductible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Annual subscription: €49/yr</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span>Host 1+ home or pay €39 monthly guest fee</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Eligibility and Platform Purpose</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            HomePass is available exclusively to EU citizens aged 18+ who can provide valid government-issued ID and proof of residence. Our platform facilitates temporary home exchanges (1-3 months) where members list their entire homes while away and stay in other members' homes.
          </p>
          <p className="text-slate-700 leading-relaxed">
            We are a community platform, not a real estate service. Hosts must be physically absent during guest stays. We do not process payments, act as landlords, or provide accommodation services directly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Membership and Fees</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Annual Subscription: €49</h3>
              <p className="text-slate-700">
                Covers platform access, identity verification, community fund insurance, and member support services.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Guest-Only Fee: €39/month</h3>
              <p className="text-slate-700">
                Applied to members who don't actively host a property but want to use the platform as guests only.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Host Benefits</h3>
              <p className="text-slate-700">
                Members who list and actively host properties pay only the annual fee with no additional monthly charges.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Community Fund & Insurance</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Coverage Details</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Up to €1,000 per stay for property damage</li>
                <li>• €25 deductible per claim</li>
                <li>• Annual benefit: First approved claim each membership year has €0 deductible (minimum €50 claim)</li>
                <li>• Pet damage excluded from coverage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Claims Process</h3>
              <p className="text-slate-700">
                Claims must be reported within 48 hours of discovery. Documentation, photos, and repair estimates required. Final approval subject to investigation and community fund availability.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Member Responsibilities</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• Maintain accurate, current profile and property information</li>
            <li>• Complete identity verification and background check</li>
            <li>• Treat all properties with care and respect</li>
            <li>• Follow house-specific rules provided by hosts</li>
            <li>• Report issues or damages immediately</li>
            <li>• Maintain good standing in the community</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Platform Limitations</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            HomePass provides a platform for member connections but does not guarantee availability, property condition, or member behavior. We are not liable for:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• Property damage beyond community fund limits</li>
            <li>• Personal injury or loss of personal belongings</li>
            <li>• Member disputes or conflicts</li>
            <li>• Service interruptions or technical issues</li>
            <li>• Third-party actions or local regulations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Termination</h2>
          <p className="text-slate-700 leading-relaxed">
            Either party may terminate membership with 30-day notice. Grounds for immediate termination include violation of terms, fraudulent activity, or community guidelines breaches. No refunds for partial subscription periods.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact</h2>
          <p className="text-slate-700 leading-relaxed">
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@homepass.com" className="text-sky-600 hover:text-sky-800">
              legal@homepass.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}