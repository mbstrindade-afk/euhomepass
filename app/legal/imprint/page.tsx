export default function ImprintPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Legal Notice / Imprint</h1>
        <p className="text-slate-600 mt-2">
          Legal information and company details as required by EU regulations.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Company Information</h2>
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-slate-700">
            <p><span className="font-medium">Company Name:</span> HomePass Europe, Lda.</p>
            <p><span className="font-medium">Registration Number:</span> [To be updated]</p>
            <p><span className="font-medium">VAT Number:</span> [To be updated]</p>
            <p><span className="font-medium">Registered Office:</span> [Address to be updated]</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Details</h2>
          <div className="space-y-2 text-slate-700">
            <p><span className="font-medium">Email:</span> legal@homepass.com</p>
            <p><span className="font-medium">Website:</span> https://homepass.com</p>
            <p><span className="font-medium">Customer Support:</span> support@homepass.com</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Regulatory Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Data Protection Officer</h3>
              <p className="text-slate-700">
                For data protection inquiries: dpo@homepass.com
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Supervisory Authority</h3>
              <p className="text-slate-700">
                Portuguese Data Protection Authority (CNPD)<br />
                Website: <a href="https://www.cnpd.pt" className="text-sky-600 hover:text-sky-800">www.cnpd.pt</a>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Dispute Resolution</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Consumer Disputes</h3>
              <p className="text-slate-700">
                For consumer disputes, you may contact the European Commission's Online Dispute Resolution platform at{' '}
                <a href="https://ec.europa.eu/consumers/odr/" className="text-sky-600 hover:text-sky-800">
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Governing Law</h3>
              <p className="text-slate-700">
                These terms are governed by Portuguese law. Any disputes shall be subject to the exclusive jurisdiction of Portuguese courts.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Intellectual Property</h2>
          <p className="text-slate-700 leading-relaxed">
            The HomePass name, logo, and all related marks are trademarks of HomePass Europe, Lda. All content on this website is protected by copyright and other intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Disclaimer</h2>
          <p className="text-slate-700 leading-relaxed">
            HomePass is a community platform connecting EU citizens for home exchanges. We do not provide accommodation services directly and are not responsible for the condition, availability, or legal compliance of listed properties. Members are responsible for ensuring their activities comply with local laws and regulations.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-2">Important Note</h3>
          <p className="text-amber-800 text-sm">
            This legal notice is currently being finalized. Some details may be updated as we complete our legal setup across EU jurisdictions.
          </p>
        </div>
      </div>
    </div>
  );
}