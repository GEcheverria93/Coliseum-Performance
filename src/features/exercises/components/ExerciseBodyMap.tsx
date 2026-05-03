import type { FC } from 'react';
import MuscleMapBack, {
  type MuscleMapBackGroup,
} from '../../../shared/components/MuscleMapBack';
import MuscleMapFront, {
  type MuscleMapFrontGroup,
} from '../../../shared/components/MuscleMapFront';

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

const BASE_WIDTH = 280;
const BASE_HEIGHT = 320;

export const ExerciseBodyMap: FC<Props> = ({
  view,
  selected,
  onSelect,
  scale = 1.35,
}) => {
  const width = Math.round(BASE_WIDTH * scale);
  const height = Math.round(BASE_HEIGHT * scale);
  const handleFrontSelect = (grupo: MuscleMapFrontGroup) => {
    onSelect(grupo);
  };
  const handleBackSelect = (grupo: MuscleMapBackGroup) => {
    onSelect(grupo as MuscleGroup);
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {view === 'front' ? (
          <MuscleMapFront selected={selected} onSelect={handleFrontSelect} />
        ) : (
          <MuscleMapBack
            selected={selected}
            onSelect={handleBackSelect}
            variant="exercise"
          />
        )}
      </div>
    </div>
  );
};
