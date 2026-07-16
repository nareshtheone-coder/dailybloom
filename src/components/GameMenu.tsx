import { GAMES_LIBRARY } from '../data/gamesLibrary'

interface GameMenuProps {
  onSelectGame: (game: string) => void
  onChangeAge: () => void
  ageGroup: '2-3' | '3-4' | '4-5' | '5-6'
}

type AgeKey = keyof typeof GAMES_LIBRARY

type GameEntry = (typeof GAMES_LIBRARY)[AgeKey][number]

function isFunGame(game: GameEntry): boolean {
  return 'gameType' in game && game.gameType === 'fun'
}

function GameCard({ game, onSelect }: { game: GameEntry; onSelect: () => void }) {
  const fun = isFunGame(game)
  return (
    <button
      onClick={onSelect}
      className={`relative bg-gradient-to-br ${game.color} hover:from-opacity-80 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 font-bold text-lg md:text-2xl transition-all active:scale-95 shadow-lg h-32 md:h-40 flex flex-col items-center justify-center text-center gap-2 hover:scale-105`}
      title={game.description}
    >
      {fun && (
        <span className="absolute top-2 right-2 text-xs md:text-sm bg-white/90 text-purple-700 px-2 py-0.5 rounded-full font-bold">
          🎉 Fun
        </span>
      )}
      <div className="text-4xl md:text-5xl">{game.emoji}</div>
      <div className="text-base md:text-lg">{game.name}</div>
    </button>
  )
}

export default function GameMenu({ onSelectGame, onChangeAge, ageGroup }: GameMenuProps) {
  const ageKeyMap: Record<string, AgeKey> = {
    '2-3': 'age_2_3',
    '3-4': 'age_3_4',
    '4-5': 'age_4_5',
    '5-6': 'age_5_6',
  }

  const games = GAMES_LIBRARY[ageKeyMap[ageGroup]]
  const learningGames = games.filter((g) => !isFunGame(g))
  const funGames = games.filter(isFunGame)

  const getEmoji = (ageGroup: string) => {
    const map: Record<string, string> = {
      '2-3': '👶',
      '3-4': '🧒',
      '4-5': '👧',
      '5-6': '👦',
    }
    return map[ageGroup]
  }

  const gridCols =
    games.length <= 4
      ? 'grid-cols-2'
      : games.length <= 6
        ? 'grid-cols-2 md:grid-cols-3'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 pb-20 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 overflow-y-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="text-6xl md:text-7xl mb-2">{getEmoji(ageGroup)}</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">🌸 DailyBloom</h1>
        <p className="text-lg md:text-2xl text-white/90">
          Age {ageGroup} — {learningGames.length} learning + {funGames.length} fun games
        </p>
        <button
          onClick={onChangeAge}
          className="mt-4 px-4 py-2 bg-white/80 hover:bg-white text-sm md:text-base font-semibold rounded-full transition-all active:scale-95"
        >
          Change Age
        </button>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">📚 Learning Games</h2>
          <div className={`grid gap-4 md:gap-6 ${gridCols}`}>
            {learningGames.map((game) => (
              <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game.id)} />
            ))}
          </div>
        </section>

        {funGames.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 text-center">🎉 Fun Zone</h2>
            <p className="text-white/80 text-sm text-center mb-4">Just for play — no lessons here!</p>
            <div className={`grid gap-4 md:gap-6 ${gridCols}`}>
              {funGames.map((game) => (
                <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game.id)} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-8 md:mt-12 text-center text-white/90 text-xs md:text-sm max-w-2xl px-4">
        <p className="font-semibold mb-2">Learning Goals:</p>
        <p className="text-white/80">{learningGames.map((g) => g.learningGoal).join(' • ')}</p>
        <p className="mt-4 text-white/70">
          <a href="/discover.html" className="underline hover:text-white">
            About DailyBloom
          </a>
          {' '}(guide for parents &amp; teachers)
        </p>
      </div>
    </div>
  )
}
