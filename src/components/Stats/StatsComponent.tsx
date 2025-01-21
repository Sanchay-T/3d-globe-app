import React from 'react';
import {
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel
} from '../styled/StyledComponents';
import { CountryFeature } from '../Globe/GlobeComponent';
import { TiktokBanData } from '../../data/tiktokBanData';
import { useApp } from '../../context/AppContext';

interface StatsComponentProps {
  banData: TiktokBanData[];
  countries: { features: CountryFeature[] };
}

export const StatsComponent: React.FC<StatsComponentProps> = ({
  banData,
  countries
}) => {
  const { isLoading } = useApp();
  const completeBans = banData.filter(d => d.type === 'complete').length;
  const partialBans = banData.filter(d => d.type === 'partial').length;
  const totalCountries = Math.max(countries.features.length, 1);
  const affectedPercentage = Math.round(((completeBans + partialBans) / totalCountries) * 100);

  const stats = [
    {
      value: completeBans,
      label: 'Complete Bans',
      loading: isLoading ? '...' : undefined
    },
    {
      value: partialBans,
      label: 'Partial Bans',
      loading: isLoading ? '...' : undefined
    },
    {
      value: `${affectedPercentage}%`,
      label: 'Countries Affected',
      loading: isLoading ? '...' : undefined
    }
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <StatValue>
            {stat.loading || stat.value}
          </StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </StatCard>
      ))}
    </StatsContainer>
  );
};