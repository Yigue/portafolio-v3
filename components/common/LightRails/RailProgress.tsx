"use client"

import { motion } from "framer-motion"

interface RailProgressProps {
  progress: number
  isScrolling: boolean
}

/**
 * RAIL PROGRESS - Barra de progreso principal del rail
 * 
 * Muestra el progreso visual del scroll en el rail principal
 */
export default function RailProgress({ progress, isScrolling }: RailProgressProps) {
  const railHeight = `${progress * 100}%`

  return (
    <div className="w-1 h-96 bg-rail rounded-full overflow-hidden shadow-soft-1 relative">
      {/* Línea de progreso principal */}
      <motion.div
        className="w-full bg-gradient-to-b from-rail-active via-primary to-rail-active rounded-full"
        style={{
          height: railHeight,
          boxShadow: isScrolling 
            ? "0 0 20px hsl(var(--primary) / 0.6)" 
            : "0 0 10px hsl(var(--primary) / 0.3)"
        }}
        transition={{ 
          duration: 0.1, 
          ease: "linear",
          boxShadow: { duration: 0.3 }
        }}
      />
      
      {/* Línea de documentación que se ilumina */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent rounded-full"
        style={{
          opacity: isScrolling ? 0.8 : 0.4,
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            hsl(var(--primary) / 0.3) ${(progress * 50)}%, 
            hsl(var(--primary) / 0.6) ${(progress * 80)}%, 
            hsl(var(--primary) / 0.3) ${(progress * 100)}%, 
            transparent 100%)`
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
        }}
      />
    </div>
  )
}
