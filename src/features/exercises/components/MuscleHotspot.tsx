import React from 'react';

interface Props {
  x: number;
  y: number;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export const MuscleHotspot: React.FC<Props> = ({ x, y, label, selected, onClick }) => (
  <button
    type="button"
    className={[
      'muscle-hotspot',
      selected ? 'muscle-hotspot-selected' : '',
    ].join(' ').trim()}
    style={{ left: x, top: y }}
    onClick={onClick}
  >
    {label}
  </button>
);
