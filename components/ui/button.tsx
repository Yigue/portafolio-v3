import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Configuración de variantes del botón con estilos mejorados
const buttonVariants = cva(
  // Estilos base del botón
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Botón principal con efectos de glow
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-primary-lg hover:glow-blue rounded-full",
        
        // Botón destructivo para acciones peligrosas
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-card hover:shadow-destructive/20 rounded-full",
        
        // Botón outline con efecto glass
        outline: "border bg-transparent glass hover:bg-primary/10 hover:border-primary/50 hover:shadow-primary rounded-full",
        
        // Botón secundario
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card hover:shadow-primary rounded-full",
        
        // Botón ghost para acciones sutiles
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-full",
        
        // Botón de enlace
        link: "text-primary underline-offset-4 hover:underline",
        
        // Botón con efecto glassmorphism
        glass: "glass border border-border/50 hover:border-primary/50 hover:shadow-primary-lg hover:glow-blue rounded-full",
        
        // Botón con gradiente
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-card hover:shadow-primary-lg hover:glow-blue rounded-full",
      },
      size: {
        // Tamaño pequeño
        sm: "h-8 rounded-full gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        
        // Tamaño por defecto
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        
        // Tamaño grande
        lg: "h-12 rounded-full px-8 text-base has-[>svg]:px-4",
        
        // Tamaño extra grande
        xl: "h-14 rounded-full px-10 text-lg has-[>svg]:px-6",
        
        // Botón solo con icono pequeño
        "icon-sm": "size-8 rounded-full",
        
        // Botón solo con icono
        icon: "size-9 rounded-full",
        
        // Botón solo con icono grande
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Props del botón con funcionalidades adicionales
interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {/* Icono de carga */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Icono izquierdo */}
      {!loading && leftIcon && leftIcon}
      
      {/* Contenido del botón */}
      {children}
      
      {/* Icono derecho */}
      {!loading && rightIcon && rightIcon}
    </Comp>
  )
}

export { Button, buttonVariants }
