import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const COLORS = ['🔴', '🟢', '🔵', '🟡']

interface SimonSaysProps {
  onBack: () => void
}

export default function SimonSays({ onBack }: SimonSaysProps) {
  const [sequence, setSequence] = useState<number[]>([Math.floor(Math.random() * 4)])
  const [input, setInput] = useState<number[]>([])
  const [showing, setShowing] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const flash = async (idx: number) => {
    setShowing(idx)
    await new Promise((r) => setTimeout(r, 400))
    setShowing(null)
  }

  const playSequence = async (seq: number[]) => {
    for (const idx of seq) {
      await flash(idx)
      await new Promise((r) => setTimeout(r, 150))
    }
  }

  useEffect(() => {
    playSequence(sequence)
  }, [])

  const replay = () => playSequence(sequence)

  const tap = (idx: number) => {
    const next = [...input, idx]
    setInput(next)
    flash(idx)
    if (sequence[next.length - 1] !== idx) {
      setSequence([Math.floor(Math.random() * 4)])
      setInput([])
      return
    }
    if (next.length === sequence.length) {
      celebrate('medium')
      setScore((s) => s + 1)
      const extended = [...sequence, Math.floor(Math.random() * 4)]
      setSequence(extended)
      setInput([])
      setTimeout(() => playSequence(extended), 600)
    }
  }

  return (
    <FunGameShell title="Simon Says" emoji="🎮" score={score} subtitle={`Level ${sequence.length}`} onBack={onBack} gradient="from-cyan-400 to-blue-500">
      <button onClick={replay} className="mb-4 px-4 py-2 bg-white/80 rounded-full font-bold text-sm">
        🔊 Replay pattern
      </button>
      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((c, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl text-6xl flex items-center justify-center transition-all ${
              showing === i ? 'bg-white scale-110 ring-4 ring-white' : 'bg-white/50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </FunGameShell>
  )
}
