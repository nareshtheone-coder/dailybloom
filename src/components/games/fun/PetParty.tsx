import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getPetPartyStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

const FOODS = ['🍎', '🥕', '🍪', '🧀']
const PETS = ['🐶', '🐱', '🐰', '🐹']

interface PetPartyProps {
  onBack: () => void
}

export default function PetParty({ onBack }: PetPartyProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('pet-party')
  const config = getPetPartyStage(stageIndex)

  const [petIndex, setPetIndex] = useState(0)
  const [happy, setHappy] = useState(0)
  const [mood, setMood] = useState('😊')

  useEffect(() => {
    setPetIndex(0)
    setHappy(0)
    setMood('😊')
  }, [stageIndex])

  const feed = () => {
    if (stageComplete) return
    const next = happy + 1
    setHappy(next)
    setMood(['😋', '🥳', '😍', '🤗'][happy % 4])
    celebrate('light')
    if (next >= config.feedsNeeded) {
      celebrate('full')
      finishStage()
      return
    }
    setTimeout(() => {
      setMood('😊')
      setPetIndex((p) => (p + 1) % PETS.length)
    }, 500)
  }

  return (
    <FunGameShell
      title="Pet Party"
      emoji="🐾"
      score={happy}
      subtitle={`${happy}/${config.feedsNeeded} snacks`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setPetIndex(0)
        setHappy(0)
        setMood('😊')
      }}
      onBack={onBack}
      gradient="from-teal-300 to-emerald-400"
    >
      <div className="text-9xl mb-4">{mood}</div>
      <div className="text-8xl mb-8">{PETS[petIndex]}</div>
      <div className="flex gap-4 flex-wrap justify-center">
        {FOODS.map((f) => (
          <button key={f} onClick={feed} disabled={stageComplete} className="text-5xl w-20 h-20 bg-white/80 rounded-2xl hover:scale-110">
            {f}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-6">Feed the pet yummy snacks!</p>
    </FunGameShell>
  )
}
