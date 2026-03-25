"use client";
import { useState } from "react";
import type { StockData } from "@/app/api/stock/[symbol]/route";

export default function StockPage() {
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchStock(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/stock/${symbol}`);
      const json = await res.json();

      if (!res.ok || json.error) throw new Error(json.error ?? "Fetch failed");

      setData(json as StockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const change: number | null =
    data ? parseFloat((data.currentPrice - data.previousClose).toFixed(2)) : null;

  const pct: string | null =
    data
      ? (((data.currentPrice - data.previousClose) / data.previousClose) * 100).toFixed(2)
      : null;

  const isPositive = change !== null && change >= 0;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Stock Lookup</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. TSLA"
          style={{ padding: "8px 12px", fontSize: "16px", borderRadius: "6px" }}
        />
        <button onClick={fetchStock} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h2>
            {data.symbol} — {data.currentPrice} {data.currency}
          </h2>
          <p style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? "▲" : "▼"} {Math.abs(change!)} ({pct}%) today
          </p>

          <h3>Last 30 days</h3>
          <table border={1} cellPadding={6}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {data.history.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{d.close !== null ? d.close.toFixed(2) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}