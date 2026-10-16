import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { SkillGroup } from '../components/SkillGroup'
import { skillCategories } from '../data/portfolio'

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        eyebrow="Skills"
        title="Technical skills"
        titleId="skills-title"
        description="Technologies I use across frontend, backend, data, cloud, and day-to-day delivery."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((group, index) => (
          <Reveal key={group.id} className="h-full" delay={index * 0.04}>
            <SkillGroup group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
