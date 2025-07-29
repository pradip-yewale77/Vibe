"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MovingBorderWrapper({
  children,
  borderRadius = "1.75rem",
  duration = 3000,
  borderClassName,
  containerClassName,
  contentClassName,
  ...props
}: {
  children: React.ReactNode;
  borderRadius?: string;
  duration?: number;
  borderClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden p-[2px] bg-transparent",
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      <MovingBorder duration={duration} borderRadius={borderRadius}>
        <div
          className={cn(
            "h-24 w-24 bg-[radial-gradient(#0ea5e9_20%,transparent_60%)]",
            borderClassName
          )}
        />
      </MovingBorder>

      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-white backdrop-blur-xl",
          contentClassName
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MovingBorder({
  children,
  duration = 3000,
  borderRadius = "1.75rem",
}: {
  children: React.ReactNode;
  duration?: number;
  borderRadius?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const position = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pathLength = container.offsetWidth * 2 + container.offsetHeight * 2;
    const speed = pathLength / (duration / 16);

    const animate = () => {
      position.current = (position.current + speed) % pathLength;
      
      // Calculate position along rectangle perimeter
      let x = 0;
      let y = 0;
      
      if (position.current < container.offsetWidth) {
        // Top edge
        x = position.current;
        y = 0;
      } else if (position.current < container.offsetWidth + container.offsetHeight) {
        // Right edge
        x = container.offsetWidth;
        y = position.current - container.offsetWidth;
      } else if (position.current < container.offsetWidth * 2 + container.offsetHeight) {
        // Bottom edge
        x = container.offsetWidth - (position.current - container.offsetWidth - container.offsetHeight);
        y = container.offsetHeight;
      } else {
        // Left edge
        x = 0;
        y = container.offsetHeight - (position.current - container.offsetWidth * 2 - container.offsetHeight);
      }

      container.style.setProperty("--x", `${x}px`);
      container.style.setProperty("--y", `${y}px`);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [duration]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        borderRadius: `calc(${borderRadius} * 0.90)`,
        // @ts-ignore
        "--x": "0px",
        "--y": "0px",
      }}
    >
      <div
        className="absolute left-[var(--x)] top-[var(--y)] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-linear"
      >
        {children}
      </div>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: `calc(${borderRadius} * 0.90)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_center,rgba(14,165,233,0.1),transparent)]" />
      </div>
    </div>
  );
}