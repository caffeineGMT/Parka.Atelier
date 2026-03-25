"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-black/80 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="container-main flex items-center justify-between h-14">
          <Link href="/" className="font-display text-lg font-semibold tracking-[0.1em] uppercase">
            Parka.Atelier
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {["Shop", "How It Works", "Reviews", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[0.7rem] font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 animate-fade-in bg-black/90 backdrop-blur-xl">
            <div className="container-main py-8 flex flex-col gap-5">
              {["Shop", "How It Works", "Reviews", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-white/60 hover:text-white py-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
