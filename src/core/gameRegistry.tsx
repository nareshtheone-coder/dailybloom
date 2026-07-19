import { lazy, Suspense } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import type { AgeGroup } from './types'

export interface GameComponentProps {
  onBack: () => void
  onGameComplete?: () => void
  ageGroup?: AgeGroup | '4-5' | '5-6'
  maxNumber?: number
  maxCount?: number
}

type LazyGame = LazyExoticComponent<ComponentType<GameComponentProps>>

type GameEntry = {
  component: LazyGame
  getProps?: (ageGroup: AgeGroup) => Record<string, unknown>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyGame(loader: () => Promise<{ default: ComponentType<any> }>): LazyGame {
  return lazy(loader) as LazyGame
}

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-300">
    <div className="text-4xl animate-bounce">🌸</div>
  </div>
)

export const GAME_REGISTRY: Record<string, GameEntry> = {
  // Age 2-3
  'tap-game': { component: lazyGame(() => import('../components/games/TapGame')) },
  'color-match': { component: lazyGame(() => import('../components/games/ColorMatch')) },
  'shape-sort': { component: lazyGame(() => import('../components/games/ShapeSort')) },
  'sound-explorer': { component: lazyGame(() => import('../components/games/SoundExplorer')) },
  'letter-tracing': { component: lazyGame(() => import('../components/games/LetterTracing')) },
  'letter-painter': { component: lazyGame(() => import('../components/games/LetterPainter')) },
  'letter-pop': { component: lazyGame(() => import('../components/games/LetterPop')) },
  'ais-for-puzzle': { component: lazyGame(() => import('../components/games/AisForPuzzle')) },

  // Age 3-4
  'number-recognition': {
    component: lazyGame(() => import('../components/games/NumberRecognition')),
    getProps: (ageGroup) => ({ maxNumber: ageGroup === '3-4' ? 5 : 10 }),
  },
  'counting-game': {
    component: lazyGame(() => import('../components/games/CountingGame')),
    getProps: (ageGroup) => ({ maxCount: ageGroup === '3-4' ? 5 : 10 }),
  },
  'pattern-match': { component: lazyGame(() => import('../components/games/PatternMatch')) },
  'animal-sounds': { component: lazyGame(() => import('../components/games/AnimalSounds')) },
  'shape-matcher': { component: lazyGame(() => import('../components/games/ShapeMatcher')) },
  'color-memory': { component: lazyGame(() => import('../components/games/ColorMemory')) },
  'emoji-pairs': { component: lazyGame(() => import('../components/games/EmojiPairs')) },

  // Age 4-5
  'alphabet-sounds': {
    component: lazyGame(() => import('../components/games/AlphabetSounds')),
    getProps: (ageGroup) => ({ ageGroup: ageGroup === '5-6' ? '5-6' : '4-5' }),
  },
  'alphabet-objects': { component: lazyGame(() => import('../components/games/AlphabetObjects')) },
  'simple-words': { component: lazyGame(() => import('../components/games/SimpleWords')) },
  'rhyming-words': { component: lazyGame(() => import('../components/games/RhymingWords')) },
  'number-counting-10': { component: lazyGame(() => import('../components/games/CountToTen')) },
  'letter-race': { component: lazyGame(() => import('../components/games/LetterRace')) },
  'catch-the-letters': { component: lazyGame(() => import('../components/games/CatchTheLetters')) },
  'word-puzzle': { component: lazyGame(() => import('../components/games/WordPuzzle')) },

  // Age 5-6
  'full-alphabet': {
    component: lazyGame(() => import('../components/games/AlphabetSounds')),
    getProps: () => ({ ageGroup: '5-6' }),
  },
  'spelling-words': { component: lazyGame(() => import('../components/games/SpellingGame')) },
  'number-sequence': { component: lazyGame(() => import('../components/games/NumberSequence')) },
  'sight-words': { component: lazyGame(() => import('../components/games/SightWords')) },
  'simple-sentences': { component: lazyGame(() => import('../components/games/SentenceBuilder')) },
  'number-race': { component: lazyGame(() => import('../components/games/NumberRace')) },
  'story-puzzle': { component: lazyGame(() => import('../components/games/StoryPuzzle')) },
  'sight-word-race': { component: lazyGame(() => import('../components/games/SightWordRace')) },
  'pattern-rush': { component: lazyGame(() => import('../components/games/PatternRush')) },

  // Fun zone — ages 2-3
  'catch-the-bubbles': { component: lazyGame(() => import('../components/games/CatchTheBubbles')) },
  'peek-a-boo': { component: lazyGame(() => import('../components/games/fun/PeekABoo')) },
  'balloon-float': { component: lazyGame(() => import('../components/games/fun/BalloonFloat')) },
  'silly-faces': { component: lazyGame(() => import('../components/games/fun/SillyFaces')) },

  // Fun zone — ages 3-4
  'whack-a-mole': { component: lazyGame(() => import('../components/games/fun/WhackAMole')) },
  'treasure-hunt': { component: lazyGame(() => import('../components/games/fun/TreasureHunt')) },
  'dance-party': { component: lazyGame(() => import('../components/games/fun/DanceParty')) },
  'star-catcher': { component: lazyGame(() => import('../components/games/fun/StarCatcher')) },

  // Fun zone — ages 4-5
  'confetti-pop': { component: lazyGame(() => import('../components/games/fun/ConfettiPop')) },
  'simon-says': { component: lazyGame(() => import('../components/games/fun/SimonSays')) },
  'rocket-launch': { component: lazyGame(() => import('../components/games/fun/RocketLaunch')) },
  'pet-party': { component: lazyGame(() => import('../components/games/fun/PetParty')) },

  // Fun zone — ages 5-6
  'reaction-dash': { component: lazyGame(() => import('../components/games/fun/ReactionDash')) },
  'brick-breaker': { component: lazyGame(() => import('../components/games/fun/BrickBreaker')) },
  'speed-tap': { component: lazyGame(() => import('../components/games/fun/SpeedTap')) },
  'emoji-maze': { component: lazyGame(() => import('../components/games/fun/EmojiMaze')) },
}

export function renderGame(
  gameId: string,
  ageGroup: AgeGroup,
  onBack: () => void,
  onGameComplete?: () => void,
) {
  const entry = GAME_REGISTRY[gameId]
  if (!entry) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-purple-300 to-pink-300">
        <p className="text-white text-xl font-bold">Game not found</p>
        <button onClick={onBack} className="px-6 py-3 bg-white rounded-full font-bold">
          ← Back
        </button>
      </div>
    )
  }

  const Game = entry.component
  const extraProps = entry.getProps?.(ageGroup) ?? {}

  return (
    <Suspense fallback={<Loading />}>
      <Game onBack={onBack} onGameComplete={onGameComplete} ageGroup={ageGroup} {...extraProps} />
    </Suspense>
  )
}

export function isValidGameId(id: string): boolean {
  return id in GAME_REGISTRY
}
