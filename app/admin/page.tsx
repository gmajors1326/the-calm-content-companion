import Link from "next/link";
import { requireAdminSession } from "../../lib/access";

export default function AdminPage() {
  requireAdminSession("/admin");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Admin</h1>
          <p className="mt-2 text-sm text-[#475569]">
            High-level metrics and status snapshots.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Users</p>
              <p className="mt-3 text-2xl font-semibold text-[#143226]">0</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Purchases</p>
              <p className="mt-3 text-2xl font-semibold text-[#143226]">0</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Tool runs</p>
              <p className="mt-3 text-2xl font-semibold text-[#143226]">0</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/admin/users"
              className="rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white"
            >
              Users
            </Link>
            <Link
              href="/admin/purchases"
              className="rounded-md border border-[#d8e1d5] px-4 py-3 text-sm font-semibold text-[#143226]"
            >
              Purchases
            </Link>
            <Link
              href="/admin/tools"
              className="rounded-md border border-[#d8e1d5] px-4 py-3 text-sm font-semibold text-[#143226]"
            >
              Tool metrics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
