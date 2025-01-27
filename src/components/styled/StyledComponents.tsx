import React from 'react';
import styled, { keyframes } from 'styled-components';

// Constants for viewport-based calculations
export const LAYOUT_CONFIG = {
  headerHeight: '20vh',
  globeTopMargin: '8vh',
  globeVerticalOffset: '5vh',
  statCardWidth: '130px',
  statCardAspectRatio: 1.2,
  // Viewport breakpoints
  minHeight: '600px',
  maxChatHeight: '45vh',
  minChatHeight: '300px',
  safeBottomMargin: '50px'
};

// Calculate safe heights
const getSafeHeight = () => `max(
  min(${LAYOUT_CONFIG.maxChatHeight}, 100vh - ${LAYOUT_CONFIG.headerHeight} - ${LAYOUT_CONFIG.safeBottomMargin}),
  ${LAYOUT_CONFIG.minChatHeight}
)`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
`;

const contentFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IntroOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000011;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isVisible ? fadeIn : fadeOut} 1s forwards;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  color: white;
`;

export const IntroText = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.5s;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
`;

export const IntroSubText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 1s;
  max-width: 600px;
  margin: 0 2rem;
  line-height: 1.6;
`;

export const FullscreenRecommendation = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  z-index: 10;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

export const AppContent = styled.div<{ introEnded: boolean }>`
  opacity: ${props => props.introEnded ? 1 : 0};
  visibility: ${props => props.introEnded ? 'visible' : 'hidden'};
  animation: ${props => props.introEnded ? contentFadeIn : 'none'} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: ${LAYOUT_CONFIG.minHeight};
  background: #000011;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.header`
  padding: 0.85rem 1.5rem 0.75rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 1;
  height: fit-content;
  max-height: ${LAYOUT_CONFIG.headerHeight};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const GlobeContainer = styled.div`
  position: fixed;
  top: calc(${LAYOUT_CONFIG.globeTopMargin} + 2px);
  left: 0;
  width: 100vw;
  height: calc(100vh - ${LAYOUT_CONFIG.globeTopMargin});
  transform: translateY(${LAYOUT_CONFIG.globeVerticalOffset});
`;

export const ChatPosition = styled.div`
  position: fixed;
  left: 1rem;
  bottom: ${LAYOUT_CONFIG.safeBottomMargin};
  z-index: 2;
  width: 20vw;
  min-width: 280px;
  max-width: 320px;
  height: ${getSafeHeight()};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transform: translate3d(0,0,0);
  perspective: 1000px;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  will-change: transform;
  
  /* Prevent iOS rubber-band scroll */
  overscroll-behavior: none;
  touch-action: none;
  
  /* Prevent any content from overflowing */
  & > div {
    max-height: 100%;
    overflow: hidden;
  }

  /* Force GPU acceleration */
  @media (min-width: 0) {
    transform: translate3d(0,0,0);
  }
  
  @supports (-webkit-touch-callout: none) {
    bottom: max(${LAYOUT_CONFIG.safeBottomMargin}, env(safe-area-inset-bottom));
  }
`;

export const ControlsPosition = styled.div`
  position: fixed;
  top: calc(${LAYOUT_CONFIG.headerHeight} + 1rem);
  right: 1rem;
  z-index: 2;
`;

export const LegendPosition = styled.div`
  position: fixed;
  bottom: ${LAYOUT_CONFIG.safeBottomMargin};
  right: 1rem;
  z-index: 2;
`;

// Stat cards styling
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${LAYOUT_CONFIG.statCardWidth});
  gap: 0.75rem;
  margin-top: 0.75rem;
  justify-content: center;
  min-height: 0;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 0.8rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: ${LAYOUT_CONFIG.statCardWidth};
  aspect-ratio: ${LAYOUT_CONFIG.statCardAspectRatio};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 75, 75, 0.5) 20%,
      rgba(255, 155, 75, 0.5) 80%,
      transparent
    );
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.3s ease;

  ${StatCard}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
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

// Legend styles
export const LegendTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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