/**
 * ANIMATION UTILS - Utilidades para animaciones
 * 
 * Funciones helper para configuraciones de animación comunes
 */

export type AnimationDirection = "up" | "down" | "left" | "right" | "scale" | "fade" | "slide"

/**
 * Obtiene la configuración inicial de animación basada en la dirección
 */
export function getInitialAnimation(direction: AnimationDirection) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: 60, scale: 0.95 }
    case "down":
      return { opacity: 0, y: -60, scale: 0.95 }
    case "left":
      return { opacity: 0, x: 60, scale: 0.95 }
    case "right":
      return { opacity: 0, x: -60, scale: 0.95 }
    case "scale":
      return { opacity: 0, scale: 0.8 }
    case "fade":
      return { opacity: 0 }
    case "slide":
      return { opacity: 0, x: 100, scale: 0.9 }
    default:
      return { opacity: 0, y: 60, scale: 0.95 }
  }
}

/**
 * Obtiene la configuración final de animación
 */
export function getAnimateAnimation() {
  return { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    scale: 1 
  }
}

/**
 * Configuración de easing estilo Apple
 */
export const APPLE_EASING = [0.25, 0.46, 0.45, 0.94] as const

/**
 * Configuración de spring para animaciones suaves
 */
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20
} as const
