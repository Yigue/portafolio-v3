"use client"

import { useScrollSync } from "@/lib/hooks/useScrollSync"

interface ScrollControllerProps {
  children: React.ReactNode
  debug?: boolean
}

/**
 * SCROLL CONTROLLER - Control centralizado de scroll
 * 
 * Proporciona utilidades de scroll para componentes hijos
 */
export default function ScrollController({ children, debug = false }: ScrollControllerProps) {
  const { progress, isScrolling, lenis } = useScrollSync()

  if (debug) {
    console.log('🎛️ Scroll Controller:', {
      progress: (progress * 100).toFixed(1) + '%',
      isScrolling,
      lenisAvailable: !!lenis
    })
  }

  return <>{children}</>
}
