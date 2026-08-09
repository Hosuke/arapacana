import { sources } from '@/data/curriculum'

export default function Source() {
  return (
    <section id="source" className="max-w-4xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          法源与仪轨
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          次第所依 · 仪轨勘定
        </h2>
      </header>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {sources.map((s) => (
          <article key={s.title} className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6">
            <h3 className="text-base tracking-[0.15em] text-[#e8dfc4] mb-3">{s.title}</h3>
            <p className="text-sm leading-loose text-dim">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-[#c9a227]/25 bg-[#c9a227]/6 p-7">
        <h3 className="text-sm tracking-[0.35em] text-gold mb-4">如法的边界</h3>
        <p className="text-sm leading-loose text-[#d6cdb2]">
          本课程的观行次第，由出家师承依弘法大师空海所传仪轨文献勘定：
          去除的是尊像膜拜与人身依止，不去的是观行本身的结构——
          月轮、种子字、五相成身、字门遮诠、上转下转，皆如经如轨。
          敬其法，故不媚其像；重其传，故不巫其人。
        </p>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs tracking-[0.2em] text-[#6f6788] leading-loose">
          观法之图，可参「金胎不二 · 两部曼荼罗引擎」——一图两投影，结构即教义
        </p>
        <a
          href="https://github.com/hosuke/mandala"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 font-latin text-sm text-gold/80 hover:text-gold transition-colors border-b border-[#c9a227]/30 hover:border-[#c9a227]"
        >
          github.com/hosuke/mandala
        </a>
      </div>
    </section>
  )
}
