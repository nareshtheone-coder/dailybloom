import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const MAZES = [
  { steps: ['⬅️', '⬆️', '➡️', '➡️'], goal: '🏆' },
  { steps: ['⬆️', '➡️', '⬆️', '⬅️', '⬆️'], goal: '💎' },
  { steps: ['➡️', '➡️', '⬇️', '➡️'], goal: '🌈' },
  { steps: ['⬇️', '➡️', '⬆️', '➡️', '⬇️'], goal: '🎁' },
]

interface EmojiMazeProps {
  onBack: () => void
}

export default function EmojiMaze({ onBack }: EmojiMazeProps) {
  const [level, setLevel] = useState(0)
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 1, y: 3 })

  const maze = MAZES[level % MAZES.length]
  const expected = maze.steps[step]

  const move = (dir: string) => {
    if (dir !== expected) {
      setStep(0)
      setPos({ x: 1, y: 3 })
      return
    }
    const next = step + 1
    setPos((p) => ({
      x: Math.min(4, Math.max(0, p.x + (dir === '➡️' ? 1 : dir === '⬅️' ? -1 : 0))),
      y: Math.min(4, Math.max(0, p.y + (dir === '⬆️' ? -1 : dir === '⬇️' ? 1 : 0))),
    }))
    if (next >= maze.steps.length) {
      celebrate('medium')
      setScore((s) => s + 1)
      setLevel((l) => l + 1)
      setStep(0)
      setPos({ x: 1, y: 3 })
    } else {
      setStep(next)
      celebrate('light')
    }
  }

  return (
    <FunGameShell title="Emoji Maze" emoji="🗺️" score={score} subtitle={`Level ${level + 1}`} onBack={onBack} gradient="from-emerald-500 to-teal-600">
      <div className="grid grid-cols-5 gap-1 mb-6 bg-black/20 p-2 rounded-xl">
        {Array.from({ length: 25 }).map((_, i) => {
          const x = i % 5
          const y = Math.floor(i / 5)
          const isPlayer = x === pos.x && y === pos.y
          return (
            <div key={i} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl bg-white/20 rounded">
              {isPlayer ? '🐰' : x === 4 && y === 0 ? maze.goal : ''}
            </div>
          )
        })}
      </div>
      <p className="text-white mb-3">Follow the path: {maze.steps[step]}</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {['⬅️', '➡️', '⬆️', '⬇️'].map((d) => (
          <button key={d} onClick={() => move(d)} className="text-4xl w-16 h-16 bg-white/80 rounded-xl hover:scale-105">
            {d}
          </button>
        ))}
      </div>
    </FunGameShell>
  )
}
