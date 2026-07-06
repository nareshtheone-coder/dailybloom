import { useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { RACING_NUMBERS_5_6 } from '../../data/gamesLibrary'

interface NumberRaceProps {
  onBack: () => void
}

export default function NumberRace({ onBack }: NumberRaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const targetNumbers = RACING_NUMBERS_5_6
  const totalNumbers = targetNumbers.length
  const progressPercent = ((currentIndex + 1) / totalNumbers) * 100

  const handleNumberTap = () => {
    if (gameComplete || isRunning) return

    setIsRunning(true)

    setTimeout(() => {
      if (currentIndex < totalNumbers - 1) {
        setCurrentIndex(currentIndex + 1)
        celebrate('light')
        setIsRunning(false)
      } else {
        celebrate('full')
        setGameComplete(true)
        setIsRunning(false)
      }
    }, 600)
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-rose-300 via-red-300 to-orange-300 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          🏎️ Number Race
        </h1>
        <p className="text-white text-lg drop-shadow">Race to 20!</p>
      </div>

      {/* Race Track */}
      <div className="w-full max-w-4xl mb-8">
        {/* Progress Bar */}
        <div className="mb-4 px-4">
          <div className="relative w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-lg">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-white text-center font-bold mt-2 drop-shadow">
            {currentIndex + 1} / {totalNumbers}
          </p>
        </div>

        {/* Track Visual */}
        <div className="relative h-32 md:h-40 bg-white/20 rounded-2xl border-4 border-white shadow-lg overflow-hidden mb-6">
          {/* Finish Line */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 z-10">
            <div className="h-full flex flex-col gap-1 p-1">
              <div className="flex-1 bg-black"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-black"></div>
            </div>
          </div>

          {/* Character Position */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 z-20"
            style={{ left: `${(currentIndex / totalNumbers) * 85}%` }}
          >
            <div className="text-5xl md:text-6xl animate-bounce">🚗</div>
          </div>

          {/* Track obstacles */}
          <div className="absolute inset-0 flex items-center px-4 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/30 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Number Display */}
      <div className="mb-8 text-center">
        <p className="text-white text-lg mb-4 drop-shadow font-semibold">Next number:</p>
        <div className="text-9xl md:text-10xl font-bold text-white drop-shadow-xl">
          {targetNumbers[currentIndex]}
        </div>
      </div>

      {/* Available Numbers Grid */}
      <div className="mb-8 max-w-2xl">
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {targetNumbers.map((num, i) => (
            <button
              key={i}
              onClick={() => i === currentIndex && handleNumberTap()}
              disabled={i !== currentIndex || gameComplete}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-bold text-lg md:text-xl transition-all transform ${
                i < currentIndex
                  ? 'bg-green-400 text-white shadow-lg scale-95'
                  : i === currentIndex
                    ? 'bg-yellow-300 text-black hover:scale-110 shadow-xl animate-pulse'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Finish message */}
      {gameComplete && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">You Won!</h2>
          <p className="text-white text-xl mt-2 drop-shadow">Amazing racer! 🎉</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-red-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
