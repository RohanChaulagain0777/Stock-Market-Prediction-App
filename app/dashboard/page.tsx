"use client";

import Navbar from '../components/Navbar'
import TradingView from '@/components/ui/TradingView';
import MarketData from '@/components/ui/MarketData';
import News from "@/components/ui/News"

const Contact = () => {
  return (
    <div>
      <Navbar />

      <section className="w-full md:max-w-6xl h-auto mt-10 bg-lineat-to-br from-blue-500 via-gray-500 to-green-500">
        <h1 className='text-center mb-5 text-4xl font-bold'>DashBoard</h1>
        <div className='flex gap-10 w-full '>
        <TradingView />
        <MarketData />
        </div>
        <div>
        <News />

        </div>
      </section>
    </div>
  )
}

export default Contact