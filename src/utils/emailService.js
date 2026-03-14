// v2 — re-baked with corrected access key
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

/**
 * Sends an email notification via Web3Forms.
 * @param {'YES' | 'NO'} buttonType
 */
export function sendEmail(buttonType) {
  if (!ACCESS_KEY) {
    console.info('[Web3Forms] Not configured — skipping email send.')
    return
  }

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Click ${buttonType}`,
      botcheck: false,
      Button_Clicked: buttonType,
      Time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      Browser: navigator.userAgent,
      from_name: 'Date Proposal Website',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.info('[Web3Forms] ✅ Email sent:', data.message)
      } else {
        console.warn('[Web3Forms] ❌ Failed:', data.message)
      }
    })
    .catch((err) => console.warn('[Web3Forms] Network error:', err))
}
