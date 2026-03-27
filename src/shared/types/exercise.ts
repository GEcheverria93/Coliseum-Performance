/**
 * Ejercicio reutilizable dentro del sistema.
 * Los videos se referencian solo por URL de YouTube.
 */
export interface Exercise {
  id: string;
  nombre: string;
  descripcion: string;
  urlYoutube: string | null;
  creadoPor: string; // userId del profesor que lo creó
  fechaCreacion: string; // ISO string
}

