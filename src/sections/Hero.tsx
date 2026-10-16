import { HeroVisual } from '../components/HeroVisual'
import { GithubLink, LinkedInLink, ResumeLink } from '../components/Links'
import { heroContent } from '../data/portfolio'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      tabIndex={-1}
      className="scroll-mt-24 px-5 pt-28 pb-20 sm:px-8 md:pt-32 md:pb-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{heroContent.eyebrow}</p>
          <h1 id="home-title" className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {heroContent.greeting}
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-snug font-medium text-pretty text-ink sm:text-2xl">
            {heroContent.headline}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{heroContent.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="btn btn-primary" href="#projects">
              View My Work
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact Me
            </a>
            <ResumeLink label="Download Resume" variant="secondary" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <LinkedInLink />
            <GithubLink />
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
