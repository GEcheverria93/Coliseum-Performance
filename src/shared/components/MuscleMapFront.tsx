import React, { type ReactNode } from "react";

export type MuscleMapFrontGroup =
  | "Pecho"
  | "Hombros"
  | "Bíceps"
  | "Tríceps"
  | "Abdomen"
  | "Cuádriceps"
  | "Pantorrillas"
  | "Cardio";

interface MuscleMapFrontProps {
  selected?: string | null;
  onSelect?: (grupo: MuscleMapFrontGroup) => void;
  className?: string;
}

interface ZoneProps {
  group: MuscleMapFrontGroup;
  label: string;
  selected?: boolean;
  onSelect?: (grupo: MuscleMapFrontGroup) => void;
  children: ReactNode;
  labelX?: number;
  labelY?: number;
  fill?: string;
  selectedFill?: string;
}

const MuscleZone: React.FC<ZoneProps> = ({
  group,
  label,
  selected,
  onSelect,
  children,
  labelX,
  labelY,
  fill = "#b85c4d",
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
        "muscle-zone",
        selected ? "is-selected" : "",
        isInteractive ? "is-interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--zone-fill": fill, "--zone-selected-fill": selectedFill }}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      <title>{label}</title>
      {children}
      {labelX !== undefined && labelY !== undefined && (
        <text className="zone-label" x={labelX} y={labelY}>
          {label}
        </text>
      )}
    </g>
  );
};

