export type CountryCode = 'PT' | 'ES' | 'FR' | 'DE' | 'NL' | 'IE' | 'IT' | 'BE' | 'SE' | 'DK' | 'FI' | 'AT';

export interface ConsentSettings {
  country: CountryCode;
  necessary: true; // Always true, non-toggleable
  analytics: boolean;
  marketing: boolean;
  research: boolean;
  updatedAt: string;
}

export const COUNTRIES: Record<CountryCode, string> = {
  PT: 'Portugal',
  ES: 'Spain', 
  FR: 'France',
  DE: 'Germany',
  NL: 'Netherlands',
  IE: 'Ireland',
  IT: 'Italy',
  BE: 'Belgium',
  SE: 'Sweden',
  DK: 'Denmark',
  FI: 'Finland',
  AT: 'Austria'
};

export function defaultConsent(country: CountryCode): ConsentSettings {
  return {
    country,
    necessary: true,
    analytics: false,
    marketing: false,
    research: false,
    updatedAt: new Date().toISOString()
  };
}

export function loadConsent(country: CountryCode): ConsentSettings {
  if (typeof window === 'undefined') {
    return defaultConsent(country);
  }

  try {
    const stored = localStorage.getItem(`hp_consent_${country}`);
    if (stored) {
      const parsed = JSON.parse(stored) as ConsentSettings;
      // Ensure necessary is always true
      return { ...parsed, necessary: true };
    }
  } catch (error) {
    console.warn('Failed to load consent from localStorage:', error);
  }

  return defaultConsent(country);
}

export function saveConsent(consent: ConsentSettings): void {
  if (typeof window === 'undefined') return;

  try {
    // Save to localStorage
    localStorage.setItem(`hp_consent_${consent.country}`, JSON.stringify(consent));
    
    // Save to cookie for server-side access
    const cookieName = `hp_cmp_${consent.country}`;
    const cookieValue = JSON.stringify({
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
      research: consent.research,
      updatedAt: consent.updatedAt
    });
    
    // Set cookie with 1 year expiry
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Failed to save consent:', error);
  }
}

export function getCountryFromCookie(): CountryCode {
  if (typeof document === 'undefined') return 'PT';

  try {
    const match = document.cookie.match(/hp_country=([^;]+)/);
    if (match) {
      const country = decodeURIComponent(match[1]) as CountryCode;
      if (Object.keys(COUNTRIES).includes(country)) {
        return country;
      }
    }
  } catch (error) {
    console.warn('Failed to get country from cookie:', error);
  }

  return 'PT';
}

export function setCountryCookie(country: CountryCode): void {
  if (typeof document === 'undefined') return;

  try {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `hp_country=${encodeURIComponent(country)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Failed to set country cookie:', error);
  }
}

// Get consent from cookie (for server-side access)
export function getConsentFromCookie(country: CountryCode): ConsentSettings | null {
  if (typeof document === 'undefined') return null;

  try {
    const cookieName = `hp_cmp_${country}`;
    const match = document.cookie.match(new RegExp(`${cookieName}=([^;]+)`));
    
    if (match) {
      const data = JSON.parse(decodeURIComponent(match[1]));
      return {
        country,
        necessary: true,
        analytics: data.analytics || false,
        marketing: data.marketing || false,
        research: data.research || false,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    }
  } catch (error) {
    console.warn('Failed to get consent from cookie:', error);
  }

  return null;
}