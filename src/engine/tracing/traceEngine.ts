import type { TracePoint } from '../../data/letterTracePaths'
import { densifyStroke } from '../../data/letterTracePaths'

export interface TraceState {
  strokeIndex: number
  progress: number // 0–1 along current stroke
  completedStrokes: number[]
  trail: TracePoint[]
  done: boolean
}

export function createTraceState(): TraceState {
  return {
    strokeIndex: 0,
    progress: 0,
    completedStrokes: [],
    trail: [],
    done: false,
  }
}

function dist(a: TracePoint, b: TracePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/** Map canvas coords to normalized 0–100 letter space */
export function toNorm(px: number, py: number, cx: number, cy: number, size: number): TracePoint {
  return {
    x: ((px - cx) / size) * 100 + 50,
    y: ((py - cy) / size) * 100 + 50,
  }
}

/** Map normalized point to canvas */
export function toCanvas(p: TracePoint, cx: number, cy: number, size: number): TracePoint {
  return {
    x: cx + ((p.x - 50) / 100) * size,
    y: cy + ((p.y - 50) / 100) * size,
  }
}

export function processTraceInput(
  state: TraceState,
  strokes: TracePoint[][],
  normPoint: TracePoint,
  tolerance: number,
): TraceState {
  if (state.done || state.strokeIndex >= strokes.length) return state

  const dense = densifyStroke(strokes[state.strokeIndex], 1.5)
  const total = dense.length - 1
  if (total <= 0) return state

  const minIdx = Math.floor(state.progress * total)
  const searchEnd = Math.min(total, minIdx + Math.ceil(total * 0.25) + 8)

  let bestIdx = -1
  let bestDist = tolerance

  for (let i = minIdx; i <= searchEnd; i++) {
    const d = dist(normPoint, dense[i])
    if (d < bestDist) {
      bestDist = d
      bestIdx = i
    }
  }

  const next = { ...state, trail: [...state.trail.slice(-40), normPoint] }

  if (bestIdx < 0) return next

  const newProgress = bestIdx / total
  if (newProgress > state.progress) {
    next.progress = newProgress
  }

  if (next.progress >= 0.92) {
    next.completedStrokes = [...state.completedStrokes, state.strokeIndex]
    next.strokeIndex = state.strokeIndex + 1
    next.progress = 0
    next.trail = []

    if (next.strokeIndex >= strokes.length) {
      next.done = true
    }
  }

  return next
}

export function getStartPoint(strokes: TracePoint[][], strokeIndex: number): TracePoint | null {
  const stroke = strokes[strokeIndex]
  return stroke?.[0] ?? null
}
