"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { PricingMatrix } from "@/components/PricingMatrix";
import { BlackHoleCanvas } from "@/components/BlackHoleCanvas";
import { ScrollyText } from "@/components/ScrollyText";
import { Zap, Menu, ChevronRight } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-transparent font-sans selection:bg-white/30 selection:text-white">
      
      {/* Navigation (Scalin Style) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-8 w-full mix-blend-difference pointer-events-auto">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-white fill-white" />
          <span className="text-white font-bold tracking-tight text-2xl font-sans">scalin</span>
        </div>
        <button className="w-8 h-8 opacity-0 cursor-pointer">
          <Menu className="w-full h-full" />
        </button>
      </nav>

      {/* Intro Section (Hero) */}
      <div className="relative w-full h-screen">
        
        {/* Subtle Vertical Grid Lines Overlaying the Canvas but behind text */}
        <div className="fixed inset-0 pointer-events-none z-[1] flex justify-between px-8">
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5" />
          <div className="w-[1px] h-full bg-white/5 hidden md:block" />
        </div>

        <BlackHoleCanvas scrollYProgress={scrollYProgress} />
        
        {/* Scalin Hero Layout */}
        <div className="w-full h-full relative px-8 pb-16 pt-32 flex flex-col justify-end z-10">
          
          {/* Middle-Right List -> Shifted to Top Right */}
          <div className="absolute top-32 right-8 md:right-12 flex flex-col gap-4 text-white items-end text-right">
            <a href="#" className="text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">AI Strategy</a>
            <a href="#" className="text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">Custom Agents</a>
            <a href="#" className="text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">Process Automation</a>
            <a href="#" className="text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">Data Intelligence</a>
            
            <div className="flex items-center justify-end gap-8 mt-12 opacity-80">
              <span className="font-bold text-xl tracking-tight flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-white"></div> aetna
              </span>
              <span className="font-bold text-xl tracking-tight">cigna</span>
              <span className="font-bold text-xl tracking-tight">Ant</span>
            </div>
          </div>

          {/* Bottom-Left Hero Text -> Shifted to absolute Bottom Left */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col items-start max-w-xl">
            <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tighter leading-[1.05] mb-6 font-sans">
              Power your <br />
              future with AI
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-md mb-8">
              Deploy custom enterprise agents and automate complex workflows.<br/>
              Scale your intelligence with Scalin today.
            </p>
            
            <button className="group relative flex items-center w-64 h-16 bg-white hover:bg-zinc-200 transition-colors overflow-hidden">
              <div className="absolute left-1 z-10 bg-black text-white w-14 h-14 flex items-center justify-center transition-transform duration-1000 ease-in-out group-active:translate-x-[192px]">
                <ChevronRight className="w-5 h-5" />
              </div>
              <span className="w-full pl-12 pr-4 text-black font-bold tracking-wide text-center relative z-0">
                Build A Workflow
              </span>
            </button>
          </div>
          
        </div>
      </div>

      {/* SaaS Sections Below */}
      <div className="relative z-10 bg-transparent pt-0 pb-16">
        
        {/* Features Grid */}
        <div id="features" className="mb-16">
          <FeaturesGrid />
        </div>

        {/* Pricing Matrix */}
        <div id="pricing" className="mb-16">
          <PricingMatrix />
        </div>

        {/* CTA Footer */}
        <footer className="border-t border-white/10 bg-transparent pt-40 pb-20">
          <div className="max-w-4xl mx-auto text-center px-6 mb-32">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif italic">
              Ready to break the limits?
            </h2>
            <p className="text-zinc-400 text-xl mb-12 font-sans">
              Join thousands of developers building the future of automation today.
            </p>
            <button className="group relative overflow-hidden bg-white hover:bg-zinc-200 text-black font-bold rounded px-12 py-5 text-sm tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center mx-auto gap-3">
              DEPLOY YOUR FIRST AGENT
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 font-sans">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="w-5 h-5 text-zinc-500 fill-zinc-500" />
              <span className="font-bold tracking-widest">scalin © 2026</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
