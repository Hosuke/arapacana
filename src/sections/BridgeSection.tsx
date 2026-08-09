import { useState } from 'react'
import { seedSyllables, fiveElements } from '@/data/seeds'
import { letters42 } from '@/data/letters42'
import LetterDossier, { type DossierData } from '@/components/LetterDossier'

/** 五大 → 字门对应（风轮诃字归于二合「诃婆」） */
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
          同一梵音，开出两门：般若字门以之「扫相」，诸尊种子字以之「立德」。
          <br />
          扫到极处与立到极处，是同一个地方。
        </p>
      </header>

      {/* 文殊五字：两门的钥匙 */}
      <div className="rounded-lg border border-[#c9a227]/30 bg-[#131022]/90 p-7 sm:p-9 mb-10 text-center">
        <div className="text-xs tracking-[0.35em] text-gold mb-5">两门的钥匙 · 文殊五字真言</div>
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
          文殊菩萨的五字真言「阿囉波者那」，恰是四十二字门的前五字。
          <br />
          这不是巧合——般若字门正是密教种子字的显教前身：密教把「唱出来的般若」，转成了「观出来的法身」。
        </p>
      </div>

      {/* 两门对观 */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <article className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7">
          <h3 className="text-lg tracking-[0.2em] text-[#f0e7cb] mb-1">般若字门 · 四十二字母</h3>
          <p className="text-xs tracking-[0.25em] text-gold mb-4">遮诠 · 横向遍入</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-dim">
            <li>· 四十二门依次展开，如走过四十二扇窗，每扇窗见同一片虚空</li>
            <li>· 运作逻辑：字带出概念，当下说「不可得」——层层剥落，荡相遣执</li>
            <li>· 以唱诵为体：42 主字 × 12 韵 = 504 音，音音相续如旋如轮</li>
            <li>· 天台以四十二字配圆教四十二位：唱一字如历一位</li>
          </ul>
        </article>
        <article className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7">
          <h3 className="text-lg tracking-[0.2em] text-[#f0e7cb] mb-1">诸尊种子字</h3>
          <p className="text-xs tracking-[0.25em] text-gold mb-4">表诠 · 纵向总持</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-dim">
            <li>· 一字含摄本尊万德——一颗种子含摄整棵大树</li>
            <li>· 以观想为体：心月轮中现字，字放光，光摄入心</li>
            <li>· 本尊是功德之函数，种子字是其真形（法曼荼罗）</li>
            <li>· 观到极处「字亡观寂」——又回到字门一路走到的空处</li>
          </ul>
        </article>
      </div>

      {/* 种子字表 */}
      <div className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7 mb-10">
        <h3 className="text-sm tracking-[0.35em] text-gold mb-5">诸尊种子字 · 与字轮的交与离</h3>
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
          交：阿、迦、娑等字两门共用。离：种子字系统多出带鼻音、送气的密教特有音节（鑁 vāṃ、纥哩 hrīḥ、吽 hūṃ、唵 oṃ）；
          字门则多出大量二合复辅音字。两门有交有离，恰是「显密同源于梵音」的结构证据。
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
          点任一轮，开其对应字门之字帖——五大种子字，本是四十二字门中字。
        </p>
      </div>

      <LetterDossier data={dossier} onClose={() => setDossier(null)} onPractice={onPractice} />
    </section>
  )
}
