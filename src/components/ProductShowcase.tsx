"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PRODUCTS = [
  {
    name: "Classic",
    price: 149,
    originalPrice: 249,
    image: "/images/product-classic.jpg",
    color: "Natural Coyote",
    features: ["Grade A coyote fur", "Universal snap-lock fit", "All parka brands", "1-year guarantee"],
  },
  {
    name: "Signature",
    price: 199,
    originalPrice: 399,
    image: "/images/product-signature.jpg",
    color: "Shadow Coyote",
    badge: "Best Seller",
    highlight: true,
    features: ["Grade A+ coyote fur", "Universal snap-lock fit", "Lifetime guarantee", "Certificate of authenticity"],
  },
  {
    name: "Prestige",
    price: 299,
    originalPrice: 549,
    image: "/images/product-prestige.jpg",
    color: "Ivory Coyote",
    badge: "Limited",
    features: ["Rare Grade S ivory fur", "Custom sizing available", "Lifetime unconditional warranty", "White-glove delivery", "Cedar storage box"],
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="shop" ref={sectionRef} className="section-padding bg-[var(--color-off-white)]">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[var(--color-mid-gray)] mb-4">
            The Collection
          </p>
          <h2 className="font-display text-section-title font-medium text-[var(--color-charcoal)]">
            Three Tiers. <em className="italic">One Standard.</em>
          </h2>
          <p className="text-[var(--color-mid-gray)] mt-4 max-w-lg mx-auto">
            Every piece handcrafted with the same obsessive attention to detail.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <article
              key={product.name}
              className={`reveal group bg-white flex flex-col transition-all duration-300 hover:shadow-[var(--shadow-lg)] ${
                product.highlight ? "ring-2 ring-[var(--color-red)]" : ""
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 text-[0.55rem] font-bold tracking-[0.2em] uppercase text-white ${
                  product.highlight ? "bg-[var(--color-red)]" : "bg-black"
                }`}>
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[4/5] img-hover-zoom bg-[var(--color-light-gray)]">
                <Image
                  src={product.image}
                  alt={`Parka Atelier ${product.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-6 lg:p-8">
                <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-mid-gray)] mb-1">
                  {product.color}
                </p>
                <h3 className="font-display text-2xl font-medium text-[var(--color-charcoal)] mb-4">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[var(--color-light-gray)]">
                  <span className="font-display text-3xl font-medium">${product.price}</span>
                  <span className="text-[var(--color-mid-gray)] line-through text-sm">${product.originalPrice}</span>
                  <span className="text-[0.6rem] font-bold tracking-wider uppercase text-[var(--color-red)]">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-2.5 mb-6">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-[var(--color-dark-gray)]">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-red)]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={product.highlight ? "btn-red w-full" : "btn-primary w-full"}
                >
                  Add to Cart
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
