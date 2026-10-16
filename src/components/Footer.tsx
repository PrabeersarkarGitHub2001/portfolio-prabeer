import { useReducedMotion } from 'framer-motion'
import { navItems, profile } from '../data/portfolio'
import { isSafeHttpUrl } from '../lib/url'
import { GithubLink, LinkedInLink } from './Links'

export function Footer() {
  const year = new Date().getFullYear()
  const reduce = useReducedMotion()

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{profile.role}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a className="text-sm text-muted transition-colors hover:text-ink" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Connect</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                className="text-sm break-all text-muted transition-colors hover:text-ink"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </li>
            <li>
              <LinkedInLink />
            </li>
            {isSafeHttpUrl(profile.githubUrl) ? (
              <li>
                <GithubLink />
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {profile.name}
          </p>
          <div className="flex items-center gap-4">
            <p>{profile.location}</p>
            <button
              type="button"
              className="font-medium text-ink hover:text-accent"
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
