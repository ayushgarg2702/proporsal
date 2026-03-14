import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.96, y: -20, transition: { duration: 0.35 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.4 + i * 0.1, duration: 0.45, ease: 'easeOut' },
  }),
}

const CLAUSES = [
  {
    title: 'CLAUSE 1 — LAUGHTER',
    body: 'Laughter shall be mandatory throughout the duration of the date. Smiles are non-negotiable and shall not be waived under any circumstance.',
  },
  {
    title: 'CLAUSE 2 — PHONE USAGE',
    body: 'Phone usage is strongly discouraged except for sharing memes of mutual interest. Social media posting requires prior written consent.',
  },
  {
    title: 'CLAUSE 3 — DESSERT',
    body: 'Dessert is optional but highly recommended. Party A reserves the right to order dessert regardless of Party B\'s decision.',
  },
  {
    title: 'CLAUSE 4 — GOOD VIBES',
    body: 'Both parties agree to bring their best selves. Awkward silences shall be converted into fun stories at the earliest opportunity.',
  },
  {
    title: 'CLAUSE 5 — DURATION',
    body: 'The date shall last as long as both parties are having fun. Extension clauses are subject to mutual agreement.',
  },
]

export default function LegalContract({ onSign, onSkip }) {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <FloatingHearts count={14} />

      <motion.div
        className="glass-card contract-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ overflowY: 'auto', maxHeight: '92vh' }}
      >
        <div className="contract-header">
          <div className="contract-stamp">Official Document</div>
          <h1 className="heading" style={{ fontSize: '1.9rem', marginBottom: '6px' }}>
            Date Agreement
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Ref: DA/2025/AYUSH-PALAK/001
          </p>
        </div>

        <div className="contract-parties">
          {[
            { label: 'PARTY A', name: 'Ayush', role: 'Software Engineer' },
            { label: 'PARTY B', name: 'Palak Jain', role: 'Company Secretary' },
          ].map((p, i) => (
            <motion.div
              key={p.label}
              className="party-row"
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="party-label">{p.label}:</span>
              <span className="party-name">{p.name}</span>
              <span className="party-role">({p.role})</span>
            </motion.div>
          ))}
          <motion.div
            className="party-row"
            custom={2}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="party-label">PURPOSE:</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Mutual enjoyment of food, conversation &amp; good times.
            </span>
          </motion.div>
        </div>

        {CLAUSES.map((c, i) => (
          <motion.div
            key={c.title}
            className="clause"
            custom={i + 3}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="clause-title">{c.title}</div>
            <div className="clause-body">{c.body}</div>
          </motion.div>
        ))}

        <motion.div
          custom={9}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: 'rgba(233,30,140,0.05)',
            borderRadius: '12px',
            border: '1px dashed rgba(233,30,140,0.25)',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}
        >
          By signing below, Party B agrees to the above terms and conditions.
          This agreement is legally binding under the Dating Act, 2025.
        </motion.div>

        <motion.div
          className="contract-footer"
          custom={10}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
        >
          <button className="btn-primary" onClick={onSign}>
            ✍️ Sign (I Agree)
          </button>
          <button className="btn-secondary" onClick={onSkip}>
            Skip formalities →
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
