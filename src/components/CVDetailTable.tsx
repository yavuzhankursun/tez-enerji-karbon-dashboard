import { useState } from "react";
import { motion } from "framer-motion";

interface CVEntry {
  model: string;
  year: number;
  actual: number;
  predicted: number;
  errorPct: number;
}

interface CVDetailTableProps {
  data: CVEntry[];
  unit: string;
}

export function CVDetailTable({ data, unit }: CVDetailTableProps) {
  const models = [...new Set(data.map((d) => d.model))];
  const [activeModel, setActiveModel] = useState(models[0] ?? "RF");

  const filtered = data.filter((d) => d.model === activeModel);

  return (
    <div className="rounded-2xl border border-[var(--pastel-border)] dark:border-gray-800 bg-[var(--pastel-surface)] dark:bg-gray-900 shadow-sm overflow-hidden">
      <div className="px-4 md:px-5 pt-5 pb-3">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Cross-Validation Detaylari
        </h4>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">
          Walk-forward cross-validation: Model her yil icin sadece gecmis verileri kullanarak tahmin yapar. Gelecege sizma yoktur.
        </p>

        <div className="flex gap-2">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className={`rounded-full px-4 py-2 md:py-1.5 text-xs font-medium transition-all min-h-[44px] md:min-h-0 ${
                activeModel === model
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                  : "bg-[var(--pastel-muted)] dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-[var(--pastel-muted-strong)] dark:hover:bg-gray-700"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-t border-b border-[var(--pastel-border-subtle)] dark:border-gray-800 bg-[var(--pastel-muted)]/60 dark:bg-gray-800/60">
              <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                Yil
              </th>
              <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                Gercek Deger ({unit})
              </th>
              <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                Model Tahmini ({unit})
              </th>
              <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                Sapma (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <motion.tr
                key={`${row.model}-${row.year}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="border-b border-[var(--pastel-border-subtle)] dark:border-gray-800/50 hover:bg-[var(--pastel-muted)]/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200 tabular-nums">
                  {row.year}
                </td>
                <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                  {row.actual.toFixed(2)}
                </td>
                <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                  {row.predicted.toFixed(2)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                      row.errorPct <= 3
                        ? "text-green-600 bg-green-50 dark:bg-green-950/50"
                        : row.errorPct <= 7
                          ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50"
                          : "text-red-500 bg-red-50 dark:bg-red-950/50"
                    }`}
                  >
                    {row.errorPct.toFixed(2)}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
