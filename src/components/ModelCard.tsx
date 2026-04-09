import { motion } from "framer-motion";

interface ModelMetrics {
  model: string;
  r2: number;
  mape: number;
  rmse: number;
}

interface ModelCardProps {
  metrics: ModelMetrics;
  isBest: boolean;
  accentColor: "blue" | "orange";
}

const ACCENT_MAP = {
  blue: {
    ring: "ring-blue-600",
    badge: "bg-blue-600 text-white",
    highlight: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/50",
  },
  orange: {
    ring: "ring-orange-500",
    badge: "bg-orange-500 text-white",
    highlight: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800/50",
  },
};

const MODEL_DESCRIPTIONS: Record<string, string> = {
  RF: "Random Forest",
  XGBoost: "Gradient Boosting",
  LSTM: "Long Short-Term Memory",
};

export function ModelCard({ metrics, isBest, accentColor }: ModelCardProps) {
  const accent = ACCENT_MAP[accentColor];

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl border bg-white dark:bg-gray-900 p-6 transition-shadow ${
        isBest
          ? `${accent.border} ring-2 ${accent.ring} shadow-md`
          : "border-gray-100 dark:border-gray-800 shadow-sm"
      }`}
    >
      {isBest && (
        <span
          className={`absolute -top-3 left-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${accent.badge}`}
        >
          En Iyi Model (En dusuk hata)
        </span>
      )}

      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{metrics.model}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {MODEL_DESCRIPTIONS[metrics.model] ?? metrics.model}
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">R2 Skoru</span>
            <span
              className={`text-lg font-bold tabular-nums ${
                isBest ? accent.highlight : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {metrics.r2.toFixed(4)}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
            Model ne kadar iyi ogrendi: 1.0 = mukemmel
          </p>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.max(0, metrics.r2 * 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`h-full rounded-full ${isBest ? accent.badge.split(" ")[0] : "bg-gray-400"}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className={`rounded-xl ${accent.bg} px-3 py-2`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">MAPE</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
              {metrics.mape.toFixed(2)}%
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              Ortalama tahmin hatasi %
            </p>
          </div>
          <div className={`rounded-xl ${accent.bg} px-3 py-2`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">RMSE</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
              {metrics.rmse.toFixed(2)}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              Tipik tahmin sapma miktari
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
