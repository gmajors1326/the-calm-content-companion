import Link from "next/link";
import { requireSupabaseSession } from "../../lib/access";

export default function AccountPage() {
  requireSupabaseSession("/account");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Account</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-sm font-semibold text-[#143226]">Email</p>
              <p className="mt-2 text-sm text-[#475569]">Not available</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-sm font-semibold text-[#143226]">Entitlements</p>
              <p className="mt-2 text-sm text-[#475569]">No active products yet</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/account/billing"
              className="rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white"
            >
              Billing
            </Link>
            <Link
              href="/account/purchases"
              className="rounded-md border border-[#d8e1d5] px-4 py-3 text-sm font-semibold text-[#143226]"
            >
              Purchases
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
