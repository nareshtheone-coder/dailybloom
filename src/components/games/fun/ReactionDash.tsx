import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getReactionDashStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

type Light = 'red' | 'green'

interface ReactionDashProps {
  onBack: () => void
}

export default function ReactionDash({ onBack }: ReactionDashProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('reaction-dash')
  const config = getReactionDashStage(stageIndex)

  const [light, setLight] = useState<Light>('red')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [message, setMessage] = useState('Wait for green...')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setLight('red')
    setScore(0)
    setRound(0)
    setMessage('Wait for green...')
    setDone(false)
  }, [stageIndex])

  useEffect(() => {
    if (done || stageComplete) return
    setLight('red')
    setMessage('Wait for green...')
    const wait = config.waitMinMs + Math.random() * (config.waitMaxMs - config.waitMinMs)
    const t = setTimeout(() => {
      setLight('green')
      setMessage('TAP NOW!')
    }, wait)
    return () => clearTimeout(t)
  }, [round, done, stageComplete, config.waitMinMs, config.waitMaxMs])

  const tap = () => {
    if (done || stageComplete) return
    if (light === 'green') {
      celebrate('light')
      const nextScore = score + 1
      setScore(nextScore)
      const nextRound = round + 1
      setRound(nextRound)
      if (nextRound >= config.rounds) {
        setDone(true)
        if (nextScore >= config.minHits) {
          celebrate('full')
          finishStage()
        } else {
          setMessage(`Need ${config.minHits} hits — try again!`)
        }
      }
    } else {
      setMessage('Too soon! Wait...')
      setLight('red')
      setTimeout(() => setRound((r) => r + 1), 600)
    }
  }

  return (
    <FunGameShell
      title="Reaction Dash"
      emoji="🚦"
      score={score}
      subtitle={`${score}/${config.minHits} hits · Round ${Math.min(round + 1, config.rounds)}/${config.rounds}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setLight('red')
        setScore(0)
        setRound(0)
        setDone(false)
        setMessage('Wait for green...')
      }}
      onBack={onBack}
      gradient="from-gray-700 to-gray-900"
    >
      <button
        onClick={tap}
        disabled={stageComplete}
        className={`w-40 h-40 md:w-52 md:h-52 rounded-full ${light === 'green' ? 'bg-green-500' : 'bg-red-500'} shadow-2xl border-8 border-white/30 transition-colors`}
      />
      <p className="text-white text-xl font-bold mt-8">{message}</p>
    </FunGameShell>
  )
}
