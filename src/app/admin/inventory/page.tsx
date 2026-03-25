"use client";

import { useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
  tier: string;
  color: string;
  stock: number;
  price: number;
}

const DEFAULT_INVENTORY: InventoryItem[] = [
  { id: "classic-natural",   name: "Classic — Natural Coyote",  tier: "classic",   color: "Natural", stock: 25, price: 149 },
  { id: "classic-shadow",    name: "Classic — Shadow Coyote",   tier: "classic",   color: "Shadow",  stock: 15, price: 149 },
  { id: "classic-ivory",     name: "Classic — Ivory Coyote",    tier: "classic",   color: "Ivory",   stock: 5,  price: 149 },
  { id: "signature-natural", name: "Signature — Natural Coyote",tier: "signature", color: "Natural", stock: 20, price: 199 },
  { id: "signature-shadow",  name: "Signature — Shadow Coyote", tier: "signature", color: "Shadow",  stock: 12, price: 199 },
  { id: "signature-ivory",   name: "Signature — Ivory Coyote",  tier: "signature", color: "Ivory",   stock: 3,  price: 199 },
  { id: "prestige-natural",  name: "Prestige — Natural Coyote", tier: "prestige",  color: "Natural", stock: 10, price: 299 },
  { id: "prestige-shadow",   name: "Prestige — Shadow Coyote",  tier: "prestige",  color: "Shadow",  stock: 8,  price: 299 },
  { id: "prestige-ivory",    name: "Prestige — Ivory Coyote",   tier: "prestige",  color: "Ivory",   stock: 2,  price: 299 },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(DEFAULT_INVENTORY);
  const [editing, setEditing] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const updateStock = (id: string, stock: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, stock) } : item))
    );
  };

  const handleSave = () => {
    // In production, POST to /api/admin/inventory
    setSaved(true);
    setEditing(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalStock = inventory.reduce((sum, i) => sum + i.stock, 0);
  const totalValue = inventory.reduce((sum, i) => sum + i.stock * i.price, 0);
  const lowStock = inventory.filter((i) => i.stock <= 5);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-[var(--color-mid-gray)] mt-1">
            {totalStock} units · ${totalValue.toLocaleString()} CAD value
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-warm !py-2 !px-5 !text-sm"
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      {/* Low stock warning */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-orange-800">Low Stock Alert</p>
            <p className="text-xs text-orange-600 mt-1">
              {lowStock.map((i) => i.name).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Inventory table */}
      <div className="bg-white rounded-2xl border border-[var(--color-light-gray)] overflow-hidden">
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_120px_80px] gap-4 px-6 py-3 bg-[var(--color-off-white)] text-[0.65rem] font-semibold tracking-wider uppercase text-[var(--color-mid-gray)]">
          <span>Product</span>
          <span>Color</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
        </div>

        {inventory.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_120px_80px] gap-2 sm:gap-4 px-6 py-4 border-t border-[var(--color-light-gray)] hover:bg-[var(--color-off-white)]/50 transition-colors items-center"
          >
            <div>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">{item.name}</p>
              <p className="text-xs text-[var(--color-mid-gray)] capitalize">{item.tier} tier</p>
            </div>
            <div className="text-sm text-[var(--color-charcoal)]">{item.color}</div>
            <div className="text-sm font-medium">${item.price}</div>
            <div>
              {editing === item.id ? (
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                  onBlur={() => setEditing(null)}
                  autoFocus
                  className="w-20 text-sm border border-[var(--color-light-gray)] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)]"
                />
              ) : (
                <button
                  onClick={() => setEditing(item.id)}
                  className="text-sm font-medium hover:text-[var(--color-red)] transition-colors"
                >
                  {item.stock} units
                </button>
              )}
            </div>
            <div>
              <span className={`text-[0.65rem] font-medium px-2 py-1 rounded-full ${
                item.stock === 0
                  ? "bg-red-50 text-red-700"
                  : item.stock <= 5
                  ? "bg-orange-50 text-orange-700"
                  : "bg-green-50 text-green-700"
              }`}>
                {item.stock === 0 ? "Out" : item.stock <= 5 ? "Low" : "In Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
