import { motion } from 'framer-motion'
import AnimatedScene from '../ui/AnimatedScene'
import PremiumGameCard from '../ui/PremiumGameCard'
import PremiumButton from '../ui/PremiumButton'
import { GAMES_LIBRARY } from '../data/gamesLibrary'

interface GameMenuProps {
  onSelectGame: (game: string) => void
  onChangeAge: () => void
  ageGroup: '2-3' | '3-4' | '4-5' | '5-6'
}

type AgeKey = keyof typeof GAMES_LIBRARY
type GameEntry = (typeof GAMES_LIBRARY)[AgeKey][number]

const ACCENT_MAP: Record<string, string> = {
  'from-pink-400 to-pink-500': '#FF6B9D',
  'from-blue-400 to-blue-500': '#42A5F5',
  'from-purple-400 to-purple-500': '#AB47BC',
  'from-green-400 to-green-500': '#66BB6A',
  'from-orange-400 to-orange-500': '#FFA726',
  'from-yellow-400 to-orange-500': '#FFB74D',
  'from-cyan-400 to-cyan-500': '#26C6DA',
  'from-red-400 to-pink-500': '#EF5350',
  'from-lime-500 to-green-600': '#9CCC65',
  'from-amber-400 to-yellow-500': '#FFCA28',
  'from-violet-500 to-pink-600': '#BA68C8',
  'from-indigo-500 to-purple-600': '#5C6BC0',
  'from-pink-500 to-red-500': '#EC407A',
  'from-cyan-500 to-blue-600': '#29B6F6',
  'from-slate-600 to-indigo-800': '#546E7A',
  'from-teal-400 to-emerald-500': '#26A69A',
  'from-gray-600 to-gray-800': '#78909C',
  'from-slate-500 to-indigo-700': '#607D8B',
  'from-yellow-500 to-orange-500': '#FFB300',
  'from-emerald-500 to-teal-600': '#26A69A',
  'from-sky-400 to-cyan-500': '#4FC3F7',
  'from-indigo-400 to-purple-500': '#7E57C2',
  'from-rose-400 to-orange-400': '#FF8A65',
  'from-fuchsia-400 to-pink-500': '#E040FB',
}

function accentFromColor(color: string): string {
  return ACCENT_MAP[color] ?? '#FF6B9D'
}

function isFunGame(game: GameEntry): boolean {
  return 'gameType' in game && game.gameType === 'fun'
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

  const mascots: Record<string, string> = { '2-3': '🐣', '3-4': '🦊', '4-5': '🦄', '5-6': '🚀' }

  return (
    <AnimatedScene variant="sunset" className="overflow-y-auto">
      <div className="px-4 pt-6 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.span
            className="text-7xl block mb-2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {mascots[ageGroup]}
          </motion.span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            DailyBloom
          </h1>
          <p className="text-white/90 font-semibold mt-1">
            Age {ageGroup} · {learningGames.length} learn · {funGames.length} play
          </p>
          <PremiumButton variant="ghost" size="sm" onClick={onChangeAge} className="mt-4">
            Change Age
          </PremiumButton>
        </motion.div>

        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full">📚 Learn</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {learningGames.map((game, i) => (
              <PremiumGameCard
                key={game.id}
                emoji={game.emoji}
                name={game.name}
                description={game.description}
                accent={accentFromColor(game.color)}
                onClick={() => onSelectGame(game.id)}
                index={i}
              />
            ))}
          </div>
        </section>

        {funGames.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full">🎮 Play</span>
            </h2>
            <p className="text-white/75 text-sm mb-4 font-medium">Arcade fun — no lessons!</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {funGames.map((game, i) => (
                <PremiumGameCard
                  key={game.id}
                  emoji={game.emoji}
                  name={game.name}
                  description={game.description}
                  badge="FUN"
                  accent={accentFromColor(game.color)}
                  onClick={() => onSelectGame(game.id)}
                  index={i + learningGames.length}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </AnimatedScene>
  )
}
