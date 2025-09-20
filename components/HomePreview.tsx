'use client';

import Image from 'next/image';

interface HomePreviewProps {
  listing: {
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
  };
  showDetails?: boolean;
}

export default function HomePreview({ listing, showDetails = false }: HomePreviewProps) {
  const getPropertyTypeDisplay = (type: string) => {
    const types: { [key: string]: string } = {
      'Apartment': 'Apartment',
      'House': 'House',
      'Loft': 'Loft',
      'Studio': 'Studio',
      'Townhouse': 'Townhouse',
      'Villa': 'Villa'
    };
    return types[type] || type;
  };

  const formatPrice = (price: typeof listing.price) => {
    if (price.amount === 0) return '';
    return `${price.currency}${price.amount}/${price.period === 'month' ? 'month' : price.period}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={listing.images[0] || "/home.svg"}
          alt={`${listing.title} em ${listing.city}, ${listing.country}`}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Property type badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700">
          {getPropertyTypeDisplay(listing.type)}
        </div>
        
        {/* Verification badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.isVerified && (
            <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Verified
            </div>
          )}
          {listing.euOnly && (
            <div className="bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white">
              EU Only
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Title and location */}
        <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-slate-600 text-sm flex items-center mb-3">
          <span className="mr-1">📍</span>
          {listing.city}, {listing.country}
        </p>
        
        {/* Property details - only show if values exist */}
        {(listing.bedrooms > 0 || listing.bathrooms > 0 || listing.area > 0) && (
          <div className="flex items-center text-sm text-slate-600 mb-3 space-x-4">
            {listing.bedrooms > 0 && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {listing.bedrooms} bedroom{listing.bedrooms > 1 ? 's' : ''}
              </div>
            )}
            {listing.bathrooms > 0 && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {listing.bathrooms} bathroom{listing.bathrooms > 1 ? 's' : ''}
              </div>
            )}
            {listing.area > 0 && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {listing.area}m²
              </div>
            )}
          </div>
        )}
        
        {/* Amenities preview - only show if amenities exist */}
        {listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {listing.amenities.length > 3 && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Host info and price - only show if hostName exists */}
        <div className="flex items-center justify-between">
          {listing.hostName && (
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium">{listing.hostName.charAt(0)}</span>
              </div>
              <span>{listing.hostName}</span>
              {listing.hostRating > 0 && (
                <span className="ml-1 text-yellow-500">★{listing.hostRating}</span>
              )}
            </div>
          )}
          
          {showDetails && (
            <div className="text-right">
              <div className="font-bold text-slate-800">{formatPrice(listing.price)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}