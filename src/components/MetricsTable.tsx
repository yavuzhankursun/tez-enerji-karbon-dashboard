import { motion } from "framer-motion";
import type { Asama1Metric } from "../types";

interface MetricsTableProps {
  metrics: Asama1Metric[];
}

const FEATURE_LABELS: Record<string, string> = {
  Population: "Nufus",
  GDP_Per_Capita: "Kisi Basina GSYH",
  GDP_Growth: "GSYH Buyume",
  renewables_share_elec: "Yenilenebilir Enerji Payi",
  Urbanization_Rate: "Kentlesme Orani",
  Industry_Value_Added_Pct_GDP: "Sanayi Katma Degeri (% GSYH)",
  Population_Density: "Nufus Yogunlugu",
  fossil_fuel_consumption: "Fosil Yakit Tuketimi",
  nuclear_consumption: "Nukleer Tuketim",
  coal_co2: "Komur CO2",
  gas_co2: "Dogalgaz CO2",
  co2_per_capita: "Kisi Basina CO2",
  temperature_change_from_ghg: "Sera Gazi Sicaklik Degisimi",
};

function r2ColorClass(r2: number): string {
  if (r2 >= 0.7) return "text-green-600 bg-green-50 dark:bg-green-950/50";
  if (r2 >= 0.4) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50";
  return "text-red-500 bg-red-50 dark:bg-red-950/50";
}

function formatNumber(value: number | null): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
    });
  }
  return value.toFixed(4);
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="px-5 pt-5 pb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3 leading-relaxed">
          Her parametre icin ayri model egitildi. R2 degeri 1'e yaklastikca model o parametreyi daha iyi tahmin edebiliyor demektir.
        </p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60">
            <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Feature
            </th>
            <th className="text-left px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Model
            </th>
            <th className="text-right px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <span>R2</span>
              <span className="block text-[10px] font-normal normal-case tracking-normal text-gray-400 dark:text-gray-500">
                (1.0 = mukemmel)
              </span>
            </th>
            <th className="text-right px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              MAPE (%)
            </th>
            <th className="text-right px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              RMSE
            </th>
            <th className="text-right px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              CV Folds
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, idx) => (
            <motion.tr
              key={m.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-5 py-3.5 font-medium text-gray-800 dark:text-gray-200">
                {FEATURE_LABELS[m.feature] ?? m.feature}
              </td>
              <td className="px-5 py-3.5">
                <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {m.secilen_model}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${r2ColorClass(m.wf_cv_r2)}`}
                >
                  {m.wf_cv_r2.toFixed(4)}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                {formatNumber(m.wf_cv_mape)}
              </td>
              <td className="px-5 py-3.5 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                {formatNumber(m.wf_cv_rmse)}
              </td>
              <td className="px-5 py-3.5 text-right text-gray-500 dark:text-gray-500 tabular-nums">
                {m.wf_cv_n}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
