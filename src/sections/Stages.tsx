import { useState } from 'react'
import { stages } from '@/data/curriculum'

function StageCard({ index }: { index: number }) {
  const s = stages[index]
  const [open, setOpen] = useState(index === 0)

  return (
    <article className="rounded-lg border border-[#2a2440] bg-[#131022]/80 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 sm:px-8 py-6 flex items-start gap-5 hover:bg-[#181430]/60 transition-colors"
      >
        <span className="font-siddham text-gold text-2xl leading-none mt-1 w-8 shrink-0 text-center">
          {s.numeral}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-lg sm:text-xl tracking-[0.15em] text-[#f0e7cb]">{s.name}</h3>
            <span className="text-xs tracking-[0.2em] text-gold">{s.weeks}</span>
          </div>
          <p className="mt-1.5 text-sm text-dim">{s.essence}</p>
        </div>
        <span
          className={`shrink-0 mt-2 text-gold/70 text-xs transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-6 sm:px-8 pb-8 pt-2 space-y-6 border-t border-[#2a2440]/70">
            <Block label="讲义 · 闻" text={s.jiangyi} />
            <Block label="观学 · 思修" text={s.guanfa} />
            <Block label="行持 · 日用" text={s.xingchi} />

            <div>
              <div className="text-xs tracking-[0.35em] text-gold mb-3">返观 · 自省</div>
              <ul className="space-y-2">
                {s.kanyan.map((k, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-dim">
                    <span className="text-gold/60 shrink-0">·</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md bg-[#c9a227]/8 border border-[#c9a227]/25 px-5 py-4">
              <div className="text-xs tracking-[0.35em] text-gold mb-2">阶段要义</div>
              <p className="text-sm leading-relaxed text-[#e8dfc4]">{s.liaoyi}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-xs tracking-[0.35em] text-gold mb-3">{label}</div>
      <p className="text-sm leading-loose text-dim">{text}</p>
    </div>
  )
}

export default function Stages() {
  return (
    <section id="stages" className="max-w-4xl mx-auto px-6 py-24">
      <header className="text-center mb-14">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          课程次第
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          六阶 · 观学次第
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-2xl mx-auto">
          本站按「讲义 · 观学 · 行持 · 自省」整理六个学习层次。
          <br />
          这是观学提示，不是修证位阶；完成网页内容，不等于证得相应法义。
        </p>
      </header>

      <div className="space-y-4">
        {stages.map((s, i) => (
          <StageCard key={s.id} index={i} />
        ))}
      </div>

      <p className="mt-12 text-center text-xs tracking-[0.2em] text-[#6f6788] leading-loose">
        听闻音声 → 认识字门 → 随文观义 → 借图会通 → 观照不二 → 落实日用
      </p>
    </section>
  )
}
