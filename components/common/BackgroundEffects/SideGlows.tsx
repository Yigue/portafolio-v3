"use client"

import { motion } from "framer-motion"

interface SideGlowsProps {
  progress: number
}

/**
 * SIDE GLOWS - Efectos de glow laterales
 * 
 * Glows en los lados izquierdo y derecho que se mueven con el scroll
 */
export default function SideGlows({ progress }: SideGlowsProps) {
  const opacity = progress < 0.5 ? 0.1 + (progress * 0.2) : 0.2 - ((progress - 0.5) * 0.2)
  const leftX = -50 + (progress * 100)
  const rightX = 50 - (progress * 100)

  return (
    <>
      {/* Glow lateral izquierdo */}
      <motion.div 
        className="fixed left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ 
          opacity,
          x: leftX
        }}
      />
      
      {/* Glow lateral derecho */}
      <motion.div 
        className="fixed right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ 
          opacity,
          x: rightX
        }}
      />
    </>
  )
}
