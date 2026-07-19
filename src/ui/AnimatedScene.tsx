import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedSceneProps {
  variant?: 'sky' | 'sunset' | 'night' | 'meadow'
  children: ReactNode
  className?: string
}

const SCENES = {
  sky: ['#4FC3F7', '#81D4FA', '#B3E5FC'],
  sunset: ['#FF6B9D', '#FFB347', '#FFE66D'],
  night: ['#1A237E', '#3949AB', '#5C6BC0'],
  meadow: ['#66BB6A', '#81C784', '#A5D6A7'],
}

export default function AnimatedScene({ variant = 'sky', children, className = '' }: AnimatedSceneProps) {
  const colors = SCENES[variant]
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
        }}
      />
      <motion.div
        className="absolute -top-10 -left-20 w-64 h-32 rounded-full bg-white/30 blur-2xl"
        animate={{ x: [0, 40, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-24 -right-16 w-48 h-24 rounded-full bg-white/25 blur-xl"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}
