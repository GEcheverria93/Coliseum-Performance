import { NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUsersStore } from '../features/users';
import { useStudentsStore } from '../features/students';
import { useExercisesStore } from '../features/exercises';
import { useRoutinesStore } from '../features/routines';
import { usePlansStore } from '../features/plans';
import { useWorkoutsStore } from '../features/workouts';
import { Timer, RestTimer } from '../features/timer';
import { useAuth, RequireAuth } from '../features/auth';
import {
  calculateExerciseVolumeByRoutineExercise,
  calculateWorkoutCompletionStats,
  getPlansHistoryForStudent,
} from '../features/progress';
import type { User } from '../shared/types/user';
import type { StudentProfile } from '../shared/types/student';
import type { Exercise } from '../shared/types/exercise';
import type { Routine } from '../shared/types/routine';
import type { Plan } from '../shared/types/plan';
import type { Workout, WorkoutExerciseLog } from '../shared/types/workout';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  ['app-nav-link', isActive ? 'app-nav-link-active' : ''].join(' ').trim();

function useMockBootstrap() {
  const setUsers = useUsersStore((s) => s.setUsers);
  const setStudents = useStudentsStore((s) => s.setStudents);
  const setExercises = useExercisesStore((s) => s.setExercises);
  const setRoutines = useRoutinesStore((s) => s.setRoutines);
  const setRoutineExercises = useRoutinesStore((s) => s.setRoutineExercises);
  const setPlans = usePlansStore((s) => s.setPlans);
  const setWorkouts = useWorkoutsStore((s) => s.setWorkouts);
  const setExerciseLogs = useWorkoutsStore((s) => s.setExerciseLogs);

  useEffect(() => {
    const now = new Date().toISOString();

    const users: User[] = [
      {
        id: 'admin-1',
        nombre: 'Admin Coliseum',
        email: 'admin@coliseum.test',
        rol: 'administrador',
        fechaCreacion: now,
      },
      {
        id: 'prof-1',
        nombre: 'Lucía Coach',
        email: 'lucia@gym.test',
        rol: 'profesor',
        fechaCreacion: now,
      },
      {
        id: 'alumno-1',
        nombre: 'Max Power',
        email: 'max@gym.test',
        rol: 'alumno',
        fechaCreacion: now,
      },
    ];

    const students: StudentProfile[] = [
      {
        id: 'student-1',
        userId: 'alumno-1',
        fechaNacimiento: '1995-06-15',
        aniosEntrenando: 3,
        diasEntrenaPorSemana: 4,
        horarioHabitual: '18:00 - 19:30',
        observaciones: 'Busca mejorar fuerza en básicos.',
        fechaCreacion: now,
      },
    ];

    const exercises: Exercise[] = [
      {
        id: 'ex-sentadilla',
        nombre: 'Sentadilla trasera',
        descripcion: 'Sentadilla con barra, foco en fuerza.',
        urlYoutube: 'https://www.youtube.com/watch?v=YaXPRqUwItQ',
        creadoPor: 'prof-1',
        fechaCreacion: now,
      },
      {
        id: 'ex-pressbanca',
        nombre: 'Press banca',
        descripcion: 'Press de banca plano con barra.',
        urlYoutube: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
        creadoPor: 'prof-1',
        fechaCreacion: now,
      },
    ];

    const routines: Routine[] = [
      {
        id: 'rutina-fuerza-1',
        nombre: 'Fuerza 3x semana',
        duracionSemanas: 8,
        creadaPor: 'prof-1',
        fechaCreacion: now,
      },
    ];

    const plans: Plan[] = [
      {
        id: 'plan-1',
        rutinaId: 'rutina-fuerza-1',
        alumnoId: 'alumno-1',
        fechaInicio: now,
        fechaFin: null,
        estado: 'activa',
        fechaCreacion: now,
      },
    ];

    const workouts: Workout[] = [
      {
        id: 'workout-1',
        planId: 'plan-1',
        alumnoPerfilId: 'student-1',
        fecha: now,
        completado: true,
        observaciones: 'Sesión fuerte, buena técnica.',
        fechaCreacion: now,
      },
    ];

    const workoutLogs: WorkoutExerciseLog[] = [
      {
        id: 'log-1',
        workoutId: 'workout-1',
        rutinaEjercicioId: 're-sentadilla-1',
        pesoUsado: 100,
        repeticionesRealizadas: 5,
        notas: 'Última serie cercana al fallo.',
      },
    ];

    setUsers(users);
    setStudents(students);
    setExercises(exercises);
    setRoutines(routines);
    setRoutineExercises([]);
    setPlans(plans);
    setWorkouts(workouts);
    setExerciseLogs(workoutLogs);
  }, [
    setUsers,
    setStudents,
    setExercises,
    setRoutines,
    setRoutineExercises,
    setPlans,
    setWorkouts,
    setExerciseLogs,
  ]);
}

