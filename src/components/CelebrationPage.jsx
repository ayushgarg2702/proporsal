import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const AGENDA = [
  { emoji: '☕', text: 'Food & good vibes' },
  { emoji: '🍰', text: 'Dessert (highly recommended per Clause 3)' },
  { emoji: '😄', text: 'Mandatory laughs' },
  { emoji: '🎮', text: 'Games & friendly competition' },
  { emoji: '✨', text: 'Getting to know each other' },
]

const HEARTS = ['❤️', '💖', '💕', '💗', '💝', '🌸', '💫']

function launchConfetti() {
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e91e8c', '#f48fb1', '#c2185b', '#f8bbd9', '#e8d5f5', '#fff'],
    })
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e91e8c', '#f48fb1', '#c2185b', '#f8bbd9', '#e8d5f5', '#fff'],
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }

  frame()

  // Big burst in center
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#e91e8c', '#f48fb1', '#c2185b', '#9c27b0', '#fff'],
      scalar: 1.2,
    })
  }, 200)
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const floatingHeartVariants = (i) => ({
  initial: {
    opacity: 0,
    x: (Math.random() - 0.5) * 200,
    y: 60,
    scale: 0.5,
  },
  animate: {
    opacity: [0, 0.8, 0],
    y: -150 - Math.random() * 150,
    x: (Math.random() - 0.5) * 120,
    scale: [0.5, 1.2, 0.8],
    transition: {
      duration: 2.5 + Math.random() * 2,
      delay: i * 0.2,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
      ease: 'easeOut',
    },
  },
})

export default function CelebrationPage() {
  useEffect(() => {
    launchConfetti()
  }, [])

  return (
    <motion.div
      className="page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating hearts behind card */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {HEARTS.map((h, i) => {
          const vars = floatingHeartVariants(i)
          return (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                fontSize: `${1.2 + Math.random() * 1.5}rem`,
                left: `${15 + Math.random() * 70}%`,
                bottom: '20%',
              }}
              initial={vars.initial}
              animate={vars.animate}
            >
              {h}
            </motion.span>
          )
        })}
      </div>

      <motion.div
        className="glass-card"
        variants={itemVariants}
        style={{ maxWidth: '540px', position: 'relative', zIndex: 2 }}
      >
        <motion.div
          variants={itemVariants}
          style={{ fontSize: '3.5rem', marginBottom: '8px' }}
          animate={{
            rotate: [0, 10, -10, 10, -5, 0],
            scale: [1, 1.15, 1.05, 1.1, 1],
          }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
        >
          🎉
        </motion.div>

        <motion.div className="celebration-badge" variants={itemVariants}>
          ✔️ &nbsp; Date Status: Approved
        </motion.div>

        <motion.h1
          className="heading"
          variants={itemVariants}
          style={{ marginBottom: '6px' }}
        >
          Request Approved! 🎉
        </motion.h1>

        <div className="divider" />

        <motion.p className="heading-italic" variants={itemVariants}>
          Palak Jain has officially agreed to go on a date with Ayush.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            background: 'rgba(233,30,140,0.05)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(233,30,140,0.12)',
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '1px',
              color: 'var(--text-muted)',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            Meeting Agenda
          </p>
          <ul className="agenda-list">
            {AGENDA.map((item, i) => (
              <motion.li
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
              >
                <span className="emoji">{item.emoji}</span>
                {item.text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            marginTop: '24px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}
        >
          Digitally approved under the Dating Act, 2025.
          <br />
          Ref: DA/2025/AYUSH-PALAK/001 &nbsp;·&nbsp; Status: EXECUTED ✔️
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
