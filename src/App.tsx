import { useEffect, useState } from 'react'
import './App.css'
import AgeSelector from './components/AgeSelector'
import GameMenu from './components/GameMenu'
import PwaInstallPrompt from './components/PwaInstallPrompt'
import OfflineIndicator from './components/OfflineIndicator'
import { AdBanner, AdInterstitial, useAdManager } from './ads'
import { renderGame, isValidGameId } from './core/gameRegistry'
import type { AgeGroup } from './core/types'

type Screen = 'ageSelector' | 'menu' | string

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ageSelector')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('2-3')

  const {
    setPlacement,
    shouldShowBanner,
    dismissBanner,
    trackGameCompleted,
    isInterstitialOpen,
    closeInterstitial,
  } = useAdManager()

  useEffect(() => {
    if (currentScreen === 'menu') {
      setPlacement('menu')
    } else if (currentScreen === 'ageSelector') {
      setPlacement('other')
    } else {
      setPlacement('game')
    }
  }, [currentScreen, setPlacement])

  const goToMenu = () => setCurrentScreen('menu')

  const handleSelectAge = (age: AgeGroup) => {
    setAgeGroup(age)
    setCurrentScreen('menu')
  }

  const handleSelectGame = (gameId: string) => {
    if (isValidGameId(gameId)) {
      setCurrentScreen(gameId)
    }
  }

  const handleGameComplete = () => {
    trackGameCompleted()
  }

  const handleBackFromGame = () => {
    handleGameComplete()
    goToMenu()
  }

  const renderScreen = () => {
    if (currentScreen === 'ageSelector') {
      return <AgeSelector onSelectAge={handleSelectAge} />
    }

    if (currentScreen === 'menu') {
      return (
        <GameMenu
          onSelectGame={handleSelectGame}
          onChangeAge={() => setCurrentScreen('ageSelector')}
          ageGroup={ageGroup}
        />
      )
    }

    if (isValidGameId(currentScreen)) {
      return renderGame(currentScreen, ageGroup, handleBackFromGame, handleGameComplete)
    }

    return <AgeSelector onSelectAge={handleSelectAge} />
  }

  return (
    <div className="app relative w-full h-full">
      <OfflineIndicator />
      {renderScreen()}
      {currentScreen === 'menu' && shouldShowBanner && (
        <AdBanner onDismiss={dismissBanner} />
      )}
      <AdInterstitial isOpen={isInterstitialOpen} onClose={closeInterstitial} />
      <PwaInstallPrompt />
    </div>
  )
}

export default App
