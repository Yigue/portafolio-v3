# 🎨 Scroll Tracing Effect para Cards

## ✨ ¿Qué es?

Un efecto cinematográfico donde **los bordes de las cards se trazan progresivamente** mientras scrolleas, similar al `TracingBeam` pero aplicado a cada card individual.

---

## 🎯 Cómo Funciona

### 1. **Scroll Progress Individual**
Cada card tiene su propio `scrollYProgress` que monitorea su posición en el viewport:

```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"], // Desde que entra hasta que sale
})
```

### 2. **Suavizado con Spring**
El progress se suaviza con física de resorte para transiciones naturales:

```typescript
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
})
```

### 3. **Trazado SVG con stroke-dasharray**
Los bordes se dibujan usando la técnica de `stroke-dasharray` y `stroke-dashoffset`:

```typescript
const perimeter = (width + height) * 2
const strokeDashoffset = useTransform(smoothProgress, [0, 0.8], [perimeter, 0])
```

- **`perimeter`**: Longitud total del borde
- **`strokeDashoffset`**: Va de `perimeter` (sin dibujar) a `0` (completamente dibujado)
- **Rango [0, 0.8]**: Los bordes se dibujan completamente cuando la card alcanza el 80% del recorrido

---

## 🎬 Efectos Visuales

### A. **Trazado Progresivo**
- Borde base gris sutil (siempre visible)
- Borde primario con gradiente que se dibuja con el scroll
- Borde secundario difuso para glow intenso

### B. **Glow Dinámico**
El glow aumenta cuando la card pasa por el **centro del viewport**:

```typescript
const elementCenter = rect.top + rect.height / 2
const distance = Math.abs(elementCenter - spotlightY)
const intensity = Math.max(0, 1 - distance / influenceRadius)
```

### C. **Punto Brillante**
Un punto luminoso pequeño que aparece en la esquina superior mientras se traza el borde

---

## 📊 Sincronización con Scroll

### Timeline del Efecto:

```
Scroll Progress:    0%  ────────────────────  80%  ──────  100%
                    │                         │            │
Trazado de Borde:   Sin dibujar              Completo      Completo
Opacidad Border:    0                        1             0.3 (fade)
Glow Ambiental:     Basado en distancia al centro
```

### Ventanas de Activación:

1. **0% - 30%**: El borde comienza a trazarse
2. **30% - 70%**: El borde está completamente visible
3. **70% - 100%**: El borde comienza a desvanecerse

---

## 🎨 Gradientes y Colores

### Gradiente del Trazo:
```css
linear-gradient(
  0% → hsl(var(--primary) / 0)      /* Transparente */
  40% → hsl(var(--primary) / 0.3)   /* Semi-transparente */
  50% → hsl(var(--primary) / 1)     /* Color completo (centro) */
  60% → hsl(var(--primary) / 0.3)   /* Semi-transparente */
  100% → hsl(var(--primary) / 0)    /* Transparente */
)
```

Esto crea un efecto de "luz viajera" donde el centro del trazo es más brillante.

---

## ⚙️ Parámetros Configurables

```typescript
<CardAnimation
  enableBeam={true}           // Activar/desactivar efecto
  beamHeight={60}             // Altura franja de glow (px)
  influenceRadius={200}       // Radio de influencia desde centro (px)
  maxIntensity={1}            // Intensidad máxima del glow (0-1)
  traceDuration={2.5}         // No usado actualmente (legacy)
>
  {children}
</CardAnimation>
```

---

## 🚀 Optimización de Performance

### Técnicas Aplicadas:

1. **`useSpring` en lugar de `animate`**
   - Transiciones suaves sin re-renders
   - Física de resorte para movimiento natural

2. **`useTransform` para cálculos**
   - Interpola valores sin triggear React renders
   - GPU-accelerated cuando posible

3. **`strokeDasharray` / `strokeDashoffset`**
   - Animación nativa del navegador
   - Muy eficiente, no causa repaints

4. **SVG Filters para Glow**
   - `feGaussianBlur` es hardware-accelerated
   - Más eficiente que `box-shadow` múltiples

---

## 🔄 Diferencias con TracingBeam

| Característica | TracingBeam | CardAnimation |
|----------------|-------------|---------------|
| **Target** | Línea vertical única | Borde completo de cada card |
| **Scroll Progress** | Global de la sección | Individual por card |
| **Sincronización** | Con viewport completo | Con posición de la card |
| **Efecto Principal** | Línea que se dibuja verticalmente | Perímetro que se traza en círculo |
| **Glow** | Gradiente que sigue la línea | Aumenta cerca del centro |

---

## 💡 Casos de Uso

### ✅ **Ideal para:**
- Cards de proyectos
- Cards de timeline/historia
- Cards de skills/habilidades
- Cualquier grid de contenido scrolleable

### ❌ **No recomendado para:**
- Elementos muy pequeños (<100px)
- Cards con mucho movimiento interno
- Secciones con scroll horizontal

---

## 🎭 Resultado Visual

1. **Al scrollear hacia abajo:**
   - Los bordes de cada card se van "dibujando" progresivamente
   - El trazado sigue el perímetro en sentido horario
   - Cuando la card llega al centro del viewport, el glow se intensifica

2. **Efecto combinado:**
   - **Trazado**: Se dibuja según scroll progress de la card
   - **Glow**: Se intensifica según distancia al centro del viewport
   - **Resultado**: Efecto dinámico y cinematográfico que guía la atención

---

## 🔧 Debugging

Para ver el efecto en acción:

1. **Verifica que `enableBeam={true}`**
2. **Scrollea lentamente** para ver el trazado progresivo
3. **Observa el glow** cuando la card pasa por el centro
4. **Ajusta `influenceRadius`** si quieres más/menos sensibilidad al centro

### Problemas Comunes:

**No se ve el trazo:**
- Verifica que la card tenga `dimensions` correctas
- Asegúrate que `smoothProgress` esté cambiando (usar React DevTools)

**Trazo muy rápido/lento:**
- Ajusta el rango en `useTransform(smoothProgress, [0, 0.8], ...)`
- Valores más bajos = trazado más rápido

**Glow muy débil:**
- Aumenta `maxIntensity` (default: 1)
- Disminuye `influenceRadius` (default: 200px)

---

## 🎓 Conceptos Técnicos

### stroke-dasharray y stroke-dashoffset
```
stroke-dasharray: 100    → Línea de 100px, espacio de 100px
stroke-dashoffset: 50    → Desplazar patrón 50px

Para "dibujar" una línea:
- dasharray = longitud total de la línea
- dashoffset = longitud total (no visible)
- Animar dashoffset de total → 0 (dibuja la línea)
```

### Scroll-based Animation
```typescript
// El hook useScroll devuelve progress entre 0 y 1
// Basado en los offsets definidos:
offset: ["start end", "end start"]
       │     │       │    │
       │     │       │    └─ Cuando el final del target está en el inicio del viewport
       │     │       └────── Cuando el final del target está en el final del viewport
       │     └────────────── Cuando el inicio del target está en el final del viewport
       └──────────────────── Cuando el inicio del target está en el inicio del viewport
```

---

## 🚀 Próximas Mejoras Posibles

1. **Dirección del trazado**: Permitir trazado antihorario o desde diferentes esquinas
2. **Múltiples trazos**: Varios bordes que se dibujan simultáneamente
3. **Colores dinámicos**: Cambiar color según sección o contexto
4. **Partículas animadas**: Puntos que siguen el trazo progresivamente
5. **Sincronización con Lenis**: Usar el scroll global además del local

---

¡Disfruta del efecto! 🎨✨

