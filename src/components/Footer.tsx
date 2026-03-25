import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-main py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-base sm:text-lg font-semibold tracking-[0.1em] uppercase mb-3 sm:mb-4">
              Parka.Atelier
            </h3>
            <p className="text-xs sm:text-sm text-white/40 max-w-sm leading-relaxed">
              Premium fur hood replacements, handcrafted in Canada. Engineered for luxury parkas worldwide.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-3 sm:mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {["Classic", "Signature", "Prestige"].map((item) => (
                <li key={item}>
                  <a href="#shop" className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-3 sm:mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { label: "FAQ", href: "#faq" },
                { label: "Returns", href: "/returns" },
                { label: "Privacy", href: "/privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.65rem] sm:text-xs text-white/25">
            &copy; {new Date().getFullYear()} Parka.Atelier Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
