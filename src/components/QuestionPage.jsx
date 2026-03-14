import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import { sendEmail } from '../utils/emailService'

const NO_MESSAGES = [
  'Nice try 😄',
  'Compliance rejected. Please reconsider.',
  'Section 143 of the Dating Act requires clicking YES.',
  'Are you sure? The YES button looks nicer 👀',
  'Audit failed. Please reconsider.',
  'You found the NO button... but YES is better 😉',
  'Error 404: Valid reason to say NO not found.',
  'The court orders you to click YES. ⚖️',
  'No no no. YES yes yes. 💖',
  'That button is broken. Try YES instead.',
]

const WARNING_5 = '⚠️ System Warning: Too many rejections detected. Switching to Persuasion Mode ❤️'
const WARNING_10 = '🥺 Okay last question... Pretty please?'

function getRandomPos(noCount) {
  const behaviors = ['top-right', 'bottom-left', 'top-left', 'bottom-right', 'random']
  const positions = [
    { top: '8%', right: '8%', left: 'auto', bottom: 'auto' },
    { bottom: '12%', left: '8%', top: 'auto', right: 'auto' },
    { top: '8%', left: '8%', bottom: 'auto', right: 'auto' },
    { bottom: '12%', right: '8%', top: 'auto', left: 'auto' },
    {
      top: `${10 + Math.random() * 60}%`,
      left: `${5 + Math.random() * 60}%`,
      bottom: 'auto',
      right: 'auto',
    },
  ]
  return positions[noCount % positions.length]
}

export default function QuestionPage({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState(null) // null = inside card flow
  const [popup, setPopup] = useState(null)
  const [yesScale, setYesScale] = useState(1)
  const [noScale, setNoScale] = useState(1)
  const popupTimer = useRef(null)
  const noBtnRef = useRef(null)

  // Cursor avoidance on mousemove
  useEffect(() => {
    if (!noPos || !noBtnRef.current) return
    const handleMove = (e) => {
      const btn = noBtnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const btnCX = rect.left + rect.width / 2
      const btnCY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - btnCX, e.clientY - btnCY)
      if (dist < 100) {
        // Teleport to random corner
        setNoPos(getRandomPos(Math.floor(Math.random() * 5)))
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [noPos])

  const showPopup = useCallback((msg) => {
    setPopup(msg)
    if (popupTimer.current) clearTimeout(popupTimer.current)
    popupTimer.current = setTimeout(() => setPopup(null), 2800)
  }, [])

  const handleNo = useCallback(() => {
    const next = noCount + 1
    setNoCount(next)
    sendEmail('NO')

    // Pick message
    let msg
    if (next === 5) msg = WARNING_5
    else if (next === 10) msg = WARNING_10
    else msg = NO_MESSAGES[(next - 1) % NO_MESSAGES.length]
    showPopup(msg)

    // Move NO button
    setNoPos(getRandomPos(next))

    // Shrink NO briefly then restore
    setNoScale(0.7)
    setTimeout(() => setNoScale(1), 400)

    // Grow YES slightly (max 1.6x)
    setYesScale((s) => Math.min(s + 0.05, 1.6))
  }, [noCount, showPopup])

  const handleYes = useCallback(() => {
    sendEmail('YES')
    onYes()
  }, [onYes])

  const questionText =
    noCount >= 10
      ? 'Okay... pretty please? 🥺'
      : noCount >= 5
      ? 'Still asking nicely... 💖'
      : 'Will you go on a date with Ayush?'

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ overflow: 'visible' }}
    >
      <FloatingHearts count={16} />

      {/* Popup toast */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="popup-toast"
            key={popup}
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating NO button (after first click) */}
      <AnimatePresence>
        {noPos && (
          <motion.button
            ref={noBtnRef}
            className="btn-no"
            style={{
              position: 'fixed',
              zIndex: 50,
              ...noPos,
              scale: noScale,
            }}
            key="floating-no"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: noScale }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={handleNo}
          >
            NO 🙈
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '520px' }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }}
          style={{ fontSize: '3.2rem', marginBottom: '12px' }}
        >
          ❤️
        </motion.div>

        <h1 className="heading">Palak Jain,</h1>
        <div className="divider" />

        <AnimatePresence mode="wait">
          <motion.p
            key={questionText}
            className="body-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{ marginBottom: '8px' }}
          >
            {questionText}
          </motion.p>
        </AnimatePresence>

        {noCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}
          >
            Attempts: {noCount} &nbsp;·&nbsp; YES button approval rating: {Math.min(100, 70 + noCount * 3)}%
          </motion.p>
        )}

        <div className="question-buttons">
          {/* YES button */}
          <motion.button
            className="btn-yes"
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.07, y: -3 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            onClick={handleYes}
          >
            YES 💖
          </motion.button>

          {/* NO button (inline, first render only) */}
          {!noPos && (
            <motion.button
              className="btn-no"
              animate={{ scale: noScale }}
              transition={{ duration: 0.3 }}
              onClick={handleNo}
            >
              NO 🙈
            </motion.button>
          )}
        </div>

        {noCount >= 5 && (
          <motion.div
            className="warning-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '20px' }}
          >
            ⚠️ Persuasion Mode Active — The YES button is {Math.round((yesScale - 1) * 100)}% more prominent now.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
