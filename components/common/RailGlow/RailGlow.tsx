"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/components/providers/ScrollProvider"
import MainGlow from "./MainGlow"
import PulseGlow from "./PulseGlow"
import BackgroundGlow from "./BackgroundGlow"

interface RailGlowProps {
  sections: string[]
  debug?: boolean
}

/**
 * RAIL GLOW - Componente principal del efecto de glow del rail
 * 
 * Orquesta todos los efectos de iluminación del rail principal
 */
export default function RailGlow({ sections, debug = false }: RailGlowProps) {
  const { progress, isScrolling } = useScrollProgress()

  const glowIntensity = progress < 0.5 ? 0.1 + (progress * 0.6) : 0.4 - ((progress - 0.5) * 0.4)
  const glowScale = 0.8 + (progress * 0.3)
  const glowY = progress * -20

  if (debug) {
    console.log('🌟 RailGlow:', { progress: (progress * 100).toFixed(1) + '%' })
  }

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block pointer-events-none"
      style={{
        opacity: glowIntensity,
        scale: glowScale,
        y: glowY
      }}
    >
      {/* Glow principal */}
      <MainGlow />
      
      {/* Glow de pulso durante scroll */}
      {isScrolling && <PulseGlow />}
      
      {/* Glow de fondo sutil */}
      <BackgroundGlow />
    </motion.div>
  )
}
