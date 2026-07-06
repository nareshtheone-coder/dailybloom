import { useState, useMemo } from 'react'
import { celebrate } from '../../utils/celebrations'
import { NUMBER_DATA } from '../../data/gamesLibrary'

interface CountToTenProps {
  onBack: () => void
}

export default function CountToTen({ onBack }: CountToTenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [completed, setCompleted] = useState(false)

  const current = NUMBER_DATA[currentIndex]
  const options = useMemo(() => generateOptions(current.number), [currentIndex])

  function generateOptions(correctNumber: number): number[] {
    const opts = new Set<number>([correctNumber])
    while (opts.size < 4) {
      const random = Math.floor(Math.random() * 10) + 1
      opts.add(random)
    }
    return Array.from(opts).sort(() => Math.random() - 0.5)
  }

  const handleSelect = (num: number) => {
    if (selected) return
    setSelected(true)

    if (num === current.number) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (currentIndex < NUMBER_DATA.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1)
          setSelected(false)
        }, 1200)
      } else {
        celebrate('full')
        setCompleted(true)
      }
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-300 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🔟 Count to 10
        </h1>
        <p className="text-white text-lg drop-shadow">
          {completed
            ? 'You counted them all!'
            : `Number ${currentIndex + 1}/${NUMBER_DATA.length} · Score: ${score}`}
        </p>
      </div>

      {/* Objects to count */}
      <div className="mb-6">
        <p className="text-white text-lg drop-shadow mb-4 text-center">How many do you see?</p>
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-2xl bg-white/20 rounded-3xl px-6 py-6 shadow-xl">
          {Array.from({ length: current.count }).map((_, i) => (
            <div
              key={i}
              className="text-5xl md:text-6xl animate-bounce"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              ⭐
            </div>
          ))}
        </div>
        <p className="text-white/80 text-sm text-center mt-2 drop-shadow">
          {current.word}
        </p>
      </div>

      {/* Number buttons */}
      {!completed && (
        <div className="mb-8">
          <p className="text-white text-lg drop-shadow mb-4 text-center animate-bounce">
            👉 Tap the right number!
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md">
            {options.map((num, i) => (
              <button
                key={i}
                onClick={() => handleSelect(num)}
                disabled={selected}
                className={`min-w-[80px] min-h-[80px] w-28 h-28 md:w-32 md:h-32 rounded-3xl font-bold text-4xl md:text-5xl transition-all shadow-xl ${
                  selected
                    ? num === current.number
                      ? 'bg-green-400 text-white scale-110'
                      : 'bg-red-300/80 text-white'
                    : 'bg-white/90 text-teal-700 hover:scale-105 hover:bg-white active:scale-95'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="flex gap-1 mb-8 flex-wrap justify-center max-w-lg">
        {NUMBER_DATA.map((n, i) => (
          <div
            key={i}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all ${
              i < currentIndex
                ? 'bg-white text-teal-600 shadow-lg scale-110'
                : i === currentIndex
                  ? 'bg-white/70 text-teal-700 ring-2 ring-white'
                  : 'bg-white/30 text-white/70'
            }`}
          >
            {n.number}
          </div>
        ))}
      </div>

      {completed && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-white text-2xl font-bold drop-shadow">Counting Champion!</p>
          <p className="text-white drop-shadow text-lg mt-2">Score: {score}</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-teal-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
