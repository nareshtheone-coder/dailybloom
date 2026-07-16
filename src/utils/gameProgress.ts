const STORAGE_KEY = 'dailybloom-progress'

type ProgressStore = Record<string, { unlockedStage: number; bestStage: number; plays: number }>

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressStore) : {}
  } catch {
    return {}
  }
}

function writeStore(store: ProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // ignore quota errors
  }
}

export function getGameProgress(gameId: string) {
  const store = readStore()
  return store[gameId] ?? { unlockedStage: 0, bestStage: 0, plays: 0 }
}

export function getUnlockedStage(gameId: string): number {
  return getGameProgress(gameId).unlockedStage
}

/** Call when a stage is fully completed — unlocks the next stage. */
export function completeStage(gameId: string, stageIndex: number, totalStages: number) {
  const store = readStore()
  const prev = store[gameId] ?? { unlockedStage: 0, bestStage: 0, plays: 0 }
  const nextUnlocked = Math.min(stageIndex + 1, totalStages - 1)
  store[gameId] = {
    unlockedStage: Math.max(prev.unlockedStage, nextUnlocked),
    bestStage: Math.max(prev.bestStage, stageIndex),
    plays: prev.plays + 1,
  }
  writeStore(store)
}

export function recordPlay(gameId: string) {
  const store = readStore()
  const prev = store[gameId] ?? { unlockedStage: 0, bestStage: 0, plays: 0 }
  store[gameId] = { ...prev, plays: prev.plays + 1 }
  writeStore(store)
}
