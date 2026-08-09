import MoonDisc from '@/components/MoonDisc'

export default function Footer() {
  return (
    <footer className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
      <div className="gold-rule w-full mb-14" />

      <div className="flex justify-center mb-8 opacity-90">
        <MoonDisc size={120} dimmed />
      </div>

      <p className="text-lg sm:text-xl tracking-[0.3em] leading-loose text-[#e8dfc4]" style={{ paddingLeft: '0.3em' }}>
        以此观行，普愿法界众生
        <br />
        入般若波罗蜜门
      </p>

      <p className="mt-10 text-xs tracking-[0.25em] text-[#6f6788] leading-loose">
        字门次第 · Arapacana —— 依法观文 · 敬法重传
        <br />
        图像仅作助缘 · 记录仅存于行者浏览器
      </p>
    </footer>
  )
}
