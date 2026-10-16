import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { aboutParagraphs, profile } from '../data/portfolio'

const facts = [
  { label: 'Location', value: profile.location },
  { label: 'Experience', value: profile.experienceLabel },
  { label: 'Focus', value: profile.focusLabel },
]

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading eyebrow="About" title="About me" titleId="about-title" />
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.7fr)] lg:gap-12">
        <div className="space-y-4 text-base leading-relaxed text-pretty text-muted">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Reveal>
          <dl className="magic-hover surface divide-y divide-white/10">
            {facts.map((fact) => (
              <div key={fact.label} className="p-5">
                <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{fact.label}</dt>
                <dd className="mt-2 font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
