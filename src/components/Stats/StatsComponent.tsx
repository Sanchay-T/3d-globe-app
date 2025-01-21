import React from 'react';
import { Stats, StatItem, StatValue, StatLabel } from '../styled/StyledComponents';
import { CountryFeature } from '../Globe/GlobeComponent';
import { TiktokBanData } from '../../data/tiktokBanData';

interface StatsComponentProps {
  banData: TiktokBanData[];
  countries: { features: CountryFeature[] };
}

export const StatsComponent: React.FC<StatsComponentProps> = ({ banData, countries }) => {
  const completeBans = banData.filter(d => d.type === 'complete').length;
  const partialBans = banData.filter(d => d.type === 'partial').length;
  const totalCountries = Math.max(countries.features.length, 1);
  const affectedPercentage = Math.round(((completeBans + partialBans) / totalCountries) * 100);

  return (
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
        <StatValue>{affectedPercentage}%</StatValue>
        <StatLabel>Countries Affected</StatLabel>
      </StatItem>
    </Stats>
  );
};