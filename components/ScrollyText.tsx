"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface ScrollyTextProps {
  children: ReactNode;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export function ScrollyText({ children, start, end, scrollYProgress, className = "" }: ScrollyTextProps) {
  const fadeOffset = Math.min(0.05, (end - start) * 0.25);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeOffset, end - fadeOffset, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + fadeOffset, end - fadeOffset, end],
    [40, 0, 0, -40]
  );

  const pointerEvents = useTransform(opacity, (val) => (val > 0.1 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`absolute inset-0 z-10 flex flex-col justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
