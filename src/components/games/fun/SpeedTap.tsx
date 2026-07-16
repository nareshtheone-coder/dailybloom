import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface SpeedTapProps {
  onBack: () => void
}

export default function SpeedTap({ onBack }: SpeedTapProps) {
  const [timeLeft, setTimeLeft] = useState(20)
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      setTimeLeft((x) => {
        if (x <= 1) {
          setRunning(false)
          celebrate('full')
          return 0
        }
        return x - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [running])

  const tap = () => {
    if (!running) return
    setScore((s) => s + 1)
    setPos({ x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 })
    celebrate('light')
  }

  return (
    <FunGameShell title="Speed Tap" emoji="⚡" score={score} subtitle={`${timeLeft}s`} onBack={onBack} gradient="from-yellow-400 to-orange-500">
      <div className="relative w-full h-full max-w-2xl">
        {running && (
          <button
            onClick={tap}
            className="absolute w-20 h-20 bg-red-500 rounded-full text-4xl shadow-xl animate-pulse hover:scale-110"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            👆
          </button>
        )}
      </div>
      {!running && <p className="text-white text-2xl font-bold">Time! You tapped {score} times! 🎉</p>}
    </FunGameShell>
  )
}
