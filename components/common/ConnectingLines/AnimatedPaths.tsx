"use client"

import { motion } from "framer-motion"

interface AnimatedPathsProps {
  paths: string[]
  sections: string[]
  progress: number
  isScrolling: boolean
}

/**
 * ANIMATED PATHS - Líneas SVG animadas
 * 
 * Renderiza las líneas de conexión con animaciones de dibujado progresivo
 */
export default function AnimatedPaths({ paths, sections, progress, isScrolling }: AnimatedPathsProps) {
  return (
    <>
      {paths.map((path, index) => {
        const sectionStart = index / sections.length
        const sectionEnd = (index + 1) / sections.length
        const lineProgress = progress >= sectionStart 
          ? Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1)
          : 0

        const lineOpacity = progress >= sectionStart 
          ? Math.min(0.2 + (lineProgress * 0.6), 0.8)
          : 0.2

        return (
          <motion.path
            key={index}
            d={path}
            fill="none"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="hsl(var(--primary))"
            style={{
              pathLength: lineProgress,
              opacity: lineOpacity,
              strokeDasharray: "8,4",
              filter: isScrolling ? "blur(0.5px)" : "blur(0px)"
            }}
            initial={{ pathLength: 0, opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        )
      })}
    </>
  )
}
