"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── DATA ─────────────────────────────────────────────────── */

const MODELS = [
  { id: "langford",   name: "Langford",   brand: "Canada Goose", image: "/images/model-langford.jpg" },
  { id: "expedition", name: "Expedition", brand: "Canada Goose", image: "/images/model-expedition.jpg" },
  { id: "chilliwack", name: "Chilliwack", brand: "Canada Goose", image: "/images/model-chilliwack.jpg" },
  { id: "kensington", name: "Kensington", brand: "Canada Goose", image: "/images/model-kensington.jpg" },
  { id: "other",      name: "Other",      brand: "Any Brand",    image: "/images/step-select.webp" },
];

const FURS = [
  { id: "natural", name: "Natural Coyote", hex: "#C4A882", image: "/images/fur-natural.jpg",
    desc: "Warm golden-brown tones. The classic, most versatile choice." },
  { id: "shadow",  name: "Shadow Coyote", hex: "#4A4A52", image: "/images/fur-shadow.jpg",
    desc: "Deep charcoal tones. Sleek and contemporary." },
  { id: "ivory",   name: "Ivory Coyote",  hex: "#EDE8DF", image: "/images/fur-ivory.jpg",
    desc: "Rare, luminous white. The most sought-after grade." },
];

const ZIPPERS = [
  { id: "snap",     name: "Snap-Lock",  image: "/images/zipper-snap.jpg",
    desc: "Our signature universal system. Attaches in under 3 minutes." },
  { id: "hook",     name: "Hook & Eye", image: "/images/zipper-hook.jpg",
    desc: "Traditional secure fastening. Ideal for heavy-use parkas." },
  { id: "magnetic", name: "Magnetic",  image: "/images/zipper-magnetic.jpg",
    desc: "Effortless one-hand attachment. Ultra-clean look." },
];

const TIER_PRICES: Record<string, number> = {
  natural: 149,
  shadow:  199,
  ivory:   299,
};

