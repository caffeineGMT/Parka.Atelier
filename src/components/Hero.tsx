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
    <section className="relative h-screen bg-black text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Premium fur hood on parka"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-20"
        ref={ref}
      >
        <h1 className="text-hero md:text-display font-light mb-5 max-w-3xl">
          Restore the<br />
          Iconic Look.
        </h1>

        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-2xl">
          Handcrafted fur hood replacements engineered for luxury parkas
          such as Canada Goose. From $149&nbsp;CAD.
        </p>

        <div>
          <a href="#shop" className="btn-glass-dark">
            Shop Collection
          </a>
        </div>
      </div>
    </section>
  );
}
