import { useState } from 'react'
import LetterWheel from '@/components/LetterWheel'
import LetterDossier, { type DossierData } from '@/components/LetterDossier'
import { letters42, twelveRhymes } from '@/data/letters42'

interface Props {
  onPractice: (encoded: string) => void
}

export default function WheelSection({ onPractice }: Props) {
  const [sel, setSel] = useState(1)
  const [dossier, setDossier] = useState<DossierData | null>(null)
  const letter = letters42.find((l) => l.n === sel)!

  return (
    <section id="wheel" className="max-w-6xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          华严字母的结构表达
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          四十二字轮
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-3xl mx-auto">
          不空三藏《顿证毗卢遮那法身字轮瑜伽仪轨》：「于月轮内，右旋布列四十二梵字，悉皆金色，放大光明。」
          <br />
          此轮即依仪轨所现。点一字，见其般若门与遮诠义。
        </p>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-start">
        {/* 字轮 */}
        <div className="rounded-lg border border-[#2a2440] bg-[#100d1c]/80 p-4 sm:p-6">
          <LetterWheel selected={sel} onSelect={setSel} />
          <p className="mt-3 text-center text-xs tracking-[0.2em] text-[#6f6788]">
            字形以悉昙为准，汉字仅作注音。金圈五字为文殊五字真言（a · ra · pa · ca · na）——即四十二字门之前五字
          </p>
        </div>

        {/* 字详情 */}
        <div className="rounded-lg border border-[#c9a227]/30 bg-[#131022]/90 p-7 lg:sticky lg:top-16">
          <div className="flex items-center gap-5 mb-1">
            <span className="font-siddham text-6xl leading-none text-[#f0e7cb]">{letter.siddham}</span>
            <div className="flex flex-col gap-1">
              <span className="font-latin text-xl text-gold italic">{letter.iast}</span>
              <span className="text-sm text-dim">汉字注音：{letter.han}</span>
            </div>
            <span className="text-xs tracking-[0.2em] text-dim ml-auto self-start">
              第 {letter.n} 字 · {letter.type}
            </span>
          </div>
          <div className="gold-rule w-full my-5 opacity-70" />

          <div className="space-y-5">
            <div>
              <div className="text-xs tracking-[0.35em] text-gold mb-2">般若波罗蜜门</div>
              <p className="text-base leading-relaxed text-[#e8dfc4]">名：{letter.gate}</p>
            </div>
            <div>
              <div className="text-xs tracking-[0.35em] text-gold mb-2">遮诠 · 悟</div>
              <p className="text-sm leading-relaxed text-dim">{letter.meaning}</p>
            </div>
            {letter.seed && (
              <div className="rounded-md border border-[#c9a227]/25 bg-[#c9a227]/8 px-4 py-3">
                <div className="text-xs tracking-[0.35em] text-gold mb-1.5">种子桥接</div>
                <p className="text-sm leading-relaxed text-[#e8dfc4]">{letter.seed}</p>
              </div>
            )}
            {letter.manjusri && (
              <p className="text-xs tracking-[0.2em] text-[#9a8fbe]">
                文殊五字真言之一——般若字门与诸尊种子字，于此同音
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setDossier({ kind: 'letter', letter })}
                className="rounded-full border border-[#3a3352] px-5 py-2 text-xs tracking-[0.25em] text-dim hover:border-[#c9a227]/50 hover:text-gold transition-colors"
              >
                字帖 · 表法表意观法
              </button>
              <button
                onClick={() => onPractice(`l:${letter.n}`)}
                className="rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 px-5 py-2 text-xs tracking-[0.25em] text-gold hover:bg-[#c9a227]/20 transition-colors"
              >
                以此字入观 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <LetterDossier data={dossier} onClose={() => setDossier(null)} onPractice={onPractice} />

      {/* 结构三数 */}
      <div className="grid sm:grid-cols-3 gap-5 mt-10">
        <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6 text-center">
          <div className="font-latin text-3xl text-gold">33 · 8 · 1</div>
          <p className="mt-3 text-sm leading-relaxed text-dim">
            一合三十三、二合八、三合一（依音译汉字数计）。
            <br />
            梵音合字之实——如 ṣṭa、kṣa、jña——览悉昙字形自明，汉字只是音译之壳。
          </p>
        </div>
        <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6 text-center">
          <div className="font-latin text-3xl text-gold">42 × 12 = 504</div>
          <p className="mt-3 text-sm leading-relaxed text-dim">
            每主字领十二韵，音音相续如旋如轮，故称「字轮」唱诵。
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#9a8fbe]">
            阿字十二韵：{twelveRhymes.join(' · ')}
          </p>
        </div>
        <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6 text-center">
          <div className="font-latin text-3xl text-gold">1 ⊃ 42</div>
          <p className="mt-3 text-sm leading-relaxed text-dim">
            「一字皆入四十二字，四十二字亦入一字。」
            <br />
            一即一切——每扇门内都是全法界。
          </p>
        </div>
      </div>
    </section>
  )
}
