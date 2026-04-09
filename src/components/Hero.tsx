import { motion } from "framer-motion";
import type { Asama1Metric, Asama2Metric, Asama3Metric } from "../types";

interface HeroProps {
  asama1Metrics: Asama1Metric[];
  asama2Metrics: Asama2Metric[];
  asama3Metrics: Asama3Metric[];
}

function computeAsama1AvgR2(metrics: Asama1Metric[]): number {
  const validMetrics = metrics.filter((m) => m.wf_cv_r2 > 0);
  if (validMetrics.length === 0) return 0;
  const sum = validMetrics.reduce((acc, m) => acc + m.wf_cv_r2, 0);
  return sum / validMetrics.length;
}

function getBestR2(metrics: Array<{ model: string; r2: number }>): {
  model: string;
  r2: number;
} {
  return metrics.reduce((best, curr) =>
    curr.r2 > best.r2 ? curr : best
  );
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const PIPELINE_STEPS = [
  {
    label: "Asama 1",
    sublabel: "Feature Tahmini",
    color: "bg-green-600",
    textColor: "text-green-600",
    borderColor: "border-[var(--pastel-green-border)] dark:border-green-800/50",
    bgLight: "bg-[var(--pastel-green)] dark:bg-green-950/40",
  },
  {
    label: "Asama 2",
    sublabel: "Elektrik Tahmini",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-[var(--pastel-blue-border)] dark:border-blue-800/50",
    bgLight: "bg-[var(--pastel-blue)] dark:bg-blue-950/40",
  },
  {
    label: "Asama 3",
    sublabel: "Karbon Tahmini",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-[var(--pastel-orange-border)] dark:border-orange-800/50",
    bgLight: "bg-[var(--pastel-orange)] dark:bg-orange-950/40",
  },
];

export function Hero({ asama1Metrics, asama2Metrics, asama3Metrics }: HeroProps) {
  const asama1AvgR2 = computeAsama1AvgR2(asama1Metrics);
  const bestAsama2 = getBestR2(asama2Metrics);
  const bestAsama3 = getBestR2(asama3Metrics);

  const stats = [
    {
      title: "Asama 1 - Ort. R\u00B2",
      value: asama1AvgR2.toFixed(4),
      description: "Feature tahmin ortalamasi",
      accent: "text-green-600",
      bgColor: "bg-[var(--pastel-green)] dark:bg-green-950/40",
      borderColor: "border-[var(--pastel-green-border)] dark:border-green-800/50",
    },
    {
      title: `Asama 2 - ${bestAsama2.model}`,
      value: bestAsama2.r2.toFixed(4),
      description: "En iyi elektrik tahmin modeli",
      accent: "text-blue-600",
      bgColor: "bg-[var(--pastel-blue)] dark:bg-blue-950/40",
      borderColor: "border-[var(--pastel-blue-border)] dark:border-blue-800/50",
    },
    {
      title: `Asama 3 - ${bestAsama3.model}`,
      value: bestAsama3.r2.toFixed(4),
      description: "En iyi karbon tahmin modeli",
      accent: "text-orange-500",
      bgColor: "bg-[var(--pastel-orange)] dark:bg-orange-950/40",
      borderColor: "border-[var(--pastel-orange-border)] dark:border-orange-800/50",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[var(--pastel-surface)] dark:bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--pastel-muted)]/80 dark:from-gray-900/80 to-[var(--pastel-surface)] dark:to-gray-950 pointer-events-none" />

      <div className="relative px-4 py-16 md:px-12 md:py-24 lg:px-20 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h1
            variants={fadeIn}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Makine Ogrenmesi ile{" "}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Enerji Tuketimi Tahmini
            </span>{" "}
            ve Karbon Ayak Izi Analizi
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-3"
          >
            Turkiye 2026-2030 Projeksiyonu
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="text-sm text-gray-400 dark:text-gray-500 max-w-2xl mx-auto mb-16"
          >
            Yavuzhan Kursun, Betul Canol, Eren Yalaz
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-20 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl border ${stat.borderColor} ${stat.bgColor} p-6 text-left`}
              >
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.accent} tracking-tight`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-8">
              Pipeline Akisi
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`rounded-xl border ${step.borderColor} ${step.bgLight} px-8 py-4 text-center min-w-[160px]`}
                  >
                    <div className={`w-2 h-2 rounded-full ${step.color} mx-auto mb-2`} />
                    <p className={`text-sm font-semibold ${step.textColor}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {step.sublabel}
                    </p>
                  </motion.div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden md:block w-12 h-px bg-[var(--pastel-border)] dark:bg-gray-700 mx-1 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[var(--pastel-muted-strong)] dark:border-l-gray-600" />
                    </div>
                  )}
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className="md:hidden h-8 w-px bg-[var(--pastel-border)] dark:bg-gray-700 relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[var(--pastel-muted-strong)] dark:border-t-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
