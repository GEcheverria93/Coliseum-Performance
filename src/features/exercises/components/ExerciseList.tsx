import React from 'react';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseListProps {
  exercises: Array<{
    id: string;
    nombre: string;
    descripcion: string;
    grupo_muscular?: string | null;
  }>;
  canEditName?: boolean;
  editingId?: string | null;
  editValue?: string;
  onStartEdit?: (id: string, currentName: string) => void;
  onChangeEditValue?: (value: string) => void;
  onCancelEdit?: () => void;
  onSaveEdit?: (id: string) => void;
  savingId?: string | null;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  canEditName,
  editingId,
  editValue,
  onStartEdit,
  onChangeEditValue,
  onCancelEdit,
  onSaveEdit,
  savingId,
}) => (
  <div className="card-grid">
    {exercises.map((ex) => (
      <ExerciseCard
        key={ex.id}
        id={ex.id}
        nombre={ex.nombre}
        descripcion={ex.descripcion}
        canEditName={canEditName}
        isEditing={editingId === ex.id}
        editValue={editingId === ex.id ? editValue : undefined}
        isSaving={savingId === ex.id}
        onStartEdit={() => onStartEdit?.(ex.id, ex.nombre)}
        onChangeEditValue={onChangeEditValue}
        onCancelEdit={onCancelEdit}
        onSaveEdit={() => onSaveEdit?.(ex.id)}
      />
    ))}
    {exercises.length === 0 && (
      <div className="card">
        <div className="card-title">Sin resultados</div>
        <div className="card-meta">No se encontraron ejercicios.</div>
      </div>
    )}
  </div>
);
