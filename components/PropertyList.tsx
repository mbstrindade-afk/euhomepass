'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface Property {
  id: string;
  title: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  status: string;
  images: string[];
  description: string;
  amenities: string[];
  lastUpdated: string;
  availability?: { startDate: string; endDate: string }[];
}

interface PropertyListProps {
  properties: Property[];
  onSelectProperty?: (propertyId: string) => void;
  viewType?: 'grid' | 'list';
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onSelectProperty,
  viewType = 'grid'
}) => {
  const router = useRouter();

  const handlePropertyClick = (propertyId: string) => {
    if (onSelectProperty) {
      onSelectProperty(propertyId);
    } else {
      router.push(`/dashboard/my-house?propertyId=${propertyId}`);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No properties yet</h3>
        <p className="mt-1 text-gray-500">Get started by adding your first property.</p>
        <button 
          onClick={() => router.push('/dashboard/my-house/create')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Property
        </button>
      </div>
    );
  }

  if (viewType === 'list') {
    return (
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePropertyClick(property.id)}
          >
            <div className="w-32 h-32 md:w-48 md:h-auto relative flex-shrink-0">
              <Image 
                src={property.images[0] || '/home.svg'}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 128px, 192px"
                className="object-cover rounded-l-lg"
              />
            </div>
            <div className="p-4 flex-grow">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  property.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  property.status === 'Reserved' ? 'bg-orange-100 text-orange-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {property.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{property.address}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                <span>{property.bedrooms} bed</span>
                <span>{property.bathrooms} bath</span>
                <span>{property.size}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{property.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          onClick={() => handlePropertyClick(property.id)}
        >
          <div className="relative w-full h-48">
            <Image 
              src={property.images[0] || '/home.svg'}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                property.status === 'Available' ? 'bg-green-100 text-green-800' : 
                property.status === 'Reserved' ? 'bg-orange-100 text-orange-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
            <p className="text-sm text-gray-600">{property.address}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
              <span>{property.bedrooms} bed</span>
              <span>{property.bathrooms} bath</span>
              <span>{property.size}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Last updated: {property.lastUpdated}</p>
          </div>
        </div>
      ))}
      
      {/* Add new property card */}
      <div 
        onClick={() => router.push('/dashboard/my-house/create')}
        className="bg-gray-50 border border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
        style={{ minHeight: '320px' }}
      >
        <div className="text-center p-6">
          <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Add New Property</h3>
          <p className="mt-1 text-sm text-gray-500">Register another property in your account</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;