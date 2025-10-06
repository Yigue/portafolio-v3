"use client"

import { useScrollSync } from "@/components/providers/ScrollProvider"
import { useEffect, useState } from "react"

interface SectionTrigger {
  id: string
  isActive: boolean
  progress: number
  isEntering: boolean
  isLeaving: boolean
}

/**
 * useSectionTrigger - Hook para detectar cuando la luz toca cada sección
 * 
 * Detecta cuando la luz del ConnectedLines toca cada sección y activa animaciones
 */
export function useSectionTrigger(sectionId: string, threshold: number = 0.1) {
  const { progress } = useScrollSync()
  const [trigger, setTrigger] = useState<SectionTrigger>({
    id: sectionId,
    isActive: false,
    progress: 0,
    isEntering: false,
    isLeaving: false
  })

  useEffect(() => {
    // Calcular el progreso de la sección específica
    const element = document.getElementById(sectionId)
    if (!element) return

    const rect = element.getBoundingClientRect()
    const sectionStart = (rect.top + window.scrollY) / document.body.scrollHeight
    const sectionEnd = (rect.bottom + window.scrollY) / document.body.scrollHeight
    
    // Calcular el progreso de esta sección específica
    const sectionProgress = progress >= sectionStart 
      ? Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1)
      : 0

    const isActive = sectionProgress >= threshold && sectionProgress <= 1
    const isEntering = sectionProgress >= threshold && sectionProgress < 0.3
    const isLeaving = sectionProgress > 0.7 && sectionProgress <= 1

    setTrigger({
      id: sectionId,
      isActive,
      progress: sectionProgress,
      isEntering,
      isLeaving
    })
  }, [progress, sectionId, threshold])

  return trigger
}

/**
 * useMultipleSectionTriggers - Hook para múltiples secciones
 */
export function useMultipleSectionTriggers(sectionIds: string[], threshold: number = 0.1) {
  const triggers = sectionIds.map(id => useSectionTrigger(id, threshold))
  return triggers
}
