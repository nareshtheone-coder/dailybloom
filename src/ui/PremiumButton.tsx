import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PremiumButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'back'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

const variants = {
  primary: 'bg-gradient-to-b from-[#FF8FB1] to-[#E91E8C] text-white shadow-[0_6px_0_#AD1457,0_10px_20px_rgba(233,30,140,0.4)]',
  secondary: 'bg-gradient-to-b from-[#64B5F6] to-[#1976D2] text-white shadow-[0_6px_0_#0D47A1,0_10px_20px_rgba(25,118,210,0.35)]',
  ghost: 'bg-white/20 backdrop-blur-md text-white border-2 border-white/40 shadow-lg',
  back: 'bg-white/90 text-purple-700 shadow-[0_4px_0_rgba(0,0,0,0.15)] min-w-0 min-h-0',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl font-bold',
}

export default function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
}: PremiumButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.94, y: 2 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`font-display font-bold transition-colors ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </motion.button>
  )
}
