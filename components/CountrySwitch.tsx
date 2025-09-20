'use client';

import { useEffect, useState } from 'react';
import { CountryCode, COUNTRIES, getCountryFromCookie, setCountryCookie } from '@/lib/consent';

export default function CountrySwitch() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('PT');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const country = getCountryFromCookie();
    setSelectedCountry(country);
  }, []);

  const handleCountryChange = (newCountry: CountryCode) => {
    setSelectedCountry(newCountry);
    setCountryCookie(newCountry);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('hp-country-changed', {
      detail: { country: newCountry }
    }));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">Country:</span>
        <select 
          className="px-2 py-1 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          disabled
        >
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Country:</span>
      <select 
        value={selectedCountry}
        onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
        className="px-2 py-1 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        aria-label="Select country for legal jurisdiction"
      >
        {Object.entries(COUNTRIES).map(([code, name]) => (
          <option key={code} value={code}>
            {name} ({code})
          </option>
        ))}
      </select>
    </div>
  );
}