"use client";

import Navbar from '../components/Navbar';
import TradingView from '@/components/ui/TradingView';
import HeatMap from '@/components/ui/HeatMap';
import News from "@/components/ui/News";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111] font-['Inter','Segoe_UI',sans-serif]">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 pt-7 pb-12 flex flex-col gap-7 md:px-4 md:pt-5 md:pb-10 sm:px-3 sm:pt-4 sm:pb-8 sm:gap-4">

        <div className="flex gap-6 items-start max-md:flex-col max-md:gap-4">
          <section className="flex-1 flex flex-col gap-3 min-w-0">
            <h2 className="text-xl font-bold text-[#111] m-0 tracking-tight">Market Overview</h2>
            <div className="bg-white rounded-xl border border-[#e4e6ea] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] h-[520px] max-md:h-[340px] md:max-lg:h-[400px]">
              <TradingView />
            </div>
          </section>

          <section className="flex-[2] flex flex-col gap-3 min-w-0 max-md:flex-1 max-md:w-full">
            <h2 className="text-xl font-bold text-[#111] m-0 tracking-tight">Stock Heatmap</h2>
            <div className="bg-white rounded-xl border border-[#e4e6ea] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] h-[520px] max-md:h-[340px] md:max-lg:h-[400px]">
              <HeatMap />
            </div>
          </section>
        </div>
    
        <div className="flex gap-6 items-start max-md:flex-col max-md:gap-4">
          <section className="flex-1 flex flex-col gap-3 min-w-0">
            <h2 className="text-xl font-bold text-[#111] m-0 tracking-tight">Top Stories</h2>
            <div className="bg-white rounded-xl border border-[#e4e6ea] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] h-[420px] max-md:h-[320px] md:max-lg:h-[360px]">
              <News />
            </div>
          </section>

          <section className="flex-[2] flex flex-col gap-3 min-w-0 max-md:flex-1 max-md:w-full">
            <h2 className="text-xl font-bold text-[#111] m-0 tracking-tight">Market Quotes</h2>
            <div className="bg-white rounded-xl border border-[#e4e6ea] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] h-[420px] max-md:h-[320px] md:max-lg:h-[360px]">
              <iframe
                src="https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22backgroundColor%22%3A%22%23ffffff%22%2C%22locale%22%3A%22en%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22displayName%22%3A%22S%26P%20500%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22displayName%22%3A%22Nasdaq%20100%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ADJI%22%2C%22displayName%22%3A%22Dow%2030%22%7D%5D%7D%2C%7B%22name%22%3A%22Stocks%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22NASDAQ%3AAAPL%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AGOOGL%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AMSFT%22%7D%2C%7B%22name%22%3A%22NYSE%3AJPM%22%7D%2C%7B%22name%22%3A%22NYSE%3ABAC%22%7D%5D%7D%5D%7D"
                className="w-full h-full border-none"
                title="Market Quotes"
              />
            </div>
          </section>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;