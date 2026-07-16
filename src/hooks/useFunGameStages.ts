import { useStagedGame } from './useStagedGame'
import { FUN_STAGE_COUNT } from '../data/funGameStages'

export function useFunGameStages(gameId: string) {
  return useStagedGame(gameId, FUN_STAGE_COUNT)
}
