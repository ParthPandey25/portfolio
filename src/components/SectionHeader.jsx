"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable section header with a dual-tone animated underline.
 * Props:
 *   title   — main heading text
 *   subtitle — optional small line above
 *   accent   — "emerald" | "cyan" | "dual" (default: "dual")
 *   align    — "left" | "center" (default: "left")
 */
export default function SectionHeader({ title, subtitle, accent = "dual", align = "left" }) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  const underline =
    accent === "emerald"
      ? "from-emerald-500 to-emerald-400"
      : accent === "cyan"
      ? "from-cyan-500 to-cyan-400"
      : "from-emerald-500 to-cyan-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-2 mb-12 ${alignClass}`}
    >
      {subtitle && (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-500/80">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 leading-tight">
        {title}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "5rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-1 rounded-full bg-gradient-to-r ${underline} ${align === "center" ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
