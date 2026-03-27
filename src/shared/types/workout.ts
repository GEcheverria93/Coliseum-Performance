/**
 * Entrenamiento diario real.
 * Vincula a una planificación y a un alumno (perfil).
 */
export interface Workout {
  id: string;
  planId: string;
  alumnoPerfilId: string; // StudentProfile.id
  fecha: string; // ISO (solo fecha o fecha+hora)
  completado: boolean;
  observaciones: string | null;
  fechaCreacion: string;
}

/**
 * RegistroEjercicio: registro real de carga de un ejercicio
 * dentro de un entrenamiento concreto.
 */
export interface WorkoutExerciseLog {
  id: string;
  workoutId: string;
  rutinaEjercicioId: string; // RoutineExercise.id
  pesoUsado: number;
  repeticionesRealizadas: number;
  notas: string | null;
}

