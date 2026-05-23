import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageModal } from "./ImageModal";

interface ImportanceItem {
  src: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
}

const ITEMS: ImportanceItem[] = [
  {
    src: "/graphs/asama2_XGBoost_feature_importance.png",
    badge: "Elektrik",
    badgeClass:
      "bg-[var(--pastel-blue)] dark:bg-blue-950/40 text-blue-600 border-[var(--pastel-blue-border)] dark:border-blue-800/50",
    title: "Elektrik Tuketimini Etkileyen Parametreler",
    description:
      "Elektrik talebi modelinde (XGBoost) hangi girdi degiskenlerinin tahmine en cok katki yaptigini gosteren onem analizi.",
  },
  {
    src: "/graphs/asama3_XGBoost_feature_importance.png",
    badge: "Karbon",
    badgeClass:
      "bg-[var(--pastel-orange)] dark:bg-orange-950/40 text-orange-500 border-[var(--pastel-orange-border)] dark:border-orange-800/50",
    title: "Karbon Ayak Izini Etkileyen Faktorler",
    description:
      "CO2 emisyon modelinde (XGBoost) karbon ayak izini en cok belirleyen faktorlerin onem siralamasi.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeatureImportanceSection() {
  const [selected, setSelected] = useState<ImportanceItem | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <motion.section
      id="etki-analizi"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={fadeInUp}
      className="px-4 py-16 md:py-20 md:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-500" />
          <span className="inline-flex items-center rounded-full border border-[var(--pastel-border)] dark:border-gray-700 bg-[var(--pastel-muted)] dark:bg-gray-800/60 px-3 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            Etki Analizi
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Feature Importance
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          Elektrik tuketimini ve karbon ayak izini en cok etkileyen degiskenler.
          Cubuklar uzadikca ilgili parametrenin tahmin uzerindeki etkisi artar.
        </p>
        <div className="h-px w-16 bg-gradient-to-r from-blue-600/20 to-orange-500/20 mt-5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ITEMS.map((item) => (
          <div
            key={item.src}
            className="rounded-2xl border border-[var(--pastel-border)] dark:border-gray-800 bg-[var(--pastel-surface)] dark:bg-gray-900 p-5 md:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeClass}`}
              >
                {item.badge}
              </span>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {item.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelected(item)}
              className="block w-full rounded-xl border border-[var(--pastel-border)] dark:border-gray-800 bg-[var(--pastel-muted)] dark:bg-gray-800 p-2 cursor-pointer"
              aria-label={`Grafigi buyut: ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto rounded-lg"
              />
            </motion.button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ImageModal
            src={selected.src}
            caption={selected.title}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
