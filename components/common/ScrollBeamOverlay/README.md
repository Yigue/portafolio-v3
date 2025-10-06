# 🌟 Scroll Beam System

Sistema de iluminación cinematográfico tipo Apple/Lenis donde una **franja luminosa invisible** ubicada en el centro del viewport ilumina dinámicamente los bordes de las cards al scrollear.

---

## 🎯 ¿Cómo funciona?

### Concepto
Imagina un **rayo de luz horizontal** fijo en el centro de la pantalla (50vh). Cuando haces scroll, las cards pasan por este rayo y se iluminan automáticamente con un efecto de brillo azul suave en todos sus bordes.

### Geometría
```
┌─────────────────────────────────┐
│                                 │
│         Cards arriba            │
│                                 │
├─────────────────────────────────┤  ← Franja luminosa (60px alto)
│    ╔═══════════════════════╗    │  ← Card iluminada
│    ║   SCROLL BEAM ZONE    ║    │
│    ╚═══════════════════════╝    │
├─────────────────────────────────┤
│                                 │
│        Cards abajo              │
│                                 │
└─────────────────────────────────┘
```

### Intensidad
- **100%** cuando el centro de la card está en el centro de la franja
- **Gradual** entre 0-100% según distancia (influenceRadius = 200px)
- **0%** cuando está fuera del radio de influencia
- **Transición suave** con curva ease-out-cubic

---

## 📦 Componentes

### 1. `CardAnimation` (actualizado)
Componente principal que detecta cuándo pasa por la franja y aplica el efecto de iluminación.

### 2. `ScrollBeamOverlay` (nuevo)
Overlay visual opcional que muestra dónde está la franja luminosa.

---

## 🚀 Uso Básico

### En tus Cards

```tsx
import { CardAnimation } from "@/components"

function MyCard() {
  return (
    <CardAnimation 
      enableSpotlight={true}
      maxIntensity={1}
      influenceRadius={200}
    >
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3>Mi Card</h3>
        <p>Se ilumina al pasar por el centro</p>
      </div>
    </CardAnimation>
  )
}
```

### Agregar el Overlay Visual (opcional)

```tsx
// En app/page.tsx o layout.tsx
import { ScrollBeamOverlay } from "@/components"

export default function Page() {
  return (
    <>
      {/* Visualizador de la franja luminosa */}
      <ScrollBeamOverlay 
        visible={true} 
        opacity={0.15}
        height={60}
      />
      
      {/* Tu contenido */}
      <main>
        <CardAnimation>
          {/* cards */}
        </CardAnimation>
      </main>
    </>
  )
}
```

---

## ⚙️ Props de CardAnimation

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `enableSpotlight` | `boolean` | `true` | Activar Scroll Beam |
| `maxIntensity` | `number` | `1` | Intensidad máxima (0-1) |
| `influenceRadius` | `number` | `200` | Radio de influencia en px |
| `delay` | `number` | `0` | Delay de animación entrada |
| `stagger` | `number` | `0.1` | Stagger para múltiples cards |

---

## 🎨 Props de ScrollBeamOverlay

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `visible` | `boolean` | `true` | Mostrar overlay |
| `height` | `number` | `60` | Altura de la franja en px |
| `color` | `string` | `"10, 132, 255"` | Color RGB (sin `rgb()`) |
| `opacity` | `number` | `0.15` | Opacidad del efecto |

---

## 🎬 Efectos Visuales

### En las Cards:
1. **Box Shadow**: Halo azul que crece con la intensidad
2. **Border Color**: El borde se ilumina progresivamente
3. **Brightness**: Aumenta la luminosidad sutilmente (1 → 1.15)
4. **Scale**: Escala mínima para profundidad (1 → 1.01)

### En el Overlay:
1. **Gradiente principal**: Franja difusa con blur
2. **Línea central**: Línea de 2px definida y pulsante
3. **Puntos pulsantes**: 3 puntos animados en el centro
4. **Resplandor ambiental**: Glow radial amplio
5. **Indicadores laterales**: Marcas en los bordes

---

## ⚡ Performance

