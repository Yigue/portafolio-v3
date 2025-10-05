"use client"

import { motion } from "framer-motion"

interface RailGlowProps {
  progress: number
}

/**
 * RAIL GLOW - Efecto de glow global del rail
 * 
 * Aplica un efecto de iluminación sutil alrededor del rail principal
 */
export default function RailGlow({ progress }: RailGlowProps) {
  const glowOpacity = progress < 0.5 ? 0.2 + (progress * 1.2) : 0.8 - ((progress - 0.5) * 0.8)

  return (
    <motion.div
      className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
      style={{
        opacity: glowOpacity,
        scale: 0.8 + (progress * 0.3)
      }}
    />
  )
}
