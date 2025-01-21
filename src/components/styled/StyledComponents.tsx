import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000011;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.header`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 1;
  height: fit-content;
  max-height: 22vh;
`;

export const GlobeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const ChatPosition = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 2;
  width: 20vw;
  min-width: 280px;
  max-width: 320px;
  height: 45vh;
`;

export const ControlsPosition = styled.div`
  position: absolute;
  top: 23vh;
  right: 1rem;
  z-index: 2;
`;

export const Legend = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.75rem;
  border-radius: 8px;
  z-index: 2;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 180px;
  max-width: 220px;
  font-size: 0.8rem;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  max-width: 90vw;
  margin-left: auto;
  margin-right: auto;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.6rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 75, 75, 0.5),
      rgba(255, 155, 75, 0.5)
    );
  }
`;

export const StatValue = styled.div`
  font-size: min(4vw, 1.8rem);
  font-weight: 700;
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 0.2rem;
`;

export const StatLabel = styled.div`
  font-size: min(2vw, 0.7rem);
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  white-space: nowrap;
`;

// Common text styles
export const Title = styled.h1`
  font-size: min(4vw, 2rem);
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const SubTitle = styled.div`
  font-size: min(2vw, 0.85rem);
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

export const SmallText = styled.div`
  font-size: min(1.8vw, 0.7rem);
  color: rgba(255, 255, 255, 0.6);
`;

// Legend specific styles
export const LegendTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.4rem 0;
  font-size: 0.75rem;
`;

export const LegendStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LegendDot = styled.span<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color}80;
`;

export const LegendCount = styled.span`
  font-weight: 500;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 1px 4px;
  border-radius: 8px;
  font-size: 0.7rem;
`;