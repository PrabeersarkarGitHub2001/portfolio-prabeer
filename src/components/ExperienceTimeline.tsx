import type { ExperienceItem } from '../types/portfolio'

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="timeline space-y-6">
      {items.map((item) => {
        const current = item.dates.endsWith('Present')
        return (
          <li key={item.id}>
            <span className="timeline-dot" aria-hidden="true" />
            <article className="magic-hover surface p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-accent">{item.company}</p>
                </div>
                <div className="text-sm text-muted sm:text-right">
                  <p className="font-medium text-ink">
                    {item.dates}
                    {current ? (
                      <span className="ml-2 inline-flex rounded-full border border-accent/40 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-accent uppercase">
                        Current
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1">{item.location}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
