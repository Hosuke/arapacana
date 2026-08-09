import { charter } from '@/data/curriculum'

export default function Charter() {
  return (
    <section id="charter" className="max-w-5xl mx-auto px-6 py-24">
      <header className="text-center mb-14">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          立课总纲
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          三条宪法
        </h2>
        <p className="mt-5 text-sm text-dim leading-relaxed">
          课程的第一页不写任何尊名，只写这三条。它们替代了传统的「皈依—灌顶—三昧耶戒」：
          <br />
          准入资格不是灌顶，而是理解并同意这三条。
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
