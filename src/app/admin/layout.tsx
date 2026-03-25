import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.email !== process.env.ADMIN_EMAIL) redirect("/");

  return (
    <div className="min-h-screen bg-[var(--color-off-white)]">
      {/* Admin nav */}
      <nav className="bg-[var(--color-charcoal)] text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-sm font-semibold tracking-wide uppercase">
              Parka.Atelier Admin
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="/admin" className="text-xs text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/orders" className="text-xs text-white/60 hover:text-white transition-colors">
                Orders
              </Link>
              <Link href="/admin/inventory" className="text-xs text-white/60 hover:text-white transition-colors">
                Inventory
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">{session.user.email}</span>
            <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors">
              ← Site
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
