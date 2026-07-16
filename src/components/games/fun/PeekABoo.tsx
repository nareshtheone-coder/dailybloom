import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const HIDERS = ['☁️', '🌸', '🎁', '🪴']

interface PeekABooProps {
  onBack: () => void
}

export default function PeekABoo({ onBack }: PeekABooProps) {
  const [round, setRound] = useState(0)
  const [hidden, setHidden] = useState(true)
  const [score, setScore] = useState(0)
  const friend = ['🐻', '🐰', '🦊', '🐼', '🐨'][round % 5]

  const reveal = () => {
    if (!hidden) return
    setHidden(false)
    celebrate('medium')
    setScore((s) => s + 1)
    setTimeout(() => {
      setHidden(true)
      setRound((r) => r + 1)
    }, 1200)
  }

  return (
    <FunGameShell
      title="Peek-a-Boo"
      emoji="👀"
      score={score}
      subtitle={`Round ${round + 1}`}
      onBack={onBack}
      gradient="from-sky-300 via-indigo-300 to-purple-300"
    >
      <button
        onClick={reveal}
        className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
      >
        <span className="text-8xl absolute transition-all">{HIDERS[round % HIDERS.length]}</span>
        <span
          className={`text-9xl transition-all duration-300 ${hidden ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        >
          {friend}
        </span>
      </button>
      <p className="text-white text-lg font-bold mt-6">Tap the cloud — who is hiding?</p>
    </FunGameShell>
  )
}
