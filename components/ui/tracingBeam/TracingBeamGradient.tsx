"use client";
import { motion, MotionValue } from "framer-motion";

/**
 * COMPONENTE DE GRADIENTE PARA TRACING BEAM
 * 
 * Este componente maneja la definición del gradiente SVG
 * que se usa en la línea animada del TracingBeam.
 * 
 * PROPS:
 * - y1, y2: Posiciones del gradiente que se animan
 * - gradientId: ID único para el gradiente (para evitar conflictos)
 */
interface TracingBeamGradientProps {
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  gradientId?: string;
}

export function TracingBeamGradient({ 
  y1, 
  y2, 
  gradientId = "gradient" 
}: TracingBeamGradientProps) {
  return (
    <defs>
      <motion.linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1="0"
        x2="0"
        y1={y1} // Posición inicial del gradiente (se mueve con el scroll)
        y2={y2} // Posición final del gradiente (se mueve con el scroll)
      >
        {/* PUNTOS DEL GRADIENTE */}
        <stop stopColor="hsl(var(--primary) / 0)" stopOpacity="0" /> {/* Inicio transparente */}
        <stop stopColor="hsl(var(--primary))" stopOpacity="1" /> {/* Medio opaco */}
        <stop offset="0.5" stopColor="hsl(var(--primary))" stopOpacity="1" /> {/* Centro opaco */}
        <stop offset="1" stopColor="hsl(var(--primary) / 0)" stopOpacity="0" /> {/* Final transparente */}
      </motion.linearGradient>
    </defs>
  );
}
