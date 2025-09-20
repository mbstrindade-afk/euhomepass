import React, { useEffect, useState } from 'react';
import { addDays, eachDayOfInterval, format, isWithinInterval, parseISO, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Period {
  startDate: string;
  endDate: string;
}

interface AnnualCalendarProps {
  year: number;
  reservedPeriods: Period[]; // Now represents periods at another house
  availablePeriods?: Period[];
  locale?: 'en' | 'pt';
  isModal?: boolean;
  onClose?: () => void;
}

// Helper to get all days at another house
function getReservedDays(periods: Period[]): Date[] {
  const days: Date[] = [];
  periods.forEach(period => {
    const start = parseISO(period.startDate);
    const end = parseISO(period.endDate);
    days.push(...eachDayOfInterval({ start, end }));
  });
  return days;
}

// Helper to get all available days
function getAvailableDays(periods: Period[]): Date[] {
  const days: Date[] = [];
  periods?.forEach(period => {
    const start = parseISO(period.startDate);
    const end = parseISO(period.endDate);
    days.push(...eachDayOfInterval({ start, end }));
  });
  return days;
}

export const AnnualCalendar: React.FC<AnnualCalendarProps> = ({ 
  year: initialYear, 
  reservedPeriods,
  availablePeriods = [],
  locale = 'en',
  isModal = false,
  onClose
}) => {
  const [year, setYear] = useState<number>(initialYear);
  useEffect(() => {
    setYear(initialYear);
  }, [initialYear]);

  const reservedDays = getReservedDays(reservedPeriods);
  const availableDays = getAvailableDays(availablePeriods);

  // Build months
  const months = Array.from({ length: 12 }, (_, i) => i);
  
  // Get weekday names based on locale
  const getWeekdayNames = () => {
    const dateLocale = locale === 'pt' ? ptBR : undefined;
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2024, 0, i + 1); // Using a Sunday as the first day (Jan 1, 2024 is a Monday)
      return format(date, 'EEEEE', { locale: dateLocale }); // EEEEE for the narrowest form (e.g., M, T, W...)
    });
  };

  const weekdayNames = getWeekdayNames();

  const calendarContent = (
    <div className="annual-calendar bg-white p-4 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous year"
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
            onClick={() => setYear(y => y - 1)}
          >
            ‹
          </button>
          <button
            aria-label="Next year"
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
            onClick={() => setYear(y => y + 1)}
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="calendar-year" className="sr-only">Year</label>
          <input
            id="calendar-year"
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="w-24 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">{year} Calendar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {months.map(monthIdx => {
          const firstDay = new Date(year, monthIdx, 1);
          const lastDay = new Date(year, monthIdx + 1, 0);
          const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
          const dateLocale = locale === 'pt' ? ptBR : undefined;
          
          return (
            <div key={monthIdx} className="month-calendar border rounded-md p-2">
              <div className="font-semibold text-lg mb-2 text-blue-700 text-center">
                {format(firstDay, 'MMMM', { locale: dateLocale })}
              </div>
              
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {weekdayNames.map((name, i) => (
                  <div 
                    key={i} 
                    className="text-center text-xs font-medium text-gray-500"
                  >
                    {name}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {[...Array(getDay(firstDay))].map((_, i) => (
                  <div key={i} className="w-6 h-6 sm:w-8 sm:h-8" />
                ))}
                
                {daysInMonth.map(day => {
                  const isReserved = reservedDays.some(reserved =>
                    reserved.getFullYear() === day.getFullYear() &&
                    reserved.getMonth() === day.getMonth() &&
                    reserved.getDate() === day.getDate()
                  );
                  
                  const isAvailable = availableDays.some(available =>
                    available.getFullYear() === day.getFullYear() &&
                    available.getMonth() === day.getMonth() &&
                    available.getDate() === day.getDate()
                  );
                  
                  const isWeekend = [0, 6].includes(getDay(day));
                  
                  const titleText = isReserved 
                    ? (locale === 'pt' ? 'Em outra casa: ' : 'At another house: ') + format(day, 'PPPP', { locale: dateLocale })
                    : format(day, 'PPPP', { locale: dateLocale });
                    
                  return (
                    <div
                      key={day.toISOString()}
                      className={`
                        w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs 
                        sm:text-sm font-medium transition-colors
                        ${isReserved ? 'bg-green-500 text-white' : 
                          isAvailable ? 'bg-blue-500 text-white' :
                          isWeekend ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-700'}
                        ${isReserved ? 'hover:bg-green-600' : 
                          isAvailable ? 'hover:bg-blue-600' : 'hover:bg-gray-200'}
                      `}
                      title={titleText}
                    >
                      {day.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Calendar Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">{locale === 'pt' ? 'Em outra casa' : 'At another house'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">{locale === 'pt' ? 'Sua disponibilidade' : 'Your Availability'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
          <span className="text-sm">{locale === 'pt' ? 'Fim de semana' : 'Weekend'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-100"></div>
          <span className="text-sm">{locale === 'pt' ? 'Disponível' : 'Available'}</span>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
        onClick={onClose} // Close modal when clicking outside content
      >
        <div 
          className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6" 
          onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{locale === 'pt' ? 'Disponibilidade do Calendário' : 'Calendar Availability'}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <p className="mb-6 text-gray-600">
            {locale === 'pt' 
              ? 'Veja os dias disponíveis ou quando você estará em outra casa.' 
              : 'View available days or when you will be at another house.'}
          </p>
          
          {calendarContent}
          
          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {locale === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return calendarContent;
};

export default AnnualCalendar;
