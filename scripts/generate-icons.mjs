import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const iconSvg = readFileSync(join(publicDir, 'icon.svg'))
const maskableSvg = readFileSync(join(publicDir, 'icon-maskable.svg'))

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.warn('sharp not installed; skipping PNG generation. Run: npm install && node scripts/generate-icons.mjs')
  process.exit(0)
}

const outputs = [
  { input: iconSvg, name: 'icon-192x192.png', size: 192 },
  { input: iconSvg, name: 'icon-512x512.png', size: 512 },
  { input: maskableSvg, name: 'icon-maskable.png', size: 512 },
  { input: iconSvg, name: 'apple-touch-icon.png', size: 180 },
]

for (const { input, name, size } of outputs) {
  const outPath = join(publicDir, name)
  await sharp(input).resize(size, size).png().toFile(outPath)
  console.log(`Wrote ${name}`)
}

copyFileSync(join(publicDir, 'icon.svg'), join(publicDir, 'icon-192.svg'))
copyFileSync(join(publicDir, 'icon.svg'), join(publicDir, 'icon-512.svg'))
console.log('Wrote icon-192.svg and icon-512.svg')
