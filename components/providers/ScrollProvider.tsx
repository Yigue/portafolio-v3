"use client"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import Lenis from "lenis"

// ===== TIPOS DE CONTEXTO =====
interface ScrollContextType {
  progress: number
  lenis: Lenis | null
  isScrolling: boolean
}

// ===== CONTEXTO DE SCROLL =====
const ScrollContext = createContext<ScrollContextType>({
  progress: 0,
  lenis: null,
  isScrolling: false
})

// ===== HOOK PARA USAR EL CONTEXTO =====
export const useScrollProgress = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScrollProgress debe usarse dentro de ScrollProvider')
  }
  return context
}

// ===== PROPS DEL PROVIDER =====
interface ScrollProviderProps {
  children: React.ReactNode
  debug?: boolean
}

/**
 * SCROLL PROVIDER
 * 
 * Proporciona control global de scroll con Lenis:
 * - Progress de scroll (0-1)
 * - Instancia de Lenis para control manual
 * - Estado de scrolling para optimizaciones
 * - Configuración optimizada para performance
 */
export function ScrollProvider({ children, debug = false }: ScrollProviderProps) {
  const [progress, setProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // ===== INICIALIZACIÓN DE LENIS =====
    const lenis = new Lenis({
      duration: 2.5,                    // Más lento para sensación de recorrer página
      easing: (t) => 1 - Math.pow(1 - t, 3), // Easing más suave tipo Lenis
      direction: "vertical",            // Solo scroll vertical
      gestureDirection: "vertical",     // Gestos verticales
      smooth: true,                     // Scroll suave habilitado
      mouseMultiplier: 0.8,            // Reducir sensibilidad del mouse
      smoothTouch: true,               // Habilitar smooth en touch
      touchMultiplier: 1.5,            // Ajustar sensibilidad táctil
      infinite: false,                 // No scroll infinito
    })

    lenisRef.current = lenis

    // ===== LISTENERS DE SCROLL =====
    const handleScroll = ({ progress, velocity }: { progress: number; velocity: number }) => {
      setProgress(progress)
      setIsScrolling(Math.abs(velocity) > 0.1)
      
      if (debug) {
        console.log(`Scroll Progress: ${(progress * 100).toFixed(1)}%`, `Velocity: ${velocity.toFixed(3)}`)
      }
    }

    // ===== RAF LOOP PARA LENIS =====
    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    // ===== CONFIGURACIÓN DE EVENTOS =====
    lenis.on('scroll', handleScroll)
    requestAnimationFrame(raf)

    // ===== CLEANUP =====
    return () => {
      lenis.off('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
    }
  }, [debug])

  // ===== VALOR DEL CONTEXTO =====
  const contextValue: ScrollContextType = {
    progress,
    lenis: lenisRef.current,
    isScrolling
  }

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  )
}

// ===== HOOKS ADICIONALES =====

/**
 * Hook para obtener el progreso de scroll normalizado
 * @param range - Rango de normalización [min, max]
 * @returns Valor normalizado entre 0 y 1
 */
export const useScrollRange = (range: [number, number] = [0, 1]) => {
  const { progress } = useScrollProgress()
  const [min, max] = range
  return Math.min(Math.max((progress - min) / (max - min), 0), 1)
}

/**
 * Hook para detectar si una sección está visible
 * @param sectionId - ID de la sección a monitorear
 * @param threshold - Umbral de visibilidad (0-1)
 * @returns Objeto con estado de visibilidad y progreso
 */
export const useSectionVisibility = (sectionId: string, threshold: number = 0.5) => {
  const { progress } = useScrollProgress()
  const [isVisible, setIsVisible] = useState(false)
  const [sectionProgress, setSectionProgress] = useState(0)

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const updateVisibility = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      // Calcular si la sección está visible
      const visibility = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + elementHeight)
      ))
      
      setIsVisible(visibility >= threshold)
      setSectionProgress(visibility)
    }

    updateVisibility()
    
    // Escuchar cambios de scroll
    const unsubscribe = () => {
      // Lenis ya maneja esto a través del contexto
    }

    return unsubscribe
  }, [sectionId, threshold, progress])

  return { isVisible, progress: sectionProgress }
}
