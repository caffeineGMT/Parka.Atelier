"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Choose Your Fur",
    desc: "Select from three tiers of premium, ethically sourced coyote fur — each handpicked for quality and density.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We Craft It",
    desc: "Our artisans hand-sew each hood replacement with reinforced stitching and our universal snap-lock system.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Snap & Wear",
    desc: "Attaches in seconds to any parka — Canada Goose, Moose Knuckles, Mackage, and more. No tools needed.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-16 reveal">
          <p className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[var(--color-mid-gray)] mb-4">
            Simple Process
          </p>
          <h2 className="font-display text-section-title font-medium text-[var(--color-charcoal)]">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal text-center"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[var(--color-off-white)] text-[var(--color-charcoal)]">
                {step.icon}
              </div>

              {/* Step number */}
              <p className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[var(--color-red)] mb-3">
                Step {step.num}
              </p>

              <h3 className="font-display text-xl font-medium text-[var(--color-charcoal)] mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-[var(--color-mid-gray)] leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
