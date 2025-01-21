import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import styled from 'styled-components';
import { tiktokBanData } from './data/tiktokBanData';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1a1a1a;
  position: relative;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  text-align: center;
  z-index: 1;
  color: white;
  background: linear-gradient(to bottom, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0) 100%);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0;
  background: linear-gradient(45deg, #ff4b4b, #ff9b4b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 1.2rem 0;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  z-index: 1;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 250px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LegendTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.02em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 10px ${props => props.color}80;
`;

const LegendCount = styled.span`
  font-weight: 500;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 12rem; /* Add space below header */
`;

interface CountryProperties {
  NAME: string;
  [key: string]: any;
}

interface CountryFeature {
  type: string;
  properties: CountryProperties;
  geometry: any;
}

interface CountryData {
  features: CountryFeature[];
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<CountryData>({ features: [] });
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);
  const globeRef = useRef<any>();

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = -0.5; // Negative value for left-to-right rotation
    }
  }, []);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const getCountryColor = (countryName: string) => {
    const banData = tiktokBanData.find(d => d.country === countryName);
    if (!banData) return 'rgba(100, 100, 100, 0.3)';
    return banData.type === 'complete' ? '#ff4444' : '#ffaa44';
  };

  const completeBans = tiktokBanData.filter(d => d.type === 'complete').length;
  const partialBans = tiktokBanData.filter(d => d.type === 'partial').length;

  return (
    <AppContainer>
      <Header>
        <Title>Global TikTok Restrictions Map</Title>
        <Subtitle>
          Interactive visualization of TikTok's global regulatory landscape, showing complete bans, 
          partial restrictions, and unrestricted regions across {countries.features.length} countries worldwide
        </Subtitle>
        <Stats>
          <StatItem>
            <StatValue>{completeBans}</StatValue>
            <StatLabel>Complete Bans</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{partialBans}</StatValue>
            <StatLabel>Partial Bans</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>
              {Math.round(((completeBans + partialBans) / Math.max(countries.features.length, 1)) * 100)}%
            </StatValue>
            <StatLabel>Countries Affected</StatLabel>
          </StatItem>
        </Stats>
      </Header>
      <GlobeContainer>
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonColor={(d: any) => getCountryColor(d.properties.NAME)}
          hexPolygonLabel={(d: any) => {
            const banData = tiktokBanData.find(t => t.country === d.properties.NAME);
            return `<div style="color: white; background: rgba(0, 0, 0, 0.9); padding: 1.5rem; border-radius: 12px; font-family: Inter, system-ui, sans-serif; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); min-width: 300px;">
              <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
                <span>${d.properties.NAME}</span>
                ${banData ? `<span style="font-size: 0.75rem; padding: 4px 8px; border-radius: 12px; background: ${banData.type === 'complete' ? '#ff4444' : '#ffaa44'}; color: white; font-weight: 500;">
                  ${banData.type === 'complete' ? 'BANNED' : 'PARTIAL'}
                </span>` : ''}
              </div>
              ${banData ? `<div style="font-size: 0.9rem; line-height: 1.5; opacity: 0.9; padding-top: 0.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                ${banData.details}
              </div>` : `<div style="font-size: 0.9rem; opacity: 0.7; font-style: italic;">
                No TikTok restrictions in place
              </div>`}
            </div>`;
          }}
          onHexPolygonClick={(d: any) => {
            const banData = tiktokBanData.find(t => t.country === d.properties.NAME);
            if (banData) {
              setHoverD(d);
            }
          }}
          hexPolygonAltitude={(d: any) => (d === hoverD ? 0.1 : 0.01)}
          atmosphereColor="rgba(255, 100, 100, 0.3)"
          atmosphereAltitude={0.15}
          showGraticules={true}
          animateIn={true}
          ref={globeRef}
        />
      </GlobeContainer>
      <Legend>
        <LegendTitle>Global Restrictions</LegendTitle>
        <LegendItem>
          <LegendStatus>
            <LegendDot color="#ff4444" />
            <span>Complete Ban</span>
          </LegendStatus>
          <LegendCount>{completeBans} countries</LegendCount>
        </LegendItem>
        <LegendItem>
          <LegendStatus>
            <LegendDot color="#ffaa44" />
            <span>Partial Restrictions</span>
          </LegendStatus>
          <LegendCount>{partialBans} countries</LegendCount>
        </LegendItem>
        <LegendItem>
          <LegendStatus>
            <LegendDot color="rgba(100, 100, 100, 0.3)" />
            <span>No Restrictions</span>
          </LegendStatus>
          <LegendCount>{countries.features.length - completeBans - partialBans} countries</LegendCount>
        </LegendItem>
      </Legend>
    </AppContainer>
  );
};

export default App;
