import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

type Light = 'red' | 'yellow' | 'green' | 'go'

interface ReactionDashProps {
  onBack: () => void
}

export default function ReactionDash({ onBack }: ReactionDashProps) {
  const [light, setLight] = useState<Light>('red')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [message, setMessage] = useState('Wait for green...')

  useEffect(() => {
    if (round >= 10) return
    setLight('red')
    setMessage('Wait for green...')
    const wait = 1000 + Math.random() * 2000
    const t = setTimeout(() => {
      setLight('green')
      setMessage('TAP NOW!')
    }, wait)
    return () => clearTimeout(t)
  }, [round])

  const tap = () => {
    if (round >= 10) return
    if (light === 'green') {
      celebrate('light')
      setScore((s) => s + 1)
      setRound((r) => r + 1)
    } else {
      setMessage('Too soon! Wait...')
      setLight('red')
      setTimeout(() => setRound((r) => r + 1), 800)
    }
  }

  const colors = { red: 'bg-red-500', yellow: 'bg-yellow-400', green: 'bg-green-500', go: 'bg-green-500' }

  return (
    <FunGameShell title="Reaction Dash" emoji="🚦" score={score} subtitle={`Round ${Math.min(round + 1, 10)}/10`} onBack={onBack} gradient="from-gray-700 to-gray-900">
      <button
        onClick={tap}
        className={`w-40 h-40 md:w-52 md:h-52 rounded-full ${colors[light]} shadow-2xl border-8 border-white/30 transition-colors`}
      />
      <p className="text-white text-xl font-bold mt-8">{message}</p>
      {round >= 10 && <p className="text-yellow-300 text-2xl font-bold mt-4">Done! Score: {score}/10 🏆</p>}
    </FunGameShell>
  )
}
