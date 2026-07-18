import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { celebrate } from '../../utils/celebrations'
import PremiumLearningFrame from '../PremiumLearningFrame'

interface ColorMatchProps {
  onBack: () => void
}

const COLORS = [
  { name: 'Red', hex: '#EF4444', emoji: '🔴' },
  { name: 'Blue', hex: '#3B82F6', emoji: '🔵' },
  { name: 'Yellow', hex: '#FBBF24', emoji: '🟡' },
  { name: 'Green', hex: '#10B981', emoji: '🟢' },
]

export default function ColorMatch({ onBack }: ColorMatchProps) {
  const [target, setTarget] = useState(COLORS[0])
  const [score, setScore] = useState(0)
  const [flash, setFlash] = useState<boolean | null>(null)

  useEffect(() => {
    setTarget(COLORS[Math.floor(Math.random() * COLORS.length)])
  }, [score])

  const pick = (c: (typeof COLORS)[0]) => {
    const ok = c.name === target.name
    setFlash(ok)
    if (ok) {
      celebrate('medium')
      setScore((s) => s + 1)
    } else celebrate('light')
    setTimeout(() => setFlash(null), 500)
  }

  return (
    <PremiumLearningFrame title="Color Match" emoji="🎨" score={score} onBack={onBack}>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-500/30 to-purple-600/30">
        <motion.p
          className="font-display text-2xl md:text-3xl text-white font-bold mb-8 drop-shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Tap the {target.emoji} {target.name}!
        </motion.p>
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-sm">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => pick(c)}
              className="relative rounded-3xl h-28 md:h-32 shadow-[0_8px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none transition-all ring-4 ring-white/30 overflow-hidden"
              style={{ backgroundColor: c.hex }}
            >
              <span className="text-5xl">{c.emoji}</span>
              {flash !== null && c.name === target.name && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-6xl"
                >
                  {flash ? '✓' : ''}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </div>
    </PremiumLearningFrame>
  )
}
