import React, { type ReactNode } from "react";

export type MuscleMapBackVariant = "exercise" | "detailed";

export type MuscleMapBackGroup =
  | "Espalda"
  | "Hombros"
  | "Bíceps"
  | "Tríceps"
  | "Glúteos"
  | "Isquiotibiales"
  | "Pantorrillas"
  | "Cardio"
  | "Trapecio"
  | "Dorsales"
  | "Lumbares";

interface MuscleMapBackProps {
  selected?: string | null;
  onSelect?: (grupo: MuscleMapBackGroup) => void;
  className?: string;
  variant?: MuscleMapBackVariant;
}

interface ZoneProps {
  group: MuscleMapBackGroup;
  label: string;
  selected?: boolean;
  onSelect?: (grupo: MuscleMapBackGroup) => void;
  children: ReactNode;
  labelX?: number;
  labelY?: number;
  fill?: string;
  selectedFill?: string;
}

const BackMuscleZone: React.FC<ZoneProps> = ({
  group,
  label,
  selected,
  onSelect,
  children,
  labelX,
  labelY,
  fill = "#738196",
  selectedFill = "#f97316",
}) => {
  const isInteractive = Boolean(onSelect);
  const handleSelect = () => onSelect?.(group);
  const handleKeyDown = (event: any) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleSelect();
  };

  return (
    <g
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={label}
      aria-pressed={isInteractive ? selected : undefined}
      className={[
        "back-muscle-zone",
        selected ? "is-selected" : "",
        isInteractive ? "is-interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--back-zone-fill": fill, "--back-zone-selected-fill": selectedFill }}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      <title>{label}</title>
      {children}
      {labelX !== undefined && labelY !== undefined && (
        <text className="back-zone-label" x={labelX} y={labelY}>
          {label}
        </text>
      )}
    </g>
  );
};

