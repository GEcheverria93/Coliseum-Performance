import React from 'react';

interface Props {
  id: string;
  nombre: string;
  descripcion: string;
  canEditName?: boolean;
  isEditing?: boolean;
  editValue?: string;
  onStartEdit?: () => void;
  onChangeEditValue?: (value: string) => void;
  onCancelEdit?: () => void;
  onSaveEdit?: () => void;
  isSaving?: boolean;
}

export const ExerciseCard: React.FC<Props> = ({
  nombre,
  descripcion,
  canEditName,
  isEditing,
  editValue,
  onStartEdit,
  onChangeEditValue,
  onCancelEdit,
  onSaveEdit,
  isSaving,
}) => (
  <div className="card">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className="card-title" style={{ flex: 1, marginBottom: 0 }}>
        {isEditing ? (
          <input
            className="text-input text-input-sm"
            value={editValue ?? ''}
            onChange={(e: any) => onChangeEditValue?.(e.target.value)}
            placeholder="Nombre del ejercicio"
            autoFocus
          />
        ) : (
          nombre
        )}
      </div>
      {canEditName && !isEditing && (
        <button
          type="button"
          className="hotspot-action"
          style={{ padding: '2px 8px' }}
          onClick={onStartEdit}
          title="Editar nombre"
        >
          Editar
        </button>
      )}
    </div>
    <div className="card-meta">{descripcion}</div>

    {canEditName && isEditing && (
      <div className="tag-row" style={{ marginTop: 0 }}>
        <button
          type="button"
          className="hotspot-action"
          style={{
            padding: '2px 10px',
            borderColor: 'rgba(34, 197, 94, 0.7)',
          }}
          onClick={onSaveEdit}
          disabled={isSaving}
        >
          {isSaving ? 'Guardando…' : 'Guardar'}
        </button>
        <button
          type="button"
          className="hotspot-action"
          style={{ padding: '2px 10px' }}
          onClick={onCancelEdit}
          disabled={isSaving}
        >
          Cancelar
        </button>
      </div>
    )}
  </div>
);