function usePageTitle() {
  const location = useLocation();
  if (location.pathname.startsWith('/alumnos')) return 'Alumnos';
  if (location.pathname.startsWith('/ejercicios')) return 'Ejercicios';
  if (location.pathname.startsWith('/rutinas')) return 'Rutinas';
  if (location.pathname.startsWith('/planificaciones')) return 'Planificaciones';
  if (location.pathname.startsWith('/entrenamientos')) return 'Entrenamientos';
  if (location.pathname.startsWith('/progreso')) return 'Progreso';
  if (location.pathname.startsWith('/admin')) return 'Administrador';
  return 'Resumen';
}

function RootRoute() {
  const { currentUser, getDefaultRouteForRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate to={getDefaultRouteForRole(currentUser.rol)} replace />
  );
}

function DashboardPage() {
  const users = useUsersStore((s) => s.users);
  const students = useStudentsStore((s) => s.students);
  const plans = usePlansStore((s) => s.plans);

  const totalProfesores = users.filter((u) => u.rol === 'profesor').length;
  const totalAlumnos = users.filter((u) => u.rol === 'alumno').length;

  const activas = plans.filter((p) => p.estado === 'activa').length;
  const finalizadas = plans.filter((p) => p.estado === 'finalizada').length;

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Resumen del gimnasio</div>
          <div className="app-subtitle">
            Vista rápida de profesores, alumnos y planificaciones activas.
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-title">Usuarios</div>
          <div className="card-meta">Profesores y alumnos registrados</div>
          <div className="list">
            <div className="list-item">
              <span className="list-label">Profesores</span>
              <span className="list-value">{totalProfesores}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Alumnos</span>
              <span className="list-value">{totalAlumnos}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Planificaciones</div>
          <div className="card-meta">Estado actual</div>
          <div className="list">
            <div className="list-item">
              <span className="list-label">Activas</span>
              <span className="list-value">{activas}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Finalizadas</span>
              <span className="list-value">{finalizadas}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Perfil de ejemplo</div>
          <div className="card-meta">Primer alumno registrado</div>
          {students[0] ? (
            <div className="list">
              <div className="list-item">
                <span className="list-label">Años entrenando</span>
                <span className="list-value">
                  {students[0].aniosEntrenando ?? '—'}
                </span>
              </div>
              <div className="list-item">
                <span className="list-label">Días/semana</span>
                <span className="list-value">
                  {students[0].diasEntrenaPorSemana ?? '—'}
                </span>
              </div>
              <div className="list-item">
                <span className="list-label">Horario</span>
                <span className="list-value">
                  {students[0].horarioHabitual ?? '—'}
                </span>
              </div>
            </div>
          ) : (
            <p className="muted">Sin alumnos todavía.</p>
          )}
        </div>
      </div>
    </>
  );
}

function StudentsPage() {
  const students = useStudentsStore((s) => s.students);

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Alumnos</div>
          <div className="app-subtitle">
            Lista de alumnos y su perfil básico.
          </div>
        </div>
      </div>

      <div className="card-grid">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <div className="card-title">{student.userId}</div>
            <div className="card-meta">
              {student.aniosEntrenando ?? 0} años entrenando ·{' '}
              {student.diasEntrenaPorSemana ?? 0} días/semana
            </div>
            <div className="list">
              <div className="list-item">
                <span className="list-label">Horario habitual</span>
                <span className="list-value">
                  {student.horarioHabitual ?? '—'}
                </span>
              </div>
              <div className="list-item">
                <span className="list-label">Observaciones</span>
                <span className="list-value">
                  {student.observaciones ?? '—'}
                </span>
              </div>
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <p className="muted">Todavía no hay alumnos registrados.</p>
        )}
      </div>
    </>
  );
}

import { useEffect } from 'react';
import { supabase } from '../shared/lib/supabase';

function ExercisesPage() {
  const exercises = useExercisesStore((s) => s.exercises);
  const setExercises = useExercisesStore((s) => s.setExercises);

  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await supabase
        .from('ejercicios')
        .select('*');
      if (!error && data) {
        setExercises(
          data.map((e) => ({
            id: e.id,
            nombre: e.nombre,
            descripcion: e.descripcion,
            // urlYoutube es opcional, solo si existe el campo
            urlYoutube: e.url_youtube || e.urlYoutube || null,
            creadoPor: e.creado_por || e.creadoPor || '',
            fechaCreacion: e.fecha_creacion || e.fechaCreacion || '',
          }))
        );
      }
    }
    fetchExercises();
  }, [setExercises]);

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Ejercicios</div>
          <div className="app-subtitle">
            Catálogo reutilizable de ejercicios del gimnasio.
          </div>
        </div>
      </div>

      <div className="card-grid">
        {exercises.map((exercise) => (
          <div className="card" key={exercise.id}>
            <div className="card-title">{exercise.nombre}</div>
            <div className="card-meta">{exercise.descripcion}</div>
          </div>
        ))}
        {exercises.length === 0 && (
          <p className="muted">Todavía no hay ejercicios definidos.</p>
        )}
      </div>
    </>
  );
}

function RoutinesPage() {
  const routines = useRoutinesStore((s) => s.routines);

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Rutinas (plantillas)</div>
          <div className="app-subtitle">
            Estructuras generales que luego se asignan como planificaciones.
          </div>
        </div>
      </div>

      <div className="card-grid">
        {routines.map((routine) => (
          <div className="card" key={routine.id}>
            <div className="card-title">{routine.nombre}</div>
            <div className="card-meta">
              Duración: {routine.duracionSemanas} semanas
            </div>
            <div className="tag-row">
              <span className="pill pill-green">Plantilla</span>
            </div>
          </div>
        ))}
        {routines.length === 0 && (
          <p className="muted">Todavía no hay rutinas definidas.</p>
        )}
      </div>
    </>
  );
}

