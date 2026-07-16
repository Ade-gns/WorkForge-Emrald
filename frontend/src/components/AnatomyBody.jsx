// Silhouette anatomique interactive (SVG) — vue de face et de dos.
// Chaque zone est cliquable et met en surbrillance le muscle correspondant.

const zoneStyle = (id, selected) =>
  `cursor-pointer transition-colors duration-200 ${
    selected === id ? "fill-emerald-500" : "fill-zinc-700 hover:fill-emerald-500/60"
  }`;

function Zone({ id, selected, onSelect, children, label, testid }) {
  return (
    <g
      data-testid={testid || `anatomy-zone-${id}`}
      onClick={() => onSelect(id)}
      className={zoneStyle(id, selected)}
      role="button"
      aria-label={label}
    >
      {children}
    </g>
  );
}

const Base = ({ children }) => (
  <g fill="#18181b" stroke="#3f3f46" strokeWidth="1">
    {/* tête */}
    <circle cx="100" cy="34" r="20" />
    {/* cou */}
    <rect x="90" y="52" width="20" height="12" rx="4" />
    {/* torse */}
    <path d="M64 66 Q100 58 136 66 L130 150 Q100 160 70 150 Z" />
    {/* bassin */}
    <path d="M70 150 Q100 160 130 150 L126 186 Q100 196 74 186 Z" />
    {/* bras */}
    <path d="M64 68 L50 76 L40 150 L52 154 L64 88 Z" />
    <path d="M136 68 L150 76 L160 150 L148 154 L136 88 Z" />
    {/* jambes */}
    <path d="M74 186 L72 300 L86 300 L96 190 Z" />
    <path d="M126 186 L128 300 L114 300 L104 190 Z" />
    {/* mollets/pieds */}
    <path d="M72 300 L70 372 L86 372 L86 300 Z" />
    <path d="M128 300 L130 372 L114 372 L114 300 Z" />
    {children}
  </g>
);

export function AnatomyFront({ selected, onSelect }) {
  return (
    <svg viewBox="0 0 200 390" className="h-full w-full">
      <Base>
        <Zone id="epaules" selected={selected} onSelect={onSelect} label="Épaules">
          <ellipse cx="66" cy="74" rx="12" ry="9" />
          <ellipse cx="134" cy="74" rx="12" ry="9" />
        </Zone>
        <Zone id="pectoraux" selected={selected} onSelect={onSelect} label="Pectoraux">
          <path d="M72 78 Q100 74 128 78 L124 104 Q100 112 76 104 Z" />
        </Zone>
        <Zone id="biceps" selected={selected} onSelect={onSelect} label="Biceps">
          <ellipse cx="52" cy="104" rx="7" ry="16" />
          <ellipse cx="148" cy="104" rx="7" ry="16" />
        </Zone>
        <Zone id="avant-bras" selected={selected} onSelect={onSelect} label="Avant-bras">
          <ellipse cx="46" cy="138" rx="6" ry="14" />
          <ellipse cx="154" cy="138" rx="6" ry="14" />
        </Zone>
        <Zone id="abdominaux" selected={selected} onSelect={onSelect} label="Abdominaux">
          <rect x="86" y="112" width="28" height="66" rx="8" />
        </Zone>
        <Zone id="quadriceps" selected={selected} onSelect={onSelect} label="Quadriceps">
          <ellipse cx="84" cy="240" rx="10" ry="42" />
          <ellipse cx="116" cy="240" rx="10" ry="42" />
        </Zone>
        <Zone id="mollets" selected={selected} onSelect={onSelect} label="Mollets" testid="anatomy-zone-mollets-front">
          <ellipse cx="79" cy="334" rx="7" ry="24" />
          <ellipse cx="121" cy="334" rx="7" ry="24" />
        </Zone>
      </Base>
    </svg>
  );
}

export function AnatomyBack({ selected, onSelect }) {
  return (
    <svg viewBox="0 0 200 390" className="h-full w-full">
      <Base>
        <Zone id="trapezes" selected={selected} onSelect={onSelect} label="Trapèzes">
          <path d="M82 66 Q100 60 118 66 L112 92 Q100 88 88 92 Z" />
        </Zone>
        <Zone id="dos" selected={selected} onSelect={onSelect} label="Dos">
          <path d="M76 94 Q100 90 124 94 L120 140 Q100 148 80 140 Z" />
        </Zone>
        <Zone id="triceps" selected={selected} onSelect={onSelect} label="Triceps">
          <ellipse cx="52" cy="106" rx="7" ry="16" />
          <ellipse cx="148" cy="106" rx="7" ry="16" />
        </Zone>
        <Zone id="lombaires" selected={selected} onSelect={onSelect} label="Lombaires">
          <rect x="86" y="142" width="28" height="30" rx="7" />
        </Zone>
        <Zone id="fessiers" selected={selected} onSelect={onSelect} label="Fessiers">
          <path d="M76 176 Q100 172 124 176 L120 200 Q100 210 80 200 Z" />
        </Zone>
        <Zone id="ischio" selected={selected} onSelect={onSelect} label="Ischio-jambiers">
          <ellipse cx="84" cy="250" rx="10" ry="40" />
          <ellipse cx="116" cy="250" rx="10" ry="40" />
        </Zone>
        <Zone id="mollets" selected={selected} onSelect={onSelect} label="Mollets" testid="anatomy-zone-mollets-back">
          <ellipse cx="79" cy="336" rx="7" ry="24" />
          <ellipse cx="121" cy="336" rx="7" ry="24" />
        </Zone>
      </Base>
    </svg>
  );
}
