import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getRocketLaunchStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface RocketLaunchProps {
  onBack: () => void
}

export default function RocketLaunch({ onBack }: RocketLaunchProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('rocket-launch')
  const config = getRocketLaunchStage(stageIndex)

  const [fuel, setFuel] = useState(0)
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    setFuel(0)
    setLaunched(false)
  }, [stageIndex])

  const addFuel = () => {
    if (launched || stageComplete) return
    const next = fuel + 1
    setFuel(next)
    celebrate('light')
    if (next >= config.fuelNeeded) {
      setLaunched(true)
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Rocket Launch"
      emoji="🚀"
      subtitle={`Fuel ${fuel}/${config.fuelNeeded}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setFuel(0)
        setLaunched(false)
      }}
      onBack={onBack}
      gradient="from-slate-700 via-indigo-800 to-purple-900"
    >
      <div className={`text-9xl transition-all duration-1000 ${launched ? '-translate-y-32 scale-75 opacity-80' : ''}`}>
        {launched ? '🌟' : '🚀'}
      </div>
      {!launched ? (
        <button
          onClick={addFuel}
          className="mt-10 px-10 py-5 bg-orange-500 hover:bg-orange-400 text-white text-2xl font-bold rounded-full shadow-lg"
        >
          ⛽ Add Fuel!
        </button>
      ) : (
        <p className="text-white text-2xl font-bold mt-8 animate-bounce">Blast off! 🎉</p>
      )}
    </FunGameShell>
  )
}
