import { create } from 'zustand';
import type { Plan, PlanStatus } from '../../shared/types/plan';

interface PlansState {
  plans: Plan[];
  selectedPlanId: string | null;
  /**
   * Reemplaza todas las planificaciones (por ejemplo, al sincronizar con Supabase).
   */
  setPlans: (plans: Plan[]) => void;
  /**
   * Crea o actualiza una planificación concreta.
   */
  upsertPlan: (plan: Plan) => void;
  /**
   * Marca una planificación como seleccionada (por ejemplo, para detalle en UI).
   */
  selectPlan: (planId: string | null) => void;
  /**
   * Devuelve la planificación activa de un alumno (si existe).
   */
  getActivePlanForStudent: (alumnoId: string) => Plan | undefined;
  /**
   * Devuelve el historial completo de planificaciones de un alumno,
   * ordenado por fecha de inicio descendente.
   */
  getPlansForStudent: (alumnoId: string) => Plan[];
  /**
   * Cambia el estado de una planificación concreta (activa/finalizada/cancelada).
   */
  updatePlanStatus: (planId: string, status: PlanStatus, fechaFin?: string | null) => void;
}

export const usePlansStore = create<PlansState>((set, get) => ({
  plans: [],
  selectedPlanId: null,
  setPlans: (plans) => set({ plans }),
  upsertPlan: (plan) =>
    set((state) => {
      const exists = state.plans.find((p) => p.id === plan.id);
      if (exists) {
        return {
          plans: state.plans.map((p) => (p.id === plan.id ? plan : p)),
        };
      }
      return { plans: [...state.plans, plan] };
    }),
  selectPlan: (planId) => set({ selectedPlanId: planId }),
  getActivePlanForStudent: (alumnoId) =>
    get().plans.find(
      (plan) => plan.alumnoId === alumnoId && plan.estado === 'activa',
    ),
  getPlansForStudent: (alumnoId) =>
    get()
      .plans.filter((plan) => plan.alumnoId === alumnoId)
      .sort((a, b) => (a.fechaInicio < b.fechaInicio ? 1 : -1)),
  updatePlanStatus: (planId, status, fechaFin) =>
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              estado: status,
              fechaFin:
                typeof fechaFin !== 'undefined' ? fechaFin : plan.fechaFin,
            }
          : plan,
      ),
    })),
}));

