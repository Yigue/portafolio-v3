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
  
  // Radios en rem
  const radius = isMobile ? 12 : isTablet ? 14 : 17.5  // ~280px en rem (17.5rem)
  
  // Separación más amplia para hacer el centro más grande
  // Los dos círculos superiores estarán más arriba y separados
  const offsetY = isMobile ? 10 : isTablet ? 11.5 : 14  // rem
  const offsetX = isMobile ? 11 : isTablet ? 12.5 : 15  // rem - más separación horizontal
  
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
      y: offsetY * 1.2, // Más abajo para dejar más espacio en el centro
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
          <div className="relative" style={{ aspectRatio: '1/1', maxWidth: 'min(100%, 90vw)', margin: '0 auto' }}>
            <VennDiagram circleConfig={circleConfig} windowSize={windowSize} />
          </div>
        )}
      </div>
    </section>
  )
}
