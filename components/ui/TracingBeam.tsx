"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
  position = "left",
}: {
  children: React.ReactNode;
  className?: string;
  position?: "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 400,
      damping: 80,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 400,
      damping: 80,
    },
  );

  const isLeft = position === "left"
  const positionClasses = isLeft 
    ? "-left-4 md:-left-20 lg:-left-24" 
    : "-right-4 md:-right-20 lg:-right-24"

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      <div className={cn("absolute top-3", positionClasses)}>
        {/* Punto indicador inicial */}
        <motion.div
          transition={{
            duration: 0.3,
            delay: 0.4,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "0 0 20px hsl(var(--primary) / 0.4)"
                : "0 0 0px hsl(var(--primary) / 0)",
          }}
          className="ml-[27px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg"
        >
          <motion.div
            transition={{
              duration: 0.3,
              delay: 0.4,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "hsl(var(--primary))" : "hsl(var(--background))",
              scale: scrollYProgress.get() > 0 ? 1 : 0.8,
            }}
            className="h-2.5 w-2.5 rounded-full bg-primary"
          />
        </motion.div>

        {/* SVG con la línea trazadora */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Línea base estática (gris) */}
          <motion.path
            d={isLeft 
              ? `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`
              : `M 19 0V -36 l -18 24 V ${svgHeight * 0.8} l 18 24V ${svgHeight}`
            }
            fill="none"
            stroke="hsl(var(--border))"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          
          {/* Línea animada con gradiente (color primario) */}
          <motion.path
            d={isLeft 
              ? `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`
              : `M 19 0V -36 l -18 24 V ${svgHeight * 0.8} l 18 24V ${svgHeight}`
            }
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2.5"
            className="motion-reduce:hidden"
            style={{
              filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))",
            }}
          />
          
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="hsl(var(--primary) / 0)" stopOpacity="0" />
              <stop stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="0.5" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="1" stopColor="hsl(var(--primary) / 0)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>

        {/* Punto indicador final */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
          }}
          className="ml-[27px] -mt-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        </motion.div>
      </div>
      
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
