import { charter } from '@/data/curriculum'

export default function Charter() {
  return (
    <section id="charter" className="max-w-5xl mx-auto px-6 py-24">
      <header className="text-center mb-14">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          立课总纲
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          三项说明
        </h2>
        <p className="mt-5 text-sm text-dim leading-relaxed">
          以下是本站的使用边界，不是皈依、灌顶、戒法或师承的替代。
          <br />
          若所学涉及传承仪轨，应依具德善知识指导。
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        {charter.map((c) => (
          <article
            key={c.numeral}
            className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7 hover:border-[#c9a227]/40 transition-colors"
          >
            <div className="text-gold text-lg mb-1 tracking-widest">{c.numeral}</div>
            <h3 className="text-xl tracking-[0.2em] text-[#f0e7cb] mb-4">{c.title}</h3>
            <div className="gold-rule w-full mb-4 opacity-60" />
            <p className="text-sm leading-loose text-dim">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
