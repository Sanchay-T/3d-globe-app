import React, { useState } from 'react';
import styled from 'styled-components';
import { LayerType } from '../../config/globeConfig';
import { layerInfo } from '../../utils/layerDataHelpers';

const ControlsContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 0.75rem;
  border-radius: 8px;
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 180px;
  max-width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-size: 0.85rem;
  transform: scale(0.9);
  transform-origin: top right;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(0.95) translateX(-5px);
  }
`;

const ControlTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ControlGroup = styled.div`
  margin-bottom: 0.75rem;
`;

const LayerItem = styled.div`
  position: relative;
  margin: 0.4rem 0;
  
  &:first-child {
    margin-top: 0;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.8);
  user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const Checkbox = styled.input`
  margin-right: 6px;
  cursor: pointer;
  width: 12px;
  height: 12px;
`;

const Tooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  width: 160px;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  pointer-events: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);

  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 4px solid rgba(0, 0, 0, 0.95);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
`;

const RotateToggle = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface LayerControlsProps {
  activeLayers: LayerType[];
  onLayerToggle: (layer: LayerType) => void;
  isAutoRotating: boolean;
  onRotateToggle: () => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({
  activeLayers,
  onLayerToggle,
  isAutoRotating,
  onRotateToggle
}) => {
  const [hoveredLayer, setHoveredLayer] = useState<LayerType | null>(null);

  return (
    <ControlsContainer>
      <ControlTitle>Visualization Layers</ControlTitle>
      <ControlGroup>
        {(Object.entries(layerInfo) as [LayerType, { label: string; description: string }][]).map(
          ([layerId, info]) => (
            <LayerItem 
              key={layerId}
              onMouseEnter={() => setHoveredLayer(layerId)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={activeLayers.includes(layerId)}
                  onChange={() => onLayerToggle(layerId)}
                />
                {info.label}
              </CheckboxLabel>
              <Tooltip visible={hoveredLayer === layerId}>
                {info.description}
              </Tooltip>
            </LayerItem>
          )
        )}
      </ControlGroup>
      <RotateToggle onClick={onRotateToggle}>
        {isAutoRotating ? '🌎 Stop' : '🌍 Rotate'}
      </RotateToggle>
    </ControlsContainer>
  );
};