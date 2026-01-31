import { cookies } from "next/headers";

function isAdmin() {
  const store = cookies();
  const hasSession = Boolean(
    store.get("sb-access-token") ||
      store.get("sb-refresh-token") ||
      store.get("supabase-auth-token")
  );
  return hasSession && store.get("admin-allowlist")?.value === "true";
}

export async function GET() {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({ tools: [] });
}