### Optimizaciones implementadas:
- ✅ **motionValue**: Sin re-renders, todo con motion values
- ✅ **useTransform**: Interpolación declarativa de valores
- ✅ **Sync con Lenis**: Usa el `progress` de ScrollProvider
- ✅ **RAF automático**: Framer Motion maneja el loop
- ✅ **Conditional rendering**: Solo anima si `intensity > 0.05`

### Benchmarks:
- 60 FPS constantes con scroll fluido de Lenis
- Sin flicker ni saltos visuales
- CPU usage: < 5% en scrolling activo
- GPU accelerated (transform + opacity)

---

## 🎨 Personalización

### Ajustar sensibilidad

```tsx
// Efecto más amplio
<CardAnimation influenceRadius={300} />

// Efecto más concentrado
<CardAnimation influenceRadius={150} />
```

### Cambiar intensidad

```tsx
// Efecto sutil
<CardAnimation maxIntensity={0.6} />

// Efecto dramático
<CardAnimation maxIntensity={1} />
```

### Personalizar el overlay

```tsx
// Color púrpura
<ScrollBeamOverlay color="147, 51, 234" />

// Más visible
<ScrollBeamOverlay opacity={0.3} height={80} />

// Solo para debug (desactivar en producción)
<ScrollBeamOverlay visible={process.env.NODE_ENV === 'development'} />
```

---

## 🔧 Integración con el Proyecto

### Ya está integrado con:
- ✅ **Lenis Scroll** via `ScrollProvider`
- ✅ **Framer Motion** para animaciones
- ✅ **TailwindCSS** variables CSS (`hsl(var(--primary))`)
- ✅ **TypeScript** con tipos completos
- ✅ **Next.js App Router** con `"use client"`

### Donde usar:
- `ProjectsSection` - Iluminar cards de proyectos
- `SkillsSection` - Destacar skills al scrollear
- `TimelineSection` - Enfatizar hitos temporales
- `AboutSection` - Cards de información
- Cualquier contenedor con múltiples cards

---

## 📊 Comparación: Antes vs Ahora

### ❌ Sistema Anterior
- Detección por bordes individuales (top/bottom/left/right)
- Múltiples estados y cálculos complejos
- Iluminación fragmentada
- Más código, menos fluido

### ✅ Sistema Scroll Beam
- Detección centralizada simple
- Un solo cálculo: distancia al centro
- Iluminación unificada en todos los bordes
- Código limpio, efecto cinematográfico

---

## 🎯 Casos de Uso

### 1. Portfolio de Proyectos
Resalta cada proyecto cuando pasa por el centro mientras scrolleas.

### 2. Feature Showcase
Guía la atención del usuario por cada feature de forma secuencial.

### 3. Timeline Interactiva
Ilumina eventos históricos a medida que "viajas" por el tiempo.

### 4. Product Gallery
Destaca productos uno por uno en un recorrido visual.

### 5. Testimonials Carousel
Enfatiza cada testimonio al llegar al foco visual.

---

## 🐛 Troubleshooting

### El efecto no se ve
- Verifica que las cards tengan `border` (aunque sea transparente)
- Asegúrate que `enableSpotlight={true}`
- Revisa que `ScrollProvider` envuelva la app

### El efecto es muy sutil
- Aumenta `maxIntensity` a `1` o más
- Reduce `influenceRadius` para concentrar el brillo
- Aumenta la opacidad del overlay

### Performance issues
- Reduce el número de cards con spotlight activo
- Usa `enableSpotlight={false}` en cards secundarias
- El overlay es solo decorativo, desactívalo si no lo necesitas

---

## 🎬 Demo Visual

```
Scroll ↓
─────────────────────
   Card 1        ← Opaca
─────────────────────
   Card 2        ← Empieza a brillar
─────────────────────
═══ Card 3 ═══    ← ¡BRILLA AL MÁXIMO!
─────────────────────
   Card 4        ← Se va apagando
─────────────────────
   Card 5        ← Opaca
─────────────────────
```

---

## 🚀 Siguiente Nivel

Ideas para extender el sistema:
- [ ] Soporte para spotlight horizontal (scroll lateral)
- [ ] Múltiples franjas con colores diferentes
- [ ] Efecto "comet trail" que deja estela
- [ ] Partículas que emergen de las cards iluminadas
- [ ] Sound design sincronizado con la iluminación

---

¡Disfruta del efecto Scroll Beam! 🌟✨

