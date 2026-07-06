import { useState, useEffect } from 'react'
import { ALPHABET_DATA } from '../../data/gamesLibrary'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface AlphabetSoundsProps {
  onBack: () => void
  ageGroup?: '4-5' | '5-6'
}

export default function AlphabetSounds({ onBack, ageGroup = '4-5' }: AlphabetSoundsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  const endIndex = ageGroup === '4-5' ? 13 : 26 // M for 4-5, Z for 5-6
  const alphabets = ALPHABET_DATA.slice(0, endIndex)
  const current = alphabets[currentIndex]

  const speakLetter = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = audioContext.currentTime
    
    // Speak letter sound
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    
    // Map letters to frequencies
    const frequencies: Record<string, number> = {
      'A': 440, 'B': 494, 'C': 523, 'D': 587, 'E': 659, 'F': 698, 'G': 784,
      'H': 880, 'I': 988, 'J': 1047, 'K': 1175, 'L': 1319, 'M': 1397,
      'N': 1568, 'O': 1760, 'P': 1976, 'Q': 2093, 'R': 2349, 'S': 2637,
      'T': 2960, 'U': 3136, 'V': 3520, 'W': 3951, 'X': 4186, 'Y': 4699, 'Z': 5274,
    }

    osc.frequency.value = frequencies[current.letter] || 440
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
    osc.start(now)
    osc.stop(now + 0.8)
  }

  const handleWordSelect = (word: string) => {
    setSelectedWord(word)
    celebrate('medium')
    setScore(s => s + 1)
    
    setTimeout(() => {
      if (currentIndex < alphabets.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedWord(null)
      } else {
        celebrate('full')
      }
    }, 1500)
  }

  const handleNext = () => {
    if (currentIndex < alphabets.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">ABC Quest</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        {/* Large Letter Display */}
        <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-4">
          {current.letter}
        </div>

        {/* Speak Button */}
        <button
          onClick={speakLetter}
          className="px-8 md:px-12 py-4 md:py-6 bg-white/90 hover:bg-white text-2xl md:text-3xl font-bold rounded-full shadow-lg transition-all active:scale-95"
        >
          🔊 Say Letter
        </button>

        {/* Words Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
          {current.words.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordSelect(word)}
              disabled={selectedWord !== null}
              className={`p-4 md:p-6 rounded-2xl md:rounded-3xl font-bold text-xl md:text-2xl transition-all active:scale-95 ${
                selectedWord === word
                  ? 'bg-green-400 scale-105 shadow-lg'
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              <div className="text-3xl md:text-5xl mb-2">{current.emoji}</div>
              {word}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 md:gap-6 mt-6 md:mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 md:px-8 py-3 md:py-4 bg-white/80 hover:bg-white disabled:opacity-50 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            ← Previous
          </button>
          <div className="px-6 md:px-8 py-3 md:py-4 bg-white/80 rounded-full font-bold text-lg md:text-xl">
            {currentIndex + 1} / {alphabets.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === alphabets.length - 1}
            className="px-6 md:px-8 py-3 md:py-4 bg-white/80 hover:bg-white disabled:opacity-50 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
