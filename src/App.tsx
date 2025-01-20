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
  background: linear-gradient(to bottom, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0) 100%);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #ff4b4b, #ff9b4b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  opacity: 0.8;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 8px;
  z-index: 1;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
`;

const LegendDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
  box-shadow: 0 0 10px ${props => props.color}80;
`;

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
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
      controls.autoRotateSpeed = 0.5;
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
          Visualizing {completeBans + partialBans} countries with TikTok restrictions worldwide
        </Subtitle>
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
            return `<div style="color: white; background: rgba(0, 0, 0, 0.8); padding: 10px; border-radius: 5px; font-family: Inter, sans-serif;">
              <b>${d.properties.NAME}</b><br/>
              ${banData?.details || 'No restrictions'}
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
        <LegendItem>
          <LegendDot color="#ff4444" />
          Complete Ban ({completeBans} countries)
        </LegendItem>
        <LegendItem>
          <LegendDot color="#ffaa44" />
          Partial Restrictions ({partialBans} countries)
        </LegendItem>
      </Legend>
    </AppContainer>
  );
};

export default App;
