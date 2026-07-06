interface AgeSelectorProps {
  onSelectAge: (age: '2-3' | '3-4' | '4-5' | '5-6') => void
}

export default function AgeSelector({ onSelectAge }: AgeSelectorProps) {
  const ageGroups = [
    { label: '2-3 years', key: '2-3' as const, emoji: '👶', color: 'from-pink-400 to-pink-500' },
    { label: '3-4 years', key: '3-4' as const, emoji: '🧒', color: 'from-blue-400 to-blue-500' },
    { label: '4-5 years', key: '4-5' as const, emoji: '👧', color: 'from-purple-400 to-purple-500' },
    { label: '5-6 years', key: '5-6' as const, emoji: '👦', color: 'from-green-400 to-green-500' },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">🌸 DailyBloom</h1>
        <p className="text-lg md:text-2xl text-white/90">Select Your Age Group</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-xl">
        {ageGroups.map(({ label, key, emoji, color }) => (
          <button
            key={key}
            onClick={() => onSelectAge(key)}
            className={`bg-gradient-to-br ${color} hover:scale-105 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 font-bold text-xl md:text-2xl transition-all active:scale-95 shadow-lg h-32 md:h-40 flex flex-col items-center justify-center text-center gap-2`}
          >
            <div className="text-5xl md:text-6xl">{emoji}</div>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-12 md:mt-16 text-center text-white/80 text-sm md:text-base max-w-md">
        <p>Choose the age group to see age-appropriate games and learning activities!</p>
      </div>
    </div>
  )
}
