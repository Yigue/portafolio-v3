"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ConnectedTracingBeamProps {
  className?: string
  sections?: Array<{
    id: string
    position: "left" | "right"
    progress: number
  }>
}

export function ConnectedTracingBeam({ 
  className,
  sections = [
    { id: "sobre-mí", position: "left", progress: 0.2 },
    { id: "timeline", position: "right", progress: 0.4 },
    { id: "habilidades", position: "left", progress: 0.6 },
    { id: "proyectos", position: "right", progress: 0.8 }
  ]
}: ConnectedTracingBeamProps) {
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

      // Crear path SVG que conecte todas las secciones de forma continua
      // Empezando desde la izquierda y alternando
      let path = "M 8,15" // Punto inicial (izquierda, arriba)
      
      sections.forEach((section, index) => {
        const y = 15 + (section.progress * 70) // Distribuir verticalmente
        const x = section.position === "left" ? 8 : 92 // Alternar posiciones
        
        if (index === 0) {
          // Primera curva hacia la primera sección
          path += ` Q 25,15 50,15`
          path += ` L 50,${y}`
          path += ` Q 25,${y} ${x},${y}`
        } else {
          // Conectar con la sección anterior
          const prevSection = sections[index - 1]
          const prevY = 15 + (prevSection.progress * 70)
          const prevX = prevSection.position === "left" ? 8 : 92
          
          // Línea vertical desde la sección anterior
          path += ` L ${prevX},${y}`
          
          // Curva hacia la nueva posición
          if (prevX !== x) {
            const midX = (prevX + x) / 2
            path += ` Q ${midX},${y} ${x},${y}`
          }
        }
      })
      
      // Línea final hacia abajo
      const lastSection = sections[sections.length - 1]
      const lastY = 15 + (lastSection.progress * 70)
      const lastX = lastSection.position === "left" ? 8 : 92
      
      path += ` L ${lastX},85`
      path += ` Q 50,85 50,85`

      setPathData(path)
      setIsVisible(true)
    }

    calculatePath()
    window.addEventListener('resize', calculatePath)
    
    return () => window.removeEventListener('resize', calculatePath)
  }, [sections])

  return (
    <div 
      ref={containerRef}
      className={cn("fixed inset-0 pointer-events-none z-10", className)}
    >
      {isVisible && (
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Línea de fondo sutil */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.1)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Línea principal animada */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.8)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: pathLength,
              strokeDasharray: "3 2",
              strokeDashoffset: 0
            }}
          />
          
          {/* Puntos de conexión en cada sección */}
          {sections.map((section, index) => {
            const y = 15 + (section.progress * 70)
            const x = section.position === "left" ? 8 : 92
            
            return (
              <motion.g key={section.id}>
                {/* Círculo principal */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: pathLength.get() > section.progress * 0.8 ? 1 : 0,
                    opacity: pathLength.get() > section.progress * 0.8 ? 1 : 0
                  }}
                  transition={{ duration: 0.5, delay: section.progress * 0.3 }}
                />
                
                {/* Glow interno pulsante */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(var(--primary) / 0.3)"
                  animate={{ 
                    scale: pathLength.get() > section.progress * 0.8 ? [1, 1.8, 1] : 0,
                    opacity: pathLength.get() > section.progress * 0.8 ? [0.3, 0.6, 0.3] : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: section.progress * 0.3
                  }}
                />
                
                {/* Indicador de tipo de sección */}
                <motion.rect
                  x={x - 1}
                  y={y - 1}
                  width="2"
                  height="2"
                  fill="hsl(var(--background))"
                  rx="0.5"
                  animate={{ 
                    scale: pathLength.get() > section.progress * 0.8 ? 1 : 0,
                    opacity: pathLength.get() > section.progress * 0.8 ? 1 : 0
                  }}
                  transition={{ duration: 0.3, delay: section.progress * 0.3 + 0.2 }}
                />
              </motion.g>
            )
          })}
          
          {/* Glow effect más suave */}
          <motion.path
            d={pathData}
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: pathLength,
              strokeDasharray: "3 2",
              strokeDashoffset: 0,
              filter: "blur(2px)"
            }}
          />
        </svg>
      )}
    </div>
  )
}
