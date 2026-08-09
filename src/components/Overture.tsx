import { useEffect, useMemo, useRef, useState } from 'react'
import { letters42 } from '@/data/letters42'
import { useBowl } from '@/hooks/useBowl'

const SIDDHAM_FONT = "'Noto Sans Siddham', serif"
const ACTS = 8 // 〇序 一同源 二同构 三合流 四相异 五配位 六收束(占两段)
const VH_PER_ACT = 1

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

/** 局部进度：p 总进度 → 第 i 幕内的 0..1 */
function local(p: number, i: number, span = 1) {
  return clamp01((p * ACTS - i) / span)
}

/* ---------------- 画布幕：同构（一放四十二、四十二归一） ---------------- */
function CanvasIsomorphism({ q }: { q: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const qRef = useRef(q)

  useEffect(() => {
    qRef.current = q
  }, [q])

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.36
      const qq = qRef.current
      // 0→0.5 放出成轮；0.5→1 收归一字
      const phase = qq < 0.5 ? qq * 2 : (1 - qq) * 2
      const r = R * phase

      // 心月
      const glow = 0.5 + 0.5 * (1 - phase)
      const disc = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.32)
      disc.addColorStop(0, `rgba(246,238,214,${0.75 + 0.25 * glow})`)
      disc.addColorStop(1, 'rgba(190,168,110,0.25)')
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = disc
      ctx.fill()

      // 中央一字
      ctx.font = `${R * 0.42}px ${SIDDHAM_FONT}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#8a6a1e'
      ctx.fillText('\u{11580}', cx, cy)

      // 四十二字
      ctx.font = `${Math.max(12, R * 0.09)}px ${SIDDHAM_FONT}`
      letters42.forEach((l, i) => {
        const a = (i / 42) * Math.PI * 2 - Math.PI / 2
        ctx.fillStyle = `rgba(216,184,74,${0.15 + 0.85 * phase})`
        ctx.fillText(l.siddham, cx + r * Math.cos(a), cy + r * Math.sin(a))
      })
      raf = requestAnimationFrame(draw)
    }
    const t = setTimeout(() => {
      document.fonts?.ready.then(() => {})
      raf = requestAnimationFrame(draw)
    }, 300)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="w-full h-full" />
}

/* ---------------- 画布幕：合流（右旋布列，摄入心月轮） ---------------- */
function CanvasConfluence({ q }: { q: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const qRef = useRef(q)

  useEffect(() => {
    qRef.current = q
  }, [q])

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.38
      const qq = qRef.current
      // 0→0.55 字轮右旋渐显；0.55→1 旋入心月
      const appear = clamp01(qq / 0.4)
      const ingest = clamp01((qq - 0.55) / 0.45)
      const rot = qq * Math.PI * 1.2

      // 月轮随摄入而明
      const bright = 0.55 + 0.45 * ingest
      const disc = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.34)
      disc.addColorStop(0, `rgba(246,238,214,${bright})`)
      disc.addColorStop(1, `rgba(190,168,110,${0.3 + 0.3 * ingest})`)
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2)
      ctx.fillStyle = disc
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.32 + 3, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(216,184,74,${0.3 + 0.5 * ingest})`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.font = `${Math.max(12, R * 0.095)}px ${SIDDHAM_FONT}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      letters42.forEach((l, i) => {
        const a = (i / 42) * Math.PI * 2 - Math.PI / 2 + rot
        const rr = R * (1 - 0.82 * ingest)
        const alpha = appear * (1 - ingest * 0.9)
        ctx.fillStyle = `rgba(216,184,74,${alpha})`
        ctx.fillText(l.siddham, cx + rr * Math.cos(a), cy + rr * Math.sin(a))
      })
      raf = requestAnimationFrame(draw)
    }
    const t = setTimeout(() => {
      raf = requestAnimationFrame(draw)
    }, 300)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="w-full h-full" />
}

/* ---------------- 幕容器 ---------------- */
function Act({
  q,
  children,
  className = '',
  last = false,
}: {
  q: number
  children: React.ReactNode
  className?: string
  last?: boolean
}) {
  const fadeIn = clamp01(q / 0.15)
  const fadeOut = last ? 1 : clamp01((1 - q) / 0.12)
  const op = q <= 0 ? 0 : fadeIn * fadeOut
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-none ${className}`}
      style={{ opacity: op, pointerEvents: op > 0.5 ? 'auto' : 'none' }}
    >
      {children}
    </div>
  )
}

function ActTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs tracking-[0.5em] text-gold mb-6" style={{ paddingLeft: '0.5em' }}>
      {children}
    </div>
  )
}

const STAGE_GROUPS = ['十住', '十行', '十回向', '十地', '等觉', '妙觉']

/* ---------------- 序曲 ---------------- */
export default function Overture() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const pRef = useRef(0)
  const [sound, setSound] = useState(false)
  const soundRef = useRef(false)
  const { strike } = useBowl()
  const prevAct = useRef(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const el = wrapRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const np = clamp01(-rect.top / Math.max(1, total))
        if (Math.abs(np - pRef.current) > 0.0015) {
          pRef.current = np
          setP(np)
          const act = Math.floor(np * ACTS)
          if (act !== prevAct.current) {
            prevAct.current = act
            if (soundRef.current && np > 0.01 && np < 0.99) strike(172 + act * 18, 0.3, 5)
          }
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [strike])

  const q0 = local(p, 0, 0.9)
  const q1 = local(p, 1)
  const q2 = local(p, 2)
  const q3 = local(p, 3)
  const q4 = local(p, 4)
  const q5 = local(p, 5)
  const q6 = local(p, 6, 2)

  // 相异幕：横向 42 窗的横移
  const windowShift = useMemo(() => q4 * 82, [q4])

  return (
    <section id="overture" ref={wrapRef} className="relative" style={{ height: `${ACTS * VH_PER_ACT * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080610]">
        {/* 固定角标 */}
        <div className="absolute top-14 right-5 z-20 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              const ns = !sound
              setSound(ns)
              soundRef.current = ns
              if (ns) strike(172, 0.4, 6)
            }}
            className="rounded-full border border-[#2a2440] px-4 py-1 text-xs tracking-[0.25em] text-dim hover:text-gold hover:border-[#c9a227]/40 transition-colors"
          >
            {sound ? '音' : '默'}
          </button>
          <a
            href="#paths"
            className="text-xs tracking-[0.25em] text-[#6f6788] hover:text-gold transition-colors"
          >
            跳过序曲 ↓
          </a>
        </div>

        {/* 进度点 */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
          {['序', '源', '构', '流', '异', '位', '束'].map((t, i) => {
            const on = Math.floor(p * ACTS) === i || (i === 6 && p > 0.83)
            return (
              <div key={t} className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${on ? 'bg-[#c9a227]' : 'bg-[#2a2440]'}`}
                />
                <span className={`text-[10px] tracking-widest ${on ? 'text-gold' : 'text-[#4a4170]'}`}>{t}</span>
              </div>
            )
          })}
        </div>

        {/* 〇 序：先有此音 */}
        <Act q={q0}>
          <div className="font-siddham text-[26vw] sm:text-[11rem] leading-none text-[#d8b84a]" style={{ textShadow: '0 0 60px rgba(201,162,39,0.4)' }}>
            {'\u{11580}'}
          </div>
          <p className="mt-8 text-sm tracking-[0.5em] text-dim" style={{ paddingLeft: '0.5em' }}>
            闻 声 识 字 ， 因 字 入 义
          </p>
          <p className="mt-3 text-xs tracking-[0.3em] text-[#6f6788]">向下滚动，随此音走一遍</p>
        </Act>

        {/* 一 同源 */}
        <Act q={q1}>
          <ActTitle>一 · 互参 —— 般若字门与种子字</ActTitle>
          <div className="flex items-center justify-center gap-4 sm:gap-10 max-w-4xl w-full">
            <div className="flex-1 rounded-lg border border-[#2a2440] bg-[#131022]/80 p-5 sm:p-7">
              <div className="text-xs tracking-[0.25em] text-[#9a8fbe] mb-3">般若经 · 四十二字门第一门</div>
              <div className="font-siddham text-5xl sm:text-6xl text-[#f0e7cb]">{'\u{11580}'}</div>
              <p className="mt-3 text-sm text-dim">阿 ＝ 一切法初不生</p>
            </div>
            <div className="flex flex-col items-center gap-2 shrink-0" style={{ opacity: clamp01((q1 - 0.3) / 0.3) }}>
              <div className="w-10 sm:w-24 h-px bg-gradient-to-r from-[#c9a227]/20 to-[#c9a227]" />
              <span className="text-gold text-xs tracking-[0.2em]">互参</span>
            </div>
            <div
              className="flex-1 rounded-lg border border-[#c9a227]/40 bg-[#131022]/90 p-5 sm:p-7"
              style={{ opacity: clamp01((q1 - 0.25) / 0.35) }}
            >
              <div className="text-xs tracking-[0.25em] text-[#9a8fbe] mb-3">《大日经》 · 阿字观</div>
              <div className="font-siddham text-5xl sm:text-6xl text-gold">{'\u{11580}'}</div>
              <p className="mt-3 text-sm text-[#e8dfc4]">阿字本不生</p>
            </div>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-loose text-dim" style={{ opacity: clamp01((q1 - 0.55) / 0.3) }}>
            般若字门与密教字观，皆以梵音字相为门。不空仪轨又明载四十二梵字布于月轮；
            二者可相互参照，亦各有经轨与修法次第。
          </p>
        </Act>

        {/* 二 同构 */}
        <Act q={q2} className="!p-0">
          <div className="absolute inset-x-0 top-16 z-10">
            <ActTitle>二 · 一多 —— 一字与四十二字</ActTitle>
          </div>
          <div className="w-full h-full max-h-[70vh]">
            <CanvasIsomorphism q={q2} />
          </div>
          <p className="absolute bottom-14 inset-x-6 text-sm leading-loose text-dim max-w-xl mx-auto">
            {q2 < 0.5
              ? '由一字展开：阿字居首，次第开展四十二字门。'
              : '由多字摄归：一多相入之义，可借字轮开合观照；图示只作方便。'}
          </p>
        </Act>

        {/* 三 合流 */}
        <Act q={q3} className="!p-0">
          <div className="absolute inset-x-0 top-16 z-10">
            <ActTitle>三 · 字轮 —— 不空仪轨中的四十二梵字</ActTitle>
          </div>
          <div className="w-full h-full max-h-[70vh]">
            <CanvasConfluence q={q3} />
          </div>
          <p className="absolute bottom-14 inset-x-6 text-sm leading-loose text-dim max-w-2xl mx-auto">
            {q3 < 0.55
              ? '「于月轮内，右旋布列四十二梵字，悉皆金色，放大光明。」——不空《字轮瑜伽仪轨》'
              : '右旋布字，摄入心月，是仪轨所示观法之一；其深义与行法，当依经轨及师承教授。'}
          </p>
        </Act>

        {/* 四 相异 */}
        <Act q={q4}>
          <ActTitle>四 · 分门 —— 横向遍门 ⇄ 一字总持</ActTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl">
            {/* 横向：四十二扇窗 */}
            <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-5 overflow-hidden">
              <div className="text-xs tracking-[0.3em] text-gold mb-3">华严字母 · 横向遍门</div>
              <div className="relative h-28 overflow-hidden rounded border border-[#2a2440]/60">
                <div
                  className="absolute top-0 left-0 flex h-full items-center gap-1.5 pl-2"
                  style={{ transform: `translateX(-${windowShift}%)` }}
                >
                  {letters42.map((l) => (
                    <span
                      key={l.n}
                      className="shrink-0 w-10 h-20 rounded-sm border border-[#3a3352] bg-[#0d0a18] flex items-center justify-center font-siddham text-lg text-[#cfc4a3]"
                    >
                      {l.siddham}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-dim">
                四十二字门次第展开，门门依字观义，再观不可得，以离名相执著。
              </p>
            </div>
            {/* 纵向：一字深入 */}
            <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-5 overflow-hidden">
              <div className="text-xs tracking-[0.3em] text-gold mb-3">密教种子字 · 纵向总持</div>
              <div className="relative h-28 rounded border border-[#2a2440]/60 flex items-center justify-center overflow-hidden">
                <span
                  className="font-siddham text-gold inline-block"
                  style={{
                    fontSize: `${2 + q4 * 3.2}rem`,
                    opacity: 1 - q4 * 0.75,
                    filter: `blur(${q4 * 2}px)`,
                  }}
                >
                  {'\u{11580}'}
                </span>
                <span className="absolute bottom-1.5 inset-x-0 text-[10px] tracking-[0.25em] text-[#9a8fbe]">
                  {q4 < 0.25 ? '字形' : q4 < 0.5 ? '字音' : q4 < 0.75 ? '字义' : '字亡观寂'}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-dim">
                由字形、字音与字义渐入观照，终不住字相；密教行法另有传承次第。
              </p>
            </div>
          </div>
          <p
            className="mt-6 max-w-xl text-sm leading-loose text-[#d6cdb2]"
            style={{ opacity: clamp01((q4 - 0.6) / 0.3) }}
          >
            两门皆可由字入观，彼此发明；却不因此混同所依经典与修法层次。
          </p>
        </Act>

        {/* 五 配位 */}
        <Act q={q5}>
          <ActTitle>五 · 配位 —— 四十二字与菩萨行位</ActTitle>
          <div className="relative w-full max-w-3xl h-[46vh]">
            {letters42.map((l, i) => {
              const t = i / 41
              const shown = q5 * 1.15 >= t
              const x = 6 + t * 88
              const y = 88 - t * 76
              const group = i < 10 ? 0 : i < 20 ? 1 : i < 30 ? 2 : i < 40 ? 3 : i < 41 ? 4 : 5
              return (
                <div
                  key={l.n}
                  className="absolute flex flex-col items-center transition-all duration-500"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: shown ? 1 : 0.08,
                    transform: shown ? 'scale(1)' : 'scale(0.7)',
                  }}
                >
                  <span className="font-siddham text-base sm:text-lg text-[#d8b84a]">{l.siddham}</span>
                  {(i % 10 === 0 || i >= 40) && (
                    <span className="mt-1 text-[9px] tracking-widest text-[#9a8fbe] whitespace-nowrap">
                      {STAGE_GROUPS[group]}
                    </span>
                  )}
                </div>
              )
            })}
            <div className="absolute left-[4%] top-[92%] text-[10px] tracking-[0.3em] text-[#6f6788]">初发心</div>
            <div className="absolute right-0 top-[4%] text-[10px] tracking-[0.3em] text-gold">妙觉佛果</div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-loose text-dim">
            古德有以四十二字配菩萨行位之说，借字门次第提示修学次第；配位是观学方便，不等同证得行位。
          </p>
        </Act>

        {/* 六 收束 */}
        <Act q={q6} last>
          <div
            className="font-siddham text-7xl sm:text-8xl text-[#d8b84a]"
            style={{
              textShadow: '0 0 80px rgba(201,162,39,0.5)',
              opacity: clamp01(q6 / 0.25),
              transform: `scale(${1.6 - clamp01(q6 / 0.3) * 0.6})`,
            }}
          >
            {'\u{11580}'}
          </div>
          <div style={{ opacity: clamp01((q6 - 0.25) / 0.35) }}>
            <p className="mt-10 max-w-2xl text-base sm:text-lg leading-loose text-[#e8dfc4]">
              华严字门以多字开示般若；
              <br />
              密教种子字以一字总摄法义。
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-loose text-dim">
              二者皆以梵音字相为门，可相互参照；
              <br />
              所依经轨、教相与修法，仍须<span className="text-gold">分别明了</span>。
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#paths"
                className="rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 px-8 py-3 text-sm tracking-[0.3em] text-gold hover:bg-[#c9a227]/20 transition-colors"
                style={{ paddingLeft: 'calc(2rem + 0.3em)' }}
              >
                入门择路
              </a>
              <a
                href="#practice"
                className="rounded-full border border-[#2a2440] px-8 py-3 text-sm tracking-[0.3em] text-dim hover:border-[#c9a227]/40 hover:text-gold transition-colors"
                style={{ paddingLeft: 'calc(2rem + 0.3em)' }}
              >
                直入观学
              </a>
            </div>
          </div>
        </Act>
      </div>
    </section>
  )
}
