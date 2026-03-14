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
      Button_Clicked: buttonType,
      Time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      Browser: navigator.userAgent,
      from_name: 'Date Proposal Website',
    }),
  })
    .then((res) => res.json())
    .then((data) => console.info('[Web3Forms] Email sent:', data))
    .catch((err) => console.warn('[Web3Forms] Failed:', err))
}
