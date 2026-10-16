import { Loader2, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { profile } from '../data/portfolio'
import {
  buildSendError,
  CLIENT_COOLDOWN_MS,
  getEmailJsStatus,
  isEmailConfigured,
  sendContactForm,
} from '../lib/emailjs'
import { cn } from '../lib/cn'
import { hasContactErrors, validateContactForm } from '../lib/validation'
import type { ContactField, ContactFormErrors, ContactFormValues } from '../types/contact'

const emptyValues: ContactFormValues = {
  from_name: '',
  from_email: '',
  subject: '',
  message: '',
  company_website: '',
}

const fieldIds: Record<ContactField, string> = {
  from_name: 'contact-name',
  from_email: 'contact-email',
  subject: 'contact-subject',
  message: 'contact-message',
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function writeNamedValue(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name)
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    field.value = value
  }
}

function writeFormValues(form: HTMLFormElement, values: ContactFormValues) {
  const email = values.from_email.trim()
  writeNamedValue(form, 'from_name', values.from_name.trim())
  writeNamedValue(form, 'from_email', email)
  writeNamedValue(form, 'subject', values.subject.trim())
  writeNamedValue(form, 'message', values.message.trim())
  writeNamedValue(form, 'reply_to', email)
}

function DevConfigNotice() {
  return (
    <div
      className="mb-5 rounded-xl border border-accent/30 bg-accent-strong/10 px-4 py-3 text-sm leading-relaxed text-ink"
      role="status"
    >
      EmailJS is not configured, so this form cannot send email. Add <code>VITE_EMAILJS_SERVICE_ID</code>,{' '}
      <code>VITE_EMAILJS_TEMPLATE_ID</code>, and <code>VITE_EMAILJS_PUBLIC_KEY</code> to <code>.env</code>, then restart
      the dev server. A missing setup will not be reported as a successful send.
    </div>
  )
}

function ProdUnavailableNotice() {
  return (
    <div className="mb-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-muted" role="status">
      The enquiry form is not available on this deployment yet. Please use the email address instead.
    </div>
  )
}

interface TextFieldProps {
  id: string
  name: ContactField
  label: string
  value: string
  error?: string
  disabled: boolean
  onChange: (value: string) => void
  type?: 'text' | 'email'
  autoComplete?: string
  maxLength: number
  multiline?: boolean
}

