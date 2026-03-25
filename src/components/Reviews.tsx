"use client";

import { useEffect, useRef } from "react";

const REVIEWS = [
  {
    name: "Sarah M.",
    location: "Toronto, ON",
    rating: 5,
    text: "Looks identical to the original Canada Goose hood but at a fraction of the price. The fur quality is outstanding — even my friends couldn't tell the difference.",
    product: "Signature",
  },
  {
    name: "Priya K.",
    location: "Montreal, QC",
    rating: 5,
    text: "Perfect fit on my Langford Parka. The universal snap system works flawlessly. Wish I'd found Parka.Atelier sooner.",
    product: "Prestige",
  },
  {
    name: "Michael R.",
    location: "Calgary, AB",
    rating: 5,
    text: "The Prestige tier is unbelievable. The ivory fur is stunning and the cedar storage box is a beautiful touch. Worth every penny.",
    product: "Prestige",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reviews" ref={ref} className="section-padding bg-black text-white">
      <div className="container-main">
        <div className="text-center mb-20 reveal">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-orange-400 mb-5">
            Customer Reviews
          </p>
          <h2 className="text-section-title font-semibold">
            Loved by Thousands
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Stars count={5} />
            <span className="text-white/40 text-sm">4.9/5 from 200+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {REVIEWS.map((review, i) => (
            <div
              key={review.name}
              className="reveal rounded-2xl border border-white/8 px-10 py-12 md:px-14 md:py-16 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-[0.95rem] text-white/70 font-light leading-relaxed mt-8 mb-10">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-white/8 pt-6">
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-white/35 mt-1.5">{review.location} · {review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
