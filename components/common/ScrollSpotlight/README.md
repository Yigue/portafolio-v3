# 🎯 Sistema de Scroll Spotlight

Sistema de iluminación dinámica para cards que reacciona al scroll, creando un **destello pequeño** que sigue la posición del scroll en los bordes de las cards. El destello aparece exactamente donde el "spotlight" toca la card, moviéndose suavemente por los bordes.

## 📦 Componentes

### 1. `useScrollSpotlight` Hook
Hook que detecta la proximidad de un elemento al punto central de la pantalla.

### 2. `CardAnimation` Component
Componente de animación para cards con **destello móvil** que sigue el scroll en los bordes.

### 3. `ScrollSpotlight` Component
Indicador visual opcional del punto de iluminación.

---

## 🌟 ¿Cómo funciona el sistema de iluminación?

1. **Franja central invisible**: Una zona de ~1cm en el centro de la pantalla (horizontal y vertical)
2. **Detección de todos los bordes**: Detecta cuando cualquier borde (top/bottom/left/right) de la card cruza la franja
3. **Iluminación completa**: Cuando un borde pasa por la franja, **TODO ese borde** se ilumina de punta a punta
4. **Efectos dinámicos**: Añade partículas, ondas y resplandor distribuidos por todo el borde
5. **Estilo ConnectedLines**: Usa los mismos colores y efectos que las líneas verticales

Es como tener un **escáner en forma de cruz** en el centro que ilumina **cualquier borde completo** de las cards cuando los atraviesa:
- **Bordes horizontales** (top/bottom) → se iluminan de izquierda a derecha
- **Bordes verticales** (left/right) → se iluminan de arriba a abajo

---

## 🚀 Uso Básico

### Cards con Iluminación Conectada (Recomendado)

```tsx
import { CardAnimation } from "@/components"

function MyComponent() {
  return (
    <CardAnimation 
      enableSpotlight 
      glowSize={80}  // Tamaño del destello (opcional)
    >
      <div className="p-6 rounded-lg bg-card">
        <h3>Mi Card</h3>
        <p>Se ilumina con el mismo estilo que las líneas verticales</p>
      </div>
    </CardAnimation>
  )
}
```

**Nota:** Ahora usa automáticamente `hsl(var(--primary))` para mantener consistencia visual con el sistema ConnectedLines.

### Con Indicador Visual

```tsx
import { ScrollSpotlight } from "@/components"

function Layout() {
  return (
    <>
      {/* Indicador del punto de iluminación */}
      <ScrollSpotlight 
        indicatorStyle="gradient" 
        opacity={0.2}
      />
      
      {/* Tu contenido con cards */}
      <main>
        {/* ... */}
      </main>
    </>
  )
}
```

### Hook Manual (Avanzado)

```tsx
import { useRef } from "react"
import { useScrollSpotlight } from "@/lib/hooks/useScrollSpotlight"

function CustomCard() {
  const ref = useRef(null)
  const { intensity, isInSpotlight } = useScrollSpotlight(ref, {
    influenceRadius: 400,
    maxIntensity: 1
  })

  return (
    <div 
      ref={ref}
      style={{
        borderColor: `rgba(59, 130, 246, ${intensity})`,
        boxShadow: `0 0 ${intensity * 40}px rgba(59, 130, 246, ${intensity * 0.5})`
      }}
    >
      Estado: {isInSpotlight ? "Iluminado" : "Normal"}
    </div>
  )
}
```

---

## ⚙️ Props de CardAnimation

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `enableSpotlight` | `boolean` | `true` | Habilitar iluminación conectada |
| `influenceRadius` | `number` | `300` | Radio de influencia en px |
| `maxIntensity` | `number` | `1` | Intensidad máxima (0-1) |
| `glowSize` | `number` | `80` | Tamaño del destello en px |
| `delay` | `number` | `0` | Delay de animación |
| `stagger` | `number` | `0.1` | Stagger para múltiples cards |

**Nota:** El color se obtiene automáticamente de `--primary` CSS variable para mantener consistencia con ConnectedLines.

---

## 🎨 Props de ScrollSpotlight

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `position` | `number` | `0.5` | Posición vertical (0-1) |
| `color` | `string` | `"59, 130, 246"` | Color RGB |
| `showIndicator` | `boolean` | `true` | Mostrar indicador |
| `indicatorStyle` | `"line" \| "pulse" \| "gradient"` | `"line"` | Estilo visual |
| `opacity` | `number` | `0.15` | Opacidad (0-1) |

---

