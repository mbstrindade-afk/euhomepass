'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../../components/Header';
import dynamic from 'next/dynamic';
import AnnualCalendar from '../../../../components/AnnualCalendar';
import AvailabilityManager from '../../../../components/AvailabilityManager';
import RulesSummary from '../../../../components/RulesSummary';

// Lazy load uploader (client only heavy)
const ListingPhotoUploader = dynamic(() => import('@/components/ListingPhotoUploader'), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-dashed border-sky-200 bg-sky-50/40 p-10 text-center text-sm text-sky-600">
      Loading photo uploader...
    </div>
  )
});

// Define interfaces for our form data
interface Period {
  startDate: string;
  endDate: string;
}

interface ListingFormData {
  title: string;
  country: string;
  city: string;
  address: string;
  homeType: string;
  size: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  description: string;
  amenities: string[];
  optionalAmenities: string[];
  wifi: string;
  kitchen: boolean;
  washingMachine: boolean;
  workspace: boolean;
  photos: File[];
  availability: string[];
  availabilityPeriods: Period[];
  smoking: string;
  pets: string;
  visitors: string;
  maxOccupancy: string;
  // Deprecated individual fields replaced by combined offLimitsAndBuildingRules
  offLimitsAreas: string; // legacy (can be ignored when combined used)
  valuablesConfirmed: boolean;
  // Additional house rules fields
  parties: string;
  quietHoursFrom: string;
  quietHoursTo: string;
  petRules: string;
  utilities: string;
  cleaningExpectations: string;
  buildingRules: string; // legacy
  offLimitsAndBuildingRules?: string; // new combined field
  safetyNotes: string;
  valuables: string;
  confirmValuables: boolean;
  confirmHomeEmpty: boolean;
  confirmPlatformRules: boolean;
}

