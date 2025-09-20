'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardData {
  stats: {
    visits: number;
    likes: number;
    comments: number;
    exchanges: number;
  };
  loyalty?: {
    level: string;
    points: number;
    nextLevel: string;
    pointsToNextLevel: number;
    badges: { name: string; earned: boolean; description: string }[];
    benefits: { name: string; description: string }[];
  };
  availability?: {
    months: { name: string; available: boolean; }[];
  };
  home?: {
    location: string;
    type: string;
    wifi: string;
    amenities: { name: string; available: boolean; }[];
  };
  exchange?: {
    insurance: boolean;
    remainingClaims: number;
    lastIncident: string | null;
  };
  messages?: {
    count: number;
    latest?: { from: string; preview: string; };
  };
  subscription?: {
    plan: string;
    status: 'active' | 'pending' | 'expired';
    renewalDate: string;
    features: { name: string; included: boolean; }[];
  };
}

export default function Dashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Charlotte');
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Fetch dashboard data when authenticated
    if (isAuthenticated) {
      const fetchDashboardData = async () => {
        setIsLoadingData(true);
        setError(null);
        
        // Try to fetch real data but use mock if fails
        try {
          const response = await fetch('/api/dashboard');
          if (response.ok) {
            const data = await response.json();
            setDashboardData(data);
            setIsLoadingData(false);
            return;
          }
        } catch (err) {
          console.error("API fetch failed, using mock data instead", err);
        }

        // Use mock data 
        setTimeout(() => {
          setDashboardData({
            stats: {
              visits: 42,
              likes: 15,
              comments: 8,
              exchanges: 3
            },
            loyalty: {
              level: 'Gold',
              points: 750,
              nextLevel: 'Platinum',
              pointsToNextLevel: 250,
              badges: [
                { name: 'First Exchange', earned: true, description: 'Completed your first home exchange' },
                { name: 'Trusted Host', earned: true, description: '5 positive reviews as a host' },
                { name: 'Adventurer', earned: false, description: 'Completed exchanges in 3+ countries' }
              ],
              benefits: [
                { name: 'Priority Support', description: '24/7 access to dedicated customer service' },
                { name: 'Flexible Cancellation', description: 'Extended cancellation window up to 7 days' },
                { name: 'Verified Badge', description: 'Stand out with verified status on your profile' }
              ]
            },
            availability: {
              months: [
                { name: 'Jan 2026', available: false },
                { name: 'Feb 2026', available: false },
                { name: 'Mar 2026', available: false },
              ]
            },
            home: {
              location: 'Lisbon, Portugal',
              type: 'Entire house',
              wifi: '100 Mbps',
              amenities: [
                { name: 'Bed & linens', available: true },
                { name: 'Washing machine', available: true },
                { name: 'Pre-check cleaning', available: true },
                { name: 'House guide uploaded', available: true }
              ]
            },
            exchange: {
              insurance: true,
              remainingClaims: 1,
              lastIncident: null
            },
            messages: {
              count: 1,
              latest: { from: 'Sophie', preview: 'Message from Sophie' }
            },
            subscription: {
              plan: 'Premium',
              status: 'active',
              renewalDate: '2026-03-15',
              features: [
                { name: 'Unlimited house listings', included: true },
                { name: 'Premium insurance', included: true },
                { name: 'Priority customer support', included: true },
                { name: 'Advanced calendar features', included: true },
                { name: 'Virtual house tours', included: false }
              ]
            }
          });
          setIsLoadingData(false);
        }, 1000);
      };
      
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Funções de calendário removidas pois a seção de disponibilidade foi movida para a página "My House"

  // Show loading state
  if (isLoading || !isAuthenticated) {
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
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center p-4 mb-10 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/90">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/loguinho.png" alt="HomePass logo" className="w-40 h-auto rounded" />
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-colors">Dashboard</Link>
            <Link href="/dashboard/my-house" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My House</Link>
            <Link href="/dashboard/my-information" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My Profile</Link>
            <button
              onClick={logout}
              className="font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="relative mb-12">
          <div className="absolute -top-6 -left-2 w-20 h-20 bg-blue-100 rounded-full opacity-70 blur-2xl"></div>
          <div className="absolute -top-2 left-10 w-16 h-16 bg-emerald-100 rounded-full opacity-70 blur-xl"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 relative">
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Welcome, {userName}!</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl">Manage your home, check availability, and discover your next adventure — all in one place.</p>
            </div>
            <Link 
              href="/dashboard/my-house/create"
              className="mt-6 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              List Your House
            </Link>
          </div>
        </div>
        
        {/* Stats Overview */}
        {dashboardData?.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 border-t-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Profile Visits</p>
                  <p className="text-3xl font-bold text-blue-700">{dashboardData.stats.visits}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Unique visitors to your profile</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 border-t-4 border-emerald-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Likes</p>
                  <p className="text-3xl font-bold text-emerald-600">{dashboardData.stats.likes}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Members who liked your home</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 border-t-4 border-purple-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Comments</p>
                  <p className="text-3xl font-bold text-purple-600">{dashboardData.stats.comments}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Community feedback on your home</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 border-t-4 border-amber-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Exchanges</p>
                  <p className="text-3xl font-bold text-amber-600">{dashboardData.stats.exchanges}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Successful home exchanges</p>
              </div>
            </div>
          </div>
        )}

        {/* Loyalty Program Section */}
        {dashboardData?.loyalty && (
          <div className="mb-10 bg-white p-6 rounded-xl shadow-lg overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full opacity-30"></div>
            <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-amber-50 rounded-full opacity-30"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 relative">
                  <span className="text-indigo-600 bg-indigo-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">Your Loyalty Status</h2>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white p-3 rounded-xl shadow-md">
                    <div className="text-xs uppercase tracking-wider font-medium text-amber-100">Current Level</div>
                    <div className="text-2xl font-bold">{dashboardData.loyalty.level}</div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-1">You're <span className="font-semibold">{dashboardData.loyalty.pointsToNextLevel}</span> points away from <span className="font-semibold">{dashboardData.loyalty.nextLevel}</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-300 h-2.5 rounded-full" 
                        style={{ width: `${(dashboardData.loyalty.points / (dashboardData.loyalty.points + dashboardData.loyalty.pointsToNextLevel)) * 100}%` }}>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{dashboardData.loyalty.points} points</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.loyalty.benefits.map((benefit, index) => (
                    <div key={index} className="bg-indigo-50 p-3 rounded-lg">
                      <div className="font-medium text-indigo-700 mb-1">{benefit.name}</div>
                      <p className="text-xs text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  Your Badges
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dashboardData.loyalty.badges.map((badge, index) => (
                    <div key={index} className={`flex flex-col items-center p-4 rounded-lg ${badge.earned ? 'bg-gradient-to-b from-amber-50 to-amber-100' : 'bg-gray-100'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${badge.earned ? 'bg-amber-200' : 'bg-gray-200'}`}>
                        {badge.earned ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        )}
                      </div>
                      <h4 className={`text-sm font-medium text-center ${badge.earned ? 'text-amber-800' : 'text-gray-500'}`}>{badge.name}</h4>
                      <p className="text-xs text-center mt-1 text-gray-500">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:from-indigo-600 hover:to-amber-600 transition-all">
                View Full Loyalty Program
              </button>
            </div>
          </div>
        )}

        {isLoadingData ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard data...</p>
          </div>
        ) : dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Home Info Section */}
              <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-50 rounded-full opacity-30"></div>
                <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-blue-50 rounded-full opacity-30"></div>
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 bg-emerald-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">Your Home</h2>
                  </div>
                  <Link href="/dashboard/my-house"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>

                <Link href="/dashboard/my-house" className="block w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium mb-6 text-center hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-[1.01] shadow-sm">
                  Edit Home Information
                </Link>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{dashboardData.home?.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-gray-500">Type</p>
                      <p className="font-medium text-gray-800">{dashboardData.home?.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-gray-500">WiFi</p>
                      <p className="font-medium text-gray-800">{dashboardData.home?.wifi}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  Home Amenities
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dashboardData.home?.amenities.map((amenity, index) => (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${amenity.available ? 'bg-green-50' : 'bg-gray-50'}`}>
                      {amenity.available ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                      )}
                      <span className={amenity.available ? "text-gray-800 font-medium" : "text-gray-500"}>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              {/* Exchange History Section */}
              <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-50 rounded-full opacity-30"></div>
                <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-blue-50 rounded-full opacity-30"></div>
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-600 bg-amber-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">Your Exchange History</h2>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                    <span>View All</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Insurance Status</h3>
                        <p className="text-xs text-gray-500">HomePass Protection Plan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                      <span className="font-medium text-green-700">Active</span>
                      {dashboardData.exchange?.insurance && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h3 className="text-gray-500 text-sm mb-1">Claims Remaining</h3>
                      <p className="text-3xl font-bold text-blue-600">{dashboardData.exchange?.remainingClaims}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h3 className="text-gray-500 text-sm mb-1">Last Incident</h3>
                      <p className="font-medium text-gray-700 text-sm">
                        {dashboardData.exchange?.lastIncident ? 
                          dashboardData.exchange.lastIncident : 
                          <span className="text-green-600">No incidents</span>
                        }
                      </p>
                    </div>
                  </div>
                  
                  <Link href="/dashboard/report-issue" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.01] shadow-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    Report New Issue
                  </Link>
                </div>
              </div>
              
              {/* Messages Section */}
              <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-50 rounded-full opacity-30"></div>
                <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-blue-50 rounded-full opacity-30"></div>
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600 bg-purple-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                    <span>See All</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                
                {dashboardData.messages && dashboardData.messages.count > 0 ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-xl">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{dashboardData.messages.count} new message{dashboardData.messages.count > 1 ? 's' : ''}</p>
                        <p className="text-xs text-gray-500">Tap to view conversation</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="font-bold text-white text-lg">{dashboardData.messages.latest?.from.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{dashboardData.messages.latest?.from}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Just now
                          </p>
                        </div>
                      </div>
                      <div className="pl-12 pb-3 pt-1">
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg rounded-tl-none">
                          {dashboardData.messages.latest?.preview}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-[1.01] shadow-sm flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 10 20 15 15 20"></polyline>
                          <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                        </svg>
                        Reply
                      </button>
                      <button className="flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 px-4">
                    <div className="inline-flex p-5 bg-purple-50 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No new messages</h3>
                    <p className="text-gray-600 text-sm">Your inbox is empty</p>
                  </div>
                )}
              </div>
              
              {/* Coming Exchanges Section */}
              <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full opacity-30"></div>
                <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-emerald-50 rounded-full opacity-30"></div>
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 bg-blue-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">Coming Exchanges</h2>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <span>View All</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-green-100 bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:scale-[1.01] cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="font-medium text-green-700">Confirmed Exchange</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full shadow-sm">In 2 weeks</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">Florence, Italy</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>Apr 15-30, 2026</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-700 text-xs">M</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Marco G. (Host)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-yellow-100 bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:scale-[1.01] cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <p className="font-medium text-yellow-700">Pending Exchange</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full shadow-sm">Awaiting Confirmation</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">Barcelona, Spain</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>Jun 10-25, 2026</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-yellow-700 text-xs">A</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Ana L. (Host)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-[1.01] shadow-sm flex items-center justify-center gap-2 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Request New Exchange
                  </button>
                </div>
              </div>
              
              {/* Subscription Section */}
              {dashboardData?.subscription && (
                <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative mt-8">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-50 rounded-full opacity-30"></div>
                  <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-indigo-50 rounded-full opacity-30"></div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <div className="flex items-center gap-3">
                      <span className="text-purple-600 bg-purple-100 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                        </svg>
                      </span>
                      <h2 className="text-xl font-bold text-gray-800">Your Subscription</h2>
                    </div>
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                      <span>Manage Plan</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl mb-5">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full ${
                            dashboardData.subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : dashboardData.subscription.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {dashboardData.subscription.status.charAt(0).toUpperCase() + dashboardData.subscription.status.slice(1)}
                          </span>
                          <h3 className="font-bold text-xl text-gray-800">{dashboardData.subscription.plan} Plan</h3>
                        </div>
                        <p className="text-gray-600">Renewal date: {new Date(dashboardData.subscription.renewalDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="bg-white text-purple-700 border border-purple-200 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors shadow-sm">
                          Upgrade Plan
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-700 mb-3">Plan Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dashboardData.subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        )}
                        <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
