import { create } from 'zustand';
import type { Exercise } from '../../shared/types/exercise';

interface ExercisesState {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (exercise: Exercise) => void;
  removeExercise: (id: string) => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),
  updateExercise: (exercise) =>
    set((state) => ({
      exercises: state.exercises.map((e) =>
        e.id === exercise.id ? exercise : e,
      ),
    })),
  removeExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.filter((e) => e.id !== id),
    })),
}));

