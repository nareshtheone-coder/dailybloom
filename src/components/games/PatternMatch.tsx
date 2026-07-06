import { useState, useMemo } from 'react'
import { celebrate } from '../../utils/celebrations'
import { QUICK_PATTERNS } from '../../data/gamesLibrary'

interface PatternMatchProps {
  onBack: () => void
}

const COLOR_OPTIONS = ['🔴', '🟢', '🟡', '🔵', '🟣', '🟠']

export default function PatternMatch({ onBack }: PatternMatchProps) {
  const [patternIndex, setPatternIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [completed, setCompleted] = useState(false)

  const current = QUICK_PATTERNS[patternIndex]
  const correctEmoji = current.pattern[current.missing]

  const options = useMemo(
    () => generateOptions(correctEmoji, current.pattern),
    [patternIndex],
  )

  function generateOptions(correct: string, pattern: string[]): string[] {
    const opts = new Set<string>([correct])
    pattern.forEach((p) => opts.add(p))
    while (opts.size < 4) {
      const random = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]
      opts.add(random)
    }
    return Array.from(opts)
      .slice(0, 4)
      .sort(() => Math.random() - 0.5)
  }

  const handleSelect = (emoji: string) => {
    if (selected) return
    setSelected(true)

    if (emoji === correctEmoji) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (patternIndex < QUICK_PATTERNS.length - 1) {
        setTimeout(() => {
          setPatternIndex((prev) => prev + 1)
          setSelected(false)
        }, 1000)
      } else {
        celebrate('full')
        setCompleted(true)
      }
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-red-300 via-orange-300 to-yellow-300 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🎭 Pattern Play
        </h1>
        <p className="text-white text-lg drop-shadow">
          {completed
            ? 'All patterns done!'
            : `Pattern ${patternIndex + 1}/${QUICK_PATTERNS.length} · Score: ${score}`}
        </p>
      </div>

      {/* Pattern display */}
      <div className="mb-8 text-center">
        <p className="text-white text-lg drop-shadow mb-4">What comes next?</p>
        <div className="flex gap-4 md:gap-6 justify-center items-center bg-white/30 rounded-3xl px-8 py-6 shadow-xl">
          {current.pattern.map((emoji, i) => (
            <div
              key={i}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-5xl md:text-6xl ${
                i === current.missing
                  ? 'bg-white/50 border-4 border-dashed border-white animate-pulse'
                  : 'bg-white/80'
              }`}
            >
              {i === current.missing ? '❓' : emoji}
            </div>
          ))}
        </div>
        <p className="text-white/90 text-sm mt-3 drop-shadow">{current.name} pattern</p>
      </div>

      {/* Answer options */}
      {!completed && (
        <div className="mb-8">
          <p className="text-white text-lg drop-shadow mb-4 text-center animate-bounce">
            👉 Pick the missing one!
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md">
            {options.map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleSelect(emoji)}
                disabled={selected}
                className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-5xl md:text-6xl transition-all shadow-xl ${
                  selected
                    ? emoji === correctEmoji
                      ? 'bg-green-400 scale-110'
                      : 'bg-red-300/80'
                    : 'bg-white/90 hover:scale-105 hover:bg-white active:scale-95'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {QUICK_PATTERNS.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all ${
              i < patternIndex
                ? 'bg-white shadow-lg scale-110'
                : i === patternIndex
                  ? 'bg-white/70 ring-2 ring-white'
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {completed && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-white text-2xl font-bold drop-shadow">Pattern Master!</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-orange-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
