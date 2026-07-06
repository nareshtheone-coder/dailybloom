import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PAINTABLE_LETTERS } from '../../data/gamesLibrary'

interface LetterPainterProps {
  onBack: () => void
}

export default function LetterPainter({ onBack }: LetterPainterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [painted, setPainted] = useState<number[]>([])
  const [splashPos, setSplashPos] = useState<{ x: number; y: number } | null>(null)

  const currentLetter = PAINTABLE_LETTERS[currentIndex]

  const handleLetterTap = () => {
    // Add paint splash animation
    setSplashPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 })

    if (!painted.includes(currentIndex)) {
      const newPainted = [...painted, currentIndex]
      setPainted(newPainted)

      // Play paint sound
      playPaintSound()

      if (newPainted.length === PAINTABLE_LETTERS.length) {
        celebrate('full')
        setTimeout(() => {
          setCurrentIndex(0)
          setPainted([])
        }, 2000)
      } else {
        celebrate('light')
        // Move to next letter after a short delay
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % PAINTABLE_LETTERS.length)
        }, 300)
      }
    }
  }

  const playPaintSound = () => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = context.createOscillator()
    const gain = context.createGain()

    osc.connect(gain)
    gain.connect(context.destination)

    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.3, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)

    osc.start(context.currentTime)
    osc.stop(context.currentTime + 0.1)
  }

  useEffect(() => {
    setSplashPos(null)
  }, [painted])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-200 to-purple-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🎨 Letter Painter
        </h1>
        <p className="text-white text-sm md:text-base drop-shadow">Paint all the letters!</p>
      </div>

      {/* Letter Display */}
      <div
        onClick={handleLetterTap}
        className={`relative w-40 h-40 md:w-56 md:h-56 rounded-3xl flex items-center justify-center cursor-pointer transform transition-all duration-200 hover:scale-110 ${
          currentLetter.color
        } shadow-2xl mb-12 flex-col gap-4`}
      >
        <div className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
          {currentLetter.letter}
        </div>
        <div className="text-6xl">{currentLetter.emoji}</div>

        {/* Paint splash effect */}
        {splashPos && (
          <div
            className="absolute animate-ping text-4xl opacity-75"
            style={{ left: `${splashPos.x}%`, top: `${splashPos.y}%` }}
          >
            💧
          </div>
        )}
      </div>

      {/* Progress indicators */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-2xl">
        {PAINTABLE_LETTERS.map((letter, i) => (
          <div
            key={i}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
              painted.includes(i)
                ? `${letter.color} text-white shadow-lg scale-110`
                : 'bg-white/50 text-gray-400'
            }`}
          >
            {letter.letter}
          </div>
        ))}
      </div>

      {/* Tap instruction */}
      <div className="text-white text-lg md:text-2xl font-bold drop-shadow animate-bounce mb-8">
        👉 Tap to Paint! 👈
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-purple-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
