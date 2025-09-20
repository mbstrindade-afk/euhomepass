import { NextRequest, NextResponse } from 'next/server';

// Mock data representing listings from users (simulating database data)
const userListings = [
  {
    id: 1,
    title: "Home in Porto",
    description: "Available home in Porto",
    city: "Porto",
    country: "Portugal",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 1,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-08-15",
    lastUpdated: "2024-09-10"
  },
  {
    id: 2,
    title: "Home in Barcelona",
    description: "Available home in Barcelona",
    city: "Barcelona",
    country: "Spain",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 2,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-07-20",
    lastUpdated: "2024-09-05"
  },
  {
    id: 3,
    title: "Home in Amsterdam",
    description: "Available home in Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    type: "House",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 3,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-06-10",
    lastUpdated: "2024-08-30"
  },
  {
    id: 4,
    title: "Home in Paris",
    description: "Available home in Paris",
    city: "Paris",
    country: "France",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 4,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-05-25",
    lastUpdated: "2024-09-01"
  },
  {
    id: 5,
    title: "Home in Rome",
    description: "Available home in Rome",
    city: "Rome",
    country: "Italy",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 5,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-04-18",
    lastUpdated: "2024-08-20"
  },
  {
    id: 6,
    title: "Home in Copenhagen",
    description: "Available home in Copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 6,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-03-12",
    lastUpdated: "2024-08-15"
  },
  {
    id: 7,
    title: "Home in Prague",
    description: "Available home in Prague",
    city: "Prague",
    country: "Czech Republic",
    type: "House",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 7,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-02-28",
    lastUpdated: "2024-07-25"
  },
  {
    id: 8,
    title: "Home in Vienna",
    description: "Available home in Vienna",
    city: "Vienna",
    country: "Austria",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 8,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-01-20",
    lastUpdated: "2024-07-10"
  },
  {
    id: 9,
    title: "Home in Lisbon",
    description: "Available home in Lisbon",
    city: "Lisbon",
    country: "Portugal",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 9,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2024-01-05",
    lastUpdated: "2024-06-30"
  },
  {
    id: 10,
    title: "Home in Stockholm",
    description: "Available home in Stockholm",
    city: "Stockholm",
    country: "Sweden",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 10,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2023-12-15",
    lastUpdated: "2024-06-15"
  },
  {
    id: 11,
    title: "Home in Brussels",
    description: "Available home in Brussels",
    city: "Brussels",
    country: "Belgium",
    type: "House",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 11,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2023-11-20",
    lastUpdated: "2024-05-20"
  },
  {
    id: 12,
    title: "Home in Dublin",
    description: "Available home in Dublin",
    city: "Dublin",
    country: "Ireland",
    type: "House",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: {
      amount: 0,
      currency: "€",
      period: "month"
    },
    hostId: 12,
    hostName: "",
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: "2023-10-10",
    lastUpdated: "2024-05-05"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters for filtering
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null;
    const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : null;
    const onlyActive = searchParams.get('active') !== 'false'; // default to true
    const onlyVerified = searchParams.get('verified') === 'true';

    // Filter listings based on query parameters
    let filteredListings = userListings.filter(listing => {
      if (onlyActive && !listing.isActive) return false;
      if (onlyVerified && !listing.isVerified) return false;
      if (city && listing.city.toLowerCase() !== city.toLowerCase()) return false;
      if (country && listing.country.toLowerCase() !== country.toLowerCase()) return false;
      if (type && listing.type.toLowerCase() !== type.toLowerCase()) return false;
      if (bedrooms !== null && listing.bedrooms !== bedrooms) return false;
      if (minPrice && listing.price.amount < minPrice) return false;
      if (maxPrice && listing.price.amount > maxPrice) return false;
      
      return true;
    });

    // Sort by creation date (newest first)
    filteredListings = filteredListings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply pagination
    const paginatedListings = filteredListings.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        listings: paginatedListings,
        pagination: {
          total: filteredListings.length,
          limit,
          offset,
          hasMore: offset + limit < filteredListings.length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch listings' 
      },
      { status: 500 }
    );
  }
}