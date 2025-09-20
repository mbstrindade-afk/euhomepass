'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type IssueCategory = 'technical' | 'security' | 'billing' | 'experience' | 'property' | 'other';

interface IssueFormData {
  title: string;
  category: IssueCategory;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  attachments?: FileList | null;
}

const issueCategoryLabels: Record<IssueCategory, string> = {
  'technical': 'Technical Problem',
  'security': 'Security Concern',
  'billing': 'Billing Issue',
  'experience': 'Bad Experience',
  'property': 'Property Issue',
  'other': 'Other'
};

export default function ReportIssue() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [issueData, setIssueData] = useState<IssueFormData>({
    title: '',
    category: 'property',
    description: '',
    severity: 'medium',
    attachments: null
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setIssueData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // In a real app, you would upload the data to your API
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setIssueData({
        title: '',
        category: 'property',
        description: '',
        severity: 'medium',
        attachments: null
      });
      
      // Reset file input (you may need to create a ref to access the DOM element directly)
      const fileInput = document.getElementById('attachments') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // In a real app, you might redirect after successful submission
      // setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      console.error('Error submitting issue:', error);
      setSubmitError('There was an error submitting your issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center p-4 mb-10 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/90">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-12 h-12 relative">
                <img 
                  src="/home.svg" 
                  alt="HomePass" 
                  className="object-contain hover:scale-110 transition-transform" 
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">HomePass</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">Dashboard</Link>
            <Link href="/dashboard/my-house" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My House</Link>
            <Link href="/dashboard/my-information" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My Profile</Link>
          </nav>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Report an Issue</h1>
              <p className="text-gray-600">Let us know about any problems or concerns</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-green-800 text-lg">Issue Submitted Successfully</h3>
                  <p className="text-green-700">Thank you for your report. Our team will review it and get back to you soon.</p>
                  <div className="mt-4">
                    <Link 
                      href="/dashboard" 
                      className="px-4 py-2 bg-white border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Return to Dashboard
                    </Link>
                    <button 
                      onClick={() => setSubmitSuccess(false)} 
                      className="ml-3 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Submit Another Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                  {submitError}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={issueData.title}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={issueData.category}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(issueCategoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={issueData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please provide as much detail as possible"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                    Severity
                  </label>
                  <select
                    id="severity"
                    name="severity"
                    value={issueData.severity}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low - Minor inconvenience</option>
                    <option value="medium">Medium - Affects functionality</option>
                    <option value="high">High - Significant problem</option>
                    <option value="critical">Critical - Emergency situation</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (Optional)
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    onChange={handleFileChange}
                    multiple
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Upload photos or documents related to the issue</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Issue Report'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}