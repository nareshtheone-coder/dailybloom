import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { ANIMAL_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface AnimalSoundsProps {
  onBack: () => void
}

type StageAnimal = (typeof ANIMAL_STAGES)[number][number]

const ANIMAL_AUDIO: Record<string, { frequency: number; type: OscillatorType }> = {
  Dog: { frequency: 420, type: 'square' },
  Cat: { frequency: 650, type: 'sine' },
  Cow: { frequency: 150, type: 'triangle' },
  Duck: { frequency: 500, type: 'sine' },
  Pig: { frequency: 280, type: 'square' },
  Sheep: { frequency: 380, type: 'triangle' },
  Lion: { frequency: 180, type: 'sawtooth' },
  Frog: { frequency: 320, type: 'square' },
  Horse: { frequency: 200, type: 'sawtooth' },
  Bird: { frequency: 720, type: 'sine' },
  Bee: { frequency: 880, type: 'sine' },
  Owl: { frequency: 260, type: 'triangle' },
}

export default function AnimalSounds({ onBack }: AnimalSoundsProps) {
  const totalStages = ANIMAL_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('animal-sounds', totalStages)

  const stageAnimals = ANIMAL_STAGES[stageIndex]
  const [roundIndex, setRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [options, setOptions] = useState<StageAnimal[]>([])

  const currentAnimal = stageAnimals[roundIndex]

  useEffect(() => {
    setRoundIndex(0)
    setScore(0)
    setSelected(false)
  }, [stageIndex])

  useEffect(() => {
    setOptions(generateOptions(roundIndex))
    playAnimalSound(stageAnimals[roundIndex])
  }, [roundIndex, stageIndex])

  function generateOptions(correctIndex: number) {
    const correct = stageAnimals[correctIndex]
    const others = stageAnimals.filter((_, i) => i !== correctIndex)
    const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3)
    return [correct, ...distractors].sort(() => Math.random() - 0.5)
  }

  function playAnimalSound(animal: StageAnimal) {
    const audio = ANIMAL_AUDIO[animal.name] ?? { frequency: 440, type: 'sine' as OscillatorType }
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = context.currentTime

    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.connect(gain)
    gain.connect(context.destination)
    osc.type = audio.type
    osc.frequency.setValueAtTime(audio.frequency, now)
    osc.frequency.exponentialRampToValueAtTime(audio.frequency * 0.7, now + 0.4)
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
    osc.start(now)
    osc.stop(now + 0.5)
  }

  const resetRound = () => {
    setRoundIndex(0)
    setScore(0)
    setSelected(false)
  }

  const handleReplay = () => {
    playAnimalSound(currentAnimal)
  }

  const handleSelect = (animal: StageAnimal) => {
    if (selected || stageComplete) return
    setSelected(true)

    if (animal.emoji === currentAnimal.emoji) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (roundIndex < stageAnimals.length - 1) {
        setTimeout(() => {
          setRoundIndex((prev) => prev + 1)
          setSelected(false)
        }, 1200)
      } else {
        celebrate('full')
        finishStage()
      }
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🦁 Animal Sounds"
        stageIndex={stageIndex}
        totalStages={totalStages}
        score={score}
        extra={`Round ${roundIndex + 1}/${stageAnimals.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Sound prompt */}
        {!stageComplete && (
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
        {!stageComplete && (
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
        <div className="flex gap-2 flex-wrap justify-center max-w-md">
          {stageAnimals.map((animal, i) => (
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
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={() => {
          if (nextStage()) resetRound()
        }}
        onReplay={() => {
          replayStage()
          resetRound()
        }}
        onBack={onBack}
      />
    </div>
  )
}
