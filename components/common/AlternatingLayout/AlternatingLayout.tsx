"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AlternatingLayoutProps {
  children: ReactNode
  position: "left" | "right"
  className?: string
}

/**
 * ALTERNATING LAYOUT
 * Layout que alterna el contenido de lado a lado
 * El TracingBeam ahora es global y se maneja desde ConnectedTracingBeam
 * - position "left": contenido a la izquierda
 * - position "right": contenido a la derecha
 */
export function AlternatingLayout({ 
  children, 
  position,
  className,
}: AlternatingLayoutProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Layout responsive */}
      <div className="relative max-w-7xl mx-auto px-6">
        {children}
      </div>
    </div>
  )
}

export default AlternatingLayout

