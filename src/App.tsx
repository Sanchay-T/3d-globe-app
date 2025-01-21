import React, { useState, useEffect } from 'react';
import { AppContainer, GlobeContainer } from './components/styled/StyledComponents';
import { GlobeComponent, CountryFeature } from './components/Globe/GlobeComponent';
import { HeaderComponent } from './components/Header/HeaderComponent';
import { LegendComponent } from './components/Legend/LegendComponent';
import { LayerControls } from './components/Controls/LayerControls';
import { tiktokBanData } from './data/tiktokBanData';
import { globeConfig, LayerType } from './config/globeConfig';

const App: React.FC = () => {
  const [countries, setCountries] = useState<{ features: CountryFeature[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [activeLayers, setActiveLayers] = useState<LayerType[]>([]);

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

  const handleLayerToggle = (layer: LayerType) => {
    setActiveLayers(prev => {
      if (prev.includes(layer)) {
        return prev.filter(l => l !== layer);
      } else {
        return [...prev, layer];
      }
    });
  };

  const handleRotateToggle = () => {
    setIsAutoRotating(prev => !prev);
  };

  return (
    <AppContainer>
      <HeaderComponent 
        countries={countries}
        banData={tiktokBanData}
      />
      <LayerControls
        activeLayers={activeLayers}
        onLayerToggle={handleLayerToggle}
        isAutoRotating={isAutoRotating}
        onRotateToggle={handleRotateToggle}
      />
      <GlobeContainer>
        <GlobeComponent
          config={globeConfig}
          countries={countries}
          banData={tiktokBanData}
          hoverD={hoverD}
          onPolygonClick={handlePolygonClick}
          activeLayers={activeLayers}
          isAutoRotating={isAutoRotating}
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
