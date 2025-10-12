"use client"

import { cn } from "@/lib/utils"
import { CardAnimation } from "@/components/common/SectionAnimation"
import { ReactNode } from "react"

interface BentoGridProps {
  className?: string
  children?: ReactNode
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoGridItemProps {
  className?: string
  title?: string | ReactNode
  description?: string | ReactNode
  header?: ReactNode
  icon?: ReactNode
  delay?: number
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  delay = 0,
}: BentoGridItemProps) => {
  return (
    <CardAnimation
      delay={delay}
      enableBeam={true}
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 p-6",
        className
      )}
    >
      {/* Header/Icono */}
      {header && (
        <div className="relative overflow-hidden rounded-xl">
          {header}
        </div>
      )}

      {/* Contenido */}
      <div className="group-hover/bento:translate-x-2 transition duration-200 space-y-2">
        {/* Icono decorativo */}
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover/bento:bg-primary/20 transition-colors">
            {icon}
          </div>
        )}

        {/* Título */}
        <div className="font-medium text-xl group-hover/bento:text-primary transition-colors">
          {title}
        </div>

        {/* Descripción */}
        <div className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </div>
      </div>

      {/* Efecto de glow decorativo */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
    </CardAnimation>
  )
}

