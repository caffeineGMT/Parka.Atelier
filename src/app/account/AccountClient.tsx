"use client";

interface Order {
  id: string;
  name: string;
  processedAt: string;
  totalPrice: { amount: string; currencyCode: string };
  fulfillments: { status: string; trackingInformation: { number: string; url: string }[] }[];
  lineItems: { edges: { node: { title: string; quantity: number; customAttributes: { key: string; value: string }[] } }[] };
}

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string };
  defaultAddress?: {
    address1: string;
    city: string;
    province: string;
    country: string;
    zip: string;
  };
}

export default function AccountClient({ customer, orders }: { customer: Customer | null; orders: Order[] | null }) {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-mid-gray)] mb-2">Your Account</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-charcoal)]">
              {customer ? `Welcome, ${customer.firstName}` : "My Account"}
            </h1>
            {customer?.emailAddress && (
              <p className="text-sm text-[var(--color-mid-gray)] mt-1">{customer.emailAddress.emailAddress}</p>
            )}
          </div>
          <a href="/api/auth/logout" className="btn-secondary text-sm">Sign Out</a>
        </div>

        {/* Orders */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--color-charcoal)] mb-6">Order History</h2>
          {!orders || orders.length === 0 ? (
            <div className="bg-[var(--color-off-white)] rounded-2xl p-8 text-center">
              <p className="text-[var(--color-mid-gray)]">No orders yet.</p>
              <a href="/#shop" className="inline-block mt-4 btn-warm text-sm">Configure Your Hood</a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const fulfillment = order.fulfillments?.[0];
                const status = fulfillment?.status || "UNFULFILLED";
                const tracking = fulfillment?.trackingInformation?.[0];
                const date = new Date(order.processedAt).toLocaleDateString("en-CA", {
                  year: "numeric", month: "short", day: "numeric",
                });

                return (
                  <div key={order.id} className="border border-[var(--color-light-gray)] rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-[var(--color-charcoal)]">{order.name}</p>
                        <p className="text-xs text-[var(--color-mid-gray)] mt-0.5">{date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[var(--color-charcoal)]">
                          ${parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}
                        </p>
                        <span className={`inline-block mt-1 text-[0.6rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          status === "SUCCESS" || status === "FULFILLED"
                            ? "bg-green-50 text-green-700"
                            : status === "IN_TRANSIT"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}>
                          {status.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>

                    {/* Line items with custom attributes */}
                    {order.lineItems.edges.map(({ node: item }, i) => (
                      <div key={i} className="text-sm mb-2">
                        <p className="text-[var(--color-charcoal)] font-medium">{item.title} x{item.quantity}</p>
                        {item.customAttributes.length > 0 && (
                          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                            {item.customAttributes.map((attr, j) => (
                              <span key={j} className="text-xs text-[var(--color-mid-gray)]">
                                {attr.key}: <strong>{attr.value}</strong>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {tracking && (
                      <a
                        href={tracking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs font-medium text-[var(--color-red)] hover:underline"
                      >
                        Track: {tracking.number} →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
