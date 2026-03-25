"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-[var(--color-mid-gray)] hover:text-[var(--color-red)] transition-colors"
    >
      Sign Out
    </button>
  );
}
