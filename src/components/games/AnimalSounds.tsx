import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'

interface AnimalSoundsProps {
  onBack: () => void
}

const ANIMAL_SOUNDS = [
  { name: 'Lion', emoji: '🦁', frequency: 180, type: 'sawtooth' as const },
  { name: 'Dog', emoji: '🐶', frequency: 420, type: 'square' as const },
  { name: 'Cat', emoji: '🐱', frequency: 650, type: 'sine' as const },
  { name: 'Cow', emoji: '🐄', frequency: 150, type: 'triangle' as const },
  { name: 'Duck', emoji: '🦆', frequency: 500, type: 'sine' as const },
  { name: 'Frog', emoji: '🐸', frequency: 320, type: 'square' as const },
]

export default function AnimalSounds({ onBack }: AnimalSoundsProps) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [options, setOptions] = useState<typeof ANIMAL_SOUNDS>([])

  const currentAnimal = ANIMAL_SOUNDS[roundIndex]

  useEffect(() => {
    setOptions(generateOptions(roundIndex))
    const animal = ANIMAL_SOUNDS[roundIndex]
    playAnimalSound(animal)
  }, [roundIndex])

  function generateOptions(correctIndex: number) {
    const correct = ANIMAL_SOUNDS[correctIndex]
    const others = ANIMAL_SOUNDS.filter((_, i) => i !== correctIndex)
    const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3)
    return [correct, ...distractors].sort(() => Math.random() - 0.5)
  }

  function playAnimalSound(animal: (typeof ANIMAL_SOUNDS)[0]) {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = context.currentTime

    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.connect(gain)
    gain.connect(context.destination)
    osc.type = animal.type
    osc.frequency.setValueAtTime(animal.frequency, now)
    osc.frequency.exponentialRampToValueAtTime(animal.frequency * 0.7, now + 0.4)
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
    osc.start(now)
    osc.stop(now + 0.5)
  }

  const handleReplay = () => {
    playAnimalSound(currentAnimal)
  }

  const handleSelect = (animal: (typeof ANIMAL_SOUNDS)[0]) => {
    if (selected) return
    setSelected(true)

    if (animal.emoji === currentAnimal.emoji) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (roundIndex < ANIMAL_SOUNDS.length - 1) {
        setTimeout(() => {
          setRoundIndex((prev) => prev + 1)
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
    <div className="w-full h-screen bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🦁 Animal Sounds
        </h1>
        <p className="text-white text-lg drop-shadow">
          {completed
            ? 'All animals found!'
            : `Round ${roundIndex + 1}/${ANIMAL_SOUNDS.length} · Score: ${score}`}
        </p>
      </div>

      {/* Sound prompt */}
      {!completed && (
        <div className="mb-8 text-center">
          <p className="text-white text-lg drop-shadow mb-4">Listen to the sound!</p>
          <button
            onClick={handleReplay}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/90 hover:bg-white flex flex-col items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-6xl md:text-7xl">🔊</span>
            <span className="text-lg font-bold text-amber-600 mt-2">Play Again</span>
          </button>
          <p className="text-white text-base drop-shadow mt-4 animate-bounce">
            👉 Which animal made that sound?
          </p>
        </div>
      )}

      {/* Animal options */}
      {!completed && (
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 max-w-lg">
          {options.map((animal) => (
            <button
              key={animal.emoji}
              onClick={() => handleSelect(animal)}
              disabled={selected}
              className={`w-36 h-36 md:w-40 md:h-40 rounded-3xl flex flex-col items-center justify-center transition-all shadow-xl ${
                selected
                  ? animal.emoji === currentAnimal.emoji
                    ? 'bg-green-400 scale-110'
                    : 'bg-red-300/80'
                  : 'bg-white/90 hover:scale-105 hover:bg-white active:scale-95'
              }`}
            >
              <span className="text-6xl md:text-7xl">{animal.emoji}</span>
              <span className="text-sm md:text-base font-bold text-gray-700 mt-1">
                {animal.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Progress */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-md">
        {ANIMAL_SOUNDS.map((animal, i) => (
          <div
            key={i}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              i < roundIndex
                ? 'bg-white shadow-lg scale-110'
                : i === roundIndex
                  ? 'bg-white/70 ring-2 ring-white'
                  : 'bg-white/30'
            }`}
          >
            {animal.emoji}
          </div>
        ))}
      </div>

      {completed && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-white text-2xl font-bold drop-shadow">Animal Expert!</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-amber-700 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
