"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  [key: string]: any
}) => {
  return (
    <div
      {...otherProps}
      className={cn(
        "relative group/moving-border rounded-[20px] overflow-hidden",
        otherProps.className
      )}
    >
      {/* Fondo animado con gradiente en movimiento */}
      <div className="absolute inset-0 overflow-hidden rounded-[20px]">
        <motion.div
          className="absolute inset-[-10%] opacity-0 group-hover/moving-border:opacity-100 transition-opacity duration-500"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              hsl(var(--primary)) 40deg,
              hsl(var(--primary) / 0.8) 80deg,
              hsl(var(--primary) / 0.4) 160deg,
              transparent 360deg
            )`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: duration / 1000,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>

      {/* Borde decorativo estático */}
      <div className="absolute inset-[1px] rounded-[19px] bg-background" />

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    borderRadius?: string
    borderClassName?: string
    containerClassName?: string
    duration?: number
    as?: any
  }
>(
  (
    {
      borderRadius = "1.75rem",
      children,
      as: Component = "button",
      containerClassName,
      borderClassName,
      duration,
      className,
      ...otherProps
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative text-xl p-[1px] overflow-hidden",
          containerClassName
        )}
        style={{
          borderRadius: borderRadius,
        }}
        {...otherProps}
      >
        <div
          className="absolute inset-0"
          style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
        >
          <MovingBorder duration={duration} rx="30%" ry="30%">
            <div
              className={cn(
                "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--primary)_40%,transparent_60%)]",
                borderClassName
              )}
            />
          </MovingBorder>
        </div>

        <div
          className={cn(
            "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
            className
          )}
          style={{
            borderRadius: `calc(${borderRadius} * 0.96)`,
          }}
        >
          {children}
        </div>
      </Component>
    )
  }
)

Button.displayName = "Button"

