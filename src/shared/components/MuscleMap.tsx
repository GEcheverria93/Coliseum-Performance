import React from 'react';
import MuscleMapBack from './MuscleMapBack';
import MuscleMapFront from './MuscleMapFront';

export type MuscleView = 'front' | 'back';

interface Props {
  onSelect: (grupo: string) => void;
  selected?: string;
}

export const MuscleMap: React.FC<Props> = ({ onSelect, selected }) => {
  const [view, setView] = React.useState<MuscleView>('front');

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 320, height: 366 }}>
        {view === 'front' ? (
          <MuscleMapFront selected={selected} onSelect={onSelect} />
        ) : (
          <MuscleMapBack
            selected={selected}
            onSelect={onSelect}
            variant="detailed"
          />
        )}
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
