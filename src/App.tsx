import React, { useState, useEffect } from 'react';
import {
  AppContainer,
  GlobeContainer,
  ControlsPosition,
  ChatPosition,
  IntroOverlay,
  IntroText,
  IntroSubText,
  FullscreenRecommendation
} from './components/styled/StyledComponents';
import { GlobeComponent, CountryFeature } from './components/Globe/GlobeComponent';
import { HeaderComponent } from './components/Header/HeaderComponent';
import { LegendComponent } from './components/Legend/LegendComponent';
import { LayerControls } from './components/Controls/LayerControls';
import { ChatInterface } from './components/Chat/ChatInterface';
import { AppProvider, useApp } from './context/AppContext';
import { globeConfig, LayerType } from './config/globeConfig';

const AppContent: React.FC = () => {
  const [countries, setCountries] = useState<{ features: CountryFeature[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<CountryFeature | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [activeLayers, setActiveLayers] = useState<LayerType[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenMessage, setShowFullscreenMessage] = useState(true);
  const { currentApp, setAppData } = useApp();

  useEffect(() => {
    // Handle intro animation
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // 4 seconds total for intro

    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-dismiss fullscreen message after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullscreenMessage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch countries data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        // Sort countries by name for consistent ordering
        data.features.sort((a: CountryFeature, b: CountryFeature) => 
          a.properties.NAME.localeCompare(b.properties.NAME)
        );
        setCountries(data);
      });
  }, []);

  const handlePolygonClick = (d: CountryFeature) => {
    const banInfo = currentApp.banData.find(t => t.country === d.properties.NAME);
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

  const handleAppSearch = async (appName: string) => {
    await setAppData(appName);
    // Reset hover state when changing apps
    setHoverD(null);
  };

  return (
    <AppContainer>
      <IntroOverlay isVisible={showIntro}>
        <IntroText>Welcome to TikTok Ban Globe</IntroText>
        <IntroSubText>Discover the global landscape of TikTok regulations and restrictions across different countries</IntroSubText>
      </IntroOverlay>
      <FullscreenRecommendation isVisible={showFullscreenMessage}>
        For optimal viewing, click to enter fullscreen
      </FullscreenRecommendation>
      <HeaderComponent
        countries={countries}
      />
      <GlobeContainer>
        <GlobeComponent
          config={globeConfig}
          countries={countries}
          banData={currentApp.banData}
          hoverD={hoverD}
          onPolygonClick={handlePolygonClick}
          activeLayers={activeLayers}
          isAutoRotating={isAutoRotating}
        />
        <ControlsPosition>
          <LayerControls
            activeLayers={activeLayers}
            onLayerToggle={handleLayerToggle}
            isAutoRotating={isAutoRotating}
            onRotateToggle={handleRotateToggle}
          />
        </ControlsPosition>
        <ChatPosition>
          <ChatInterface onAppSearch={handleAppSearch} />
        </ChatPosition>
        <LegendComponent 
          config={globeConfig}
          countries={countries}
          banData={currentApp.banData}
        />
      </GlobeContainer>
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
