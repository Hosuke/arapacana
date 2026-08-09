import { sources } from '@/data/curriculum'

export default function Source() {
  return (
    <section id="source" className="max-w-4xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          法源与仪轨
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          经论所据 · 文献出处
        </h2>
      </header>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {sources.map((s) => (
          <article key={s.title} className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6">
            <h3 className="text-base tracking-[0.15em] text-[#e8dfc4] mb-3">{s.title}</h3>
            <p className="text-sm leading-loose text-dim">{s.body}</p>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-xs leading-relaxed text-gold/75 hover:text-gold border-b border-[#c9a227]/25 hover:border-[#c9a227]"
            >
              {s.ref} ↗
            </a>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-[#c9a227]/25 bg-[#c9a227]/6 p-7">
        <h3 className="text-sm tracking-[0.35em] text-gold mb-4">如法的边界</h3>
        <p className="text-sm leading-loose text-[#d6cdb2]">
          本站文案依下列经论及公开仪轨整理，只作字相辨识、法义导读与观学辅助；
          不称传法，不授灌顶，不替代皈依、戒法、口授及具德善知识。
          月轮、种子字、五相成身、上转下转等各有传承语境：有师承者依师教，
          未受相关教授者宜以闻思与字相学习为限。礼敬尊像、亲近善知识自有其法义；
          本站只避免以个人崇拜代替依法修学，并不否定礼敬与依止。
        </p>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs tracking-[0.2em] text-[#6f6788] leading-loose">
          相关图示可参「金胎不二 · 两部曼荼罗」。图示仅供学习，不以图式代替教义
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
