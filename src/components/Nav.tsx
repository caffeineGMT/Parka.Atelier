"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="bg-[var(--color-red)] text-white text-center py-2 px-4">
        <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
          Free Worldwide Shipping — Limited Time
        </p>
      </div>

      <nav className="bg-black text-white">
        <div className="container-main flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-semibold tracking-[0.15em] uppercase">
            Parka Atelier
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {["Shop", "How It Works", "Reviews", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#shop" className="hidden md:inline-flex btn-red !py-2.5 !px-6 !text-[0.6rem]">
            Shop Now
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 animate-fade-in">
            <div className="container-main py-6 flex flex-col gap-4">
              {["Shop", "How It Works", "Reviews", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white py-2"
                >
                  {item}
                </a>
              ))}
              <a href="#shop" className="btn-red w-full mt-2">Shop Now</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
