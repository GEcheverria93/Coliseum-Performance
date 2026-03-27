export type UserRole = 'administrador' | 'profesor' | 'alumno';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  /**
   * ISO string de fecha de creación proveniente de la API (Supabase).
   * Ejemplo: "2026-03-02T10:00:00Z"
   */
  fechaCreacion: string;
}

