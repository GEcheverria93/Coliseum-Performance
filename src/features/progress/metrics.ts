import type { Workout, WorkoutExerciseLog } from '../../shared/types/workout';
import type { Plan } from '../../shared/types/plan';

export interface WorkoutCompletionStats {
  total: number;
  completados: number;
  porcentajeCompletados: number;
}

export interface ExerciseVolume {
  rutinaEjercicioId: string;
  series: number;
  repeticionesTotales: number;
  volumenTotalKg: number;
}

export function calculateWorkoutCompletionStats(
  workouts: Workout[],
): WorkoutCompletionStats {
  const total = workouts.length;
  const completados = workouts.filter((w) => w.completado).length;
  const porcentajeCompletados =
    total === 0 ? 0 : Math.round((completados / total) * 100);

  return {
    total,
    completados,
    porcentajeCompletados,
  };
}

export function calculateExerciseVolumeByRoutineExercise(
  logs: WorkoutExerciseLog[],
): ExerciseVolume[] {
  const map = new Map<string, ExerciseVolume>();

  for (const log of logs) {
    const current = map.get(log.rutinaEjercicioId);
    const volumen = log.pesoUsado * log.repeticionesRealizadas;

    if (!current) {
      map.set(log.rutinaEjercicioId, {
        rutinaEjercicioId: log.rutinaEjercicioId,
        series: 1,
        repeticionesTotales: log.repeticionesRealizadas,
        volumenTotalKg: volumen,
      });
    } else {
      current.series += 1;
      current.repeticionesTotales += log.repeticionesRealizadas;
      current.volumenTotalKg += volumen;
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.volumenTotalKg - a.volumenTotalKg,
  );
}

export function getPlansHistoryForStudent(
  plans: Plan[],
  alumnoId: string,
): Plan[] {
  return plans
    .filter((p) => p.alumnoId === alumnoId)
    .sort((a, b) => (a.fechaInicio < b.fechaInicio ? 1 : -1));
}

