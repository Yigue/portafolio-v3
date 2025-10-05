"use client"

import { motion } from "framer-motion"

interface AnimatedArrowsProps {
  paths: string[]
  sections: string[]
  progress: number
}

/**
 * ANIMATED ARROWS - Flechas animadas en las líneas
 * 
 * Muestra flechas que se mueven a lo largo de las líneas de conexión
 */
export default function AnimatedArrows({ paths, sections, progress }: AnimatedArrowsProps) {
  return (
    <>
      {paths.map((path, index) => {
        const sectionStart = index / sections.length
        const sectionEnd = (index + 1) / sections.length
        const arrowProgress = progress >= sectionStart 
          ? Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1)
          : 0

        return (
          <motion.g
            key={`arrow-${index}`}
            style={{
              opacity: arrowProgress >= 0.3 ? Math.min((arrowProgress - 0.3) / 0.7, 1) : 0,
              scale: arrowProgress >= 0.5 ? 0.8 + ((arrowProgress - 0.5) * 0.4) : 0
            }}
          >
            <motion.polygon
              points="0,-8 -6,4 6,4"
              fill="hsl(var(--primary))"
              style={{
                opacity: arrowProgress >= 0.5 ? Math.min((arrowProgress - 0.5) * 2, 1) : 0
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            />
          </motion.g>
        )
      })}
    </>
  )
}
