import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface StageSectionProps {
  id: string;
  stageNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  accentColor: "green" | "blue" | "orange";
  children: ReactNode;
}

const ACCENT_MAP = {
  green: {
    dot: "bg-green-600",
    badge: "bg-green-50 dark:bg-green-950/40 text-green-600 border-green-200 dark:border-green-800/50",
    line: "from-green-600/20 to-transparent",
  },
  blue: {
    dot: "bg-blue-600",
    badge: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800/50",
    line: "from-blue-600/20 to-transparent",
  },
  orange: {
    dot: "bg-orange-500",
    badge: "bg-orange-50 dark:bg-orange-950/40 text-orange-500 border-orange-200 dark:border-orange-800/50",
    line: "from-orange-500/20 to-transparent",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StageSection({
  id,
  stageNumber,
  title,
  subtitle,
  accentColor,
  children,
}: StageSectionProps) {
  const accent = ACCENT_MAP[accentColor];

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={fadeInUp}
      className="px-6 py-20 md:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full ${accent.dot}`} />
          <span
            className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${accent.badge}`}
          >
            Asama {stageNumber}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">{subtitle}</p>

        <div className={`h-px w-16 bg-gradient-to-r ${accent.line} mt-5`} />
      </div>

      <div className="space-y-8">{children}</div>
    </motion.section>
  );
}
