"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">
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

      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 md:px-20 md:pb-32 lg:px-32 lg:pb-36">
        <h1
          className={`text-[2.5rem] leading-[1.05] sm:text-hero md:text-display font-light mb-4 sm:mb-5 max-w-3xl transition-all duration-[800ms] ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Restore the<br />
          Iconic Look.
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 sm:mb-10 max-w-xl md:max-w-2xl transition-all duration-[800ms] ease-out delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Handcrafted fur hood replacements engineered for luxury parkas
          such as Canada Goose. From $149&nbsp;CAD.
        </p>

        <div
          className={`transition-all duration-[800ms] ease-out delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a href="#shop" className="btn-glass-dark">
            Shop Collection
          </a>
        </div>
      </div>
    </section>
  );
}
