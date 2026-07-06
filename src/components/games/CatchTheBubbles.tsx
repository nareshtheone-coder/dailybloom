import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'

interface CatchTheBubblesProps {
  onBack: () => void
}

interface Bubble {
  id: number
  x: number
  y: number
  type: 'regular' | 'gold' | 'rainbow'
  popped: boolean
}

const BUBBLE_TYPES = {
  regular: { color: 'bg-blue-400', emoji: '🫧', score: 1 },
  gold: { color: 'bg-yellow-400', emoji: '✨', score: 2 },
  rainbow: { color: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400', emoji: '🌈', score: 3 },
}

export default function CatchTheBubbles({ onBack }: CatchTheBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)
  const [poppedCount, setPoppedCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const TARGET_BUBBLES = 15

  // Generate bubbles
  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      const newBubble: Bubble = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 20 - 20,
        type: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'gold' : 'rainbow') : 'regular',
        popped: false,
      }
      setBubbles((prev) => [...prev, newBubble].slice(-30)) // Keep max 30 bubbles
    }, 300)

    return () => clearInterval(interval)
  }, [gameComplete])

  // Move bubbles and remove out of bounds
  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + 2 }))
          .filter((b) => b.y < 110 && !b.popped),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [gameComplete])

  const handleBubbleClick = (bubbleId: number) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === bubbleId ? { ...b, popped: true } : b)),
    )

    const bubble = bubbles.find((b) => b.id === bubbleId)
    if (bubble) {
      const points = BUBBLE_TYPES[bubble.type].score
      const newScore = score + points
      const newCount = poppedCount + 1

      setScore(newScore)
      setPoppedCount(newCount)
      celebrate('light')

      if (newCount === TARGET_BUBBLES) {
        celebrate('full')
        setGameComplete(true)
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-blue-400 flex flex-col items-center justify-start p-4 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          💥 Catch the Bubbles!
        </h1>
        <p className="text-white text-sm md:text-base drop-shadow">
          Pop {poppedCount}/{TARGET_BUBBLES} bubbles!
        </p>
      </div>

      {/* Score Display */}
      <div className="flex gap-4 md:gap-8 mb-4 justify-center">
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Score</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{score}</p>
        </div>
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Popped</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{poppedCount}</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative flex-1 w-full max-w-2xl bg-sky-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble.id)}
            disabled={bubble.popped}
            className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl cursor-pointer transition-all transform ${
              bubble.popped
                ? 'scale-0 opacity-0'
                : `${BUBBLE_TYPES[bubble.type].color} shadow-lg hover:scale-110 animate-pulse`
            }`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              borderRadius: '50%',
            }}
          >
            {!bubble.popped && BUBBLE_TYPES[bubble.type].emoji}
          </button>
        ))}
      </div>

      {/* Game Complete Message */}
      {gameComplete && (
        <div className="text-center mb-4 animate-bounce">
          <div className="text-5xl md:text-6xl mb-2">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Bubble Master!
          </h2>
          <p className="text-white drop-shadow text-lg font-semibold mt-2">Score: {score}</p>
        </div>
      )}

      {/* Instructions */}
      {!gameComplete && (
        <div className="text-center mb-4">
          <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce">
            👉 Tap bubbles to pop! 💦
          </p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-blue-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
