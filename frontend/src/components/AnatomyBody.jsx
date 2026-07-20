// Silhouette anatomique interactive (SVG) — vue de face et de dos.
// Chaque zone musculaire est cliquable et se met en surbrillance.

const zoneCls = (id, selected) =>
  `cursor-pointer transition-colors duration-200 ${
    selected === id
      ? "fill-emerald-500"
      : "fill-zinc-700/90 hover:fill-emerald-500/60"
  }`;

function Zone({ id, selected, onSelect, children, label, testid }) {
  return (
    <g
      data-testid={testid || `anatomy-zone-${id}`}
      onClick={() => onSelect(id)}
      className={zoneCls(id, selected)}
      role="button"
      aria-label={label}
      stroke="#0b0b0d"
      strokeWidth="0.6"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

// Corps de base (symétrique) — tête, cou, tronc, bras, jambes, mains, pieds.
const BaseBody = () => (
  <g fill="#26262d" stroke="#3c3c45" strokeWidth="1.1" strokeLinejoin="round">
    {/* tête */}
    <ellipse cx="120" cy="34" rx="19" ry="22" />
    {/* cou */}
    <path d="M111 52 L111 66 Q120 71 129 66 L129 52 Z" />
    {/* tronc (V-taper) */}
    <path d="M90 72 Q120 63 150 72 C158 84 160 120 156 150 C154 168 150 188 148 206 L92 206 C90 188 86 168 84 150 C80 120 82 84 90 72 Z" />
    {/* bras gauche */}
    <path d="M90 72 C74 78 64 92 60 118 C57 138 54 158 52 176 Q51 185 58 183 L66 156 C69 138 72 120 78 104 C82 92 86 80 92 76 Z" />
    {/* bras droit */}
    <path d="M150 72 C166 78 176 92 180 118 C183 138 186 158 188 176 Q189 185 182 183 L174 156 C171 138 168 120 162 104 C158 92 154 80 148 76 Z" />
    {/* mains */}
    <ellipse cx="56" cy="189" rx="7" ry="9" />
    <ellipse cx="184" cy="189" rx="7" ry="9" />
    {/* bassin */}
    <path d="M92 200 L148 200 L152 250 C140 262 100 262 88 250 Z" />
    {/* cuisse gauche */}
    <path d="M96 244 C91 290 96 320 100 344 L120 344 L120 248 Z" />
    {/* cuisse droite */}
    <path d="M144 244 C149 290 144 320 140 344 L120 344 L120 248 Z" />
    {/* genoux */}
    <ellipse cx="110" cy="348" rx="11" ry="9" />
    <ellipse cx="130" cy="348" rx="11" ry="9" />
    {/* jambe gauche */}
    <path d="M102 352 C100 382 102 410 106 430 L117 430 C119 406 118 376 118 354 Z" />
    {/* jambe droite */}
    <path d="M138 352 C140 382 138 410 134 430 L123 430 C121 406 122 376 122 354 Z" />
    {/* pieds */}
    <path d="M104 428 L103 442 Q114 447 118 438 L117 430 Z" />
    <path d="M136 428 L137 442 Q126 447 122 438 L123 430 Z" />
  </g>
);

const Frame = ({ children }) => (
  <svg viewBox="0 0 240 470" className="h-full w-full">
    <defs>
      <radialGradient id="anatomyGlow" cx="50%" cy="38%" r="55%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* halo émeraude */}
    <rect x="0" y="0" width="240" height="470" fill="url(#anatomyGlow)" />
    {/* ombre au sol */}
    <ellipse cx="120" cy="452" rx="62" ry="9" fill="#000000" opacity="0.5" />
    <BaseBody />
    {children}
  </svg>
);

export function AnatomyFront({ selected, onSelect }) {
  return (
    <Frame>
      {/* deltoïdes */}
      <Zone id="epaules" selected={selected} onSelect={onSelect} label="Épaules">
        <ellipse cx="86" cy="84" rx="15" ry="13" />
        <ellipse cx="154" cy="84" rx="15" ry="13" />
      </Zone>
      {/* pectoraux */}
      <Zone id="pectoraux" selected={selected} onSelect={onSelect} label="Pectoraux">
        <path d="M118 80 C104 77 91 83 89 97 C88 107 98 113 108 110 C115 108 118 99 118 89 Z" />
        <path d="M122 80 C136 77 149 83 151 97 C152 107 142 113 132 110 C125 108 122 99 122 89 Z" />
      </Zone>
      {/* biceps */}
      <Zone id="biceps" selected={selected} onSelect={onSelect} label="Biceps">
        <ellipse cx="73" cy="118" rx="10" ry="22" />
        <ellipse cx="167" cy="118" rx="10" ry="22" />
      </Zone>
      {/* avant-bras */}
      <Zone id="avant-bras" selected={selected} onSelect={onSelect} label="Avant-bras">
        <ellipse cx="63" cy="160" rx="8.5" ry="21" />
        <ellipse cx="177" cy="160" rx="8.5" ry="21" />
      </Zone>
      {/* abdominaux */}
      <Zone id="abdominaux" selected={selected} onSelect={onSelect} label="Abdominaux">
        <path d="M107 114 Q120 110 133 114 L131 182 Q120 188 109 182 Z" />
        <g stroke="#0b0b0d" strokeWidth="1.1" opacity="0.5" fill="none">
          <line x1="120" y1="116" x2="120" y2="180" />
          <line x1="109" y1="132" x2="131" y2="132" />
          <line x1="109" y1="150" x2="131" y2="150" />
          <line x1="110" y1="166" x2="130" y2="166" />
        </g>
      </Zone>
      {/* quadriceps */}
      <Zone id="quadriceps" selected={selected} onSelect={onSelect} label="Quadriceps">
        <path d="M106 214 C95 220 94 270 100 312 C104 330 116 328 116 308 L114 240 C114 224 112 214 106 214 Z" />
        <path d="M134 214 C145 220 146 270 140 312 C136 330 124 328 124 308 L126 240 C126 224 128 214 134 214 Z" />
      </Zone>
      {/* mollets */}
      <Zone id="mollets" selected={selected} onSelect={onSelect} label="Mollets" testid="anatomy-zone-mollets-front">
        <ellipse cx="108" cy="384" rx="11" ry="30" />
        <ellipse cx="132" cy="384" rx="11" ry="30" />
      </Zone>
    </Frame>
  );
}

export function AnatomyBack({ selected, onSelect }) {
  return (
    <Frame>
      {/* trapèzes */}
      <Zone id="trapezes" selected={selected} onSelect={onSelect} label="Trapèzes">
        <path d="M120 66 C110 66 100 70 96 78 L120 100 L144 78 C140 70 130 66 120 66 Z" />
      </Zone>
      {/* dos (grand dorsal) */}
      <Zone id="dos" selected={selected} onSelect={onSelect} label="Dos">
        <path d="M96 96 Q120 92 144 96 L138 152 C130 164 110 164 102 152 Z" />
      </Zone>
      {/* deltoïdes postérieurs */}
      <Zone id="epaules" selected={selected} onSelect={onSelect} label="Épaules">
        <ellipse cx="86" cy="86" rx="14" ry="12" />
        <ellipse cx="154" cy="86" rx="14" ry="12" />
      </Zone>
      {/* triceps */}
      <Zone id="triceps" selected={selected} onSelect={onSelect} label="Triceps">
        <ellipse cx="73" cy="120" rx="10" ry="22" />
        <ellipse cx="167" cy="120" rx="10" ry="22" />
      </Zone>
      {/* avant-bras */}
      <Zone id="avant-bras" selected={selected} onSelect={onSelect} label="Avant-bras" testid="anatomy-zone-avant-bras-back">
        <ellipse cx="63" cy="162" rx="8.5" ry="21" />
        <ellipse cx="177" cy="162" rx="8.5" ry="21" />
      </Zone>
      {/* lombaires */}
      <Zone id="lombaires" selected={selected} onSelect={onSelect} label="Lombaires">
        <path d="M104 156 Q120 162 136 156 L133 190 Q120 196 107 190 Z" />
      </Zone>
      {/* fessiers */}
      <Zone id="fessiers" selected={selected} onSelect={onSelect} label="Fessiers">
        <path d="M118 198 C106 197 96 205 98 218 C100 230 112 232 118 224 Z" />
        <path d="M122 198 C134 197 144 205 142 218 C140 230 128 232 122 224 Z" />
      </Zone>
      {/* ischio-jambiers */}
      <Zone id="ischio" selected={selected} onSelect={onSelect} label="Ischio-jambiers">
        <path d="M106 232 C96 240 96 288 102 320 C106 336 116 334 116 314 L114 254 C114 240 112 232 106 232 Z" />
        <path d="M134 232 C144 240 144 288 138 320 C134 336 124 334 124 314 L126 254 C126 240 128 232 134 232 Z" />
      </Zone>
      {/* mollets */}
      <Zone id="mollets" selected={selected} onSelect={onSelect} label="Mollets" testid="anatomy-zone-mollets-back">
        <ellipse cx="108" cy="386" rx="11" ry="30" />
        <ellipse cx="132" cy="386" rx="11" ry="30" />
      </Zone>
    </Frame>
  );
}
