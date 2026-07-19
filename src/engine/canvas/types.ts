export interface Point {
  x: number
  y: number
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  shape: 'circle' | 'star' | 'rect'
}

export interface CanvasSize {
  width: number
  height: number
  dpr: number
}
