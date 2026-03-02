🏋️ Gym Training Management App
📌 Visión del Proyecto

Aplicación web progresiva (PWA) para la gestión integral de entrenamientos en gimnasio.

El sistema permite:

Gestión de alumnos

Gestión de profesores

Creación de rutinas y planificaciones

Registro de entrenamientos reales

Historial completo por alumno

Progresión de carga

Temporizador de descanso integrado

Visualización de progreso y métricas

El objetivo inicial es uso interno en un gimnasio con dos profesores.

🎯 Objetivo del MVP

Construir una aplicación:

Económica (infraestructura gratuita)

Accesible desde computadora y celular

Instalable como app en el celular (PWA)

Fácil de usar durante el entrenamiento

Escalable a futuro (posible SaaS)

🧱 Modelo Conceptual del Sistema
👤 Usuario

Base del sistema.

id

nombre

email

rol (profesor | alumno)

fecha_creación

👨‍🏫 Profesor

Puede ver todos los alumnos

Puede crear ejercicios

Puede crear rutinas

Puede asignar planificaciones

Puede ver progreso de alumnos

Actualmente hay 2 profesores y ambos tienen acceso total a los alumnos.

🧍 Alumno

Datos adicionales:

fecha_nacimiento

años_entrenando

días_entrena_por_semana

horario_habitual

observaciones

Puede:

Ver rutina activa

Ver planificaciones anteriores

Registrar entrenamientos

Registrar pesos utilizados

Ver historial por ejercicio

Ver gráficos de progreso

Usar temporizador

🏋️ Ejercicio

Entidad reutilizable.

nombre

descripción

url_youtube

creado_por

Los videos se utilizan exclusivamente desde YouTube (no se almacenan videos).

📋 Rutina (Plantilla)

Define estructura general.

nombre

duración_semanas

creada_por

fecha_creación

No pertenece a un alumno hasta que se asigna.

🧱 RutinaEjercicio

Define ejercicios dentro de una rutina.

rutina

ejercicio

semana

orden

series

repeticiones

porcentaje_carga (opcional)

comentario_intensidad (opcional)

tiempo_descanso_segundos (opcional)

Permite periodización y progresión.

📦 Planificación (Instancia)

Cuando una rutina se asigna a un alumno se crea una planificación.

rutina

alumno

fecha_inicio

fecha_fin

estado (activa | finalizada | cancelada)

Esto permite:

Historial completo

Comparación entre planificaciones

Evitar modificar el pasado

🏋️ Entrenamiento

Registro real diario.

planificación

alumno

fecha

completado

observaciones

📊 RegistroEjercicio

Registro real de carga.

entrenamiento

rutina_ejercicio

peso_usado

repeticiones_realizadas

notas

Permite:

Historial por ejercicio

Progresión de carga

Gráficos comparativos

⏱ Funcionalidad de Temporizador

La aplicación incluye:

1️⃣ Descanso automático

Si el profesor define tiempo_descanso:

El alumno puede iniciar un contador automático al finalizar una serie.

2️⃣ Cronómetro libre

Iniciar

Pausar

Reiniciar

No depende de una entidad adicional.

📈 Métricas y Progreso

Se calculan dinámicamente:

% de ejercicios completados

% de entrenamientos realizados

Progreso por planificación

Historial por ejercicio

Evolución de carga en gráficos

🖥️ Acceso

El sistema es una PWA (Progressive Web App):

Desde computadora → funciona como web

Desde celular → se puede instalar como app

No requiere app nativa

🧰 Tecnologías Definidas
Frontend

React

TypeScript

Vite

PWA (Service Worker + Manifest)

Backend / Base de Datos

Supabase

PostgreSQL

Supabase Auth

Supabase Realtime

Hosting

Vercel (Frontend)

Supabase (Backend)

Infraestructura en free tier.

🧠 Reglas Arquitectónicas Clave

Nunca modificar planificaciones pasadas.

Separar siempre:

Rutina (plantilla)

Planificación (instancia)

Entrenamiento (registro real)

No almacenar videos.

No mezclar lógica de progreso con estructura de rutina.

Todo progreso se calcula desde registros reales.

🚀 Fases de Desarrollo
Fase 1

Usuarios, roles, perfil alumno.

Fase 2

CRUD ejercicios y rutinas.

Fase 3

Asignación de planificaciones.

Fase 4

Registro de entrenamientos y cargas.

Fase 5

Métricas y gráficos.

Fase 6

Temporizador integrado.

🔮 Escalabilidad Futura

Preparado para:

Multi-gimnasio

Sistema de suscripción

Panel administrador avanzado

Métricas avanzadas

Exportación de datos

🧩 Estado Actual del Proyecto

MVP interno para validación en gimnasio actual.

No es SaaS por el momento.