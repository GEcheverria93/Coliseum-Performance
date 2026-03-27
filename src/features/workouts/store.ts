import { create } from 'zustand';
import type { Workout, WorkoutExerciseLog } from '../../shared/types/workout';

interface WorkoutsState {
  workouts: Workout[];
  exerciseLogs: WorkoutExerciseLog[];
  setWorkouts: (workouts: Workout[]) => void;
  setExerciseLogs: (logs: WorkoutExerciseLog[]) => void;
  upsertWorkout: (workout: Workout) => void;
  addExerciseLog: (log: WorkoutExerciseLog) => void;
  updateExerciseLog: (log: WorkoutExerciseLog) => void;
  removeExerciseLog: (logId: string) => void;
  getWorkoutsForStudent: (alumnoPerfilId: string) => Workout[];
  getLogsForWorkout: (workoutId: string) => WorkoutExerciseLog[];
}

export const useWorkoutsStore = create<WorkoutsState>((set, get) => ({
  workouts: [],
  exerciseLogs: [],
  setWorkouts: (workouts) => set({ workouts }),
  setExerciseLogs: (logs) => set({ exerciseLogs: logs }),
  upsertWorkout: (workout) =>
    set((state) => {
      const exists = state.workouts.find((w) => w.id === workout.id);
      if (exists) {
        return {
          workouts: state.workouts.map((w) =>
            w.id === workout.id ? workout : w,
          ),
        };
      }
      return { workouts: [...state.workouts, workout] };
    }),
  addExerciseLog: (log) =>
    set((state) => ({
      exerciseLogs: [...state.exerciseLogs, log],
    })),
  updateExerciseLog: (log) =>
    set((state) => ({
      exerciseLogs: state.exerciseLogs.map((l) =>
        l.id === log.id ? log : l,
      ),
    })),
  removeExerciseLog: (logId) =>
    set((state) => ({
      exerciseLogs: state.exerciseLogs.filter((l) => l.id !== logId),
    })),
  getWorkoutsForStudent: (alumnoPerfilId) =>
    get().workouts.filter((w) => w.alumnoPerfilId === alumnoPerfilId),
  getLogsForWorkout: (workoutId) =>
    get().exerciseLogs.filter((l) => l.workoutId === workoutId),
}));

