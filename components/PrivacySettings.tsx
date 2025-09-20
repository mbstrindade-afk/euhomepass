import React, { useState } from 'react';
import Toggle from './ui/Toggle';

interface PrivacySettingsProps {
  onSave?: (settings: PrivacySettingsType) => void;
  initialSettings?: Partial<PrivacySettingsType>;
}

export interface PrivacySettingsType {
  exactAddressHidden: boolean;
  showNeighborhood: boolean;
  showEmail: boolean;
  showPhone: boolean;
  allowNotifications: boolean;
  allowProfileSearch: boolean;
}

const defaultSettings: PrivacySettingsType = {
  exactAddressHidden: true, // Por defeito, o endereço exato está sempre oculto
  showNeighborhood: true,
  showEmail: true,
  showPhone: false,
  allowNotifications: true,
  allowProfileSearch: true,
};

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ 
  onSave,
  initialSettings = {}
}) => {
  const [settings, setSettings] = useState<PrivacySettingsType>({
    ...defaultSettings,
    ...initialSettings,
  });

  const handleToggle = (key: keyof PrivacySettingsType) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">Listing privacy</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="exactAddressHidden" className="text-sm font-medium text-gray-700">Exact address always hidden</label>
            <input 
              type="checkbox" 
              id="exactAddressHidden" 
              checked={settings.exactAddressHidden} 
              onChange={() => handleToggle('exactAddressHidden')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-300 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.exactAddressHidden ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.exactAddressHidden ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
              disabled={true}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="showNeighborhood" className="text-sm font-medium text-gray-700">Show neighborhood on the map</label>
            <input 
              type="checkbox" 
              id="showNeighborhood" 
              checked={settings.showNeighborhood} 
              onChange={() => handleToggle('showNeighborhood')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-500 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.showNeighborhood ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.showNeighborhood ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="showEmail" className="text-sm font-medium text-gray-700">Show my email to other members</label>
            <input 
              type="checkbox" 
              id="showEmail" 
              checked={settings.showEmail} 
              onChange={() => handleToggle('showEmail')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-500 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.showEmail ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.showEmail ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="showPhone" className="text-sm font-medium text-gray-700">Show my phone number</label>
            <input 
              type="checkbox" 
              id="showPhone" 
              checked={settings.showPhone} 
              onChange={() => handleToggle('showPhone')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-500 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.showPhone ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.showPhone ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="allowNotifications" className="text-sm font-medium text-gray-700">Allow notifications</label>
            <input 
              type="checkbox" 
              id="allowNotifications" 
              checked={settings.allowNotifications} 
              onChange={() => handleToggle('allowNotifications')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-500 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.allowNotifications ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.allowNotifications ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="allowProfileSearch" className="text-sm font-medium text-gray-700">Allow my profile to be found in search</label>
            <input 
              type="checkbox" 
              id="allowProfileSearch" 
              checked={settings.allowProfileSearch} 
              onChange={() => handleToggle('allowProfileSearch')} 
              className="h-5 w-10 rounded-full bg-gray-200 cursor-pointer appearance-none checked:bg-green-500 transition-colors duration-200 relative"
              style={{ 
                backgroundImage: settings.allowProfileSearch ? 
                  'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22%3E%3Cpath d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E")' : 
                  'none',
                backgroundPosition: settings.allowProfileSearch ? 'right 2px center' : 'left 2px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacySettings;
