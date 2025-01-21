import React from 'react';
import {
  Legend,
  LegendTitle,
  LegendItem,
  LegendStatus,
  LegendDot,
  LegendCount
} from '../styled/StyledComponents';
import { CountryFeature } from '../Globe/GlobeComponent';
import { TiktokBanData } from '../../data/tiktokBanData';
import { GlobeConfig } from '../../config/globeConfig';

interface LegendComponentProps {
  config: GlobeConfig;
  banData: TiktokBanData[];
  countries: { features: CountryFeature[] };
}

export const LegendComponent: React.FC<LegendComponentProps> = ({
  config,
  banData,
  countries
}) => {
  const completeBans = banData.filter(d => d.type === 'complete').length;
  const partialBans = banData.filter(d => d.type === 'partial').length;
  const noRestrictions = countries.features.length - completeBans - partialBans;

  return (
    <Legend>
      <LegendTitle>Global Restrictions</LegendTitle>
      <LegendItem>
        <LegendStatus>
          <LegendDot color={config.colors.completeBan} />
          <span>Complete Ban</span>
        </LegendStatus>
        <LegendCount>{completeBans} countries</LegendCount>
      </LegendItem>
      <LegendItem>
        <LegendStatus>
          <LegendDot color={config.colors.partialBan} />
          <span>Partial Restrictions</span>
        </LegendStatus>
        <LegendCount>{partialBans} countries</LegendCount>
      </LegendItem>
      <LegendItem>
        <LegendStatus>
          <LegendDot color={config.colors.noRestriction} />
          <span>No Restrictions</span>
        </LegendStatus>
        <LegendCount>{noRestrictions} countries</LegendCount>
      </LegendItem>
    </Legend>
  );
};