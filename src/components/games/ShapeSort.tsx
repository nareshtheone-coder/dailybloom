import { useState, useEffect } from 'react'

interface ShapeSortProps {
  onBack: () => void
}

interface Shape {
  id: number
  emoji: string
  matched: boolean
}

const SHAPES = [
  { emoji: '⭐', name: 'star' },
  { emoji: '🟢', name: 'circle' },
  { emoji: '🟩', name: 'square' },
  { emoji: '🔺', name: 'triangle' },
  { emoji: '❤️', name: 'heart' },
  { emoji: '🌙', name: 'moon' },
]

export default function ShapeSort({ onBack }: ShapeSortProps) {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    const newShapes = SHAPES.map((shape, idx) => ({
      id: idx,
      emoji: shape.emoji,
      matched: false,
    }))
    setShapes(newShapes)
  }, [])

  const handleShape = (id: number) => {
    setShapes(prev =>
      prev.map(shape =>
        shape.id === id ? { ...shape, matched: true } : shape
      )
    )
    setScore(s => s + 1)

    // Reset after a short delay
    setTimeout(() => {
      setShapes(prev =>
        prev.map(shape =>
          shape.id === id ? { ...shape, matched: false } : shape
        )
      )
    }, 500)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-2xl md:text-4xl font-bold text-white">Shapes: {score}</div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-wrap items-center justify-center p-4 md:p-8 gap-4 md:gap-8 content-center">
        {shapes.map(shape => (
          <button
            key={shape.id}
            onClick={() => handleShape(shape.id)}
            className={`text-6xl md:text-8xl transition-all active:scale-125 active:rotate-180 ${
              shape.matched ? 'opacity-30' : 'hover:scale-110'
            }`}
          >
            {shape.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
