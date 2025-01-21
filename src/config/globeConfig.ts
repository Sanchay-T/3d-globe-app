import { TiktokBanData } from '../data/tiktokBanData';

export interface GlobeConfig {
  images: {
    globe: string;
    background: string;
  };
  polygon: {
    resolution: number;
    margin: number;
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
}

export const globeConfig: GlobeConfig = {
  images: {
    globe: '//unpkg.com/three-globe/example/img/earth-dark.jpg',
    background: '//unpkg.com/three-globe/example/img/night-sky.png'
  },
  polygon: {
    resolution: 3,
    margin: 0.3,
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
  }
};

export const getCountryColor = (countryName: string, banData: TiktokBanData[]) => {
  const data = banData.find(d => d.country === countryName);
  if (!data) return globeConfig.colors.noRestriction;
  return data.type === 'complete' ? globeConfig.colors.completeBan : globeConfig.colors.partialBan;
};