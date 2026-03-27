export type PlanStatus = 'activa' | 'finalizada' | 'cancelada';

/**
 * Planificación: instancia de una rutina asignada a un alumno.
 * No modifica la plantilla original de la rutina.
 */
export interface Plan {
  id: string;
  rutinaId: string;
  alumnoId: string; // userId o studentId asociado al alumno
  fechaInicio: string; // ISO string
  fechaFin: string | null; // puede ser null mientras está activa
  estado: PlanStatus;
  /**
   * Para auditoría y posible comparación futura.
   */
  fechaCreacion: string;
}

