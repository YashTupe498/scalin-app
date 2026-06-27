"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, Shield, GitBranch, Cpu, Database } from "lucide-react";

const features = [
  {
    id: 0,
    title: "Neural Engine Core",
    description: "Our proprietary AI model processes millions of data points with near-zero latency, empowering your automation workflows to run faster than ever.",
    icon: <Cpu className="w-6 h-6 text-cyan-400" />
  },
  {
    id: 1,
    title: "Adaptive Workflows",
    description: "Visually construct complex logic with our drag-and-drop canvas. Branching, looping, and conditional triggers happen instantly.",
    icon: <GitBranch className="w-6 h-6 text-purple-400" />
  },
  {
    id: 2,
    title: "Real-time Sync",
    description: "Connect to over 500+ databases and APIs out of the box. Stream data securely without building custom pipelines.",
    icon: <Database className="w-6 h-6 text-emerald-400" />
  },
  {
    id: 3,
    title: "Enterprise Security",
    description: "SOC2 Type II certified. End-to-end encryption with customizable roles and permissions to keep your data locked down.",
    icon: <Shield className="w-6 h-6 text-rose-400" />
  },
  {
    id: 4,
    title: "Instant Execution",
    description: "Serverless execution environments scale on demand so your tasks never sit in a queue, regardless of volume.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />
  }
];

export function BentoAccordionWrapper() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check initial layout and listen for resizes
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Next-Generation Architecture
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Explore the core modules powering the world's fastest AI automation platform.
        </p>
      </div>

      <div className="w-full">
        {isDesktop ? (
          /* Desktop Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[600px]">
            {features.map((feature, i) => {
              // Create an interesting bento layout with varying spans
              const isLarge = i === 0 || i === 3;
              const spanClass = isLarge ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";
              const isActive = activeIndex === i;

              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden cursor-default ${spanClass} ${
                    isActive 
                      ? "bg-zinc-900 border-zinc-600 shadow-xl" 
                      : "bg-zinc-950 border-zinc-800 opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 p-3 bg-zinc-900 rounded-xl w-fit border border-zinc-800">
                      {feature.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 transition-colors ${isActive ? "text-white" : "text-zinc-300"}`}>
                      {feature.title}
                    </h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-zinc-400 text-sm leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Background ambient glow when active */}
                  {isActive && (
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Mobile Accordion */
          <div className="flex flex-col gap-3">
            {features.map((feature, i) => {
              const isActive = activeIndex === i;

              return (
                <div 
                  key={feature.id}
                  onClick={() => setActiveIndex(isActive ? -1 : i)}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isActive ? "bg-zinc-900 border-zinc-600" : "bg-zinc-950 border-zinc-800"
                  }`}
                >
                  <button className="w-full p-6 flex items-center justify-between text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        {feature.icon}
                      </div>
                      <span className={`font-bold ${isActive ? "text-white" : "text-zinc-300"}`}>
                        {feature.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ChevronDown className="text-zinc-500 w-5 h-5" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed">
                          {feature.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
