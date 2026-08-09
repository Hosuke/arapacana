import { useEffect, useRef } from 'react'

interface Props {
  size?: number
  /** 0..1, 外部驱动的呼吸相位（如日课进度）；缺省则自动呼吸 */
  phase?: number | null
  dimmed?: boolean
  /** 月轮中所现悉昙字，缺省为阿 */
  glyph?: string
}

/** 月轮种子字——程序生成，零图片资源 */
export default function MoonDisc({ size = 320, phase = null, dimmed = false, glyph = '\u{11580}' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef<number | null>(phase)
  const glyphRef = useRef(glyph)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    glyphRef.current = glyph
  }, [glyph])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    let raf = 0
    const t0 = performance.now()

    const draw = () => {
      const now = performance.now()
      const t = (now - t0) / 1000
      const auto = 0.5 + 0.5 * Math.sin((t * Math.PI) / 4) // 8 秒一息
      const p = phaseRef.current !== null ? phaseRef.current : auto
      const cx = size / 2
      const cy = size / 2
      const R = size * 0.34

      ctx.clearRect(0, 0, size, size)

      // 外层光晕
      const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 2.2)
      halo.addColorStop(0, `rgba(216, 184, 74, ${0.1 + 0.06 * p})`)
      halo.addColorStop(1, 'rgba(216, 184, 74, 0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, size, size)

      // 月轮本体
      const disc = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.1, cx, cy, R)
      disc.addColorStop(0, `rgba(246, 238, 214, ${0.92 + 0.06 * p})`)
      disc.addColorStop(0.75, `rgba(228, 214, 172, ${0.85 + 0.08 * p})`)
      disc.addColorStop(1, `rgba(190, 168, 110, ${0.7 + 0.1 * p})`)
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = disc
      ctx.fill()

      // 轮缘金线
      ctx.beginPath()
      ctx.arc(cx, cy, R + size * 0.012, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(216, 184, 74, ${0.35 + 0.3 * p})`
      ctx.lineWidth = 1
      ctx.stroke()

      // 种子字（悉昙）
      const glyphSize = R * 0.92
      ctx.font = `${glyphSize}px 'Noto Sans Siddham', serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = `rgba(120, 84, 10, ${0.5 + 0.3 * p})`
      ctx.shadowBlur = size * 0.02
      ctx.fillStyle = dimmed ? 'rgba(140, 106, 30, 0.55)' : '#8a6a1e'
      ctx.fillText(glyphRef.current, cx, cy + R * 0.02)
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(draw)
        })
      }
      raf = requestAnimationFrame(draw)
    }
    start()

    return () => cancelAnimationFrame(raf)
  }, [size, dimmed])

  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size }}
      aria-label="月轮阿字"
      role="img"
    />
  )
}
