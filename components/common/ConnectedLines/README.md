# 🌟 Sistema de Líneas Conectadas e Iluminación

## 📚 Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Componentes Principales](#componentes-principales)
4. [Cómo Funciona la Luz](#cómo-funciona-la-luz)
5. [Efecto de Luz en Cards](#efecto-de-luz-en-cards)
6. [Cómo Hacer que la Línea se Divida](#cómo-hacer-que-la-línea-se-divida)
7. [Personalizaciones](#personalizaciones)
8. [Conceptos Técnicos](#conceptos-técnicos)

---

## 🎯 Introducción

Este sistema crea un efecto visual donde una **línea vertical iluminada** crece mientras el usuario hace scroll, y cuando toca las secciones, las ilumina y activa animaciones.

**Concepto básico:**
- Línea empieza en **90vh** (90% de la altura de la pantalla)
- Crece hacia abajo conforme scrolleas
- Una **partícula de luz** marca la punta de la línea
- Cuando la luz toca una **sección**, esa sección se ilumina
- Cuando la luz toca una **card**, la luz recorre su borde

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────┐
│    ConnectedLines (Principal)   │
│  - Controla el flujo de luz     │
│  - Detecta secciones            │
│  - Emite eventos                │
└────────┬────────────────────────┘
         │
    ┌────┴──────┬─────────────────┐
    ▼           ▼                 ▼
┌────────┐ ┌──────────┐  ┌────────────┐
│ Main   │ │  Line    │  │  Light     │
│ Line   │ │  Illum   │  │  Card      │
│        │ │          │  │            │
│ Línea  │ │ Efectos  │  │ Cards que  │
│ base   │ │ visuales │  │ reaccionan │
└────────┘ └──────────┘  └────────────┘
```

---

## 🧩 Componentes Principales

### 1. **ConnectedLines.tsx** - El cerebro del sistema

Este es el componente principal que coordina todo:

```tsx
import { ConnectedLines } from '@/components/common/ConnectedLines'

// En tu página:
<ConnectedLines debug={true} />
```

**Qué hace:**
- Calcula la posición de la luz en tiempo real
- Detecta qué sección está tocando la luz
- Emite eventos para que otros componentes reaccionen
- Opcional: muestra info de debug

**Cómo detecta las secciones:**
```tsx
// Calcula la posición Y de la luz
const lightPositionY = viewportHeight * 0.9 + (scrollY * progress)

// Verifica si toca una sección
const isLightTouching = lightPositionY >= elementTop && lightPositionY <= elementBottom
```

---

### 2. **MainVerticalLine.tsx** - La línea principal

Dibuja dos líneas:
1. **Línea de fondo** (apagada): muestra el camino completo
2. **Línea iluminada**: crece con el scroll

**Concepto visual:**
```
Inicio (90vh)
    ║ ← Línea apagada (fondo)
    ║
    █ ← Línea iluminada (crece)
    █
    █
    ● ← Partícula de luz (punta)
```

**Código clave:**
```tsx
// Altura de la línea iluminada
const lineHeight = scrollableProgress * 100

// Posición de la partícula
top: `calc(90vh + ${lineHeight}vh)`
```

---

### 3. **LineIllumination.tsx** - Efectos visuales

Añade efectos alrededor de la partícula de luz:
- 🌊 Ondas expansivas
- ✨ Resplandor ambiental
- 💫 Rastro de luz

**Animaciones con Framer Motion:**
```tsx
<motion.div
  animate={{
    scale: [1, 2.5, 1],      // Crece y se encoge
    opacity: [0.6, 0, 0.6],  // Aparece y desaparece
  }}
  transition={{
    duration: 2,              // Duración de la animación
    repeat: Infinity,         // Se repite infinitamente
    ease: "easeOut",         // Suavizado
  }}
/>
```

---

### 4. **LightCard.tsx** - Cards que reaccionan a la luz ⭐

Este es el componente **más importante** para lograr el efecto de luz recorriendo las cards.

**Cómo usarlo:**
```tsx
import { LightCard } from '@/components/common/ConnectedLines'

<LightCard sectionId="sobre-mí" className="mb-4">
  <h3>Mi Card</h3>
  <p>Contenido de la card</p>
</LightCard>
```

**Qué hace cuando la luz la toca:**
1. ✨ Dibuja un borde iluminado que recorre el perímetro
2. 🎨 Añade un resplandor de fondo
3. 📏 Escala ligeramente la card
4. 💫 Emite partículas

---

## 💡 Cómo Funciona la Luz

### Sistema de Eventos Personalizados

El sistema usa **Custom Events** de JavaScript para comunicarse:

```tsx
// 1. ConnectedLines detecta que la luz toca una sección
triggerLightEvent(sectionId, true, progress)

// 2. El evento se dispara globalmente
window.dispatchEvent(new CustomEvent('lightTrigger', { detail: ... }))

// 3. Los componentes escuchan el evento
useLightTrigger(sectionId, (event) => {
  console.log(`La luz me tocó! Progreso: ${event.progress}`)
})
```

**Ventaja:** Cualquier componente puede reaccionar a la luz sin necesidad de props drilling.

---

## 🎨 Efecto de Luz Recorriendo Cards

### Técnica: SVG + stroke-dasharray

El truco está en usar SVG con propiedades animadas:

```tsx
// 1. Dibujar un rectángulo redondeado (borde de la card)
<rect
  x={0} y={0}
  width="100%" height="100%"
  rx={16}  // Border radius
  fill="none"
  stroke="url(#mi-gradiente)"
  strokeWidth={2}
/>
```

**Propiedades clave:**
- `pathLength`: Longitud del trazo (0 = no dibujado, 1 = completo)
- `pathOffset`: Desplazamiento del trazo (crea el efecto de "dibujo")

**Animación con Framer Motion:**
```tsx
const pathLength = useMotionValue(0)  // Empieza en 0
const pathOffset = useMotionValue(1)  // Offset inicial

// Cuando la luz toca la card:
animate(pathLength, 1, { duration: 1.5 })  // Dibuja el trazo
animate(pathOffset, 0, { duration: 1.5 })  // Recorre el borde
```

**Efecto visual:**
```
Tiempo 0s:     Tiempo 0.5s:    Tiempo 1.5s:
┌────────┐     ┌▓───────┐      ┌▓▓▓▓▓▓▓▓┐
│        │  →  │▓       │  →   │▓      ▓│
│        │     │        │      │▓      ▓│
└────────┘     └────────┘      └▓▓▓▓▓▓▓▓┘
```

### Gradientes y Filtros SVG

Para que se vea mejor, usamos:

1. **Gradiente lineal** (color degradado):
```tsx
<linearGradient id="light-gradient">
  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
</linearGradient>
```

2. **Filtro de resplandor** (glow effect):
```tsx
<filter id="glow">
  <feGaussianBlur stdDeviation="4" />  // Desenfoque
  <feMerge>  // Combina blur + original
    <feMergeNode in="coloredBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

---

## 🌿 Cómo Hacer que la Línea se Divida

Para crear una bifurcación (línea que se divide en 2):

### Opción 1: Dos líneas paralelas

```tsx
// En MainVerticalLine.tsx, añadir:

// Línea izquierda
<motion.div
  className="fixed left-[45%] -translate-x-1/2 top-[90vh] w-1 rounded-full"
  style={{
    height: `${lineHeight}vh`,
    background: 'linear-gradient(to bottom, ...)',
  }}
/>

// Línea derecha
<motion.div
  className="fixed left-[55%] -translate-x-1/2 top-[90vh] w-1 rounded-full"
  style={{
    height: `${lineHeight}vh`,
    background: 'linear-gradient(to bottom, ...)',
  }}
/>
```

### Opción 2: División progresiva con SVG

```tsx
// Crear un componente BifurcatedLine.tsx

export default function BifurcatedLine({ progress, splitPoint = 0.5 }) {
  const shouldSplit = progress > splitPoint
  
  return (
    <svg className="fixed inset-0 pointer-events-none">
      {/* Línea principal */}
      <line
        x1="50%" y1="90vh"
        x2="50%" y2={shouldSplit ? "50vh" : `calc(90vh + ${progress * 100}vh)`}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      
      {/* Bifurcación */}
      {shouldSplit && (
        <>
          {/* Rama izquierda */}
          <line
            x1="50%" y1="50vh"
            x2="40%" y2={`calc(50vh + ${(progress - splitPoint) * 50}vh)`}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Rama derecha */}
          <line
            x1="50%" y1="50vh"
            x2="60%" y2={`calc(50vh + ${(progress - splitPoint) * 50}vh)`}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  )
}
```

**Concepto visual:**
```
Antes del split:       Después del split:
       │                      │
       │                      │
       │                    ╱   ╲
       │                   ╱     ╲
       ●                  ●       ●
```

---

## 🎨 Personalizaciones

### Cambiar el punto de inicio (90vh → otro valor)

En todos los componentes, busca `90vh` y cámbialo:

```tsx
// Ejemplo: comenzar en 80vh
top: `calc(80vh + ${lineHeight}vh)`
```

### Cambiar la velocidad de animación

```tsx
// Más rápido (0.5s)
transition={{ duration: 0.5 }}

// Más lento (3s)
transition={{ duration: 3 }}
```

### Cambiar el color de la luz

Usa variables CSS en `globals.css`:

```css
:root {
  --primary: 210 100% 50%;  /* Azul */
}

.dark {
  --primary: 280 100% 60%;  /* Morado */
}
```

### Añadir más efectos a LightCard

```tsx
// En LightCard.tsx, dentro del animate:
animate={{
  scale: isLightActive ? [1, 1.05, 1] : 1,
  rotate: isLightActive ? [0, 2, 0, -2, 0] : 0,  // ← Nuevo: sacude
  y: isLightActive ? [0, -5, 0] : 0,              // ← Nuevo: levita
}}
```

---

## 🔧 Conceptos Técnicos

### 1. Framer Motion - useMotionValue

**¿Qué es?**
Un valor que puede animarse sin causar re-renders.

```tsx
const x = useMotionValue(0)  // Crear

animate(x, 100, { duration: 1 })  // Animar

<motion.div style={{ x }} />  // Usar
```

**Ventaja:** Mucho más eficiente que useState para animaciones.

### 2. Framer Motion - useTransform

Transforma un valor en otro:

```tsx
const opacity = useTransform(scrollProgress, [0, 1], [0, 1])
//    ↑                        ↑              ↑      ↑
//  resultado              valor origen    rango entrada → salida
```

**Ejemplo práctico:**
```tsx
// Cuando el scroll va de 0 a 100%, la opacidad va de 0 a 1
const opacity = useTransform(scrollProgress, [0, 100], [0, 1])
```

### 3. SVG stroke-dasharray y stroke-dashoffset

**stroke-dasharray:** Define el patrón de línea discontinua
```svg
<line stroke-dasharray="10 5" />
<!-- 10px de línea, 5px de espacio, repetir -->
```

**stroke-dashoffset:** Desplaza el patrón
```svg
<line stroke-dasharray="100" stroke-dashoffset="50" />
<!-- El patrón empieza desde la mitad -->
```

**Truco para animar el "dibujo":**
```tsx
// 1. Hacer dasharray igual al perímetro
<rect stroke-dasharray="400" />  // Perímetro = 400px

// 2. Empezar con offset = perímetro (no visible)
<rect stroke-dashoffset="400" />

// 3. Animar offset a 0 (se dibuja completamente)
animate(strokeDashoffset, 0)
```

### 4. Lenis Scroll - useScrollSync

Lenis es una librería de scroll suave. El hook `useScrollSync` te da:

```tsx
const { 
  progress,    // 0 = inicio, 1 = final (normalizado)
  isScrolling, // true mientras scrolleas
  scrollY,     // Posición actual en pixels
  lenis        // Instancia de Lenis (para scrollTo)
} = useScrollSync()
```

**Usar progress vs scrollY:**
- `progress`: Para animaciones relativas (0-100%)
- `scrollY`: Para posiciones absolutas (pixels)

---

## 🚀 Ejemplo Completo de Uso

```tsx
// En tu sección AboutSection.tsx

import { LightCard } from '@/components/common/ConnectedLines'

export default function AboutSection() {
  return (
    <section id="sobre-mí" className="min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        
        {/* Card 1 - Reacciona a la luz */}
        <LightCard sectionId="sobre-mí" borderRadius={20}>
          <h3 className="text-2xl font-bold mb-4">¿Quién soy?</h3>
          <p className="text-muted-foreground">
            Desarrollador Full Stack apasionado por crear experiencias web increíbles.
          </p>
        </LightCard>

        {/* Card 2 - También reacciona */}
        <LightCard sectionId="sobre-mí" borderRadius={20}>
          <h3 className="text-2xl font-bold mb-4">¿Qué hago?</h3>
          <p className="text-muted-foreground">
            Desarrollo aplicaciones web modernas con React, Next.js y TypeScript.
          </p>
        </LightCard>

      </div>
    </section>
  )
}
```

---

## 🐛 Debug Mode

Para ver qué está pasando:

```tsx
<ConnectedLines debug={true} />
```

Esto muestra un panel con:
- Progress del scroll
- ScrollY actual
- Si está scrolling
- Qué sección está activa

---

## 💡 Tips y Best Practices

1. **Performance:**
   - Los efectos sólo se renderizan en desktop (`hidden lg:block`)
   - Usa `pointer-events-none` en overlays
   - Evita animaciones pesadas en mobile

2. **Accessibilidad:**
   - Los efectos son puramente decorativos
   - No afectan la navegación ni el contenido
   - Funcionan sin JavaScript (graceful degradation)

3. **Organización:**
   - Un componente = una responsabilidad
   - Comentarios claros explicando "por qué", no "qué"
   - Usa TypeScript para evitar errores

---

## 🎓 Resumen

**Lo que aprendiste:**
- ✅ Cómo crear una línea que crece con el scroll
- ✅ Cómo detectar cuando la luz toca una sección
- ✅ Cómo animar SVG para crear el efecto de luz recorriendo bordes
- ✅ Cómo usar Framer Motion para animaciones fluidas
- ✅ Cómo usar Custom Events para comunicación entre componentes
- ✅ Cómo hacer bifurcaciones en la línea

**Próximos pasos:**
- Experimenta con los valores de animación
- Añade más efectos a LightCard
- Crea variantes de la línea (curvas, bifurcaciones)
- Integra sonidos o haptics (vibración)

---

¡Cualquier duda, revisá este documento o experimentá con el código! 🚀

