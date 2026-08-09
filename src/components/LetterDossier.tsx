import { useEffect } from 'react'
import MoonDisc from './MoonDisc'
import type { Letter42 } from '@/data/letters42'
import type { SeedSyllable } from '@/data/seeds'

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
            <span className="text-sm text-dim">汉字注音：{han}</span>
          </div>
        </div>

        <div className="px-8 pt-4 flex flex-wrap gap-2">
          {isLetter ? (
            <>
              <Tag>四十二字门 · 第 {L!.n} 字</Tag>
              <Tag>{L!.type}</Tag>
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
            <BlockTitle>表法 · 字形真形</BlockTitle>
            <div className="flex items-center gap-6">
              <MoonDisc size={150} glyph={siddham} />
              <div className="text-sm leading-loose text-dim flex-1">
                {isLetter ? (
                  <>
                    月轮中所现金色此字，即此门之法曼荼罗——
                    {L!.type === '一合' ? '单音成字。' : `${L!.type}合字，梵音复辅，览字形自见。`}
                    {L!.seed && <span className="block mt-2 text-[#e8dfc4]">种子身份：{L!.seed}</span>}
                  </>
                ) : (
                  <>
                    {S!.deity}之法曼荼罗真形。尊是功德之函数，此字即其真形——
                    一字含摄万德，如种子含大树。
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 表意 */}
          <section>
            <BlockTitle>表意 · 此字何所说</BlockTitle>
            {isLetter ? (
              <div className="space-y-3">
                <p className="text-sm leading-loose text-[#e8dfc4]">
                  「唱{han}字时，入般若波罗蜜门，名<strong className="text-gold font-normal">{L!.gate}</strong>。」
                  <span className="block mt-1 text-xs text-[#6f6788]">——《华严经·入法界品》</span>
                </p>
                <p className="text-sm leading-loose text-dim">
                  遮诠之悟：{L!.meaning}。凡以为实者，于此字下不可得。
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-loose text-[#e8dfc4]">{S!.meaning}</p>
                {data.seedWheelLetter && (
                  <p className="text-sm leading-loose text-dim">
                    此字亦在四十二字门中，为第 {data.seedWheelLetter.n} 字——
                    入般若波罗蜜门，名「{data.seedWheelLetter.gate}」；遮诠之悟：{data.seedWheelLetter.meaning}。
                    <span className="block mt-1 text-xs text-[#6f6788]">一门之音，显密两用。</span>
                  </p>
                )}
              </div>
            )}
          </section>

          {/* 观法 */}
          <section>
            <BlockTitle>观法 · 以此字入观</BlockTitle>
            {isLetter ? (
              <ol className="space-y-3 text-sm leading-loose text-dim list-none">
                <li><span className="text-gold mr-2">一 · 入座</span>安身静心，目前悬一月轮，白如满月。</li>
                <li><span className="text-gold mr-2">二 · 持字</span>月中现金色此字（{iast}），口持其音，声住于字，字住于心；心走失了，看见，回来。</li>
                <li><span className="text-gold mr-2">三 · 观义</span>观「{L!.meaning}」——字所遮处，正是心歇处；不寻答案，只住在问里。</li>
                <li><span className="text-gold mr-2">四 · 字亡</span>字形渐泯，光收于月，月收于空。住于无言，是为字亡观寂。</li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm leading-loose text-dim list-none">
                <li><span className="text-gold mr-2">一 · 入座</span>安身静心，观自心为月轮，本净无垢。</li>
                <li><span className="text-gold mr-2">二 · 现字</span>月轮之中，现金色此字（{iast}）——{S!.deity}之德，于此一字具足。</li>
                <li><span className="text-gold mr-2">三 · 放光</span>字放无量光，遍照十方：{S!.meaning}。光所至处，众生同沾。</li>
                <li><span className="text-gold mr-2">四 · 摄归</span>光与字收摄，融入自心——字之德即心之德，无二无别。终则字亡观寂。</li>
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
            以此字入观 · 一座十五分
          </button>
          <span className="text-xs text-[#6f6788] leading-relaxed">携此字往日课，月轮自现此字</span>
        </div>
      </div>
    </div>
  )
}
