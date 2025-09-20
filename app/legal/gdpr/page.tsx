'use client';

import { useState } from 'react';

type RequestType = 'access' | 'correct' | 'delete' | 'export';

export default function GDPRPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: 'access' as RequestType,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestTypes = [
    { value: 'access', label: 'Access my data', description: 'Request a copy of all personal data we hold about you' },
    { value: 'correct', label: 'Correct my data', description: 'Update or correct inaccurate personal information' },
    { value: 'delete', label: 'Delete my data', description: 'Request deletion of your personal data (where legally possible)' },
    { value: 'export', label: 'Export my data', description: 'Download your data in a portable format' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-900">Data Requests (GDPR)</h1>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted</h2>
          <p className="text-slate-600 mb-6">
            We've received your data request and will respond within 30 days as required by GDPR.
            You'll receive a confirmation email shortly.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', requestType: 'access', message: '' });
            }}
            className="px-6 py-2 text-sky-600 border border-sky-600 rounded-md hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Data Requests (GDPR)</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter your email address"
              />
              <p className="text-sm text-slate-600 mt-1">
                Must match the email address associated with your HomePass account
              </p>
            </div>

            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-slate-900 mb-2">
                Request Type *
              </label>
              <div className="space-y-3">
                {requestTypes.map((type) => (
                  <label key={type.value} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="requestType"
                      value={type.value}
                      checked={formData.requestType === type.value}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500"
                    />
                    <div>
                      <div className="font-medium text-slate-900">{type.label}</div>
                      <div className="text-sm text-slate-600">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Please provide any additional details about your request..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">What to Expect</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-slate-900">Response Time</h4>
                <p className="text-slate-600">We'll respond within 30 days as required by GDPR. Complex requests may take longer with advance notice.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900">Identity Verification</h4>
                <p className="text-slate-600">We may request additional verification to protect your data and privacy.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900">Data Formats</h4>
                <p className="text-slate-600">Data exports are provided in standard formats (JSON, CSV) when possible.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900">Legal Limitations</h4>
                <p className="text-slate-600">Some requests may be limited by legal obligations or legitimate interests.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-2">Need Help?</h4>
              <p className="text-sm text-slate-600">
                Contact our privacy team at{' '}
                <a href="mailto:privacy@homepass.eu" className="text-sky-600 hover:text-sky-700">
                  privacy@homepass.eu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}