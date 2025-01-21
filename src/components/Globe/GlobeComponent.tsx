import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { GlobeConfig, getCountryColor } from '../../config/globeConfig';
import { TiktokBanData } from '../../data/tiktokBanData';

export interface CountryFeature {
  type: string;
  properties: {
    NAME: string;
    [key: string]: any;
  };
  geometry: any;
}

interface GlobeComponentProps {
  config: GlobeConfig;
  countries: { features: CountryFeature[] };
  banData: TiktokBanData[];
  hoverD: CountryFeature | null;
  onHexPolygonClick: (d: CountryFeature) => void;
}

export const GlobeComponent: React.FC<GlobeComponentProps> = ({
  config,
  countries,
  banData,
  hoverD,
  onHexPolygonClick
}) => {
  const globeRef = useRef<any>();

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (controls) {
      const autoRotateValue = process.env.REACT_APP_AUTO_ROTATE?.toLowerCase();
      
      // Explicitly check for 'true', everything else is false
      const shouldAutoRotate = autoRotateValue === 'true';
      
      // Set auto-rotate and speed
      controls.autoRotate = shouldAutoRotate;
      controls.autoRotateSpeed = shouldAutoRotate ? -0.5 : 0;
    }
  }, []);

  const getHexLabel = (d: any) => {
    if (!d?.properties?.NAME) return '';
    
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
          No TikTok restrictions in place
        </div>`}
      </div>
    `;
  };

  return (
    <Globe
      ref={globeRef}
      globeImageUrl={config.images.globe}
      backgroundImageUrl={config.images.background}
      hexPolygonsData={countries.features}
      hexPolygonResolution={config.polygon.resolution}
      hexPolygonMargin={config.polygon.margin}
      hexPolygonColor={(d: any) => getCountryColor(d.properties?.NAME || '', banData)}
      hexPolygonLabel={getHexLabel}
      hexPolygonAltitude={(d: any) => d === hoverD ? config.polygon.hoverAltitude : config.polygon.baseAltitude}
      onHexPolygonClick={(d: any) => onHexPolygonClick(d)}
      atmosphereColor={config.atmosphere.color}
      atmosphereAltitude={config.atmosphere.altitude}
      showGraticules={true}
      animateIn={true}
    />
  );
};