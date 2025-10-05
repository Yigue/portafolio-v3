"use client"

import { motion } from "framer-motion"

interface TopGlowProps {
  progress: number
}

/**
 * TOP GLOW - Efecto de glow superior
 * 
 * Glow sutil en la parte superior que cambia con el scroll
 */
export default function TopGlow({ progress }: TopGlowProps) {
  const opacity = progress < 0.3 ? 0.2 : progress < 0.7 ? 0.1 : 0.2
  const scale = 1 - (progress * 0.1)

  return (
    <motion.div 
      className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10"
      style={{ 
        opacity,
        scale
      }}
    />
  )
}
