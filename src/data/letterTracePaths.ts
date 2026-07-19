/** Normalized 0–100 coords — kid-friendly stroke order for A–Z */

export interface TracePoint {
  x: number
  y: number
}

export interface LetterTraceDef {
  letter: string
  strokes: TracePoint[][]
  emoji: string
  word: string
  hue: number
}

export const LETTER_TRACE_PATHS: Record<string, Omit<LetterTraceDef, 'letter'>> = {
  A: {
    strokes: [
      [
        { x: 22, y: 82 },
        { x: 50, y: 18 },
        { x: 78, y: 82 },
      ],
      [
        { x: 32, y: 58 },
        { x: 68, y: 58 },
      ],
    ],
    emoji: '🍎',
    word: 'Apple',
    hue: 350,
  },
  B: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 28, y: 18 },
        { x: 58, y: 18 },
        { x: 68, y: 28 },
        { x: 68, y: 42 },
        { x: 58, y: 50 },
        { x: 28, y: 50 },
      ],
      [
        { x: 28, y: 50 },
        { x: 62, y: 50 },
        { x: 72, y: 60 },
        { x: 72, y: 74 },
        { x: 60, y: 82 },
        { x: 28, y: 82 },
      ],
    ],
    emoji: '🐻',
    word: 'Bear',
    hue: 25,
  },
  C: {
    strokes: [
      [
        { x: 72, y: 22 },
        { x: 48, y: 18 },
        { x: 28, y: 35 },
        { x: 28, y: 65 },
        { x: 48, y: 82 },
        { x: 72, y: 78 },
      ],
    ],
    emoji: '🐱',
    word: 'Cat',
    hue: 200,
  },
  D: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 28, y: 18 },
        { x: 55, y: 18 },
        { x: 72, y: 35 },
        { x: 72, y: 65 },
        { x: 55, y: 82 },
        { x: 28, y: 82 },
      ],
    ],
    emoji: '🐕',
    word: 'Dog',
    hue: 30,
  },
  E: {
    strokes: [
      [
        { x: 68, y: 18 },
        { x: 28, y: 18 },
        { x: 28, y: 82 },
        { x: 68, y: 82 },
      ],
      [
        { x: 28, y: 50 },
        { x: 58, y: 50 },
      ],
    ],
    emoji: '🥚',
    word: 'Egg',
    hue: 50,
  },
  F: {
    strokes: [
      [
        { x: 68, y: 18 },
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 28, y: 50 },
        { x: 62, y: 50 },
      ],
    ],
    emoji: '🐠',
    word: 'Fish',
    hue: 190,
  },
  G: {
    strokes: [
      [
        { x: 72, y: 25 },
        { x: 50, y: 18 },
        { x: 28, y: 38 },
        { x: 28, y: 62 },
        { x: 50, y: 82 },
        { x: 72, y: 72 },
        { x: 72, y: 52 },
        { x: 52, y: 52 },
      ],
    ],
    emoji: '🎸',
    word: 'Guitar',
    hue: 280,
  },
  H: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 72, y: 18 },
        { x: 72, y: 82 },
      ],
      [
        { x: 28, y: 50 },
        { x: 72, y: 50 },
      ],
    ],
    emoji: '🏠',
    word: 'House',
    hue: 15,
  },
  I: {
    strokes: [
      [
        { x: 35, y: 18 },
        { x: 65, y: 18 },
      ],
      [
        { x: 50, y: 18 },
        { x: 50, y: 82 },
      ],
      [
        { x: 35, y: 82 },
        { x: 65, y: 82 },
      ],
    ],
    emoji: '🍦',
    word: 'Ice cream',
    hue: 320,
  },
  J: {
    strokes: [
      [
        { x: 62, y: 18 },
        { x: 72, y: 18 },
      ],
      [
        { x: 67, y: 18 },
        { x: 67, y: 65 },
        { x: 55, y: 82 },
        { x: 38, y: 75 },
      ],
    ],
    emoji: '🤹',
    word: 'Juggle',
    hue: 260,
  },
  K: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 72, y: 18 },
        { x: 28, y: 50 },
        { x: 72, y: 82 },
      ],
    ],
    emoji: '🪁',
    word: 'Kite',
    hue: 210,
  },
  L: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
        { x: 68, y: 82 },
      ],
    ],
    emoji: '🦁',
    word: 'Lion',
    hue: 35,
  },
  M: {
    strokes: [
      [
        { x: 22, y: 82 },
        { x: 22, y: 18 },
        { x: 50, y: 55 },
        { x: 78, y: 18 },
        { x: 78, y: 82 },
      ],
    ],
    emoji: '🌙',
    word: 'Moon',
    hue: 240,
  },
  N: {
    strokes: [
      [
        { x: 28, y: 82 },
        { x: 28, y: 18 },
        { x: 72, y: 82 },
        { x: 72, y: 18 },
      ],
    ],
    emoji: '👃',
    word: 'Nose',
    hue: 20,
  },
  O: {
    strokes: [
      [
        { x: 50, y: 18 },
        { x: 30, y: 30 },
        { x: 30, y: 70 },
        { x: 50, y: 82 },
        { x: 70, y: 70 },
        { x: 70, y: 30 },
        { x: 50, y: 18 },
      ],
    ],
    emoji: '🐙',
    word: 'Octopus',
    hue: 300,
  },
  P: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 28, y: 18 },
        { x: 58, y: 18 },
        { x: 70, y: 30 },
        { x: 70, y: 42 },
        { x: 58, y: 50 },
        { x: 28, y: 50 },
      ],
    ],
    emoji: '🐷',
    word: 'Pig',
    hue: 330,
  },
  Q: {
    strokes: [
      [
        { x: 50, y: 18 },
        { x: 30, y: 30 },
        { x: 30, y: 70 },
        { x: 50, y: 82 },
        { x: 70, y: 70 },
        { x: 70, y: 30 },
        { x: 50, y: 18 },
      ],
      [
        { x: 58, y: 62 },
        { x: 78, y: 85 },
      ],
    ],
    emoji: '👑',
    word: 'Queen',
    hue: 45,
  },
  R: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 82 },
      ],
      [
        { x: 28, y: 18 },
        { x: 58, y: 18 },
        { x: 70, y: 30 },
        { x: 70, y: 42 },
        { x: 58, y: 50 },
        { x: 28, y: 50 },
      ],
      [
        { x: 55, y: 50 },
        { x: 72, y: 82 },
      ],
    ],
    emoji: '🌈',
    word: 'Rainbow',
    hue: 10,
  },
  S: {
    strokes: [
      [
        { x: 68, y: 25 },
        { x: 45, y: 18 },
        { x: 28, y: 32 },
        { x: 45, y: 48 },
        { x: 68, y: 55 },
        { x: 72, y: 70 },
        { x: 50, y: 82 },
        { x: 28, y: 75 },
      ],
    ],
    emoji: '☀️',
    word: 'Sun',
    hue: 48,
  },
  T: {
    strokes: [
      [
        { x: 22, y: 18 },
        { x: 78, y: 18 },
      ],
      [
        { x: 50, y: 18 },
        { x: 50, y: 82 },
      ],
    ],
    emoji: '🌳',
    word: 'Tree',
    hue: 130,
  },
  U: {
    strokes: [
      [
        { x: 28, y: 18 },
        { x: 28, y: 65 },
        { x: 42, y: 82 },
        { x: 58, y: 82 },
        { x: 72, y: 65 },
        { x: 72, y: 18 },
      ],
    ],
    emoji: '☂️',
    word: 'Umbrella',
    hue: 220,
  },
  V: {
    strokes: [
      [
        { x: 22, y: 18 },
        { x: 50, y: 82 },
        { x: 78, y: 18 },
      ],
    ],
    emoji: '🎻',
    word: 'Violin',
    hue: 170,
  },
  W: {
    strokes: [
      [
        { x: 15, y: 18 },
        { x: 30, y: 82 },
        { x: 50, y: 45 },
        { x: 70, y: 82 },
        { x: 85, y: 18 },
      ],
    ],
    emoji: '🐋',
    word: 'Whale',
    hue: 200,
  },
  X: {
    strokes: [
      [
        { x: 25, y: 18 },
        { x: 75, y: 82 },
      ],
      [
        { x: 75, y: 18 },
        { x: 25, y: 82 },
      ],
    ],
    emoji: '🎄',
    word: 'Xmas tree',
    hue: 140,
  },
  Y: {
    strokes: [
      [
        { x: 25, y: 18 },
        { x: 50, y: 50 },
        { x: 75, y: 18 },
      ],
      [
        { x: 50, y: 50 },
        { x: 50, y: 82 },
      ],
    ],
    emoji: '🪀',
    word: 'Yo-yo',
    hue: 290,
  },
  Z: {
    strokes: [
      [
        { x: 25, y: 18 },
        { x: 75, y: 18 },
        { x: 25, y: 82 },
        { x: 75, y: 82 },
      ],
    ],
    emoji: '🦓',
    word: 'Zebra',
    hue: 0,
  },
}

export function getLetterTraceDef(letter: string): LetterTraceDef {
  const key = letter.toUpperCase()
  const data = LETTER_TRACE_PATHS[key]
  if (!data) {
    return {
      letter: key,
      strokes: [
        [
          { x: 30, y: 20 },
          { x: 30, y: 80 },
        ],
      ],
      emoji: '✨',
      word: key,
      hue: 200,
    }
  }
  return { letter: key, ...data }
}

/** Densify polyline for smooth hit-testing */
export function densifyStroke(points: TracePoint[], spacing = 2): TracePoint[] {
  if (points.length < 2) return points
  const out: TracePoint[] = [points[0]]
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    const steps = Math.max(1, Math.ceil(len / spacing))
    for (let s = 1; s <= steps; s++) {
      const t = s / steps
      out.push({ x: a.x + dx * t, y: a.y + dy * t })
    }
  }
  return out
}
