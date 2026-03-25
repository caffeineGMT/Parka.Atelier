"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  email: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  tier: string;
  color: string;
  size: string;
  created: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const stats = {
    total: orders.length,
    revenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
    paid: orders.filter((o) => o.status === "paid").length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-[var(--color-mid-gray)] mt-1">
            {stats.total} orders · ${(stats.revenue / 100).toFixed(2)} CAD total
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm border border-[var(--color-light-gray)] rounded-lg px-3 py-2 bg-white"
        >
          <option value="all">All Orders</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-[var(--color-light-gray)] animate-pulse">
              <div className="h-4 bg-[var(--color-light-gray)] rounded w-1/3 mb-2" />
              <div className="h-3 bg-[var(--color-light-gray)] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-mid-gray)]">
          No orders found
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[var(--color-light-gray)] overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_1fr_100px_100px] gap-4 px-6 py-3 bg-[var(--color-off-white)] text-[0.65rem] font-semibold tracking-wider uppercase text-[var(--color-mid-gray)]">
            <span>Customer</span>
            <span>Product</span>
            <span>Config</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {filtered.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_100px_100px] gap-2 sm:gap-4 px-6 py-4 border-t border-[var(--color-light-gray)] hover:bg-[var(--color-off-white)]/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-charcoal)] truncate">{order.name || "—"}</p>
                <p className="text-xs text-[var(--color-mid-gray)] truncate">{order.email}</p>
              </div>
              <div className="text-sm text-[var(--color-charcoal)]">
                {order.tier ? order.tier.charAt(0).toUpperCase() + order.tier.slice(1) : "—"}
              </div>
              <div className="text-xs text-[var(--color-mid-gray)]">
                {order.color} · {order.size}
              </div>
              <div className="text-xs text-[var(--color-mid-gray)]">
                {new Date(order.created * 1000).toLocaleDateString("en-CA")}
              </div>
              <div className="text-sm font-medium">
                ${((order.amount || 0) / 100).toFixed(2)}
              </div>
              <div>
                <span className={`text-[0.65rem] font-medium px-2 py-1 rounded-full ${
                  order.status === "paid"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
