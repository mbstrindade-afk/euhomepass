'use client';

import React from 'react';

interface CommunityActivityProps {
  viewingRequests?: number;
  saves?: number;
  exchangeOffers?: number;
  className?: string;
}

const CommunityActivity: React.FC<CommunityActivityProps> = ({
  viewingRequests = 3,
  saves = 12,
  exchangeOffers = 2,
  className = ""
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Community Activity</h2>
      <div className="space-y-4">
        <div className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">{viewingRequests} Viewing Requests</h3>
            <p className="text-xs text-blue-700">Last 30 days</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">{saves} Saves</h3>
            <p className="text-xs text-blue-700">By members</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">{exchangeOffers} Exchange Offers</h3>
            <p className="text-xs text-blue-700">Current opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityActivity;