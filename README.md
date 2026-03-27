# 🏋️ Gym App — Arquitectura Raíz del Proyecto

Aplicación web + móvil (PWA) para gestión de rutinas de gimnasio.

Una sola aplicación que funciona:

- Como web en desktop (profesores / administrador)
- Como app instalable en celular (alumnos)

Stack principal:

Frontend:
- React
- TypeScript
- Vite
- PWA
- Tailwind
- React Query
- Zustand

Backend:
- Supabase (PostgreSQL + Auth + RLS)

---

# 🎯 OBJETIVO DEL SISTEMA

Permitir:

Administrador:
- Acceso total a todos los entornos
- Ver y gestionar profesores
- Ver y gestionar alumnos
- Ver todas las planificaciones
- Ver todos los entrenamientos
- Acceso completo sin restricciones RLS

Profesor:
- Crear ejercicios
- Crear rutinas (plantillas)
- Asignar planificaciones a alumnos
- Ver progreso

Alumno:
- Ver rutina activa
- Registrar entrenamientos
- Registrar pesos
- Ver historial
- Ver progreso
- Usar cronómetro
- Usar temporizador de descanso sugerido

---

# 🧩 MODELO FUNCIONAL

## 👤 Usuario (base del sistema)

- id
- nombre
- email
- rol (administrador | profesor | alumno)
- fecha_creacion

---

## 👑 Administrador

⚠️ Este rol es exclusivo del desarrollador.

Características:

- Acceso total al sistema
- Puede ver todos los profesores
- Puede ver todos los alumnos
- Puede ver todas las rutinas
- Puede ver todas las planificaciones
- Puede ver todos los entrenamientos
- Puede acceder tanto a vistas de profesor como de alumno
- Puede saltar restricciones normales de RLS

Regla importante:
Solo debe existir uno (o muy pocos) administradores.

---

## 🧍 Alumno

- user_id
- fecha_nacimiento
- años_entrenando
- dias_entrena_por_semana
- horario_habitual
- observaciones

Puede:
- Ver rutinas actuales
- Ver planificaciones anteriores
- Registrar entrenamientos
- Registrar pesos
- Ver progreso
- Usar cronómetro

---

## 👨‍🏫 Profesor

- user_id
- activo

Puede:
- Ver todos los alumnos
- Crear ejercicios
- Crear rutinas
- Asignar planificaciones
- Ver progreso de alumnos

(No hay relación exclusiva profesor–alumno.)

---

## 🏋️ Ejercicio

- id
- nombre
- descripcion
- url_youtube
- creado_por

---

## 📋 Rutina (Plantilla)

- id
- nombre
- duracion_semanas
- creada_por
- fecha_creacion

---

## 🧱 RutinaEjercicio

Define la estructura interna de la rutina.

- rutina_id
- ejercicio_id
- semana
- orden
- series
- repeticiones
- porcentaje_carga (opcional)
- comentario_intensidad (opcional)
- tiempo_descanso_segundos (opcional)

Permite que el profesor defina descanso sugerido.

---

## 📦 Planificación (Instancia asignada)

- rutina_id
- alumno_id
- fecha_inicio
- fecha_fin
- estado (activa | finalizada | cancelada)

Permite historial limpio por alumno.

---

## 🏋️ Entrenamiento (registro diario)

- planificacion_id
- alumno_id
- fecha
- completado
- observaciones

---

## 📊 RegistroEjercicio

Corazón del historial.

- entrenamiento_id
- rutina_ejercicio_id
- peso_usado
- repeticiones_realizadas
- notas

---

# ⏱ TEMPORIZADOR

Se implementa en dos niveles:

1️⃣ Descanso sugerido  
Basado en:
RutinaEjercicio.tiempo_descanso_segundos

2️⃣ Cronómetro libre  
Funcionalidad de interfaz (no requiere entidad nueva).

---

# 📈 PROGRESO

No requiere tablas nuevas.

