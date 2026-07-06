import { useState, useEffect } from 'react'
import { NUMBER_DATA } from '../../data/gamesLibrary'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface NumberRecognitionProps {
  onBack: () => void
  maxNumber?: number
}

export default function NumberRecognition({ onBack, maxNumber = 5 }: NumberRecognitionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  const numbers = NUMBER_DATA.slice(0, maxNumber)
  const current = numbers[currentIndex]
  const options = generateOptions(current.number, numbers.length)

  function generateOptions(correctNumber: number, maxNum: number): number[] {
    const options = [correctNumber]
    while (options.length < 3) {
      const random = Math.floor(Math.random() * maxNum) + 1
      if (!options.includes(random)) {
        options.push(random)
      }
    }
    return options.sort(() => Math.random() - 0.5)
  }

  const handleSelect = (num: number) => {
    setSelected(true)
    if (num === current.number) {
      celebrate('medium')
      setScore(s => s + 1)
      setTimeout(() => {
        if (currentIndex < numbers.length - 1) {
          setCurrentIndex(currentIndex + 1)
          setSelected(false)
        } else {
          celebrate('full')
        }
      }, 1500)
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-300 via-yellow-300 to-amber-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">Number Parade</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        {/* Count Display */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-2xl">
          {Array.from({ length: current.count }).map((_, i) => (
            <div
              key={i}
              className="text-5xl md:text-7xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {current.emoji}
            </div>
          ))}
        </div>

        {/* Question */}
        <div className="bg-white/90 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-bold text-gray-800">
          How many?
        </div>

        {/* Number Options */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
          {options.map((num, idx) => (
            <button
              key={idx}
              onClick={() => !selected && handleSelect(num)}
              disabled={selected}
              className={`p-6 md:p-8 rounded-2xl md:rounded-3xl font-bold text-3xl md:text-5xl transition-all active:scale-95 ${
                selected
                  ? num === current.number
                    ? 'bg-green-400'
                    : 'bg-red-400'
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="text-white text-lg md:text-xl font-bold">
          {currentIndex + 1} / {numbers.length}
        </div>
      </div>
    </div>
  )
}
