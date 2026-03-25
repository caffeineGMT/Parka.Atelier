import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-[var(--color-off-white)] pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2 tracking-tight">My Account</h1>
        <p className="text-[var(--color-mid-gray)] mb-10">
          Welcome back, {session.user.name || session.user.email}
        </p>

        <div className="space-y-4">
          <Link
            href="/account/orders"
            className="block bg-white rounded-2xl p-6 border border-[var(--color-light-gray)] hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-lg">My Orders</h2>
                <p className="text-sm text-[var(--color-mid-gray)] mt-1">
                  Track your orders and view history
                </p>
              </div>
              <svg className="w-5 h-5 text-[var(--color-mid-gray)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>

          <div className="bg-white rounded-2xl p-6 border border-[var(--color-light-gray)]">
            <h2 className="font-medium text-lg mb-3">Account Details</h2>
            <div className="space-y-2 text-sm text-[var(--color-mid-gray)]">
              {session.user.name && <p>Name: {session.user.name}</p>}
              <p>Email: {session.user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
