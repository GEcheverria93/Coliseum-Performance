import React from "react";

/**
 * SVG anatómico frontal minimalista y profesional.
 * Zonas principales listas para interacción.
 * Puedes agregar props para manejar eventos o estilos dinámicos.
 */

const MuscleMapFront: React.FC = () => (
  <svg
    viewBox="0 0 320 700"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: 400, display: "block", margin: "0 auto" }}
  >
    {/* Silueta anatómica base */}
    <g id="body-base" fill="#e5e5e5" stroke="#b0b0b0" strokeWidth="2">
      <ellipse cx="160" cy="70" rx="38" ry="50" /> {/* Cabeza */}
      <path d="M122,120 Q160,90 198,120 Q210,200 160,200 Q110,200 122,120 Z" fill="#e5e5e5" /> {/* Tórax */}
      <rect x="135" y="200" width="50" height="60" rx="25" /> {/* Abdomen */}
      <ellipse cx="160" cy="260" rx="50" ry="40" /> {/* Pelvis */}
      <rect x="70" y="120" width="30" height="120" rx="15" /> {/* Brazo izq */}
      <rect x="220" y="120" width="30" height="120" rx="15" /> {/* Brazo der */}
      <rect x="60" y="240" width="30" height="90" rx="14" /> {/* Antebrazo izq */}
      <rect x="230" y="240" width="30" height="90" rx="14" /> {/* Antebrazo der */}
      <rect x="120" y="380" width="30" height="120" rx="14" /> {/* Muslo izq */}
      <rect x="170" y="380" width="30" height="120" rx="14" /> {/* Muslo der */}
      <rect x="120" y="500" width="30" height="70" rx="12" /> {/* Pierna izq */}
      <rect x="170" y="500" width="30" height="70" rx="12" /> {/* Pierna der */}
    </g>
    {/* Grupos musculares resaltados */}
    <g id="muscle-zones">
      {/* Deltoides */}
      <ellipse cx="110" cy="120" rx="18" ry="14" fill="#cccccc" />
      <ellipse cx="210" cy="120" rx="18" ry="14" fill="#cccccc" />
      {/* Pectorales */}
      <ellipse cx="145" cy="150" rx="18" ry="14" fill="#d6d6d6" />
      <ellipse cx="175" cy="150" rx="18" ry="14" fill="#d6d6d6" />
      {/* Bíceps */}
      <ellipse cx="85" cy="170" rx="12" ry="18" fill="#cfcfcf" />
      <ellipse cx="235" cy="170" rx="12" ry="18" fill="#cfcfcf" />
      {/* Tríceps */}
      <ellipse cx="85" cy="210" rx="10" ry="16" fill="#bdbdbd" />
      <ellipse cx="235" cy="210" rx="10" ry="16" fill="#bdbdbd" />
      {/* Antebrazo */}
      <ellipse cx="75" cy="270" rx="10" ry="22" fill="#e0e0e0" />
      <ellipse cx="245" cy="270" rx="10" ry="22" fill="#e0e0e0" />
      {/* Abdomen */}
      <rect x="145" y="210" width="30" height="40" rx="12" fill="#ededed" />
      {/* Oblicuos */}
      <ellipse cx="130" cy="230" rx="10" ry="18" fill="#ededed" />
      <ellipse cx="190" cy="230" rx="10" ry="18" fill="#ededed" />
      {/* Cuádriceps */}
      <ellipse cx="135" cy="420" rx="14" ry="28" fill="#d6d6d6" />
      <ellipse cx="185" cy="420" rx="14" ry="28" fill="#d6d6d6" />
      {/* Aductores */}
      <ellipse cx="160" cy="340" rx="16" ry="22" fill="#cfcfcf" />
      {/* Abductores */}
      <ellipse cx="110" cy="340" rx="12" ry="18" fill="#e0e0e0" />
      <ellipse cx="210" cy="340" rx="12" ry="18" fill="#e0e0e0" />
      {/* Pantorrillas */}
      <ellipse cx="135" cy="570" rx="10" ry="28" fill="#ededed" />
      <ellipse cx="185" cy="570" rx="10" ry="28" fill="#ededed" />
    </g>
    {/* Etiquetas */}
    <g
      id="labels"
      fontFamily="sans-serif"
      fontSize="14"
      fill="#444"
      stroke="#fff"
      strokeWidth="0.5"
      textAnchor="start"
    >
      <text x="60" y="115">Deltoides</text>
      <text x="60" y="155">Bíceps</text>
      <text x="60" y="205">Tríceps</text>
      <text x="60" y="235">Oblicuos</text>
      <text x="60" y="350">Abductores</text>
      <text x="60" y="430">Cuádriceps</text>
      <text x="60" y="570">Pantorrillas</text>
      <text x="230" y="115">Pectorales</text>
      <text x="230" y="200">Abdomen</text>
      <text x="230" y="270">Antebrazo</text>
      <text x="230" y="350">Aductores</text>
    </g>
  </svg>
);

export default MuscleMapFront;
