import { NextRequest, NextResponse } from "next/server";

export interface StockData {
  symbol: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
  history: { date: string; close: number | null }[];
}

const API_KEY = process.env.FINNHUB_API_KEY;


function validateSymbol(symbol: string): boolean {
  return /^[A-Z0-9.^-]{1,10}$/.test(symbol);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = rawSymbol.toUpperCase(); // ← ADD THIS LINE

  if (!validateSymbol(symbol)) {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  

  try {
    const [quoteRes, candleRes] = await Promise.all([
  fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`,
    { next: { revalidate: 60 } }  
  ),
  fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&count=30&token=${API_KEY}`,
    { next: { revalidate: 60 } }  
  ),
])

    if (!quoteRes.ok || !candleRes.ok) {
      throw new Error("Finnhub request failed");
    }

    const quote = await quoteRes.json();
    const candle = await candleRes.json();

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
      currentPrice: quote.c,
      previousClose: quote.pc,
      history,
    };

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}