/** 100 fun-game stages — very easy at stage 1, gradually harder through stage 100. */

export const FUN_STAGE_COUNT = 100

const LAST = FUN_STAGE_COUNT - 1

function ratio(stage: number): number {
  const linear = stage / LAST
  // Ease-in: stays very easy for early stages, ramps faster near the end
  return linear * linear
}

function lerp(min: number, max: number, stage: number): number {
  return min + (max - min) * ratio(stage)
}

function lerpInt(min: number, max: number, stage: number): number {
  return Math.round(lerp(min, max, stage))
}

const TIER_LABELS = [
  'Tiny',
  'Little',
  'Easy',
  'Gentle',
  'Cozy',
  'Playful',
  'Bouncy',
  'Zippy',
  'Swift',
  'Super',
]

export function funStageLabel(stage: number, noun: string): string {
  const tier = TIER_LABELS[Math.min(Math.floor(stage / 10), TIER_LABELS.length - 1)]
  return `${tier} ${noun}`
}

// —— Per-game stage configs ——

export function getBubblePopStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Bubbles'),
    target: lerpInt(2, 25, stage),
    spawnMs: lerpInt(900, 220, stage),
    speed: lerp(0.6, 3.2, stage),
    maxOnScreen: lerpInt(4, 22, stage),
    specialRate: lerp(0, 0.35, stage),
  }
}

export function getPeekABooStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Peek'),
    findsNeeded: lerpInt(2, 14, stage),
    hideMs: lerpInt(2500, 700, stage),
  }
}

export function getBalloonPopStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Balloons'),
    target: lerpInt(4, 28, stage),
    spawnMs: lerpInt(1400, 550, stage),
    riseSpeed: lerp(0.5, 2.4, stage),
    maxOnScreen: lerpInt(3, 14, stage),
  }
}

export function getSillyFacesStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Silly'),
    tapsNeeded: lerpInt(4, 35, stage),
  }
}

export function getWhackAMoleStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Moles'),
    durationSec: lerpInt(55, 18, stage),
    popIntervalMs: lerpInt(1500, 380, stage),
    visibleMs: lerpInt(1200, 320, stage),
    holes: lerpInt(3, 6, stage),
    targetScore: lerpInt(1, 22, stage),
  }
}

export function getTreasureHuntStage(stage: number) {
  const choices = lerpInt(2, 6, stage)
  return {
    label: funStageLabel(stage, 'Treasure'),
    findsNeeded: lerpInt(1, 10, stage),
    choices: choices % 2 === 0 ? choices : choices + 1,
  }
}

export function getDancePartyStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Dance'),
    tapsNeeded: lerpInt(3, 28, stage),
    beatMs: lerpInt(1100, 450, stage),
  }
}

export function getStarCatcherStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Stars'),
    target: lerpInt(4, 35, stage),
    spawnMs: lerpInt(850, 280, stage),
    fallSpeed: lerp(0.8, 3.5, stage),
    maxOnScreen: lerpInt(4, 16, stage),
  }
}

export function getConfettiStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Confetti'),
    popsNeeded: lerpInt(3, 45, stage),
  }
}

export function getSimonSaysStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Simon'),
    sequenceLength: lerpInt(2, 11, stage),
    flashMs: lerpInt(700, 220, stage),
  }
}

export function getRocketLaunchStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Rocket'),
    fuelNeeded: lerpInt(2, 14, stage),
  }
}

export function getPetPartyStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Pets'),
    feedsNeeded: lerpInt(2, 18, stage),
  }
}

export function getReactionDashStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Dash'),
    rounds: lerpInt(3, 14, stage),
    waitMinMs: lerpInt(2200, 700, stage),
    waitMaxMs: lerpInt(4500, 1400, stage),
    minHits: lerpInt(2, 12, stage),
  }
}

export function getBrickBreakerStage(stage: number) {
  const rows = lerpInt(1, 3, stage)
  const cols = lerpInt(3, 6, stage)
  return {
    label: funStageLabel(stage, 'Bricks'),
    rows,
    cols,
    count: rows * cols,
    ballSpeed: lerp(0.45, 1.35, stage),
  }
}

export function getSpeedTapStage(stage: number) {
  return {
    label: funStageLabel(stage, 'Tap'),
    durationSec: lerpInt(35, 12, stage),
    target: lerpInt(4, 38, stage),
    buttonSize: lerpInt(88, 44, stage),
  }
}

const MAZE_GOALS = ['🏆', '💎', '🌈', '🎁', '🌟', '🍭', '🦄', '🐰']
const DIRS = ['⬅️', '➡️', '⬆️', '⬇️'] as const
type Dir = (typeof DIRS)[number]

function mazeSeed(stage: number): number {
  return (stage * 7919 + 104729) % 2147483647
}

function pickDir(rng: () => number, x: number, y: number): Dir {
  const options: Dir[] = []
  if (x > 0) options.push('⬅️')
  if (x < 4) options.push('➡️')
  if (y > 0) options.push('⬆️')
  if (y < 4) options.push('⬇️')
  return options[Math.floor(rng() * options.length)] ?? '➡️'
}

export function getEmojiMazeStage(stage: number) {
  const length = lerpInt(2, 10, stage)
  let seed = mazeSeed(stage)
  const rng = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  let x = 1
  let y = 3
  const steps: Dir[] = []
  for (let i = 0; i < length; i++) {
    const dir = pickDir(rng, x, y)
    steps.push(dir)
    if (dir === '⬅️') x--
    if (dir === '➡️') x++
    if (dir === '⬆️') y--
    if (dir === '⬇️') y++
  }
  return {
    label: funStageLabel(stage, 'Maze'),
    steps,
    goal: MAZE_GOALS[stage % MAZE_GOALS.length],
    start: { x: 1, y: 3 },
    goalPos: { x, y },
  }
}
