export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Data We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Identity Verification</h3>
              <p className="text-slate-700">
                Government-issued ID documents, proof of residence, and identity verification data to ensure community safety and comply with regulatory requirements.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Property Listings</h3>
              <p className="text-slate-700">
                Home details, photos, availability calendars, and location information for properties listed on our platform.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Communications</h3>
              <p className="text-slate-700">
                Messages between members, booking inquiries, and customer support interactions to facilitate safe exchanges.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Usage Data</h3>
              <p className="text-slate-700">
                Website interactions, search preferences, and technical data to improve our services and user experience.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Legal Basis for Processing</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Contract Performance</h3>
              <p className="text-slate-600 text-sm">
                Processing necessary to provide our subscription-based home exchange services.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Legitimate Interests</h3>
              <p className="text-slate-600 text-sm">
                Platform security, fraud prevention, and service improvement where not overridden by your rights.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Legal Obligations</h3>
              <p className="text-slate-600 text-sm">
                Identity verification, tax reporting, and compliance with applicable laws and regulations.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Consent</h3>
              <p className="text-slate-600 text-sm">
                Marketing communications, analytics cookies, and optional features where consent is required.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Data Sharing</h2>
          <p className="text-slate-700 mb-4">
            We share your data only as necessary for our services and legal compliance:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span><strong>Service Providers:</strong> Trusted partners for identity verification, payment processing, and technical infrastructure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span><strong>KYC/Compliance:</strong> Identity verification services and fraud prevention systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span><strong>Legal Authorities:</strong> When required by law, court order, or to protect safety and security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 mt-2">•</span>
              <span><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (with user notification)</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Your GDPR Rights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Access & Portability</h3>
              <p className="text-slate-600 text-sm">Request a copy of your personal data in a machine-readable format.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Rectification</h3>
              <p className="text-slate-600 text-sm">Correct inaccurate or incomplete personal information.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Erasure</h3>
              <p className="text-slate-600 text-sm">Request deletion of your data where legally permissible.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Restriction</h3>
              <p className="text-slate-600 text-sm">Limit how we process your data in certain circumstances.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Objection</h3>
              <p className="text-slate-600 text-sm">Object to processing based on legitimate interests or direct marketing.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-medium text-slate-900 mb-2">Withdraw Consent</h3>
              <p className="text-slate-600 text-sm">Revoke consent for processing that requires your agreement.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Data Security & Retention</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Security Measures</h3>
              <p className="text-slate-700">
                We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your data.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Retention Periods</h3>
              <p className="text-slate-700">
                We retain your data only as long as necessary for service provision, legal compliance, and legitimate business purposes. Account data is typically retained for 7 years after account closure for regulatory compliance.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
          <div className="space-y-2 text-slate-700">
            <p>For privacy-related questions or to exercise your rights:</p>
            <p className="font-medium">Email: <a href="mailto:privacy@homepass.eu" className="text-sky-600 hover:text-sky-700">privacy@homepass.eu</a></p>
            <p className="text-sm text-slate-600 mt-4">
              If you're not satisfied with our response, you have the right to lodge a complaint with your local data protection authority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}