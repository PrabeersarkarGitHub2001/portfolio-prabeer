import { AppWindow, Cloud, Database, Server, Wrench, type LucideIcon } from 'lucide-react'
import type { SkillCategory } from '../types/portfolio'

const icons: Record<SkillCategory['icon'], LucideIcon> = {
  frontend: AppWindow,
  backend: Server,
  database: Database,
  cloud: Cloud,
  tools: Wrench,
}

export function SkillGroup({ group }: { group: SkillCategory }) {
  const Icon = icons[group.icon]

  return (
    <article className="magic-hover surface h-full p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-strong/15 text-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold">{group.title}</h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
        {group.skills.map((skill) => (
          <li key={skill} className="tag">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}
