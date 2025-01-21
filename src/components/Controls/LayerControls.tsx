import React, { useState } from 'react';
import styled from 'styled-components';
import { LayerType } from '../../config/globeConfig';
import { layerInfo } from '../../utils/layerDataHelpers';

const ControlsContainer = styled.div`
  position: absolute;
  top: 120px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  color: white;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ControlTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ControlGroup = styled.div`
  margin-bottom: 15px;
`;

const LayerItem = styled.div`
  position: relative;
  margin: 8px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const Tooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  width: 200px;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: all 0.2s;
  pointer-events: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid rgba(0, 0, 0, 0.9);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
`;

const RotateToggle = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
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
        {isAutoRotating ? '🌎 Stop Rotation' : '🌍 Start Rotation'}
      </RotateToggle>
    </ControlsContainer>
  );
};