# ⚡ Resumen Rápido - Sistema de Luz

## 🎯 ¿Qué hace este sistema?

```
┌─────────────────────────────────────┐
│         VIEWPORT (Pantalla)         │
│                                     │
│  ← 90vh (línea empieza acá)        │
│         ║                           │
│         ║← Línea crece con scroll   │
│         █                           │
│         █                           │
│         ● ← Partícula de luz        │
│                                     │
│    ┌─────────────┐                 │
│    │   SECCIÓN   │ ← La luz toca   │
│    │ Se ilumina  │   la sección    │
│    └─────────────┘                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 📦 Componentes que Creé

### 1. **MainVerticalLine.tsx** ✅ MEJORADO
- ✨ Arreglé los errores de sintaxis que tenías
- 🎨 Línea de fondo (apagada) que muestra el camino
- 💡 Línea iluminada que crece con el scroll
- 🔵 Partícula de luz en la punta que pulsa

### 2. **LineIllumination.tsx** ✅ MEJORADO
- 🌊 Ondas expansivas desde la partícula
- ✨ Resplandor ambiental
- 💫 Rastro de luz (estela)
- 🔄 Todo sincronizado con el scroll

### 3. **ConnectedLines.tsx** ✅ MEJORADO
- 🧠 Detecta cuando la luz toca cada sección
- 📡 Emite eventos globales (Custom Events)
- 🐛 Modo debug opcional
- 📊 Calcula el progreso dentro de cada sección

### 4. **LightCard.tsx** ⭐ NUEVO
- 🎨 Card que se ilumina cuando la luz la toca
- 🔄 Borde iluminado que recorre el perímetro (SVG)
- ✨ Resplandor de fondo
- 💫 Partículas que emergen

---

## 🚀 Cómo Usar (3 Pasos)

### Paso 1: Añadir ConnectedLines en tu página

```tsx
// app/page.tsx
import { ConnectedLines } from '@/components/common/ConnectedLines'

export default function Home() {
  return (
    <div>
      {/* Esto controla todo el sistema */}
      <ConnectedLines debug={false} />
      
      <main>
        {/* Tus secciones acá */}
      </main>
    </div>
  )
}
```

### Paso 2: Crear secciones con IDs

```tsx
// Cada sección DEBE tener un id único
<section id="sobre-mí" className="min-h-screen">
  {/* Contenido */}
</section>

<section id="habilidades" className="min-h-screen">
  {/* Contenido */}
</section>
```

### Paso 3: Usar LightCard para que reaccionen a la luz

```tsx
import { LightCard } from '@/components/common/ConnectedLines'

<section id="sobre-mí" className="min-h-screen">
  <LightCard sectionId="sobre-mí">
    <h2>Sobre Mí</h2>
    <p>Esta card se ilumina cuando la luz la toca</p>
  </LightCard>
</section>
```

---

## 🎨 El Efecto de Luz en las Cards

### ¿Cómo funciona técnicamente?

```tsx
// 1. SVG dibuja un rectángulo (el borde de la card)
<svg>
  <rect 
    width="100%" 
    height="100%" 
    rx="16"          // ← Border radius
    fill="none"      // ← Sin relleno
    stroke="primary" // ← Solo el borde
  />
</svg>

// 2. Propiedades mágicas de SVG:
pathLength: 0 → 1    // Dibuja el trazo
pathOffset: 1 → 0    // Recorre el borde

// 3. Framer Motion anima estas propiedades
animate(pathLength, 1, { duration: 1.5 })
```

### Efecto visual:

```
Tiempo 0s:          Tiempo 1s:          Tiempo 1.5s:
┌────────────┐      ┌▓▓▓▓────────┐      ┌▓▓▓▓▓▓▓▓▓▓▓┐
│            │  →   │▓▓▓         │  →   │▓         ▓│
│            │      │            │      │▓         ▓│
└────────────┘      └────────────┘      └▓▓▓▓▓▓▓▓▓▓▓┘

