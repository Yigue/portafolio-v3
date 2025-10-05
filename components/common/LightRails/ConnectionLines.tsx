"use client"

import { motion } from "framer-motion"

interface ConnectionLinesProps {
  sections: string[]
  progress: number
}

/**
 * CONNECTION LINES - Líneas de conexión entre puntos de sección
 * 
 * Muestra líneas verticales que conectan los puntos de sección
 */
export default function ConnectionLines({ sections, progress }: ConnectionLinesProps) {
  return (
    <>

      {sections.slice(0, -1).map((_, index) => {
        const isCompleted = index < progress * sections.length
        const isCurrent = index === Math.floor(progress * sections.length) - 1
        
        return (
          <motion.div
            key={`line-${index}`}
            className="absolute left-1/2 -translate-x-1/2 w-1 rounded-full z-0"
            style={{
              top: `${(index / (sections.length - 1)) * 100}%`,
              height: `${100 / (sections.length - 1)}%`,
              transform: "translateX(-50%)",
            }}
            animate={{
              background: isCompleted 
                ? "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary)))"
                : isCurrent
                ? "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--rail)))"
                : "linear-gradient(to bottom, hsl(var(--rail)), hsl(var(--rail)))",
              boxShadow: isCompleted 
                ? "0 0 8px hsl(var(--primary) / 0.6), 0 0 16px hsl(var(--primary) / 0.3)"
                : "0 0 0px hsl(var(--primary) / 0)"
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
        )
      })}
    </>
  )
}
