import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function LandingPage({ onContinue }) {
  return (
    <motion.div
      className="page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <FloatingHearts count={20} />

      <motion.div className="glass-card" variants={itemVariants}>
        <motion.div variants={itemVariants} style={{ fontSize: '3rem', marginBottom: '16px' }}>
          💌
        </motion.div>

        <motion.h1 className="heading" variants={itemVariants}>
          Hi Palak 👋
        </motion.h1>

        <motion.div className="divider" variants={itemVariants} />

        <motion.p className="body-text" variants={itemVariants}>
          A software engineer
          <br />
          has a small proposal
          <br />
          for a company secretary.
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
        >
          Before filing this request officially,
          <br />I have just one question...
        </motion.p>

        <motion.button
          className="btn-primary"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
        >
          Review Proposal ✨
        </motion.button>

        <motion.p
          variants={itemVariants}
          style={{
            marginTop: '20px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.3px',
          }}
        >
          Ref No: DATE/2025/001 &nbsp;·&nbsp; Confidential
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
