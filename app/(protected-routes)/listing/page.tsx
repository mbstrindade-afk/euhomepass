'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DateSelector from '../../../components/DateSelector';
import Header from '../../../components/Header';
import MessageHostButton from '../../../components/ui/MessageHostButton';

// Mock data for available houses
const availableHouses = [
  {
    id: 1,
    title: "Sunny duplex near the river",
    location: "Lisbon, Portugal",
    image: "/home.svg", 
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    wifi: 100,
    type: "Entire home",
    host: "Trusted Host",
    insurance: true,
    features: ["Balcony", "Wi-Fi"],
    price: {
      annual: { first: 400, subsequent: 600 }
    },
    months: ["Jan", "Feb", "Jul"],
  },
  {
    id: 2,
    title: "Canal-side apartment",
    location: "Amsterdam, Netherlands",
    image: "/home.svg",
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    wifi: 300,
    type: "Entire home",
    host: "Trusted Host",
    insurance: false,
    features: ["Deck", "Wi-Fi"],
    price: {
      annual: { first: 400, subsequent: 600 }
    },
    months: ["Apr", "May", "Jun"],
    isEUOnly: true,
    isVerified: true
  },
  {
    id: 3,
    title: "Bright flat by Retiro Park",
    location: "Madrid, Spain",
    image: "/home.svg",
    bedrooms: 2,
    bathrooms: 1,
    area: 72,
    wifi: 120,
    type: "Entire home",
    host: "Regular Host",
    insurance: true,
    features: ["Wi-Fi"],
    price: {
      annual: { first: 0, subsequent: 0 }
    },
    months: ["Feb", "Mar"],
    noBookingFees: true
  },
  {
    id: 4,
    title: "Scandi light, city center",
    location: "Stockholm, Sweden",
    image: "/home.svg",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    wifi: 250,
    type: "Entire home",
    host: "Trusted Host",
    insurance: false,
    features: ["Deck"],
    price: {
      annual: { first: 0, subsequent: 0 }
    },
    months: ["Sep", "Oct", "Nov"]
  },
  {
    id: 5,
    title: "Left Bank apartment",
    location: "Paris, France",
    image: "/home.svg",
    bedrooms: 1,
    bathrooms: 1,
    area: 48,
    wifi: 100,
    type: "Entire home",
    host: "Regular Host",
    insurance: true,
    features: ["Lift"],
    price: {
      annual: { first: 0, subsequent: 0 }
    },
    months: ["Jan", "Feb"],
    noDeposits: true
  },
  {
    id: 6,
    title: "Bay view loft",
    location: "Dublin, Ireland",
    image: "/home.svg",
    bedrooms: 0,
    bathrooms: 1,
    area: 42,
    wifi: 200,
    type: "Studio",
    host: "Trusted Host",
    insurance: false,
    features: ["Deck"],
    price: {
      annual: { first: 60, subsequent: 120 }
    },
    months: ["Mar", "Apr", "May"],
    isEUOnly: true,
    isVerified: true
  }
];

const ListingPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    month: "Any month",
    stayLength: "1-3 months"
  });
  
  const [filters, setFilters] = useState({
    entireHomes: true,
    hostNotPresent: false,
    insuranceIncluded: false,
    utilitiesFairUse: false,
    euCitizensOnly: false,
    verified: false,
    country: [] as string[],
    months: [] as string[],
    homeType: [] as string[],
    amenities: [] as string[],
    wifiSpeed: "",
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  });
  
  const [dateSelectionMode, setDateSelectionMode] = useState<'complete' | 'months'>('months');
  
  const [sortBy, setSortBy] = useState("Best match");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle search params change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type, value } = e.target;
    
    if (type === 'checkbox') {
      setFilters({
        ...filters,
        [name]: checked
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };
  
  // Handle array filter change (like countries, amenities, etc)
  const handleArrayFilterChange = (category: string, value: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        [category]: [...(filters as any)[category], value]
      });
    } else {
      setFilters({
        ...filters,
        [category]: (filters as any)[category].filter((item: string) => item !== value)
      });
    }
  };

  // Filter houses based on criteria
  const filteredHouses = availableHouses.filter(house => {
    // Filter by location
    if (searchParams.location && !house.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
      return false;
    }
    
    // Filter by EU citizens only
    if (filters.euCitizensOnly && !house.isEUOnly) {
      return false;
    }
    
    // Filter by verified
    if (filters.verified && !house.isVerified) {
      return false;
    }
    
    // Filter by insurance
    if (filters.insuranceIncluded && !house.insurance) {
      return false;
    }
    
    // Filter by country
    if (filters.country.length > 0) {
      const countryFromLocation = house.location.split(', ')[1];
      if (!filters.country.includes(countryFromLocation)) {
        return false;
      }
    }
    
    // Filter by availability (months or complete dates)
    if (dateSelectionMode === 'months' && filters.months.length > 0) {
      if (!house.months.some(month => filters.months.includes(month))) {
        return false;
      }
    } else if (dateSelectionMode === 'complete' && filters.dateRange.startDate && filters.dateRange.endDate) {
      // This is a simplified example since we don't have actual date ranges in our mock data
      // In a real implementation, you would check if the selected date range overlaps with available dates
      const selectedMonths = new Set();
      let currentDate = new Date(filters.dateRange.startDate);
      const endDate = new Date(filters.dateRange.endDate);
      
      while (currentDate <= endDate) {
        selectedMonths.add(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentDate.getMonth()]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      if (!house.months.some(month => selectedMonths.has(month))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const displayedHouses = filteredHouses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Header />
      {/* Search section */}
      <div className="bg-white shadow-sm border-b border-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              {/* Keep only the location search and Search button */}
              <div className="flex-1">
                <input
                  type="text"
                  name="location"
                  placeholder="City or country (e.g., Lisbon)"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchParams.location}
                  onChange={handleSearchChange}
                />
              </div>

              <div>
                <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-md">
                  Search
                </button>
              </div>
            </div>

            {/* Action button: List my House */}
            <div className="flex items-center">
              <Link href="/listing/create" className="ml-0 md:ml-4 inline-block bg-white border border-blue-500 text-blue-700 hover:bg-blue-100 font-medium py-2 px-4 rounded-md">
                List my House
              </Link>
            </div>
          </div>
          
          {/* Top-bar filter checkboxes removed (moved to sidebar) */}
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto py-8 px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-300">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
              
              {/* Country filters */}
              <div className="mb-6">
                <h3 className="text-slate-900 font-semibold uppercase uppercase tracking-wide mb-2 text-sm">Country</h3>
                {["Portugal", "Spain", "Germany", "Netherlands", "Ireland", "France"].map((country) => (
                  <label key={country} className="flex items-center mb-2 text-slate-900 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={filters.country.includes(country)}
                      onChange={(e) => handleArrayFilterChange('country', country, e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                    />
                    {country}
                  </label>
                ))}
              </div>
              
              {/* City filter */}
              <div className="mb-6">
                <h3 className="text-slate-900 font-semibold uppercase uppercase tracking-wide mb-2 text-sm">City</h3>
                <input
                  type="text"
                  placeholder="Type a city..."
                  className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              {/* Date Selection */}
              <div className="mb-6">
                <DateSelector
                  dateSelectionMode={dateSelectionMode}
                  onModeChange={setDateSelectionMode}
                  onDateRangeChange={(range) => {
                    setFilters(prev => ({
                      ...prev,
                      dateRange: range
                    }));
                  }}
                  onMonthsChange={(months) => {
                    setFilters(prev => ({
                      ...prev,
                      months: months
                    }));
                  }}
                  selectedDateRange={filters.dateRange}
                  selectedMonths={filters.months}
                  locale="en"
                  onDone={() => {
                    // Apply the date filters
                    console.log("Date selection done");
                    // You can add additional logic here if needed
                  }}
                />
              </div>
              
              {/* Home type */}
              <div className="mb-6">
                <h3 className="text-slate-900 font-semibold uppercase uppercase tracking-wide mb-2 text-sm">Home type</h3>
                {["Entire apartment", "Entire house"].map((type) => (
                  <label key={type} className="flex items-center mb-2 text-slate-900 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={filters.homeType.includes(type)}
                      onChange={(e) => handleArrayFilterChange('homeType', type, e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-slate-900 font-semibold uppercase uppercase tracking-wide mb-2 text-sm">Amenities</h3>
                {["Desk", "Balcony", "Lift", "Washing machine"].map((amenity) => (
                  <label key={amenity} className="flex items-center mb-2 text-slate-900 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => handleArrayFilterChange('amenities', amenity, e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
              
              {/* Wi-Fi speed */}
              <div className="mb-6">
                <h3 className="text-slate-900 font-semibold uppercase uppercase tracking-wide mb-2 text-sm">Wi-Fi speed (min)</h3>
                <select
                  name="wifiSpeed"
                  className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={filters.wifiSpeed}
                  onChange={(e) => handleFilterChange(e as any)}
                >
                  <option value="">Any</option>
                  <option value="50">50 Mbps</option>
                  <option value="100">100 Mbps</option>
                  <option value="200">200 Mbps</option>
                  <option value="300">300 Mbps</option>
                  <option value="1000">1 Gbps</option>
                </select>
              </div>
              
              {/* Apply filters button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md">
                Apply filters
              </button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Sort and count bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="font-medium text-lg">128 homes</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-900 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-none bg-transparent focus:ring-0 text-sm font-medium"
                  >
                    <option>Best match</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                    <option>Newest first</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* top-bar quick filters removed per design */}
              </div>
            </div>
            
            {/* House listings grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedHouses.length > 0 ? (
                displayedHouses.map(house => (
                  <div key={house.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300">
                    {/* House image */}
                    <div className="relative h-48 w-full">
                      <Image
                        src={house.image}
                        alt={house.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    
                    {/* House details */}
                    <div className="p-4">
                      {/* Title and location */}
                      <h2 className="text-lg font-semibold text-slate-900">{house.title}</h2>
                      <p className="text-sm text-slate-900 mb-3">{house.location}</p>
                      
                      {/* Home type and host type tags */}
                      <div className="flex gap-2 mb-2">
                        <span className="inline-block text-xs bg-blue-300 text-blue-900 px-2 py-1 rounded">
                          {house.type}
                        </span>
                        <span className="inline-block text-xs bg-blue-300 text-blue-900 px-2 py-1 rounded">
                          {house.host}
                        </span>
                      </div>
                      
                      {/* Annual pricing if available */}
                      {house.price.annual.first > 0 && (
                        <div className="text-sm text-slate-900 mb-2">
                          <span>Annual: first rate €{house.price.annual.first} to €{house.price.annual.subsequent}</span>
                        </div>
                      )}
                      
                      {/* No booking fees tag if applicable */}
                      {house.noBookingFees && (
                        <div className="text-sm text-slate-900 mb-2">
                          <span className="text-emerald-600">No booking fees. Insurance up to €3,000/day</span>
                        </div>
                      )}
                      
                      {/* House specs */}
                      <div className="flex items-center gap-2 text-slate-900 font-semibold mb-3 text-sm tracking-tight">
                        <div className="flex items-center">
                          {house.bedrooms} BR
                        </div>
                        <div className="flex items-center">
                          {house.area} m²
                        </div>
                        <div className="flex items-center">
                          Wi-Fi {house.wifi} Mbps
                        </div>
                        <div className="flex items-center">
                          {house.features && house.features.includes('Balcony') ? 'Balcony' : 
                           house.features && house.features.includes('Deck') ? 'Deck' : 
                           house.features && house.features.includes('Lift') ? 'Lift' : ''}
                        </div>
                      </div>
                      
                      {/* Available months */}
                      <div className="flex gap-2 mb-3 text-xs">
                        {house.months && house.months.map(month => (
                          <span key={month} className="px-2 py-1 rounded bg-gray-100">{month}</span>
                        ))}
                      </div>
                      
                      {/* EU Citizens only & verified badges */}
                      {house.isEUOnly && (
                        <div className="text-xs mb-2">
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            EU citizens only
                          </span>
                          {house.isVerified && (
                            <span className="inline-block bg-blue-300 text-blue-900 px-2 py-0.5 rounded ml-2">
                              ✓ verified
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Buttons */}
                      <div className="flex space-x-2 mt-2">
                        <Link href={`/listing/${house.id}`} className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md">
                          View details
                        </Link>
                        <MessageHostButton />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-slate-900">No houses match your filters. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-blue-700 hover:bg-blue-100'}`}
                >
                  Previous
                </button>
                
                <div className="mx-4">
                  Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </div>
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-700 hover:bg-blue-100'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;
