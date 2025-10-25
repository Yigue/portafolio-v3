# 🎯 GUÍA COMPLETA: CONTROL TOTAL CON SEGMENTOS

## 🚀 **¿QUÉ ES LA VARIABLE SEGMENTS?**

La variable `segments` es un array que define **cada tramo** de tu línea SVG. Cada elemento del array representa un segmento que se dibuja progresivamente según el scroll.

## 📐 **ESTRUCTURA DE UN SEGMENTO**

```typescript
interface BaseSegment {
  cmd: SVGCommand;        // Comando SVG (L, Q, C, M, etc.)
  x: number;             // Posición X (en vw)
  y: number;             // Posición Y (en porcentaje 0-1)
  scrollStart?: number;  // Cuándo empieza (0-1)
  scrollEnd?: number;    // Cuándo termina (0-1)
}
```

## 🎨 **COMANDOS SVG DISPONIBLES**

### **1. L - Línea Recta**
```typescript
{
  cmd: "L",
  x: 20,        // 20vw hacia la derecha
  y: 0.5,       // 50% de la altura
  scrollStart: 0,
  scrollEnd: 0.3
}
```

### **2. Q - Curva Cuadrática**
```typescript
{
  cmd: "Q",
  cx: 30,       // Punto de control X: 30vw
  cy: 0.3,      // Punto de control Y: 30% altura
  x: 10,        // Punto final X: 10vw
  y: 0.6,       // Punto final Y: 60% altura
  scrollStart: 0.3,
  scrollEnd: 0.6
}
```

### **3. C - Curva Cúbica (S compleja)**
```typescript
{
  cmd: "C",
  cx1: -20,     // Primer control X: 20vw izquierda
  cy1: 0.7,     // Primer control Y: 70% altura
  cx2: 20,      // Segundo control X: 20vw derecha
  cy2: 0.8,     // Segundo control Y: 80% altura
  x: 0,         // Punto final X: centro
  y: 1,         // Punto final Y: 100% altura
  scrollStart: 0.6,
  scrollEnd: 1.0
}
```

### **4. M - Mover (sin dibujar)**
```typescript
{
  cmd: "M",
  x: 0,         // Mover a X: centro
  y: 0.5,       // Mover a Y: 50% altura
  scrollStart: 0.4,
  scrollEnd: 0.4
}
```

## 🎯 **EJEMPLOS PRÁCTICOS**

### **EJEMPLO 1: Línea Simple de Centro a Borde**
```typescript
const segments: Segment[] = [
  {
    cmd: "L",
    x: 40,        // De centro (10vw) a borde (50vw) = 40vw
    y: 1,         // Hasta el final
    scrollStart: 0,
    scrollEnd: 1
  }
];
```

### **EJEMPLO 2: Línea Diagonal 45 Grados**
```typescript
const segments: Segment[] = [
  {
    cmd: "L",
    x: 30,        // 30vw hacia la derecha
    y: 1,         // 100% de altura
    scrollStart: 0,
    scrollEnd: 1
  }
];
```

### **EJEMPLO 3: Forma de "S" Compleja**
```typescript
const segments: Segment[] = [
  // Segmento 1: Línea recta
  {
    cmd: "L",
    x: 0,
    y: 0.2,
    scrollStart: 0,
    scrollEnd: 0.2
  },
  
  // Segmento 2: Curva hacia la derecha
  {
    cmd: "Q",
    cx: 20,
    cy: 0.4,
    x: 20,
    y: 0.6,
    scrollStart: 0.2,
    scrollEnd: 0.5
  },
  
  // Segmento 3: Curva hacia la izquierda
  {
    cmd: "Q",
    cx: 0,
    cy: 0.8,
    x: 0,
    y: 1,
    scrollStart: 0.5,
    scrollEnd: 1
  }
];
```

### **EJEMPLO 4: Línea con Ramificaciones**
```typescript
const segments: Segment[] = [
  // Tronco principal
  {
    cmd: "L",
    x: 0,
    y: 0.5,
    scrollStart: 0,
    scrollEnd: 0.3
  },
  
  // Ramificación izquierda
  {
    cmd: "L",
    x: -20,
    y: 0.8,
    scrollStart: 0.3,
    scrollEnd: 0.6
  },
  
  // Volver al tronco
  {
    cmd: "M",
    x: 0,
    y: 0.5,
    scrollStart: 0.6,
    scrollEnd: 0.6
  },
  
  // Ramificación derecha
  {
    cmd: "L",
    x: 20,
    y: 1,
    scrollStart: 0.6,
    scrollEnd: 1
  }
];
```

