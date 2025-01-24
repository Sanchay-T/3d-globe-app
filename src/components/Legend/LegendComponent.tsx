import React from 'react';
import styled from 'styled-components';
import { GlobeConfig } from '../../config/globeConfig';
import { CountryFeature } from '../Globe/GlobeComponent';
import { TiktokBanData } from '../../data/tiktokBanData';
import { LegendPosition } from '../styled/StyledComponents';
import { useApp } from '../../context/AppContext';

const LegendContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 0.75rem;
  border-radius: 12px;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 180px;
  max-width: 220px;
  font-size: 0.8rem;
  transition: transform 0.2s ease;
  transform-origin: bottom right;

  &:hover {
    transform: translateY(-5px);
  }

  // Ensure content fits within viewport
  @media (max-height: 600px) {
    transform: scale(0.9);
    transform-origin: bottom right;
    
    &:hover {
      transform: scale(0.9) translateY(-5px);
    }
  }
`;

const Title = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;

  @media (max-height: 600px) {
    font-size: 0.7rem;
  }
`;

const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ColorDot = styled.span<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color}80;
`;

const Count = styled.span`
  font-weight: 500;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7rem;

  @media (max-height: 600px) {
    font-size: 0.65rem;
    padding: 1px 4px;
  }
`;

interface LegendComponentProps {
  config: GlobeConfig;
  countries: { features: CountryFeature[] };
  banData: TiktokBanData[];
}

export const LegendComponent: React.FC<LegendComponentProps> = ({
  config,
  countries,
  banData
}) => {
  const { currentApp } = useApp();
  const completeBans = banData.filter(d => d.type === 'complete').length;
  const partialBans = banData.filter(d => d.type === 'partial').length;
  const noRestrictions = countries.features.length - (completeBans + partialBans);

  const statuses = [
    {
      label: 'National Ban',
      color: config.colors.completeBan,
      count: completeBans
    },
    {
      label: 'Government Restrictions',
      color: config.colors.partialBan,
      count: partialBans
    },
    {
      label: 'No Official Restrictions',
      color: config.colors.noRestriction,
      count: noRestrictions
    }
  ];

  return (
    <LegendPosition>
      <LegendContainer>
        <Title>{currentApp.name ? `${currentApp.name} Restrictions` : 'Global Restrictions'}</Title>
        <StatusList>
          {statuses.map(status => (
            <StatusItem key={status.label}>
              <StatusLabel>
                <ColorDot color={status.color} />
                {status.label}
              </StatusLabel>
              <Count>{status.count}</Count>
            </StatusItem>
          ))}
        </StatusList>
      </LegendContainer>
    </LegendPosition>
  );
};