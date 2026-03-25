import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2 tracking-tight">Dashboard</h1>
      <p className="text-sm text-[var(--color-mid-gray)] mb-10">Manage your store</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl p-8 border border-[var(--color-light-gray)] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">Orders</h2>
          <p className="text-sm text-[var(--color-mid-gray)]">View and manage customer orders</p>
        </Link>

        <Link
          href="/admin/inventory"
          className="bg-white rounded-2xl p-8 border border-[var(--color-light-gray)] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-5">
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg mb-1 group-hover:text-green-600 transition-colors">Inventory</h2>
          <p className="text-sm text-[var(--color-mid-gray)]">Manage stock levels and products</p>
        </Link>

        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl p-8 border border-[var(--color-light-gray)] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
            <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors">Stripe Dashboard ↗</h2>
          <p className="text-sm text-[var(--color-mid-gray)]">Payments, refunds, and analytics</p>
        </a>
      </div>
    </div>
  );
}
