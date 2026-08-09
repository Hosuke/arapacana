import MoonDisc from '@/components/MoonDisc'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center"
    >
      <div className="fade-up" style={{ animationDelay: '0.1s' }}>
        <MoonDisc size={300} />
        <p className="mt-1 text-xs tracking-[0.3em] text-[#9a8fbe]">
          <span className="font-siddham text-gold text-sm">{'\u{11580}'}</span>
          <span className="font-latin italic mx-1.5">a</span>· 注音 阿 · 一切字之首，本不生
        </p>
      </div>

      <h1
        className="fade-up mt-8 text-3xl sm:text-5xl tracking-[0.35em] text-[#f0e7cb] font-light"
        style={{ animationDelay: '0.3s', paddingLeft: '0.35em' }}
      >
        字门次第
      </h1>

      <p className="fade-up mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2" style={{ animationDelay: '0.4s' }}>
        <span className="font-siddham text-2xl sm:text-3xl text-gold" style={{ letterSpacing: '0.25em' }}>
          {'\u{11580}\u{115A8}\u{115A2}\u{11593}\u{115A1}'}
        </span>
        <span className="font-latin italic text-base sm:text-lg text-dim">a · ra · pa · ca · na</span>
      </p>

      <p className="fade-up mt-2 text-xs tracking-[0.25em] text-[#6f6788]" style={{ animationDelay: '0.42s' }}>
        四十二字门之前五字 · 即文殊五字真言 · 梵名 Arapacana
      </p>

      <p
        className="fade-up mt-5 text-sm sm:text-base tracking-[0.3em] text-gold"
        style={{ animationDelay: '0.5s', paddingLeft: '0.3em' }}
      >
        华严字母 × 诸尊种子字 · 去人格化的观行课程
      </p>

      <div className="fade-up gold-rule w-56 my-8" style={{ animationDelay: '0.6s' }} />

      <p className="fade-up max-w-xl leading-loose text-[15px] text-dim" style={{ animationDelay: '0.7s' }}>
        不拜尊像，不依上师。以一声入门，以一字安住，
        <br className="hidden sm:block" />
        以六阶次第，至于无字——让众生在法上安住，即可。
      </p>

      <p
        className="fade-up mt-10 font-latin italic text-sm text-[#6f6788]"
        style={{ animationDelay: '0.85s' }}
      >
        「绢本曼荼罗是投影，不是结构。」
      </p>

      <a
        href="#charter"
        className="fade-up mt-12 text-xs tracking-[0.4em] text-dim hover:text-gold transition-colors"
        style={{ animationDelay: '1s', paddingLeft: '0.4em' }}
      >
        下 卷
      </a>
    </section>
  )
}
