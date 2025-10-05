"use client"

import { useScrollProgress } from "@/components/providers/ScrollProvider"

/**
 * HOOK DE SINCRONIZACIÓN DE SCROLL
 * 
 * Proporciona utilidades para sincronizar componentes con Lenis
 */
export function useScrollSync() {
  const { progress, isScrolling, scrollY, lenis } = useScrollProgress()

  /**
   * Calcula el progreso de una sección específica
   */
  const getSectionProgress = (sectionIndex: number, totalSections: number) => {
    const sectionStart = sectionIndex / totalSections
    const sectionEnd = (sectionIndex + 1) / totalSections
    
    if (progress < sectionStart) return 0
    if (progress > sectionEnd) return 1
    
    return (progress - sectionStart) / (sectionEnd - sectionStart)
  }

  /**
   * Calcula la opacidad basada en el progreso
   */
  const getOpacity = (start: number, end: number, fadeIn: number = 0.2, fadeOut: number = 0.8) => {
    if (progress < start) return 0
    if (progress > end) return 0
    if (progress < start + fadeIn) return (progress - start) / fadeIn
    if (progress > end - fadeOut) return (end - progress) / fadeOut
    return 1
  }

  /**
   * Calcula la escala basada en el progreso
   */
  const getScale = (start: number, end: number, minScale: number = 0.8, maxScale: number = 1) => {
    if (progress < start) return minScale
    if (progress > end) return maxScale
    
    const sectionProgress = (progress - start) / (end - start)
    return minScale + (maxScale - minScale) * sectionProgress
  }

  /**
   * Calcula la posición Y para efectos de parallax
   */
  const getParallaxY = (strength: number = 50, direction: 'up' | 'down' = 'up') => {
    const offset = progress * strength
    return direction === 'up' ? -offset : offset
  }

  /**
   * Navega a una sección usando Lenis
   */
  const scrollToSection = (sectionId: string, offset: number = 0) => {
    if (lenis) {
      const element = document.getElementById(sectionId)
      if (element) {
        lenis.scrollTo(element, { offset })
      }
    }
  }

  /**
   * Navega a una posición específica usando Lenis
   */
  const scrollToPosition = (position: number) => {
    if (lenis) {
      lenis.scrollTo(position)
    }
  }

  return {
    progress,
    isScrolling,
    scrollY,
    lenis,
    getSectionProgress,
    getOpacity,
    getScale,
    getParallaxY,
    scrollToSection,
    scrollToPosition
  }
}
