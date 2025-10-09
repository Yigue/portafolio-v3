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
 * LIGHT PASS THROUGH - Luz centrada que atraviesa el componente
 *
 * La luz se genera en el centro superior y recorre el componente
 * hacia el centro inferior, sin afectar los extremos.
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
  const [cardHeight, setCardHeight] = useState(0)

  // Escuchar eventos globales de trigger de luz
  useEffect(() => {
    const handleLightTrigger = (event: CustomEvent) => {
      if (event.detail.sectionId === sectionId) {
        setIsLightTouching(event.detail.isActive)
        setLightProgress(event.detail.progress)
      }
    }

    window.addEventListener("lightTrigger", handleLightTrigger as EventListener)
    return () =>
      window.removeEventListener("lightTrigger", handleLightTrigger as EventListener)
  }, [sectionId])

  // Medir la altura de la card para ajustar el efecto
  useEffect(() => {
    const element = document.getElementById(`light-container-${sectionId}`)
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setCardHeight(entry.contentRect.height)
        }
      })
      
      resizeObserver.observe(element)
      return () => resizeObserver.disconnect()
    }
  }, [sectionId])

  // Calcular tamaño del resplandor basado en la altura de la card
  // Cards pequeñas (< 200px): resplandor pequeño (60px)
  // Cards medianas (200-400px): resplandor medio (100px)
  // Cards grandes (> 400px): resplandor grande (140px)
  const glowSize = cardHeight < 200 ? 60 : cardHeight < 400 ? 100 : 140

  return (
    <div 
      id={`light-container-${sectionId}`}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {/* === Efecto de luz progresiva === */}
      {isLightTouching && (
        <>
          {/* Línea de luz vertical que crece desde arriba */}
          <motion.div
            className="absolute left-1/2 pointer-events-none"
            style={{
              top: 0,
              width: "2px",
              height: `${lightProgress * 100}%`,
              background: `linear-gradient(180deg,
                ${color} 0%,
                ${color} 60%,
                transparent 100%)`,
              boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
              transform: "translateX(-50%)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: `${lightProgress * 100}%`,
              opacity: intensity,
            }}
            transition={{
              duration: 0.2,
              ease: "linear",
            }}
          />

          {/* Punto brillante que sigue el progreso de la luz */}
          {lightProgress > 0.05 && (
            <motion.div
              className="absolute left-1/2 pointer-events-none rounded-full blur-lg"
              style={{
                top: `${lightProgress * 100}%`,
                width: `${glowSize}px`,
                height: `${glowSize}px`,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                scale: [0.9, 1.2, 0.9],
                opacity: intensity * 0.8,
              }}
              transition={{
                scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.2 },
              }}
            />
          )}
        </>
      )}
    </div>
  )
}
