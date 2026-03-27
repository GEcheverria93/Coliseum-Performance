/**
 * Perfil extendido de un alumno. Se asocia a un `User` con rol "alumno".
 */
export interface StudentProfile {
  id: string;
  userId: string;
  /**
   * Fecha de nacimiento en formato ISO (string) tal como viene de la API.
   */
  fechaNacimiento: string | null;
  aniosEntrenando: number | null;
  diasEntrenaPorSemana: number | null;
  horarioHabitual: string | null;
  observaciones: string | null;
  /**
   * Fecha de creación del perfil (ISO string).
   */
  fechaCreacion: string;
}

