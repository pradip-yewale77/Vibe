import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./UI/Spotlight";
import Image from "next/image";
import Link from "next/link";
import { MovingBorderWrapper } from "./UI/MovingBorderWrapper";

// Reusable GradientButton — supports both button and link
interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export const GradientButton = ({ children, href, onClick }: GradientButtonProps) => {
  const baseClasses =
    "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950";

  const innerContent = (
    <>
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-6 py-1.5 text-sm font-medium text-white backdrop-blur-2xl z-10">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};
export function Hero() {
  return (
    <section className="relative flex min-h-[35rem] w-full items-center justify-center overflow-hidden rounded-md bg-black/[0.96] antialiased">
      {/* Grid Background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 select-none [background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Spotlight */}
      <Spotlight className="left-0" fill="white" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent text-left bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text leading-tight">
              Spotlight <br /> is the new trend.
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-300 max-w-lg text-left">
              Use the spotlight effect to draw focused attention. This immersive visual
              cue highlights key sections — simple, elegant, and effective for conversions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <GradientButton href="/build">Build Your Site Now</GradientButton>
              <GradientButton onClick={() => alert("Border Magic clicked!")}>
                Border Magic
              </GradientButton>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex justify-center">
            <MovingBorderWrapper>

              <Image
                src="/images/project-panel.png"
                alt="Spotlight Effect Preview"
                width={500}
                height={500}
                priority
                className="rounded-xl object-cover shadow-lg"
              />
            </MovingBorderWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
