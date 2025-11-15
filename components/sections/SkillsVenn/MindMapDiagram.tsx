"use client";

import { motion } from "framer-motion";
import { MindMapNode } from "./MindMapTypes";

type Central = {
  title: string;
  subtitle?: string;
};

interface Props {
  data: {
    central: Central;
    categories: MindMapNode[];
  };
  activeCategoryId: string | null;
  onCategorySelect: (id: string) => void;
}

export default function MindMapDiagram({
  data,
  activeCategoryId,
  onCategorySelect,
}: Props) {
  const { central, categories } = data;

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/7] overflow-hidden rounded-3xl bg-[#020617]/70 backdrop-blur-xl">
      
      {/* BACKGROUND DECORATION */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(circle at 15% 75%, rgba(244,114,182,0.25), transparent 60%), radial-gradient(circle at 85% 75%, rgba(16,185,129,0.25), transparent 60%)",
        }}
      />

      {/* LINES */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g stroke="rgba(148,163,184,0.25)" strokeWidth="0.35">
          {categories.map((cat) => (
            <line key={cat.id} x1="50" y1="50" x2={cat.x} y2={cat.y} />
          ))}
        </g>
      </svg>

      {/* CENTRAL NODE */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(96,165,250,0.6), transparent 70%)",
            }}
          />
          <div className="relative rounded-full border border-white/20 bg-black/40 backdrop-blur-2xl px-8 py-4 shadow-[0_0_55px_rgba(59,130,246,0.4)]">
            <p className="text-xs tracking-[0.35em] text-slate-300/70 uppercase mb-1">
              Rol principal
            </p>
            <p className="text-xl md:text-3xl font-semibold text-white">
              {central.title}
            </p>
            {central.subtitle && (
              <p className="mt-1 text-xs md:text-sm text-slate-200/70">
                {central.subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* CATEGORY NODES */}
      {categories.map((cat) => {
        const active = cat.id === activeCategoryId;

        return (
          <motion.button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{
              left: `${cat.x}%`,
              top: `${cat.y}%`,
            }}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          >
            {/* OUTER CIRCLE */}
            <div
              className="flex items-center justify-center rounded-full backdrop-blur-md border border-white/20"
              style={{
                height: "56px",
                width: "56px",
                backgroundColor: "rgba(0,0,0,0.5)",
                boxShadow: active
                  ? `0 0 28px ${cat.glowColor ?? cat.color}70`
                  : "0 0 15px rgba(0,0,0,0.6)",
              }}
            >
              {/* INNER CIRCLE */}
              <div
                className="h-7 w-7 rounded-full border border-white/50"
                style={{ backgroundColor: cat.bgColor }}
              />
            </div>

            {/* TITLE */}
            <span
              className={`text-[10px] md:text-xs whitespace-nowrap font-medium ${
                active ? "text-white" : "text-slate-300/80"
              }`}
            >
              {cat.title}
            </span>
          </motion.button>
        );
      })}

    </div>
  );
}
