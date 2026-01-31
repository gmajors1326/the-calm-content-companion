import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIES = [
  "sb-access-token",
  "sb-refresh-token",
  "supabase-auth-token",
];

export function hasSupabaseSession() {
  const store = cookies();
  return SESSION_COOKIES.some((name) => store.get(name));
}

export function safeNextPath(nextPath?: string) {
  if (!nextPath) return "/";
  if (nextPath.startsWith("/") && !nextPath.startsWith("//")) {
    return nextPath;
  }
  return "/";
}

export function requireSupabaseSession(nextPath: string) {
  if (!hasSupabaseSession()) {
    redirect(`/verify?next=${encodeURIComponent(nextPath)}`);
  }
}

export function requireAdminSession(nextPath: string) {
  if (!hasSupabaseSession()) {
    redirect(`/verify?next=${encodeURIComponent(nextPath)}`);
  }

  const adminAllowlisted = cookies().get("admin-allowlist")?.value === "true";
  if (!adminAllowlisted) {
    redirect("/admin/login?reason=not-allowlisted");
  }
}
