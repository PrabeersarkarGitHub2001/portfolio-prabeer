import emailjs from '@emailjs/browser'

/**
 * Public EmailJS configuration.
 * The public key is meant to live in the browser.
 * Never put an EmailJS private key, Gmail password, or recipient override here.
 * The inbox that receives messages is set on the EmailJS template.
 */

function readEnv(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : ''
}

export const emailConfig = {
  serviceId: readEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID),
  templateId: readEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
  publicKey: readEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
}

/** Client-side pause after a successful send. This is not a security control. */
export const CLIENT_COOLDOWN_MS = 30_000

export function isEmailConfigured(): boolean {
  return Boolean(emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey)
}

export async function sendContactForm(form: HTMLFormElement): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error('EmailJS is not configured.')
  }

  await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form, {
    publicKey: emailConfig.publicKey,
    blockHeadless: true,
    limitRate: {
      id: 'portfolio-contact',
      throttle: CLIENT_COOLDOWN_MS,
    },
  })
}

export function getEmailJsStatus(error: unknown): number | null {
  if (typeof error === 'object' && error && 'status' in error) {
    const status = (error as { status?: unknown }).status
    return typeof status === 'number' ? status : null
  }
  return null
}

export function getEmailJsErrorText(error: unknown): string {
  if (typeof error === 'object' && error && 'text' in error) {
    const text = (error as { text?: unknown }).text
    if (typeof text === 'string' && text.trim()) return text.trim()
  }
  if (error instanceof Error && error.message.trim()) return error.message.trim()
  return ''
}

export function buildSendError(error: unknown): string {
  if (getEmailJsStatus(error) === 429) {
    return 'Too many messages were sent in a short time. Please wait a moment, or email me directly.'
  }

  const base = 'The message could not be sent. Please try again, or email me directly.'
  const detail = getEmailJsErrorText(error)
  if (import.meta.env.DEV && detail) return `${base} EmailJS: ${detail}`
  return base
}
