import { auth } from "./auth";

export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.email === process.env.ADMIN_EMAIL;
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
}
