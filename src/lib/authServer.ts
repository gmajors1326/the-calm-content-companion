// SSR server auth helper for Next.js App Router using Supabase SSR cookies
import { createServerSupabase } from "./supabase/server";

export type AuthedUser = { userId: string; email: string };

class NotAuthenticatedError extends Error {}
export { NotAuthenticatedError };

const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map(e => e.trim()).filter(e => e.length > 0);
export function isAdminEmail(email?: string): boolean {
  if (!email) return false;
  return adminEmails.includes(email);
}

export async function getAuthedUser(): Promise<AuthedUser | null> {
  try {
    const supabase = createServerSupabase()
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    const u = data.user;
    return { userId: u.id, email: u.email };
  } catch (err) {
    console.error("authServer:getAuthedUser", err);
    return null;
  }
}

export async function requireAuthedUser(): Promise<AuthedUser> {
  const u = await getAuthedUser();
  if (!u) throw new NotAuthenticatedError("Not authenticated");
  return u;
}
