"use client";

import { Lock, Settings, Cpu, Fan, Database, Folder, Link2 } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      title: "Secure Guard",
      description: "We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data privacy standards.",
      icon: (
        <div className="relative w-24 h-24 flex items-center justify-center isometric-transform">
          <Lock size={64} strokeWidth={1} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          <Settings size={36} strokeWidth={1} className="text-white absolute -right-2 -bottom-2 bg-black rounded-full animate-[spin_4s_linear_infinite]" />
        </div>
      )
    },
    {
      title: "Agent Build",
      description: "Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.",
      icon: (
        <div className="relative w-32 h-24 flex items-center justify-center isometric-transform">
          <Cpu size={48} strokeWidth={1} className="text-white absolute top-0 left-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]" />
          <Link2 size={24} strokeWidth={1} className="text-white absolute rotate-45 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <Cpu size={48} strokeWidth={1} className="text-white absolute bottom-0 right-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]" />
        </div>
      )
    },
    {
      title: "Cloud Scale",
      description: "Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.",
      icon: (
        <div className="relative w-24 h-24 flex items-center justify-center isometric-transform border border-white/40 rounded-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
          <Fan size={56} strokeWidth={1} className="text-white animate-[spin_3s_linear_infinite]" />
        </div>
      )
    },
    {
      title: "Data Mining",
      description: "Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization's future.",
      icon: (
        <div className="relative w-28 h-24 flex items-end justify-center isometric-transform">
          <Folder size={64} strokeWidth={1} className="text-white absolute top-0 right-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-float" />
          <Database size={48} strokeWidth={1} className="text-white absolute bottom-0 left-0 bg-black drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        </div>
      )
    }
  ];

  return (
    <section className="w-full relative bg-transparent py-12 px-6">
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative z-10">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex flex-col h-full bg-transparent p-6 relative border-t border-white/5 pt-12 md:pt-16"
            >
              {/* Dotted Background for each card */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] pointer-events-none" />
              
              {/* Glowing Silver/White Partition Line (Right Edge) */}
              {idx < features.length - 1 && (
                <div className="hidden md:block absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.9)] opacity-90 z-20" />
              )}
              
              {/* Icon Container with Darkened Backdrop & White Glow */}
              <div className="relative z-10 h-56 flex items-center justify-center mb-12 perspective-1000">
                {/* Dark Backdrop */}
                <div className="absolute w-48 h-48 bg-black/90 rounded-full blur-2xl z-0" />
                {/* White Glow Element */}
                <div className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl shadow-[0_0_50px_rgba(255,255,255,0.5)] z-0" />
                
                {feature.icon}
              </div>

              {/* Text Area */}
              <div className="relative z-10 mt-auto px-2">
                <h3 className="text-white font-mono text-2xl md:text-3xl mb-6 tracking-tight font-bold">
                  {feature.title}
                </h3>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for Isometric Projection & Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .isometric-transform {
          transform: rotateX(55deg) rotateZ(-45deg);
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .isometric-transform:hover {
          transform: rotateX(50deg) rotateZ(-40deg) translateZ(10px);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
