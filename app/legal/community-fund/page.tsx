'use client';

export default function CommunityFundPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center pb-8 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Community Fund
        </h1>
        <p className="text-lg text-slate-600">
          A discretionary platform benefit to help Hosts with abnormal utility overages
        </p>
      </div>

      {/* What it is */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What it is</h2>
        <p className="text-slate-700 leading-relaxed">
          The Community Fund is a discretionary platform benefit to help Hosts when a completed stay causes abnormal utility overages (electricity, gas, water). It is not traditional insurance coverage, not guaranteed, and there is no separate premium.
        </p>
      </section>

      {/* What abnormal overage means */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What "abnormal overage" means</h2>
        <p className="text-slate-700 leading-relaxed">
          The extra amount above your normal for the same period/season.
        </p>
      </section>

      {/* Eligibility */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Eligibility (all must be true)</h2>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
            Stay was booked and completed via HomePass.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
            Both Host and Guest are verified.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
            Listing had Utilities: Fair Use visible.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
            You submit within 14 days of check-out.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-sky-600 rounded-full mt-2"></span>
            No off-platform payments between Host & Guest.
          </li>
        </ul>
      </section>

      {/* Evidence */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Evidence we usually ask for</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Baseline:</h3>
            <p className="text-slate-700">
              Prior bill(s) for the same months last year (or similar period), and/or pre-check-in meter photo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Actuals:</h3>
            <p className="text-slate-700">
              Bill covering the stay period and/or post-check-out meter photo.
            </p>
          </div>
        </div>
      </section>

      {/* How we calculate */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How we calculate</h2>
        <p className="text-slate-700 leading-relaxed">
          We compare the actual utilities for the stay window with your baseline and consider only the difference (the overage). We may decline if evidence is insufficient.
        </p>
      </section>

      {/* Minimums & caps */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Minimums & caps (maximum limits)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Minimum approved amount:</h3>
            <p className="text-slate-700">€50 per stay</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Caps:</h3>
            <ul className="space-y-2 text-slate-700 ml-4">
              <li>• €200 per month of stay (1 month = max €200; 2 months = max €400; 3 months = still max €400 due to per-stay cap)</li>
              <li>• €400 per stay</li>
              <li>• €800 per Host within any rolling 12 months</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm">
              We may adjust caps for fairness and Fund health (we'll announce updates on this page).
            </p>
          </div>
        </div>
      </section>

      {/* Decisions & timing */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Decisions & timing</h2>
        <div className="space-y-4">
          <p className="text-slate-700">We aim to review within 7 business days.</p>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Outcomes:</h3>
            <p className="text-slate-700">Approved (full/partial) or Declined (with a short reason).</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Payout:</h3>
            <p className="text-slate-700">Via our payment processor or as subscription credit.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              Decisions are discretionary and not appealable (you can re-submit with new evidence).
            </p>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Exclusions (examples)</h2>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></span>
            Normal seasonal variation or wear & tear; poor insulation.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></span>
            Pets-related costs (cleaning, odors, pest treatments).
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></span>
            Valuables, cash, fines or penalties.
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></span>
            Anything unrelated to utilities or involving off-platform payments.
          </li>
        </ul>
      </section>

      {/* Transparency */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Transparency</h2>
        <p className="text-slate-700 leading-relaxed">
          The Fund is supported by a portion of subscription revenue (no separate premium). We publish aggregate reports (no personal data) with total requests, approvals, and payouts.
        </p>
      </section>

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Two quick examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Example 1</h3>
            <p className="text-green-800">
              1-month stay → overage €150 → below the €200/month cap → We may reimburse €150.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Example 2</h3>
            <p className="text-green-800">
              2-month stay → overage €520 → monthly caps €200×2=€400, per-stay cap €400 → We may reimburse up to €400.
            </p>
          </div>
        </div>
      </section>

      {/* Reminder */}
      <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Reminder</h2>
        <p className="text-slate-700 leading-relaxed">
          The Fund is not traditional insurance coverage. It's a good-faith, discretionary way to support Hosts when utilities go clearly above normal. HomePass is not a traditional insurer or intermediary.
        </p>
      </section>
    </div>
  );
}