export function HeroVisual() {
  return (
    <div className="relative min-w-0" aria-hidden="true">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-accent-strong/20 blur-3xl" />
      <div className="magic-hover surface shadow-[0_30px_80px_-48px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-muted">focus.ts</span>
        </div>
        <pre className="px-5 py-5 text-[13px] leading-7 wrap-break-word whitespace-pre-wrap text-muted sm:px-6">
          <code>
            <span className="text-accent">const</span> focus = {'{'}
            {'\n'}
            {'  '}ui: <span className="text-ink">&quot;React.js and TypeScript&quot;</span>,{'\n'}
            {'  '}services: <span className="text-ink">&quot;Node.js, Express, REST&quot;</span>,{'\n'}
            {'  '}data: <span className="text-ink">&quot;PostgreSQL&quot;</span>,{'\n'}
            {'  '}recent: <span className="text-ink">&quot;AI booking interface&quot;</span>,{'\n'}
            {'}'}
          </code>
        </pre>
        <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4 sm:px-6">
          {['React.js', 'TypeScript', 'Node.js', 'REST APIs'].map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