La luz recorre el borde como un destello
```

---

## 🔧 Conceptos Clave de Framer Motion

### 1. **motion.div** - Elemento animable

```tsx
<motion.div
  animate={{ scale: 1.2 }}  // ← Qué animar
  transition={{ duration: 1 }} // ← Cómo animar
/>
```

### 2. **Arrays en animate** - Animación cíclica

```tsx
<motion.div
  animate={{
    scale: [1, 1.5, 1],  // ← 1 → 1.5 → 1
    opacity: [0.5, 1, 0.5]
  }}
  transition={{
    duration: 2,
    repeat: Infinity  // ← Repetir infinitamente
  }}
/>
```

### 3. **useMotionValue** - Valor optimizado

```tsx
const x = useMotionValue(0)  // Crear

animate(x, 100, { duration: 1 })  // Animar

<motion.div style={{ x }} />  // Usar
```

**Ventaja:** No causa re-renders, súper eficiente.

### 4. **useTransform** - Mapear valores

```tsx
const scrollProgress = useMotionValue(0)  // 0-100

const opacity = useTransform(
  scrollProgress,  // Valor origen
  [0, 100],        // Rango entrada
  [0, 1]           // Rango salida
)
// Cuando scroll = 0 → opacity = 0
// Cuando scroll = 50 → opacity = 0.5
// Cuando scroll = 100 → opacity = 1
```

---

## 🌿 Cómo Hacer la Bifurcación (Línea que se Divide)

### Opción Simple: Dos líneas paralelas

```tsx
// En MainVerticalLine.tsx, duplicar la línea:

// Línea izquierda (45% del ancho)
<motion.div
  className="fixed left-[45%] top-[90vh] w-1"
  style={{ height: `${lineHeight}vh` }}
/>

// Línea derecha (55% del ancho)  
<motion.div
  className="fixed left-[55%] top-[90vh] w-1"
  style={{ height: `${lineHeight}vh` }}
/>
```

### Opción Avanzada: División progresiva

```tsx
// Crear BranchingLine.tsx

const shouldSplit = progress > 0.5  // Se divide a la mitad

return (
  <svg className="fixed inset-0">
    {/* Línea hasta el punto de división */}
    <line
      x1="50%" y1="90vh"
      x2="50%" y2="50vh"
    />
    
    {/* Solo mostrar ramas después del split */}
    {shouldSplit && (
      <>
        {/* Rama izquierda */}
        <line x1="50%" y1="50vh" x2="40%" y2="70vh" />
        
        {/* Rama derecha */}
        <line x1="50%" y1="50vh" x2="60%" y2="70vh" />
      </>
    )}
  </svg>
)
```

**Resultado visual:**
```
Antes:          Después:
   │               │
   │               │
   │              ╱ ╲
   ●             ●   ●
```

---

## 🐛 Debug Mode

```tsx
<ConnectedLines debug={true} />
```

Muestra un panel con info en tiempo real:
```
┌─────────────────┐
│ Progress: 45.2% │
│ ScrollY: 1234px │
│ Scrolling: ✓    │
│ Active: timeline│
└─────────────────┘
```

---

## 📁 Archivos que Creé

```
ConnectedLines/
├── ConnectedLines.tsx      ← Cerebro del sistema
├── MainVerticalLine.tsx    ← Línea principal (arreglada)
├── LineIllumination.tsx    ← Efectos de luz (mejorada)
├── LightCard.tsx           ← Cards iluminables (NUEVO)
├── index.ts                ← Exports
├── README.md               ← Documentación completa
├── EJEMPLO_USO.tsx         ← 6 ejemplos prácticos
└── RESUMEN.md              ← Este archivo
```

---

## ✅ Checklist de Implementación

- [ ] **Paso 1:** Añadí `<ConnectedLines />` en `app/page.tsx`
- [ ] **Paso 2:** Mis secciones tienen IDs únicos
- [ ] **Paso 3:** Probé con `debug={true}` para ver si detecta las secciones
- [ ] **Paso 4:** Reemplacé cards normales con `<LightCard>`
- [ ] **Paso 5:** Ajusté colores y animaciones a mi gusto
- [ ] **Paso 6:** Testeé en diferentes tamaños de pantalla

---

## 🎨 Personalizaciones Rápidas

### Cambiar el color de la luz

```css
/* En globals.css */
:root {
  --primary: 210 100% 50%;  /* Azul */
}
```

### Cambiar velocidad de animación

```tsx
// Más rápido
transition={{ duration: 0.5 }}

