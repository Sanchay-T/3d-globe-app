import { TiktokBanData } from '../data/tiktokBanData';

// Helper to get random latitude avoiding poles
const getRandomLat = () => Math.random() * 140 - 70;
const getRandomLng = () => Math.random() * 360 - 180;

export const generatePointsData = (banData: TiktokBanData[], color: string, radius: number) => {
  return banData.map(d => ({
    lat: getRandomLat(),
    lng: getRandomLng(),
    size: radius,
    color,
    label: d.country,
    details: d.details,
    type: d.type
  }));
};

export const generateArcsData = (banData: TiktokBanData[], color: string) => {
  return banData.reduce((acc, curr, idx) => {
    if (idx < banData.length - 1) {
      acc.push({
        startLat: getRandomLat(),
        startLng: getRandomLng(),
        endLat: getRandomLat(),
        endLng: getRandomLng(),
        color,
        label: `${curr.country} → ${banData[idx + 1].country}`,
        type: curr.type
      });
    }
    return acc;
  }, [] as any[]);
};

export const generateRingsData = (
  banData: TiktokBanData[],
  maxRadius: number,
  propagationSpeed: number,
  repeatPeriod: number
) => {
  return banData.map(d => ({
    lat: getRandomLat(),
    lng: getRandomLng(),
    maxR: maxRadius,
    propagationSpeed,
    repeatPeriod,
    label: d.country,
    details: d.details,
    type: d.type
  }));
};

export const layerInfo = {
  points: {
    label: 'Points Layer',
    description: 'Displays ban locations as 3D points'
  },
  arcs: {
    label: 'Arcs Layer',
    description: 'Shows connections between banned regions'
  },
  rings: {
    label: 'Rings Layer',
    description: 'Animated ripple effects from ban locations'
  },
  hexBin: {
    label: 'Hex Bin Layer',
    description: 'Density visualization of affected areas'
  }
};