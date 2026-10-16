const links = [
  { href: '#overture', label: '序' },
  { href: '#charter', label: '总纲' },
  { href: '#paths', label: '入门' },
  { href: '#wheel', label: '字轮' },
  { href: '#bridge', label: '两门' },
  { href: '#stages', label: '六阶' },
  { href: '#practice', label: '观学' },
  { href: '#checklist', label: '自省' },
  { href: '#source', label: '法源' },
]

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0b0912]/75 border-b border-[#2a2440]/60">
      <div className="max-w-5xl mx-auto px-5 h-12 flex items-center justify-between">
        <a href="#overture" className="flex shrink-0 items-center gap-2.5 group whitespace-nowrap">
          <span className="font-siddham text-gold text-xl leading-none">{'\u{11580}'}</span>
          <span className="tracking-[0.25em] text-sm text-[#e8dfc4] group-hover:text-gold transition-colors">
            字门次第
          </span>
        </a>
        {/* 窄屏：一行横滑，右缘渐隐示其尚有；字不折行，触区纵满栏高 */}
        <div className="nav-scroll ml-4 flex min-w-0 items-center gap-5 overflow-x-auto sm:ml-0 sm:gap-6 sm:overflow-visible">
          {links.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap py-3.5 text-xs sm:text-sm tracking-[0.2em] text-dim hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