/* ─── STEP INDICATOR ───────────────────────────────────────── */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-semibold transition-all duration-300 ${
            i + 1 === current
              ? "bg-[var(--color-charcoal)] text-white scale-110"
              : i + 1 < current
              ? "bg-[var(--color-red)] text-white"
              : "bg-[var(--color-light-gray)] text-[var(--color-mid-gray)]"
          }`}>
            {i + 1 < current ? (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-8 sm:w-12 transition-all duration-500 ${i + 1 < current ? "bg-[var(--color-red)]" : "bg-[var(--color-light-gray)]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── SELECTOR CARD ─────────────────────────────────────────── */

function SelectorCard({
  selected, onClick, image, title, subtitle, swatch,
}: {
  selected: boolean; onClick: () => void;
  image?: string; title: string; subtitle?: string; swatch?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        selected
          ? "border-[var(--color-charcoal)] shadow-lg scale-[1.02]"
          : "border-[var(--color-light-gray)] hover:border-[var(--color-mid-gray)] hover:shadow-md"
      }`}
    >
      {image && (
        <div className="relative w-full aspect-[4/3] bg-[var(--color-off-white)]">
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
          {selected && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      {swatch && (
        <div className="w-full h-20 sm:h-24 flex items-center justify-center" style={{ background: swatch }}>
          {selected && (
            <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      )}
      <div className="px-3 py-3 w-full">
        <p className="text-sm font-medium text-[var(--color-charcoal)] leading-tight">{title}</p>
        {subtitle && <p className="text-[0.65rem] text-[var(--color-mid-gray)] mt-0.5">{subtitle}</p>}
      </div>
    </button>
  );
}

/* ─── MAIN CONFIGURATOR ─────────────────────────────────────── */

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState<string | null>(null);
  const [fur, setFur] = useState<string | null>(null);
  const [zipper, setZipper] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const selectedFur = FURS.find((f) => f.id === fur);
  const selectedModel = MODELS.find((m) => m.id === model);
  const selectedZipper = ZIPPERS.find((z) => z.id === zipper);
  const price = fur ? TIER_PRICES[fur] : null;

  // Scroll to top of section on step change
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  async function handleCheckout() {
    if (!fur || !model || !zipper) return;
    setAdding(true);
    try {
      const tier = fur === "natural" ? "classic" : fur === "shadow" ? "signature" : "prestige";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          color: selectedFur?.name,
          size: selectedZipper?.name,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  }

  const STEPS = [
    { num: 1, label: "Select Your Parka" },
    { num: 2, label: "Choose Your Fur" },
    { num: 3, label: "Zipper Style" },
  ];

  return (
    <section
      id="shop"
      ref={ref}
      className="section-padding bg-white scroll-mt-14"
    >
      <div className="container-main">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--color-mid-gray)] mb-4">
            Build Yours
          </p>
          <h2 className="text-section-title font-semibold text-[var(--color-charcoal)]">
            Configure Your Hood
          </h2>
          <p className="text-[var(--color-mid-gray)] mt-4 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Three choices. One perfect fit.
          </p>
        </div>

        {/* Progress + step name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <StepIndicator current={step} total={3} />
          <div className="text-right">
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-red)]">
              Step {step} of 3
            </p>
            <p className="font-semibold text-[var(--color-charcoal)]">
              {STEPS[step - 1].label}
            </p>
          </div>
        </div>

        {/* ── STEP 1: Model ── */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
              {MODELS.map((m) => (
                <SelectorCard
                  key={m.id}
                  selected={model === m.id}
                  onClick={() => setModel(m.id)}
                  image={m.image}
                  title={m.name}
                  subtitle={m.brand}
                />
              ))}
            </div>

            {model && (
              <div className="bg-[var(--color-off-white)] rounded-2xl p-6 mb-8 flex items-center gap-4">
                <svg className="w-5 h-5 text-[var(--color-red)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-[var(--color-charcoal)]">
                  <span className="font-semibold">{selectedModel?.name}</span> is fully compatible — our snap-lock system fits perfectly.
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!model}
                className="btn-warm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Choose Your Fur →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Fur ── */}
        {step === 2 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
              {FURS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFur(f.id)}
                  className={`group rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 ${
                    fur === f.id
                      ? "border-[var(--color-charcoal)] shadow-lg"
                      : "border-[var(--color-light-gray)] hover:border-[var(--color-mid-gray)] hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] bg-[var(--color-off-white)]">
                    <Image src={f.image} alt={f.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                    {/* Swatch dot */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full border-2 border-white shadow-md" style={{ background: f.hex }} />
                    {fur === f.id && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[var(--color-charcoal)]">{f.name}</h3>
                      <span className="text-sm font-semibold text-[var(--color-red)]">${TIER_PRICES[f.id]}</span>
                    </div>
                    <p className="text-xs text-[var(--color-mid-gray)] leading-relaxed">{f.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!fur}
                className="btn-warm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Zipper Style →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Zipper ── */}
        {step === 3 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
              {ZIPPERS.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setZipper(z.id)}
                  className={`group rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 ${
                    zipper === z.id
                      ? "border-[var(--color-charcoal)] shadow-lg"
                      : "border-[var(--color-light-gray)] hover:border-[var(--color-mid-gray)] hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-[var(--color-off-white)]">
                    <Image src={z.image} alt={z.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                    {zipper === z.id && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">{z.name}</h3>
                    <p className="text-xs text-[var(--color-mid-gray)] leading-relaxed">{z.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary card */}
            {model && fur && zipper && (
              <div className="bg-[var(--color-off-white)] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 text-sm">
                  <p className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-[var(--color-mid-gray)] mb-3">
                    Your Configuration
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-red)]" />
                    <span className="text-[var(--color-charcoal)]">
                      <strong>{selectedModel?.name}</strong> ({selectedModel?.brand})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-red)]" />
                    <span className="text-[var(--color-charcoal)]">
                      <strong>{selectedFur?.name}</strong>
                    </span>
                    <div className="w-4 h-4 rounded-full border border-[var(--color-light-gray)]" style={{ background: selectedFur?.hex }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-red)]" />
                    <span className="text-[var(--color-charcoal)]">
                      <strong>{selectedZipper?.name}</strong> zipper
                    </span>
                  </div>
                </div>
                <div className="text-right sm:flex-shrink-0">
                  <p className="text-[0.65rem] text-[var(--color-mid-gray)] mb-1">Total</p>
                  <p className="text-3xl font-semibold text-[var(--color-charcoal)]">${price} <span className="text-sm font-normal text-[var(--color-mid-gray)]">CAD</span></p>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary">
                ← Back
              </button>
              <button
                onClick={handleCheckout}
                disabled={!zipper || adding}
                className="btn-warm disabled:opacity-40 disabled:cursor-not-allowed min-w-[160px]"
              >
                {adding ? "Loading..." : "Add to Cart →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
