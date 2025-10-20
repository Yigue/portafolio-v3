"use client";
import { motion, MotionValue } from "framer-motion";

/**
 * COMPONENTE DE PUNTO INDICADOR
 * 
 * Este componente renderiza los puntos indicadores del TracingBeam.
 * Puede ser el punto inicial o final, con diferentes comportamientos.
 * 
 * PROPS:
 * - type: "start" | "end" - Tipo de indicador
 * - scrollYProgress: Progreso del scroll para animaciones
 * - className: Clases CSS adicionales
 */
interface TracingBeamIndicatorProps {
  type: "start" | "end";
  scrollYProgress: MotionValue<number>;
  className?: string;
  variant?: "filled" | "outline"; // Nueva prop para variante del círculo
}

export function TracingBeamIndicator({ 
  type, 
  scrollYProgress, 
  className,
  variant = "filled"
}: TracingBeamIndicatorProps) {
  const isStart = type === "start";
  
  // ANIMACIONES ESPECÍFICAS PARA CADA TIPO
  const startAnimations = {
    transition: {
      duration: 0.3,
      delay: 0.4,
    },
    animate: {
      // Sombra que aparece cuando hay scroll
      boxShadow:
        scrollYProgress.get() > 0
          ? "0 0 20px hsl(var(--primary) / 0.4)" // Sombra visible
          : "0 0 0px hsl(var(--primary) / 0)", // Sin sombra
    },
  };

  const endAnimations = {
    style: {
      // Se hace visible gradualmente cuando el scroll llega al 80%
      opacity: scrollYProgress.get() > 0.8 ? 1 : 0,
    },
  };

  // RENDERIZADO CONDICIONAL SEGÚN LA VARIANTE
  if (variant === "outline") {
    return (
      <motion.div
        {...(isStart ? startAnimations : endAnimations)}
        className={`ml-[27px] flex h-5 w-5 items-center justify-center ${
          isStart ? "" : "-mt-2"
        } ${className || ""}`}
      >
        {/* CÍRCULO DE CONTORNO SVG */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="absolute"
          transition={{
            duration: 0.3,
            delay: 0.4,
          }}
          animate={{
            strokeOpacity: isStart 
              ? (scrollYProgress.get() > 0 ? 1 : 0.3)
              : (scrollYProgress.get() > 0.8 ? 1 : 0),
            scale: isStart 
              ? (scrollYProgress.get() > 0 ? 1 : 0.8) 
              : 1,
          }}
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className={!isStart ? "animate-pulse" : ""}
          />
        </motion.svg>
      </motion.div>
    );
  }

  // VARIANTE FILLED (comportamiento original)
  return (
    <motion.div
      {...(isStart ? startAnimations : endAnimations)}
      className={`ml-[27px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg ${
        isStart ? "" : "-mt-2"
      } ${className || ""}`}
    >
      {/* PUNTO INTERIOR DEL INDICADOR */}
      <motion.div
        transition={{
          duration: 0.3,
          delay: 0.4,
        }}
        animate={{
          // Cambia de color y escala según el scroll (solo para el punto inicial)
          backgroundColor: isStart 
            ? (scrollYProgress.get() > 0 ? "hsl(var(--primary))" : "hsl(var(--background))")
            : "hsl(var(--primary))",
          scale: isStart 
            ? (scrollYProgress.get() > 0 ? 1 : 0.8) 
            : 1,
        }}
        className={`h-2.5 w-2.5 rounded-full bg-primary ${
          !isStart ? "animate-pulse" : ""
        }`}
      />
    </motion.div>
  );
}
