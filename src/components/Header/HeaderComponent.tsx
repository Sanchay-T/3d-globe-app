import React from 'react';
import { Header, Title, Subtitle } from '../styled/StyledComponents';
import { StatsComponent } from '../Stats/StatsComponent';
import { CountryFeature } from '../Globe/GlobeComponent';
import { TiktokBanData } from '../../data/tiktokBanData';

interface HeaderComponentProps {
  countries: { features: CountryFeature[] };
  banData: TiktokBanData[];
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  countries,
  banData
}) => {
  return (
    <Header>
      <Title>Global TikTok Restrictions Map</Title>
      <Subtitle>
        Interactive visualization of TikTok's global regulatory landscape, showing complete bans, 
        partial restrictions, and unrestricted regions across {countries.features.length} countries worldwide
      </Subtitle>
      <StatsComponent banData={banData} countries={countries} />
    </Header>
  );
};