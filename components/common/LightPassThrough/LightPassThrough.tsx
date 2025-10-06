"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"

interface LightPassThroughProps {
  children: ReactNode
  sectionId: string
  className?: string
  intensity?: number
  color?: string
  duration?: number
}

/**
 * LIGHT PASS THROUGH - Efecto de luz que atraviesa elementos
 * 
 * Crea el efecto de que la luz atraviesa las cards cuando las toca
 */
export default function LightPassThrough({ 
  children, 
  sectionId, 
  className = "",
  intensity = 0.3,
  color = "hsl(var(--primary))",
  duration = 0.5
}: LightPassThroughProps) {
  const [isLightTouching, setIsLightTouching] = useState(false)
  const [lightProgress, setLightProgress] = useState(0)
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 })

  // Escuchar eventos de la luz
  useEffect(() => {
    const handleLightTrigger = (event: CustomEvent) => {
      if (event.detail.sectionId === sectionId) {
        setIsLightTouching(event.detail.isActive)
        setLightProgress(event.detail.progress)
        
        // Calcular posición de la luz en el elemento
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          setLightPosition({ x: centerX, y: centerY })
        }
      }
    }

    window.addEventListener('lightTrigger', handleLightTrigger as EventListener)
    return () => window.removeEventListener('lightTrigger', handleLightTrigger as EventListener)
  }, [sectionId])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Efecto de luz que atraviesa */}
      {isLightTouching && (
        <>
          {/* Línea de luz horizontal */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${color} ${(lightProgress * 30)}%, 
                ${color} ${(lightProgress * 70)}%, 
                transparent 100%)`,
              opacity: lightProgress * intensity
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightProgress * intensity }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Línea de luz vertical */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(0deg, 
                transparent 0%, 
                ${color} ${(lightProgress * 20)}%, 
                ${color} ${(lightProgress * 80)}%, 
                transparent 100%)`,
              opacity: lightProgress * intensity * 0.7
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightProgress * intensity * 0.7 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Efecto de resplandor central */}
          <motion.div
            className="absolute pointer-events-none rounded-full blur-sm"
            style={{
              left: `${lightPosition.x}px`,
              top: `${lightPosition.y}px`,
              width: `${100 + (lightProgress * 200)}px`,
              height: `${100 + (lightProgress * 200)}px`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              opacity: lightProgress * intensity * 0.5,
              transform: "translate(-50%, -50%)"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: lightProgress,
              opacity: lightProgress * intensity * 0.5
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Partículas de luz */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: lightProgress * 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i * 10)}%`,
                  boxShadow: `0 0 10px ${color}`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}
