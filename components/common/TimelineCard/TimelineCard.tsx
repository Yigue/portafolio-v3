"use client"

import { ReactNode } from "react"
import CardAnimation from "../SectionAnimation/CardAnimation"

export interface TimelineCardProps {
  children: ReactNode
  year: string
  title: string
  subtitle?: string
  badge?: {
    label: string
    variant: "primary" | "secondary" | "success" | "info"
  }
  index?: number
  className?: string
  enableBeam?: boolean
}

/**
 * TIMELINE CARD - Card genérica para timeline/trayectoria
 * 
 * Combina CardAnimation con un diseño específico para items de timeline.
 * Incluye año, título, subtítulo, badge opcional y efecto de hover.
 */
export default function TimelineCard({
  children,
  year,
  title,
  subtitle,
  badge,
  index = 0,
  className = "",
  enableBeam = true,
}: TimelineCardProps) {
  
  // Estilos de variantes para el badge
  const getBadgeStyles = () => {
    if (!badge) return ""
    
    switch (badge.variant) {
      case "primary":
        return "bg-primary/10 text-primary border-primary/20"
      case "secondary":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "info":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <CardAnimation
      delay={0.2 + index * 0.1}
      enableBeam={enableBeam}
      className={`glass rounded-[20px] p-8 shadow-card border border-border/50 
        hover:shadow-primary-lg hover:border-primary/30 
        transition-all duration-500 group cursor-pointer relative overflow-hidden ${className}`}
    >
      {/* Badge opcional (tipo: formación/experiencia) */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getBadgeStyles()}`}>
            {badge.label}
          </span>
        </div>
      )}

      {/* Contenido de la card */}
      <div className="space-y-3">
        {/* Año */}
        <div className="text-sm text-primary font-semibold tracking-wide uppercase">
          {year}
        </div>
        
        {/* Título */}
        <h4 className="text-2xl font-medium group-hover:text-primary transition-colors leading-tight">
          {title}
        </h4>
        
        {/* Subtítulo (institución/empresa) */}
        {subtitle && (
          <div className="text-base text-muted-foreground font-medium">
            {subtitle}
          </div>
        )}
        
        {/* Contenido personalizado (descripción u otros elementos) */}
        <div className="text-sm text-muted-foreground leading-relaxed pt-2">
          {children}
        </div>
      </div>

      {/* Efecto de glow decorativo en hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </CardAnimation>
  )
}

