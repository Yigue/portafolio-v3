"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import SkillTag from "./SkillTag"

interface SkillTagData {
  label: string
  angle: number
  distance: number
}

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

interface SkillCircleProps {
  circle: CircleData
  index: number
  mouseX: any
  mouseY: any
}

export default function SkillCircle({ circle, index, mouseX, mouseY }: SkillCircleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Calcular distancia del mouse al centro del círculo
  const dx = useTransform(mouseX, (latest: number) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    return latest - centerX
  })

  const dy = useTransform(mouseY, (latest: number) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    return latest - centerY
  })

  const distance = useTransform([dx, dy], ([latestDx, latestDy]: number[]) => {
    return Math.sqrt(latestDx ** 2 + latestDy ** 2)
  })

  const glowOpacity = useTransform(distance, [0, 200], [0.8, 0.2])
  const glowOpacitySpring = useSpring(glowOpacity, { damping: 20, stiffness: 300 })

  // Generar posiciones para las etiquetas evitando COMPLETAMENTE el centro
  const generateTags = (skills: string[]): SkillTagData[] => {
    const tags: SkillTagData[] = []
    const total = skills.length
    const angleStep = 360 / total
    
    // SOLO usar anillos externos para evitar el centro por completo
    const outerRadius = circle.radius * 0.92  // Anillo exterior (92% del radio)
    const middleRadius = circle.radius * 0.75 // Anillo medio (75% del radio)
    // NO usar anillo interno para evitar completamente el centro
    
    // Área libre alrededor del centro (40% del radio central)
    const minRadius = circle.radius * 0.40
    
    skills.forEach((skill, idx) => {
      // Solo usar 2 anillos exteriores
      let radius = idx % 2 === 0 ? outerRadius : middleRadius
      
      // Asegurar que NUNCA entre en el área central
      if (radius < minRadius) {
        radius = minRadius
      }
      
      // Cada círculo rota diferente para evitar alineamiento
      const angleOffset = index * 40 + (index % 2) * 20
      const baseAngle = idx * angleStep + angleOffset
      
      tags.push({
        label: skill,
        angle: baseAngle,
        distance: radius,
      })
    })

    return tags
  }

  const tags = generateTags(circle.skills)

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        width: `${circle.radius * 2}px`,
        height: `${circle.radius * 2}px`,
        left: `calc(50% + ${circle.x}px - ${circle.radius}px)`,
        top: `calc(50% + ${circle.y}px - ${circle.radius}px)`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Círculo con gradiente */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${circle.bgColor}50, ${circle.bgColor}30 40%, ${circle.bgColor}20 70%, ${circle.bgColor}10)`,
          border: `2px solid ${circle.color}`,
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? `0 0 40px ${circle.glowColor}, 0 0 80px ${circle.glowColor}40`
            : `0 0 20px ${circle.glowColor}30`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow animado */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${circle.glowColor}30, transparent 70%)`,
          filter: "blur(20px)",
          opacity: glowOpacitySpring,
        }}
        animate={{
          opacity: isHovered ? 0.6 : undefined,
        }}
      />

      {/* Pulso periódico */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${circle.color}`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 1.3,
        }}
      />

      {/* Etiquetas de habilidades */}
      {tags.map((tag, idx) => (
        <SkillTag 
          key={idx} 
          label={tag.label}
          angle={tag.angle}
          distance={tag.distance}
          delay={index * 300 + idx * 100} 
        />
      ))}

      {/* Título del círculo */}
      <motion.div
        className="absolute top-[-25px] md:top-[-30px] left-1/2 -translate-x-1/2 text-center px-2 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0.9,
          y: isHovered ? -2 : 0,
        }}
      >
        <div 
          className="text-sm md:text-base font-bold whitespace-nowrap"
          style={{ color: circle.color }}
        >
          {circle.title}
        </div>
      </motion.div>
    </motion.div>
  )
}

