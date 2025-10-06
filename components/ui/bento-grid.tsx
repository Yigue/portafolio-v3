"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
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

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  delay = 0,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "group/bento relative overflow-hidden rounded-[20px] glass border border-border/50",
        "hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500 cursor-pointer",
        "row-span-1 flex flex-col justify-between space-y-4 p-6",
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
    </motion.div>
  )
}

