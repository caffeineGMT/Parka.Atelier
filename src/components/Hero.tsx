"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("animate-fade-up");
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-black text-white pt-32 md:pt-28">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Premium fur hood on parka"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 container-main py-24 md:py-40" ref={ref}>
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--color-red)] mb-8">
            Premium Fur Hood Replacement
          </p>

          <h1 className="font-display text-hero md:text-display font-semibold mb-8">
            Elevate Your
            <br />
            Parka
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12 max-w-lg">
            Handcrafted fur hood replacements engineered for luxury
            parkas such as Canada Goose. From $149&nbsp;CAD.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#shop" className="btn-warm text-center">
              Shop Collection
            </a>
            <a href="#how-it-works" className="btn-glass-dark text-center">
              How It Works
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-16 text-white/40 text-[0.75rem] font-medium tracking-wide">
            <span>✦ Handcrafted in Canada</span>
            <span>✦ Lifetime Warranty</span>
            <span>✦ 30-Day Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
}
