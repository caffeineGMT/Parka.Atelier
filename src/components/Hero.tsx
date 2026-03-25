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
    <section className="relative min-h-screen flex items-center bg-black text-white pt-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Premium fur hood on parka"
          fill
          className="object-cover object-center opacity-60"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 container-main py-20 md:py-32" ref={ref}>
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[var(--color-red)] mb-6">
            Premium Fur Hood Replacement
          </p>

          <h1 className="font-display text-hero md:text-display font-medium mb-6 leading-[1.05]">
            Elevate Your
            <br />
            <em className="italic">Parka</em>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-lg">
            Handcrafted fur hood replacements engineered for Canada Goose,
            Moose Knuckles & luxury parkas. From $149&nbsp;CAD.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#shop" className="btn-red text-center">
              Shop Collection
            </a>
            <a href="#how-it-works" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-black text-center">
              How It Works
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 mt-12 text-white/50 text-[0.7rem] font-medium tracking-wider uppercase">
            <span>✦ Handcrafted in Canada</span>
            <span>✦ Lifetime Warranty</span>
            <span>✦ 30-Day Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
}
