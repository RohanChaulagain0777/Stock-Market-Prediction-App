
import Link from "next/link";
import Navbar from "./components/Navbar"
import stockImg from "@/public/stockImg.jpg";
import Image from "next/image";
import { ArrowRight, BarChart2, TrendingUp, Shield } from "lucide-react";
import FadeUp from '@/components/ui/FadeUp';


export default function Home() {


  const stats = 
    [
      {value: "N/A", Label: "Sucess Rate"},
      {value: "N/A", Label: "Assest Tracked"},
      {value: "N/A", Label: "Active Investor"}
    ]


   const features = [
    {icon: <TrendingUp className = "w-6 h-6 text-emerald-400"/>, 
     title: "Real-Time Insights",
     desc: "Live market data and AI-powered signals to keep you ahead a curve"  
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
      title: "Smart Analytics",
      desc: "Visualize portfolio performance and trends with intuitive dashboards.",
    },
     {
       icon: <Shield className="w-6 h-6 text-emerald-400" />,
       title: "Risk Management",
       desc: "Automated alerts and safeguards that protect your capital.",
    }
   ]

  return (
    <div>
      <Navbar />
      <section className="relative min-h-screen">
          <Image src={stockImg} alt="Stock" className="absolute inset-0 w-full h-full object-cover z-0"/>

          <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/90 to-emerald-960/70 z-10"/>

          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10"/>

          <div className="absolute top-1/3 rounded-full left-1/2 inset-0 bg-emerald-500/10 blur-[120px] z-10 w-150 h-150 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-20 flex items-center gap-4 justify-center h-screen text-white flex-col">

          <h1 className="text-6xl md:text-8xl font-extrabold text-green-600 tracking-tight leading-none mb-6">
            <span className="text-white block">Grow</span> 
           <span className="block bg-linear-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
              With Us.
            </span>
            </h1>

          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-xl leading-relaxed mb-4">Make your every investment
           <span className="text-white italic font-semibold"> Profitable.</span> </p>

          <span className="text-sm md:text-base max-w-lg mb-10 leading-relaxed text-gray-500 text-center">
            StocKing is here to help you decide the most profitable investment
            you can make for a huge sum of profit for you.
          </span>
          <div className="flex gap-4 mb-20">
            <Link
            href="/Dashboard"
            className="
              inline-flex items-center gap-2
              bg-transparent text-green-600
              font-semibold text-[15px]
              px-6 py-3 rounded-full
              border-2 border-green-600
              transition-all duration-200
              hover:bg-green-600 hover:text-white hover:scale-105
              group
            "
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link href="/About" className="
              inline-flex items-center gap-2
              bg-transparent text-gray-400
              font-semibold text-[15px]
             rounded-full border border-white/10
              backdrop-blur-sm px-6 py-3
                transition-all duration-300
                hover:text-white hover:border-white/30 hover:bg-white/5">
              Learn More
          </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t pt-8 border-white/10 w-full max-w-2xl">
        {
          stats.map((stat) => (
            <div key={stat.Label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-emerald-400">{stat.value}</p>
              <p className="tracking-widest uppercase text-xs text-gray-500 mt-1">{stat.Label}</p>
            </div>
          ))
        }
       </div>
        </div>
      </section>
      
      <FadeUp>
      <section className="bg-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {
            features.map((item) => (
              <div key={item.title} className="group p-6 rounded-2xl  bg-white/3 border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300 mb-2">
                  {item.icon}
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))
          }
        </div>
      </section>
       </FadeUp>
    </div>
  );
}