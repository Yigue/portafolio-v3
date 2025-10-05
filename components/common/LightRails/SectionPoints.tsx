"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SectionPointsProps {
  sections: string[]
  progress: number
  debug?: boolean
}

/**
 * SECTION POINTS - Puntos de luz para cada sección
 * 
 * Muestra puntos interactivos que se iluminan al llegar a cada sección
 */
export default function SectionPoints({ sections, progress, debug = false }: SectionPointsProps) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const updateActiveSection = () => {
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean)
      
      const currentSection = sectionElements.findIndex(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter
      })
      
      if (currentSection !== -1 && currentSection !== activeSection) {
        setActiveSection(currentSection)
        
        if (debug) {
          console.log(`Sección activa: ${sections[currentSection]} (${currentSection})`)
        }
      }
    }

    updateActiveSection()
  }, [progress, sections, activeSection, debug])

  return (
    <>
      {sections.map((sectionId, index) => {
        const isActive = index === activeSection
        const isCompleted = index < activeSection

        return (
          <motion.div
            key={sectionId}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500 z-10"
            style={{
              top: `${(index / (sections.length - 1)) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              backgroundColor: isCompleted || isActive 
                ? "hsl(var(--primary))" 
                : "hsl(var(--rail))",
              scale: isActive ? 1.4 : isCompleted ? 1.2 : 1,
              boxShadow: isActive 
                ? "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)" 
                : isCompleted
                ? "0 0 15px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.3)"
                : "0 0 0px hsl(var(--primary) / 0)",
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Efecto de pulso para la sección activa */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30"
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Efecto de glow que se integra con la línea */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: isCompleted || isActive 
                  ? "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)"
                  : "radial-gradient(circle, hsl(var(--rail) / 0.2) 0%, transparent 100%)"
              }}
              animate={{
                scale: isActive ? [1, 1.5, 1] : isCompleted ? 1.2 : 1,
                opacity: isActive ? [0.6, 0.3, 0.6] : isCompleted ? 0.4 : 0.2
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}
