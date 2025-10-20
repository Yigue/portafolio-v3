"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ContinuousTracingBeamProps {
  className?: string
  sections?: string[]
}

export function ContinuousTracingBeam({ 
  className,
  sections = ["sobre-mí", "timeline", "habilidades", "proyectos"]
}: ContinuousTracingBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pathData, setPathData] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Calcular el progreso de la línea
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current) return

      // Crear path SVG que vaya de izquierda a derecha en zigzag
      // Usando coordenadas relativas para que sea responsive
      const path = `
        M 5,20
        Q 25,20 45,20
        L 45,35
        Q 25,35 5,35
        L 5,50
        Q 25,50 45,50
        L 45,65
        Q 25,65 5,65
        L 5,80
        Q 25,80 45,80
        L 45,95
        Q 25,95 5,95
      `

      setPathData(path)
      setIsVisible(true)
    }

    calculatePath()
    window.addEventListener('resize', calculatePath)
    
    return () => window.removeEventListener('resize', calculatePath)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={cn("fixed inset-0 pointer-events-none z-10", className)}
    >
      {isVisible && (
        <svg
          className="w-full h-full"
          viewBox="0 0 50 100"
          preserveAspectRatio="none"
        >
          {/* Línea de fondo (más sutil) */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.15)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Línea principal animada */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.7)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: pathLength,
              strokeDasharray: "2 1",
              strokeDashoffset: 0
            }}
          />
          
          {/* Puntos de conexión en las esquinas */}
          {sections.map((_, index) => {
            const progress = (index + 1) / (sections.length + 1)
            const isLeft = index % 2 === 0
            const x = isLeft ? 5 : 45
            const y = 20 + (progress * 60)
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="1.2"
                fill="hsl(var(--primary))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: pathLength.get() > progress * 0.7 ? 1 : 0,
                  opacity: pathLength.get() > progress * 0.7 ? 1 : 0
                }}
                transition={{ duration: 0.4, delay: progress * 0.5 }}
              >
                {/* Glow interno */}
                <motion.circle
                  cx={0}
                  cy={0}
                  r="2"
                  fill="hsl(var(--primary) / 0.3)"
                  animate={{ 
                    scale: pathLength.get() > progress * 0.7 ? [1, 1.5, 1] : 0,
                    opacity: pathLength.get() > progress * 0.7 ? [0.3, 0.6, 0.3] : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.circle>
            )
          })}
          
          {/* Glow effect más suave */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: pathLength,
              strokeDasharray: "2 1",
              strokeDashoffset: 0,
              filter: "blur(1px)"
            }}
          />
        </svg>
      )}
    </div>
  )
}
