# 🎯 CONTROL POR SEGMENTOS DE SCROLL - EJEMPLOS PRÁCTICOS

## 🚀 **IMPLEMENTACIÓN COMPLETADA**

He implementado el control por segmentos de scroll en tu `TracingBeam`. Ahora la línea cambia de forma según el progreso del scroll.

## 📍 **UBICACIÓN DEL CÓDIGO**
`components/ui/tracingBeam/TracingBeamPath.tsx` - Función `generateCustomPath()`

## 🎨 **EJEMPLO ACTUAL IMPLEMENTADO**

### **Segmentos Configurados:**
- **0-25% del scroll**: Línea recta
- **25-50% del scroll**: Línea con curva suave
- **50-75% del scroll**: Forma de diamante
- **75-100% del scroll**: Curva en S

### **Código Implementado:**
```tsx
const generateCustomPath = (curveType: string) => {
  const scrollProgress = scrollYProgress.get();
  
  const segment1End = 0.25;  // 0-25% del scroll
  const segment2End = 0.5;   // 25-50% del scroll
  const segment3End = 0.75;  // 50-75% del scroll
  
  if (scrollProgress <= segment1End) {
    // Línea recta
    return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`;
  } 
  else if (scrollProgress <= segment2End) {
    // Línea con curva
    return `M ${adjustedX} 0 Q ${adjustedX + (isLeft ? 20 : -20)} ${svgHeight * 0.5} ${adjustedX} ${svgHeight}`;
  } 
  else if (scrollProgress <= segment3End) {
    // Forma de diamante
    const diamondWidth = 15;
    return `M ${adjustedX} 0 
            L ${adjustedX} ${svgHeight * 0.3}
            L ${adjustedX + (isLeft ? diamondWidth : -diamondWidth)} ${svgHeight * 0.5}
            L ${adjustedX} ${svgHeight * 0.7}
            L ${adjustedX} ${svgHeight}`;
  } 
  else {
    // Curva en S
    const sOffset = 25;
    return `M ${adjustedX} 0 
            Q ${adjustedX + (isLeft ? sOffset : -sOffset)} ${svgHeight * 0.3} ${adjustedX} ${svgHeight * 0.6}
            Q ${adjustedX - (isLeft ? sOffset : -sOffset)} ${svgHeight * 0.9} ${adjustedX} ${svgHeight}`;
  }
};
```

## 🔧 **CÓMO PERSONALIZAR LOS SEGMENTOS**

### **1. Cambiar los Rangos de Scroll:**
```tsx
const segment1End = 0.2;   // 0-20% del scroll
const segment2End = 0.4;   // 20-40% del scroll
const segment3End = 0.8;   // 40-80% del scroll
// 80-100% del scroll
```

### **2. Agregar Más Segmentos:**
```tsx
const segment1End = 0.2;   // 0-20%
const segment2End = 0.4;   // 20-40%
const segment3End = 0.6;   // 40-60%
const segment4End = 0.8;   // 60-80%
// 80-100%

if (scrollProgress <= segment1End) {
  // Segmento 1
} 
else if (scrollProgress <= segment2End) {
  // Segmento 2
} 
else if (scrollProgress <= segment3End) {
  // Segmento 3
} 
else if (scrollProgress <= segment4End) {
  // Segmento 4
} 
else {
  // Segmento 5
}
```

### **3. Control por Viewport Height (vh):**
```tsx
// Si tu sección tiene 600vh, cada 0.1 = 60vh
const segment1End = 0.1;   // 0-60vh
const segment2End = 0.2;   // 60-120vh
const segment3End = 0.3;   // 120-180vh
// 180vh+
```

## 🎨 **EJEMPLOS DE FORMAS POR SEGMENTO**

### **Segmento 1 - Línea Recta:**
```tsx
return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`;
```

### **Segmento 2 - Línea Diagonal:**
```tsx
return `M ${adjustedX} 0 L ${adjustedX + 30} ${svgHeight}`;
```

### **Segmento 3 - Forma de Diamante:**
```tsx
const diamondWidth = 20;
return `M ${adjustedX} 0 
        L ${adjustedX} ${svgHeight * 0.3}
        L ${adjustedX + diamondWidth} ${svgHeight * 0.5}
        L ${adjustedX} ${svgHeight * 0.7}
        L ${adjustedX} ${svgHeight}`;
```

### **Segmento 4 - Curva en S:**
```tsx
const sOffset = 30;
return `M ${adjustedX} 0 
        Q ${adjustedX + sOffset} ${svgHeight * 0.3} ${adjustedX} ${svgHeight * 0.6}
        Q ${adjustedX - sOffset} ${svgHeight * 0.9} ${adjustedX} ${svgHeight}`;
```

### **Segmento 5 - Circuito Cerrado:**
```tsx
const width = 50;
return `M ${adjustedX} 0 
        L ${adjustedX + width} 0 
        L ${adjustedX + width} ${svgHeight} 
        L ${adjustedX} ${svgHeight} 
        Z`;
```

## 🌊 **TRANSICIONES SUAVES (OPCIONAL)**

Si quieres transiciones suaves entre segmentos, usa la función `generateSmoothTransitionPath()`:

```tsx
// En el SVG, cambia:
d={generateCustomPath("")}
// Por:
d={generateSmoothTransitionPath()}
```

### **Ejemplo de Transición Suave:**
```tsx
// Transición suave entre recta y curva
const t = (scrollProgress - segment1End) / (segment2End - segment1End);
const curveOffset = 20 * t; // Interpolación suave
return `M ${adjustedX} 0 Q ${adjustedX + curveOffset} ${svgHeight * 0.5} ${adjustedX} ${svgHeight}`;
```

## 🎯 **TU CASO ESPECÍFICO**

Para tu caso donde quieres:
- **0-100vh**: Línea recta
- **100vh+**: Otra forma

```tsx
const generateCustomPath = (curveType: string) => {
  const scrollProgress = scrollYProgress.get();
  
  // Si tu sección tiene 600vh, 100vh = 0.167 (100/600)
  const rectEnd = 0.167; // 0-100vh
  
  if (scrollProgress <= rectEnd) {
    // 0-100vh: Línea recta
    return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`;
  } 
  else {
    // 100vh+: Tu otra forma
    return `M ${adjustedX} 0 Q ${adjustedX + 25} ${svgHeight * 0.5} ${adjustedX} ${svgHeight}`;
  }
};
```

## 🚀 **CÓMO PROBAR**

1. **Guarda** el archivo `TracingBeamPath.tsx`
2. **Recarga** tu aplicación
3. **Haz scroll** en la sección con TracingBeam
4. **Observa** cómo la línea cambia de forma según el scroll

## 💡 **CONSEJOS**

- **Ajusta los porcentajes** según la altura de tu contenido
- **Usa valores pequeños** para cambios más frecuentes
- **Prueba diferentes formas** en cada segmento
- **Considera las transiciones suaves** para mejor UX

¡Ahora tienes control total sobre cuándo y cómo cambia tu línea! 🎉
