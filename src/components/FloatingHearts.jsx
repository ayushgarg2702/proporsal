import { useMemo } from 'react'

const EMOJIS = ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨', '💫']

export default function FloatingHearts({ count = 18 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 10}s`,
      size: `${0.9 + Math.random() * 1.2}rem`,
    }))
  }, [count])

  return (
    <div className="hearts-container" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}
