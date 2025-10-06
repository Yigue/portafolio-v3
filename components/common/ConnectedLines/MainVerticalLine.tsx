"use client"

import { motion } from "framer-motion"

interface MainVerticalLineProps {
  progress: number
  isScrolling: boolean
}

/**
 * MAIN VERTICAL LINE - Línea vertical principal
 * 
 * Línea central que conecta todas las secciones:
 * 1. HERO/BANNER: Línea visible desde 10vh hasta 90vh (siempre visible)
 * 2. SCROLL: Línea crece desde 90vh hacia abajo cuando scrolleas
 */
export default function MainVerticalLine({ progress, isScrolling }: MainVerticalLineProps) {
  // Calcular cuánto ha scrolleado el usuario
  const scrollableProgress = Math.max(0, progress)
  
  // Calcular la altura de la línea que crece con el scroll (después del 90vh)
  const lineHeight = scrollableProgress * 100
  
  return (
    <>
      {/* ========== LÍNEA DEL HERO (PARTE SUPERIOR) ========== */}
      {/* Esta línea siempre está visible en el banner/hero */}
      
      {/* Línea de fondo apagada del hero */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 top-[10vh] w-0.5 bg-border/30 rounded-full"
        style={{
          height: '80vh' // Desde 10vh hasta 90vh (80vh de altura)
        }}
      />
      
      {/* Línea iluminada del hero - Se muestra al inicio */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 top-[10vh] w-1 rounded-full"
        style={{
          height: '80vh',
          background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--primary)), hsl(var(--primary) / 0.6))',
          boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
          transformOrigin: 'top' // Crece desde arriba
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ 
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1] // Ease-out suave
        }}
      />
      
      
      {/* ========== LÍNEA QUE CRECE CON EL SCROLL ========== */}
      {/* Esta línea aparece desde 90vh y crece hacia abajo */}
      
      {/* Línea de fondo apagada - resto de la página */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 top-[90vh] bottom-0 w-0.5 bg-border/30 rounded-full"
      />
      
      {/* Línea iluminada que crece con el scroll */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 top-[90vh] w-1 rounded-full"
        style={{
          height: `${lineHeight}vh`,
          background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--primary)), hsl(var(--primary) / 0.6))',
          boxShadow: isScrolling 
            ? '0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)'
            : '0 0 10px hsl(var(--primary) / 0.5)',
        }}
        transition={{
          height: { 
            duration: 0.05,
            ease: "linear" 
          },
          boxShadow: { 
            duration: 0.3 
          }
        }}
      />
      
      {/* PARTÍCULA DE LUZ - Se mueve con el scroll */}
      {/* Solo aparece cuando empezás a scrollear */}
      {scrollableProgress > 0 && (
        <motion.div
          className="fixed left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"
          style={{
            top: `calc(90vh + ${lineHeight}vh)`,
            boxShadow: '0 0 20px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.5)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: isScrolling ? [1, 1.4, 1] : [1, 1.2, 1],
          }}
          transition={{
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: isScrolling ? 1 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      )}
    </>
  )
}
