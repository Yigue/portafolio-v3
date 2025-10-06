"use client"

import { useEffect } from "react"

interface LightTriggerEvent {
  sectionId: string
  isActive: boolean
  progress: number
}

/**
 * useLightTrigger - Hook para manejar eventos de la luz
 * 
 * Permite que las secciones escuchen cuando la luz las toca
 */
export function useLightTrigger(sectionId: string, callback: (event: LightTriggerEvent) => void) {
  useEffect(() => {
    const handleLightTrigger = (event: CustomEvent<LightTriggerEvent>) => {
      if (event.detail.sectionId === sectionId) {
        callback(event.detail)
      }
    }

    window.addEventListener('lightTrigger', handleLightTrigger as EventListener)
    return () => window.removeEventListener('lightTrigger', handleLightTrigger as EventListener)
  }, [sectionId, callback])
}

/**
 * triggerLightEvent - Función para emitir eventos de luz
 */
export function triggerLightEvent(sectionId: string, isActive: boolean, progress: number) {
  const event = new CustomEvent('lightTrigger', {
    detail: { sectionId, isActive, progress }
  })
  window.dispatchEvent(event)
}