## 📏 **UNIDADES Y MEDIDAS**

### **Coordenadas X (vw):**
- `0` = Centro del viewport
- `10` = 10vw a la derecha del centro
- `-10` = 10vw a la izquierda del centro
- `50` = 50vw a la derecha del centro

### **Coordenadas Y (porcentaje):**
- `0` = Parte superior del SVG
- `0.5` = Mitad del SVG
- `1` = Parte inferior del SVG

### **Timing (scrollStart/scrollEnd):**
- `0` = Inicio del scroll
- `0.5` = Mitad del scroll
- `1` = Final del scroll

## 🔧 **CÓMO PERSONALIZAR**

### **1. Cambiar la Dirección:**
```typescript
// Para lado izquierdo (isLeft = true)
x: 20,  // Se mueve hacia la derecha

// Para lado derecho (isLeft = false)  
x: 20,  // Se mueve hacia la izquierda (automático)
```

### **2. Controlar la Velocidad:**
```typescript
// Lento (se extiende por todo el scroll)
scrollStart: 0,
scrollEnd: 1

// Rápido (solo en la primera mitad)
scrollStart: 0,
scrollEnd: 0.5
```

### **3. Crear Pausas:**
```typescript
// Pausa entre segmentos
{
  cmd: "L",
  x: 0,
  y: 0.3,
  scrollStart: 0,
  scrollEnd: 0.2
},
// Pausa: 0.2 a 0.4 no se dibuja nada
{
  cmd: "L",
  x: 20,
  y: 0.6,
  scrollStart: 0.4,
  scrollEnd: 0.8
}
```

## 🎨 **EJEMPLOS AVANZADOS**

### **Línea que Dibuja un Cuadrado:**
```typescript
const segments: Segment[] = [
  { cmd: "L", x: 20, y: 0.2, scrollStart: 0, scrollEnd: 0.25 },
  { cmd: "L", x: 20, y: 0.8, scrollStart: 0.25, scrollEnd: 0.5 },
  { cmd: "L", x: 0, y: 0.8, scrollStart: 0.5, scrollEnd: 0.75 },
  { cmd: "L", x: 0, y: 0.2, scrollStart: 0.75, scrollEnd: 1 }
];
```

### **Línea que Dibuja un Círculo (aproximado):**
```typescript
const segments: Segment[] = [
  { cmd: "Q", cx: 10, cy: 0.2, x: 20, y: 0.5, scrollStart: 0, scrollEnd: 0.25 },
  { cmd: "Q", cx: 30, cy: 0.5, x: 20, y: 0.8, scrollStart: 0.25, scrollEnd: 0.5 },
  { cmd: "Q", cx: 10, cy: 0.8, x: 0, y: 0.5, scrollStart: 0.5, scrollEnd: 0.75 },
  { cmd: "Q", cx: -10, cy: 0.5, x: 0, y: 0.2, scrollStart: 0.75, scrollEnd: 1 }
];
```

## 🚀 **PASOS PARA IMPLEMENTAR**

1. **Abre** `components/ui/tracingBeam/TracingBeamPath.tsx`
2. **Busca** la variable `segments` (línea ~70)
3. **Edita** los segmentos según tu diseño
4. **Ajusta** las coordenadas X (vw) e Y (porcentaje)
5. **Controla** el timing con `scrollStart` y `scrollEnd`
6. **Guarda** y prueba

## 💡 **CONSEJOS**

- **Empieza simple**: Usa solo comandos "L" al principio
- **Prueba valores pequeños**: X entre -20 y 20, Y entre 0 y 1
- **Usa scrollStart/scrollEnd**: Para controlar cuándo aparece cada segmento
- **Combiná comandos**: L para rectas, Q para curvas suaves, C para curvas complejas
- **Experimentá**: Cambiá valores y ve qué pasa

¡Ahora tenés control total sobre cada tramo de tu línea SVG! 🎉
