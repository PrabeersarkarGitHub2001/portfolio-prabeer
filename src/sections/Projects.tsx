import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/portfolio'

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects"
        titleId="projects-title"
        description="Case studies from professional work. These products are not public, so this page does not link to live demos or source repositories."
      />
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
