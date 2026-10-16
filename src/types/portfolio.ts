export interface Profile {
  name: string
  initials: string
  role: string
  location: string
  email: string
  phone: string
  phoneHref: string
  linkedinUrl: string
  githubUrl: string
  experienceLabel: string
  focusLabel: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'
  skills: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  dates: string
  highlights: string[]
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  highlights: string[]
  visual: 'travel' | 'health' | 'board'
}
