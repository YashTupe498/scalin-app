"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, MotionValue } from "framer-motion";

interface BlackHoleCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export function BlackHoleCanvas({ scrollYProgress }: BlackHoleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const frameCount = 96;
  const images = useRef<HTMLImageElement[]>([]);
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let loadedCount = 0;
    
    // Create new array to store images and trigger react state when done
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      // Added /scalin-app basePath for GitHub Pages
      img.src = `/scalin-app/sequence/frame_${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setTimeout(() => setLoaded(true), 500); // Small delay for effect
        }
      };
      // Fallback in case of error
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      }
      images.current.push(img);
    }
    
    return () => {
      images.current = [];
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const currentFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(smoothProgress.get() * frameCount)
      );
      
      const img = images.current[currentFrameIndex];
      
      if (img && img.complete && img.naturalWidth > 0) {
        // Match canvas logical size to physical window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        
        let drawWidth, drawHeight;
        
        // Use cover logic with a slight scale up (1.05) to push edge artifacts (like the star) off-screen
        const scaleFactor = 1.05;
        
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width * scaleFactor;
          drawHeight = (canvas.width / imgRatio) * scaleFactor;
        } else {
          drawHeight = canvas.height * scaleFactor;
          drawWidth = (canvas.height * imgRatio) * scaleFactor;
        }
        
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Fallback drawing if images fail
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        const pulse = 1 + Math.sin(Date.now() / 200) * 0.1;
        ctx.arc(canvas.width/2, canvas.height/2, 100 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 100, 0, 0.8)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, smoothProgress]);

  return (
    <div className="fixed inset-0 h-screen w-full bg-black overflow-hidden pointer-events-none z-0">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.1),transparent_50%)] pointer-events-none" />
      
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-b-2 border-cyan-400 rounded-full animate-pulse opacity-70"></div>
            <span className="text-white font-sans font-bold text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              {progress}%
            </span>
          </div>
          <p className="mt-8 text-zinc-500 text-sm tracking-[0.3em] font-sans">INITIALIZING SEQUENCE</p>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 pointer-events-none ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Scroll to Descend Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-700 pointer-events-none ${loaded && progress === 100 && smoothProgress.get() < 0.1 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-zinc-500 text-xs tracking-widest mb-2 font-sans uppercase">Scroll to descend</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/80 to-transparent"></div>
      </div>
    </div>
  );
}
