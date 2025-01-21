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
  };
  points: {
    radius: number;
    altitude: number;
    color: string;
  };
  arcs: {
    color: string;
    altitude: number;
    stroke: number;
  };
  rings: {
    color: string;
    maxRadius: number;
    propagationSpeed: number;
    repeatPeriod: number;
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
    noRestriction: 'rgba(100, 100, 100, 0.3)'
  },
  points: {
    radius: 0.5,
    altitude: 0.1,
    color: '#ffff00'
  },
  arcs: {
    color: '#ff0000',
    altitude: 0.5,
    stroke: 0.5
  },
  rings: {
    color: '#ff4444',
    maxRadius: 2,
    propagationSpeed: 1,
    repeatPeriod: 1000
  },
  hexBin: {
    resolution: 4,
    altitude: 0.1,
    color: '#ffaa44'
  }
};

export const getCountryColor = (countryName: string, banData: TiktokBanData[]) => {
  const data = banData.find(d => d.country === countryName);
  if (!data) return globeConfig.colors.noRestriction;
  return data.type === 'complete' ? globeConfig.colors.completeBan : globeConfig.colors.partialBan;
};

export type LayerType = 'points' | 'arcs' | 'hexBin' | 'rings';