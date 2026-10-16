export interface ContactFormValues {
  from_name: string
  from_email: string
  subject: string
  message: string
  company_website: string
}

export type ContactField = 'from_name' | 'from_email' | 'subject' | 'message'

export type ContactFormErrors = Partial<Record<ContactField, string>>
