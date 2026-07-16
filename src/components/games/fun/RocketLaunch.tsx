import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface RocketLaunchProps {
  onBack: () => void
}

export default function RocketLaunch({ onBack }: RocketLaunchProps) {
  const [fuel, setFuel] = useState(0)
  const [launched, setLaunched] = useState(false)
  const TARGET = 5

  const addFuel = () => {
    if (launched) return
    const next = fuel + 1
    setFuel(next)
    celebrate('light')
    if (next >= TARGET) {
      setLaunched(true)
      celebrate('full')
    }
  }

  return (
    <FunGameShell title="Rocket Launch" emoji="🚀" subtitle={`Fuel ${fuel}/${TARGET}`} onBack={onBack} gradient="from-slate-700 via-indigo-800 to-purple-900">
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
