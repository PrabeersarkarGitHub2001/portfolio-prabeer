import type { ProjectItem } from '../types/portfolio'

function ProjectVisual({ visual }: { visual: ProjectItem['visual'] }) {
  if (visual === 'travel') {
    return (
      <div className="relative h-40 overflow-hidden border-b border-white/10 bg-[#0c1733] md:h-auto md:border-r md:border-b-0">
        <svg viewBox="0 0 320 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M24 150 C 90 150, 110 70, 170 70 S 250 160, 300 84" fill="none" stroke="#8eb4ff" strokeWidth="2" />
          <circle cx="24" cy="150" r="5" fill="#8eb4ff" />
          <circle cx="300" cy="84" r="5" fill="#f4f7fb" />
          <path d="M40 190 H 280" stroke="rgb(255 255 255 / 0.08)" />
        </svg>
        <p className="absolute bottom-3 left-4 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Illustration</p>
      </div>
    )
  }

  if (visual === 'health') {
    return (
      <div className="relative h-40 overflow-hidden border-b border-white/10 bg-[#10161f] md:h-auto md:border-r md:border-b-0">
        <svg viewBox="0 0 320 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="48" y="46" width="150" height="92" rx="14" fill="rgb(255 255 255 / 0.04)" stroke="#8eb4ff" />
          <rect x="92" y="78" width="150" height="92" rx="14" fill="#10161f" stroke="rgb(255 255 255 / 0.28)" />
          <path d="M118 124 H 214 M166 100 V 148" stroke="#8eb4ff" strokeWidth="2" />
        </svg>
        <p className="absolute bottom-3 left-4 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Illustration</p>
      </div>
    )
  }

  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/10 bg-[#0b1224] md:h-auto md:border-r md:border-b-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgb(142_180_255/0.28),transparent_68%)]" />
      <div className="relative flex flex-col items-center px-4 py-7">
        <svg viewBox="0 0 72 72" className="h-[4.75rem] w-[4.75rem]" aria-hidden="true">
          <defs>
            <linearGradient id="taskboard-logo" x1="8" y1="2" x2="64" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#d5e4ff" />
              <stop offset="0.42" stopColor="#7aa6ff" />
              <stop offset="1" stopColor="#1e4fd0" />
            </linearGradient>
          </defs>
          <rect width="72" height="72" rx="22" fill="url(#taskboard-logo)" />
          <rect x="11" y="11" width="50" height="50" rx="15" fill="none" stroke="rgb(255 255 255 / 0.32)" strokeWidth="1.25" />
          <rect x="18" y="19" width="10" height="34" rx="3.5" fill="#07101c" fillOpacity="0.22" />
          <rect x="31" y="19" width="10" height="34" rx="3.5" fill="#07101c" fillOpacity="0.22" />
          <rect x="44" y="19" width="10" height="34" rx="3.5" fill="#07101c" fillOpacity="0.22" />
          <rect x="20" y="22" width="6" height="8" rx="1.8" fill="#f7f9ff" />
          <rect x="20" y="32" width="6" height="5" rx="1.8" fill="#f7f9ff" fillOpacity="0.5" />
          <rect x="33" y="22" width="6" height="11" rx="1.8" fill="#f7f9ff" />
          <rect x="33" y="35" width="6" height="5" rx="1.8" fill="#f7f9ff" fillOpacity="0.72" />
          <rect x="46" y="22" width="6" height="5" rx="1.8" fill="#f7f9ff" fillOpacity="0.88" />
          <path
            d="M46.4 35.1 48 36.7 51.2 33.4"
            fill="none"
            stroke="#f7f9ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-display mt-3 text-[15px] leading-none font-semibold tracking-[-0.03em] text-ink">Taskboard</p>
        <p className="mt-1.5 text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">Issue tracking</p>
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="surface magic-hover md:grid md:grid-cols-[220px_minmax(0,1fr)]">
      <ProjectVisual visual={project.visual} />
      <div className="min-w-0 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-balance sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted sm:text-base">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology} className="tag">
              {technology}
            </li>
          ))}
        </ul>
        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Professional case study · no public demo
        </p>
      </div>
    </article>
  )
}
