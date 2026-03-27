import { create } from 'zustand';
import type { Routine, RoutineExercise } from '../../shared/types/routine';

interface RoutinesState {
  routines: Routine[];
  routineExercises: RoutineExercise[];
  selectedRoutineId: string | null;
  setRoutines: (routines: Routine[]) => void;
  setRoutineExercises: (items: RoutineExercise[]) => void;
  selectRoutine: (id: string | null) => void;
  upsertRoutine: (routine: Routine) => void;
  upsertRoutineExercise: (item: RoutineExercise) => void;
}

export const useRoutinesStore = create<RoutinesState>((set) => ({
  routines: [],
  routineExercises: [],
  selectedRoutineId: null,
  setRoutines: (routines) => set({ routines }),
  setRoutineExercises: (items) => set({ routineExercises: items }),
  selectRoutine: (id) => set({ selectedRoutineId: id }),
  upsertRoutine: (routine) =>
    set((state) => {
      const exists = state.routines.find((r) => r.id === routine.id);
      if (exists) {
        return {
          routines: state.routines.map((r) =>
            r.id === routine.id ? routine : r,
          ),
        };
      }
      return { routines: [...state.routines, routine] };
    }),
  upsertRoutineExercise: (item) =>
    set((state) => {
      const exists = state.routineExercises.find((re) => re.id === item.id);
      if (exists) {
        return {
          routineExercises: state.routineExercises.map((re) =>
            re.id === item.id ? item : re,
          ),
        };
      }
      return { routineExercises: [...state.routineExercises, item] };
    }),
}));

