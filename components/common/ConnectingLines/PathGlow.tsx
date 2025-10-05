"use client"

import { motion } from "framer-motion"

interface PathGlowProps {
  paths: string[]
  sections: string[]
  progress: number
}

/**
 * PATH GLOW - Efecto de glow para las líneas
 * 
 * Aplica un efecto de iluminación sutil a las líneas de conexión
 */
export default function PathGlow({ paths, sections, progress }: PathGlowProps) {
  return (
    <>
      {/* Definición del filtro de glow */}
      <motion.defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </motion.defs>

      {/* Líneas de glow de fondo */}
      {paths.map((path, index) => {
        const sectionStart = index / sections.length
        const sectionEnd = (index + 1) / sections.length
        const glowOpacity = progress >= sectionStart 
          ? Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1) * 0.3
          : 0

        return (
          <motion.path
            key={`glow-${index}`}
            d={path}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              opacity: glowOpacity,
              filter: "blur(8px)"
            }}
          />
        )
      })}
    </>
  )
}
