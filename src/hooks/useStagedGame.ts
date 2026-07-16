import { useCallback, useState } from 'react'
import { completeStage, getUnlockedStage, recordPlay } from '../utils/gameProgress'

export function useStagedGame(gameId: string, totalStages: number) {
  const [stageIndex, setStageIndex] = useState(() =>
    Math.min(getUnlockedStage(gameId), totalStages - 1),
  )
  const [stageComplete, setStageComplete] = useState(false)
  const [allComplete, setAllComplete] = useState(false)

  const finishStage = useCallback(() => {
    completeStage(gameId, stageIndex, totalStages)
    setStageComplete(true)
    if (stageIndex >= totalStages - 1) {
      setAllComplete(true)
    }
  }, [gameId, stageIndex, totalStages])

  const nextStage = useCallback(() => {
    if (stageIndex < totalStages - 1) {
      setStageIndex(stageIndex + 1)
      setStageComplete(false)
      recordPlay(gameId)
      return true
    }
    return false
  }, [gameId, stageIndex, totalStages])

  const replayStage = useCallback(() => {
    setStageComplete(false)
    recordPlay(gameId)
  }, [gameId])

  const selectStage = useCallback(
    (index: number) => {
      const unlocked = getUnlockedStage(gameId)
      if (index <= unlocked && index < totalStages) {
        setStageIndex(index)
        setStageComplete(false)
        setAllComplete(false)
      }
    },
    [gameId, totalStages],
  )

  return {
    stageIndex,
    stageComplete,
    allComplete,
    finishStage,
    nextStage,
    replayStage,
    selectStage,
    unlockedStage: getUnlockedStage(gameId),
    setStageComplete,
    setAllComplete,
  }
}
