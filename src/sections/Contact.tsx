import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { LinkedInLink } from '../components/Links'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/portfolio'

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        eyebrow="Contact"
        title="Contact"
        titleId="contact-title"
        description="Send a message about a role or a project. If the form is unavailable, email me directly."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.75fr)] lg:gap-8">
        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>
        <address className="magic-hover surface order-1 p-6 not-italic sm:p-7 lg:order-2">
          <h3 className="text-xl font-semibold">Direct contact</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Email is the surest way to reach me.
          </p>
          <ul className="mt-6 space-y-4">
            <li>
              <a className="flex items-start gap-3 text-sm break-all hover:text-accent" href={`mailto:${profile.email}`}>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </li>
            <li>
              <a className="flex items-start gap-3 text-sm hover:text-accent" href={profile.phoneHref}>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{profile.phone}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
            <li className="pt-1">
              <LinkedInLink />
            </li>
          </ul>
        </address>
      </div>
    </Section>
  )
}
