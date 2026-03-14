import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends an email notification via EmailJS.
 * @param {'YES' | 'NO'} buttonType
 */
export function sendEmail(buttonType) {
  // Silently skip if EmailJS is not configured
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.info('[EmailJS] Not configured — skipping email send.')
    return
  }

  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        button: buttonType,
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        browser: navigator.userAgent,
      },
      PUBLIC_KEY
    )
    .then(() => console.info(`[EmailJS] "${buttonType}" click email sent.`))
    .catch((err) => console.warn('[EmailJS] Failed to send email:', err))
}