// Más lento
transition={{ duration: 3 }}
```

### Cambiar punto de inicio (90vh → otro)

```tsx
// Buscar "90vh" en todos los archivos y cambiar
top: calc(80vh + ...)  // Empezar más arriba
```

### Añadir más efectos a LightCard

```tsx
// En LightCard.tsx
animate={{
  scale: isLightActive ? [1, 1.05, 1] : 1,
  rotate: [0, 2, -2, 0],  // ← Añadir rotación
  y: [0, -5, 0],          // ← Añadir levitación
}}
```

---

## 🔥 Lo Más Importante

### 1. **Sistema de Eventos**
```
ConnectedLines detecta → triggerLightEvent() → Cards escuchan → Animan
```

### 2. **SVG + Framer Motion = Magia**
```tsx
<motion.rect
  style={{
    pathLength: 0 → 1,  // Dibuja el trazo
    pathOffset: 1 → 0,  // Recorre el borde
  }}
/>
```

### 3. **useLightTrigger para Custom Animations**
```tsx
useLightTrigger('mi-seccion', (event) => {
  // event.isActive → true cuando la luz toca
  // event.progress → 0 a 1 (progreso en la sección)
})
```

---

## 🚀 Próximos Pasos

1. **Probá el debug mode:**
   ```tsx
   <ConnectedLines debug={true} />
   ```

2. **Implementá una sección simple:**
   ```tsx
   <section id="test" className="min-h-screen flex items-center justify-center">
     <LightCard sectionId="test">
       <h2>¡Funciona!</h2>
     </LightCard>
   </section>
   ```

3. **Experimentá con los ejemplos:**
   - Abrí `EJEMPLO_USO.tsx`
   - Copiá y pegá los ejemplos
   - Modificá valores y mirá qué pasa

4. **Leé la documentación completa:**
   - Abrí `README.md`
   - Tiene explicaciones técnicas detalladas
   - Conceptos de SVG y Framer Motion

---

## 💡 Tips Finales

1. **Los efectos son solo en desktop** (`hidden lg:block`)
2. **Las secciones necesitan altura** (`min-h-screen`)
3. **Los IDs deben coincidir** (section id = sectionId prop)
4. **Usá TypeScript** para evitar errores
5. **Empezá simple** y andá agregando complejidad

---

## 🆘 Si algo no funciona

1. **¿La luz no se mueve?**
   - Verificá que ScrollProvider esté funcionando
   - Probá con `debug={true}`

2. **¿Las cards no se iluminan?**
   - Verificá que el `sectionId` coincida con el `id` de la section
   - Asegurate que la sección tenga suficiente altura

3. **¿Errores de TypeScript?**
   - Reiniciá el servidor de desarrollo
   - Los errores deberían desaparecer

4. **¿Performance issues?**
   - Los efectos ya están optimizados
   - Se ocultan automáticamente en mobile

---

¡Listo! Ahora tenés todo para crear un sistema de luz increíble. 🚀

Cualquier duda, revisá:
- 📖 `README.md` - Documentación completa
- 💡 `EJEMPLO_USO.tsx` - 6 ejemplos prácticos
- 🎯 `RESUMEN.md` - Este archivo (visión general)

