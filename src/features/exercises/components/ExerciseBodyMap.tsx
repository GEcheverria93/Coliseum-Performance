import type { FC } from 'react';
import { MuscleHotspot } from './MuscleHotspot';
import MuscleMapFront from '../../../shared/components/MuscleMapFront';

export type MuscleGroup =
  | 'Pecho'
  | 'Espalda'
  | 'Hombros'
  | 'Bíceps'
  | 'Tríceps'
  | 'Abdomen'
  | 'Glúteos'
  | 'Cuádriceps'
  | 'Isquiotibiales'
  | 'Pantorrillas'
  | 'Cardio';

interface Props {
  view: 'front' | 'back';
  selected?: MuscleGroup | null;
  onSelect: (grupo: MuscleGroup) => void;
  scale?: number;
}

type Hotspot = { key: MuscleGroup; label: string; x: number; y: number };

const HOTSPOTS_FRONT: Hotspot[] = [
  { key: 'Pecho', label: 'Pecho', x: 140, y: 90 },
  { key: 'Hombros', label: 'Hombros', x: 140, y: 60 },
  { key: 'Bíceps', label: 'Bíceps', x: 110, y: 110 },
  { key: 'Tríceps', label: 'Tríceps', x: 170, y: 110 },
  { key: 'Abdomen', label: 'Abdomen', x: 140, y: 140 },
  { key: 'Cuádriceps', label: 'Cuádriceps', x: 120, y: 210 },
  { key: 'Pantorrillas', label: 'Pantorrillas', x: 140, y: 270 },
  { key: 'Cardio', label: 'Cardio', x: 220, y: 40 },
];

const HOTSPOTS_BACK: Hotspot[] = [
  { key: 'Espalda', label: 'Espalda', x: 140, y: 90 },
  { key: 'Hombros', label: 'Hombros', x: 140, y: 60 },
  { key: 'Tríceps', label: 'Tríceps', x: 110, y: 110 },
  { key: 'Bíceps', label: 'Bíceps', x: 170, y: 110 },
  { key: 'Glúteos', label: 'Glúteos', x: 140, y: 200 },
  { key: 'Isquiotibiales', label: 'Isquiotibiales', x: 120, y: 230 },
  { key: 'Pantorrillas', label: 'Pantorrillas', x: 140, y: 270 },
  { key: 'Cardio', label: 'Cardio', x: 220, y: 40 },
];

const BASE_WIDTH = 280;
const BASE_HEIGHT = 320;

export const ExerciseBodyMap: FC<Props> = ({ view, selected, onSelect, scale = 1.35 }) => {
  const hotspots = view === 'front' ? HOTSPOTS_FRONT : HOTSPOTS_BACK;
  const width = Math.round(BASE_WIDTH * scale);
  const height = Math.round(BASE_HEIGHT * scale);

  return (
    <div style={{ position: 'relative', width, height }}>
      {view === 'front' ? (
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
          <MuscleMapFront />
        </div>
      ) : (
        <svg width={width} height={height} viewBox="0 0 280 320">
          {/* SVG base para la vista trasera, puedes reemplazarlo luego */}
          <ellipse cx="140" cy="60" rx="30" ry="40" fill="#bbb" opacity="0.2" />
          <rect x="110" y="100" width="60" height="120" rx="30" fill="#bbb" opacity="0.2" />
          <rect x="80" y="100" width="30" height="100" rx="15" fill="#bbb" opacity="0.2" />
          <rect x="170" y="100" width="30" height="100" rx="15" fill="#bbb" opacity="0.2" />
          <rect x="120" y="220" width="20" height="70" rx="10" fill="#bbb" opacity="0.2" />
          <rect x="140" y="220" width="20" height="70" rx="10" fill="#bbb" opacity="0.2" />
        </svg>
      )}

      {hotspots.map((h) => (
        <MuscleHotspot
          key={h.key}
          x={h.x * scale}
          y={h.y * scale}
          label={h.label}
          selected={selected === h.key}
          onClick={() => onSelect(h.key)}
        />
      ))}
    </div>
  );
};
