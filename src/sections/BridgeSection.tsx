import { useState } from 'react'
import { seedSyllables, fiveElements } from '@/data/seeds'
import { letters42 } from '@/data/letters42'
import LetterDossier, { type DossierData } from '@/components/LetterDossier'

/** 五大 → 字门参照（风轮诃字可在合字「诃婆」中参照） */
const elementLetterN: Record<string, number> = { 地轮: 1, 火轮: 2, 水轮: 11, 空轮: 24, 风轮: 32 }

interface Props {
  onPractice: (encoded: string) => void
}

export default function BridgeSection({ onPractice }: Props) {
  const [dossier, setDossier] = useState<DossierData | null>(null)

  const openSeed = (s: (typeof seedSyllables)[number]) => {
    const wl = s.inWheel ? letters42.find((l) => l.iast === s.iast) : undefined
    setDossier({ kind: 'seed', seed: s, seedWheelLetter: wl })
  }

  return (
    <section id="bridge" className="max-w-5xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          华严字母 ⇄ 诸尊种子字
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          两门一音
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-3xl mx-auto">
          般若字门依字观不可得，诸尊种子字以一字总摄所表功德。
          <br />
          两门可互相参照；所依经轨与修法层次，仍须分别明了。
        </p>
      </header>

      {/* 文殊五字：两门的相通处 */}
      <div className="rounded-lg border border-[#c9a227]/30 bg-[#131022]/90 p-7 sm:p-9 mb-10 text-center">
        <div className="text-xs tracking-[0.35em] text-gold mb-5">两门的相通处 · 文殊五字真言</div>
        <div className="flex justify-center items-center gap-3 sm:gap-5 flex-wrap">
          {[
            { s: '\u{11580}', h: '阿', r: 'a' },
            { s: '\u{115A8}', h: '囉', r: 'ra' },
            { s: '\u{115A2}', h: '波', r: 'pa' },
            { s: '\u{11593}', h: '遮', r: 'ca' },
            { s: '\u{115A1}', h: '那', r: 'na' },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-5">
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 flex items-center justify-center font-siddham text-xl sm:text-2xl text-[#f0e7cb]">
                  {g.s}
                </span>
                <span className="font-latin text-xs text-gold mt-2 italic">{g.r}</span>
                <span className="text-xs text-dim mt-0.5">注音 {g.h}</span>
              </div>
              {i < 4 && <span className="text-[#4a4170]">—</span>}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-loose text-dim max-w-2xl mx-auto">
          文殊五字真言「阿囉波者那」的音序，与四十二字门前五字相应；《华严经》第二字音译作「多」。
          <br />
          两类传统皆以梵音字相为门。不空仪轨又明载四十二梵字布于月轮，故可相互参照；其传承与行法则不可混同。
        </p>
      </div>

      {/* 两门对观 */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <article className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7">
          <h3 className="text-lg tracking-[0.2em] text-[#f0e7cb] mb-1">般若字门 · 四十二字母</h3>
          <p className="text-xs tracking-[0.25em] text-gold mb-4">逐门观义</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-dim">
            <li>· 四十二门依次展开，如走过四十二扇窗，各随一字观其不可得义</li>
            <li>· 依字观义：字引出法义，复观其不可得，以离名相执著</li>
            <li>· 经文依次唱持四十二字，一字一门，各入般若波罗蜜门</li>
            <li>· 古德有以四十二字配菩萨行位之说，可作观学次第的参照</li>
          </ul>
        </article>
        <article className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7">
          <h3 className="text-lg tracking-[0.2em] text-[#f0e7cb] mb-1">诸尊种子字</h3>
          <p className="text-xs tracking-[0.25em] text-gold mb-4">一字摄德</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-dim">
            <li>· 依种子字法义，一字表摄本尊功德，譬如一颗种子含摄大树</li>
            <li>· 仪轨常见心月轮、现字、放光、摄归等次第；本站只作文献说明</li>
            <li>· 尊名所表，归于悲智愿行；种子字总摄其德，譬如种子含树</li>
            <li>· 经轨亦说由字相入观而不住字相；实际行法仍以师授为准</li>
          </ul>
        </article>
      </div>

      {/* 种子字表 */}
      <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7 mb-10">
        <h3 className="text-sm tracking-[0.35em] text-gold mb-5">常见种子字索引 · 与四十二字门的异同</h3>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs tracking-[0.2em] text-[#9a8fbe] border-b border-[#2a2440]">
                <th className="pb-3 pr-4 font-normal">种子字</th>
                <th className="pb-3 pr-4 font-normal">尊 / 部</th>
                <th className="pb-3 pr-4 font-normal">义</th>
                <th className="pb-3 font-normal">在四十二字门中</th>
              </tr>
            </thead>
            <tbody>
              {seedSyllables.map((s) => (
                <tr
                  key={s.iast}
                  onClick={() => openSeed(s)}
                  className="border-b border-[#2a2440]/50 last:border-0 cursor-pointer hover:bg-[#c9a227]/5 transition-colors"
                  title="点开此字字帖"
                >
                  <td className="py-3 pr-4">
                    <span className="font-siddham text-[#f0e7cb] text-2xl leading-none">{s.siddham}</span>
                    <span className="font-latin italic text-gold/80 text-xs ml-3">{s.iast}</span>
                    <span className="text-dim text-xs ml-2">注音 {s.han}</span>
                  </td>
                  <td className="py-3 pr-4 text-[#e8dfc4]">{s.deity}</td>
                  <td className="py-3 pr-4 text-dim">{s.meaning}</td>
                  <td className="py-3">
                    {s.inWheel ? (
                      <span className="text-gold text-xs tracking-[0.15em]">在轮中 ◉</span>
                    ) : (
                      <span className="text-[#6f6788] text-xs tracking-[0.15em]">轮外 ○</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#6f6788]">
          交：阿、迦、娑等字可在两类材料中对读。离：种子字另有鑁 vaṃ、纥哩 hrīḥ、吽 hūṃ、唵 oṃ 等音节；
          字门亦有多种复辅音合字。由此可见两类传统都保存梵音字相，而各自义轨仍应分别辨明。
          种子字的尊属与读法，各派轨本或有差别，本站所列仅作入门索引。
        </p>
      </div>

      {/* 五大种子字 */}
      <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7">
        <h3 className="text-sm tracking-[0.35em] text-gold mb-5">五大种子字 · 地水火风空</h3>
        <div className="grid sm:grid-cols-5 gap-3">
          {fiveElements.map((f) => (
            <button
              key={f.el}
              onClick={() => {
                const l = letters42[elementLetterN[f.el] - 1]
                setDossier({ kind: 'letter', letter: l })
              }}
              className="rounded-md border border-[#2a2440] bg-[#0f0c1a] p-4 text-center hover:border-[#c9a227]/40 transition-colors"
              title="点开对应字门字帖"
            >
              <div className="text-xs tracking-[0.25em] text-[#9a8fbe]">{f.el}</div>
              <div className="font-siddham text-3xl leading-none text-[#f0e7cb] my-3">{f.siddham}</div>
              <div className="font-latin italic text-xs text-gold">{f.iast}</div>
              <div className="text-xs text-dim mt-1">注音 {f.han}</div>
              <div className="text-xs text-dim mt-2">{f.shape}</div>
              <div className="text-xs text-[#6f6788] mt-2 leading-relaxed">{f.note}</div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#6f6788]">
          点任一轮，可查阅对应字门；其中多字亦见于四十二字门，可互相参照。
        </p>
      </div>

      <LetterDossier data={dossier} onClose={() => setDossier(null)} onPractice={onPractice} />
    </section>
  )
}
