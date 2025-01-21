import React, { createContext, useContext, useState, useCallback } from 'react';
import { TiktokBanData, tiktokBanData } from '../data/tiktokBanData';

interface AppData {
  name: string;
  banData: TiktokBanData[];
  lastUpdated: string;
}

interface AppContextType {
  currentApp: AppData;
  setAppData: (name: string) => Promise<void>;
  isLoading: boolean;
}

const defaultAppData: AppData = {
  name: 'TikTok',
  banData: [], // Will be populated from tiktokBanData
  lastUpdated: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<AppData>({
    ...defaultAppData,
    banData: [...tiktokBanData] // Initialize with TikTok data
  });
  const [isLoading, setIsLoading] = useState(false);

  const setAppData = useCallback(async (appName: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace this with actual API call when backend is ready
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, we'll just use TikTok data as placeholder
      setCurrentApp({
        name: appName,
        banData: tiktokBanData.map(item => ({
          ...item,
          details: item.details.replace(/TikTok/g, appName)
        })),
        lastUpdated: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    } catch (error) {
      console.error('Error fetching app data:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ currentApp, setAppData, isLoading }}>
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