'use client';

import { useAuth } from '../../../../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import AnnualCalendar from '../../../../../components/AnnualCalendar';
import AvailabilityManager from '../../../../../components/AvailabilityManager';
import { useTranslation } from 'react-i18next';
import { Property } from '../../../../../components/PropertyList';

interface ReservedPeriod {
  startDate: string;
  endDate: string;
}

export default function ManageAvailabilityPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const { t, i18n } = useTranslation(['common']);
  
  // Sample properties data (in a real app, this would come from a database)
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
        { startDate: '2025-09-10', endDate: '2025-09-15' },
        { startDate: '2025-10-20', endDate: '2025-10-30' },
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
        { startDate: '2025-12-24', endDate: '2025-12-31' }
      ]
    }
  ]);

  // Estado para controlar a visibilidade do modal do calendário
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Get reserved periods from the selected property
  const [reservedPeriods, setReservedPeriods] = useState<ReservedPeriod[]>([]);
  
  // Estado para os períodos disponíveis (marcados pelo usuário no AvailabilityManager)
  const [availablePeriods, setAvailablePeriods] = useState<ReservedPeriod[]>([]);

  // Load the property data when the component mounts
  useEffect(() => {
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property);
        
        // Set reserved periods from the property
        if (property.availability && property.availability.length > 0) {
          setReservedPeriods(property.availability);
          setAvailablePeriods(property.availability);
        }
      }
    } else if (properties.length > 0) {
      // Default to first property if no ID specified
      setSelectedProperty(properties[0]);
      
      if (properties[0].availability && properties[0].availability.length > 0) {
        setReservedPeriods(properties[0].availability);
        setAvailablePeriods(properties[0].availability);
      }
    }
  }, [propertyId, properties]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  const handleAddReservedPeriod = (newPeriod: ReservedPeriod): void => {
    setReservedPeriods([...reservedPeriods, newPeriod]);
  };

  const handleRemoveReservedPeriod = (index: number): void => {
    const updatedPeriods = [...reservedPeriods];
    updatedPeriods.splice(index, 1);
    setReservedPeriods(updatedPeriods);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedProperty ? `${t('Manage Availability')}: ${selectedProperty.title}` : t('Manage House Availability')}
              </h1>
              <p className="text-gray-600">
                {selectedProperty?.address || t('Mark the periods when your house will be available')}
              </p>
              <p className="text-sm mt-1 text-blue-600">
                {t('Availability must be set in full month periods (minimum 1 month)')}
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/my-house' + (propertyId ? `?propertyId=${propertyId}` : ''))}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t('Back to My House')}
            </button>
          </div>

          {/* Annual Calendar */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{t('Annual View')}</h2>
            
            <button 
              onClick={() => setShowCalendarModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t('View Full Calendar')}
            </button>
            
            {/* Calendário normal para visualização */}
            <div className="mt-4">
              <AnnualCalendar
                year={2025}
                reservedPeriods={reservedPeriods}
                availablePeriods={availablePeriods}
                locale={i18n.language === 'pt' ? 'pt' : 'en'}
              />
            </div>
            
            {/* Modal do calendário */}
            {showCalendarModal && (
              <AnnualCalendar
                year={2025}
                reservedPeriods={reservedPeriods}
                availablePeriods={availablePeriods}
                locale={i18n.language === 'pt' ? 'pt' : 'en'}
                isModal={true}
                onClose={() => setShowCalendarModal(false)}
              />
            )}
          </div>

          {/* Available Periods Management */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{t('Mark Your Availability')}</h2>
            <p className="text-gray-600 mb-4">
              {t('Select periods when your house is available for exchange')}
            </p>
            <div className="mb-6">
              <AvailabilityManager 
                availability={availablePeriods} 
                onAvailabilityChange={periods => setAvailablePeriods(periods)} 
              />
            </div>
          </div>
          
          {/* Reserved Periods Management */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{t('Manage Reserved Periods')}</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('Start Date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('End Date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('Duration')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('Actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservedPeriods.map((period, index) => {
                    const startDate = new Date(period.startDate);
                    const endDate = new Date(period.endDate);
                    const durationMs = endDate.getTime() - startDate.getTime();
                    const durationInDays = Math.floor(durationMs / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(period.startDate).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(period.endDate).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {durationInDays} {durationInDays === 1 ? t('day') : t('days')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRemoveReservedPeriod(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            {t('Remove')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Add New Reserved Period (placeholder - you would need a proper date picker) */}
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={() => {
                  // This is a placeholder. In a real app, you would open a date picker
                  // and add the selected period after user confirmation
                  const now = new Date();
                  const startDate = now.toISOString().split('T')[0];
                  const endDate = new Date(now.setDate(now.getDate() + 5)).toISOString().split('T')[0];
                  
                  handleAddReservedPeriod({
                    startDate,
                    endDate
                  });
                }}
              >
                {t('Add New Reserved Period')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
