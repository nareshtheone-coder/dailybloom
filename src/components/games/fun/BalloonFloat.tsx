import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface Balloon {
  id: number
  x: number
  y: number
  color: string
  emoji: string
}

const COLORS = [
  { color: 'bg-red-400', emoji: '🎈' },
  { color: 'bg-yellow-400', emoji: '🎈' },
  { color: 'bg-blue-400', emoji: '🎈' },
  { color: 'bg-pink-400', emoji: '🎈' },
]

interface BalloonFloatProps {
  onBack: () => void
}

export default function BalloonFloat({ onBack }: BalloonFloatProps) {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    const spawn = setInterval(() => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      setBalloons((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * 85 + 5, y: 100, ...c },
      ].slice(-12))
    }, 900)
    return () => clearInterval(spawn)
  }, [])

  useEffect(() => {
    const move = setInterval(() => {
      setBalloons((prev) => prev.map((b) => ({ ...b, y: b.y - 1.2 })).filter((b) => b.y > -15))
    }, 50)
    return () => clearInterval(move)
  }, [])

  const pop = (id: number) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id))
    setScore((s) => s + 1)
    celebrate('light')
    if (score > 0 && score % 10 === 9) celebrate('full')
  }

  return (
    <FunGameShell title="Balloon Pop" emoji="🎈" score={score} onBack={onBack} gradient="from-rose-300 to-orange-300">
      <div className="relative w-full h-full max-w-2xl">
        {balloons.map((b) => (
          <button
            key={b.id}
            onClick={() => pop(b.id)}
            className={`absolute text-5xl w-16 h-20 ${b.color} rounded-full shadow-lg hover:scale-110`}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            {b.emoji}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-4">Pop balloons before they float away!</p>
    </FunGameShell>
  )
}
