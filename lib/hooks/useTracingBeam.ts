"use client";
import { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, useSpring } from "framer-motion";

/**
 * HOOK PERSONALIZADO PARA TRACING BEAM
 * 
 * Este hook maneja toda la lógica de scroll, animaciones y cálculos
 * necesarios para el funcionamiento del TracingBeam.
 * 
 * FUNCIONALIDADES:
 * - Detección de scroll con Framer Motion
 * - Cálculo de altura del contenido
 * - Animaciones de spring para suavizar el movimiento
 * - Control de velocidad de animación
 */
export function useTracingBeam({
  animationSpeed = 1,
  syncId,
}: {
  animationSpeed?: number;
  syncId?: string;
} = {}) {
  // REFERENCIAS PARA EL SCROLL Y CONTENIDO
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // HOOK DE SCROLL DE FRAMER MOTION
  // Este hook detecta qué tan lejos ha scrolleado el usuario en este componente
  const { scrollYProgress } = useScroll({
    target: ref, // El elemento que estamos observando
    offset: ["start center", "end center"], // Cuándo empezar y terminar la animación
  });

  // ESTADO PARA LA ALTURA DEL SVG
  const [svgHeight, setSvgHeight] = useState(0);

  // EFECTO PARA CALCULAR LA ALTURA DEL CONTENIDO
  // Esto es necesario para saber qué tan larga debe ser la línea SVG
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // ANIMACIONES DE SPRING PARA SUAVIZAR EL MOVIMIENTO
  // y1: Posición inicial del gradiente (se mueve más rápido)
  // y2: Posición final del gradiente (se mueve más lento)
  // stiffness: Rigidez del spring (400 = bastante rígido)
  // damping: Amortiguación (80 = buena amortiguación)
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 400 * animationSpeed, // Multiplicamos por la velocidad
      damping: 80,
    },
  );
  
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 400 * animationSpeed,
      damping: 80,
    },
  );

  return {
    ref,
    contentRef,
    scrollYProgress,
    svgHeight,
    y1,
    y2,
  };
}
