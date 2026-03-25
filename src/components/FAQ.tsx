"use client";

import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "Which parka models is Parka.Atelier compatible with?",
    a: "Parka.Atelier is precision-engineered for all major Canada Goose parka models including the Expedition, Langford, Chilliwack, Trillium, Kensington, and Mystique. Our snap-lock system works with standard hood snap configurations. We also support Moose Knuckles, Mackage, Nobis, and Parajumpers. If your model isn\u2019t listed, contact us for a custom sizing consultation.",
  },
  {
    q: "Is the fur ethically sourced?",
    a: "Absolutely. Every pelt is sourced exclusively from licensed, regulated trappers operating under the Fur Council of Canada\u2019s strict ethical guidelines. We maintain full traceability from origin to finished product and provide a certificate of origin with every Signature and Prestige tier order.",
  },
  {
    q: "How long does installation take?",
    a: "The snap-lock system is designed for a sub-three-minute installation with zero tools required. Simply align the attachment points with your jacket\u2019s existing hood snaps, press to engage, and you\u2019re done. Removal is equally simple \u2014 making it easy to swap between jackets or remove for cleaning.",
  },
  {
    q: "How do I care for my fur hood?",
    a: "Coyote fur is naturally resilient and requires minimal maintenance. For everyday care, simply shake out the ruff and allow it to air-dry if wet. For deeper cleaning, we recommend professional fur cleaning once per season. Do not machine wash, tumble dry, or use chemical solvents. Signature and Prestige orders include a dedicated care kit with a conditioning brush and natural fur conditioner.",
  },
  {
    q: "What is the lead time for production?",
    a: "Each hood is made to order by our master furriers in Canada. Current lead time from order confirmation to shipping is 6\u20138 weeks. We\u2019ll keep you updated at every stage of production with photos and progress updates. Rush orders may be available \u2014 contact us to enquire.",
  },
  {
    q: "Can I order a custom size for a non-Canada Goose jacket?",
    a: "Yes. Our Prestige tier includes custom sizing for any jacket brand. We\u2019ll request measurements and photos of your hood\u2019s snap configuration, then engineer a bespoke attachment system and cut the fur to your exact specifications. Custom orders carry a 10\u201312 week lead time.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We offer a 30-day satisfaction guarantee on all orders. If you\u2019re not completely satisfied, you can return it for a full refund or exchange within 30 days of delivery. The item must be in original, unworn condition with all tags attached. We provide prepaid return labels for defective items or our errors.",
  },
  {
    q: "What does the lifetime guarantee cover?",
    a: "Our lifetime guarantee covers any defect in materials or craftsmanship \u2014 including fur shedding beyond normal levels, attachment system failure, or stitching separation. It does not cover damage from improper care, loss, or normal wear over many years. Simply contact us and we\u2019ll arrange repair or replacement at no cost.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Classic tier ships via standard tracked courier (7\u201314 business days). Signature and Prestige tiers ship via express courier (3\u20135 business days). Prestige includes white-glove delivery with signature required. Import duties and taxes are the responsibility of the recipient.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach us at hello@parka-atelier.com. We typically respond within 24 hours on business days. You can also DM us on Instagram @parka.atelier for quick questions.",
  },
  {
    q: "Are you on Instagram?",
    a: "Yes! Follow us @parka.atelier on Instagram for styling inspiration, behind-the-scenes looks at our workshop, customer photos, and new collection announcements.",
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
          open ? "max-h-[500px] pb-5 sm:pb-6" : "max-h-0"
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
