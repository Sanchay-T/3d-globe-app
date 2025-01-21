import { TiktokBanData } from '../data/tiktokBanData';

// Capital cities coordinates (sample - add more as needed)
const capitalCoordinates: Record<string, { lat: number; lng: number }> = {
  "India": { lat: 28.6139, lng: 77.2090 },
  "United States": { lat: 38.8977, lng: -77.0365 },
  "China": { lat: 39.9042, lng: 116.4074 },
  "United Kingdom": { lat: 51.5074, lng: -0.1278 },
  "France": { lat: 48.8566, lng: 2.3522 },
  "Germany": { lat: 52.5200, lng: 13.4050 },
  "Australia": { lat: -35.2809, lng: 149.1300 },
  "Canada": { lat: 45.4215, lng: -75.6972 },
  "Japan": { lat: 35.6762, lng: 139.6503 },
  "Russia": { lat: 55.7558, lng: 37.6173 },
  "Brazil": { lat: -15.7975, lng: -47.8919 },
  "South Africa": { lat: -25.7479, lng: 28.2293 },
  "Iran": { lat: 35.6892, lng: 51.3890 },
  "Afghanistan": { lat: 34.5553, lng: 69.2075 },
  "Nepal": { lat: 27.7172, lng: 85.3240 },
  "Jordan": { lat: 31.9454, lng: 35.9284 },
  "Belgium": { lat: 50.8503, lng: 4.3517 },
  "Denmark": { lat: 55.6761, lng: 12.5683 },
  "Netherlands": { lat: 52.3676, lng: 4.9041 },
  "New Zealand": { lat: -41.2866, lng: 174.7756 },
  "Taiwan": { lat: 25.0330, lng: 121.5654 },
  "Norway": { lat: 59.9139, lng: 10.7522 },
  "Latvia": { lat: 56.9496, lng: 24.1052 },
  "Estonia": { lat: 59.4370, lng: 24.7536 },
  "Kyrgyzstan": { lat: 42.8746, lng: 74.5698 },
  "Senegal": { lat: 14.7167, lng: -17.4677 },
  "Somalia": { lat: 2.0469, lng: 45.3182 },
  "Indonesia": { lat: -6.2088, lng: 106.8456 },
  "Pakistan": { lat: 33.6844, lng: 73.0479 }
};

// Get coordinates for a country, fallback to random if not found
const getCountryCoordinates = (country: string): { lat: number; lng: number } => {
  if (capitalCoordinates[country]) {
    return capitalCoordinates[country];
  }
  return {
    lat: (Math.random() * 140 - 70), // Avoid poles
    lng: Math.random() * 360 - 180
  };
};

// Helper to get colored coordinates based on ban type
const getBanTypeColor = (type: 'complete' | 'partial', config: any) => {
  return type === 'complete' ? config.colors.completeBan : config.colors.partialBan;
};

export const generatePointsData = (banData: TiktokBanData[], config: any) => {
  return banData.map(d => {
    const coords = getCountryCoordinates(d.country);
    return {
      ...coords,
      size: config.points.radius,
      color: getBanTypeColor(d.type, config),
      label: d.country,
      details: d.details,
      type: d.type
    };
  });
};

export const generateArcsData = (banData: TiktokBanData[], config: any) => {
  return banData.reduce((acc: any[], curr, idx, arr) => {
    if (idx < arr.length - 1) {
      const startCoords = getCountryCoordinates(curr.country);
      const endCoords = getCountryCoordinates(arr[idx + 1].country);
      acc.push({
        startLat: startCoords.lat,
        startLng: startCoords.lng,
        endLat: endCoords.lat,
        endLng: endCoords.lng,
        color: getBanTypeColor(curr.type, config),
        label: `${curr.country} → ${arr[idx + 1].country}`,
        type: curr.type
      });
    }
    return acc;
  }, []);
};

export const generateRingsData = (
  banData: TiktokBanData[],
  config: any
) => {
  return banData.map(d => {
    const coords = getCountryCoordinates(d.country);
    return {
      ...coords,
      maxR: config.rings.maxRadius,
      propagationSpeed: config.rings.propagationSpeed,
      repeatPeriod: config.rings.repeatPeriod,
      color: getBanTypeColor(d.type, config),
      label: d.country,
      details: d.details,
      type: d.type
    };
  });
};

export const layerInfo = {
  points: {
    label: 'Capital Points',
    description: 'Displays restriction status at country capitals'
  },
  arcs: {
    label: 'Connection Arcs',
    description: 'Shows relationships between restricted regions'
  },
  rings: {
    label: 'Pulse Rings',
    description: 'Animated rings emanating from restricted capitals'
  },
  hexBin: {
    label: 'Density Hexagons',
    description: 'Shows concentration of restrictions by region'
  }
};