import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { experience } from '../data/portfolio'

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        eyebrow="Experience"
        title="Professional experience"
        titleId="experience-title"
        description="Software engineering roles in Hyderabad, with the dates from my resume."
      />
      <ExperienceTimeline items={experience} />
    </Section>
  )
}
