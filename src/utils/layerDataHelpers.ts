import { TiktokBanData } from '../data/tiktokBanData';

interface Coordinates {
  lat: number;
  lng: number;
}

// Capital cities coordinates (using more precise coordinates)
export const capitalCoordinates: Record<string, Coordinates> = {
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
  "Iran": { lat: 35.6892, lng: 51.3890 },
  "Afghanistan": { lat: 34.5553, lng: 69.2075 },
  "Nepal": { lat: 27.7172, lng: 85.3240 },
  "Jordan": { lat: 31.9454, lng: 35.9284 },
  "Belgium": { lat: 50.8503, lng: 4.3517 },
  "Denmark": { lat: 55.6761, lng: 12.5683 },
  "Netherlands": { lat: 52.3676, lng: 4.9041 },
  "Taiwan": { lat: 25.0330, lng: 121.5654 },
  "Norway": { lat: 59.9139, lng: 10.7522 },
  "Latvia": { lat: 56.9496, lng: 24.1052 },
  "Estonia": { lat: 59.4370, lng: 24.7536 },
  "Indonesia": { lat: -6.2088, lng: 106.8456 },
  "Pakistan": { lat: 33.6844, lng: 73.0479 }
};

// Get coordinates for a country
const getCountryCoordinates = (country: string): Coordinates | null => {
  return capitalCoordinates[country] || null;
};

// Group countries by region for meaningful connections
const getRegionGroups = (banData: TiktokBanData[]): Record<string, TiktokBanData[]> => {
  const regions: Record<string, TiktokBanData[]> = {
    'Asia': [],
    'Europe': [],
    'Americas': [],
    'Oceania': []
  };

  const regionMapping: Record<string, string> = {
    'India': 'Asia',
    'China': 'Asia',
    'Japan': 'Asia',
    'United Kingdom': 'Europe',
    'France': 'Europe',
    'Germany': 'Europe',
    'United States': 'Americas',
    'Canada': 'Americas',
    'Australia': 'Oceania',
    'Iran': 'Asia',
    'Afghanistan': 'Asia',
    'Nepal': 'Asia',
    'Jordan': 'Asia',
    'Belgium': 'Europe',
    'Denmark': 'Europe',
    'Netherlands': 'Europe',
    'Taiwan': 'Asia',
    'Norway': 'Europe',
    'Latvia': 'Europe',
    'Estonia': 'Europe',
    'Indonesia': 'Asia',
    'Pakistan': 'Asia'
  };

  banData.forEach(country => {
    const region = regionMapping[country.country] || 'Other';
    if (regions[region]) {
      regions[region].push(country);
    }
  });

  return regions;
};

export const generatePointsData = (banData: TiktokBanData[], config: any) => {
  return banData
    .map(d => {
      const coords = getCountryCoordinates(d.country);
      if (!coords) return null;

      return {
        ...coords,
        size: config.points.radius,
        color: d.type === 'complete' ? config.colors.completeBan : config.colors.partialBan,
        label: d.country,
        details: d.details,
        type: d.type
      };
    })
    .filter(Boolean);
};

export const generateArcsData = (banData: TiktokBanData[], config: any) => {
  const regions = getRegionGroups(banData);
  const arcs: any[] = [];

  // Connect countries within same region and with same restriction type
  Object.values(regions).forEach(regionCountries => {
    const completeBans = regionCountries.filter(c => c.type === 'complete');
    const partialBans = regionCountries.filter(c => c.type === 'partial');

    [completeBans, partialBans].forEach(group => {
      group.forEach((start, i) => {
        if (i < group.length - 1) {
          const startCoords = getCountryCoordinates(start.country);
          const endCoords = getCountryCoordinates(group[i + 1].country);

          if (startCoords && endCoords) {
            arcs.push({
              startLat: startCoords.lat,
              startLng: startCoords.lng,
              endLat: endCoords.lat,
              endLng: endCoords.lng,
              color: start.type === 'complete' 
                ? config.colors.completeBan 
                : config.colors.partialBan,
              label: `${start.country} → ${group[i + 1].country}`,
              type: start.type
            });
          }
        }
      });
    });
  });

  return arcs;
};

export const generateRingsData = (banData: TiktokBanData[], config: any) => {
  return banData
    .map(d => {
      const coords = getCountryCoordinates(d.country);
      if (!coords) return null;

      return {
        ...coords,
        maxR: d.type === 'complete' ? config.rings.maxRadius : config.rings.maxRadius * 0.7,
        propagationSpeed: d.type === 'complete' ? 
          config.rings.propagationSpeed : 
          config.rings.propagationSpeed * 0.8,
        repeatPeriod: d.type === 'complete' ? 
          config.rings.repeatPeriod : 
          config.rings.repeatPeriod * 1.5,
        color: d.type === 'complete' 
          ? config.colors.completeBan 
          : config.colors.partialBan,
        altitude: config.rings.maxAltitude,
        label: d.country,
        details: d.details,
        type: d.type
      };
    })
    .filter(Boolean);
};

export const layerInfo = {
  points: {
    label: 'Capital Points',
    description: 'Shows restriction status at capital cities with color-coded markers'
  },
  arcs: {
    label: 'Regional Networks',
    description: 'Visualizes connections between countries with similar restrictions within regions'
  },
  rings: {
    label: 'Impact Waves',
    description: 'Pulsing rings indicate restriction intensity, with faster pulses for complete bans'
  },
  hexBin: {
    label: 'Regional Density',
    description: 'Shows concentration of restrictions by geographical area'
  }
};