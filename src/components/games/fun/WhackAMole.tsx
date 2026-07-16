import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface Mole {
  id: number
  hole: number
  up: boolean
}

interface WhackAMoleProps {
  onBack: () => void
}

export default function WhackAMole({ onBack }: WhackAMoleProps) {
  const [moles, setMoles] = useState<Mole[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((x) => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) return
    const pop = setInterval(() => {
      const hole = Math.floor(Math.random() * 6)
      setMoles([{ id: Date.now(), hole, up: true }])
      setTimeout(() => setMoles([]), 700)
    }, 900)
    return () => clearInterval(pop)
  }, [timeLeft])

  const whack = (hole: number) => {
    const hit = moles.find((m) => m.hole === hole && m.up)
    if (hit) {
      setMoles([])
      setScore((s) => s + 1)
      celebrate('light')
    }
  }

  return (
    <FunGameShell title="Whack-a-Mole" emoji="🔨" score={score} subtitle={`${timeLeft}s left`} onBack={onBack} gradient="from-green-300 to-lime-400">
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {Array.from({ length: 6 }).map((_, hole) => {
          const up = moles.some((m) => m.hole === hole && m.up)
          return (
            <button
              key={hole}
              onClick={() => whack(hole)}
              className="h-24 md:h-28 bg-amber-800/40 rounded-full border-4 border-amber-900/50 flex items-end justify-center overflow-hidden"
            >
              <span className={`text-5xl transition-all ${up ? 'translate-y-0' : 'translate-y-full'}`}>🐹</span>
            </button>
          )
        })}
      </div>
      {timeLeft === 0 && <p className="text-white text-2xl font-bold mt-4">Time! Score: {score} 🎉</p>}
    </FunGameShell>
  )
}
