import { useCallback, useRef } from 'react'

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext
  }

/** 程序合成磬音：非谐泛音列 + 微差拍，零音频资源 */
export function useBowl() {
  const ctxRef = useRef<AudioContext | null>(null)

  const strike = useCallback((base = 172, volume = 0.5, duration = 7) => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || (window as AudioWindow).webkitAudioContext
        if (!AC) return
        ctxRef.current = new AC()
      }
      const ac = ctxRef.current
      if (ac.state === 'suspended') ac.resume()

      const now = ac.currentTime
      // 颂钵近似泛音比
      const partials = [1, 2.76, 5.4, 8.93]
      const gains = [1, 0.42, 0.18, 0.08]

      partials.forEach((ratio, i) => {
        // 每泛音两个微失谐振荡器，产生拍频
        ;[-1.2, 1.2].forEach((detune) => {
          const osc = ac.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = base * ratio
          osc.detune.value = detune

          const g = ac.createGain()
          const peak = (volume * gains[i]) / 2
          g.gain.setValueAtTime(0, now)
          g.gain.linearRampToValueAtTime(peak, now + 0.012)
          g.gain.exponentialRampToValueAtTime(0.0001, now + duration * (1 - i * 0.12))

          osc.connect(g).connect(ac.destination)
          osc.start(now)
          osc.stop(now + duration + 0.5)
        })
      })
    } catch {
      /* 无声环境静默失败 */
    }
  }, [])

  return { strike }
}
