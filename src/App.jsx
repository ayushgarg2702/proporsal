import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import LegalContract from './components/LegalContract'
import QuestionPage from './components/QuestionPage'
import CelebrationPage from './components/CelebrationPage'

// Pages: 'landing' | 'contract' | 'question' | 'celebration'
export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <LandingPage key="landing" onContinue={() => setPage('contract')} />
        )}
        {page === 'contract' && (
          <LegalContract
            key="contract"
            onSign={() => setPage('question')}
            onSkip={() => setPage('question')}
          />
        )}
        {page === 'question' && (
          <QuestionPage key="question" onYes={() => setPage('celebration')} />
        )}
        {page === 'celebration' && (
          <CelebrationPage key="celebration" />
        )}
      </AnimatePresence>
    </div>
  )
}
