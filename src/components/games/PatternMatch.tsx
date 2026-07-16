import { useState, useMemo, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PATTERN_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface PatternMatchProps {
  onBack: () => void
}

const COLOR_OPTIONS = ['🔴', '🟢', '🟡', '🔵', '🟣', '🟠']

export default function PatternMatch({ onBack }: PatternMatchProps) {
  const totalStages = PATTERN_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('pattern-match', totalStages)

  const stagePatterns = PATTERN_STAGES[stageIndex]
  const [patternIndex, setPatternIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)

  const current = stagePatterns[patternIndex]
  const correctEmoji = current.pattern[current.missing]

  const options = useMemo(
    () => generateOptions(correctEmoji, current.pattern),
    [patternIndex, stageIndex, correctEmoji, current.pattern],
  )

  useEffect(() => {
    setPatternIndex(0)
    setScore(0)
    setSelected(false)
  }, [stageIndex])

  function generateOptions(correct: string, pattern: string[]): string[] {
    const opts = new Set<string>([correct])
    pattern.forEach((p) => opts.add(p))
    while (opts.size < 4) {
      const random = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]
      opts.add(random)
    }
    return Array.from(opts)
      .slice(0, 4)
      .sort(() => Math.random() - 0.5)
  }

  const resetRound = () => {
    setPatternIndex(0)
    setScore(0)
    setSelected(false)
  }

  const handleSelect = (emoji: string) => {
    if (selected || stageComplete) return
    setSelected(true)

    if (emoji === correctEmoji) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (patternIndex < stagePatterns.length - 1) {
        setTimeout(() => {
          setPatternIndex((prev) => prev + 1)
          setSelected(false)
        }, 1000)
      } else {
        celebrate('full')
        finishStage()
      }
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-300 via-orange-300 to-yellow-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🎭 Pattern Play"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={`Stage ${stageIndex + 1}`}
        score={score}
        extra={`Pattern ${patternIndex + 1}/${stagePatterns.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Pattern display */}
        <div className="mb-8 text-center">
          <p className="text-white text-lg drop-shadow mb-4">What comes next?</p>
          <div className="flex gap-4 md:gap-6 justify-center items-center bg-white/30 rounded-3xl px-8 py-6 shadow-xl">
            {current.pattern.map((emoji, i) => (
              <div
                key={i}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-5xl md:text-6xl ${
                  i === current.missing
                    ? 'bg-white/50 border-4 border-dashed border-white animate-pulse'
                    : 'bg-white/80'
                }`}
              >
                {i === current.missing ? '❓' : emoji}
              </div>
            ))}
          </div>
          <p className="text-white/90 text-sm mt-3 drop-shadow">{current.name} pattern</p>
        </div>

        {/* Answer options */}
        {!stageComplete && (
          <div className="mb-8">
            <p className="text-white text-lg drop-shadow mb-4 text-center animate-bounce">
              👉 Pick the missing one!
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md">
              {options.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(emoji)}
                  disabled={selected}
                  className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-5xl md:text-6xl transition-all shadow-xl ${
                    selected
                      ? emoji === correctEmoji
                        ? 'bg-green-400 scale-110'
                        : 'bg-red-300/80'
                      : 'bg-white/90 hover:scale-105 hover:bg-white active:scale-95'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pattern progress within stage */}
        <div className="flex gap-2">
          {stagePatterns.map((_, i) => (
            <div
              key={i}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all ${
                i < patternIndex
                  ? 'bg-white shadow-lg scale-110'
                  : i === patternIndex
                    ? 'bg-white/70 ring-2 ring-white'
                    : 'bg-white/30'
              }`}
            />
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