## 🎯 Config de useScrollSpotlight

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `spotlightPosition` | `number` | `0.5` | Posición del spotlight (0-1) |
| `influenceRadius` | `number` | `300` | Radio de influencia en px |
| `maxIntensity` | `number` | `1` | Intensidad máxima |
| `onlyOnScroll` | `boolean` | `false` | Actualizar solo al scrollear |

---

## 🎨 Efectos Visuales (Estilo ConnectedLines)

El sistema ahora incluye los mismos efectos que las líneas verticales:

### ✨ Componentes del Efecto:
1. **Línea brillante principal**: Gradiente como MainVerticalLine
2. **Resplandor ambiental**: Glow radial difuso
3. **Partícula central**: Punto brillante pulsante (>50% intensidad)
4. **Ondas expansivas**: Círculos que se expanden (>60% intensidad)

```tsx
// Destello estándar
<CardAnimation enableSpotlight glowSize={80} />

// Destello más grande
<CardAnimation enableSpotlight glowSize={120} />

// Destello más sutil
<CardAnimation enableSpotlight maxIntensity={0.7} />
```

**El color se sincroniza automáticamente con tu tema** usando `hsl(var(--primary))`.

---

## 📊 Valores Retornados por useScrollSpotlight

```typescript
interface SpotlightResult {
  intensity: number      // 0-1, intensidad de iluminación
  distance: number       // Distancia al centro en px
  isInSpotlight: boolean // Si está dentro del radio
  glowProgress: number   // 0-1, progreso del glow
}
```

---

## 🎭 Estilos de Indicador

### `"line"` - Línea Horizontal
Línea sutil que marca el punto central con un pequeño punto pulsante.
```tsx
<ScrollSpotlight indicatorStyle="line" opacity={0.15} />
```

### `"pulse"` - Pulso Animado
Ondas concéntricas que pulsan desde el centro.
```tsx
<ScrollSpotlight indicatorStyle="pulse" opacity={0.2} />
```

### `"gradient"` - Gradiente Radial
Gradiente sutil que crea una zona de luz difusa.
```tsx
<ScrollSpotlight indicatorStyle="gradient" opacity={0.25} />
```

---

## 💡 Tips de Performance

1. **Usa `CardAnimation` directamente** - Ya está optimizado con RAF y motion values
2. **Ajusta `influenceRadius`** - Radios más pequeños = menos cálculos
3. **Considera `onlyOnScroll: true`** - Para dispositivos de bajo rendimiento
4. **No uses spotlight en TODAS las cards** - Úsalo en cards principales
5. **El indicador es opcional** - Desactívalo en producción si quieres

---

## 🔧 Integración con el Proyecto

El sistema ya está integrado con:
- ✅ **Lenis Scroll** - Sincronización automática
- ✅ **Framer Motion** - Animaciones suaves
- ✅ **ScrollProvider** - Context global de scroll
- ✅ **RAF Loop** - 60 FPS garantizados

---

## 📱 Responsive

El sistema es completamente responsive:
- Detecta el tamaño de viewport automáticamente
- Se adapta a diferentes alturas de pantalla
- Funciona en móvil, tablet y desktop

---

## 🐛 Debugging

Activa el modo debug para ver la intensidad en tiempo real:

```tsx
<CardAnimation 
  enableSpotlight
  data-spotlight-active // Atributo añadido automáticamente
  data-spotlight-intensity // Valor de 0.00 a 1.00
/>
```

En DevTools podrás ver:
```html
<div 
  data-spotlight-active="true"
  data-spotlight-intensity="0.87"
>
```

---

## 🚨 Solución de Problemas

### El borde no se ilumina
- Asegúrate que el elemento hijo tenga `border` o `border-transparent`
- Verifica que `enableSpotlight={true}`

### Lag o bajadas de FPS
- Reduce `influenceRadius`
- Usa `onlyOnScroll: true`
- Limita el número de cards con spotlight

### El color no se ve
- Usa formato RGB sin `rgb()`: `"255, 0, 0"` ❌ `"rgb(255, 0, 0)"`
- Aumenta `maxIntensity`

---

## 🎓 Casos de Uso

1. **Portfolios** - Resaltar proyectos al scrollear
2. **Landing Pages** - Guiar la atención del usuario
3. **Dashboards** - Enfatizar métricas importantes
4. **Tiendas** - Destacar productos al pasar
5. **Blogs** - Iluminar artículos destacados

---

## 📈 Roadmap

- [ ] Soporte para spotlight horizontal
- [ ] Múltiples spotlights simultáneos
- [ ] Presets de colores temáticos
- [ ] Modo "seguir mouse"
- [ ] Efectos de partículas opcionales

