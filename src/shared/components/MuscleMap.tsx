import React from 'react';
import MuscleMapFront from './MuscleMapFront';

// Grupos musculares para demo (puedes expandir o ajustar nombres)
const MUSCLE_GROUPS_FRONT: { key: string; label: string; x: number; y: number }[] = [
  { key: 'Pectorales', label: 'Pectorales', x: 140, y: 80 },
  { key: 'Hombros', label: 'Hombros', x: 110, y: 60 },
  { key: 'Bíceps', label: 'Bíceps', x: 90, y: 110 },
  { key: 'Abdomen', label: 'Abdomen', x: 140, y: 140 },
  { key: 'Oblicuos', label: 'Oblicuos', x: 180, y: 140 },
  { key: 'Cuádriceps', label: 'Cuádriceps', x: 140, y: 220 },
  { key: 'Aductores', label: 'Aductores', x: 170, y: 200 },
];
const MUSCLE_GROUPS_BACK: { key: string; label: string; x: number; y: number }[] = [
  { key: 'Trapecio', label: 'Trapecio', x: 140, y: 60 },
  { key: 'Dorsales', label: 'Dorsales', x: 120, y: 100 },
  { key: 'Tríceps', label: 'Tríceps', x: 90, y: 110 },
  { key: 'Lumbares', label: 'Lumbares', x: 140, y: 160 },
  { key: 'Glúteos', label: 'Glúteos', x: 140, y: 200 },
  { key: 'Isquiotibiales', label: 'Isquiotibiales', x: 120, y: 230 },
  { key: 'Pantorrillas', label: 'Pantorrillas', x: 140, y: 260 },
];

export type MuscleView = 'front' | 'back';

interface Props {
  onSelect: (grupo: string) => void;
  selected?: string;
}

export const MuscleMap: React.FC<Props> = ({ onSelect, selected }) => {
  const [view, setView] = React.useState<MuscleView>('front');
  const groups = view === 'front' ? MUSCLE_GROUPS_FRONT : MUSCLE_GROUPS_BACK;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 320, height: 700 }}>
        {view === 'front' ? (
          <MuscleMapFront />
        ) : (
          <svg width={320} height={700} viewBox="0 0 320 700">
            {/* Placeholder para la vista trasera */}
            <rect x="0" y="0" width="320" height="700" fill="#f5f5f5" />
            <text x="50%" y="50%" textAnchor="middle" fill="#bbb" fontSize="32" dy=".3em">Vista dorsal</text>
          </svg>
        )}
        {/* Áreas clickeables */}
        {groups.map((g) => (
          <button
            key={g.key}
            className={`absolute px-2 py-1 rounded text-xs font-semibold transition border-2 ${selected === g.key ? 'bg-orange-400 text-white border-orange-600' : 'bg-white/80 text-gray-800 border-gray-400 hover:bg-orange-200'}`}
            style={{ left: g.x, top: g.y, transform: 'translate(-50%, -50%)', zIndex: 2 }}
            onClick={() => onSelect(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>
      <button
        className="mt-4 btn btn-sm btn-outline"
        onClick={() => setView(view === 'front' ? 'back' : 'front')}
      >
        Girar
      </button>
    </div>
  );
};
