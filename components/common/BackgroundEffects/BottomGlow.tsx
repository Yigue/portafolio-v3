"use client"

import { motion } from "framer-motion"

interface BottomGlowProps {
  progress: number
}

/**
 * BOTTOM GLOW - Efecto de glow inferior
 * 
 * Glow principal que se mueve y cambia de intensidad con el scroll
 */
export default function BottomGlow({ progress }: BottomGlowProps) {
  const glowOpacity = progress < 0.5 ? 0.1 + (progress * 0.4) : 0.3 - ((progress - 0.5) * 0.4)
  const glowScale = 0.8 + (progress * 0.4)
  const glowY = progress * -100

  return (
    <motion.div 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10"
      style={{ 
        opacity: glowOpacity,
        scale: glowScale,
        y: glowY
      }}
    />
  )
}
