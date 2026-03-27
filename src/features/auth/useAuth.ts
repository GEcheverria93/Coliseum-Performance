import { useUsersStore } from '../users';
import type { User, UserRole } from '../../shared/types/user';

export function useAuth() {
  const users = useUsersStore((s) => s.users);
  const currentUserId = useUsersStore((s) => s.currentUserId);
  const setCurrentUserId = useUsersStore((s) => s.setCurrentUserId);

  const currentUser: User | null =
    users.find((u) => u.id === currentUserId) ?? null;

  const loginAs = (userId: string) => {
    setCurrentUserId(userId);
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const isAdmin = currentUser?.rol === 'administrador';
  const isProfesor = currentUser?.rol === 'profesor';
  const isAlumno = currentUser?.rol === 'alumno';

  const getDefaultRouteForRole = (role: UserRole): string => {
    if (role === 'administrador') return '/admin';
    if (role === 'profesor') return '/rutinas';
    return '/progreso';
  };

  return {
    currentUser,
    loginAs,
    logout,
    isAdmin,
    isProfesor,
    isAlumno,
    getDefaultRouteForRole,
  };
}

