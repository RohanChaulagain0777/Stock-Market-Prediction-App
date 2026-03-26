import { NextRequest, NextResponse } from "next/server";

export interface StockData {
  symbol: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
  history: { date: string; close: number | null }[];
}

const API_KEY = process.env.FINNHUB_API_KEY;

// Simple in-memory cache: { [symbol]: { data, expiresAt } }
const cache = new Map<string, { data: StockData; expiresAt: number }>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

function validateSymbol(symbol: string): boolean {
  return /^[A-Z0-9.^-]{1,10}$/.test(symbol);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol.toUpperCase();

  // Validate input
  if (!validateSymbol(symbol)) {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  // Return cached data if fresh
  const cached = cache.get(symbol);
  if (cached && Date.now() < cached.expiresAt) {
    return NextResponse.json(cached.data);
  }

  try {
    // Fetch current quote and candle history in parallel
    const [quoteRes, candleRes] = await Promise.all([
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      ),
      fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&count=30&token=${API_KEY}`
      ),
    ]);

    if (!quoteRes.ok || !candleRes.ok) {
      throw new Error("Finnhub request failed");
    }

    const quote = await quoteRes.json();
    const candle = await candleRes.json();

    // Finnhub returns { s: "no_data" } when symbol doesn't exist
    if (quote.c === 0 || candle.s === "no_data") {
      return NextResponse.json(
        { error: `No data found for symbol: ${symbol}` },
        { status: 404 }
      );
    }

    const history: { date: string; close: number | null }[] =
      candle.t?.map((timestamp: number, i: number) => ({
        date: new Date(timestamp * 1000).toISOString().split("T")[0],
        close: candle.c[i] ?? null,
      })) ?? [];

    const payload: StockData = {
      symbol,
      currency: "USD",
      currentPrice: quote.c,        // current price
      previousClose: quote.pc,      // previous close
      history,
    };

    // Cache the result
    cache.set(symbol, { data: payload, expiresAt: Date.now() + CACHE_TTL_MS });

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}