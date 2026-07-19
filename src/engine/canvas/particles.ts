import type { Particle } from './types'

export function spawnBurst(
  particles: Particle[],
  x: number,
  y: number,
  count: number,
  hue: number,
  speed = 4,
) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
    const v = speed * (0.5 + Math.random())
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v,
      life: 1,
      maxLife: 0.5 + Math.random() * 0.5,
      size: 4 + Math.random() * 8,
      hue,
      shape: Math.random() > 0.5 ? 'circle' : 'star',
    })
  }
}

export function updateParticles(particles: Particle[], dt: number) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx * dt * 60
    p.y += p.vy * dt * 60
    p.vy += 0.15 * dt * 60
    p.life -= dt / p.maxLife
    if (p.life <= 0) particles.splice(i, 1)
  }
}

export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    const alpha = Math.max(0, p.life)
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`
    if (p.shape === 'star') {
      drawStar(ctx, p.x, p.y, p.size, 5)
    } else if (p.shape === 'rect') {
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
    } else {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points: number) {
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const rad = (i * Math.PI) / points - Math.PI / 2
    const dist = i % 2 === 0 ? r : r * 0.45
    const x = cx + Math.cos(rad) * dist
    const y = cy + Math.sin(rad) * dist
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}
