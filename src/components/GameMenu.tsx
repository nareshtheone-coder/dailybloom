import { GAMES_LIBRARY } from '../data/gamesLibrary'

interface GameMenuProps {
  onSelectGame: (game: string) => void
  onChangeAge: () => void
  ageGroup: '2-3' | '3-4' | '4-5' | '5-6'
}

type AgeKey = keyof typeof GAMES_LIBRARY

export default function GameMenu({ onSelectGame, onChangeAge, ageGroup }: GameMenuProps) {
  const ageKeyMap: Record<string, AgeKey> = {
    '2-3': 'age_2_3',
    '3-4': 'age_3_4',
    '4-5': 'age_4_5',
    '5-6': 'age_5_6',
  }

  const games = GAMES_LIBRARY[ageKeyMap[ageGroup]]

  const getEmoji = (ageGroup: string) => {
    const map: Record<string, string> = {
      '2-3': '👶',
      '3-4': '🧒',
      '4-5': '👧',
      '5-6': '👦',
    }
    return map[ageGroup]
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300">
      <div className="text-center mb-8 md:mb-12">
        <div className="text-6xl md:text-7xl mb-2">{getEmoji(ageGroup)}</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">🌸 DailyBloom</h1>
        <p className="text-lg md:text-2xl text-white/90">Age {ageGroup} - {games.length} Games</p>
        <button
          onClick={onChangeAge}
          className="mt-4 px-4 py-2 bg-white/80 hover:bg-white text-sm md:text-base font-semibold rounded-full transition-all active:scale-95"
        >
          Change Age
        </button>
      </div>

      <div className={`grid gap-4 md:gap-6 w-full max-w-4xl ${games.length <= 4 ? 'grid-cols-2' : games.length <= 6 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className={`bg-gradient-to-br ${game.color} hover:from-opacity-80 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 font-bold text-lg md:text-2xl transition-all active:scale-95 shadow-lg h-32 md:h-40 flex flex-col items-center justify-center text-center gap-2 hover:scale-105`}
            title={game.description}
          >
            <div className="text-4xl md:text-5xl">{game.emoji}</div>
            <div className="text-base md:text-lg">{game.name}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-12 text-center text-white/90 text-xs md:text-sm max-w-2xl px-4">
        <p className="font-semibold mb-2">Learning Goals:</p>
        <p className="text-white/80">{games.map(g => g.learningGoal).join(' • ')}</p>
      </div>
    </div>
  )
}
