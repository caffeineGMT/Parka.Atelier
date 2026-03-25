import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container-main py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
            Ready to <em className="italic">Elevate</em> Your Parka?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">
            Join thousands of Canadians who upgraded their winter coat.
          </p>
          <a href="#shop" className="btn-red">
            Shop Now — From $149 CAD
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-lg font-semibold tracking-[0.15em] uppercase mb-4">
              Parka Atelier
            </h3>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Premium fur hood replacements, handcrafted in Canada. Engineered for luxury parkas worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {["Classic", "Signature", "Prestige"].map((item) => (
                <li key={item}>
                  <a href="#shop" className="text-sm text-white/40 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { label: "FAQ", href: "#faq" },
                { label: "Returns", href: "/returns" },
                { label: "Privacy", href: "/privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Parka Atelier Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/25">🇨🇦 Handcrafted in Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