Se calcula dinámicamente:

- % ejercicios completados
- % entrenamientos realizados
- Progreso por planificación
- Evolución de peso por ejercicio

---

# 🧠 STACK DEFINITIVO

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- React Query
- Zustand
- Recharts
- DnD Kit
- Zod
- date-fns
- PWA (vite-plugin-pwa)

## Backend

- Supabase
  - PostgreSQL
  - Auth
  - Row Level Security
  - Realtime

## Hosting

- Vercel (frontend)
- Supabase (backend)

Costo: prácticamente cero en fase inicial.

---

# 🏗 ESTRUCTURA POR CAPAS

⚠️ Regla importante:
Frontend y Backend se desarrollan en fases separadas.
Nunca mezclar prompts de ambas capas.

---

# 🔵 BACKEND — FASES

## Backend Fase 1 — Base del Sistema

- Tabla usuarios
- Tabla alumnos
- Tabla profesores
- Definición de roles (administrador | profesor | alumno)
- Políticas RLS:
  - Alumno → solo sus datos
  - Profesor → datos académicos generales
  - Administrador → acceso total

---

## Backend Fase 2 — Núcleo de Rutinas

- Tabla ejercicios
- Tabla rutinas
- Tabla rutina_ejercicio
- CRUD completo
- Seguridad por rol profesor
- Override total para administrador

---

## Backend Fase 3 — Planificaciones

- Tabla planificaciones
- Asignación rutina → alumno
- Estados
- Consultas optimizadas

---

## Backend Fase 4 — Entrenamientos

- Tabla entrenamientos
- Tabla registro_ejercicio
- Relaciones completas
- Validaciones

---

## Backend Fase 5 — Optimización

- Índices
- Vistas SQL para métricas
- Performance
- Ajustes RLS

---

# 🟢 FRONTEND — FASES

## Frontend Fase 1 — Base

- Configuración Vite + PWA
- Router
- Layout base
- Auth
- Protección por rol
- Perfil alumno
- Redirección dinámica según rol

---

## Frontend Fase 2 — Profesor

- CRUD ejercicios
- Builder de rutinas (drag & drop)
- Asignar planificación

---

## Frontend Fase 3 — Alumno

- Vista rutina activa
- Registro entrenamiento diario
- Carga de peso
- Marcar ejercicios completados

---

## Frontend Fase 4 — Progreso

- Gráficos evolución
- Historial por ejercicio
- % completado
- Vista historial planificaciones

---

## Frontend Fase 5 — Administrador

- Panel de control global
- Vista completa del sistema
- Acceso cruzado a entornos
- Monitor de actividad

---

## Frontend Fase 6 — Experiencia

- Cronómetro libre
- Descanso automático
- Interacción tipo “rutina completada”
- Mejoras UX

---

# 🧱 REGLAS ARQUITECTÓNICAS

- No crear entidades innecesarias
- El progreso se calcula, no se guarda
- No duplicar datos
- Rutina = plantilla
- Planificación = instancia asignada
- Entrenamiento = registro diario
- RegistroEjercicio = detalle real del esfuerzo
- Administrador tiene acceso total pero no altera el modelo

---

# 📱 MODELO DE USO

Administrador:
- Uso principalmente desktop
- Control total del sistema

Profesor:
- Principalmente desktop
- Administra contenido

Alumno:
- Principalmente celular
- Registra entrenamientos
- Instala PWA

Una sola aplicación cubre todo.

---

# 🚫 NO HACER

- No crear backend propio inicialmente
- No crear app nativa
- No guardar métricas derivadas
- No mezclar fases backend/frontend en prompts
- No crear múltiples administradores sin necesidad

---

# 🎯 OBJETIVO FINAL

Sistema:
- Escalable
- Económico
- Claro
- Mantenible
- Profesional

Este README define la estructura raíz del proyecto.
Cualquier nueva decisión debe respetar este modelo.