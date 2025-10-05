# 📚 Documentación del Portafolio v3

## 🎯 Descripción General

Portafolio personal con diseño inspirado en Apple y Lenis, implementando un sistema de scroll suave con efectos visuales dinámicos y animaciones sincronizadas.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas
```
portafolio-v3/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout principal con providers
│   └── page.tsx                 # Página principal del portafolio
├── components/                   # Componentes React
│   ├── common/                  # Componentes de efectos y utilidades
│   ├── layout/                  # Componentes de layout (Header, Footer)
│   ├── providers/               # Context providers
│   ├── sections/                # Secciones del portafolio
│   └── ui/                      # Componentes de interfaz reutilizables
├── lib/                         # Utilidades y helpers
└── public/                      # Archivos estáticos
```

## 🔧 Componentes Principales

### 1. ScrollProvider (`components/providers/ScrollProvider.tsx`)
**Propósito**: Control global del scroll usando Lenis y React Context.

**Características**:
- Instancia única de Lenis para toda la aplicación
- Progreso de scroll normalizado (0-1)
- Estado de scroll activo
- Hooks personalizados para componentes

**API**:
```typescript
interface ScrollContextType {
  progress: number        // Progreso de scroll (0-1)
  isScrolling: boolean   // Estado de scroll activo
  scrollY: number        // Posición Y del scroll
  lenis: Lenis | null    // Instancia de Lenis
  useScrollRange: (start: number, end: number) => number
  useSectionVisibility: (sectionId: string) => boolean
}
```

### 2. LightRails (`components/common/LightRails.tsx`)
**Propósito**: Sistema de railes de luz vertical que se llenan con el scroll.

**Características**:
- Rail principal que crece con el progreso
- Puntos de luz para cada sección
- Efectos de glow dinámicos
- Animaciones sincronizadas con scroll

**Props**:
```typescript
interface LightRailsProps {
  sections: string[]    // IDs de las secciones
  debug?: boolean       // Modo debug
}
```

### 3. ConnectingLines (`components/common/ConnectingLines.tsx`)
**Propósito**: Líneas SVG animadas que conectan visualmente las secciones.

**Características**:
- Cálculo dinámico de rutas SVG
- Animación de pathLength
- Flechas que siguen las líneas
- Efectos de glow en las líneas

**Props**:
```typescript
interface ConnectingLinesProps {
  sections: string[]    // IDs de las secciones
  debug?: boolean       // Modo debug
}
```

### 4. RailGlow (`components/common/RailGlow.tsx`)
**Propósito**: Efecto de iluminación dinámico del rail principal.

**Características**:
- Glow que sigue el progreso del scroll
- Gradiente vertical dinámico
- Efecto de pulso durante scroll activo
- Optimizado para performance

**Props**:
```typescript
interface RailGlowProps {
  sections: string[]    // IDs de las secciones
  debug?: boolean       // Modo debug
}
```

### 5. SectionAnimation (`components/common/SectionAnimation.tsx`)
**Propósito**: Componente de animación para secciones con múltiples variantes.

**Características**:
- Múltiples direcciones de animación
- Efecto parallax opcional
- Soporte para stagger
- Detección de visibilidad

**Props**:
```typescript
interface SectionAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade" | "slide"
  duration?: number
  parallax?: boolean
  parallaxStrength?: number
  stagger?: boolean
  staggerDelay?: number
}
```

### 6. BackgroundEffects (`components/common/BackgroundEffects.tsx`)
**Propósito**: Efectos de fondo dinámicos con múltiples capas de glow.

**Características**:
- Glow inferior dinámico
- Glow superior
- Glows laterales con movimiento
- Opacidad y escala basadas en scroll

### 7. PerformanceOptimizer (`components/common/PerformanceOptimizer.tsx`)
**Propósito**: Optimización automática basada en capacidades del dispositivo.

**Características**:
- Detección de memoria y CPU
- Optimización para dispositivos de bajo rendimiento
- Soporte para `prefers-reduced-motion`
- Throttling inteligente de scroll

**Props**:
```typescript
interface PerformanceOptimizerProps {
  debug?: boolean       // Modo debug
}
```

## 🎨 Sistema de Diseño

### Colores Personalizados
```css
:root {
  --primary: 210 100% 50%;           /* Azul principal */
  --primary-foreground: 0 0% 98%;    /* Blanco */
  --secondary: 210 40% 98%;          /* Gris claro */
  --accent: 210 100% 50%;            /* Azul de acento */
  --rail: 210 20% 20%;               /* Gris oscuro para rail */
  --rail-active: 210 100% 50%;       /* Azul para rail activo */
}
```

### Sombras Personalizadas
```css
:root {
  --shadow-card: 0 1px 2px rgba(0,0,0,.08);
  --shadow-card-lg: 0 4px 12px rgba(0,0,0,.12);
  --shadow-primary: 0 0 20px hsl(var(--primary) / 0.3);
  --shadow-primary-lg: 0 0 40px hsl(var(--primary) / 0.4);
}
```

### Animaciones
- `float`: Animación de flotación suave
- `pulse-glow`: Efecto de pulso con glow
- `fade-up`: Aparición desde abajo
- `scale-in`: Aparición con escala

## 🚀 Configuración y Uso

### Instalación
```bash
npm install
npm run dev
```

### Dependencias Principales
- **Next.js 15.5.4**: Framework React
- **React 19**: Biblioteca de UI
- **Framer Motion**: Animaciones
- **Lenis**: Scroll suave
- **Tailwind CSS**: Estilos
- **next-themes**: Gestión de temas

### Configuración de Lenis
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})
```

## 🔄 Flujo de Datos

1. **ScrollProvider** inicializa Lenis y maneja el estado global
2. **Componentes de efectos** se suscriben al progreso de scroll
3. **Animaciones** se calculan basándose en el progreso (0-1)
4. **PerformanceOptimizer** ajusta la configuración según el dispositivo

## 🎯 Características Técnicas

### Optimizaciones de Performance
- Detección automática de capacidades del dispositivo
- Throttling inteligente de scroll
- Uso de `will-change` para elementos animados
- Soporte para `prefers-reduced-motion`

### Accesibilidad
- Respeto por preferencias de movimiento
- Navegación por teclado
- Contraste adecuado
- Textos alternativos

### Responsive Design
- Adaptación automática a diferentes pantallas
- Optimizaciones específicas para móviles
- Efectos deshabilitados en pantallas pequeñas

## 🐛 Solución de Problemas

### Error: `values[i].get is not a function`
**Causa**: Uso incorrecto de `useTransform` con valores numéricos.
**Solución**: Usar cálculos directos en lugar de `useTransform` para valores numéricos.

### Error: `Module not found: Can't resolve 'lenis'`
**Causa**: Paquete incorrecto instalado.
**Solución**: 
```bash
npm uninstall @studio-freight/lenis
npm install lenis
```

### Hidratación Mismatch
**Causa**: Diferencias entre renderizado servidor y cliente.
**Solución**: Usar `ClientOnly` wrapper para componentes con efectos.

## 📝 Próximas Mejoras

- [ ] Implementar modo oscuro/claro
- [ ] Añadir más variantes de animación
- [ ] Optimizar para dispositivos táctiles
- [ ] Implementar lazy loading de secciones
- [ ] Añadir tests unitarios

## 🤝 Contribución

Para modificar el código:
1. Mantener la estructura de componentes modular
2. Usar TypeScript para type safety
3. Seguir las convenciones de naming
4. Documentar cambios importantes
5. Probar en diferentes dispositivos

---

**Versión**: 3.0.0  
**Última actualización**: Enero 2025  
**Autor**: Guillermo
