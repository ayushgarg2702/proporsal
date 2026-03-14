const FORMSPREE_URL = 'https://formspree.io/f/mreyagod'

/**
 * Sends an email notification via Formspree.
 * @param {'YES' | 'NO'} buttonType
 */
export function sendEmail(buttonType) {
  fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: `Click ${buttonType}`,
      message: `Button: ${buttonType} | Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        console.info('[Formspree] ✅ Email sent!')
      } else {
        console.warn('[Formspree] ❌ Failed:', data)
      }
    })
    .catch((err) => console.warn('[Formspree] Network error:', err))
}
