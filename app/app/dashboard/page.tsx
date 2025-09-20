'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardData {
  stats: {
    visits: number;
    likes: number;
    comments: number;
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
}

export default function Dashboard() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName] = useState<string>('Charlotte');
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
              comments: 8
            },
            availability: {
              months: [
                { name: 'Jan 2026', available: true },
                { name: 'Feb 2026', available: true },
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
            }
          });
          setIsLoadingData(false);
        }, 1000);
      };
      
      fetchDashboardData();

      fetchDashboardData();
    }
  }, [isAuthenticated]);

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
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center p-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <img 
                src="/home.svg" 
                alt="HomePass" 
                className="object-contain" 
              />
            </div>
            <h1 className="text-2xl font-bold">HomePass</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button className="font-medium text-gray-800 hover:text-blue-600">Dashboard</button>
            <button className="font-medium text-gray-800 hover:text-blue-600">My Listings</button>
            <button
              onClick={logout}
              className="font-medium text-gray-800 hover:text-blue-600"
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
        
        <h1 className="text-5xl font-bold mb-10">Welcome, {userName}!</h1>

        {isLoadingData ? (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard data...</p>
          </div>
        ) : dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Visits</h2>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.stats.visits}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Likes</h2>
              <p className="text-3xl font-bold text-green-600">{dashboardData.stats.likes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              <p className="text-3xl font-bold text-purple-600">{dashboardData.stats.comments}</p>
            </div>
            
            <div className="col-span-full bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
              <p className="mb-4 text-gray-600">
                This is a protected area. You're seeing this content because you're authenticated.
              </p>
              <p className="text-gray-600">
                You can add more components and features to this dashboard as your application grows.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