function PlansPage() {
  const plans = usePlansStore((s) => s.plans);
  const getActivePlanForStudent = usePlansStore(
    (s) => s.getActivePlanForStudent,
  );

  const activeForAlumno1 = getActivePlanForStudent('alumno-1');

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Planificaciones</div>
          <div className="app-subtitle">
            Asignación de rutinas a alumnos y su historial.
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-title">Rutina activa de ejemplo</div>
          <div className="card-meta">Alumno: alumno-1</div>
          {activeForAlumno1 ? (
            <div className="list">
              <div className="list-item">
                <span className="list-label">Plan ID</span>
                <span className="list-value">{activeForAlumno1.id}</span>
              </div>
              <div className="list-item">
                <span className="list-label">Rutina</span>
                <span className="list-value">
                  {activeForAlumno1.rutinaId}
                </span>
              </div>
              <div className="list-item">
                <span className="list-label">Estado</span>
                <span className="list-value">{activeForAlumno1.estado}</span>
              </div>
            </div>
          ) : (
            <p className="muted">Este alumno no tiene rutina activa.</p>
          )}
        </div>

        <div className="card">
          <div className="card-title">Historial de planificaciones</div>
          <div className="card-meta">Todas las planificaciones registradas</div>
          {plans.length === 0 ? (
            <p className="muted">Todavía no hay planificaciones.</p>
          ) : (
            <div className="list">
              {plans.map((plan) => (
                <div className="list-item" key={plan.id}>
                  <span className="list-label">
                    {plan.alumnoId} · {plan.rutinaId}
                  </span>
                  <span className="list-value">
                    <span
                      className={[
                        'pill',
                        plan.estado === 'activa'
                          ? 'pill-green'
                          : plan.estado === 'finalizada'
                          ? 'pill-blue'
                          : 'pill-amber',
                      ].join(' ')}
                    >
                      {plan.estado}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function WorkoutsPage() {
  const workouts = useWorkoutsStore((s) => s.workouts);
  const getLogsForWorkout = useWorkoutsStore((s) => s.getLogsForWorkout);

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Entrenamientos diarios</div>
          <div className="app-subtitle">
            Registro de sesiones reales, pesos y estado de cada entrenamiento.
          </div>
        </div>
      </div>

      <div className="card-grid">
        {workouts.map((workout) => {
          const logs = getLogsForWorkout(workout.id);
          const seriesRegistradas = logs.length;
          const progresoPorcentaje = seriesRegistradas > 0 ? 100 : 0;

          return (
            <div className="card" key={workout.id}>
              <div className="card-title">
                Entrenamiento · {new Date(workout.fecha).toLocaleDateString()}
              </div>
              <div className="card-meta">
                Plan: {workout.planId} · Alumno perfil: {workout.alumnoPerfilId}
              </div>

              {/* Temporizador/Cronómetro siempre visible */}
              <Timer />

              <div className="list">
                <div className="list-item">
                  <span className="list-label">Completado</span>
                  <span className="list-value">
                    <span
                      className={[
                        'pill',
                        workout.completado ? 'pill-green' : 'pill-amber',
                      ].join(' ')}
                    >
                      {workout.completado ? 'Sí' : 'En curso'}
                    </span>
                  </span>
                </div>
                <div className="list-item">
                  <span className="list-label">Series registradas</span>
                  <span className="list-value">{seriesRegistradas}</span>
                </div>
                <div className="list-item">
                  <span className="list-label">% progreso (simplificado)</span>
                  <span className="list-value">{progresoPorcentaje}%</span>
                </div>
              </div>


              <div className="tag-row" style={{ flexDirection: 'column', gap: 8 }}>
                {logs.map((log) => {
                  // Buscar el RoutineExercise asociado para obtener el tiempo de descanso sugerido
                  const routineExercises = useRoutinesStore.getState().routineExercises;
                  const routineExercise = routineExercises.find(re => re.id === log.rutinaEjercicioId);
                  const descanso = routineExercise?.tiempoDescansoSegundos ?? 60;
                  return (
                    <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="pill pill-blue">
                        {log.pesoUsado} kg × {log.repeticionesRealizadas} reps
                      </span>
                      <RestTimer seconds={descanso} />
                    </div>
                  );
                })}
              </div>

              {workout.observaciones && (
                <p className="muted" style={{ marginTop: '0.5rem' }}>
                  {workout.observaciones}
                </p>
              )}
            </div>
          );
        })}

        {workouts.length === 0 && (
          <p className="muted">
            Todavía no hay entrenamientos registrados para este alumno.
          </p>
        )}
      </div>
    </>
  );
}

function ProgressPage() {
  const workouts = useWorkoutsStore((s) => s.workouts);
  const exerciseLogs = useWorkoutsStore((s) => s.exerciseLogs);
  const plans = usePlansStore((s) => s.plans);

  const stats = calculateWorkoutCompletionStats(workouts);
  const volumes = calculateExerciseVolumeByRoutineExercise(exerciseLogs);
  const plansHistory = getPlansHistoryForStudent(plans, 'alumno-1');

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Progreso</div>
          <div className="app-subtitle">
            Vista simplificada de cumplimiento, carga y planificaciones.
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-title">% de entrenamientos completados</div>
          <div className="card-meta">
            Basado en todos los entrenamientos registrados.
          </div>
          <div className="list">
            <div className="list-item">
              <span className="list-label">Total entrenamientos</span>
              <span className="list-value">{stats.total}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Completados</span>
              <span className="list-value">{stats.completados}</span>
            </div>
            <div className="list-item">
              <span className="list-label">% completado</span>
              <span className="list-value">{stats.porcentajeCompletados}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Historial de planificaciones</div>
          <div className="card-meta">Alumno: alumno-1</div>
          {plansHistory.length === 0 ? (
            <p className="muted">Sin planificaciones registradas.</p>
          ) : (
            <div className="list">
              {plansHistory.map((plan) => (
                <div className="list-item" key={plan.id}>
                  <span className="list-label">
                    {plan.rutinaId} · {new Date(plan.fechaInicio).toLocaleDateString()}
                  </span>
                  <span className="list-value">
                    <span
                      className={[
                        'pill',
                        plan.estado === 'activa'
                          ? 'pill-green'
                          : plan.estado === 'finalizada'
                          ? 'pill-blue'
                          : 'pill-amber',
                      ].join(' ')}
                    >
                      {plan.estado}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title">Carga por ejercicio (simplificada)</div>
          <div className="card-meta">
            Volumen total por `rutina_ejercicio` según registros reales.
          </div>
          {volumes.length === 0 ? (
            <p className="muted">Aún no hay registros de carga.</p>
          ) : (
            <div className="list">
              {volumes.map((item) => (
                <div className="list-item" key={item.rutinaEjercicioId}>
                  <span className="list-label">
                    {item.rutinaEjercicioId}
                  </span>
                  <span className="list-value">
                    {item.series} series · {item.repeticionesTotales} reps ·{' '}
                    {item.volumenTotalKg} kg totales
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function LoginPage() {
  const { currentUser, loginAs, getDefaultRouteForRole } = useAuth();
  const users = useUsersStore((s) => s.users);
  const location = useLocation() as any;
  const from = location.state?.from?.pathname as string | undefined;

  if (currentUser) {
    const target = from ?? getDefaultRouteForRole(currentUser.rol);
    return <Navigate to={target} replace />;
  }

  const admins = users.filter((u) => u.rol === 'administrador');
  const profesores = users.filter((u) => u.rol === 'profesor');
  const alumnos = users.filter((u) => u.rol === 'alumno');

  return (
    <div className="app-main">
      <div className="app-header">
        <div>
          <div className="app-title">Iniciar sesión</div>
          <div className="app-subtitle">
            Elige un usuario de ejemplo para entrar según rol.
          </div>
        </div>
      </div>

      <div className="card-grid">
        {admins.length > 0 && (
          <div className="card">
            <div className="card-title">Administradores</div>
            <div className="card-meta">Acceso completo al sistema</div>
            <div className="list">
              {admins.map((user) => (
                <div className="list-item" key={user.id}>
                  <span className="list-label">{user.nombre}</span>
                  <span className="list-value">
                    <button
                      type="button"
                      style={{
                        background:
                          'linear-gradient(to right, #22c55e, #3b82f6)',
                        border: 'none',
                        color: '#020617',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => loginAs(user.id)}
                    >
                      Entrar
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {profesores.length > 0 && (
          <div className="card">
            <div className="card-title">Profesores</div>
            <div className="card-meta">Gestión de contenido y alumnos</div>
            <div className="list">
              {profesores.map((user) => (
                <div className="list-item" key={user.id}>
                  <span className="list-label">{user.nombre}</span>
                  <span className="list-value">
                    <button
                      type="button"
                      style={{
                        backgroundColor: '#1f2937',
                        border: '1px solid rgba(59,130,246,0.7)',
                        color: '#bfdbfe',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => loginAs(user.id)}
                    >
                      Entrar
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {alumnos.length > 0 && (
          <div className="card">
            <div className="card-title">Alumnos</div>
            <div className="card-meta">Uso principal desde el celular</div>
            <div className="list">
              {alumnos.map((user) => (
                <div className="list-item" key={user.id}>
                  <span className="list-label">{user.nombre}</span>
                  <span className="list-value">
                    <button
                      type="button"
                      style={{
                        backgroundColor: '#1f2937',
                        border: '1px solid rgba(34,197,94,0.7)',
                        color: '#bbf7d0',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => loginAs(user.id)}
                    >
                      Entrar
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPage() {
  const users = useUsersStore((s) => s.users);
  const plans = usePlansStore((s) => s.plans);
  const workouts = useWorkoutsStore((s) => s.workouts);
  const removeUser = useUsersStore((s) => s.removeUser);

  const totalAdmins = users.filter((u) => u.rol === 'administrador').length;
  const totalProfesores = users.filter((u) => u.rol === 'profesor').length;
  const totalAlumnos = users.filter((u) => u.rol === 'alumno').length;

  return (
    <>
      <div className="app-header">
        <div>
          <div className="app-title">Panel de administrador</div>
          <div className="app-subtitle">
            Vista global de usuarios, planificaciones y entrenamientos.
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-title">Usuarios por rol</div>
          <div className="card-meta">Resumen global</div>
          <div className="list">
            <div className="list-item">
              <span className="list-label">Administradores</span>
              <span className="list-value">{totalAdmins}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Profesores</span>
              <span className="list-value">{totalProfesores}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Alumnos</span>
              <span className="list-value">{totalAlumnos}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Planificaciones y entrenamientos</div>
          <div className="card-meta">Estado general del sistema</div>
          <div className="list">
            <div className="list-item">
              <span className="list-label">Planificaciones totales</span>
              <span className="list-value">{plans.length}</span>
            </div>
            <div className="list-item">
              <span className="list-label">Entrenamientos totales</span>
              <span className="list-value">{workouts.length}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Gestión rápida de usuarios</div>
          <div className="card-meta">
            (Mock) Eliminar usuarios de prueba desde el panel.
          </div>
          {users.length === 0 ? (
            <p className="muted">No hay usuarios registrados.</p>
          ) : (
            <div className="list">
              {users.map((user) => (
                <div className="list-item" key={user.id}>
                  <span className="list-label">
                    {user.nombre} ({user.rol})
                  </span>
                  <span className="list-value">
                    {user.rol !== 'administrador' && (
                      <button
                        type="button"
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(248,113,113,0.8)',
                          color: '#fecaca',
                          borderRadius: '999px',
                          padding: '2px 8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => removeUser(user.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function AppShell() {
  const title = usePageTitle();
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-logo">Coliseum</div>
        <div className="app-nav-group">
          <div className="app-nav-title">General</div>
          <ul>
            <li>
              <NavLink to="/" className={navLinkClass} end>
                Resumen
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="app-nav-group">
          <div className="app-nav-title">Entrenamiento</div>
          <ul>
            <li>
              <NavLink to="/alumnos" className={navLinkClass}>
                Alumnos
              </NavLink>
            </li>
            <li>
              <NavLink to="/ejercicios" className={navLinkClass}>
                Ejercicios
              </NavLink>
            </li>
            <li>
              <NavLink to="/rutinas" className={navLinkClass}>
                Rutinas
              </NavLink>
            </li>
            <li>
              <NavLink to="/planificaciones" className={navLinkClass}>
                Planificaciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/entrenamientos" className={navLinkClass}>
                Entrenamientos
              </NavLink>
            </li>
            <li>
              <NavLink to="/progreso" className={navLinkClass}>
                Progreso
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="app-nav-group">
          <div className="app-nav-title">Administración</div>
          <ul>
            <li>
              <NavLink to="/admin" className={navLinkClass}>
                Panel admin
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <main className="app-main" aria-label={title}>
        <div className="app-header">
          <div>
            <div className="app-title">{title}</div>
          </div>
          {currentUser && (
            <div className="tag-row">
              <span className="pill">
                {currentUser.nombre} · {currentUser.rol}
              </span>
              <button
                type="button"
                style={{
                  backgroundColor: '#020617',
                  border: '1px solid rgba(148,163,184,0.7)',
                  color: '#e5e7eb',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/alumnos"
            element={(
              <RequireAuth allowedRoles={['administrador', 'profesor']}>
                <StudentsPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/ejercicios"
            element={(
              <RequireAuth allowedRoles={['administrador', 'profesor']}>
                <ExercisesPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/rutinas"
            element={(
              <RequireAuth allowedRoles={['administrador', 'profesor']}>
                <RoutinesPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/planificaciones"
            element={(
              <RequireAuth allowedRoles={['administrador', 'profesor']}>
                <PlansPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/entrenamientos"
            element={(
              <RequireAuth>
                <WorkoutsPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/progreso"
            element={(
              <RequireAuth>
                <ProgressPage />
              </RequireAuth>
            )}
          />
          <Route
            path="/admin"
            element={(
              <RequireAuth allowedRoles={['administrador']}>
                <AdminPage />
              </RequireAuth>
            )}
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  useMockBootstrap();
  return <AppShell />;
}

