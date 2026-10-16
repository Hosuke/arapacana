import { useEffect, useRef, useState } from 'react'
import { audioUrl, hasJa, jaReadings, type VoiceKind } from '@/data/readings'

/* 字音三读：梵 · 汉 · 日。音档为预合成之静态 mp3（scripts/tts.mjs），站上不调用语音接口。
   梵音以印地语神经语音读天城体代之，非古梵语之实录；日读唯单字，合字候传承覆核。 */

const LABELS: Record<VoiceKind, { label: string; title: string }> = {
  sa: { label: '梵', title: '梵音（以印地语语音读天城体，近似）' },
  zh: { label: '汉', title: '汉音（读《华严经》汉字注音）' },
  ja: { label: '日', title: '日本悉昙读音' },
}

export default function ListenButtons({ iast }: { iast: string }) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<VoiceKind | null>(null)
  const [failed, setFailed] = useState<VoiceKind | null>(null)

  useEffect(() => () => { audio.current?.pause() }, [])

  const play = (kind: VoiceKind) => {
    audio.current?.pause()
    const a = new Audio(audioUrl(kind, iast))
    audio.current = a
    setFailed(null)
    setPlaying(kind)
    a.onended = () => setPlaying(p => (p === kind ? null : p))
    a.onerror = () => { setPlaying(null); setFailed(kind) }
    a.play().catch(() => { setPlaying(null); setFailed(kind) })
  }

  const kinds: VoiceKind[] = hasJa(iast) ? ['sa', 'zh', 'ja'] : ['sa', 'zh']
  const ja = jaReadings[iast]

  return (
    <div className="flex items-center gap-2 mt-1" role="group" aria-label="听字音">
      <span className="text-xs tracking-[0.3em] text-dim">听</span>
      {kinds.map(kind => (
        <button
          key={kind}
          type="button"
          title={LABELS[kind].title}
          aria-label={LABELS[kind].title}
          aria-pressed={playing === kind}
          onClick={() => play(kind)}
          className={`h-7 min-w-7 rounded-full border px-2 text-xs transition-colors ${
            playing === kind
              ? 'border-gold text-gold bg-[#c9a227]/10'
              : 'border-[#3a3352] text-dim hover:border-gold/60 hover:text-gold'
          }`}
        >
          {LABELS[kind].label}
          {kind === 'ja' && ja && <span className="ml-1 opacity-70">{ja.kana}</span>}
        </button>
      ))}
      {failed && <span className="text-xs text-dim">音档未至</span>}
      {ja?.pending && <span className="text-xs text-dim" title="合字之日本悉昙读法各家有异，候具传承者覆核">日读待考</span>}
    </div>
  )
}
