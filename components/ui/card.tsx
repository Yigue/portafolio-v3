"use client"

import { ReactNode } from "react"
import { CardAnimation } from "@/components/common/SectionAnimation"
import { cn } from "@/lib/utils"

// Tipos de tamaños disponibles para las cards
type CardSize = "sm" | "md" | "lg" | "xl"

// Variantes de estilo para las cards
type CardVariant = "default" | "elevated" | "glass" | "outlined"

interface CardProps {
  children: ReactNode
  className?: string
  size?: CardSize
  variant?: CardVariant
  delay?: number
  hover?: boolean
  onClick?: () => void
}

// Configuración de tamaños
const sizeConfig = {
  sm: "p-4 rounded-lg",
  md: "p-6 rounded-xl", 
  lg: "p-8 rounded-[20px]",
  xl: "p-12 rounded-[24px]"
}

// Configuración de variantes
const variantConfig = {
  default: "bg-card shadow-card border border-border/50",
  elevated: "bg-card shadow-card-lg border border-border/50 hover:shadow-primary-lg",
  glass: "glass shadow-card-lg border border-border/50 hover:shadow-primary-lg",
  outlined: "bg-transparent border-2 border-border hover:border-primary/50"
}

export default function Card({ 
  children, 
  className,
  size = "md",
  variant = "glass",
  delay = 0,
  hover = true,
  onClick
}: CardProps) {
  return (
    <CardAnimation
      delay={delay}
      className={cn(
        // Estilos base
        "transition-all duration-500 group cursor-pointer",
        
        // Tamaño
        sizeConfig[size],
        
        // Variante
        variantConfig[variant],
        
        // Efectos de hover
        hover && "hover:shadow-primary hover:border-primary/30 hover:glow-blue hover-lift",
        
        // Clases personalizadas
        className
      )}
      onClick={onClick}
    >
      {children}
    </CardAnimation>
  )
}

// Componente para el contenido de la card
interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}

// Componente para el header de la card
interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  )
}

// Componente para el título de la card
interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn(
      "text-xl font-medium group-hover:text-primary transition-colors",
      className
    )}>
      {children}
    </h3>
  )
}

// Componente para la descripción de la card
interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn(
      "text-sm text-muted-foreground",
      className
    )}>
      {children}
    </p>
  )
}

// Componente para el footer de la card
interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("pt-4", className)}>
      {children}
    </div>
  )
}
