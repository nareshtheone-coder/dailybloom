import { useState, useEffect, useRef } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface BrickBreakerProps {
  onBack: () => void
}

export default function BrickBreaker({ onBack }: BrickBreakerProps) {
  const [paddle, setPaddle] = useState(50)
  const [ball, setBall] = useState({ x: 50, y: 70, dx: 0.8, dy: -0.8 })
  const [bricks, setBricks] = useState(() => Array.from({ length: 12 }, (_, i) => ({ id: i, alive: true })))
  const [score, setScore] = useState(0)
  const areaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loop = setInterval(() => {
      setBall((b) => {
        let { x, y, dx, dy } = b
        x += dx
        y += dy
        if (x <= 5 || x >= 95) dx *= -1
        if (y <= 10) dy *= -1
        if (y >= 85) {
          if (Math.abs(x - paddle) < 12) {
            dy = -Math.abs(dy)
            celebrate('light')
          } else {
            return { x: 50, y: 70, dx: 0.8, dy: -0.8 }
          }
        }
        if (y < 35) {
          const col = Math.floor((x / 100) * 4)
          const row = y < 22 ? 0 : 1
          const idx = row * 4 + col
          setBricks((prev) => {
            if (prev[idx]?.alive) {
              const next = [...prev]
              next[idx] = { ...next[idx], alive: false }
              setScore((s) => s + 1)
              celebrate('light')
              return next
            }
            return prev
          })
          dy = Math.abs(dy)
        }
        return { x, y, dx, dy }
      })
    }, 40)
    return () => clearInterval(loop)
  }, [paddle])

  const alive = bricks.filter((b) => b.alive).length
  useEffect(() => {
    if (alive === 0) celebrate('full')
  }, [alive])

  return (
    <FunGameShell title="Brick Breaker" emoji="🧱" score={score} onBack={onBack} gradient="from-slate-600 to-indigo-700">
      <div
        ref={areaRef}
        className="relative w-full max-w-lg h-80 bg-black/30 rounded-xl border-4 border-white/20 touch-none"
        onPointerMove={(e) => {
          const rect = areaRef.current?.getBoundingClientRect()
          if (!rect) return
          setPaddle(((e.clientX - rect.left) / rect.width) * 100)
        }}
        onTouchMove={(e) => {
          const rect = areaRef.current?.getBoundingClientRect()
          if (!rect || !e.touches[0]) return
          setPaddle(((e.touches[0].clientX - rect.left) / rect.width) * 100)
        }}
      >
        {bricks.map((b, i) => {
          if (!b.alive) return null
          const row = Math.floor(i / 4)
          const col = i % 4
          return (
            <div
              key={b.id}
              className="absolute w-[22%] h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded"
              style={{ left: `${col * 25 + 2}%`, top: `${row * 12 + 8}%` }}
            />
          )
        })}
        <div className="absolute w-4 h-4 bg-white rounded-full" style={{ left: `${ball.x}%`, top: `${ball.y}%` }} />
        <div className="absolute w-20 h-3 bg-yellow-400 rounded-full bottom-4" style={{ left: `${paddle - 10}%` }} />
      </div>
      {alive === 0 && <p className="text-white font-bold mt-4">You cleared all bricks! 🎉</p>}
    </FunGameShell>
  )
}
