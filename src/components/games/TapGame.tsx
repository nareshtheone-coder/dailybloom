import { useState, useEffect } from 'react'

interface TapGameProps {
  onBack: () => void
}

interface TapObject {
  id: number
  x: number
  y: number
  emoji: string
  scale: number
}

const EMOJIS = ['🎈', '🌟', '🎀', '🎉', '🎁', '🌸', '🦋', '🍎', '🍌', '🍊']

export default function TapGame({ onBack }: TapGameProps) {
  const [objects, setObjects] = useState<TapObject[]>([])
  const [score, setScore] = useState(0)
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    // Create initial objects
    const initialObjects: TapObject[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      scale: 1,
    }))
    setObjects(initialObjects)
    setNextId(5)
  }, [])

  useEffect(() => {
    // Animate objects (floating effect)
    const interval = setInterval(() => {
      setObjects(prev =>
        prev.map(obj => ({
          ...obj,
          y: obj.y + (Math.random() - 0.5) * 2,
          x: obj.x + (Math.random() - 0.5) * 1,
        }))
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleTap = (id: number) => {
    // Remove tapped object and create new one
    setObjects(prev => {
      const filtered = prev.filter(obj => obj.id !== id)
      const newObject: TapObject = {
        id: nextId,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        scale: 1,
      }
      return [...filtered, newObject]
    })
    setScore(s => s + 1)
    setNextId(n => n + 1)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-2xl md:text-4xl font-bold text-white">Score: {score}</div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative">
        {objects.map(obj => (
          <button
            key={obj.id}
            onClick={() => handleTap(obj.id)}
            className="absolute text-5xl md:text-7xl transform -translate-x-1/2 -translate-y-1/2 active:scale-110 transition-transform active:rotate-12 cursor-pointer focus:outline-none"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: `translate(-50%, -50%) scale(${obj.scale})`,
            }}
          >
            {obj.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
