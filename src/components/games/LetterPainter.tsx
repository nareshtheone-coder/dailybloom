import { useState, useEffect, useMemo } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PAINTABLE_BY_STAGE, LETTER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface LetterPainterProps {
  onBack: () => void
}

export default function LetterPainter({ onBack }: LetterPainterProps) {
  const totalStages = LETTER_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('letter-painter', totalStages)

  const letters = useMemo(() => PAINTABLE_BY_STAGE[stageIndex], [stageIndex])
  const stageMeta = LETTER_STAGES[stageIndex]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [painted, setPainted] = useState<number[]>([])
  const [splashPos, setSplashPos] = useState<{ x: number; y: number } | null>(null)

  const currentLetter = letters[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
    setPainted([])
    setSplashPos(null)
  }, [stageIndex])

  const handleLetterTap = () => {
    setSplashPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 })
    playPaintSound()

    if (!painted.includes(currentIndex)) {
      const newPainted = [...painted, currentIndex]
      setPainted(newPainted)

      if (newPainted.length === letters.length) {
        celebrate('full')
        finishStage()
      } else {
        celebrate('light')
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % letters.length)
        }, 300)
      }
    }
  }

  const playPaintSound = () => {
    const context = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
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

  const handleReplay = () => {
    replayStage()
    setCurrentIndex(0)
    setPainted([])
  }

  const handleNext = () => {
    if (nextStage()) {
      setCurrentIndex(0)
      setPainted([])
    }
  }

  if (!currentLetter) return null

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🎨 Letter Painter"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div
          onClick={handleLetterTap}
          className={`relative w-40 h-40 md:w-56 md:h-56 rounded-3xl flex items-center justify-center cursor-pointer transform transition-all duration-200 hover:scale-110 ${currentLetter.color} shadow-2xl mb-8 flex-col gap-4`}
        >
          <div className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
            {currentLetter.letter}
          </div>
          <div className="text-6xl">{currentLetter.emoji}</div>
          {splashPos && (
            <div
              className="absolute animate-ping text-4xl opacity-75"
              style={{ left: `${splashPos.x}%`, top: `${splashPos.y}%` }}
            >
              💧
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap justify-center max-w-2xl">
          {letters.map((letter, i) => (
            <div
              key={letter.letter}
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

        <p className="text-white text-lg font-bold drop-shadow animate-bounce">👉 Tap to Paint! 👈</p>
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={handleNext}
        onReplay={handleReplay}
        onBack={onBack}
      />
    </div>
  )
}
