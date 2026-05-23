import { motion } from "framer-motion";
import type { Asama1Metric, Asama2Metric, Asama3Metric } from "../types";
import { FEATURE_LABELS, MODEL_LABELS } from "../lib/labels";
import { R2BarChart, type R2Datum } from "./R2BarChart";

interface R2ComparisonSectionProps {
  asama1: Asama1Metric[];
  asama2: Asama2Metric[];
  asama3: Asama3Metric[];
  isDark: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StageBlock({
  badge,
  badgeClass,
  title,
  subtitle,
  data,
  isDark,
  horizontalBars = false,
}: {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  data: R2Datum[];
  isDark: boolean;
  horizontalBars?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--pastel-border)] dark:border-gray-800 bg-[var(--pastel-surface)] dark:bg-gray-900 p-5 md:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeClass}`}
        >
          {badge}
        </span>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>
      <R2BarChart data={data} isDark={isDark} horizontalBars={horizontalBars} />
    </div>
  );
}

export function R2ComparisonSection({
  asama1,
  asama2,
  asama3,
  isDark,
}: R2ComparisonSectionProps) {
  const asama1Data: R2Datum[] = asama1
    .map((m) => ({
      label: FEATURE_LABELS[m.feature] ?? m.feature,
      r2: m.wf_cv_r2 ?? 0,
      sub: `Secilen model: ${MODEL_LABELS[m.secilen_model] ?? m.secilen_model}`,
    }))
    .sort((a, b) => b.r2 - a.r2);

  const asama2Data: R2Datum[] = asama2.map((m) => ({
    label: m.model,
    r2: m.r2,
    sub: MODEL_LABELS[m.model] ?? m.model,
  }));

  const asama3Data: R2Datum[] = asama3.map((m) => ({
    label: m.model,
    r2: m.r2,
    sub: MODEL_LABELS[m.model] ?? m.model,
  }));

  return (
    <motion.section
      id="r2-karsilastirma"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={fadeInUp}
      className="px-4 py-16 md:py-20 md:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-600 via-blue-600 to-orange-500" />
          <span className="inline-flex items-center rounded-full border border-[var(--pastel-border)] dark:border-gray-700 bg-[var(--pastel-muted)] dark:bg-gray-800/60 px-3 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            Model Karsilastirmasi
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          R<sup>2</sup> Skorlari
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          Uc asamadaki tum modellerin R<sup>2</sup> (belirleme katsayisi) ciktilari.
          R<sup>2</sup> 1.0'a yaklastikca model ilgili hedefi o kadar iyi tahmin ediyor demektir.
        </p>

        {/* Renk lejandi */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#16a34a" }} />
            Iyi (R<sup>2</sup> &ge; 0.70)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#ca8a04" }} />
            Orta (0.40 &ndash; 0.70)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#ef4444" }} />
            Zayif (R<sup>2</sup> &lt; 0.40)
          </span>
        </div>

        <div className="h-px w-16 bg-gradient-to-r from-blue-600/20 to-orange-500/20 mt-5" />
      </div>

      <div className="space-y-6">
        <StageBlock
          badge="Asama 1"
          badgeClass="bg-[var(--pastel-green)] dark:bg-green-950/40 text-green-600 border-[var(--pastel-green-border)] dark:border-green-800/50"
          title="Hedef Degiskenlerin Tahminleri"
          subtitle="Her girdi degiskeni icin secilen en iyi modelin R2 degeri (yuksekten dusuge sirali)."
          data={asama1Data}
          isDark={isDark}
          horizontalBars
        />

        <StageBlock
          badge="Asama 2"
          badgeClass="bg-[var(--pastel-blue)] dark:bg-blue-950/40 text-blue-600 border-[var(--pastel-blue-border)] dark:border-blue-800/50"
          title="Elektrik Talebi Tahmini"
          subtitle="Random Forest, XGBoost ve LSTM modellerinin elektrik talebi tahminindeki R2 karsilastirmasi."
          data={asama2Data}
          isDark={isDark}
        />

        <StageBlock
          badge="Asama 3"
          badgeClass="bg-[var(--pastel-orange)] dark:bg-orange-950/40 text-orange-500 border-[var(--pastel-orange-border)] dark:border-orange-800/50"
          title="Karbon Ayak Izi Tahmini"
          subtitle="Ayni uc modelin CO2 emisyon tahminindeki R2 karsilastirmasi."
          data={asama3Data}
          isDark={isDark}
        />
      </div>
    </motion.section>
  );
}
