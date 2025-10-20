# 🎨 GUÍA PARA DIBUJAR LÍNEAS MANUALMENTE EN TRACING BEAM

## 📍 **UBICACIÓN DEL ARCHIVO**
`components/ui/tracingBeam/TracingBeamPath.tsx`

## 🔧 **FUNCIÓN PRINCIPAL**
Busca la función `generateCustomPath()` en la línea 44. **AHÍ ES DONDE VAS A DIBUJAR TU LÍNEA**.

## 🎯 **CÓMO FUNCIONA**

### **1. Configuración Básica**
```tsx
const baseX = isLeft ? 1 : 19; // Posición X base (1 = izquierda, 19 = derecha)
const adjustedX = baseX + xOffset; // Aplicamos el offset horizontal
```

### **2. Variables Disponibles**
- `adjustedX` = Posición X de tu línea
- `svgHeight` = Altura total del SVG
- `isLeft` = true si está a la izquierda, false si está a la derecha
- `xOffset` = Offset horizontal que puedes ajustar

## 🖊️ **COMANDOS SVG QUE PUEDES USAR**

### **Comandos Básicos:**
- `M x y` = Move to (mover a posición)
- `L x y` = Line to (línea recta)
- `Q x1 y1 x2 y2` = Quadratic curve (curva cuadrática)
- `C x1 y1 x2 y2 x3 y3` = Cubic curve (curva cúbica)
- `Z` = Close path (cerrar path)

### **Ejemplos de Uso:**

#### **1. Línea Recta Simple:**
```tsx
return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight}`;
```

#### **2. Línea con Curva Suave:**
```tsx
return `M ${adjustedX} 0 Q ${adjustedX + 20} ${svgHeight * 0.5} ${adjustedX} ${svgHeight}`;
```

#### **3. Línea con Múltiples Segmentos:**
```tsx
return `M ${adjustedX} 0 L ${adjustedX} ${svgHeight * 0.3} L ${adjustedX + 20} ${svgHeight * 0.7} L ${adjustedX} ${svgHeight}`;
```

#### **4. Forma de Diamante:**
```tsx
const diamondWidth = 15;
const diamondStart = svgHeight * 0.3;
const diamondEnd = svgHeight * 0.7;
return `M ${adjustedX} 0 L ${adjustedX} ${diamondStart} L ${adjustedX + diamondWidth} ${svgHeight * 0.5} L ${adjustedX} ${diamondEnd} L ${adjustedX} ${svgHeight}`;
```

#### **5. Curva en S:**
```tsx
const sOffset = 25;
return `M ${adjustedX} 0 Q ${adjustedX + sOffset} ${svgHeight * 0.3} ${adjustedX} ${svgHeight * 0.6} Q ${adjustedX - sOffset} ${svgHeight * 0.9} ${adjustedX} ${svgHeight}`;
```

## 🎨 **PARA DIBUJAR TU FORMA ESPECÍFICA:**

### **Paso 1: Planifica tu forma**
- ¿Dónde empieza? (usualmente `M ${adjustedX} 0`)
- ¿Qué segmentos tiene? (rectos, curvas, etc.)
- ¿Dónde termina? (usualmente `L ${adjustedX} ${svgHeight}`)

### **Paso 2: Usa porcentajes de altura**
- `svgHeight * 0.25` = 25% de la altura
- `svgHeight * 0.5` = 50% de la altura
- `svgHeight * 0.75` = 75% de la altura

### **Paso 3: Ajusta el ancho**
- `adjustedX + 20` = 20 píxeles a la derecha
- `adjustedX - 20` = 20 píxeles a la izquierda

## 🔄 **RESPONSIVE Y POSICIONAMIENTO**

### **Para Líneas a la Izquierda:**
```tsx
// Usa valores positivos para ir hacia la derecha
L ${adjustedX + 20} ${svgHeight * 0.5}
```

### **Para Líneas a la Derecha:**
```tsx
// Usa valores negativos para ir hacia la izquierda
L ${adjustedX - 20} ${svgHeight * 0.5}
```

### **Para que funcione en ambos lados:**
```tsx
// Usa isLeft para determinar la dirección
L ${adjustedX + (isLeft ? 20 : -20)} ${svgHeight * 0.5}
```

## 🎯 **EJEMPLO COMPLETO - TU FORMA ESPECÍFICA:**

```tsx
const generateCustomPath = () => {
  // Segmento recto inicial (0% a 25%)
  const segment1End = svgHeight * 0.25;
  
  // Diamante (25% a 55%)
  const diamondStart = svgHeight * 0.25;
  const diamondEnd = svgHeight * 0.55;
  const diamondWidth = 15;
  
  // Curva S (55% a 100%)
  const sCurveStart = svgHeight * 0.55;
  const sOffset = 20;
  
  return `M ${adjustedX} 0 
          L ${adjustedX} ${segment1End}
          L ${adjustedX + (isLeft ? diamondWidth : -diamondWidth)} ${diamondStart + (diamondEnd - diamondStart) * 0.5}
          L ${adjustedX} ${diamondEnd}
          Q ${adjustedX + (isLeft ? sOffset : -sOffset)} ${sCurveStart + (svgHeight - sCurveStart) * 0.3} ${adjustedX} ${sCurveStart + (svgHeight - sCurveStart) * 0.6}
          Q ${adjustedX - (isLeft ? sOffset : -sOffset)} ${svgHeight * 0.9} ${adjustedX} ${svgHeight}`;
};
```

## 🚀 **PASOS PARA IMPLEMENTAR:**

1. **Abre** `components/ui/tracingBeam/TracingBeamPath.tsx`
2. **Busca** la función `generateCustomPath()` (línea 44)
3. **Reemplaza** el `return` actual con tu forma personalizada
4. **Guarda** el archivo
5. **Recarga** tu aplicación

## 💡 **CONSEJOS:**

- **Empieza simple**: Haz una línea recta primero
- **Usa comentarios**: Documenta cada segmento
- **Prueba valores**: Cambia números hasta que se vea bien
- **Usa porcentajes**: `svgHeight * 0.5` es más flexible que números fijos
- **Considera ambos lados**: Usa `isLeft` para que funcione en izquierda y derecha

¡Ahora puedes dibujar cualquier forma que quieras! 🎨
