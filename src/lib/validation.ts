import type { ContactField, ContactFormErrors, ContactFormValues } from '../types/contact'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const limits: Record<ContactField, number> = {
  from_name: 80,
  from_email: 120,
  subject: 140,
  message: 2000,
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.from_name.trim()
  const email = values.from_email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.from_name = 'Enter your full name.'
  else if (name.length < 2) errors.from_name = 'Name should be at least 2 characters.'
  else if (name.length > limits.from_name) errors.from_name = 'Name should be 80 characters or fewer.'

  if (!email) errors.from_email = 'Enter your email address.'
  else if (!emailPattern.test(email)) errors.from_email = 'Enter a valid email address.'
  else if (email.length > limits.from_email) errors.from_email = 'Email should be 120 characters or fewer.'

  if (!subject) errors.subject = 'Enter a subject.'
  else if (subject.length < 3) errors.subject = 'Subject should be at least 3 characters.'
  else if (subject.length > limits.subject) errors.subject = 'Subject should be 140 characters or fewer.'

  if (!message) errors.message = 'Enter a message.'
  else if (message.length < 10) errors.message = 'Message should be at least 10 characters.'
  else if (message.length > limits.message) errors.message = 'Message should be 2000 characters or fewer.'

  return errors
}

export function hasContactErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0
}
