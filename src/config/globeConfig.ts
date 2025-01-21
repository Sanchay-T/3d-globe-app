import { TiktokBanData } from '../data/tiktokBanData';

export interface GlobeConfig {
  images: {
    globe: string;
    background: string;
  };
  polygon: {
    baseAltitude: number;
    hoverAltitude: number;
  };
  atmosphere: {
    color: string;
    altitude: number;
  };
  colors: {
    completeBan: string;
    partialBan: string;
    noRestriction: string;
    capitalPoint: string;
    connectionArc: string;
    pulseRing: string;
  };
  points: {
    radius: number;
    altitude: number;
  };
  arcs: {
    altitude: number;
    stroke: number;
    dashAnimateTime: number;
  };
  rings: {
    maxRadius: number;
    propagationSpeed: number;
    repeatPeriod: number;
    maxAltitude: number;
  };
  hexBin: {
    resolution: number;
    altitude: number;
    color: string;
  };
}

export const globeConfig: GlobeConfig = {
  images: {
    globe: '//unpkg.com/three-globe/example/img/earth-dark.jpg',
    background: '//unpkg.com/three-globe/example/img/night-sky.png'
  },
  polygon: {
    baseAltitude: 0.01,
    hoverAltitude: 0.1
  },
  atmosphere: {
    color: 'rgba(255, 100, 100, 0.3)',
    altitude: 0.15
  },
  colors: {
    completeBan: '#ff4444',
    partialBan: '#ffaa44',
    noRestriction: 'rgba(100, 100, 100, 0.3)',
    capitalPoint: '#4CAF50', // Green for capital points
    connectionArc: 'rgba(76, 175, 80, 0.5)', // Semi-transparent green for arcs
    pulseRing: 'rgba(76, 175, 80, 0.3)' // Very light green for rings
  },
  points: {
    radius: 0.5,
    altitude: 0.01 // Lower altitude for capital points
  },
  arcs: {
    altitude: 0.2, // Lower arc height
    stroke: 0.5,
    dashAnimateTime: 3000 // Slower animation
  },
  rings: {
    maxRadius: 1, // Smaller radius for rings
    propagationSpeed: 2,
    repeatPeriod: 2000,
    maxAltitude: 0.01 // Keep rings close to surface
  },
  hexBin: {
    resolution: 4,
    altitude: 0.05,
    color: 'rgba(255, 255, 255, 0.1)' // Very subtle hexbins
  }
};

export const getCountryColor = (countryName: string, banData: TiktokBanData[]) => {
  const data = banData.find(d => d.country === countryName);
  if (!data) return globeConfig.colors.noRestriction;
  return data.type === 'complete' ? globeConfig.colors.completeBan : globeConfig.colors.partialBan;
};

export type LayerType = 'points' | 'arcs' | 'hexBin' | 'rings';