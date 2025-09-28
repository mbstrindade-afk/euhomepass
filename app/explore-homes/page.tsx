'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import HomePreview from '../../components/HomePreview';
import Link from 'next/link';

interface Listing {
  id: number;
  title: string;
  city: string;
  country: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  hostName: string;
  hostRating: number;
  isVerified: boolean;
  euOnly: boolean;
}

export default function ExploreHomes() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/listings?limit=12&verified=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setListings(data.data.listings);
        } else {
          throw new Error(data.error || 'Failed to load listings');
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError(err instanceof Error ? err.message : 'Failed to load listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  return (
    <div className="min-h-screen bg-[#f6fafb] font-[Quicksand,sans-serif] text-slate-900">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-6">Explore Amazing Homes</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Discover beautiful homes across the European Union and European Economic Area listed by our verified members. 
            Each property is verified and ready for your medium-term stay.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-12 px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{loading ? '...' : `${listings.length}+`}</div>
            <div className="text-slate-600">Available Homes</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">27+</div>
            <div className="text-slate-600">EU + EEA Countries</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1,200+</div>
            <div className="text-slate-600">Verified Members</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
            <div className="text-slate-600">Average Rating</div>
          </div>
        </div>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Error loading homes</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : listings.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No homes available</h3>
              <p className="text-gray-600">We couldn't find any available homes at the moment.</p>
            </div>
          ) : (
            listings.map((listing) => (
              <HomePreview key={listing.id} listing={listing} showDetails={true} />
            ))
          )}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of verified members and discover authentic travel experiences across Europe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors">
              Create Account
            </Link>
            <Link href="/know-more" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition-colors">
              Learn How It Works
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Verified and Covered</h3>
            <p className="text-slate-600">All homes and members are verified. Utility coverage included up to €200 per month for excess consumption.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-xl mb-2">No Hidden Fees</h3>
            <p className="text-slate-600">Only the pass fee. No rent, no booking fees, no surprises. Utility coverage available for excess consumption.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Fair Exchange</h3>
            <p className="text-slate-600">1:1 reciprocity system. List your home to earn credits for your travels.</p>
          </div>
        </div>
      </main>
    </div>
  );
}