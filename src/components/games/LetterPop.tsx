import { useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { POP_BUBBLES } from '../../data/gamesLibrary'

interface LetterPopProps {
  onBack: () => void
}

interface PopBubble {
  id: number
  letter: string
  color: string
  emoji: string
  popped: boolean
  x: number
  y: number
}

export default function LetterPop({ onBack }: LetterPopProps) {
  const [bubbles, setBubbles] = useState<PopBubble[]>(
    POP_BUBBLES.map((b, i) => ({
      id: i,
      letter: b.letter,
      color: b.color,
      emoji: b.emoji,
      popped: false,
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
    })),
  )
  const [poppedCount, setPoppedCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const handleBubblePop = (id: number) => {
    setBubbles((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)))

    const newCount = poppedCount + 1
    setPoppedCount(newCount)
    celebrate('light')

    if (newCount === POP_BUBBLES.length) {
      celebrate('full')
      setGameComplete(true)
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-red-300 via-pink-300 to-purple-300 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Header */}
      <div className="mb-4 text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          💥 Letter Pop
        </h1>
        <p className="text-white text-lg drop-shadow">
          Pop all {poppedCount}/{POP_BUBBLES.length} bubbles!
        </p>
      </div>

      {/* Game Area */}
      <div className="relative flex-1 w-full max-w-2xl bg-pink-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => !bubble.popped && handleBubblePop(bubble.id)}
            disabled={bubble.popped}
            className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center text-3xl md:text-4xl cursor-pointer transition-all transform ${
              bubble.popped
                ? 'scale-0 opacity-0'
                : `${bubble.color} shadow-lg hover:scale-110 animate-pulse`
            }`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              borderRadius: '50%',
            }}
          >
            {!bubble.popped && (
              <>
                <div className="text-2xl">{bubble.emoji}</div>
                <div className="text-sm font-bold text-white drop-shadow">{bubble.letter}</div>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Game Complete Message */}
      {gameComplete && (
        <div className="text-center mb-4 animate-bounce relative z-10">
          <div className="text-5xl md:text-6xl mb-2">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Pop Master!
          </h2>
        </div>
      )}

      {/* Instructions */}
      {!gameComplete && (
        <div className="text-center mb-4 relative z-10">
          <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce">
            👉 Tap bubbles to pop! 💦
          </p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="relative z-10 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-pink-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
