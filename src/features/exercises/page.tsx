import React from 'react';
import { ExerciseBodyMap, type MuscleGroup } from './components/ExerciseBodyMap';
import { ExerciseList } from './components/ExerciseList';
import { supabase } from '../../shared/lib/supabase';
import { useAuth } from '../auth';

type ExerciseRow = {
  id: string;
  nombre: string;
  descripcion: string;
  grupo_muscular?: string | null;
};

export const ExercisesPage: React.FC = () => {
  const { isAdmin, isProfesor } = useAuth();
  const [view, setView] = React.useState<'front' | 'back'>('front');
  const [selectedGroup, setSelectedGroup] = React.useState<MuscleGroup | null>(
    null,
  );
  const [search, setSearch] = React.useState('');
  const [exercises, setExercises] = React.useState<ExerciseRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const canEditName = isAdmin || isProfesor;

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [savingId, setSavingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    const query = selectedGroup
      ? supabase.from('ejercicios').select('*').eq('grupo_muscular', selectedGroup)
      : supabase.from('ejercicios').select('*');

    Promise.resolve(query)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setExercises([]);
          return;
        }
        setExercises((data ?? []) as ExerciseRow[]);
      })
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [selectedGroup]);

  const filteredExercises = exercises.filter((e) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      e.nombre.toLowerCase().includes(q) ||
      e.descripcion.toLowerCase().includes(q)
    );
  });

  const startEdit = (id: string, currentName: string) => {
    if (!canEditName) return;
    setEditingId(id);
    setEditValue(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = (id: string) => {
    if (!canEditName) return;
    const next = editValue.trim();
    if (!next) return;

    setSavingId(id);
    setError(null);

    Promise.resolve(
      supabase.from('ejercicios').update({ nombre: next }).eq('id', id),
    )
      .then(({ error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        setExercises((prev) =>
          prev.map((e) => (e.id === id ? { ...e, nombre: next } : e)),
        );
        cancelEdit();
      })
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setSavingId(null));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 auto' }}>
          <ExerciseBodyMap
            view={view}
            selected={selectedGroup}
            onSelect={setSelectedGroup}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="hotspot-action"
              onClick={() => setView(view === 'front' ? 'back' : 'front')}
            >
              Girar
            </button>
            {selectedGroup && (
              <button
                type="button"
                className="hotspot-action"
                onClick={() => setSelectedGroup(null)}
              >
                Limpiar selección
              </button>
            )}
          </div>
          {selectedGroup && (
            <p className="muted" style={{ marginTop: 8 }}>
              Filtrando por: <strong>{selectedGroup}</strong>
            </p>
          )}
        </div>

        <div style={{ flex: '1 1 420px', minWidth: 280 }}>
          <div style={{ marginBottom: 12 }}>
            <input
              className="text-input"
              placeholder="Buscar ejercicios…"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="card">
              <div className="card-title">Cargando ejercicios…</div>
              <div className="card-meta">Consultando Supabase</div>
            </div>
          ) : error ? (
            <div className="card">
              <div className="card-title">Error</div>
              <div className="card-meta">
                {error}
                {selectedGroup && (
                  <div className="muted" style={{ marginTop: 8 }}>
                    Si todavía no agregaste la columna <code>grupo_muscular</code>,
                    quita el filtro o crea la columna para habilitar el filtrado.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ExerciseList
              exercises={filteredExercises}
              canEditName={canEditName}
              editingId={editingId}
              editValue={editValue}
              savingId={savingId}
              onStartEdit={startEdit}
              onChangeEditValue={setEditValue}
              onCancelEdit={cancelEdit}
              onSaveEdit={saveEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

