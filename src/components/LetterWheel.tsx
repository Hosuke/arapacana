import { letters42 } from '@/data/letters42'

interface Props {
  selected: number
  onSelect: (n: number) => void
  size?: number
}

/**
 * 四十二字轮——依不空《字轮瑜伽仪轨》：
 * 「于月轮内，右旋布列四十二梵字，悉皆金色放大光明。」
 */
export default function LetterWheel({ selected, onSelect, size = 560 }: Props) {
  const c = size / 2
  const rOuter = size * 0.46
  const rRing = size * 0.375

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-auto max-w-full"
      role="group"
      aria-label="华严四十二字轮"
    >
      <defs>
        <radialGradient id="wheel-moon" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#f6eed6" stopOpacity="0.95" />
          <stop offset="72%" stopColor="#e4d6ac" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#bea86e" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* 外环 */}
      <circle cx={c} cy={c} r={rOuter} fill="none" stroke="#c9a227" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx={c} cy={c} r={rOuter - 5} fill="none" stroke="#c9a227" strokeOpacity="0.12" strokeWidth="1" />

      {/* 月轮 */}
      <circle cx={c} cy={c} r={size * 0.21} fill="url(#wheel-moon)" />
      <circle cx={c} cy={c} r={size * 0.21 + 4} fill="none" stroke="#c9a227" strokeOpacity="0.5" strokeWidth="1" />
      <text
        x={c}
        y={c + size * 0.012}
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-siddham"
        fontSize={size * 0.15}
        fill="#8a6a1e"
      >
        {'\u{11580}'}
      </text>
      <text
        x={c}
        y={c + size * 0.115}
        textAnchor="middle"
        fontSize={size * 0.022}
        letterSpacing={size * 0.008}
        fill="#8a6a1e"
        opacity="0.8"
      >
        右旋布列 · 悉皆金色
      </text>

      {/* 四十二字：右旋（顺时针），阿字居顶 */}
      {letters42.map((l, i) => {
        const angle = (i / 42) * Math.PI * 2 - Math.PI / 2
        const x = c + rRing * Math.cos(angle)
        const y = c + rRing * Math.sin(angle)
        const isSel = selected === l.n
        const compact = l.type !== '一合'
        return (
          <g
            key={l.n}
            onClick={() => onSelect(l.n)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(l.n)}
            tabIndex={0}
            role="button"
            aria-label={`第${l.n}字 ${l.iast}（${l.han}）`}
            className="cursor-pointer outline-none"
          >
            <circle
              cx={x}
              cy={y}
              r={compact ? size * 0.034 : size * 0.03}
              fill={isSel ? '#c9a227' : l.manjusri ? '#221c3a' : '#161226'}
              stroke={isSel ? '#f0df9e' : l.manjusri ? '#c9a227' : '#4a4170'}
              strokeWidth={isSel ? 1.6 : l.manjusri ? 1.2 : 0.8}
              style={{ transition: 'fill 0.25s, stroke 0.25s' }}
            />
            <text
              x={x}
              y={y + size * 0.002}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={compact ? size * 0.019 : size * 0.024}
              fill={isSel ? '#171205' : l.manjusri ? '#d8b84a' : '#cfc4a3'}
              style={{ pointerEvents: 'none', userSelect: 'none', fontFamily: "'Noto Sans Siddham', serif" }}
            >
              {l.siddham}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
