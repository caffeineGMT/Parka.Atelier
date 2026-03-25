"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  tier: string;
  color: string;
  size: string;
  created: number;
  items: { name: string; amount: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-off-white)] pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/account" className="text-sm text-[var(--color-mid-gray)] hover:text-[var(--color-charcoal)] mb-6 inline-block">
          ← Back to Account
        </Link>
        <h1 className="text-3xl font-semibold mb-8 tracking-tight">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[var(--color-light-gray)] animate-pulse">
                <div className="h-5 bg-[var(--color-light-gray)] rounded w-1/3 mb-3" />
                <div className="h-4 bg-[var(--color-light-gray)] rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--color-mid-gray)] mb-6">No orders yet</p>
            <Link href="/#shop" className="btn-warm">
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 border border-[var(--color-light-gray)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">
                      Parka.Atelier {order.tier?.charAt(0).toUpperCase()}{order.tier?.slice(1)}
                    </h3>
                    <p className="text-sm text-[var(--color-mid-gray)] mt-1">
                      {order.color} · Size {order.size}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    ${((order.amount || 0) / 100).toFixed(2)} {order.currency?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-light-gray)]">
                  <span className="text-xs text-[var(--color-mid-gray)]">
                    {new Date(order.created * 1000).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
