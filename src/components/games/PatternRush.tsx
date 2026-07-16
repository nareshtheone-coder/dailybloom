import { useState, useEffect, useCallback } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PATTERN_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface PatternRushProps {
  onBack: () => void
}

const TIME_PER_ROUND = 10

const ALL_EMOJIS = ['🔴', '🟢', '🔵', '🟡', '🟣', '⭐', '❤️', '🍎', '🍊', '🐶', '🐱', '🌙']

function getOptions(correct: string, pattern: string[]) {
  const pool = [...new Set([...pattern, ...ALL_EMOJIS])]
  const wrong = pool.filter((e) => e !== correct).sort(() => Math.random() - 0.5).slice(0, 3)
  return [correct, ...wrong].sort(() => Math.random() - 0.5)
}

export default function PatternRush({ onBack }: PatternRushProps) {
  const totalStages = PATTERN_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('pattern-rush', totalStages)

  const stagePatterns = PATTERN_STAGES[stageIndex]
  const totalRounds = stagePatterns.length

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND)
  const [options, setOptions] = useState<string[]>([])
  const [answered, setAnswered] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  const current = stagePatterns[round]
  const correctAnswer = current.pattern[current.missing]

  const setupRound = useCallback(
    (roundNum: number) => {
      const pattern = stagePatterns[roundNum]
      const answer = pattern.pattern[pattern.missing]
      setOptions(getOptions(answer, pattern.pattern))
      setTimeLeft(TIME_PER_ROUND)
      setAnswered(false)
      setTimedOut(false)
    },
    [stagePatterns],
  )

  useEffect(() => {
    setRound(0)
    setScore(0)
    setAnswered(false)
    setTimedOut(false)
    setTimeLeft(TIME_PER_ROUND)
  }, [stageIndex])

  useEffect(() => {
    setupRound(round)
  }, [round, setupRound])

  useEffect(() => {
    if (answered || stageComplete || timedOut) return

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setTimedOut(true)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [round, answered, stageComplete, timedOut])

  useEffect(() => {
    if (!timedOut || answered || stageComplete) return

    const timeout = setTimeout(() => {
      if (round < totalRounds - 1) {
        setRound(round + 1)
      } else {
        finishStage()
      }
    }, 1200)

    return () => clearTimeout(timeout)
  }, [timedOut, answered, stageComplete, round, totalRounds, finishStage])

  const resetRound = () => {
    setRound(0)
    setScore(0)
    setAnswered(false)
    setTimedOut(false)
    setTimeLeft(TIME_PER_ROUND)
  }

  const advanceRound = (correct: boolean) => {
    if (correct) {
      celebrate('light')
      setScore((s) => s + 1)
    }

    setTimeout(() => {
      if (round < totalRounds - 1) {
        setRound(round + 1)
      } else {
        if (correct) celebrate('full')
        finishStage()
      }
    }, correct ? 800 : 1200)
  }

  const handleSelect = (emoji: string) => {
    if (answered || timedOut || stageComplete) return
    setAnswered(true)

    if (emoji === correctAnswer) {
      advanceRound(true)
    } else {
      advanceRound(false)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-300 via-indigo-300 to-violet-400 flex flex-col overflow-hidden">
      <GameStageHeader
        title="⚡ Pattern Rush"
        stageIndex={stageIndex}
        totalStages={totalStages}
        score={score}
        extra={`Round ${round + 1}/${totalRounds}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`px-6 py-2 rounded-full font-bold text-xl ${
              timeLeft <= 3 ? 'bg-red-500 text-white animate-pulse' : 'bg-white/80 text-purple-700'
            }`}
          >
            ⏱️ {timeLeft}s
          </div>
        </div>

        {!stageComplete && (
          <>
            <div className="bg-white/90 px-8 py-6 rounded-3xl text-center">
              <p className="text-gray-600 text-lg mb-4">{current.name} Pattern</p>
              <div className="flex gap-4 justify-center">
                {current.pattern.map((emoji, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl ${
                      idx === current.missing
                        ? 'bg-yellow-200 border-4 border-dashed border-yellow-500'
                        : 'bg-purple-100'
                    }`}
                  >
                    {idx === current.missing ? '?' : emoji}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {options.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(emoji)}
                  disabled={answered || timedOut}
                  className={`p-6 rounded-2xl text-4xl md:text-5xl transition-all active:scale-95 ${
                    answered || timedOut
                      ? emoji === correctAnswer
                        ? 'bg-green-400'
                        : 'bg-white/50 opacity-60'
                      : 'bg-white/80 hover:bg-white shadow-lg'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </>
        )}

        {timedOut && !answered && !stageComplete && (
          <p className="text-white text-xl font-bold animate-pulse">Time's up!</p>
        )}
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
