import React, { useState, useEffect } from 'react';
import { AppContainer, GlobeContainer } from './components/styled/StyledComponents';
import { GlobeComponent, CountryFeature } from './components/Globe/GlobeComponent';
import { HeaderComponent } from './components/Header/HeaderComponent';
import { LegendComponent } from './components/Legend/LegendComponent';
import { tiktokBanData } from './data/tiktokBanData';
import { globeConfig } from './config/globeConfig';

const App: React.FC = () => {
  const [countries, setCountries] = useState<{ features: CountryFeature[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);

  useEffect(() => {
    // Fetch countries data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const handlePolygonClick = (d: CountryFeature) => {
    const banInfo = tiktokBanData.find(t => t.country === d.properties.NAME);
    if (banInfo) {
      setHoverD(d);
    }
  };

  return (
    <AppContainer>
      <HeaderComponent 
        countries={countries}
        banData={tiktokBanData}
      />
      <GlobeContainer>
        <GlobeComponent
          config={globeConfig}
          countries={countries}
          banData={tiktokBanData}
          hoverD={hoverD}
          onHexPolygonClick={handlePolygonClick}
        />
      </GlobeContainer>
      <LegendComponent 
        config={globeConfig}
        countries={countries}
        banData={tiktokBanData}
      />
    </AppContainer>
  );
};

export default App;
