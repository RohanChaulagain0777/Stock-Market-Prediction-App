"use client";

import stockImg from "@/public/stockImg.jpg";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

const SignIn = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen">
      <Image
        src={stockImg}
        alt="stock"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 bg-black/70" />

      <section className="relative z-20 flex justify-center items-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1">
            Sign <span className="text-green-400">In</span>
          </h1>
          <p className="text-sm text-white/40 font-light mb-8">
            Welcome back — enter your details below
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-white/40">
                Username
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. johndoe"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-green-400/50 focus:bg-green-400/5 focus:ring-2 focus:ring-green-400/10 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-white/40">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-green-400/50 focus:bg-green-400/5 focus:ring-2 focus:ring-green-400/10 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-white/40">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-white/20 outline-none focus:border-green-400/50 focus:bg-green-400/5 focus:ring-2 focus:ring-green-400/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-green-400 transition cursor-pointer"
                >
                  {show ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <hr className="border-white/10 my-1" />

          
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold text-sm uppercase tracking-widest py-3.5 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              Sign In <ArrowRight size={15} />
            </button>
          </form>
          
        </div>
      </section>
    </div>
  );
};

export default SignIn;