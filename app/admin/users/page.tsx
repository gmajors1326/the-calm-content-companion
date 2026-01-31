import Link from "next/link";
import { requireAdminSession } from "../../../lib/access";

export default function AdminUsersPage() {
  requireAdminSession("/admin/users");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Users</h1>
          <p className="mt-2 text-sm text-[#475569]">User list and entitlements.</p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
            <p className="text-sm text-[#475569]">No users yet.</p>
          </div>

          <div className="mt-6">
            <Link href="/admin" className="text-sm text-[#143226] underline">
              Back to admin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
