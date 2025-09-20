'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ChatModal from '../../../../components/ui/ChatModal';

interface PropertyDetails {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  amenities: string[];
  maxGuests: number;
  host: {
    id: string;
    name: string;
    rating: number;
    memberSince: string;
  };
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const rawId = params?.id;
  const propertyId = Array.isArray(rawId)
    ? parseInt(rawId[0] ?? '0', 10)
    : parseInt((rawId as string | undefined) ?? '0', 10);
  const [showChatModal, setShowChatModal] = useState(false);
  
  // Mock property data (in a real app, you would fetch this from an API based on propertyId)
  const property: PropertyDetails = {
    id: propertyId,
    title: "Modern Villa with Ocean View",
    location: "Lisbon, Portugal",
    description: "Enjoy this beautiful modern villa with stunning ocean views. Perfect for families or groups of friends looking for a peaceful retreat. The villa is located in a quiet neighborhood but close to local attractions and restaurants.",
    image: "/home.svg",
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    amenities: ["Wi-Fi", "Air conditioning", "Pool", "Kitchen", "Parking", "Washing machine", "Patio", "BBQ"],
    maxGuests: 6,
    host: {
      id: "host-123", // Mock host ID
      name: "Maria",
      rating: 4.9,
      memberSince: "2023"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/listing" className="inline-flex items-center text-sky-600 hover:text-sky-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Listings
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Property Images */}
          <div className="relative h-96 w-full">
            <Image
              src={property.image}
              alt={property.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          
          <div className="p-6">
            {/* Property Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
                <p className="text-lg text-slate-900 mt-1">{property.location}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {property.rating} rating
                </div>
              </div>
            </div>
            
            {/* Property Info */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">About this property</h2>
                  <p className="text-slate-900">{property.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Property features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-900">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-slate-900 font-medium">{property.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-slate-900 font-medium">{property.bathrooms} bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-slate-900 font-medium">Max {property.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center text-slate-900 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-900 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Removed "Detalhes Adicionais" section */}
            </div>
            
            {/* Host Info */}
            <div className="mt-8 border-t border-gray-300 pt-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">About the host</h2>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-slate-900">{property.host.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Hosted by {property.host.name}</h3>
                    <p className="text-slate-900 text-sm">Member since {property.host.memberSince} · {property.host.rating} rating</p>
                  </div>
                </div>
                <button 
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() => setShowChatModal(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Host
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chat Modal */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        initialReceiverId={property.host.id}
        initialListingId={propertyId.toString()}
        initialMessage={`Hi, I'm interested in your property "${property.title}"`}
      />
    </div>
  );
}
