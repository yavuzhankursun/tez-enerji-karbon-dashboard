import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Asama2Forecast, Asama3Forecast } from "../types";

interface ForecastSummaryCardProps {
  electricityForecast: Asama2Forecast[];
  carbonForecast: Asama3Forecast[];
}

interface PredictionItem {
  model: string;
  value: number;
  unit: string;
}

function AnimatedNumber({ value, unit }: { value: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startTime = performance.now();
    const startValue = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (value - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString("tr-TR")} <span className="text-base font-normal text-gray-400 dark:text-gray-500">{unit}</span>
    </span>
  );
}

function get2030Predictions(
  electricityForecast: Asama2Forecast[],
  carbonForecast: Asama3Forecast[]
): { electricity: PredictionItem[]; carbon: PredictionItem[] } {
  const elec2030 = electricityForecast.find((f) => f.year === 2030);
  const carb2030 = carbonForecast.find((f) => f.year === 2030);

  const electricity: PredictionItem[] = elec2030
    ? [
        { model: "LSTM", value: Math.round(elec2030.LSTM_TWh), unit: "TWh" },
        { model: "XGBoost", value: Math.round(elec2030.XGBoost_TWh), unit: "TWh" },
        { model: "Random Forest", value: Math.round(elec2030.RF_TWh), unit: "TWh" },
      ]
    : [];

  const carbon: PredictionItem[] = carb2030
    ? [
        { model: "LSTM", value: Math.round(carb2030.LSTM_MtCO2), unit: "Mt" },
        { model: "XGBoost", value: Math.round(carb2030.XGBoost_MtCO2), unit: "Mt" },
        { model: "Random Forest", value: Math.round(carb2030.RF_MtCO2), unit: "Mt" },
      ]
    : [];

  return { electricity, carbon };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ForecastSummaryCard({
  electricityForecast,
  carbonForecast,
}: ForecastSummaryCardProps) {
  const { electricity, carbon } = get2030Predictions(
    electricityForecast,
    carbonForecast
  );

  if (electricity.length === 0 && carbon.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Elektrik Tahmini */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-950/30 p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            2030 Elektrik Tuketimi Tahmini
          </p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          Uc farkli modelin Turkiye icin ongorusu
        </p>

        <div className="space-y-4">
          {electricity.map((item) => (
            <div key={item.model} className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.model}
              </span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                <AnimatedNumber value={item.value} unit={item.unit} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Karbon Tahmini */}
      <div className="rounded-2xl border border-orange-200 dark:border-orange-800/50 bg-orange-50/50 dark:bg-orange-950/30 p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            2030 CO2 Emisyonu Tahmini
          </p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          Uc farkli modelin Turkiye icin ongorusu
        </p>

        <div className="space-y-4">
          {carbon.map((item) => (
            <div key={item.model} className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.model}
              </span>
              <span className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                <AnimatedNumber value={item.value} unit={item.unit} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
