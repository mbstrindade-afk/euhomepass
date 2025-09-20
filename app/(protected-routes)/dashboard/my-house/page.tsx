'use client';

import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import AvailabilityManager from '../../../../components/AvailabilityManager';
import Link from 'next/link';
import PropertyList, { Property } from '../../../../components/PropertyList';
import PropertyDetails from '../../../../components/PropertyDetails';
import CommunityActivity from '../../../../components/CommunityActivity';

export default function MyHousePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPropertyId = searchParams.get('propertyId');
  
  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Apartment in Porto',
      address: '123 Maple Street, Porto, Portugal',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      size: '85 m²',
      status: 'Available',
      images: ['/home.svg'],
      description: 'Modern apartment in the heart of Porto with beautiful views of the city. Close to public transportation and local amenities.',
      amenities: ['Wi-Fi', 'Kitchen', 'Heating', 'Air conditioning', 'Washer'],
      lastUpdated: 'August 25, 2025',
      availability: [
        { startDate: '2025-09-01', endDate: '2025-09-15' },
        { startDate: '2025-10-01', endDate: '2025-10-15' },
      ]
    },
    {
      id: '2',
      title: 'Beach House in Algarve',
      address: '45 Ocean Ave, Algarve, Portugal',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      size: '120 m²',
      status: 'Reserved',
      images: ['/loguinho.png'],
      description: 'Beautiful beach house with ocean views, just steps from the sandy beaches of Algarve. Perfect for summer getaways.',
      amenities: ['Wi-Fi', 'Kitchen', 'Pool', 'BBQ', 'Parking'],
      lastUpdated: 'September 10, 2025',
      availability: [
        { startDate: '2025-11-01', endDate: '2025-11-15' }
      ]
    }
  ]);

  // Default house data (will be replaced by selected property)
  const [houseData, setHouseData] = useState({
    address: '123 Maple Street, Porto, Portugal',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    size: '85 m²',
    status: 'Available',
    images: ['/home.svg'],
    description: 'Modern apartment in the heart of Porto with beautiful views of the city. Close to public transportation and local amenities.',
    amenities: ['Wi-Fi', 'Kitchen', 'Heating', 'Air conditioning', 'Washer'],
    lastUpdated: 'August 25, 2025'
  });

  const availability = [
    { startDate: '2025-09-01', endDate: '2025-09-15' },
    { startDate: '2025-10-01', endDate: '2025-10-15' },
  ];

  // Load selected property data
  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find(p => p.id === selectedPropertyId);
      if (property) {
        setSelectedProperty(property);
        setHouseData({
          address: property.address,
          type: property.type,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          size: property.size,
          status: property.status,
          images: property.images,
          description: property.description,
          amenities: property.amenities,
          lastUpdated: property.lastUpdated
        });
      }
    } else if (properties.length > 0) {
      setSelectedProperty(properties[0]);
      setHouseData({
        address: properties[0].address,
        type: properties[0].type,
        bedrooms: properties[0].bedrooms,
        bathrooms: properties[0].bathrooms,
        size: properties[0].size,
        status: properties[0].status,
        images: properties[0].images,
        description: properties[0].description,
        amenities: properties[0].amenities,
        lastUpdated: properties[0].lastUpdated
      });
    }
    
    // Simulate loading of data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedPropertyId, properties]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  const handleSelectProperty = (propertyId: string) => {
    router.push(`/dashboard/my-house?propertyId=${propertyId}`);
  };

  if (isLoading || authLoading || !isAuthenticated) {
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
            <Link href="/dashboard" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">Dashboard</Link>
            <Link href="/dashboard/my-house" className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-colors">My House</Link>
            <Link href="/dashboard/my-information" className="font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My Profile</Link>
            <button
              onClick={logout}
              className="font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
        </header>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 rounded-md ${viewType === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            <Link 
              href="/dashboard/my-house/create"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Property
            </Link>
          </div>
        </div>

        {/* Display property list when no property is selected */}
        {!selectedPropertyId && (
          <PropertyList properties={properties} viewType={viewType} onSelectProperty={handleSelectProperty} />
        )}

        {/* Display selected property details */}
        {selectedPropertyId && selectedProperty && (
          <div>
            <PropertyDetails 
              property={selectedProperty} 
              onBack={() => router.push('/dashboard/my-house')}
              onManageAvailability={(propertyId) => router.push(`/dashboard/my-house/manage-availability?propertyId=${propertyId}`)}
              onEdit={(propertyId) => router.push(`/dashboard/my-house/create?edit=${propertyId}`)}
              communityActivity={{
                viewingRequests: 3,
                saves: 12,
                exchangeOffers: 2
              }}
            />

            {/* Availability Calendar */}
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Availability Calendar</h2>
              <AvailabilityManager availability={selectedProperty?.availability || availability} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}