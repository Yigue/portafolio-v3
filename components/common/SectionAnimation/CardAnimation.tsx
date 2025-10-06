"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, ReactNode, useEffect, useState } from "react"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface CardAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  /** Activar o no el efecto Scroll Beam */
  enableBeam?: boolean
  /** Altura de la franja luminosa en px */
  beamHeight?: number
  /** Radio de influencia alrededor de la franja */
  influenceRadius?: number
  /** Intensidad máxima del glow (0–1) */
  maxIntensity?: number
  /** Duración del recorrido de la luz (segundos) */
  traceDuration?: number
}

/**
 * CARD ANIMATION – Tracing Beam Edition
 *
 * Una luz viaja progresivamente alrededor de los bordes del componente,
 * trazando su contorno cuando la card cruza la franja central del viewport.
 * 
 * La luz recorre el perímetro completo en sentido horario,
 * sincronizada con la proximidad al centro de la pantalla.
 */
export default function CardAnimation({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
  enableBeam = true,
  beamHeight = 60,
  influenceRadius = 200,
  maxIntensity = 1,
  traceDuration = 2.5,
}: CardAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 })
  const { progress } = useScrollProgress()
  const glowIntensity = useMotionValue(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // ===== ACTUALIZAR DIMENSIONES DE LA CARD =====
  useEffect(() => {
    if (!ref.current) return
    
    const updateDimensions = () => {
      if (!ref.current) return
      const { width, height } = ref.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // ===== CALCULAR INTENSIDAD SEGÚN DISTANCIA A LA FRANJA =====
  useEffect(() => {
    if (!enableBeam || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const spotlightY = window.innerHeight / 2

    // Distancia vertical entre la franja y el centro del elemento
    const elementCenter = rect.top + rect.height / 2
    const distance = Math.abs(elementCenter - spotlightY)

    // Intensidad máxima cuando el centro está dentro de la franja
    const rawIntensity = Math.max(0, 1 - distance / influenceRadius)
    const eased = 1 - Math.pow(1 - rawIntensity, 3)
    const finalIntensity = eased * maxIntensity

    animate(glowIntensity, finalIntensity, {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
  }, [progress, enableBeam, glowIntensity, beamHeight, influenceRadius, maxIntensity])

  // ===== TRANSFORMACIONES VISUALES =====
  const borderOpacity = useTransform(glowIntensity, [0, 1], [0, 1])
  const ambientOpacity = useTransform(glowIntensity, [0, 1], [0, 0.6])
  const scale = useTransform(glowIntensity, [0, 1], [1, 1.02])
  const brightness = useTransform(glowIntensity, [0, 1], [1, 1.15])

  // ===== CALCULAR PERÍMETRO PARA SVG =====
  const perimeter = (dimensions.width + dimensions.height) * 2
  const strokeDasharray = perimeter
  const strokeDashoffset = useTransform(glowIntensity, [0, 1], [perimeter, 0])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 25,
      }}
      className={className}
      style={{
        position: "relative",
        scale,
        filter: `brightness(${brightness})`,
      }}
    >
      {/* ===== SVG TRACING BEAM ===== */}
      {enableBeam && dimensions.width > 0 && (
        <>
          {/* SVG que traza el borde progresivamente */}
          <motion.svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: borderOpacity,
            }}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradiente para la línea trazadora */}
              <linearGradient id="tracing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
                <stop offset="40%" stopColor="hsl(var(--primary) / 0.4)" />
                <stop offset="50%" stopColor="hsl(var(--primary) / 1)" />
                <stop offset="60%" stopColor="hsl(var(--primary) / 0.4)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
              </linearGradient>
              
              {/* Filtro de glow para la línea */}
              <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Rectángulo que se va "dibujando" alrededor de la card */}
            <motion.rect
              x="1"
              y="1"
              width={dimensions.width - 2}
              height={dimensions.height - 2}
              rx="8"
              stroke="url(#tracing-gradient)"
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              filter="url(#glow-filter)"
              style={{
                strokeLinecap: "round",
              }}
            />
            
            {/* Línea secundaria más gruesa y difusa para el glow */}
            <motion.rect
              x="1"
              y="1"
              width={dimensions.width - 2}
              height={dimensions.height - 2}
              rx="8"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              filter="url(#glow-filter)"
              style={{
                strokeLinecap: "round",
              }}
            />
          </motion.svg>

          {/* Borde base sutil */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "8px",
              border: "1px solid hsl(var(--primary) / 0.2)",
              opacity: borderOpacity,
              pointerEvents: "none",
            }}
          />

          {/* Resplandor ambiental difuso */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-16px",
              borderRadius: "16px",
              background:
                "radial-gradient(circle at center, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
              filter: "blur(28px)",
              opacity: ambientOpacity,
              pointerEvents: "none",
            }}
          />

          {/* Partículas brillantes que siguen la luz */}
          <motion.div style={{ opacity: borderOpacity }}>
            {[25, 50, 75].map((percentage, i) => {
              // Calcular posición en el perímetro
              const distanceAlong = (perimeter * percentage) / 100
              let x = 0, y = 0
              
              if (distanceAlong < dimensions.width) {
                // Top edge
                x = distanceAlong
                y = 0
              } else if (distanceAlong < dimensions.width + dimensions.height) {
                // Right edge
                x = dimensions.width
                y = distanceAlong - dimensions.width
              } else if (distanceAlong < 2 * dimensions.width + dimensions.height) {
                // Bottom edge
                x = dimensions.width - (distanceAlong - dimensions.width - dimensions.height)
                y = dimensions.height
              } else {
                // Left edge
                x = 0
                y = dimensions.height - (distanceAlong - 2 * dimensions.width - dimensions.height)
              }

              return (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${x}px`,
                    top: `${y}px`,
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "hsl(var(--primary))",
                    boxShadow: "0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary) / 0.5)",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1.2, 0.5],
                  }}
                  transition={{
                    duration: traceDuration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: (traceDuration * percentage) / 100,
                  }}
                />
              )
            })}
          </motion.div>
        </>
      )}
      
      {children}
    </motion.div>
  )
}
