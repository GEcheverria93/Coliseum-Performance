/**
 * Rutina (plantilla) de entrenamiento.
 * No está ligada a un alumno hasta que se crea una Planificación.
 */
export interface Routine {
  id: string;
  nombre: string;
  duracionSemanas: number;
  creadaPor: string; // userId (profesor)
  fechaCreacion: string; // ISO string
}

/**
 * RutinaEjercicio: definición de un ejercicio dentro de una rutina.
 * Permite periodización por semana y orden dentro de la sesión.
 */
export interface RoutineExercise {
  id: string;
  rutinaId: string;
  ejercicioId: string;
  semana: number;
  orden: number;
  series: number;
  repeticiones: number;
  porcentajeCarga?: number | null;
  comentarioIntensidad?: string | null;
  tiempoDescansoSegundos?: number | null;
}

