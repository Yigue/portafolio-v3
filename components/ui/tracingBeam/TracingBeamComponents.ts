// COMPONENTES TRACING BEAM DESCOMPUESTOS
// 
// Este archivo exporta todos los componentes pequeños que forman
// el sistema completo de TracingBeam.

// Hook principal para la lógica
export { useTracingBeam } from "@/lib/hooks/useTracingBeam";

// Componentes individuales
export { TracingBeamIndicator } from "./TracingBeamIndicator";
export { TracingBeamGradient } from "./TracingBeamGradient";
export { TracingBeamPath } from "./TracingBeamPath";

// Componente principal refactorizado
export { TracingBeam } from "./TracingBeamRefactored";

// Componente original (para compatibilidad)
export { TracingBeam as TracingBeamOriginal } from "./TracingBeam";
