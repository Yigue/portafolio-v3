"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"
import { useLightTrigger } from "@/lib/hooks/useLightTrigger"

interface LightCardProps {
  children: ReactNode
  sectionId: string
  className?: string
  borderRadius?: number
}

/**
 * LIGHT CARD - Card que se ilumina cuando la luz la toca
 * 
 * Efecto especial: cuando la luz toca la card, un destello
 * recorre todo su borde perimetralmente.
 * 
 * CÓMO FUNCIONA:
 * 1. Usa SVG para dibujar el borde de la card
 * 2. stroke-dasharray y stroke-dashoffset crean el efecto de "dibujo"
 * 3. Cuando la luz toca la card, anima el dashoffset de 0 a perímetro
 * 4. Framer Motion maneja la animación suave
 */
export default function LightCard({ 
  children, 
  sectionId, 
  className = "",
  borderRadius = 16
}: LightCardProps) {
  // Estado: ¿la luz está tocando esta card?
  const [isLightActive, setIsLightActive] = useState(false)
  const [lightProgress, setLightProgress] = useState(0)
  
  // Motion values para animar el borde
  const pathLength = useMotionValue(0)
  const pathOffset = useMotionValue(1)
  
  // Transformar el progreso de la luz en opacidad
  const glowOpacity = useTransform(pathLength, [0, 1], [0, 0.8])

  // Escuchar eventos de luz
  useLightTrigger(sectionId, (event) => {
    setIsLightActive(event.isActive)
    setLightProgress(event.progress)
    
    // Cuando la luz toca la card por primera vez, animar el borde
    if (event.isActive && event.progress < 0.3) {
      // Animar el trazo del borde (como si la luz lo recorriera)
      animate(pathLength, 1, {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1], // Easing personalizado (ease-out suave)
      })
      
      animate(pathOffset, 0, {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      })
    }
  })

  // Dimensiones de referencia para el SVG
  const strokeWidth = 2
  const padding = strokeWidth / 2

  return (
    <div className={`relative ${className}`}>
      {/* SVG overlay para el borde iluminado */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          {/* Gradiente para el efecto de luz */}
          <linearGradient id={`light-gradient-${sectionId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Filtro de resplandor */}
          <filter id={`glow-${sectionId}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Borde redondeado que se ilumina */}
        <motion.rect
          x={padding}
          y={padding}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={`url(#light-gradient-${sectionId})`}
          strokeWidth={strokeWidth}
          style={{
            pathLength: pathLength,
            pathOffset: pathOffset,
            opacity: glowOpacity,
          }}
          filter={`url(#glow-${sectionId})`}
        />
      </svg>

      {/* Resplandor de fondo cuando la luz está activa */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1), transparent 70%)',
        }}
        animate={{
          opacity: isLightActive ? [0.3, 0.5, 0.3] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isLightActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Card content con animación sutil */}
      <motion.div
        className="relative bg-card border border-border rounded-lg p-6 shadow-lg"
        animate={{
          scale: isLightActive ? [1, 1.02, 1] : 1,
          borderColor: isLightActive 
            ? 'hsl(var(--primary) / 0.5)' 
            : 'hsl(var(--border))',
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: isLightActive ? Infinity : 0,
            ease: "easeInOut",
          },
          borderColor: {
            duration: 0.5,
          }
        }}
      >
        {children}
      </motion.div>

      {/* Partículas que emergen cuando la luz toca la card */}
      {isLightActive && lightProgress < 0.5 && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                opacity: 0,
              }}
              animate={{
                x: `${50 + (Math.cos(i * Math.PI / 3) * 100)}%`,
                y: `${50 + (Math.sin(i * Math.PI / 3) * 100)}%`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

