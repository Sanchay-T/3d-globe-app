import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StatsComponent } from '../Stats/StatsComponent';
import { CountryFeature } from '../Globe/GlobeComponent';
import { useApp } from '../../context/AppContext';
import { HeaderWrapper, Title, SubTitle, SmallText } from '../styled/StyledComponents';

const HeaderContent = styled.div`
  max-width: 90vw;
  margin: 0 auto;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const TitleWrapper = styled.div<{ isLoading: boolean }>`
  text-align: center;
  margin-bottom: 0.5rem;
  animation: ${props => props.isLoading ? pulse : 'none'} 1.5s ease-in-out infinite;
`;

const MainTitle = styled(Title)`
  background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: min(40px, 10vw);
    height: 2px;
    background: linear-gradient(90deg, #FF416C, #FF4B2B);
    border-radius: 1px;
  }
`;

const ResponsiveSubTitle = styled(SubTitle)`
  max-width: min(700px, 80vw);
  margin-left: auto;
  margin-right: auto;

  strong {
    color: #fff;
    font-weight: 600;
  }

  span {
    opacity: 0.7;
  }
`;

const UpdateTime = styled(SmallText)`
  margin-top: 0.3rem;
  font-style: italic;
`;

interface HeaderComponentProps {
  countries: { features: CountryFeature[] };
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  countries,
}) => {
  const { currentApp, isLoading } = useApp();

  return (
    <HeaderWrapper>
      <HeaderContent>
        <TitleWrapper isLoading={isLoading}>
          <MainTitle>Global {currentApp.name} Restrictions</MainTitle>
          <ResponsiveSubTitle>
            <strong>Interactive visualization</strong> of {currentApp.name}'s global regulatory landscape, 
            showing <span>complete bans, partial restrictions, and unrestricted regions across</span>{' '}
            <strong>{countries.features.length} countries</strong>
          </ResponsiveSubTitle>
          <UpdateTime>Last updated: {currentApp.lastUpdated}</UpdateTime>
        </TitleWrapper>
        <StatsComponent 
          countries={countries}
          banData={currentApp.banData}
        />
      </HeaderContent>
    </HeaderWrapper>
  );
};