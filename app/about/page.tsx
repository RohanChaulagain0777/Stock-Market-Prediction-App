import Image from "next/image";
import Navbar from "../components/Navbar";
import wallstreetImg from "@/public/wallstreetImg.jpg";
import { SquareChartGantt, Brain, Eye } from "lucide-react";
import Footer from "../components/Footer";

const About = () => {

  const edges = [
    {
      icon: <SquareChartGantt className="w-6 h-6 text-emerald-400" />,
      title: "Data-Driven Precision",
      desc: "Synthesizing global macro-trends and micro-market movement actionable signals with 99.9% uptime."
    },
    {
      icon: <Brain className="w-6 h-6 text-emerald-400" />,
      title: "Predictive AI Models",
      desc: "Utilizing deep learning ensembles that adapt in real-time to shifting market regimes and black swan events."
    },
    {
      icon: <Eye className="w-6 h-6 text-emerald-400" />,
      title: "Transparent Methodology",
      desc: `No "black boxes." We provide the reasoning behind every prediction, empowering users with context, not just numbers.`
    }
  ];

  return (
    <div>
      <Navbar />

      <section className="bg-black w-full h-[100%]">

      
        <div className="flex flex-col md:flex-row text-white px-6 md:px-16 pt-20 md:pt-28 pb-12 md:pb-20 gap-8 md:gap-10">
          <div className="flex flex-col gap-6 md:gap-8 md:pt-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-semibold">
              Predicting the Future of Markets.
            </h1>
            <p className="w-full md:w-[80%] text-gray-600">
              Our main purpose is to make the most out of every investment, We
              will become the backbone for your every investment.
            </p>
          </div>
          <Image
            src={wallstreetImg}
            alt="wallstreetImg"
            className="rounded-2xl w-full md:w-auto object-cover"
          />
        </div>

  
        <section className="bg-white/10 mx-4 md:mx-10 rounded-2xl py-10 md:py-16 px-6 md:px-10">
          <div className="text-white flex flex-col gap-6 md:gap-8 text-center md:px-16">
            <h3 className="text-2xl font-semibold">Our Philosophy</h3>
            <p className="text-gray-500">
              StocKing was founded on the belief that sophisticated market
              analysis should not be locked behind the gates of high-frequency
              trading firms. By combining proprietary AI models with vast
              alternative datasets, we provide the "Informed Monolith" with the
              tools needed to navigate modern volatility.
            </p>
            <p className="text-gray-500 pb-2 md:pb-4">
              We don't just provide data; we provide architectural insight.
              Every prediction is a culmination of millions of data points
              processed through our Sovereign Ledger methodology.
            </p>
          </div>
        </section>


        <section className="bg-black py-16 md:py-28 px-4 md:px-6">
          <h1 className="text-center text-white text-2xl md:text-3xl font-bold">
            The Stoc<span className="text-green-600">King</span> Edge
          </h1>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 pt-10 md:pt-14">
            {edges.map((item) => (
              <div
                key={item.title}
                className="group p-6 md:p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </section>

      <Footer />
    </div>
  );
};

export default About;