const MuscleMapBack: React.FC<MuscleMapBackProps> = ({
  selected,
  onSelect,
  className,
  variant = "exercise",
}) => {
  const isDetailed = variant === "detailed";

  return (
    <svg
      viewBox="0 0 280 320"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={["muscle-map-back", className].filter(Boolean).join(" ")}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="backBase" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e7ebf2" />
          <stop offset="100%" stopColor="#cbd3df" />
        </linearGradient>
        <filter id="backMuscleGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#f97316" floodOpacity="0.25" />
        </filter>
        <style>
          {`
            .muscle-map-back {
              overflow: visible;
            }

            .back-body-base {
              fill: url(#backBase);
              stroke: #8794a5;
              stroke-width: 1.6;
            }

            .back-body-detail {
              fill: none;
              stroke: rgba(71, 85, 105, 0.45);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1.2;
            }

            .back-muscle-zone {
              outline: none;
            }

            .back-muscle-zone.is-interactive {
              cursor: pointer;
            }

            .back-zone-shape {
              fill: var(--back-zone-fill);
              fill-opacity: 0.72;
              stroke: rgba(226, 232, 240, 0.82);
              stroke-width: 1.5;
              transition:
                fill 140ms ease,
                fill-opacity 140ms ease,
                filter 140ms ease,
                stroke 140ms ease,
                transform 140ms ease;
              transform-box: fill-box;
              transform-origin: center;
            }

            .back-muscle-line {
              fill: none;
              stroke: rgba(255, 255, 255, 0.45);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1;
              pointer-events: none;
            }

            .back-zone-label {
              fill: #f8fafc;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 8.5px;
              font-weight: 700;
              letter-spacing: 0;
              paint-order: stroke;
              pointer-events: none;
              stroke: rgba(15, 23, 42, 0.58);
              stroke-linejoin: round;
              stroke-width: 2.5px;
              text-anchor: middle;
              dominant-baseline: middle;
            }

            .back-muscle-zone.is-interactive:hover .back-zone-shape,
            .back-muscle-zone.is-interactive:focus-visible .back-zone-shape {
              fill: #fb923c;
              fill-opacity: 0.96;
              filter: url(#backMuscleGlow);
              stroke: #fed7aa;
              transform: scale(1.025);
            }

            .back-muscle-zone.is-selected .back-zone-shape {
              fill: var(--back-zone-selected-fill);
              fill-opacity: 1;
              filter: url(#backMuscleGlow);
              stroke: #ffedd5;
            }

            .back-muscle-zone.is-interactive:focus-visible .back-zone-shape {
              stroke-width: 2.4;
            }
          `}
        </style>
      </defs>

      <g className="back-body-base" pointerEvents="none">
        <ellipse cx="140" cy="34" rx="24" ry="28" />
        <path d="M126 60 C130 66 150 66 154 60 L158 80 C148 84 132 84 122 80 Z" />
        <path d="M104 80 C113 64 127 59 140 62 C153 59 167 64 176 80 C184 103 178 145 166 169 C158 183 122 183 114 169 C102 145 96 103 104 80 Z" />
        <path d="M108 171 C124 160 156 160 172 171 C176 187 169 202 156 209 C146 214 134 214 124 209 C111 202 104 187 108 171 Z" />
        <path d="M102 84 C88 89 78 103 70 124 C63 143 60 168 65 181 C72 184 80 181 84 173 C84 150 89 126 101 108 Z" />
        <path d="M178 84 C192 89 202 103 210 124 C217 143 220 168 215 181 C208 184 200 181 196 173 C196 150 191 126 179 108 Z" />
        <path d="M65 180 C63 196 66 220 74 232 C81 233 86 228 87 221 C84 203 83 188 84 174 Z" />
        <path d="M215 180 C217 196 214 220 206 232 C199 233 194 228 193 221 C196 203 197 188 196 174 Z" />
        <path d="M121 207 C111 227 105 260 108 304 C116 312 128 311 133 302 C137 266 140 233 139 210 Z" />
        <path d="M159 210 C158 233 161 266 147 302 C152 311 164 312 172 304 C175 260 169 227 159 207 Z" />
        <path d="M108 302 C107 309 111 315 121 316 C129 316 135 312 134 305 C127 308 115 308 108 302 Z" />
        <path d="M172 302 C173 309 169 315 159 316 C151 316 145 312 146 305 C153 308 165 308 172 302 Z" />
      </g>

      <g pointerEvents="none">
        <path className="back-body-detail" d="M140 62 L140 171" />
        <path className="back-body-detail" d="M118 90 C127 98 134 101 140 101 C146 101 153 98 162 90" />
        <path className="back-body-detail" d="M119 120 C128 129 134 134 140 134 C146 134 152 129 161 120" />
        <path className="back-body-detail" d="M118 172 C129 179 151 179 162 172" />
        <path className="back-body-detail" d="M124 210 C128 236 128 270 121 304" />
        <path className="back-body-detail" d="M156 210 C152 236 152 270 159 304" />
      </g>

      <BackMuscleZone
        group="Hombros"
        label="Hombros"
        selected={selected === "Hombros"}
        onSelect={onSelect}
        labelX={140}
        labelY={77}
        fill="#64748b"
      >
        <path className="back-zone-shape" d="M101 78 C93 82 88 91 87 102 C99 107 113 100 121 86 C116 78 108 75 101 78 Z" />
        <path className="back-zone-shape" d="M179 78 C187 82 192 91 193 102 C181 107 167 100 159 86 C164 78 172 75 179 78 Z" />
      </BackMuscleZone>

      {isDetailed ? (
        <>
          <BackMuscleZone
            group="Trapecio"
            label="Trapecio"
            selected={selected === "Trapecio"}
            onSelect={onSelect}
            labelX={140}
            labelY={91}
            fill="#64748b"
          >
            <path className="back-zone-shape" d="M122 77 C130 71 150 71 158 77 C160 91 154 103 140 111 C126 103 120 91 122 77 Z" />
            <path className="back-muscle-line" d="M140 78 L140 108" />
          </BackMuscleZone>

          <BackMuscleZone
            group="Dorsales"
            label="Dorsales"
            selected={selected === "Dorsales"}
            onSelect={onSelect}
            labelX={140}
            labelY={126}
            fill="#60738d"
          >
            <path className="back-zone-shape" d="M110 94 C121 96 134 103 138 116 L137 151 C124 148 111 136 106 119 C104 108 105 100 110 94 Z" />
            <path className="back-zone-shape" d="M170 94 C159 96 146 103 142 116 L143 151 C156 148 169 136 174 119 C176 108 175 100 170 94 Z" />
            <path className="back-muscle-line" d="M118 112 C125 119 132 125 137 134" />
            <path className="back-muscle-line" d="M162 112 C155 119 148 125 143 134" />
          </BackMuscleZone>

          <BackMuscleZone
            group="Lumbares"
            label="Lumbares"
            selected={selected === "Lumbares"}
            onSelect={onSelect}
            labelX={140}
            labelY={160}
            fill="#74869b"
          >
            <path className="back-zone-shape" d="M121 145 C132 150 148 150 159 145 C162 156 159 166 153 172 C146 176 134 176 127 172 C121 166 118 156 121 145 Z" />
            <path className="back-muscle-line" d="M132 150 C134 158 134 165 130 172" />
            <path className="back-muscle-line" d="M148 150 C146 158 146 165 150 172" />
          </BackMuscleZone>
        </>
      ) : (
        <BackMuscleZone
          group="Espalda"
          label="Espalda"
          selected={selected === "Espalda"}
          onSelect={onSelect}
          labelX={140}
          labelY={122}
          fill="#60738d"
        >
          <path className="back-zone-shape" d="M116 80 C128 74 152 74 164 80 C173 98 173 128 160 158 C151 174 129 174 120 158 C107 128 107 98 116 80 Z" />
          <path className="back-muscle-line" d="M140 82 L140 166" />
          <path className="back-muscle-line" d="M119 98 C128 108 135 114 140 120" />
          <path className="back-muscle-line" d="M161 98 C152 108 145 114 140 120" />
          <path className="back-muscle-line" d="M118 132 C128 139 134 145 140 153" />
          <path className="back-muscle-line" d="M162 132 C152 139 146 145 140 153" />
        </BackMuscleZone>
      )}

      <BackMuscleZone
        group="Tríceps"
        label="Tríceps"
        selected={selected === "Tríceps"}
        onSelect={onSelect}
        labelX={86}
        labelY={135}
        fill="#7c8da3"
      >
        <path className="back-zone-shape" d="M78 109 C86 97 98 100 101 114 C103 132 98 151 89 163 C80 157 75 136 76 119 C76 115 77 112 78 109 Z" />
        <path className="back-zone-shape" d="M202 109 C194 97 182 100 179 114 C177 132 182 151 191 163 C200 157 205 136 204 119 C204 115 203 112 202 109 Z" />
      </BackMuscleZone>

      <BackMuscleZone
        group="Bíceps"
        label="Bíceps"
        selected={selected === "Bíceps"}
        onSelect={onSelect}
        labelX={194}
        labelY={171}
        fill="#8a97aa"
      >
        <path className="back-zone-shape" d="M68 126 C71 113 77 106 84 109 C83 127 80 145 75 161 C67 157 64 141 68 126 Z" />
        <path className="back-zone-shape" d="M212 126 C209 113 203 106 196 109 C197 127 200 145 205 161 C213 157 216 141 212 126 Z" />
      </BackMuscleZone>

      <BackMuscleZone
        group="Glúteos"
        label="Glúteos"
        selected={selected === "Glúteos"}
        onSelect={onSelect}
        labelX={140}
        labelY={194}
        fill="#70849b"
      >
        <path className="back-zone-shape" d="M111 174 C122 166 137 170 140 187 C137 202 127 211 115 207 C108 199 106 184 111 174 Z" />
        <path className="back-zone-shape" d="M169 174 C158 166 143 170 140 187 C143 202 153 211 165 207 C172 199 174 184 169 174 Z" />
        <path className="back-muscle-line" d="M140 187 L140 207" />
      </BackMuscleZone>

      <BackMuscleZone
        group="Isquiotibiales"
        label="Isquiotibiales"
        selected={selected === "Isquiotibiales"}
        onSelect={onSelect}
        labelX={140}
        labelY={243}
        fill="#74869b"
      >
        <path className="back-zone-shape" d="M116 207 C127 201 137 207 139 222 C137 244 132 265 126 276 C115 270 109 246 108 224 C108 216 111 210 116 207 Z" />
        <path className="back-zone-shape" d="M164 207 C153 201 143 207 141 222 C143 244 148 265 154 276 C165 270 171 246 172 224 C172 216 169 210 164 207 Z" />
        <path className="back-muscle-line" d="M126 214 C124 235 122 253 118 269" />
        <path className="back-muscle-line" d="M154 214 C156 235 158 253 162 269" />
      </BackMuscleZone>

      <BackMuscleZone
        group="Pantorrillas"
        label="Pantorrillas"
        selected={selected === "Pantorrillas"}
        onSelect={onSelect}
        labelX={140}
        labelY={288}
        fill="#8190a3"
      >
        <path className="back-zone-shape" d="M113 260 C123 263 128 277 126 299 C121 306 113 306 109 296 C108 282 110 269 113 260 Z" />
        <path className="back-zone-shape" d="M167 260 C157 263 152 277 154 299 C159 306 167 306 171 296 C172 282 170 269 167 260 Z" />
        <path className="back-muscle-line" d="M118 266 C116 278 115 288 117 299" />
        <path className="back-muscle-line" d="M162 266 C164 278 165 288 163 299" />
      </BackMuscleZone>

      {!isDetailed && (
        <BackMuscleZone
          group="Cardio"
          label="Cardio"
          selected={selected === "Cardio"}
          onSelect={onSelect}
          fill="#ef4444"
          selectedFill="#dc2626"
        >
          <path className="back-zone-shape" d="M140 93 C137 88 129 89 129 97 C129 106 140 112 140 112 C140 112 151 106 151 97 C151 89 143 88 140 93 Z" />
        </BackMuscleZone>
      )}
    </svg>
  );
};

export default MuscleMapBack;
