import { useEffect } from 'react'
import MoonDisc from './MoonDisc'
import type { Letter42 } from '@/data/letters42'
import type { SeedSyllable } from '@/data/seeds'
import provenance from '@/data/letters42.provenance.json'

export interface DossierData {
  kind: 'letter' | 'seed'
  letter?: Letter42
  seed?: SeedSyllable
  /** 种子字若在四十二字门中，对应的字门 */
  seedWheelLetter?: Letter42
}

interface Props {
  data: DossierData | null
  onClose: () => void
  onPractice: (encoded: string) => void
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#3a3352] px-3 py-1 text-xs tracking-[0.15em] text-dim">
      {children}
    </span>
  )
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-xs tracking-[0.4em] text-gold mb-3">{children}</div>
}

export default function LetterDossier({ data, onClose, onPractice }: Props) {
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [data, onClose])

  if (!data) return null

  const isLetter = data.kind === 'letter'
  const L = data.letter
  const S = data.seed

  const siddham = isLetter ? L!.siddham : S!.siddham
  const han = isLetter ? L!.han : S!.han
  const iast = isLetter ? L!.iast : S!.iast
  const encoded = isLetter ? `l:${L!.n}` : `s:${S!.iast}`
  const evidence = isLetter ? provenance.letters[L!.n - 1] : null
  const seedWheelEvidence = data.seedWheelLetter
    ? provenance.letters[data.seedWheelLetter.n - 1]
    : null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto scrollbar-thin rounded-xl border border-[#c9a227]/35 bg-[#120f1f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-dim hover:text-gold text-lg transition-colors z-10"
          aria-label="关闭"
        >
          ✕
        </button>

        {/* 字首：悉昙为准，注音为辅 */}
        <div className="flex items-center gap-6 px-8 pt-8">
          <span className="font-siddham text-7xl leading-none text-[#f0e7cb]">{siddham}</span>
          <div className="flex flex-col gap-1.5">
            <span className="font-latin text-2xl text-gold italic">{iast}</span>
            <span className="text-sm text-dim">《华严经》汉字注音：{han}</span>
          </div>
        </div>

        <div className="px-8 pt-4 flex flex-wrap gap-2">
          {isLetter ? (
            <>
              <Tag>四十二字门 · 第 {L!.n} 字</Tag>
              <Tag>{L!.form}</Tag>
              {L!.manjusri && <Tag>文殊五字之一</Tag>}
            </>
          ) : (
            <>
              <Tag>诸尊种子字</Tag>
              <Tag>{S!.deity}</Tag>
              <Tag>{S!.inWheel ? '亦在四十二字门中' : '字轮之外'}</Tag>
            </>
          )}
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* 表法 */}
          <section>
            <BlockTitle>表法 · 月轮字相</BlockTitle>
            <div className="flex items-center gap-6">
              <MoonDisc size={150} glyph={siddham} />
              <div className="text-sm leading-loose text-dim flex-1">
                {isLetter ? (
                  <>
                    月轮字相取自本站悉昙字形表——
                    {L!.form === '单字'
                      ? '此处为单字字形。'
                      : '此处为悉昙合字，由两个辅音字母相合；汉字注音字数并不等同字形构造。'}
                    {L!.seed && <span className="block mt-2 text-[#e8dfc4]">相关字音参照：{L!.seed}</span>}
                  </>
                ) : (
                  <>
                    {S!.deity}法曼荼罗所用字相。此字总摄所表功德，
                    譬如种子含树。
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 表意 */}
          <section>
            <BlockTitle>法义 · 经文与不空本</BlockTitle>
            {isLetter ? (
              <div className="space-y-3">
                <p className="text-sm leading-loose text-[#e8dfc4]">
                  「唱{han}字时，入般若波罗蜜门，名<strong className="text-gold font-normal">{L!.gate}</strong>。」
                  <a
                    href={provenance.sources.T10n0279.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-1 text-xs text-[#8d82ad] underline decoration-[#4a4264] underline-offset-4 hover:text-gold"
                  >
                    ——《八十华严》卷七十六，{evidence!.gateEvidence.loc}
                  </a>
                </p>
                <p className="text-sm leading-loose text-dim">
                  不空本释义：{L!.meaning}。此句据不空译《四十二字观门》，不是《八十华严》门名原句；“不可得”不作断灭解。
                </p>
                <details className="rounded-lg border border-[#302943] bg-[#0d0b17]/55 px-4 py-3 text-xs text-dim">
                  <summary className="cursor-pointer select-none tracking-[0.18em] text-[#b8accf] hover:text-gold">
                    逐字校勘依据
                  </summary>
                  <div className="mt-4 space-y-3 leading-relaxed">
                    <p>
                      <span className="text-[#d7cba9]">门名底本：</span>
                      <a href={provenance.sources.T10n0279.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gold">
                        {provenance.sources.T10n0279.ref}
                      </a>
                      ，本字 {evidence!.gateEvidence.loc}。
                    </p>
                    <p>
                      <span className="text-[#d7cba9]">悉昙、IAST与释义底本：</span>
                      <a href={provenance.sources.T19n1019.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-gold">
                        {provenance.sources.T19n1019.ref}
                      </a>
                      ，本字 {evidence!.interpretationEvidence.loc}。
                    </p>
                    <blockquote className="border-l border-[#5e5278] pl-3 text-[#a99ebd]">
                      CBETA原文：{evidence!.interpretationEvidence.quoteZhHant}
                    </blockquote>
                    <p>
                      <span className="text-[#d7cba9]">字形码位：</span>
                      {evidence!.glyphEvidence.codepoints.join(' + ')}；{evidence!.glyphEvidence.form}。
                    </p>
                    {evidence!.variantNotes.map((note) => (
                      <p key={note} className="text-[#c9b884]">校注：{note}</p>
                    ))}
                  </div>
                </details>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-loose text-[#e8dfc4]">{S!.meaning}</p>
                {data.seedWheelLetter && (
                  <p className="text-sm leading-loose text-dim">
                    此字亦在四十二字门中，为第 {data.seedWheelLetter.n} 字——
                    入般若波罗蜜门，名「{data.seedWheelLetter.gate}」；不空本释义：{data.seedWheelLetter.meaning}。
                    <span className="block mt-1 text-xs text-[#6f6788]">相同字音可在两类材料中对读；所依法义仍须分明。</span>
                    {seedWheelEvidence && (
                      <a href={provenance.sources.T19n1019.url} target="_blank" rel="noreferrer" className="block mt-1 text-xs text-[#8d82ad] underline underline-offset-4 hover:text-gold">
                        校勘：{seedWheelEvidence.interpretationEvidence.loc}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* 观学 */}
          <section>
            <BlockTitle>{isLetter ? '观学 · 由字入义' : '导读 · 识字查源'}</BlockTitle>
            {isLetter ? (
              <ol className="space-y-3 text-sm leading-loose text-dim list-none">
                <li><span className="text-gold mr-2">一 · 识字</span>辨认悉昙字形、IAST 转写与汉字注音，三者不可混同。</li>
                <li><span className="text-gold mr-2">二 · 读经</span>读《华严经》所列般若波罗蜜门名，先守经文原义。</li>
                <li><span className="text-gold mr-2">三 · 观义</span>读不空本「{L!.meaning}」之释，返观名相与执著；不可得不作断灭解。</li>
                <li><span className="text-gold mr-2">四 · 日用</span>所学若能增益慈悲、明辨与负责的行动，方见闻思受用。</li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm leading-loose text-dim list-none">
                <li><span className="text-gold mr-2">一 · 识字</span>辨认此字（{iast}）的悉昙字形、转写与汉字注音。</li>
                <li><span className="text-gold mr-2">二 · 读义</span>了解{S!.deity}与本站所列功德义：{S!.meaning}。</li>
                <li><span className="text-gold mr-2">三 · 查源</span>种子字的尊属、读法与观法，各轨本或有差别；须回到相应仪轨与传承。</li>
                <li><span className="text-gold mr-2">四 · 守界</span>未受相关教授者，以字相辨识与法义闻思为限；有师承者依师授修学。</li>
              </ol>
            )}
          </section>
        </div>

        {/* 入观 */}
        <div className="px-8 pb-8 flex items-center gap-4">
          <button
            onClick={() => {
              onPractice(encoded)
              onClose()
            }}
            className="rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 px-7 py-2.5 text-sm tracking-[0.3em] text-gold hover:bg-[#c9a227]/20 transition-colors"
            style={{ paddingLeft: 'calc(1.75rem + 0.3em)' }}
          >
            {isLetter ? '随此字观学 · 十五分' : '随此字闻思 · 十五分'}
          </button>
          <span className="text-xs text-[#6f6788] leading-relaxed">进入十五分钟闻思；页面展示不等同密法传授</span>
        </div>
      </div>
    </div>
  )
}
