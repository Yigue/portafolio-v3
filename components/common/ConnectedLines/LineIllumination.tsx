"use client"

import { motion } from "framer-motion"

interface LineIlluminationProps {
  progress: number
  isScrolling: boolean
}

/**
 * LINE ILLUMINATION - Sistema de iluminación y efectos visuales
 * 
 * Crea efectos de luz alrededor de la partícula principal:
 * - Ondas expansivas
 * - Resplandor ambiental
 * - Partículas secundarias
 * 
 * Solo aparece cuando empezás a scrollear (después del 90vh)
 */
export default function LineIllumination({ progress, isScrolling }: LineIlluminationProps) {
  // Calcular la posición de la luz (misma que la partícula principal)
  const lightPosition = progress * 100
  
  // Si no hay progreso, no mostrar efectos
  if (progress <= 0) return null
  
  return (
    <>
      {/* ONDA EXPANSIVA 1 - Se expande desde la partícula */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: `calc(90vh + ${lightPosition}vh)`,
        }}
      >
        <motion.div
          className="w-16 h-16 border-2 border-primary/60 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* ONDA EXPANSIVA 2 - Desfasada para crear efecto continuo */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: `calc(90vh + ${lightPosition}vh)`,
        }}
      >
        <motion.div
          className="w-16 h-16 border-2 border-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1, // Desfase de 1 segundo
          }}
        />
      </motion.div>

      {/* RESPLANDOR AMBIENTAL - Ilumina el área alrededor */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: `calc(90vh + ${lightPosition}vh)`,
        }}
      >
        <motion.div
          className="w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: isScrolling ? [1, 1.2, 1] : 1,
            opacity: isScrolling ? [0.5, 0.7, 0.5] : 0.4,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* RASTRO DE LUZ - Deja un efecto de estela */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 w-2 pointer-events-none"
        style={{
          top: `calc(90vh + ${Math.max(0, lightPosition - 5)}vh)`,
          height: '5vh',
          background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.2), transparent)',
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: isScrolling ? [0.6, 0.8, 0.6] : 0.3,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  )
}
