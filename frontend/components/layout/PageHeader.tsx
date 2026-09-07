"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  badge?: { icon?: React.ComponentType<{ size?: number; className?: string }>; text: string; variant?: "violet" | "emerald" | "blue" | "amber" };
  title: React.ReactNode;
  description: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const BADGE_VARIANTS = {
  violet: "bg-purple-500/10 border-purple-400/20 text-purple-200",
  emerald: "bg-green-500/10 border-green-400/20 text-green-200",
  blue: "bg-blue-500/10 border-blue-400/20 text-blue-200",
  amber: "bg-yellow-500/10 border-yellow-400/20 text-yellow-200",
};

export default function PageHeader({ badge, title, description, actions, className = "" }: PageHeaderProps) {
  const Icon = badge?.icon;
  return <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.2, .8, .2, 1] }} className={`mb-10 md:mb-12 ${className}`}>
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
      <div>
        {badge && <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border mb-5 tracking-wide ${BADGE_VARIANTS[badge.variant || "violet"]}`}>{Icon && <Icon size={12} />}<span>{badge.text}</span></div>}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-[-.04em] text-white mb-4">{title}</h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">{description}</p>
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  </motion.div>;
}