const CreateListingPage = () => {
  // State for active step
  const [activeStep, setActiveStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // States for calendar management
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAvailabilityManager, setShowAvailabilityManager] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    country: 'Portugal',
    city: '',
    address: '',
    homeType: 'Entire house',
    size: '',
    bedrooms: '1',
    beds: '1',
    bathrooms: '1',
    description: '',
    amenities: ['Balcony', 'Lift', 'Desk', 'Baby cot'],
    optionalAmenities: [],
    wifi: '100',
    kitchen: false,
    washingMachine: false,
    workspace: false,
    photos: [],
    availability: ['Jan', 'Feb', 'Jul', 'Aug'],
    availabilityPeriods: [],
    smoking: 'Not allowed',
    pets: 'Not allowed',
    visitors: 'Quiet hours respected',
    maxOccupancy: '2',
    offLimitsAreas: '',
    valuablesConfirmed: true,
    // Additional house rules fields
    parties: 'Not allowed',
    quietHoursFrom: '22:00',
    quietHoursTo: '08:00',
    petRules: '',
    utilities: 'Standard Fair Use applies',
    cleaningExpectations: '',
    buildingRules: '',
    offLimitsAndBuildingRules: '',
    safetyNotes: '',
    valuables: 'Remove/lock all valuables (required)',
    confirmValuables: false,
    confirmHomeEmpty: false,
    confirmPlatformRules: false,
  });
  
  // Calculate completion percentage
  const calculateCompletion = () => {
    // Simple calculation for demonstration
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.entries(formData).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return true;
      return value !== '';
    }).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle toggle changes
  const handleToggle = (name: string) => {
    setFormData({ ...formData, [name]: !formData[name as keyof ListingFormData] });
  };

  // Handle availability periods change
  const handleAvailabilityChange = (periods: Period[]) => {
    setFormData({ ...formData, availabilityPeriods: periods });
  };

  // Toggle calendar visibility
  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  // Toggle availability manager visibility
  const handleAvailabilityManagerToggle = () => {
    setShowAvailabilityManager(!showAvailabilityManager);
  };

  // Toggle an amenity in the optionalAmenities array
  const toggleOptionalAmenity = (amenity: string) => {
    setFormData(prev => {
      const has = prev.optionalAmenities.includes(amenity);
      return {
        ...prev,
        optionalAmenities: has ? prev.optionalAmenities.filter(a => a !== amenity) : [...prev.optionalAmenities, amenity]
      } as ListingFormData;
    });
  };

  // Handle number-like inputs (kept as strings for simplicity)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // allow only digits
    const sanitized = value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, [name]: sanitized });
  };

  const computeSuggestedOccupancy = (bedrooms: number) => Math.max(1, bedrooms * 2);

  // Wi-Fi now stored as range code string (e.g., '50-99', '100-299', '2000+')
  const wifiValid = !!formData.wifi; // any selected option is valid (minimum starts at 50 Mbps)

  return (
    <div className="bg-[#f6f9fb] min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/listing" className="inline-flex items-center text-sky-600 hover:text-sky-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Takes 2/3 of the grid on large screens */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">List your home</h1>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`cursor-pointer rounded-lg p-3 text-center transition-colors ${
                    activeStep === step
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">Step {step}</div>
                  <div className="text-xs mt-1 opacity-75">
                    {step === 1 && 'Basic Info'}
                    {step === 2 && 'Details'}
                    {step === 3 && 'Photos'}
                    {step === 4 && 'Dates'}
                    {step === 5 && 'House Rules'}
                    {step === 6 && 'Review'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Profile completion</span>
                <span>{calculateCompletion()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-sky-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${calculateCompletion()}%` }}
                ></div>
              </div>
            </div>
            
            {/* Form Sections */}
            <div>
              {/* Step 1: Basic Information */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Listing Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        placeholder="E.g., Cozy apartment in city center"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        >
                          <option>Portugal</option>
                          <option>Spain</option>
                          <option>France</option>
                          <option>Italy</option>
                          <option>Germany</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                          placeholder="E.g., Lisbon"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        placeholder="Full address (will be shown after booking)"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="homeType" className="block text-sm font-medium text-gray-700 mb-1">
                          Home Type
                        </label>
                        <select
                          id="homeType"
                          name="homeType"
                          value={formData.homeType}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        >
                          <option>Entire house</option>
                          <option>Apartment</option>
                          <option>Villa</option>
                          <option>Cottage</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                          Size (sqm)
                        </label>
                        <input
                          type="number"
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                          placeholder="E.g., 85"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Next: Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {/* Step 2: Details */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                        <input
                          type="number"
                          id="bedrooms"
                          name="bedrooms"
                          min={1}
                          value={formData.bedrooms}
                          onChange={handleNumberChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                        <input
                          type="number"
                          id="beds"
                          name="beds"
                          min={1}
                          value={formData.beds}
                          onChange={handleNumberChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                        <input
                          type="number"
                          id="bathrooms"
                          name="bathrooms"
                          min={1}
                          value={formData.bathrooms}
                          onChange={handleNumberChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="maxOccupancy" className="block text-sm font-medium text-gray-700 mb-1">Maximum occupancy</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          id="maxOccupancy"
                          name="maxOccupancy"
                          min={1}
                          value={formData.maxOccupancy}
                          onChange={handleNumberChange}
                          className="w-32 rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        />
                        <div className="text-sm text-gray-500">(suggested = {computeSuggestedOccupancy(Number(formData.bedrooms))})</div>
                      </div>
                    </div>

                    <hr />

                    <fieldset className="space-y-4">
                      <legend className="text-md font-medium text-gray-800">B. Connectivity & essentials <span className="font-normal text-gray-500">(minimum)</span></legend>
                      <p className="text-xs text-gray-500 -mt-1">Ensure the basics for a good remote work experience.</p>
                      <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-4 space-y-6">
                        {/* Wi‑Fi speed (range select) */}
                        <div>
                          <label htmlFor="wifi" className="block text-sm font-medium text-gray-700">Wi‑Fi speed</label>
                          <div className="mt-1 max-w-xs">
                            <select
                              id="wifi"
                              name="wifi"
                              aria-describedby="wifi-help"
                              aria-invalid={!wifiValid}
                              value={formData.wifi}
                              onChange={(e) => setFormData({ ...formData, wifi: e.target.value })}
                              className={`block w-full rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 ${!wifiValid ? 'border-red-400 focus:border-red-500 focus:ring-red-500 border' : 'border border-gray-300'}`}
                            >
                              <option value="">Select speed</option>
                              <option value="50-99">50 - 99 Mbps (minimum acceptable)</option>
                              <option value="100-299">100 - 299 Mbps</option>
                              <option value="300-499">300 - 499 Mbps</option>
                              <option value="500-999">500 - 999 Mbps</option>
                              <option value="1000-1999">1000 - 1999 Mbps</option>
                              <option value="2000+">2000+ Mbps</option>
                            </select>
                          </div>
                          <p id="wifi-help" className="mt-1 text-xs text-gray-500">Choose the range that best represents your connection. Minimum recommended 50 Mbps for stable video calls.</p>
                        </div>

                        {/* Essentials toggles */}
                        <div className="space-y-3">
                          <span className="block text-sm font-medium text-gray-700">Essentials</span>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Kitchen */}
                            <button
                              type="button"
                              onClick={() => handleToggle('kitchen')}
                              aria-pressed={formData.kitchen}
                              className={`group flex items-start gap-2 rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${formData.kitchen ? 'border-sky-500 bg-white shadow-sm' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                            >
                              <span className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border text-[10px] font-bold ${formData.kitchen ? 'bg-sky-600 border-sky-600 text-white' : 'border-gray-300 text-transparent group-hover:text-gray-300'}`}>✓</span>
                              <span>
                                <span className="block text-sm font-medium text-gray-800">Equipped kitchen</span>
                                <span className="block text-[11px] text-gray-500">Stove, refrigerator & utensils</span>
                              </span>
                            </button>

                            {/* Washing Machine */}
                            <button
                              type="button"
                              onClick={() => handleToggle('washingMachine')}
                              aria-pressed={formData.washingMachine}
                              className={`group flex items-start gap-2 rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${formData.washingMachine ? 'border-sky-500 bg-white shadow-sm' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                            >
                              <span className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border text-[10px] font-bold ${formData.washingMachine ? 'bg-sky-600 border-sky-600 text-white' : 'border-gray-300 text-transparent group-hover:text-gray-300'}`}>✓</span>
                              <span>
                                <span className="block text-sm font-medium text-gray-800">Washing machine</span>
                                <span className="block text-[11px] text-gray-500">Washer available</span>
                              </span>
                            </button>

                            {/* Workspace */}
                            <button
                              type="button"
                              onClick={() => handleToggle('workspace')}
                              aria-pressed={formData.workspace}
                              className={`group flex items-start gap-2 rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 sm:col-span-2 lg:col-span-1 ${formData.workspace ? 'border-sky-500 bg-white shadow-sm' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                            >
                              <span className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border text-[10px] font-bold ${formData.workspace ? 'bg-sky-600 border-sky-600 text-white' : 'border-gray-300 text-transparent group-hover:text-gray-300'}`}>✓</span>
                              <span>
                                <span className="block text-sm font-medium text-gray-800">Workspace / desk</span>
                                <span className="block text-[11px] text-gray-500">Dedicated desk & comfortable chair</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    <hr />

                    <h3 className="text-md font-medium text-gray-800">C. Optional amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["Elevator", "Balcony/Terrace", "Garden", "Parking", "Heating/AC", "Baby cot", "TV", "Accessibility (ramp/wide door)", "Smart lock"].map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input type="checkbox" checked={formData.optionalAmenities.includes(amenity)} onChange={() => toggleOptionalAmenity(amenity)} className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setActiveStep(1)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button onClick={() => setActiveStep(3)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700">
                      Next: Photos
                    </button>
                  </div>
                </div>
              )}
              {/* Step 3: Photos */}
              {activeStep === 3 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Photos</h2>
                  <p className="text-sm text-gray-600 mb-2">High-quality photos increase trust and booking rate. Upload sharp, well‑lit images, starting with the exterior and the main work and living areas.</p>
                  <p className="text-sm font-medium text-sky-700 mb-6">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Minimum required: 8 photos ({formData.photos.length}/8)
                    </span>
                  </p>

                  <ListingPhotoUploader
                    value={formData.photos}
                    onChange={(files) => setFormData({ ...formData, photos: files })}
                    onUploaded={(urls) => {
                      // We could store URLs in a future field (e.g., photosUrls) if it existed.
                      // For now, just log.
                      console.log('Uploaded URLs', urls);
                    }}
                    minPhotos={8}
                    maxPhotos={15}
                  />

                  {formData.photos.length < 8 && formData.photos.length > 0 && (
                    <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-800">
                            More photos needed
                          </h3>
                          <div className="mt-2 text-sm text-amber-700">
                            <p>You need to upload at least {8 - formData.photos.length} more photos to continue. Quality photos help build trust with potential guests.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setActiveStep(2)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button 
                      onClick={() => setActiveStep(4)} 
                      disabled={formData.photos.length < 8} 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={formData.photos.length < 8 ? `Please upload at least 8 photos (currently ${formData.photos.length})` : ''}
                    >
                      Next: Dates
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Dates */}
              {activeStep === 4 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Set Your Availability</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-700">
                      <p>Set the periods when your home is available for exchange. You can use the calendar view for detailed date selection or add specific months.</p>
                    </div>
                  </div>

                  {/* Calendar View Button */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Calendar View</h3>
                      <button
                        onClick={handleCalendarToggle}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                      >
                        <span>Calendar View</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                    
                    {showCalendar && (
                      <AnnualCalendar
                        year={2025}
                        reservedPeriods={[]}
                        availablePeriods={formData.availabilityPeriods}
                        isModal={true}
                        onClose={handleCalendarToggle}
                        locale="en"
                      />
                    )}
                  </div>

                  {/* Current Availability Periods */}
                  {formData.availabilityPeriods.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Availability Periods</h3>
                      <div className="space-y-2">
                        {formData.availabilityPeriods.map((period, index) => (
                          <div key={index} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
                            <span className="text-sm text-sky-800">
                              {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => {
                                const newPeriods = formData.availabilityPeriods.filter((_, i) => i !== index);
                                handleAvailabilityChange(newPeriods);
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Availability Periods */}
                  <div className="mb-6">
                    <button
                      onClick={handleAvailabilityManagerToggle}
                      className="flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      Add availability periods
                    </button>

                    {showAvailabilityManager && (
                      <div className="mt-4">
                        <AvailabilityManager 
                          availability={formData.availabilityPeriods} 
                          onAvailabilityChange={handleAvailabilityChange} 
                        />
                      </div>
                    )}
                  </div>

                  {/* Monthly Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Month Selection</h3>
                    <p className="text-sm text-gray-600 mb-4">Select the months when your home is generally available.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                        <button
                          key={month}
                          onClick={() => {
                            const newAvailability = formData.availability.includes(month)
                              ? formData.availability.filter(m => m !== month)
                              : [...formData.availability, month];
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            formData.availability.includes(month)
                              ? 'bg-sky-100 border-2 border-sky-300 text-sky-800'
                              : 'bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button 
                      onClick={() => setActiveStep(3)} 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => setActiveStep(5)} 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
                    >
                      Next: House Rules
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 5: House Rules */}
              {activeStep === 5 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">House Rules</h2>
                    <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold">
                      Entire homes only · Host not present
                    </span>
                  </div>

                  <div className="bg-blue-50 border border-dashed border-blue-200 rounded-xl p-4 mb-6">
                    <strong>Clear rules = better matches.</strong> Guests must follow your rules. 
                    Your exact address stays hidden until a booking is confirmed.
                  </div>

                  <div className="space-y-8">
                    {/* Smoking & Parties */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Smoking & Parties</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smoking
                          </label>
                          <select
                            name="smoking"
                            value={formData.smoking}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Not allowed">Not allowed</option>
                            <option value="Balcony only">Balcony only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parties/events
                          </label>
                          <select
                            name="parties"
                            value={formData.parties || 'Not allowed'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Not allowed">Not allowed</option>
                            <option value="Small gatherings (on request)">Small gatherings (on request)</option>
                          </select>
                        </div>
                      </div>
                    </section>

                    {/* Quiet hours & Visitors */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Quiet hours & Visitors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quiet hours
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="time"
                              name="quietHoursFrom"
                              value={formData.quietHoursFrom || '22:00'}
                              onChange={handleInputChange}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              name="quietHoursTo"
                              value={formData.quietHoursTo || '08:00'}
                              onChange={handleInputChange}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Local building rules may apply.
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visitors
                          </label>
                          <select
                            name="visitors"
                            value={formData.visitors}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Allowed with building rules">Allowed with building rules</option>
                            <option value="On request">On request</option>
                            <option value="Not allowed">Not allowed</option>
                          </select>
                        </div>
                      </div>
                    </section>

                    {/* Pets */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Pets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pets policy
                          </label>
                          <select
                            name="pets"
                            value={formData.pets}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Not allowed">Not allowed</option>
                            <option value="Allowed (Host rules apply)">Allowed (Host rules apply)</option>
                          </select>
                          <span className="text-xs text-gray-500 mt-1 block">
                            If allowed, you define the house rules below.
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pet rules (if allowed)
                          </label>
                          <input
                            type="text"
                            name="petRules"
                            value={formData.petRules || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., max 1, no sofa, not left alone >4h"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-dashed border-blue-200 rounded-xl p-4 mt-2">
                        <strong>Important:</strong> Pet-related issues (damage, cleaning, odors) are handled privately between Host & Guest.
                        HomePass does not mediate, process payments, or cover these under insurance/Fund.
                      </div>
                    </section>

                    {/* Utilities & Cleaning */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Utilities & Cleaning</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Utilities — Fair Use
                          </label>
                          <select
                            name="utilities"
                            value={formData.utilities || 'Standard Fair Use applies'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Standard Fair Use applies">Standard Fair Use applies</option>
                            <option value="Custom note">Custom note</option>
                          </select>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Abnormal usage can be claimed (per rules). No off-platform payments.
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cleaning expectations
                          </label>
                          <input
                            type="text"
                            name="cleaningExpectations"
                            value={formData.cleaningExpectations || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., basic tidy-up; take trash out; return keys"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Off-limits & Building rules */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Off-limits & Building rules</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Off-limits & Building rules (optional)
                        </label>
                        <textarea
                          name="offLimitsAndBuildingRules"
                          value={formData.offLimitsAndBuildingRules || ''}
                          onChange={handleInputChange}
                          placeholder="Off-limits: storage room; owner's wardrobe (locked); utility closet. Building: no noise after 22:00; recycling on level -1; register visitors with concierge."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-y"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Combine areas guests must not access and any building / condo rules (quiet hours, visitor process, recycling, elevator use, etc.).
                        </p>
                      </div>
                    </section>

                    {/* Safety & Valuables */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">Safety & Valuables</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Safety notes (optional)
                          </label>
                          <input
                            type="text"
                            name="safetyNotes"
                            value={formData.safetyNotes || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., gas shutoff under sink; emergency numbers in House Guide"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valuables policy
                          </label>
                          <select
                            name="valuables"
                            value={formData.valuables || 'Remove/lock all valuables (required)'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="Remove/lock all valuables (required)">Remove/lock all valuables (required)</option>
                          </select>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Cash, jewellery, fine art, documents, high-value electronics must be locked or removed.
                          </span>
                        </div>
                      </div>
                    </section>

                    {/* Confirmations */}
                    <section className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Confirmations</h3>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="confirmValuables"
                            checked={formData.confirmValuables || false}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          />
                          <span className="text-sm">
                            I confirm I will remove/lock valuables. I understand valuables are not covered by insurance.
                          </span>
                        </label>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="confirmHomeEmpty"
                            checked={formData.confirmHomeEmpty || false}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          />
                          <span className="text-sm">
                            I confirm the home will be empty (host not present) and cleaned before guest arrival.
                          </span>
                        </label>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="confirmPlatformRules"
                            checked={formData.confirmPlatformRules || false}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          />
                          <span className="text-sm">
                            I agree to the platform rules: Entire homes; Max 3 months/home; Fair Use utilities; No off-platform payments.
                          </span>
                        </label>
                      </div>
                    </section>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button 
                      onClick={() => setActiveStep(4)} 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => {
                        if (formData.confirmValuables && formData.confirmHomeEmpty && formData.confirmPlatformRules) {
                          setActiveStep(6);
                        }
                      }}
                      disabled={!(formData.confirmValuables && formData.confirmHomeEmpty && formData.confirmPlatformRules)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={!(formData.confirmValuables && formData.confirmHomeEmpty && formData.confirmPlatformRules) ? 'Marque todas as confirmações para continuar' : ''}
                    >
                      Next: Review
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 6: Review and Submit */}
              {activeStep === 6 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Review and Submit</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-700">
                      <p>Please review your listing details before submitting. Once submitted, your listing will be reviewed by our team before being published.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Basic Information</h3>
                      <div className="bg-white rounded border border-gray-200 p-3">
                        <p><span className="font-medium">Title:</span> {formData.title || 'Not specified'}</p>
                        <p><span className="font-medium">Location:</span> {formData.city ? `${formData.city}, ${formData.country}` : formData.country}</p>
                        <p><span className="font-medium">Type:</span> {formData.homeType}</p>
                        <p><span className="font-medium">Size:</span> {formData.size ? `${formData.size} sqm` : 'Not specified'}</p>
                      </div>
                    </div>
                    
                    {/* More review sections would go here */}
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-sky-600 hover:text-sky-500">terms and conditions</a> and certify that all information provided is accurate.
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveStep(5)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!termsAccepted}
                      title={!termsAccepted ? 'Tem de aceitar os termos antes de submeter' : ''}
                    >
                      Submit Listing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar - Takes 1/3 of the grid on large screens */}
          <div className="lg:col-span-1">
            {activeStep === 5 ? (
              <RulesSummary formData={formData} />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{activeStep === 3 ? 'Photo Tips' : 'Listing Tips'}</h2>
                {activeStep !== 3 && (
                  <div className="space-y-4" key="default-tips">
                    <Tip iconPath="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" title="Be accurate" desc="Provide detailed and honest information about your home to set the right expectations." />
                    <Tip iconPath="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H5.5z" title="High-quality photos" desc="Upload clear, well-lit photos showcasing your home's best features." />
                    <Tip iconPath="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" title="Highlight unique features" desc="Mention unique amenities or nearby attractions." />
                    <Tip iconPath="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1-1-1H3v-1l1-1-1-1V8a6 6 0 1112 0zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" title="Set clear house rules" desc="Establish clear expectations for guests staying in your home." />
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="space-y-4" key="photo-tips">
                    <Tip title="Natural light" desc="Shoot during the day with curtains open. Avoid mixing different light temperatures." />
                    <Tip title="Consistent angles" desc="Take photos at waist or chest height. 2–3 photos per room are enough." />
                    <Tip title="Privacy" desc="Remove personal objects, family photos and documents before shooting." />
                    <Tip title="Security" desc="Don't show codes, keys or alarm systems. Avoid revealing the exact location in exterior shots." />
                    <Tip title="Recommended sequence" desc="Exterior, entry, living room, kitchen, workspace, bedroom(s), bathroom, extra exterior (balcony/garden)." />
                    <div className="rounded-md bg-sky-50 p-3 text-xs text-sky-700">Photos undergo human review to ensure they meet quality and safety standards before going live.</div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Need assistance?</h3>
                  <p className="mt-1 text-sm text-gray-500">Our team is here to help you create the perfect listing.</p>
                  <a href="#" className="mt-3 inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-500">
                    Contact support
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;

// Reusable tip component inline to avoid extra file
interface TipProps { title: string; desc: string; iconPath?: string; }
const Tip: React.FC<TipProps> = ({ title, desc, iconPath }) => (
  <div className="flex">
    {iconPath && (
      <div className="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
        </svg>
      </div>
    )}
    <div className={iconPath ? 'ml-3' : ''}>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);