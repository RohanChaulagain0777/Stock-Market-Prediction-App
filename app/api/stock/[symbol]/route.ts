import { NextRequest, NextResponse } from "next/server";

interface YahooMeta {
  symbol: string;
  currency: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
}

interface YahooResult {
  meta: YahooMeta;
  timestamp: number[];
  indicators: {
    quote: { close: number[] }[];
  };
}

interface YahooResponse {
  chart: {
    result: YahooResult[] | null;
    error: string | null;
  };
}

export interface StockData {
  symbol: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
  history: { date: string; close: number | null }[];
}

// Shared cookie+crumb cache (lives as long as the server process)
let cachedCookie: string | null = null;
let cachedCrumb: string | null = null;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: "https://finance.yahoo.com",
  Referer: "https://finance.yahoo.com/",
};

async function getCookieAndCrumb(): Promise<{ cookie: string; crumb: string }> {
  // Return cached values if available
  if (cachedCookie && cachedCrumb) {
    return { cookie: cachedCookie, crumb: cachedCrumb };
  }

  // Step 1: Hit fc.yahoo.com to get the session cookie
  const cookieRes = await fetch("https://fc.yahoo.com", {
    headers: HEADERS,
    redirect: "follow",
  });

  const rawCookies = cookieRes.headers.getSetCookie?.() ?? [];
  const cookie = rawCookies
    .map((c) => c.split(";")[0])
    .join("; ");

  if (!cookie) throw new Error("Failed to retrieve Yahoo session cookie");

  // Step 2: Use the cookie to fetch the crumb
  const crumbRes = await fetch(
    "https://query1.finance.yahoo.com/v1/test/getcrumb",
    {
      headers: { ...HEADERS, Cookie: cookie },
    }
  );

  const crumb = await crumbRes.text();

  if (!crumb || crumb.includes("error") || crumb.length > 20) {
    throw new Error("Failed to retrieve valid crumb");
  }

  // Cache for reuse
  cachedCookie = cookie;
  cachedCrumb = crumb;

  return { cookie, crumb };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;

  try {
    const { cookie, crumb } = await getCookieAndCrumb();

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo&crumb=${encodeURIComponent(crumb)}`;

    const res = await fetch(url, {
      headers: { ...HEADERS, Cookie: cookie },
    });

    if (!res.ok) {
      // Bust the cache and let the client retry
      cachedCookie = null;
      cachedCrumb = null;
      throw new Error(`Yahoo Finance responded with ${res.status}`);
    }

    const data: YahooResponse = await res.json();
    const result = data.chart.result?.[0];

    if (!result) throw new Error(`No data found for symbol: ${symbol}`);

    const { meta, timestamp, indicators } = result;
    const closes = indicators.quote[0].close;

    const payload: StockData = {
      symbol: meta.symbol,
      currency: meta.currency,
      currentPrice: meta.regularMarketPrice,
      previousClose: meta.chartPreviousClose,
      history: timestamp.map((t, i) => ({
        date: new Date(t * 1000).toISOString().split("T")[0],
        close: closes[i] ?? null,
      })),
    };

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}