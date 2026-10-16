import type { ExperienceItem, Profile, ProjectItem, SkillCategory } from '../types/portfolio'

/**
 * Replace this with a real GitHub profile URL, for example:
 * https://github.com/your-username
 * Leave it empty to show a labeled placeholder instead of a broken link.
 */
const configuredGithubUrl = ''

export const profile: Profile = {
  name: 'Prabeer Sarkar',
  initials: 'PS',
  role: 'Full-Stack Developer | React.js | Node.js | AI-Powered Web Applications',
  location: 'Hyderabad, India',
  email: 'prabeersarkar098@gmail.com',
  phone: '+91 6303161925',
  phoneHref: 'tel:+916303161925',
  linkedinUrl: 'https://www.linkedin.com/in/prabeer-sarkar-705b56240/',
  githubUrl: configuredGithubUrl,
  experienceLabel: 'About 2.6 years',
  focusLabel: 'React.js, Node.js, and AI-powered interfaces',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const heroContent = {
  eyebrow: 'Full-Stack Developer · Hyderabad, India',
  greeting: "Hi, I'm Prabeer Sarkar",
  headline:
    'Full-Stack Developer building responsive web applications and AI-powered digital experiences.',
  intro:
    'I build responsive interfaces with React.js and TypeScript, and I connect them to Node.js, Express.js, and PostgreSQL through REST APIs. My recent work includes conversational, AI-powered booking experiences.',
}

export const aboutParagraphs = [
  'I am a full-stack developer based in Hyderabad, with about 2.6 years of experience. I build responsive React interfaces and backend services, including REST APIs with Node.js, Express.js, and PostgreSQL.',
  'At FastCollab System I am building an AI-powered conversational interface for business travel and expense management. The work includes reusable responsive components, chat-based booking flows, and integration with AI orchestration APIs and backend REST services for inventory, pricing, and booking confirmations.',
  'I collaborate with backend developers on API integration, validation, and error handling. I also take part in Agile delivery, including code reviews and releases, with attention to performance and maintainable UI code.',
  'Before FastCollab, I developed full-stack web applications at GenAmplify Solutions Hub using React.js, Node.js, Express.js, and PostgreSQL.',
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    skills: ['React.js', 'JavaScript', 'TypeScript', 'HTML5 and CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Core Java', 'Spring Boot'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'Sequelize ORM'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    icon: 'cloud',
    skills: ['AWS Lambda', 'Amazon S3', 'API Gateway', 'CloudWatch', 'Amazon EC2'],
  },
  {
    id: 'tools',
    title: 'Tools and practices',
    icon: 'tools',
    skills: ['Git', 'Postman', 'Figma', 'Jira', 'Responsive Design', 'Cleao.ai'],
  },
]

export const experience: ExperienceItem[] = [
  {
    id: 'fastcollab',
    role: 'Software Engineer',
    company: 'FastCollab System',
    location: 'Hyderabad, India',
    dates: 'June 2025 – Present',
    highlights: [
      'Built an AI-powered conversational React interface for business travel and expense management.',
      'Reduced flight-booking steps by 40% through a chat-based booking interface.',
      'Developed reusable responsive UI components.',
      'Implemented conversational workflows for source, destination, date, and flight class.',
      'Integrated AI orchestration APIs and backend REST services for inventory, pricing, and booking confirmations.',
      'Worked with backend developers on API integration, validation, and error handling.',
      'Optimized frontend performance and responsiveness.',
    ],
  },
  {
    id: 'genamplify',
    role: 'Software Engineer',
    company: 'GenAmplify Solutions Hub',
    location: 'Hyderabad, India',
    dates: 'December 2023 – June 2025',
    highlights: [
      'Developed full-stack web applications using React.js, Node.js, Express.js, and PostgreSQL.',
      'Implemented REST APIs.',
      'Built responsive user interfaces.',
      'Participated in Agile/Scrum processes, code reviews, and releases.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    id: 'fastcollab-ai',
    title: 'FastCollab AI — Conversational Travel & Expense Booking',
    description:
      'An AI-powered business travel and expense management platform that allows employees to book flights, manage travel requests, and handle travel-related expenses through a conversational interface.',
    technologies: ['React.js', 'REST APIs', 'AI orchestration APIs'],
    highlights: [
      'Replaced multi-page booking forms with a conversational flow.',
      'Built reusable chat-based UI components.',
      'Supported responsive web and mobile experiences.',
      'Reduced flight-booking steps by 40%.',
    ],
    visual: 'travel',
  },
  {
    id: 'credentialing-streamline',
    title: 'Credentialing Streamline — Healthcare Provider Credentialing Platform',
    description:
      'A platform designed to streamline healthcare provider credentialing workflows in the US healthcare industry.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Figma'],
    highlights: [
      'Designed screens in Figma.',
      'Implemented responsive React interfaces.',
      'Developed REST APIs using Node.js and Express.js.',
      'Focused on UI performance and process efficiency.',
    ],
    visual: 'health',
  },
  {
    id: 'taskboard',
    title: 'Taskboard — Jira-Style Project Management Application',
    description: 'A Jira-style project and issue tracking application.',
    technologies: ['React.js', 'Node.js'],
    highlights: [
      'Developed frontend interfaces in React.',
      'Implemented server-side application logic in Node.js.',
      'Built project and issue tracking functionality.',
    ],
    visual: 'board',
  },
]
