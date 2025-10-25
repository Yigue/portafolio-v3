"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTracingBeam } from "@/lib/hooks/useTracingBeam";
import { TracingBeamIndicator } from "./TracingBeamIndicator";
import { TracingBeamPath } from "./TracingBeamPath";

/**
 * TRACING BEAM COMPONENT (REFACTORIZADO)
 * 
 * Este componente ha sido descompuesto en varios componentes más pequeños:
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
  
  // USAMOS NUESTRO HOOK PERSONALIZADO
  const {
    ref,
    contentRef,
    scrollYProgress,
    svgHeight,
    y1,
    y2,
  } = useTracingBeam({ animationSpeed, syncId });

  // LÓGICA DE POSICIONAMIENTO
  const isLeft = position === "left"
  
  // CLASES CSS PARA POSICIONAR LA LÍNEA
  // Estas clases mueven la línea hacia la izquierda o derecha
  const positionClasses = isLeft 
    ? "-left-4 md:-left-20 lg:-left-24" 
    : "-right-4 md:-right-20 lg:-left-24"

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      {/* CONTENEDOR DE LA LÍNEA TRACING BEAM */}

        {/* PUNTO INDICADOR INICIAL */}
        <TracingBeamIndicator 
          type="start" 
          scrollYProgress={scrollYProgress}
          variant={indicatorVariant}
        />

        {/* SVG CON LA LÍNEA TRAZADORA CON CONTROL POR SCROLL */}
        <TracingBeamPath
          svgHeight={svgHeight}
          y1={y1}
          y2={y2}
          scrollYProgress={scrollYProgress}
        />

        {/* PUNTO INDICADOR FINAL */}
        <TracingBeamIndicator 
          type="end" 
          scrollYProgress={scrollYProgress}
          variant={indicatorVariant}
        />
     
      {/* CONTENIDO DEL COMPONENTE */}
      {/* Aquí va el contenido que envuelve el TracingBeam */}
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
