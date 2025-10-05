import { DeviceInfo } from "./DeviceDetector"

/**
 * ANIMATION OPTIMIZER - Optimizador de animaciones
 * 
 * Aplica optimizaciones específicas a las animaciones basadas en el dispositivo
 */
export class AnimationOptimizer {
  /**
   * Aplica optimizaciones de animación basadas en el dispositivo
   */
  static optimize(deviceInfo: DeviceInfo, prefersReducedMotion: boolean): void {
    const root = document.documentElement

    if (prefersReducedMotion) {
      this.applyReducedMotionSettings(root)
    } else if (deviceInfo.isVeryLowEnd) {
      this.applyLowEndSettings(root)
    } else if (deviceInfo.isLowEnd) {
      this.applyMediumEndSettings(root)
    } else {
      this.applyHighEndSettings(root)
    }
  }

  /**
   * Configuración para usuarios que prefieren movimiento reducido
   */
  private static applyReducedMotionSettings(root: HTMLElement): void {
    root.style.setProperty('--animation-duration', '0.1s')
    root.style.setProperty('--transition-duration', '0.1s')
    root.style.setProperty('--blur-intensity', '2px')
    root.style.setProperty('--glow-intensity', '0.1')
  }

  /**
   * Configuración para dispositivos de muy bajo rendimiento
   */
  private static applyLowEndSettings(root: HTMLElement): void {
    root.style.setProperty('--animation-duration', '0.3s')
    root.style.setProperty('--transition-duration', '0.2s')
    root.style.setProperty('--blur-intensity', '3px')
    root.style.setProperty('--glow-intensity', '0.15')
    root.style.setProperty('--parallax-strength', '0.2')
  }

  /**
   * Configuración para dispositivos de rendimiento medio
   */
  private static applyMediumEndSettings(root: HTMLElement): void {
    root.style.setProperty('--animation-duration', '0.5s')
    root.style.setProperty('--transition-duration', '0.3s')
    root.style.setProperty('--blur-intensity', '5px')
    root.style.setProperty('--glow-intensity', '0.2')
    root.style.setProperty('--parallax-strength', '0.3')
  }

  /**
   * Configuración para dispositivos de alto rendimiento
   */
  private static applyHighEndSettings(root: HTMLElement): void {
    root.style.setProperty('--animation-duration', '0.8s')
    root.style.setProperty('--transition-duration', '0.5s')
    root.style.setProperty('--blur-intensity', '8px')
    root.style.setProperty('--glow-intensity', '0.3')
    root.style.setProperty('--parallax-strength', '0.5')
  }
}
