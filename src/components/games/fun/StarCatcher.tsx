import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface Star {
  id: number
  x: number
  y: number
}

interface StarCatcherProps {
  onBack: () => void
}

export default function StarCatcher({ onBack }: StarCatcherProps) {
  const [stars, setStars] = useState<Star[]>([])
  const [score, setScore] = useState(0)
  const TARGET = 20

  useEffect(() => {
    const spawn = setInterval(() => {
      setStars((prev) => [...prev, { id: Date.now(), x: Math.random() * 85 + 5, y: -5 }].slice(-15))
    }, 500)
    return () => clearInterval(spawn)
  }, [])

  useEffect(() => {
    const fall = setInterval(() => {
      setStars((prev) => prev.map((s) => ({ ...s, y: s.y + 2 })).filter((s) => s.y < 105))
    }, 50)
    return () => clearInterval(fall)
  }, [])

  const catchStar = (id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id))
    const next = score + 1
    setScore(next)
    celebrate('light')
    if (next >= TARGET) celebrate('full')
  }

  return (
    <FunGameShell title="Star Catcher" emoji="⭐" score={score} subtitle={`${score}/${TARGET}`} onBack={onBack} gradient="from-indigo-400 to-purple-500">
      <div className="relative w-full h-full max-w-2xl bg-indigo-900/20 rounded-3xl border-4 border-white/30">
        {stars.map((s) => (
          <button
            key={s.id}
            onClick={() => catchStar(s.id)}
            className="absolute text-4xl animate-pulse"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            ⭐
          </button>
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl">🧺</div>
      </div>
    </FunGameShell>
  )
}
