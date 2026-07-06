import { useState } from 'react'
import './App.css'
import AgeSelector from './components/AgeSelector'
import GameMenu from './components/GameMenu'
import TapGame from './components/games/TapGame'
import ColorMatch from './components/games/ColorMatch'
import ShapeSort from './components/games/ShapeSort'
import SoundExplorer from './components/games/SoundExplorer'
import AlphabetSounds from './components/games/AlphabetSounds'
import AlphabetObjects from './components/games/AlphabetObjects'
import NumberRecognition from './components/games/NumberRecognition'
import CountingGame from './components/games/CountingGame'
import SimpleWords from './components/games/SimpleWords'
// NEW GAME IMPORTS
import LetterPainter from './components/games/LetterPainter'
import LetterPop from './components/games/LetterPop'
import ShapeMatcher from './components/games/ShapeMatcher'
import ColorMemory from './components/games/ColorMemory'
import EmojiPairs from './components/games/EmojiPairs'
import LetterRace from './components/games/LetterRace'
import CatchTheLetters from './components/games/CatchTheLetters'
import WordPuzzle from './components/games/WordPuzzle'
import NumberRace from './components/games/NumberRace'
import CatchTheBubbles from './components/games/CatchTheBubbles'

type GameType = 
  | 'menu' | 'ageSelector' 
  // Original games
  | 'tap' | 'colorMatch' | 'shapeSort' | 'soundExplorer' 
  | 'alphabetSounds' | 'alphabetObjects' | 'numberRecognition' | 'countingGame' | 'simpleWords'
  // NEW games
  | 'letterPainter' | 'letterPop' | 'aisForPuzzle'
  | 'shapeMatcher' | 'colorMemory' | 'emojiPairs'
  | 'letterRace' | 'catchTheLetters' | 'wordPuzzle'
  | 'numberRace' | 'storyPuzzle' | 'sightWordRace' | 'patternRush'
  | 'catchTheBubbles'

type AgeGroup = '2-3' | '3-4' | '4-5' | '5-6'

function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('ageSelector')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('2-3')

  const handleSelectAge = (age: AgeGroup) => {
    setAgeGroup(age)
    setCurrentGame('menu')
  }

  const handleSelectGame = (gameId: string) => {
    setCurrentGame(gameId as GameType)
  }

  const handleChangeAge = () => {
    setCurrentGame('ageSelector')
  }

  const renderGame = () => {
    switch (currentGame) {
      case 'ageSelector':
        return <AgeSelector onSelectAge={handleSelectAge} />
      case 'menu':
        return <GameMenu onSelectGame={handleSelectGame} onChangeAge={handleChangeAge} ageGroup={ageGroup} />
      
      // Original games
      case 'tap':
        return <TapGame onBack={() => setCurrentGame('menu')} />
      case 'colorMatch':
        return <ColorMatch onBack={() => setCurrentGame('menu')} />
      case 'shapeSort':
        return <ShapeSort onBack={() => setCurrentGame('menu')} />
      case 'soundExplorer':
        return <SoundExplorer onBack={() => setCurrentGame('menu')} />
      case 'alphabetSounds':
        return <AlphabetSounds onBack={() => setCurrentGame('menu')} ageGroup={ageGroup as '4-5' | '5-6'} />
      case 'alphabetObjects':
        return <AlphabetObjects onBack={() => setCurrentGame('menu')} />
      case 'numberRecognition':
        return <NumberRecognition onBack={() => setCurrentGame('menu')} maxNumber={ageGroup === '3-4' ? 5 : 10} />
      case 'countingGame':
        return <CountingGame onBack={() => setCurrentGame('menu')} maxCount={ageGroup === '3-4' ? 5 : 10} />
      case 'simpleWords':
        return <SimpleWords onBack={() => setCurrentGame('menu')} />
      
      // NEW: Age 2-3 games
      case 'letterPainter':
        return <LetterPainter onBack={() => setCurrentGame('menu')} />
      case 'letterPop':
        return <LetterPop onBack={() => setCurrentGame('menu')} />
      case 'aisForPuzzle':
        return <LetterPainter onBack={() => setCurrentGame('menu')} /> // Placeholder
      
      // NEW: Age 3-4 games (Matching)
      case 'shapeMatcher':
        return <ShapeMatcher onBack={() => setCurrentGame('menu')} />
      case 'colorMemory':
        return <ColorMemory onBack={() => setCurrentGame('menu')} />
      case 'emojiPairs':
        return <EmojiPairs onBack={() => setCurrentGame('menu')} />
      
      // NEW: Age 4-5 games (Racing & Puzzles)
      case 'letterRace':
        return <LetterRace onBack={() => setCurrentGame('menu')} />
      case 'catchTheLetters':
        return <CatchTheLetters onBack={() => setCurrentGame('menu')} />
      case 'wordPuzzle':
        return <WordPuzzle onBack={() => setCurrentGame('menu')} />
      
      // NEW: Age 5-6 games (Advanced)
      case 'numberRace':
        return <NumberRace onBack={() => setCurrentGame('menu')} />
      case 'storyPuzzle':
        return <WordPuzzle onBack={() => setCurrentGame('menu')} /> // Placeholder
      case 'sightWordRace':
        return <CatchTheLetters onBack={() => setCurrentGame('menu')} /> // Placeholder
      case 'patternRush':
        return <LetterRace onBack={() => setCurrentGame('menu')} /> // Placeholder
      
      // NEW: Fun activity games
      case 'catchTheBubbles':
        return <CatchTheBubbles onBack={() => setCurrentGame('menu')} />
      
      default:
        return <AgeSelector onSelectAge={handleSelectAge} />
    }
  }

  return (
    <div className="app">
      {renderGame()}
    </div>
  )
}

export default App
