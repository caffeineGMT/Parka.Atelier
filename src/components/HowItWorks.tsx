"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  {
    num: "01",
    subtitle: "Perfect Compatibility",
    title: "Select Your Model",
    body: "Choose your parka model from our compatibility guide. Each hood is precision-cut to match your jacket's specific hood geometry — no guesswork, no gaps.",
    image: "/images/step-select.webp",
    imageAlt: "Selecting compatible jacket model",
  },
  {
    num: "02",
    subtitle: "Your Signature",
    title: "Choose Your Fur",
    body: "Select from Natural Coyote, Shadow Coyote, or rare Ivory Coyote. Each pelt is hand-graded for density, lustre, and guard-hair alignment before production.",
    image: "/images/step-fur.webp",
    imageAlt: "Selecting fur colour variant",
  },
  {
    num: "03",
    subtitle: "Three-Minute Install",
    title: "Snap & Secure",
    body: "Our proprietary snap-lock system attaches to your jacket's existing snap points in under three minutes. No tools, no modifications, no permanent changes.",
    image: "/images/step-snap.webp",
    imageAlt: "Installing fur hood onto jacket",
  },
  {
    num: "04",
    subtitle: "Uncompromising Performance",
    title: "Experience the Warmth",
    body: "The dual-layer fur structure — long guard hairs over dense underfur — creates a wind-blocking microclimate around your face that performs flawlessly at −40°C.",
    image: "/images/step-wear.webp",
    imageAlt: "Wearing fur hood in extreme cold",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) {
      ref.current.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="section-padding bg-white">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28 reveal">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--color-mid-gray)] mb-5">
            The Process
          </p>
          <h2 className="text-section-title font-semibold text-[var(--color-charcoal)]">
            How It Works
          </h2>
          <p className="text-[var(--color-mid-gray)] mt-5 max-w-lg mx-auto leading-relaxed">
            From selection to installation, the entire process is designed to be
            effortless — because your time is as valuable as your jacket.
          </p>
        </div>

        {/* Steps — alternating layout */}
        <div className="space-y-24 md:space-y-32">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.num}
                className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                {/* Image */}
                <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-hover-zoom bg-[var(--color-off-white)]">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Step number watermark */}
                  <span
                    className="absolute -top-4 -left-2 md:-top-8 md:-left-4 text-[5rem] md:text-[8rem] font-light leading-none text-[var(--color-light-gray)] select-none pointer-events-none"
                  >
                    {step.num}
                  </span>
                </div>

                {/* Text */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-[var(--color-red)]" />
                    <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-red)]">
                      Step {step.num}
                    </span>
                  </div>

                  <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[var(--color-mid-gray)] mb-3">
                    {step.subtitle}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-charcoal)] mb-6 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-[var(--color-mid-gray)] leading-relaxed text-[1.05rem]">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
