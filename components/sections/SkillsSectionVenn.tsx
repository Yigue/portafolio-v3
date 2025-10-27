"use client"

import { TextAnimation } from "@/components/common/SectionAnimation"
import { useEffect, useState } from "react"
import VennDiagram from "./SkillsVenn/VennDiagram"

// ===== TIPOS =====
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

// Función para calcular configuración responsive
const getCircleConfig = (): CircleData[] => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024 && window.innerWidth >= 768
  
  const radius = isMobile ? 180 : isTablet ? 220 : 280  // Aumentado para más espacio
  const offsetY = isMobile ? 140 : isTablet ? 180 : 240 // Aumentado para más separación
  const offsetX = isMobile ? 140 : isTablet ? 180 : 240 // Aumentado para más separación
  
  return [
    {
      title: "Desarrollo",
      color: "hsl(252, 75%, 65%)",
      bgColor: "hsl(252, 75%, 15%)",
      glowColor: "hsl(252, 75%, 50%)",
      skills: [".NET", "JavaScript", "React", "Node", "Git", "APIs", "SQL", "OOP"],
      x: -offsetX,
      y: -offsetY,
      radius,
    },
    {
      title: "Cloud / Infraestructura",
      color: "hsl(195, 75%, 60%)",
      bgColor: "hsl(195, 75%, 15%)",
      glowColor: "hsl(195, 75%, 50%)",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux", "Monitoring"],
      x: offsetX,
      y: -offsetY,
      radius,
    },
    {
      title: "Ciberseguridad",
      color: "hsl(340, 70%, 65%)",
      bgColor: "hsl(340, 70%, 15%)",
      glowColor: "hsl(340, 70%, 50%)",
      skills: ["Pentesting", "Networking", "Firewalls", "Vulnerability Analysis", "ISO 27001", "SIEM"],
      x: 0,
      y: offsetY,
      radius,
    },
  ]
}

// ===== COMPONENTE PRINCIPAL =====
export default function SkillsSectionVenn() {
  const [circleConfig, setCircleConfig] = useState<CircleData[]>([])
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })

  // Actualizar configuración basada en tamaño de ventana
  useEffect(() => {
    const updateCircleConfig = () => {
      setCircleConfig(getCircleConfig())
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateCircleConfig()
    window.addEventListener('resize', updateCircleConfig)
    return () => window.removeEventListener('resize', updateCircleConfig)
  }, [])

  return (
    <section
      id="habilidades"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Título */}
        <TextAnimation delay={0.2}>
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Mis Habilidades
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un enfoque integral: desarrollo, infraestructura y seguridad
            </p>
          </div>
        </TextAnimation>

        {/* Diagrama de Venn */}
        {circleConfig.length > 0 && (
          <VennDiagram circleConfig={circleConfig} windowSize={windowSize} />
        )}
      </div>
    </section>
  )
}
