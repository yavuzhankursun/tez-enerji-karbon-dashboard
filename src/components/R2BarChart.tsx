import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";
import { r2HexColor } from "../lib/labels";

export interface R2Datum {
  label: string;
  r2: number;
  sub?: string;
}

interface R2BarChartProps {
  data: R2Datum[];
  isDark: boolean;
  // true => yatay cubuklar (cok kalemli liste icin), false => dikey cubuklar (az kalem)
  horizontalBars?: boolean;
  height?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: R2Datum }>;
  isDark: boolean;
}

function R2Tooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-[var(--pastel-border)] dark:border-gray-700 bg-[var(--pastel-surface)]/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
        {d.label}
      </p>
      {d.sub && (
        <p className="text-[11px] text-gray-500 dark:text-gray-400">{d.sub}</p>
      )}
      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
        R<sup>2</sup>:{" "}
        <span className="font-semibold tabular-nums">{d.r2.toFixed(4)}</span>
      </p>
    </div>
  );
}

export function R2BarChart({
  data,
  isDark,
  horizontalBars = false,
  height,
}: R2BarChartProps) {
  const axisTick = isDark ? "#9ca3af" : "#6b7280";
  const grid = isDark ? "#374151" : "#f0eef5";
  const minR2 = Math.min(0, ...data.map((d) => d.r2));
  const lowerBound = minR2 < 0 ? Math.floor(minR2 * 10) / 10 - 0.05 : 0;

  const fmt = (v: number | string | boolean | null | undefined) =>
    v == null || typeof v === "boolean"
      ? ""
      : Number(v).toFixed(horizontalBars ? 3 : 4);

  if (horizontalBars) {
    const chartHeight = height ?? Math.max(260, data.length * 26 + 24);
    return (
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 52, left: 8, bottom: 4 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={grid} />
          <XAxis
            type="number"
            domain={[lowerBound, 1]}
            tick={{ fontSize: 11, fill: axisTick }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={170}
            tick={{ fontSize: 11, fill: axisTick }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<R2Tooltip isDark={isDark} />}
            cursor={{ fill: isDark ? "#ffffff14" : "#0000000a" }}
          />
          {lowerBound < 0 && <ReferenceLine x={0} stroke={axisTick} strokeWidth={1} />}
          <Bar dataKey="r2" radius={[0, 4, 4, 0]} barSize={14} isAnimationActive>
            {data.map((d, i) => (
              <Cell key={i} fill={r2HexColor(d.r2)} />
            ))}
            <LabelList
              dataKey="r2"
              position="right"
              formatter={fmt}
              style={{ fontSize: 10, fill: axisTick }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height ?? 300}>
      <BarChart data={data} margin={{ top: 26, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={grid} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: axisTick }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 1]}
          tick={{ fontSize: 11, fill: axisTick }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          content={<R2Tooltip isDark={isDark} />}
          cursor={{ fill: isDark ? "#ffffff14" : "#0000000a" }}
        />
        <Bar dataKey="r2" radius={[6, 6, 0, 0]} barSize={70} isAnimationActive>
          {data.map((d, i) => (
            <Cell key={i} fill={r2HexColor(d.r2)} />
          ))}
          <LabelList
            dataKey="r2"
            position="top"
            formatter={fmt}
            style={{
              fontSize: 13,
              fontWeight: 600,
              fill: isDark ? "#e5e7eb" : "#374151",
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
