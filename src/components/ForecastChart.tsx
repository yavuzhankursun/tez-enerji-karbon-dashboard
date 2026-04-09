import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import type { TurkeyHistorical, Asama2Forecast, Asama3Forecast } from "../types";

interface ElectricityChartProps {
  type: "electricity";
  historical: TurkeyHistorical[];
  forecast: Asama2Forecast[];
  isDark: boolean;
}

interface CarbonChartProps {
  type: "carbon";
  historical: Array<{ year: number; value: number }>;
  forecast: Asama3Forecast[];
  isDark: boolean;
}

type ForecastChartProps = ElectricityChartProps | CarbonChartProps;

interface ChartDataPoint {
  year: number;
  historical: number | null;
  RF: number | null;
  XGBoost: number | null;
  LSTM: number | null;
}

function buildElectricityData(
  historical: TurkeyHistorical[],
  forecast: Asama2Forecast[]
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];

  for (const h of historical) {
    data.push({
      year: h.year,
      historical: h.electricity_demand,
      RF: null,
      XGBoost: null,
      LSTM: null,
    });
  }

  for (const f of forecast) {
    data.push({
      year: f.year,
      historical: null,
      RF: Math.round(f.RF_TWh * 10) / 10,
      XGBoost: Math.round(f.XGBoost_TWh * 10) / 10,
      LSTM: Math.round(f.LSTM_TWh * 10) / 10,
    });
  }

  return data.sort((a, b) => a.year - b.year);
}

function buildCarbonData(
  historical: Array<{ year: number; value: number }>,
  forecast: Asama3Forecast[]
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];

  for (const h of historical) {
    data.push({
      year: h.year,
      historical: h.value,
      RF: null,
      XGBoost: null,
      LSTM: null,
    });
  }

  for (const f of forecast) {
    data.push({
      year: f.year,
      historical: null,
      RF: f.RF_MtCO2,
      XGBoost: f.XGBoost_MtCO2,
      LSTM: f.LSTM_MtCO2,
    });
  }

  return data.sort((a, b) => a.year - b.year);
}

function CustomTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  unit: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((entry) =>
        entry.value != null ? (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-500 dark:text-gray-400">{entry.name}:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
              {entry.value.toLocaleString("tr-TR", {
                maximumFractionDigits: 1,
              })}{" "}
              {unit}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
}

export function ForecastChart(props: ForecastChartProps) {
  const isElectricity = props.type === "electricity";
  const isDark = props.isDark;
  const unit = isElectricity ? "TWh" : "MtCO2";

  const chartData =
    props.type === "electricity"
      ? buildElectricityData(props.historical, props.forecast)
      : buildCarbonData(props.historical, props.forecast);

  const lineColors = isElectricity
    ? { hist: isDark ? "#9ca3af" : "#374151", rf: "#2563eb", xgb: "#7c3aed", lstm: "#0891b2" }
    : { hist: isDark ? "#9ca3af" : "#374151", rf: "#f97316", xgb: "#dc2626", lstm: "#ea580c" };

  const gridStroke = isDark ? "#374151" : "#f3f4f6";
  const axisTickFill = isDark ? "#9ca3af" : "#9ca3af";
  const axisLineStroke = isDark ? "#4b5563" : "#e5e7eb";
  const refLineStroke = isDark ? "#4b5563" : "#d1d5db";
  const refLabelFill = isDark ? "#6b7280" : "#9ca3af";

  const lastHistoricalYear =
    props.type === "electricity"
      ? Math.max(...props.historical.map((h) => h.year))
      : Math.max(...props.historical.map((h) => h.year));

  const yAxisLabel = isElectricity
    ? "Elektrik Tuketimi (TWh)"
    : "CO2 Emisyonu (Milyon Ton)";

  const explanationText = isElectricity
    ? "Turkiye'nin 1990'dan gunumuze elektrik tuketimi ve 3 farkli makine ogrenmesi modelinin 2026-2030 icin tahminleri. Kesikli cizgiler tahmin donemine aittir."
    : "Turkiye'nin toplam CO2 emisyonu ve 2026-2030 icin tahminler. Elektrik tuketimi arttikca karbon emisyonu da artmaktadir.";

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
        {isElectricity
          ? "Elektrik Talebi Tahminleri (TWh)"
          : "CO2 Emisyon Tahminleri (MtCO2)"}
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Gercek veriler ve 2026-2030 model projeksiyonlari
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3 mb-5 leading-relaxed">
        {explanationText}
      </p>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: axisTickFill }}
            axisLine={{ stroke: axisLineStroke }}
            tickLine={false}
          >
            <Label
              value="Yil"
              position="bottom"
              offset={10}
              style={{ fontSize: 12, fill: axisTickFill, fontWeight: 500 }}
            />
          </XAxis>
          <YAxis
            tick={{ fontSize: 11, fill: axisTickFill }}
            axisLine={false}
            tickLine={false}
            width={70}
            tickFormatter={(v: number) => v.toLocaleString("tr-TR")}
          >
            <Label
              value={yAxisLabel}
              angle={-90}
              position="insideLeft"
              offset={-5}
              style={{ fontSize: 12, fill: axisTickFill, fontWeight: 500, textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip
            content={
              <CustomTooltip unit={unit} />
            }
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: isDark ? "#9ca3af" : undefined }}
          />
          <ReferenceLine
            x={lastHistoricalYear}
            stroke={refLineStroke}
            strokeDasharray="4 4"
            label={{
              value: "Tahmin Baslangici",
              position: "top",
              fill: refLabelFill,
              fontSize: 10,
            }}
          />
          <Line
            type="monotone"
            dataKey="historical"
            name={isElectricity ? "Gercek Talep" : "Gercek CO2"}
            stroke={lineColors.hist}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="RF"
            name="Random Forest"
            stroke={lineColors.rf}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: lineColors.rf, strokeWidth: 0 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="XGBoost"
            name="XGBoost"
            stroke={lineColors.xgb}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: lineColors.xgb, strokeWidth: 0 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="LSTM"
            name="LSTM"
            stroke={lineColors.lstm}
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: lineColors.lstm, strokeWidth: 0 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
