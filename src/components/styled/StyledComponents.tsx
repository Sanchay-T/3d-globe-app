import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1a1a1a;
  position: relative;
`;

export const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 12rem;
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  text-align: center;
  z-index: 1;
  color: white;
  background: linear-gradient(to bottom, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0) 100%);
  backdrop-filter: blur(10px);
`;

export const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0;
  background: linear-gradient(45deg, #ff4b4b, #ff9b4b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 1.2rem 0;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Legend = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  z-index: 1;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 250px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const LegendTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.02em;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LegendStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LegendDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 10px ${props => props.color}80;
`;

export const LegendCount = styled.span`
  font-weight: 500;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
`;