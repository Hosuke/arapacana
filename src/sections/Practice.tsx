import { useEffect, useMemo, useRef, useState } from 'react'
import MoonDisc from '@/components/MoonDisc'
import { useBowl } from '@/hooks/useBowl'
import { practicePhases } from '@/data/curriculum'
import { letters42 } from '@/data/letters42'
import { seedSyllables } from '@/data/seeds'

const TOTAL = practicePhases.reduce((a, p) => a + p.seconds, 0)

function phaseAt(elapsed: number) {
  let acc = 0
  for (let i = 0; i < practicePhases.length; i++) {
    acc += practicePhases[i].seconds
    if (elapsed < acc) {
      return { index: i, phase: practicePhases[i], remaining: acc - elapsed, start: acc - practicePhases[i].seconds }
    }
  }
  return null
}

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`

/** 文殊五字真言 = 四十二字门之前五字（悉昙） */
const FIVE = [
  { han: '阿', iast: 'a', glyph: '\u{11580}' },
  { han: '囉', iast: 'ra', glyph: '\u{115A8}' },
  { han: '波', iast: 'pa', glyph: '\u{115A2}' },
  { han: '遮', iast: 'ca', glyph: '\u{11593}' },
  { han: '那', iast: 'na', glyph: '\u{115A1}' },
]

interface SingleSyllable {
  siddham: string
  han: string
  iast: string
  meaning: string
  label: string
}

function parseSel(sel: string): { mode: 'a' | 'arapacana' | 'single'; syllable: SingleSyllable | null } {
  if (sel === 'mode:arapacana') return { mode: 'arapacana', syllable: null }
  if (sel.startsWith('l:')) {
    const l = letters42[Number(sel.slice(2)) - 1]
    if (l)
      return {
        mode: 'single',
        syllable: { siddham: l.siddham, han: l.han, iast: l.iast, meaning: l.meaning, label: `字门第${l.n}字` },
      }
  }
  if (sel.startsWith('s:')) {
    const s = seedSyllables.find((x) => x.iast === sel.slice(2))
    if (s)
      return {
        mode: 'single',
        syllable: { siddham: s.siddham, han: s.han, iast: s.iast, meaning: s.meaning, label: s.deity },
      }
  }
  return { mode: 'a', syllable: null }
}

interface Props {
  sel: string
  onSelChange: (v: string) => void
}

export default function Practice({ sel, onSelChange }: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [sound, setSound] = useState(true)
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('zimen-sessions') || 0))
  const { strike } = useBowl()
  const soundRef = useRef(sound)
  const prevPhase = useRef(-1)
  const prevSyl = useRef(-1)
  const finishedRef = useRef(false)

  useEffect(() => {
    soundRef.current = sound
  }, [sound])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setElapsed((e) => Math.min(e + 0.2, TOTAL))
    }, 200)
    return () => window.clearInterval(id)
  }, [running])

  const { mode, syllable } = useMemo(() => parseSel(sel), [sel])

  const current = phaseAt(elapsed)

  // 文殊五字模式：识字段（480 秒）中五字轮转，各约 96 秒
  let sylIndex = -1
  if (mode === 'arapacana' && current?.phase.key === 'hold') {
    sylIndex = Math.min(4, Math.floor((elapsed - current.start) / 96))
  }

  useEffect(() => {
    if (sylIndex !== prevSyl.current) {
      if (prevSyl.current !== -1 && sylIndex !== -1 && soundRef.current && running) {
        strike(192, 0.35, 5)
      }
      prevSyl.current = sylIndex
    }
  }, [sylIndex, running, strike])

  const glyph =
    mode === 'arapacana' && sylIndex >= 0
      ? FIVE[sylIndex].glyph
      : mode === 'single' && syllable
        ? syllable.siddham
        : '\u{11580}'

  const holdGuidance =
    mode === 'arapacana'
      ? '阿—囉—波—遮—那，是四十二字门之前五字。依次辨认字形、转写与注音。'
      : mode === 'single' && syllable
        ? `辨认此字（${syllable.iast}，注音 ${syllable.han}）的悉昙字形与法义。页面不作密法持诵提示。`
        : null

  const contemplateGuidance =
    mode === 'single' && syllable
      ? `随文观「${syllable.meaning}」。所谓不可得，不作断灭解；不急求答案，返观当下身心。`
      : null

  useEffect(() => {
    if (!current) {
      if (running && !finishedRef.current) {
        finishedRef.current = true
        const completionTimer = window.setTimeout(() => {
          setRunning(false)
          if (soundRef.current) strike(114, 0.6, 10)
          const n = Number(localStorage.getItem('zimen-sessions') || 0) + 1
          localStorage.setItem('zimen-sessions', String(n))
          setSessions(n)
        }, 0)
        return () => window.clearTimeout(completionTimer)
      }
      return
    }
    if (current.index !== prevPhase.current) {
      prevPhase.current = current.index
      if (soundRef.current && (elapsed > 0.5 || current.index > 0)) {
        // 每相一磬，音高随阶而升
        strike([172, 172, 216, 258][current.index] ?? 172, 0.45, 7)
      }
    }
  }, [elapsed, running, current, strike])

  const start = () => {
    if (elapsed >= TOTAL) {
      setElapsed(0)
      prevPhase.current = -1
      finishedRef.current = false
    }
    if (soundRef.current) strike(172, 0.45, 7)
    setRunning(true)
  }
  const reset = () => {
    setRunning(false)
    setElapsed(0)
    prevPhase.current = -1
    finishedRef.current = false
  }

  const progress = elapsed / TOTAL
  const ring = useMemo(() => {
    const r = 196
    const c = 2 * Math.PI * r
    return { r, c, offset: c * (1 - progress) }
  }, [progress])

  return (
    <section id="practice" className="max-w-5xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          十五分钟观学
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          十五分钟闻思
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-2xl mx-auto">
          安身 → 识字 → 随文观义 → 回向。每段一磬，不另催促。
          <br />
          磬音只作换段提示，月轮图像只作字相学习；不以计时或次数衡量证量，也不代替仪轨传授。
        </p>
      </header>

      {/* 相位序列 */}
      <div className="flex justify-center mb-10">
        <ol className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {practicePhases.map((p, i) => {
            const active = current?.index === i
            const done = current === null || (current && current.index > i)
            return (
              <li
                key={p.key}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs tracking-[0.2em] transition-colors ${
                  active
                    ? 'border-[#c9a227]/70 text-gold bg-[#c9a227]/10'
                    : done
                      ? 'border-[#3a3352] text-[#7d94a6]'
                      : 'border-[#2a2440] text-dim'
                }`}
              >
                <span className="opacity-70">{p.gate}</span>
                {p.name}
                <span className="font-latin opacity-60">{mmss(p.seconds)}</span>
              </li>
            )
          })}
        </ol>
      </div>

      {/* 月轮与进度环 */}
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: 420, height: 420, maxWidth: '92vw', maxHeight: '92vw' }}>
          <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="210" cy="210" r={ring.r} fill="none" stroke="#241e38" strokeWidth="2" />
            <circle
              cx="210"
              cy="210"
              r={ring.r}
              fill="none"
              stroke="#c9a227"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={ring.c}
              strokeDashoffset={ring.offset}
              style={{ transition: 'stroke-dashoffset 0.25s linear', opacity: progress > 0 ? 0.9 : 0.25 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <MoonDisc size={300} dimmed={!running && elapsed === 0} glyph={glyph} />
          </div>
          {/* 中央叠加文字 */}
          <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none">
            <div className="font-latin text-lg text-[#e8dfc4]">
              {current ? mmss(current.remaining) : mmss(0)}
            </div>
            <div className="text-xs tracking-[0.4em] text-gold mt-1" style={{ paddingLeft: '0.4em' }}>
              {current ? `${current.phase.name} · ${current.phase.gate}` : '回向圆满'}
            </div>
            {sylIndex >= 0 && (
              <div className="text-sm text-[#e8dfc4] mt-1">
                <span className="font-latin italic text-gold">{FIVE[sylIndex].iast}</span>
                <span className="text-dim text-xs ml-2">注音 {FIVE[sylIndex].han}</span>
                <span className="text-[#6f6788] text-xs ml-2">五字之{['一', '二', '三', '四', '五'][sylIndex]}</span>
              </div>
            )}
            {mode === 'single' && syllable && (
              <div className="text-sm text-[#e8dfc4] mt-1">
                <span className="font-latin italic text-gold">{syllable.iast}</span>
                <span className="text-dim text-xs ml-2">注音 {syllable.han} · {syllable.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* 观学选字 */}
        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="syllable-select" className="text-xs tracking-[0.3em] text-dim shrink-0">
            观学字
          </label>
          <select
            id="syllable-select"
            value={sel}
            onChange={(e) => onSelChange(e.target.value)}
            className="rounded-full border border-[#3a3352] bg-[#131022] px-5 py-2 text-sm text-[#e8dfc4] tracking-[0.1em] outline-none focus:border-[#c9a227]/60 transition-colors max-w-[75vw]"
          >
            <optgroup label="总持">
              <option value="mode:a">阿字导读（a · 本不生）</option>
              <option value="mode:arapacana">文殊五字导读（a ra pa ca na）</option>
            </optgroup>
            <optgroup label="华严四十二字门 · 单字观学">
              {letters42.map((l) => (
                <option key={l.n} value={`l:${l.n}`}>
                  第{l.n}字 {l.iast} · 注音 {l.han}
                </option>
              ))}
            </optgroup>
            <optgroup label="诸尊种子字 · 字相导读">
              {seedSyllables.map((s) => (
                <option key={s.iast} value={`s:${s.iast}`}>
                  {s.iast} · 注音 {s.han} · {s.deity}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* 引导语 */}
        <p className="mt-5 max-w-md text-center text-sm leading-loose text-dim min-h-[3.5rem]">
          {current
            ? current.phase.key === 'hold' && holdGuidance
              ? holdGuidance
              : current.phase.key === 'contemplate' && contemplateGuidance
                ? contemplateGuidance
                : current.phase.guidance
            : '以此观行，普愿法界众生，入般若波罗蜜门。'}
        </p>

        {/* 控制 */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={running ? () => setRunning(false) : start}
            className="rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 px-8 py-2.5 text-sm tracking-[0.3em] text-gold hover:bg-[#c9a227]/20 transition-colors"
            style={{ paddingLeft: 'calc(2rem + 0.3em)' }}
          >
            {running ? '暂停' : elapsed > 0 && elapsed < TOTAL ? '继续' : elapsed >= TOTAL ? '再读一次' : '开始'}
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-[#2a2440] px-6 py-2.5 text-sm tracking-[0.3em] text-dim hover:border-[#c9a227]/40 hover:text-gold transition-colors"
          >
            重置
          </button>
          <button
            onClick={() => setSound(!sound)}
            className="rounded-full border border-[#2a2440] px-6 py-2.5 text-sm tracking-[0.3em] text-dim hover:border-[#c9a227]/40 hover:text-gold transition-colors"
          >
            {sound ? '音' : '默'}
          </button>
        </div>

        <p className="mt-8 text-xs tracking-[0.2em] text-[#6f6788]">
          已完成 {sessions} 次 · 记录仅存此浏览器，不作修证凭据
        </p>
      </div>
    </section>
  )
}
