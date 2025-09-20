import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Minimum booking period in days
const MIN_BOOKING_DAYS = 30;

interface Period {
  startDate: string;
  endDate: string;
}

interface AvailabilityManagerProps {
  availability?: Period[];
  onAvailabilityChange?: (periods: Period[]) => void;
}

const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({ 
  availability = [], 
  onAvailabilityChange 
}) => {
  // State for selected date range
  const [selectionState, setSelectionState] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), MIN_BOOKING_DAYS),
    key: 'selection'
  });

  // State for storing availability periods
  const [availabilityPeriods, setAvailabilityPeriods] = useState<Period[]>(availability);
  
  // State for error messages
  const [error, setError] = useState('');
  
  // State for tracking selected duration
  const [selectedDuration, setSelectedDuration] = useState(MIN_BOOKING_DAYS);
  
  // Calculate duration between selected dates
  const calculateDuration = (start: Date, end: Date) => {
    return differenceInDays(end, start);
  };

  // Update the selected duration whenever the date range changes
  useEffect(() => {
    const duration = calculateDuration(selectionState.startDate, selectionState.endDate);
    setSelectedDuration(duration);
  }, [selectionState.startDate, selectionState.endDate]);

  // Sync with props when they change
  useEffect(() => {
    if (availability) {
      setAvailabilityPeriods(availability);
    }
  }, [availability]);

  // Handle date range selection
  const handleRangeSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const duration = calculateDuration(startDate, endDate);
    setSelectionState({
      startDate,
      endDate,
      key: 'selection'
    });
    if (duration < MIN_BOOKING_DAYS) {
      setError(`Selecione pelo menos ${MIN_BOOKING_DAYS} dias consecutivos.`);
    } else {
      setError('');
    }
  };

  // Add new availability period
  const addAvailability = () => {
    // Verify the selected period is at least MIN_BOOKING_DAYS
    const duration = calculateDuration(selectionState.startDate, selectionState.endDate);
    
    if (duration < MIN_BOOKING_DAYS) {
      setError(`Selection must be at least ${MIN_BOOKING_DAYS} consecutive days`);
      return;
    }

    const newPeriod = {
      startDate: format(selectionState.startDate, 'yyyy-MM-dd'),
      endDate: format(selectionState.endDate, 'yyyy-MM-dd')
    };

    const updatedPeriods = [...availabilityPeriods, newPeriod];
    setAvailabilityPeriods(updatedPeriods);
    
    // Call the onChange prop if provided
    if (onAvailabilityChange) {
      onAvailabilityChange(updatedPeriods);
    }
    
    setError('');
  };

  // Remove availability period
  const removeAvailability = (index: number) => {
    const updatedPeriods = availabilityPeriods.filter((_, idx) => idx !== index);
    setAvailabilityPeriods(updatedPeriods);
    
    // Call the onChange prop if provided
    if (onAvailabilityChange) {
      onAvailabilityChange(updatedPeriods);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> A minimum booking period of {MIN_BOOKING_DAYS} consecutive days is required.
          Your selection will be automatically adjusted to meet this requirement.
        </p>
      </div>

      <div className="mb-4">
        <DateRange
          editableDateInputs={true}
          onChange={handleRangeSelect}
          moveRangeOnFirstSelection={false}
          ranges={[selectionState]}
          minDate={new Date()}
          className="border rounded"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="text-sm">
          Selected period: <span className="font-semibold">
            {format(selectionState.startDate, 'PPP')} to {format(selectionState.endDate, 'PPP')}
          </span>
          <span className="ml-2 text-blue-600">
            ({selectedDuration} days)
          </span>
        </div>
        
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        <button
          onClick={addAvailability}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center${selectedDuration < MIN_BOOKING_DAYS ? ' opacity-50 cursor-not-allowed' : ''}`}
          disabled={selectedDuration < MIN_BOOKING_DAYS}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Availability Period (30+ Days)
        </button>
      </div>

      {availabilityPeriods.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Added Availability Periods</h3>
          <ul className="space-y-2">
            {availabilityPeriods
              .filter(period => differenceInDays(new Date(period.endDate), new Date(period.startDate)) >= MIN_BOOKING_DAYS)
              .map((period, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                  <span>
                    {format(new Date(period.startDate), 'PPP')} to {format(new Date(period.endDate), 'PPP')}
                    <span className="text-sm text-gray-500 ml-2">
                      ({differenceInDays(new Date(period.endDate), new Date(period.startDate))} days)
                    </span>
                  </span>
                  <button
                    onClick={() => removeAvailability(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailabilityManager;
