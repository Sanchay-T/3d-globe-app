import React, { createContext, useContext, useState, useCallback } from 'react';
import { TiktokBanData } from '../data/tiktokBanData';
import { fetchAppRestrictions } from '../services/appRestrictionsAPI';

interface AppData {
  name: string;
  banData: TiktokBanData[];
  lastUpdated: string;
}

interface AppContextType {
  currentApp: AppData;
  setAppData: (name: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const defaultAppData: AppData = {
  name: '',
  banData: [],
  lastUpdated: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<AppData>(defaultAppData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAppData = useCallback(async (appName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const banData = await fetchAppRestrictions(appName);
      
      setCurrentApp({
        name: appName,
        banData,
        lastUpdated: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    } catch (error) {
      console.error('Error fetching app data:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching data');
      // Keep the previous data in case of error
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ currentApp, setAppData, isLoading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};