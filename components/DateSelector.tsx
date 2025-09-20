'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Import CSS for react-date-range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateSelectorProps {
  dateSelectionMode: 'complete' | 'months';
  onModeChange: (mode: 'complete' | 'months') => void;
  onDateRangeChange: (range: any) => void;
  onMonthsChange: (months: string[]) => void;
  selectedDateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  selectedMonths: string[];
  locale?: 'en' | 'pt';
  onDone?: () => void;
}

const monthAbbreviations = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DateSelector: React.FC<DateSelectorProps> = ({
  dateSelectionMode,
  onModeChange,
  onDateRangeChange,
  onMonthsChange,
  selectedDateRange,
  selectedMonths,
  locale = 'en',
  onDone
}) => {
  const [showYearView, setShowYearView] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Automatically toggle between year view and month view based on mode changes
  React.useEffect(() => {
    // Default to month view (calendar) for complete date mode
    if (dateSelectionMode === 'complete') {
      setShowYearView(false);
    }
  }, [dateSelectionMode]);
  
  const handleRangeChange = (ranges: any) => {
    if (ranges.selection) {
      onDateRangeChange(ranges.selection);
      setValidationError(null);
    }
  };
  
  const handleDoneClick = () => {
    if (dateSelectionMode === 'complete') {
      // Calculate the difference in days between start and end dates
      const diffTime = Math.abs(selectedDateRange.endDate.getTime() - selectedDateRange.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
      
      if (diffDays < 30) {
        setValidationError(locale === 'pt' ? 
          'É necessário selecionar pelo menos 30 dias consecutivos.' : 
          'You must select at least 30 consecutive days.');
        return;
      }
    }
    
    setValidationError(null);
    if (onDone) onDone();
    // collapse the selector UI so only the selected period remains visible
    setIsCollapsed(true);
  };

  const handleMonthToggle = (month: string) => {
    const updatedMonths = selectedMonths.includes(month)
      ? selectedMonths.filter(m => m !== month)
      : [...selectedMonths, month];
    onMonthsChange(updatedMonths);
  };

  const dateLocale = locale === 'pt' ? ptBR : undefined;

  return (
    <div className="date-selector">
      <div className="mb-4">
        <h3 className="font-medium mb-2">Date Selection Mode</h3>
        <div className="flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="mr-2"
              checked={dateSelectionMode === 'months'}
              onChange={() => onModeChange('months')}
            />
            <span>{locale === 'pt' ? 'Por Meses' : 'By Months'}</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="mr-2"
              checked={dateSelectionMode === 'complete'}
              onChange={() => onModeChange('complete')}
            />
            <span>{locale === 'pt' ? 'Datas Completas' : 'Complete Dates'}</span>
          </label>
        </div>
      </div>

      {dateSelectionMode === 'complete' ? (
        <div className="complete-dates">
          {isCollapsed ? (
            <div className="collapsed-view border border-gray-200 rounded-md p-3 bg-white">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  {locale === 'pt' ? 'Período selecionado:' : 'Selected period:'} {format(selectedDateRange.startDate, 'PP', { locale: dateLocale })} - {format(selectedDateRange.endDate, 'PP', { locale: dateLocale })}
                </div>
                <div>
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className="ml-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm"
                  >
                    {locale === 'pt' ? 'Editar' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
          <div className="mb-2">
            <h3 className="font-medium mb-2">{locale === 'pt' ? 'Selecione as datas' : 'Select Dates'}</h3>
          </div>
          
          {showYearView ? (
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => setCurrentYear(prev => prev - 1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ◀
                </button>
                <h3 className="text-xl font-bold">{currentYear}</h3>
                <button 
                  onClick={() => setCurrentYear(prev => prev + 1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ▶
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 12 }, (_, idx) => {
                  const month = new Date(currentYear, idx, 1);
                  const monthName = format(month, 'MMMM', { locale: dateLocale });
                  
                  const isInRange = month >= new Date(selectedDateRange.startDate.getFullYear(), selectedDateRange.startDate.getMonth(), 1) &&
                                     month <= new Date(selectedDateRange.endDate.getFullYear(), selectedDateRange.endDate.getMonth(), 1);
                  
                  return (
                    <div 
                      key={idx}
                      className={`p-3 border rounded-md cursor-pointer ${isInRange ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        const startDate = new Date(currentYear, idx, 1);
                        const endDate = new Date(currentYear, idx + 1, 0); // Last day of month
                        onDateRangeChange({
                          startDate,
                          endDate,
                          key: 'selection'
                        });
                      }}
                    >
                      <div className="font-medium text-center">{monthName}</div>
                      <div className="text-xs text-center mt-1 text-gray-500">
                        {format(new Date(currentYear, idx, 1), 'MMM yyyy', { locale: dateLocale })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <DateRange
                editableDateInputs={true}
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[selectedDateRange]}
                months={2}
                direction="horizontal"
                className="w-full"
                locale={dateLocale}
                minDate={new Date()}
                showMonthAndYearPickers={true}
                showDateDisplay={true}
                showPreview={true}
                showMonthArrow={true}
                navigatorRenderer={(currentDate: Date, changeShownDate: (value: number, mode: 'monthOffset' | 'setMonth' | 'setYear') => void) => (
                  <div className="flex justify-between items-center mb-2 px-4 py-2 bg-gray-50">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => changeShownDate(-1, 'monthOffset')}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        &lt;
                      </button>
                      <button 
                        onClick={() => changeShownDate(1, 'monthOffset')}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        &gt;
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select 
                        value={currentDate.getFullYear()}
                        onChange={(e) => changeShownDate(parseInt(e.target.value, 10), 'setYear')}
                        className="bg-white border border-gray-200 rounded p-1"
                      >
                        {Array.from({length: 10}, (_, i) => currentDate.getFullYear() + i - 5).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
          
          <div className="mt-2 text-sm text-gray-600">
            {locale === 'pt' ? 'Período selecionado:' : 'Selected period:'} {format(selectedDateRange.startDate, 'PP', { locale: dateLocale })} - {format(selectedDateRange.endDate, 'PP', { locale: dateLocale })}
          </div>
          
          {validationError && (
            <div className="mt-2 text-sm text-red-600">
              {validationError}
            </div>
          )}
          
          <div className="mt-4">
            <button 
              onClick={handleDoneClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors"
            >
              {locale === 'pt' ? 'Concluído' : 'Done'}
            </button>
          </div>
          </>
        )}
        </div>
      ) : (
        <div className="month-selection">
          <h3 className="font-medium mb-2">{locale === 'pt' ? 'Meses disponíveis' : 'Available Months'}</h3>
          <div className="grid grid-cols-4 gap-2">
            {monthAbbreviations.map((month) => (
              <label key={month} className="flex items-center border border-gray-300 rounded p-2 cursor-pointer hover:bg-gray-50 justify-between w-full">
                <span>{month}</span>
                <input
                  type="checkbox"
                  checked={selectedMonths.includes(month)}
                  onChange={() => handleMonthToggle(month)}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
          
          <div className="mt-4">
            <button 
              onClick={handleDoneClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors"
            >
              {locale === 'pt' ? 'Concluído' : 'Done'}
            </button>
          </div>
        </div>
      )}
      
      {validationError && dateSelectionMode === 'months' && (
        <div className="mt-2 text-sm text-red-600">
          {validationError}
        </div>
      )}
    </div>
  );
};

export default DateSelector;