import type { TracePoint } from '../../data/letterTracePaths'
import { densifyStroke } from '../../data/letterTracePaths'
import { toCanvas } from './traceEngine'

export function drawTracingScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  letter: string,
  strokes: TracePoint[][],
  state: {
    strokeIndex: number
    progress: number
    completedStrokes: number[]
    trail: TracePoint[]
    done: boolean
  },
  hue: number,
  emoji: string,
  word: string,
) {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, `hsl(${hue}, 70%, 88%)`)
  bg.addColorStop(1, `hsl(${hue + 30}, 65%, 75%)`)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Sparkle dots
  for (let i = 0; i < 12; i++) {
    const sx = ((i * 137 + time * 20) % 1000) / 1000 * w
    const sy = ((i * 89 + time * 15) % 1000) / 1000 * h * 0.35
    ctx.fillStyle = `rgba(255,255,255,${0.15 + (i % 3) * 0.1})`
    ctx.beginPath()
    ctx.arc(sx, sy, 2 + (i % 2), 0, Math.PI * 2)
    ctx.fill()
  }

  const cardSize = Math.min(w, h) * 0.72
  const cx = w / 2
  const cy = h * 0.48

  // Card shadow
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  roundRect(ctx, cx - cardSize / 2 + 6, cy - cardSize / 2 + 10, cardSize, cardSize, 28)
  ctx.fill()

  // Frosted card
  const cardGrad = ctx.createLinearGradient(cx, cy - cardSize / 2, cx, cy + cardSize / 2)
  cardGrad.addColorStop(0, 'rgba(255,255,255,0.95)')
  cardGrad.addColorStop(1, 'rgba(255,255,255,0.82)')
  ctx.fillStyle = cardGrad
  roundRect(ctx, cx - cardSize / 2, cy - cardSize / 2, cardSize, cardSize, 28)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  ctx.lineWidth = 3
  ctx.stroke()

  // Ghost letter watermark
  ctx.save()
  ctx.globalAlpha = 0.08
  ctx.fillStyle = `hsl(${hue}, 60%, 40%)`
  ctx.font = `bold ${cardSize * 0.72}px Fredoka, Nunito, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, cx, cy)
  ctx.restore()

  // Draw strokes
  strokes.forEach((stroke, si) => {
    const dense = densifyStroke(stroke, 2)
    const canvasPts = dense.map((p) => toCanvas(p, cx, cy, cardSize))
    const completed = state.completedStrokes.includes(si)
    const active = si === state.strokeIndex && !state.done

    if (completed) {
      drawStrokePath(ctx, canvasPts, 1, hue, true, time)
    } else if (active) {
      // Guide (dashed)
      drawStrokePath(ctx, canvasPts, state.progress, hue, false, time, true)
      // Start pulse
      const start = canvasPts[0]
      const pulse = 1 + Math.sin(time * 6) * 0.25
      ctx.fillStyle = `hsl(${hue}, 90%, 55%)`
      ctx.shadowColor = `hsl(${hue}, 100%, 60%)`
      ctx.shadowBlur = 16
      ctx.beginPath()
      ctx.arc(start.x, start.y, 14 * pulse, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(start.x, start.y, 6, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Future strokes — faint guide
      ctx.strokeStyle = `hsla(${hue}, 40%, 70%, 0.25)`
      ctx.lineWidth = 16
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.setLineDash([8, 12])
      strokePath(ctx, canvasPts)
      ctx.setLineDash([])
    }
  })

  // User trail glow
  if (state.trail.length > 1) {
    const trailCanvas = state.trail.map((p) => toCanvas(p, cx, cy, cardSize))
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    for (let i = 1; i < trailCanvas.length; i++) {
      const t = i / trailCanvas.length
      ctx.strokeStyle = `hsla(${hue + t * 40}, 95%, 60%, ${0.3 + t * 0.5})`
      ctx.lineWidth = 8 + t * 10
      ctx.shadowColor = `hsl(${hue}, 100%, 65%)`
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.moveTo(trailCanvas[i - 1].x, trailCanvas[i - 1].y)
      ctx.lineTo(trailCanvas[i].x, trailCanvas[i].y)
      ctx.stroke()
    }
    ctx.shadowBlur = 0
    const tip = trailCanvas[trailCanvas.length - 1]
    ctx.fillStyle = '#fff'
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(tip.x, tip.y, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }

  // Word badge at bottom of card
  ctx.font = `bold ${cardSize * 0.11}px Fredoka, Nunito, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillStyle = `hsl(${hue}, 50%, 35%)`
  ctx.fillText(`${emoji}  ${word}`, cx, cy + cardSize / 2 - 28)

  // Letter label top
  ctx.font = `bold ${cardSize * 0.14}px Fredoka, Nunito, sans-serif`
  ctx.fillStyle = `hsl(${hue}, 60%, 45%)`
  ctx.fillText(`Trace the letter ${letter}`, cx, cy - cardSize / 2 + 32)
}

function strokePath(ctx: CanvasRenderingContext2D, pts: TracePoint[]) {
  if (pts.length < 2) return
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.stroke()
}

function drawStrokePath(
  ctx: CanvasRenderingContext2D,
  pts: TracePoint[],
  progress: number,
  hue: number,
  filled: boolean,
  time: number,
  dashed = false,
) {
  if (pts.length < 2) return
  const endIdx = filled ? pts.length - 1 : Math.max(1, Math.floor(progress * (pts.length - 1)))

  const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[endIdx].x, pts[endIdx].y)
  grad.addColorStop(0, `hsl(${hue}, 90%, 60%)`)
  grad.addColorStop(1, `hsl(${hue + 50}, 95%, 55%)`)

  ctx.strokeStyle = filled ? grad : `hsla(${hue}, 70%, 65%, 0.45)`
  ctx.lineWidth = filled ? 20 : 18
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (filled) {
    ctx.shadowColor = `hsl(${hue}, 100%, 60%)`
    ctx.shadowBlur = 14
  }
  if (dashed) {
    ctx.setLineDash([10, 8])
    ctx.lineDashOffset = -time * 30
  }

  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i <= endIdx; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.shadowBlur = 0
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export function drawLetterCompleteBurst(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  letter: string,
  hue: number,
) {
  ctx.save()
  ctx.globalAlpha = Math.max(0, 1 - time)
  ctx.font = `bold ${Math.min(w, h) * 0.35}px Fredoka, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`
  ctx.shadowColor = `hsl(${hue}, 100%, 60%)`
  ctx.shadowBlur = 30
  const scale = 1 + time * 0.5
  ctx.translate(w / 2, h / 2)
  ctx.scale(scale, scale)
  ctx.fillText(letter, 0, 0)
  ctx.restore()
}
