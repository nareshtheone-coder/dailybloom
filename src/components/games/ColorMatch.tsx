import { useState, useEffect } from 'react'

interface ColorMatchProps {
  onBack: () => void
}

interface ColorItem {
  id: number
  color: string
  matched: boolean
}

interface ColorMatch {
  id: number
  pairs: ColorItem[]
}

const COLORS = [
  { name: 'red', hex: '#EF4444', emoji: '🔴' },
  { name: 'blue', hex: '#3B82F6', emoji: '🔵' },
  { name: 'yellow', hex: '#FBBF24', emoji: '🟡' },
  { name: 'green', hex: '#10B981', emoji: '🟢' },
]

export default function ColorMatch({ onBack }: ColorMatchProps) {
  const [matches, setMatches] = useState<ColorMatch[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Create matches - each color pair
    const newMatches = COLORS.map((color, idx) => ({
      id: idx,
      pairs: [
        { id: idx * 2, color: color.hex, matched: false },
        { id: idx * 2 + 1, color: color.hex, matched: false },
      ],
    }))
    setMatches(newMatches)
  }, [])

  const handleMatch = (matchIdx: number, pairIdx: number) => {
    setMatches(prev => {
      const updated = [...prev]
      updated[matchIdx].pairs[pairIdx].matched = true
      return updated
    })
    setScore(s => s + 1)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-2xl md:text-4xl font-bold text-white">Matches: {score}</div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-4 md:gap-8 overflow-y-auto">
        {matches.map((match, matchIdx) => (
          <div key={match.id} className="flex gap-6 md:gap-12 items-center">
            {match.pairs.map((pair, pairIdx) => (
              <button
                key={pair.id}
                onClick={() => !pair.matched && handleMatch(matchIdx, pairIdx)}
                disabled={pair.matched}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl font-bold text-4xl md:text-6xl transition-all active:scale-95 shadow-lg ${
                  pair.matched
                    ? 'opacity-50 scale-90'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: pair.color }}
              >
                ✓
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
