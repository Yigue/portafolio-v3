"use client"

import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import SkillCircle from "./SkillCircle"

interface CircleData {
  title: string
  color: string
  bgColor: string
  glowColor: string
  skills: string[]
  x: number
  y: number
  radius: number
}

interface VennDiagramProps {
  circleConfig: CircleData[]
  windowSize: { width: number; height: number }
}

export default function VennDiagram({ circleConfig, windowSize }: VennDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Mouse tracking para efectos interactivos
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full my-12 md:my-16"
      style={{ 
        height: windowSize.width < 768 ? "1000px" : windowSize.width < 1024 ? "1300px" : "1500px",
        minHeight: windowSize.width < 768 ? "900px" : "1200px"
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Contenedor de círculos */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible px-4">
        {circleConfig.length > 0 && circleConfig.map((circle, index) => (
          <SkillCircle
            key={index}
            circle={circle}
            index={index}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* Texto central con pulso */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Glow de fondo */}
        <motion.div
          className="absolute inset-0 blur-2xl md:blur-3xl -z-10"
          style={{
            background: "linear-gradient(135deg, #6b5bff, #18b2f0, #f05b8e)",
            opacity: 0.25,
            borderRadius: "50%",
            width: windowSize.width < 768 ? "250px" : "350px",
            height: windowSize.width < 768 ? "250px" : "350px",
            marginLeft: windowSize.width < 768 ? "-125px" : "-175px",
            marginTop: windowSize.width < 768 ? "-125px" : "-175px",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Texto principal */}
        <div className="relative z-50 space-y-1.5 md:space-y-2 px-4">
          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-pink-400 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 30px rgba(107, 91, 255, 0.6)",
            }}
          >
            DevOps Engineer
          </motion.h3>
          <motion.p
            className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Backend Developer / Consultant
          </motion.p>
        </div>

        {/* Pulso adicional */}
        <motion.div
          className="absolute inset-0 border-2 rounded-full"
          style={{
            borderColor: "hsl(252, 75%, 65%)",
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  )
}

