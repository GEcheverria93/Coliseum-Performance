import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { UserRole } from '../../shared/types/user';
import { useAuth } from './useAuth';

interface RequireAuthProps {
  allowedRoles?: UserRole[];
  children: ReactNode;
}

export function RequireAuth({ allowedRoles, children }: RequireAuthProps) {
  const { currentUser, getDefaultRouteForRole } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.rol)) {
    const target = getDefaultRouteForRole(currentUser.rol);
    return <Navigate to={target} replace />;
  }

  return <>{children}</>;
}

