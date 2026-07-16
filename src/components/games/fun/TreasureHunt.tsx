import { useState, useMemo } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const PRIZES = ['⭐', '💎', '🍭', '🎁', '🌟']

interface TreasureHuntProps {
  onBack: () => void
}

export default function TreasureHunt({ onBack }: TreasureHuntProps) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const treasureIndex = useMemo(() => Math.floor(Math.random() * 4), [round])

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === treasureIndex) {
      celebrate('medium')
      setScore((s) => s + 1)
    }
    setTimeout(() => {
      setPicked(null)
      setRound((r) => r + 1)
    }, 1000)
  }

  return (
    <FunGameShell title="Treasure Hunt" emoji="🗺️" score={score} subtitle={`Find ${PRIZES[round % PRIZES.length]}!`} onBack={onBack} gradient="from-amber-300 to-yellow-400">
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl text-5xl flex items-center justify-center ${
              picked === i ? (i === treasureIndex ? 'bg-green-400' : 'bg-gray-300') : 'bg-white/80 hover:scale-105'
            }`}
          >
            {picked === i ? (i === treasureIndex ? PRIZES[round % PRIZES.length] : '❌') : '🪨'}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-6">Which rock hides the treasure?</p>
    </FunGameShell>
  )
}
