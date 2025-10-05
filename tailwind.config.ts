import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ===== COLORES PERSONALIZADOS =====
      // Paleta inspirada en Apple/Lenis para efectos cinemáticos
      colors: {
        // Colores base para el tema
        bone: '#F4F1EA',        // Color cálido para fondos claros
        graphite: '#0B0C10',    // Gris muy oscuro para fondos
        ink: '#0F1115',         // Negro profundo para contraste
        accent: '#0A84FF',      // Azul iOS para acentos y glows
        
        // Colores del sistema de diseño existente
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Colores para el sistema de railes
        rail: "hsl(var(--rail))",
        "rail-active": "hsl(var(--rail-active))",
      },
      
      // ===== SOMBRAS PERSONALIZADAS =====
      // Sistema de sombras multicapa para profundidad visual
      boxShadow: {
        // Sombras suaves para elementos sutiles
        'soft-1': '0 1px 2px rgba(0,0,0,.08)',
        'soft-2': '0 4px 12px rgba(0,0,0,.12)',
        'soft-3': '0 16px 48px rgba(0,0,0,.16)',
        
        // Sombras para cards con elevación
        'card': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'card-lg': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        
        // Sombras con colores para efectos de glow
        'primary': '0 4px 8px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(59, 130, 246, 0.1)',
        'primary-lg': '0 8px 16px rgba(59, 130, 246, 0.2), 0 4px 8px rgba(59, 130, 246, 0.15)',
        
        // Sombras estilo Apple
        'apple-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        
        // Efectos de glow para elementos interactivos
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-blue-strong': '0 0 40px rgba(59, 130, 246, 0.4)',
      },
      
      // ===== ANIMACIONES PERSONALIZADAS =====
      animation: {
        // Animación de flotación para elementos sutiles
        'float': 'float 3s ease-in-out infinite',
        // Animación de pulso para elementos activos
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // Animación de entrada suave
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
      },
      
      // ===== KEYFRAMES PERSONALIZADOS =====
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        'fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
      },
      
      // ===== TIPOGRAFÍA =====
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      
      // ===== ESPACIADO PERSONALIZADO =====
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // ===== BORDES REDONDEADOS =====
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // ===== BLUR PERSONALIZADO =====
      blur: {
        '4xl': '72px',
        '5xl': '96px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