const MuscleMapFront: React.FC<MuscleMapFrontProps> = ({
  selected,
  onSelect,
  className,
}) => (
  <svg
    viewBox="0 0 280 320"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={["muscle-map-front", className].filter(Boolean).join(" ")}
    style={{ display: "block" }}
  >
    <defs>
      <linearGradient id="frontBase" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#f0dfd2" />
        <stop offset="48%" stopColor="#dcc0ad" />
        <stop offset="100%" stopColor="#b99482" />
      </linearGradient>
      <filter id="muscleGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#f97316" floodOpacity="0.25" />
      </filter>
      <style>
        {`
          .muscle-map-front {
            overflow: visible;
          }

          .body-base {
            fill: url(#frontBase);
            stroke: #8f6d60;
            stroke-width: 1.6;
          }

          .body-detail {
            fill: none;
            stroke: rgba(95, 55, 48, 0.45);
            stroke-width: 1.2;
            stroke-linecap: round;
          }

          .body-shadow {
            fill: rgba(92, 48, 39, 0.18);
            pointer-events: none;
          }

          .muscle-zone {
            outline: none;
          }

          .muscle-zone.is-interactive {
            cursor: pointer;
          }

          .zone-shape {
            fill: var(--zone-fill);
            fill-opacity: 0.9;
            stroke: rgba(255, 224, 204, 0.76);
            stroke-width: 1.15;
            transition:
              fill 140ms ease,
              fill-opacity 140ms ease,
              filter 140ms ease,
              stroke 140ms ease,
              transform 140ms ease;
            transform-box: fill-box;
            transform-origin: center;
          }

          .muscle-line {
            fill: none;
            stroke: rgba(255, 236, 219, 0.62);
            stroke-width: 0.95;
            stroke-linecap: round;
            pointer-events: none;
          }

          .deep-muscle-line {
            fill: none;
            stroke: rgba(89, 37, 31, 0.32);
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 0.85;
            pointer-events: none;
          }

          .zone-label {
            fill: #f8fafc;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 8.5px;
            font-weight: 700;
            letter-spacing: 0;
            paint-order: stroke;
            pointer-events: none;
            stroke: rgba(77, 32, 27, 0.78);
            stroke-linejoin: round;
            stroke-width: 2.5px;
            text-anchor: middle;
            dominant-baseline: middle;
          }

          .muscle-zone.is-interactive:hover .zone-shape,
          .muscle-zone.is-interactive:focus-visible .zone-shape {
            fill: #df6b4f;
            fill-opacity: 0.96;
            filter: url(#muscleGlow);
            stroke: #fed7aa;
            transform: scale(1.025);
          }

          .muscle-zone.is-selected .zone-shape {
            fill: var(--zone-selected-fill);
            fill-opacity: 1;
            filter: url(#muscleGlow);
            stroke: #ffedd5;
          }

          .muscle-zone.is-interactive:focus-visible .zone-shape {
            stroke-width: 2.4;
          }
        `}
      </style>
    </defs>

    <g className="body-base" pointerEvents="none">
      <ellipse cx="140" cy="34" rx="24" ry="28" />
      <path d="M126 60 C130 66 150 66 154 60 L158 79 C148 84 132 84 122 79 Z" />
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
      <path className="body-shadow" d="M116 82 C108 106 111 146 121 169 C115 159 104 133 105 104 C106 93 110 86 116 82 Z" />
      <path className="body-shadow" d="M164 82 C172 106 169 146 159 169 C165 159 176 133 175 104 C174 93 170 86 164 82 Z" />
      <path className="body-shadow" d="M116 210 C112 235 112 273 119 302 C111 286 106 240 111 218 C112 214 114 211 116 210 Z" />
      <path className="body-shadow" d="M164 210 C168 235 168 273 161 302 C169 286 174 240 169 218 C168 214 166 211 164 210 Z" />
    </g>

    <g pointerEvents="none">
      <path className="body-detail" d="M140 62 C138 86 138 105 140 126" />
      <path className="body-detail" d="M118 172 C129 179 151 179 162 172" />
      <path className="body-detail" d="M124 210 C128 236 128 270 121 304" />
      <path className="body-detail" d="M156 210 C152 236 152 270 159 304" />
    </g>

    <MuscleZone
      group="Hombros"
      label="Hombros"
      selected={selected === "Hombros"}
      onSelect={onSelect}
      labelX={140}
      labelY={78}
      fill="#b85d4d"
    >
      <path className="zone-shape" d="M102 78 C94 81 88 90 87 101 C98 106 113 99 121 86 C116 78 109 75 102 78 Z" />
      <path className="zone-shape" d="M178 78 C186 81 192 90 193 101 C182 106 167 99 159 86 C164 78 171 75 178 78 Z" />
      <path className="muscle-line" d="M100 84 C106 87 113 88 119 86" />
      <path className="muscle-line" d="M180 84 C174 87 167 88 161 86" />
      <path className="deep-muscle-line" d="M94 94 C101 99 110 98 117 91" />
      <path className="deep-muscle-line" d="M186 94 C179 99 170 98 163 91" />
    </MuscleZone>

    <MuscleZone
      group="Pecho"
      label="Pecho"
      selected={selected === "Pecho"}
      onSelect={onSelect}
      labelX={140}
      labelY={105}
      fill="#bf5b4d"
    >
      <path className="zone-shape" d="M113 88 C124 80 137 82 139 96 L139 122 C126 122 113 116 108 105 C105 97 107 91 113 88 Z" />
      <path className="zone-shape" d="M167 88 C156 80 143 82 141 96 L141 122 C154 122 167 116 172 105 C175 97 173 91 167 88 Z" />
      <path className="muscle-line" d="M116 100 C123 96 131 96 138 101" />
      <path className="muscle-line" d="M164 100 C157 96 149 96 142 101" />
      <path className="deep-muscle-line" d="M111 109 C119 114 129 117 138 118" />
      <path className="deep-muscle-line" d="M169 109 C161 114 151 117 142 118" />
      <path className="deep-muscle-line" d="M130 87 C134 96 137 106 138 118" />
      <path className="deep-muscle-line" d="M150 87 C146 96 143 106 142 118" />
    </MuscleZone>

    <MuscleZone
      group="Bíceps"
      label="Bíceps"
      selected={selected === "Bíceps"}
      onSelect={onSelect}
      labelX={88}
      labelY={129}
      fill="#c66755"
    >
      <path className="zone-shape" d="M82 108 C89 96 99 98 103 111 C105 127 101 142 92 153 C83 148 78 132 78 118 C78 114 79 111 82 108 Z" />
      <path className="zone-shape" d="M198 108 C191 96 181 98 177 111 C175 127 179 142 188 153 C197 148 202 132 202 118 C202 114 201 111 198 108 Z" />
      <path className="muscle-line" d="M86 111 C93 120 94 134 90 148" />
      <path className="muscle-line" d="M194 111 C187 120 186 134 190 148" />
      <path className="deep-muscle-line" d="M97 106 C99 121 96 136 91 151" />
      <path className="deep-muscle-line" d="M183 106 C181 121 184 136 189 151" />
    </MuscleZone>

    <MuscleZone
      group="Tríceps"
      label="Tríceps"
      selected={selected === "Tríceps"}
      onSelect={onSelect}
      labelX={192}
      labelY={151}
      fill="#ad5a4b"
    >
      <path className="zone-shape" d="M69 121 C72 106 79 99 86 103 C83 120 80 138 75 153 C67 149 64 135 69 121 Z" />
      <path className="zone-shape" d="M211 121 C208 106 201 99 194 103 C197 120 200 138 205 153 C213 149 216 135 211 121 Z" />
      <path className="muscle-line" d="M75 110 C73 124 72 139 75 152" />
      <path className="muscle-line" d="M205 110 C207 124 208 139 205 152" />
    </MuscleZone>

    <MuscleZone
      group="Abdomen"
      label="Abdomen"
      selected={selected === "Abdomen"}
      onSelect={onSelect}
      labelX={140}
      labelY={148}
      fill="#b95145"
    >
      <path className="zone-shape" d="M120 122 C130 127 150 127 160 122 C164 138 164 157 158 170 C150 176 130 176 122 170 C116 157 116 138 120 122 Z" />
      <path className="zone-shape" d="M111 126 C117 132 119 146 118 165 C112 160 108 149 107 138 C107 132 109 128 111 126 Z" />
      <path className="zone-shape" d="M169 126 C163 132 161 146 162 165 C168 160 172 149 173 138 C173 132 171 128 169 126 Z" />
      <path className="muscle-line" d="M140 128 L140 169" />
      <path className="muscle-line" d="M124 138 C132 141 148 141 156 138" />
      <path className="muscle-line" d="M123 152 C132 155 148 155 157 152" />
      <path className="muscle-line" d="M126 166 C134 168 146 168 154 166" />
      <path className="deep-muscle-line" d="M115 132 C113 144 114 155 119 165" />
      <path className="deep-muscle-line" d="M165 132 C167 144 166 155 161 165" />
    </MuscleZone>

    <MuscleZone
      group="Cuádriceps"
      label="Cuádriceps"
      selected={selected === "Cuádriceps"}
      onSelect={onSelect}
      labelX={140}
      labelY={229}
      fill="#bd604f"
    >
      <path className="zone-shape" d="M115 205 C124 196 137 199 140 212 C139 237 134 261 127 273 C116 269 110 246 108 223 C108 215 110 209 115 205 Z" />
      <path className="zone-shape" d="M165 205 C156 196 143 199 140 212 C141 237 146 261 153 273 C164 269 170 246 172 223 C172 215 170 209 165 205 Z" />
      <path className="muscle-line" d="M126 209 C125 228 123 247 119 265" />
      <path className="muscle-line" d="M154 209 C155 228 157 247 161 265" />
      <path className="deep-muscle-line" d="M116 217 C125 224 132 239 132 259" />
      <path className="deep-muscle-line" d="M164 217 C155 224 148 239 148 259" />
      <path className="deep-muscle-line" d="M137 215 C133 234 130 253 127 270" />
      <path className="deep-muscle-line" d="M143 215 C147 234 150 253 153 270" />
    </MuscleZone>

    <MuscleZone
      group="Pantorrillas"
      label="Pantorrillas"
      selected={selected === "Pantorrillas"}
      onSelect={onSelect}
      labelX={140}
      labelY={287}
      fill="#a95d50"
    >
      <path className="zone-shape" d="M113 260 C123 263 128 277 126 299 C121 306 113 306 109 296 C108 282 110 269 113 260 Z" />
      <path className="zone-shape" d="M167 260 C157 263 152 277 154 299 C159 306 167 306 171 296 C172 282 170 269 167 260 Z" />
      <path className="muscle-line" d="M118 266 C116 278 115 288 117 299" />
      <path className="muscle-line" d="M162 266 C164 278 165 288 163 299" />
      <path className="deep-muscle-line" d="M123 270 C126 282 124 294 119 303" />
      <path className="deep-muscle-line" d="M157 270 C154 282 156 294 161 303" />
    </MuscleZone>

    <MuscleZone
      group="Cardio"
      label="Cardio"
      selected={selected === "Cardio"}
      onSelect={onSelect}
      fill="#ef4444"
      selectedFill="#dc2626"
    >
      <path className="zone-shape" d="M140 91 C137 86 129 87 129 95 C129 104 140 110 140 110 C140 110 151 104 151 95 C151 87 143 86 140 91 Z" />
    </MuscleZone>
  </svg>
);

export default MuscleMapFront;