function TextField({
  id,
  name,
  label,
  value,
  error,
  disabled,
  onChange,
  type = 'text',
  autoComplete,
  maxLength,
  multiline = false,
}: TextFieldProps) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    value,
    disabled,
    maxLength,
    autoComplete,
    className: cn('field', error && 'field-invalid'),
    'aria-required': true as const,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        <span aria-hidden="true" className="text-danger">
          {' '}
          *
        </span>
        <span className="sr-only"> (required)</span>
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} spellCheck enterKeyHint="send" />
      ) : (
        <input
          {...shared}
          type={type}
          inputMode={type === 'email' ? 'email' : undefined}
          autoCapitalize={type === 'email' ? 'none' : undefined}
          autoCorrect={type === 'email' ? 'off' : undefined}
          spellCheck={false}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const submittingRef = useRef(false)
  const lastAttempt = useRef(0)
  const [values, setValues] = useState<ContactFormValues>(emptyValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')
  const [offerEmail, setOfferEmail] = useState(false)
  const configured = isEmailConfigured()

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!(field in current)) return current
      const next = { ...current }
      delete next[field as ContactField]
      return next
    })
    if (status !== 'submitting') {
      setFeedback('')
      setOfferEmail(false)
      if (status === 'error') setStatus('idle')
    }
  }

  const reset = () => {
    setValues(emptyValues)
    setErrors({})
    setFeedback('')
    setOfferEmail(false)
    setStatus('idle')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submittingRef.current) return

    const nextErrors = validateContactForm(values)
    if (hasContactErrors(nextErrors)) {
      setErrors(nextErrors)
      setStatus('idle')
      setOfferEmail(false)
      setFeedback('Please correct the highlighted fields.')
      const firstInvalid = (Object.keys(fieldIds) as ContactField[]).find((field) => nextErrors[field])
      if (firstInvalid) document.getElementById(fieldIds[firstInvalid])?.focus()
      return
    }

    if (values.company_website.trim()) {
      setValues(emptyValues)
      setErrors({})
      setFeedback('')
      setOfferEmail(false)
      setStatus('success')
      return
    }

    if (!configured) {
      setStatus('error')
      setOfferEmail(true)
      setFeedback(
        import.meta.env.DEV
          ? 'EmailJS is not configured. Add the three VITE_EMAILJS variables to .env and restart the dev server.'
          : 'This form cannot send email yet. Please contact me directly.',
      )
      return
    }

    if (lastAttempt.current > 0) {
      const remainingMs = CLIENT_COOLDOWN_MS - (Date.now() - lastAttempt.current)
      if (remainingMs > 0) {
        setStatus('error')
        setOfferEmail(false)
        setFeedback(`Please wait ${Math.ceil(remainingMs / 1000)} seconds before sending another message.`)
        return
      }
    }

    const form = formRef.current
    if (!form) {
      setStatus('error')
      setOfferEmail(true)
      setFeedback('The form could not be read. Please refresh the page and try again.')
      return
    }

    submittingRef.current = true
    try {
      writeFormValues(form, values)
      const pending = sendContactForm(form)
      setStatus('submitting')
      setFeedback('')
      setOfferEmail(false)
      await pending
      lastAttempt.current = Date.now()
      setValues(emptyValues)
      setErrors({})
      setStatus('success')
    } catch (error) {
      if (getEmailJsStatus(error) === 429) lastAttempt.current = Date.now()
      setStatus('error')
      setOfferEmail(true)
      setFeedback(buildSendError(error))
    } finally {
      submittingRef.current = false
    }
  }

  const configNotice = !configured ? import.meta.env.DEV ? <DevConfigNotice /> : <ProdUnavailableNotice /> : null

  if (status === 'success') {
    return (
      <div className="surface p-6 sm:p-8">
        {configNotice}
        <div role="status" aria-live="polite">
          <h3 ref={successRef} tabIndex={-1} className="text-2xl font-semibold outline-none">
            Message sent
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            Your message was sent. I’ll read it from my inbox.
          </p>
          <button type="button" className="btn btn-secondary mt-6" onClick={reset}>
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {configNotice}
      <form
        ref={formRef}
        className="surface relative p-6 sm:p-8"
        noValidate
        aria-label="Enquiry form"
        onSubmit={onSubmit}
      >
        <p className="text-sm text-muted">All fields are required.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField
            id={fieldIds.from_name}
            name="from_name"
            label="Full name"
            value={values.from_name}
            error={errors.from_name}
            disabled={status === 'submitting'}
            onChange={(value) => updateField('from_name', value)}
            autoComplete="name"
            maxLength={80}
          />
          <TextField
            id={fieldIds.from_email}
            name="from_email"
            label="Email address"
            type="email"
            value={values.from_email}
            error={errors.from_email}
            disabled={status === 'submitting'}
            onChange={(value) => updateField('from_email', value)}
            autoComplete="email"
            maxLength={120}
          />
        </div>
        <div className="mt-5">
          <TextField
            id={fieldIds.subject}
            name="subject"
            label="Subject"
            value={values.subject}
            error={errors.subject}
            disabled={status === 'submitting'}
            onChange={(value) => updateField('subject', value)}
            maxLength={140}
          />
        </div>
        <div className="mt-5">
          <TextField
            id={fieldIds.message}
            name="message"
            label="Message"
            value={values.message}
            error={errors.message}
            disabled={status === 'submitting'}
            onChange={(value) => updateField('message', value)}
            maxLength={2000}
            multiline
          />
        </div>

        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company website</label>
          <input
            id="contact-company"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company_website}
            onChange={(event) => updateField('company_website', event.target.value)}
          />
        </div>
        <input type="hidden" name="reply_to" value={values.from_email.trim()} />

        {feedback ? (
          <div
            role="alert"
            className={cn(
              'mt-5 rounded-xl px-4 py-3 text-sm leading-relaxed',
              status === 'error'
                ? 'border border-danger/40 bg-danger/10 text-danger'
                : 'border border-white/10 bg-white/5 text-ink',
            )}
          >
            {feedback}
            {offerEmail ? (
              <>
                {' '}
                <a className="font-semibold underline underline-offset-2" href={`mailto:${profile.email}`}>
                  Email {profile.email}
                </a>
              </>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send message
              </>
            )}
          </button>
          <p className="text-xs leading-relaxed text-muted">Your message comes straight to my inbox.</p>
        </div>
      </form>
    </div>
  )
}
