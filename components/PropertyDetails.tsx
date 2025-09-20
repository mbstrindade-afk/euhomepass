'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Property } from './PropertyList';
import CommunityActivity from './CommunityActivity';

interface CommunityActivityData {
  viewingRequests?: number;
  saves?: number;
  exchangeOffers?: number;
}

interface PropertyDetailsProps {
  property: Property;
  onBack?: () => void;
  onManageAvailability?: (propertyId: string) => void;
  onEdit?: (propertyId: string) => void;
  communityActivity?: CommunityActivityData;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onBack,
  onManageAvailability,
  onEdit,
  communityActivity,
}) => {
  const router = useRouter();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack || (() => router.push('/dashboard/my-house'))}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{property.title}</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onManageAvailability ? onManageAvailability(property.id) : router.push(`/dashboard/my-house/manage-availability?propertyId=${property.id}`)}
            className="py-1.5 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Manage Availability
          </button>
          <button
            onClick={() => onEdit ? onEdit(property.id) : router.push(`/dashboard/my-house/create?edit=${property.id}`)}
            className="py-1.5 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center gap-1 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - House image and basic info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-center">
            <div className="mb-4 relative w-full h-48">
              <Image 
                src={property.images[0] || '/placeholder-home.png'} 
                alt={property.title} 
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{property.type}</h2>
            <p className="text-gray-600 mb-3">{property.address}</p>
            <div className={`py-1 px-4 rounded-full text-sm inline-block ${
              property.status === 'Available' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 
              property.status === 'Reserved' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 
              'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
            }`}>
              {property.status}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Last updated: {property.lastUpdated}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Bedrooms</p>
                <p className="font-medium">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Bathrooms</p>
                <p className="font-medium">{property.bathrooms}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Size</p>
                <p className="font-medium">{property.size}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">House Management</h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push(`/dashboard/my-house/create?edit=${property.id}`)}
                className="w-full py-2 px-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload New Images
              </button>
              <button
                className="w-full py-2 px-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center"
                onClick={() => router.push(`/dashboard/my-house/manage-availability?propertyId=${property.id}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Manage Availability
              </button>
              <button 
                onClick={() => router.push(`/dashboard/my-house/create?edit=${property.id}`)}
                className="w-full py-2 px-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit House Details
              </button>
            </div>
          </div>
        </div>

        {/* Right column - House details and Community Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">House Information</h2>
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-2">Address</h3>
              <p className="text-gray-700">{property.address}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700">{property.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-xs px-3 py-1.5 rounded-full border border-emerald-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Community Activity Section */}
          <CommunityActivity 
            viewingRequests={communityActivity?.viewingRequests}
            saves={communityActivity?.saves}
            exchangeOffers={communityActivity?.exchangeOffers}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;