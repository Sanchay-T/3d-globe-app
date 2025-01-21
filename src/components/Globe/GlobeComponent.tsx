import React, { useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { GlobeConfig, getCountryColor, LayerType } from '../../config/globeConfig';
import { TiktokBanData } from '../../data/tiktokBanData';
import { generatePointsData, generateArcsData, generateRingsData } from '../../utils/layerDataHelpers';

export interface CountryFeature {
  type: string;
  properties: {
    NAME: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface PointData {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  details: string;
  type: 'complete' | 'partial';
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  label: string;
  type: 'complete' | 'partial';
}

interface RingData {
  lat: number;
  lng: number;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
  color: string;
  altitude: number;
  label: string;
  details: string;
  type: 'complete' | 'partial';
}

interface GlobeComponentProps {
  config: GlobeConfig;
  countries: { features: CountryFeature[] };
  banData: TiktokBanData[];
  hoverD: CountryFeature | null;
  onPolygonClick: (d: CountryFeature) => void;
  activeLayers: LayerType[];
  isAutoRotating: boolean;
}

export const GlobeComponent: React.FC<GlobeComponentProps> = ({
  config,
  countries,
  banData,
  hoverD,
  onPolygonClick,
  activeLayers,
  isAutoRotating
}) => {
  const globeRef = useRef<any>();

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.autoRotate = isAutoRotating;
      controls.autoRotateSpeed = isAutoRotating ? -0.5 : 0;
      
      controls.enableDamping = true;
      controls.dampingFactor = 0.2;
      controls.rotateSpeed = 0.7;
      controls.minDistance = 200;
      controls.maxDistance = 800;
    }
  }, [isAutoRotating]);

  const getLabel = (obj: any) => {
    if (!obj?.properties?.NAME) return '';
    const d = obj as CountryFeature;
    const banInfo = banData.find(t => t.country === d.properties.NAME);
    
    return `
      <div style="color: white; background: rgba(0, 0, 0, 0.9); padding: 1.5rem; border-radius: 12px; font-family: Inter, system-ui, sans-serif; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); min-width: 300px;">
        <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
          <span>${d.properties.NAME}</span>
          ${banInfo ? `<span style="font-size: 0.75rem; padding: 4px 8px; border-radius: 12px; background: ${
            banInfo.type === 'complete' ? config.colors.completeBan : config.colors.partialBan
          }; color: white; font-weight: 500;">
            ${banInfo.type === 'complete' ? 'BANNED' : 'PARTIAL'}
          </span>` : ''}
        </div>
        ${banInfo ? `<div style="font-size: 0.9rem; line-height: 1.5; opacity: 0.9; padding-top: 0.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          ${banInfo.details}
        </div>` : `<div style="font-size: 0.9rem; opacity: 0.7; font-style: italic;">
          No restrictions in place
        </div>`}
      </div>
    `;
  };

  // Generate and filter layer data
  const pointsData = useMemo(() => 
    activeLayers.includes('points') 
      ? (generatePointsData(banData, config) as PointData[]).filter(Boolean)
      : [], 
    [activeLayers, banData, config]
  );

  const arcsData = useMemo(() => 
    activeLayers.includes('arcs') 
      ? (generateArcsData(banData, config) as ArcData[]).filter(Boolean)
      : [],
    [activeLayers, banData, config]
  );

  const ringsData = useMemo(() => 
    activeLayers.includes('rings') 
      ? (generateRingsData(banData, config) as RingData[]).filter(Boolean)
      : [],
    [activeLayers, banData, config]
  );

  const handlePolygonClick = (polygon: any, event: MouseEvent) => {
    if (polygon?.properties) {
      onPolygonClick(polygon as CountryFeature);
    }
  };

  const globeProps = {
    ref: globeRef,
    globeImageUrl: config.images.globe,
    backgroundImageUrl: config.images.background,
    
    // Regular polygons for countries
    polygonsData: countries.features,
    polygonCapColor: (obj: any) => getCountryColor(obj?.properties?.NAME || '', banData),
    polygonSideColor: () => 'rgba(0, 0, 0, 0.15)',
    polygonStrokeColor: () => '#111',
    polygonLabel: getLabel,
    polygonAltitude: (obj: any) => obj === hoverD ? config.polygon.hoverAltitude : config.polygon.baseAltitude,
    onPolygonClick: handlePolygonClick,
    
    // Points layer
    pointsData: pointsData,
    pointAltitude: config.points.altitude,
    pointColor: 'color',
    pointRadius: 'size',
    pointLabel: (d: any) => d.label,
    
    // Arcs layer
    arcsData: arcsData,
    arcColor: 'color',
    arcAltitude: config.arcs.altitude,
    arcStroke: config.arcs.stroke,
    arcLabel: (d: any) => d.label,
    arcDashLength: 0.5,
    arcDashGap: 0.2,
    arcDashAnimateTime: config.arcs.dashAnimateTime,
    
    // Rings layer
    ringsData: ringsData,
    ringColor: (d: any) => d.color,
    ringMaxRadius: 'maxR',
    ringPropagationSpeed: 'propagationSpeed',
    ringRepeatPeriod: 'repeatPeriod',
    ringAltitude: 'altitude',
    
    // Globe settings
    atmosphereColor: config.atmosphere.color,
    atmosphereAltitude: config.atmosphere.altitude,
    showGraticules: true,
    animateIn: true
  };

  return <Globe {...globeProps} />;
};