"use client";
import React from "react";
import { TracingBeam as TracingBeamRefactored } from "./TracingBeamRefactored";

/**
 * TRACING BEAM COMPONENT (WRAPPER)
 * 
 * Este es el componente original que ahora usa la versión refactorizada.
 * Mantiene la misma API pero internamente usa componentes más pequeños.
 * 
 * COMPONENTES INTERNOS:
 * - useTracingBeam: Hook para lógica de scroll y animaciones
 * - TracingBeamIndicator: Puntos indicadores (inicio y final)
 * - TracingBeamPath: Líneas SVG con gradientes
 * - TracingBeamGradient: Definición del gradiente SVG
 * 
 * FUNCIONALIDADES:
 * - Línea que se dibuja progresivamente según el scroll
 * - Posición izquierda o derecha
 * - Puntos indicadores al inicio y final
 * - Gradiente animado en la línea
 * - Múltiples railes paralelos
 * - Diferentes tipos de curvas
 * - Control de velocidad y posición
 */

export const TracingBeam = ({
  children,
  className,
  position = "left",
  // PROPS SIMPLIFICADAS PARA PERSONALIZACIÓN
  xOffset = 0, // Offset en el eje X (para mover la línea horizontalmente)
  animationSpeed = 1, // Velocidad de la animación (1 = normal, 2 = doble velocidad, 0.5 = mitad)
  syncId, // ID para sincronizar con otros componentes
  indicatorVariant = "filled", // Variante de los indicadores: "filled" | "outline"
}: {
  children: React.ReactNode;
  className?: string;
  position?: "left" | "right";
  // PROPS SIMPLIFICADAS
  xOffset?: number; // Offset horizontal en píxeles
  animationSpeed?: number; // Multiplicador de velocidad
  syncId?: string; // Para sincronización
  indicatorVariant?: "filled" | "outline"; // Variante de los indicadores
}) => {
  // DELEGAMOS AL COMPONENTE REFACTORIZADO
  return (
    <TracingBeamRefactored
      className={className}
      position={position}
      xOffset={xOffset}
      animationSpeed={animationSpeed}
      syncId={syncId}
      indicatorVariant={indicatorVariant}
    >
      {children}
    </TracingBeamRefactored>
  );
};