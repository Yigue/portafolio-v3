"use client"

import { ReactNode } from "react"
import { TracingBeam } from "@/components/ui/TracingBeam"
import { cn } from "@/lib/utils"

interface AlternatingLayoutProps {
  children: ReactNode
  position: "left" | "right"
  className?: string
  enableBeam?: boolean
}

/**
 * ALTERNATING LAYOUT
 * Layout que alterna el contenido y el TracingBeam de lado a lado
 * - position "left": contenido a la izquierda, beam a la derecha
 * - position "right": contenido a la derecha, beam a la izquierda
 */
export function AlternatingLayout({ 
  children, 
  position,
  className,
  enableBeam = true,
}: AlternatingLayoutProps) {
  const isLeft = position === "left"
  
  return (
    <div className={cn("relative w-full", className)}>
      {/* En desktop: layout con TracingBeam */}
      <div className="hidden md:block">
        <div className="relative max-w-7xl mx-auto">
          {enableBeam && (
            <TracingBeam position={position} />
          )}
          
          <div className={cn(
            "relative",
            isLeft ? "ml-0 mr-auto" : "ml-auto mr-0",
            "max-w-4xl"
          )}>
            {children}
          </div>
        </div>
      </div>
      
      {/* En mobile: layout estándar sin beam */}
      <div className="block md:hidden">
        <div className="relative max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AlternatingLayout

