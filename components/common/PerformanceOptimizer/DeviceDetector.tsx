/**
 * DEVICE DETECTOR - Detector de capacidades del dispositivo
 * 
 * Detecta las capacidades del dispositivo para aplicar optimizaciones apropiadas
 */

export interface DeviceInfo {
  memory: number
  cores: number
  isSlowConnection: boolean
  isLowEnd: boolean
  isVeryLowEnd: boolean
}

export class DeviceDetector {
  /**
   * Obtiene información detallada del dispositivo
   */
  static getDeviceInfo(): DeviceInfo {
    const memory = (navigator as any).deviceMemory || 4 // Fallback a 4GB
    const cores = navigator.hardwareConcurrency || 4
    const connection = (navigator as any).connection
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
    
    return {
      memory,
      cores,
      isSlowConnection,
      isLowEnd: memory <= 2 || cores <= 2,
      isVeryLowEnd: memory <= 1 || cores <= 1
    }
  }

  /**
   * Verifica si el dispositivo soporta animaciones complejas
   */
  static supportsComplexAnimations(deviceInfo: DeviceInfo): boolean {
    return !deviceInfo.isVeryLowEnd && !deviceInfo.isSlowConnection
  }

  /**
   * Verifica si el dispositivo soporta efectos de blur
   */
  static supportsBlurEffects(deviceInfo: DeviceInfo): boolean {
    return !deviceInfo.isLowEnd
  }

  /**
   * Obtiene el nivel de optimización recomendado
   */
  static getOptimizationLevel(deviceInfo: DeviceInfo): 'low' | 'medium' | 'high' {
    if (deviceInfo.isVeryLowEnd) return 'low'
    if (deviceInfo.isLowEnd) return 'medium'
    return 'high'
  }
}
