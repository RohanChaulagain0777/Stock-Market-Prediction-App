"use client";
import { useState } from "react";
import type { StockData } from "@/app/api/stock/[symbol]/route";
import {
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCw,
  DollarSign,
  BarChart2,
  Clock,
} from "lucide-react";

// ── Sparkline SVG chart ──────────────────────────────────────────────────────
function Sparkline({ history }: { history: { date: string; close: number | null }[] }) {
  const points = history.filter((h) => h.close !== null) as { date: string; close: number }[];
  if (points.length < 2) return null;

  const W = 600;
  const H = 160;
  const PAD = { top: 16, right: 16, bottom: 32, left: 48 };

  const closes = points.map((p) => p.close);
  const minV = Math.min(...closes);
  const maxV = Math.max(...closes);
  const range = maxV - minV || 1;

  const xScale = (i: number) =>
    PAD.left + (i / (points.length - 1)) * (W - PAD.left - PAD.right);
  const yScale = (v: number) =>
    PAD.top + (1 - (v - minV) / range) * (H - PAD.top - PAD.bottom);

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)} ${yScale(p.close).toFixed(1)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${xScale(points.length - 1).toFixed(1)} ${(H - PAD.bottom).toFixed(1)}` +
    ` L ${xScale(0).toFixed(1)} ${(H - PAD.bottom).toFixed(1)} Z`;

  const isUp = closes[closes.length - 1] >= closes[0];
  const lineColor = isUp ? "#34d399" : "#f87171";
  const gradId = `grad-${isUp ? "up" : "down"}`;

  // tick labels: show ~5 evenly spaced dates
  const tickIdx = [0, Math.floor(points.length / 4), Math.floor(points.length / 2), Math.floor((3 * points.length) / 4), points.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.top + t * (H - PAD.top - PAD.bottom);
        const val = maxV - t * range;
        return (
          <g key={t}>
            <line
              x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"
            />
            <text
              x={PAD.left - 6} y={y + 4}
              textAnchor="end" fill="rgba(255,255,255,0.3)"
              fontSize="10" fontFamily="'DM Mono', monospace"
            >
              {val.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaD} fill={`url(#${gradId})`} />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End dot */}
      <circle
        cx={xScale(points.length - 1)}
        cy={yScale(closes[closes.length - 1])}
        r="4"
        fill={lineColor}
        stroke="#0f172a"
        strokeWidth="2"
      />

      {/* Date ticks */}
      {tickIdx.map((i) => (
        <text
          key={i}
          x={xScale(i)}
          y={H - PAD.bottom + 16}
          textAnchor="middle"
          fill="rgba(255,255,255,0.25)"
          fontSize="9"
          fontFamily="'DM Mono', monospace"
        >
          {points[i].date.slice(5)}
        </text>
      ))}
    </svg>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4">
      <div className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-widest font-medium">
        {icon}
        {label}
      </div>
      <span
        className="text-2xl font-bold tracking-tight"
        style={{ color: accent ?? "white" }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Popular symbols ──────────────────────────────────────────────────────────
const QUICK_SYMBOLS = ["AAPL", "TSLA", "MSFT", "GOOGL", "NVDA", "AMZN"];

// ── Main page ────────────────────────────────────────────────────────────────
export default function StockLookup() {
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [input, setInput] = useState<string>("AAPL");
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchStock(sym?: string): Promise<void> {
    const target = (sym ?? input).toUpperCase().trim();
    if (!target) return;
    setSymbol(target);
    setInput(target);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/stock/${target}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Fetch failed");
      setData(json as StockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const change =
    data != null
      ? parseFloat((data.currentPrice - data.previousClose).toFixed(2))
      : null;
  const pct =
    data != null
      ? (((data.currentPrice - data.previousClose) / data.previousClose) * 100).toFixed(2)
      : null;
  const isPositive = change !== null && change >= 0;

  return (
    <div className="min-h-full bg-[#0b0f1a] text-white p-6 flex flex-col gap-6 font-sans">

      {/* Header + search */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Stock Prediction</h1>
            <p className="text-white/30 text-sm mt-0.5">30-day price history & real-time quote</p>
          </div>
          {data && (
            <button
              onClick={() => fetchStock(symbol)}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-emerald-400 transition-colors px-3 py-2 rounded-xl border border-white/[0.07] hover:border-emerald-500/30"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          )}
        </div>

        {/* Search bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && fetchStock()}
              placeholder="Enter ticker symbol…"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-emerald-500/40 focus:bg-emerald-500/[0.04] transition-all"
            />
          </div>
          <button
            onClick={() => fetchStock()}
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
          >
            {loading ? "Loading…" : "Search"}
          </button>
        </div>

        {/* Quick picks */}
        <div className="flex flex-wrap gap-2">
          {QUICK_SYMBOLS.map((s) => (
            <button
              key={s}
              onClick={() => fetchStock(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                symbol === s && data
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                  : "bg-white/[0.03] border-white/[0.07] text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
          <div className="h-48 rounded-2xl bg-white/[0.04]" />
        </div>
      )}

      {/* Data */}
      {data && !loading && (
        <div className="flex flex-col gap-4">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Current Price"
              value={`${data.currency === "USD" ? "$" : ""}${data.currentPrice.toFixed(2)}`}
              icon={<DollarSign size={12} />}
            />
            <StatCard
              label="Prev. Close"
              value={`${data.currency === "USD" ? "$" : ""}${data.previousClose.toFixed(2)}`}
              icon={<Clock size={12} />}
            />
            <StatCard
              label="Today's Change"
              value={`${isPositive ? "+" : ""}${change} (${pct}%)`}
              icon={
                isPositive
                  ? <TrendingUp size={12} />
                  : <TrendingDown size={12} />
              }
              accent={isPositive ? "#34d399" : "#f87171"}
            />
          </div>

          {/* Chart */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-white/30" />
                <span className="text-xs text-white/30 uppercase tracking-widest font-medium">
                  30-Day Close
                </span>
              </div>
              <span
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: isPositive ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                  color: isPositive ? "#34d399" : "#f87171",
                }}
              >
                {isPositive ? "▲" : "▼"} {Math.abs(change!)} ({pct}%)
              </span>
            </div>
            <div className="h-40">
              <Sparkline history={data.history} />
            </div>
          </div>

          {/* History table */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
              <span className="text-xs text-white/30 uppercase tracking-widest font-medium">
                Price History
              </span>
            </div>
            <div className="overflow-y-auto max-h-52">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/20 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-2.5 font-medium">Date</th>
                    <th className="text-right px-5 py-2.5 font-medium">Close</th>
                    <th className="text-right px-5 py-2.5 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data.history].reverse().map((d, i, arr) => {
                    const prev = arr[i + 1]?.close ?? null;
                    const dayChange =
                      d.close !== null && prev !== null
                        ? d.close - prev
                        : null;
                    const up = dayChange !== null && dayChange >= 0;
                    return (
                      <tr
                        key={d.date}
                        className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-5 py-2.5 text-white/50 font-mono text-xs">
                          {d.date}
                        </td>
                        <td className="px-5 py-2.5 text-right font-mono font-semibold">
                          {d.close !== null ? `$${d.close.toFixed(2)}` : "—"}
                        </td>
                        <td
                          className="px-5 py-2.5 text-right font-mono text-xs"
                          style={{
                            color:
                              dayChange === null
                                ? "rgba(255,255,255,0.2)"
                                : up
                                ? "#34d399"
                                : "#f87171",
                          }}
                        >
                          {dayChange !== null
                            ? `${up ? "+" : ""}${dayChange.toFixed(2)}`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!data && !loading && !error && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <BarChart2 size={22} className="text-emerald-400" />
          </div>
          <p className="text-white/40 text-sm">Search for a ticker to see its chart</p>
        </div>
      )}
    </div>
  );
}