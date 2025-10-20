"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { TracingBeamGradient } from "./TracingBeamGradient";
import { MotionValue } from "framer-motion";

interface TracingBeamPathProps {
  svgHeight: number;
  isLeft: boolean;
  xOffset: string;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  gradientId?: string;
}

/**
 * TRACING BEAM PATH - Dinámico por segmentos
 *
 * Cambia la forma de la línea SVG a medida que se scrollea:
 * recta → curva → diamante → curva en S.
 * Sincronizado en tiempo real con scrollYProgress.
 */
export function TracingBeamPath({
  svgHeight,
  isLeft,
  xOffset,
  y1,
  y2,
  scrollYProgress,
  gradientId = "gradient",
}: TracingBeamPathProps) {
  const baseX = isLeft ? 1 : 19;
  const adjustedX = baseX + parseFloat(xOffset);

  const [currentPath, setCurrentPath] = useState<string>(
    `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`
  );

  // 🔁 Escuchar scroll en tiempo real
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrentPath(generateSmoothTransitionPath(value));
  });

  // === Generador dinámico ===
  const generateSmoothTransitionPath = (progress: number) => {
    const segment1End = 0.25;
    const segment2End = 0.5;
    const segment3End = 0.75;
    const side = isLeft ? 1 : -1;

    if (progress <= segment1End) {
      // 0–25% → línea recta
      return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`;
    } else if (progress <= segment2End) {
      // 25–50% → transición recta → curva
      const t = (progress - segment1End) / (segment2End - segment1End);
      const curveOffset = 20 * t;
      return `M ${adjustedX} 0 Q ${adjustedX + side * curveOffset} ${
        svgHeight * 0.5
      } ${adjustedX} ${svgHeight}`;
    } else if (progress <= segment3End) {
      // 50–75% → transición curva → diamante
      const t = (progress - segment2End) / (segment3End - segment2End);
      const diamondWidth = 15 * t;
      return `
        M ${adjustedX} 0 
        L ${adjustedX} ${svgHeight * 0.3}
        L ${adjustedX + side * diamondWidth} ${svgHeight * 0.5}
        L ${adjustedX} ${svgHeight * 0.7}
        L ${adjustedX} ${svgHeight}
      `;
    } else {
      // 75–100% → curva en S
      const t = (progress - segment3End) / (1 - segment3End);
      const sOffset = 25 * t;
      return `
        M ${adjustedX} 0 
        Q ${adjustedX + side * sOffset} ${svgHeight * 0.3} ${adjustedX} ${
        svgHeight * 0.6
      }
        Q ${adjustedX - side * sOffset} ${svgHeight * 0.9} ${adjustedX} ${svgHeight}
      `;
    }
  };

  return (
    <svg
      viewBox={`0 0 20 ${svgHeight}`}
      width={"50vw"}
      height={svgHeight}
      className="ml-4 block"
      aria-hidden="true"
    >
      {/* === Línea base estática === */}
      <motion.path
        d={currentPath}
        fill="none"
        stroke="hsl(var(--border))"
        strokeOpacity="0.3"
        strokeWidth="2"
      />

      {/* === Línea animada principal === */}
      <motion.path
        d={currentPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        style={{
          filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))",
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      />

      {/* === Gradiente animado === */}
      <TracingBeamGradient y1={y1} y2={y2} gradientId={gradientId} />
    </svg>
  );
}
