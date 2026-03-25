"use client";

import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "Will it fit my parka?",
    a: "Yes. Our universal snap-lock system is engineered to fit all major brands \u2014 Canada Goose, Moose Knuckles, Mackage, Nobis, Parajumpers, and more. If your parka has hood snap buttons, it will work.",
  },
  {
    q: "What kind of fur do you use?",
    a: "We use ethically sourced, Grade A+ Canadian coyote fur. Every piece is hand-selected for density, softness, and natural color. Our Prestige tier uses rare Grade S ivory coyote fur.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 7\u201314 business days worldwide. Express shipping (2\u20135 days) is available for Signature and Prestige tiers.",
  },
  {
    q: "What\u2019s your return policy?",
    a: "30-day no-questions-asked returns. If you\u2019re not completely satisfied, send it back for a full refund. We even cover return shipping.",
  },
  {
    q: "How do I care for my fur hood?",
    a: "Shake gently after exposure to snow or rain. Store in the included dust bag away from direct heat. For deep cleaning, we recommend professional fur cleaning once per season.",
  },
  {
    q: "Is the fur ethically sourced?",
    a: "Absolutely. We work only with certified Canadian trappers who follow strict humane trapping standards. Every fur is fully traceable to its source.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-light-gray)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
      >
        <span className="text-sm sm:text-base font-medium text-[var(--color-charcoal)] pr-6 group-hover:text-[var(--color-red)] transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-[var(--color-mid-gray)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5 sm:pb-6" : "max-h-0"
        }`}
      >
        <p className="text-sm text-[var(--color-mid-gray)] leading-relaxed pr-8 sm:pr-12">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
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
    <section id="faq" ref={ref} className="section-padding bg-white">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10 sm:mb-12 reveal">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-mid-gray)] mb-4">
            Questions
          </p>
          <h2 className="text-section-title font-semibold text-[var(--color-charcoal)]">
            Frequently Asked
          </h2>
        </div>

        <div className="reveal">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
