/** Premium canvas drawing primitives — glossy, mobile-game style */

export function drawSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  top: string,
  bottom: string,
  time = 0,
) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, top)
  g.addColorStop(1, bottom)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // soft clouds
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 0.28 + time * 0.02) % 1.2) * w
    const cy = h * (0.12 + i * 0.08)
    drawCloud(ctx, cx, cy, 50 + i * 12)
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath()
  ctx.arc(x, y, s * 0.5, 0, Math.PI * 2)
  ctx.arc(x + s * 0.4, y - s * 0.15, s * 0.35, 0, Math.PI * 2)
  ctx.arc(x + s * 0.75, y, s * 0.4, 0, Math.PI * 2)
  ctx.fill()
}

export function drawBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  hue: number,
  wobble = 0,
) {
  const rr = r + Math.sin(wobble) * 2
  const g = ctx.createRadialGradient(x - rr * 0.35, y - rr * 0.35, rr * 0.05, x, y, rr)
  g.addColorStop(0, `hsla(${hue}, 100%, 92%, 0.95)`)
  g.addColorStop(0.45, `hsla(${hue}, 85%, 68%, 0.55)`)
  g.addColorStop(1, `hsla(${hue}, 80%, 55%, 0.25)`)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, rr, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.beginPath()
  ctx.arc(x - rr * 0.35, y - rr * 0.4, rr * 0.18, 0, Math.PI * 2)
  ctx.fill()
}

export function drawBalloon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  hue: number,
) {
  ctx.save()
  ctx.translate(x, y)
  const g = ctx.createRadialGradient(-r * 0.2, -r * 0.3, r * 0.1, 0, 0, r)
  g.addColorStop(0, `hsl(${hue}, 95%, 72%)`)
  g.addColorStop(1, `hsl(${hue}, 80%, 48%)`)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.ellipse(0, 0, r * 0.85, r, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, r)
  ctx.lineTo(0, r + 18)
  ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.beginPath()
  ctx.ellipse(-r * 0.25, -r * 0.25, r * 0.15, r * 0.22, -0.4, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  glow = true,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  if (glow) {
    ctx.shadowColor = '#FFE566'
    ctx.shadowBlur = 16
  }
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
  g.addColorStop(0, '#FFF9C4')
  g.addColorStop(0.5, '#FFD54F')
  g.addColorStop(1, '#FF8F00')
  ctx.fillStyle = g
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const outer = (i * Math.PI * 2) / 5 - Math.PI / 2
    const inner = outer + Math.PI / 5
    const ox = Math.cos(outer) * size
    const oy = Math.sin(outer) * size
    const ix = Math.cos(inner) * size * 0.45
    const iy = Math.sin(inner) * size * 0.45
    if (i === 0) ctx.moveTo(ox, oy)
    else ctx.lineTo(ox, oy)
    ctx.lineTo(ix, iy)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawMole(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  pop: number,
) {
  const s = scale * (0.3 + pop * 0.7)
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s, s)
  // hole
  ctx.fillStyle = '#3E2723'
  ctx.beginPath()
  ctx.ellipse(0, 30, 55, 18, 0, 0, Math.PI * 2)
  ctx.fill()
  if (pop < 0.05) {
    ctx.restore()
    return
  }
  // body
  const bodyGrad = ctx.createRadialGradient(-10, -20, 5, 0, 0, 50)
  bodyGrad.addColorStop(0, '#A1887F')
  bodyGrad.addColorStop(1, '#5D4037')
  ctx.fillStyle = bodyGrad
  ctx.beginPath()
  ctx.ellipse(0, 0, 42, 48, 0, 0, Math.PI * 2)
  ctx.fill()
  // face
  ctx.fillStyle = '#3E2723'
  ctx.beginPath()
  ctx.arc(-14, -5, 6, 0, Math.PI * 2)
  ctx.arc(14, -5, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FF8A80'
  ctx.beginPath()
  ctx.ellipse(0, 8, 10, 7, 0, 0, Math.PI * 2)
  ctx.fill()
  // nose
  ctx.fillStyle = '#FF7043'
  ctx.beginPath()
  ctx.arc(0, 2, 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function drawBrick(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  hue: number,
) {
  const g = ctx.createLinearGradient(x, y, x, y + h)
  g.addColorStop(0, `hsl(${hue}, 75%, 62%)`)
  g.addColorStop(1, `hsl(${hue}, 70%, 42%)`)
  ctx.fillStyle = g
  roundRect(ctx, x, y, w, h, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 2
  roundRect(ctx, x + 2, y + 2, w - 4, h * 0.35, 4)
  ctx.stroke()
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

export function drawPaddle(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  const g = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y)
  g.addColorStop(0, '#FFD54F')
  g.addColorStop(0.5, '#FFF176')
  g.addColorStop(1, '#FFB300')
  ctx.fillStyle = g
  ctx.shadowColor = '#FF8F00'
  ctx.shadowBlur = 12
  roundRect(ctx, x - w / 2, y, w, 14, 7)
  ctx.fill()
  ctx.shadowBlur = 0
}

export function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r)
  g.addColorStop(0, '#FFFFFF')
  g.addColorStop(1, '#E0E0E0')
  ctx.fillStyle = g
  ctx.shadowColor = '#fff'
  ctx.shadowBlur = 8
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0
}

export function drawTapTarget(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  pulse: number,
) {
  const pr = r + Math.sin(pulse) * 6
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(x, y, pr + 12, 0, Math.PI * 2)
  ctx.stroke()
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
  g.addColorStop(0, '#FF5252')
  g.addColorStop(1, '#C62828')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = `bold ${r}px Nunito, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('👆', x, y + 2)
}
